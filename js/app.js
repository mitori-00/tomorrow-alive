/* ==========================================================================
   TOMORROW X ALIVE — Interactive Visual Novel & Survival Engine
   ========================================================================== */

(() => {
  const AUTO_SAVE_KEY = 'txa_autosave_v1';
  const SLOT_PREFIX = 'txa_slot_v1_';
  const META_KEY = 'txa_meta_v1';

  /* ---------- WEB AUDIO SYNTH (Zero External Files) ---------- */
  const SFX = (() => {
    let ctx = null;
    let enabled = true;

    function ensure() {
      if (!enabled) return null;
      if (!ctx) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) ctx = new AudioCtx();
      }
      if (ctx && ctx.state === 'suspended') ctx.resume().catch(() => {});
      return ctx;
    }

    function beep(freq = 520, duration = 0.05, type = 'sine', gainVal = 0.04) {
      const c = ensure();
      if (!c) return;
      const osc = c.createOscillator();
      const g = c.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, c.currentTime);
      g.gain.setValueAtTime(gainVal, c.currentTime);
      g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + duration);
      osc.connect(g);
      g.connect(c.destination);
      osc.start();
      osc.stop(c.currentTime + duration);
    }

    function click() { beep(640, 0.045, 'triangle', 0.05); }
    function typeTick() { beep(340 + Math.random() * 80, 0.02, 'square', 0.012); }
    function love() {
      beep(660, 0.09, 'sine', 0.055);
      setTimeout(() => beep(880, 0.14, 'sine', 0.055), 85);
    }
    function alert() {
      beep(240, 0.12, 'sawtooth', 0.06);
      setTimeout(() => beep(180, 0.16, 'sawtooth', 0.06), 130);
    }
    function radio() {
      const c = ensure();
      if (!c) return;
      const bufSize = c.sampleRate * 0.14;
      const buf = c.createBuffer(1, bufSize, c.sampleRate);
      const data = buf.getChannelData(0);
      for (let i = 0; i < bufSize; i++) data[i] = (Math.random() * 2 - 1) * 0.18;
      const src = c.createBufferSource();
      src.buffer = buf;
      const g = c.createGain();
      g.gain.setValueAtTime(0.05, c.currentTime);
      g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.14);
      src.connect(g);
      g.connect(c.destination);
      src.start();
    }

    function toggle() {
      enabled = !enabled;
      return enabled;
    }
    function isEnabled() { return enabled; }

    return { click, typeTick, love, alert, radio, toggle, isEnabled };
  })();

  /* ---------- PERSISTENT COLLECTION META (Polaroids & Endings) ---------- */
  function loadMeta() {
    try {
      const raw = localStorage.getItem(META_KEY);
      if (raw) return JSON.parse(raw);
    } catch (_) {}
    return { polaroids: [], endings: [] };
  }

  function saveMeta(meta) {
    try { localStorage.setItem(META_KEY, JSON.stringify(meta)); } catch (_) {}
  }

  function unlockPolaroid(memberId) {
    const meta = loadMeta();
    if (!meta.polaroids.includes(memberId)) {
      meta.polaroids.push(memberId);
      saveMeta(meta);
      const m = GAME_DATA.characters[memberId];
      showToast(`📸 폴라로이드 해금: ${m.name}`, 'love');
    }
  }

  function unlockEnding(endingId) {
    const meta = loadMeta();
    if (!meta.endings.includes(endingId)) {
      meta.endings.push(endingId);
      saveMeta(meta);
    }
  }

  /* ---------- GAME STATE ---------- */
  let state = GAME_DATA.createInitialState('모아');
  let activeScene = null;       // Current dynamic or static scene object
  let pendingReply = null;      // Temporary reply line after daytime choice
  let typingTimer = null;
  let fullCurrentText = '';
  let isTyping = false;
  let qteTimer = null;
  let qteEndAt = 0;
  let saveModalMode = 'save';

  /* ---------- DOM ELEMENTS ---------- */
  const $ = (id) => document.getElementById(id);
  const screens = {
    title: $('screen-title'),
    game: $('screen-game'),
    ending: $('screen-ending')
  };

  /* ---------- HELPERS ---------- */
  function formatText(str) {
    return (str || '').replace(/\{name\}/g, state.playerName);
  }

  function switchScreen(name) {
    Object.entries(screens).forEach(([k, el]) => {
      el.classList.toggle('active', k === name);
    });
  }

  function showToast(text, style = '') {
    const layer = $('toast-layer');
    const div = document.createElement('div');
    div.className = `toast-pill ${style}`;
    div.textContent = text;
    layer.appendChild(div);
    setTimeout(() => div.remove(), 2250);
  }

  function triggerShake() {
    const stage = $('vn-stage');
    stage.classList.remove('shake');
    void stage.offsetWidth;
    stage.classList.add('shake');
  }

  function applyEffects(effects) {
    if (!effects) return;
    if (typeof effects.mental === 'number' && effects.mental !== 0) {
      state.mental = Math.max(0, Math.min(100, state.mental + effects.mental));
      showToast(`🧠 멘탈 ${effects.mental > 0 ? '+' : ''}${effects.mental}`, effects.mental < 0 ? 'warn' : '');
    }
    if (typeof effects.supplies === 'number' && effects.supplies !== 0) {
      state.supplies = Math.max(0, state.supplies + effects.supplies);
      showToast(`🎒 물자 ${effects.supplies > 0 ? '+' : ''}${effects.supplies}`, effects.supplies < 0 ? 'warn' : '');
    }
    if (typeof effects.defense === 'number' && effects.defense !== 0) {
      state.defense = Math.max(0, state.defense + effects.defense);
      showToast(`🛡️ 방어력 ${effects.defense > 0 ? '+' : ''}${effects.defense}`, effects.defense < 0 ? 'warn' : '');
    }
    if (effects.affection) {
      Object.entries(effects.affection).forEach(([memberId, delta]) => {
        if (!delta) return;
        state.affection[memberId] = Math.max(0, Math.min(100, (state.affection[memberId] || 0) + delta));
        const m = GAME_DATA.characters[memberId];
        if (m) showToast(`💖 ${m.name} 호감도 +${delta}`, 'love');
      });
      SFX.love();
    }
    updateHud();
  }

  function updateHud() {
    const timeLabel = { morning: '오전', day: '낮', evening: '저녁', night: '밤' }[state.timeOfDay] || '낮';
    const dayPill = $('hud-day');
    dayPill.textContent = `DAY ${state.day} · ${timeLabel}`;
    dayPill.classList.toggle('night', state.timeOfDay === 'night');

    const locObj = GAME_DATA.locations[state.location];
    $('hud-location').textContent = locObj ? locObj.name : state.location;

    $('hud-mental-val').textContent = state.mental;
    const mBar = $('hud-mental-bar');
    mBar.style.width = `${state.mental}%`;
    mBar.classList.toggle('low', state.mental <= 30);

    $('fx-vignette').classList.toggle('danger', state.mental <= 25 || Boolean(qteTimer));
    $('hud-supply-val').textContent = state.supplies;
  }

  function updateSoundButtons() {
    const on = SFX.isEnabled();
    $('btn-sound').textContent = on ? '🔊' : '🔇';
    $('btn-title-sound').textContent = on ? '🔊 SFX ON' : '🔇 SFX OFF';
  }

  /* ---------- SAVE / LOAD ---------- */
  function autoSave() {
    try {
      const payload = {
        state,
        savedAt: new Date().toLocaleString('ko-KR', { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })
      };
      localStorage.setItem(AUTO_SAVE_KEY, JSON.stringify(payload));
      refreshContinueButton();
    } catch (_) {}
  }

  function refreshContinueButton() {
    const btn = $('btn-continue');
    const meta = $('continue-meta');
    try {
      const raw = localStorage.getItem(AUTO_SAVE_KEY);
      if (!raw) {
        btn.disabled = true;
        meta.textContent = '저장 기록 없음';
        return;
      }
      const parsed = JSON.parse(raw);
      btn.disabled = false;
      meta.textContent = `DAY ${parsed.state.day} · ${parsed.state.playerName} (${parsed.savedAt})`;
    } catch (_) {
      btn.disabled = true;
    }
  }

  function saveToSlot(slotNum) {
    const payload = {
      state: JSON.parse(JSON.stringify(state)),
      savedAt: new Date().toLocaleString('ko-KR', { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })
    };
    localStorage.setItem(SLOT_PREFIX + slotNum, JSON.stringify(payload));
    SFX.click();
    showToast(`💾 슬롯 ${slotNum}에 저장 완료!`);
    renderSaveSlots();
  }

  function loadFromData(savedState) {
    clearQte();
    state = Object.assign(GAME_DATA.createInitialState(savedState.playerName), savedState);
    pendingReply = null;
    closeAllModals();
    switchScreen('game');
    updateHud();
    if (state.mode === 'map') {
      openDayMap();
    } else if (state.mode === 'night_select') {
      openNightWatchSelect();
    } else {
      resumeSceneById(state.sceneId, state.lineIndex);
    }
  }

  /* ---------- QTE TIMER ENGINE ---------- */
  function clearQte() {
    if (qteTimer) {
      clearInterval(qteTimer);
      qteTimer = null;
    }
    $('qte-banner').classList.add('hidden');
    $('fx-vignette').classList.toggle('danger', state.mental <= 25);
  }

  function startQte(seconds, onTimeout) {
    clearQte();
    const banner = $('qte-banner');
    const fill = $('qte-fill');
    const textEl = $('qte-timer-text');
    banner.classList.remove('hidden');
    $('fx-vignette').classList.add('danger');
    SFX.alert();

    const totalMs = seconds * 1000;
    qteEndAt = Date.now() + totalMs;

    qteTimer = setInterval(() => {
      const remain = Math.max(0, qteEndAt - Date.now());
      const pct = (remain / totalMs) * 100;
      fill.style.width = `${pct}%`;
      textEl.textContent = `${(remain / 1000).toFixed(1)}s`;
      if (remain <= 0) {
        clearQte();
        onTimeout();
      }
    }, 60);
  }

  /* ---------- SCENE & DIALOGUE ENGINE ---------- */
  function setSceneVisuals(locationId, charId, expr, isRadio = false, radioTag = '') {
    if (locationId) {
      state.location = locationId;
      $('scene-bg').innerHTML = GAME_ART.renderBackground(locationId);
    }
    const charSlot = $('char-slot');
    if (charId && GAME_DATA.characters[charId]) {
      const prevChar = charSlot.dataset.char;
      charSlot.innerHTML = GAME_ART.renderCharacter(charId, expr || 'normal');
      charSlot.dataset.char = charId;
      if (prevChar !== charId) {
        charSlot.classList.remove('enter');
        void charSlot.offsetWidth;
        charSlot.classList.add('enter');
      }
    } else {
      charSlot.innerHTML = '';
      charSlot.dataset.char = '';
    }

    $('radio-banner').classList.toggle('hidden', !isRadio);
    $('dialogue-box').classList.toggle('radio-mode', Boolean(isRadio));
    if (isRadio && radioTag) $('radio-sender-tag').textContent = radioTag;
    updateHud();
  }

  function typeText(text) {
    clearInterval(typingTimer);
    const el = $('dialogue-text');
    const nextInd = $('dialogue-next');
    fullCurrentText = formatText(text);
    el.textContent = '';
    isTyping = true;
    nextInd.style.visibility = 'hidden';

    let i = 0;
    typingTimer = setInterval(() => {
      i += 1;
      el.textContent = fullCurrentText.slice(0, i);
      if (i % 4 === 0) SFX.typeTick();
      if (i >= fullCurrentText.length) {
        finishTyping();
      }
    }, 22);
  }

  function finishTyping() {
    clearInterval(typingTimer);
    $('dialogue-text').textContent = fullCurrentText;
    isTyping = false;
    $('dialogue-next').style.visibility = 'visible';
  }

  function renderCurrentLine() {
    if (!activeScene) return;
    $('map-overlay').classList.add('hidden');
    $('night-overlay').classList.add('hidden');
    $('choice-layer').classList.add('hidden');
    $('choice-layer').innerHTML = '';

    const line = pendingReply || activeScene.lines[state.lineIndex];
    if (!line) {
      handleSceneEnd();
      return;
    }

    if (activeScene.timeOfDay) state.timeOfDay = activeScene.timeOfDay;
    setSceneVisuals(activeScene.location, line.char, line.expr, activeScene.radio, activeScene.radioTag);

    const spEl = $('speaker-name');
    const roleEl = $('speaker-role');
    if (line.speaker) {
      spEl.classList.remove('hidden');
      spEl.textContent = line.speaker;
      const member = line.char ? GAME_DATA.characters[line.char] : null;
      if (member) {
        spEl.style.color = member.color;
        spEl.style.borderLeftColor = member.color;
        spEl.style.background = `${member.color}22`;
        roleEl.classList.remove('hidden');
        roleEl.textContent = member.role;
      } else {
        spEl.style.color = '#6eff66';
        spEl.style.borderLeftColor = '#6eff66';
        spEl.style.background = 'rgba(110,255,102,0.16)';
        roleEl.classList.add('hidden');
      }
    } else {
      spEl.classList.add('hidden');
      roleEl.classList.add('hidden');
    }

    // Add to backlog
    const formatted = formatText(line.text);
    const lastLog = state.backlog[state.backlog.length - 1];
    if (!lastLog || lastLog.text !== formatted) {
      state.backlog.push({ speaker: line.speaker || '내레이션', text: formatted });
      if (state.backlog.length > 50) state.backlog.shift();
    }

    typeText(line.text);

    // If last line and scene has choices, show choices right after typing finishes or immediately for QTE
    const isLastLine = !pendingReply && state.lineIndex === activeScene.lines.length - 1;
    if (isLastLine && activeScene.choices && activeScene.choices.length > 0) {
      renderChoices(activeScene.choices);
    }

    autoSave();
  }

  function renderChoices(choices) {
    const layer = $('choice-layer');
    layer.innerHTML = '';
    layer.classList.remove('hidden');

    choices.forEach((ch) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `choice-btn ${ch.qte ? 'qte-choice' : ''}`;
      const lockedBySupplies = ch.requireSupplies && state.supplies < ch.requireSupplies;
      if (lockedBySupplies) {
        btn.disabled = true;
        btn.style.opacity = '0.45';
      }

      const spanText = document.createElement('span');
      spanText.textContent = formatText(ch.text);
      btn.appendChild(spanText);

      if (ch.tag) {
        const tag = document.createElement('span');
        tag.className = `choice-tag ${ch.requireSupplies ? 'cost' : ''}`;
        tag.textContent = lockedBySupplies ? '물자 부족' : ch.tag;
        btn.appendChild(tag);
      }

      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        SFX.click();
        clearQte();
        layer.classList.add('hidden');
        applyEffects(ch.effects);

        // Check mental collapse immediately
        if (state.mental <= 0) {
          showEnding('bad_mental');
          return;
        }

        if (ch.reply) {
          pendingReply = ch.reply;
          renderCurrentLine();
        } else if (ch.next) {
          loadSceneById(ch.next);
        } else {
          handleSceneEnd();
        }
      });

      layer.appendChild(btn);
    });

    if (activeScene.qteSeconds) {
      startQte(activeScene.qteSeconds, () => {
        layer.classList.add('hidden');
        triggerShake();
        showToast('⏱ 시간 초과! 대응이 늦어졌다!', 'warn');
        applyEffects(activeScene.timeoutEffects);
        if (state.mental <= 0) {
          showEnding('bad_mental');
          return;
        }
        loadSceneById(activeScene.timeoutNext);
      });
    }
  }

  function advanceDialogue() {
    if (state.mode !== 'vn' || !activeScene) return;
    // Don't advance if choices are currently awaiting selection
    if (!$('choice-layer').classList.contains('hidden')) {
      if (isTyping) finishTyping();
      return;
    }

    if (isTyping) {
      finishTyping();
      return;
    }

    SFX.click();

    if (pendingReply) {
      pendingReply = null;
      handleSceneEnd();
      return;
    }

    if (state.lineIndex < activeScene.lines.length - 1) {
      state.lineIndex += 1;
      renderCurrentLine();
    } else {
      handleSceneEnd();
    }
  }

  function handleSceneEnd() {
    clearQte();
    if (activeScene && activeScene.effects) {
      applyEffects(activeScene.effects);
      if (state.mental <= 0) {
        showEnding('bad_mental');
        return;
      }
    }

    const action = activeScene ? activeScene.onEnd : null;
    if (action === 'enter_day_map') {
      openDayMap();
    } else if (action === 'after_day_event') {
      if (state.ap > 0) {
        openDayMap();
      } else {
        startRadioInterlude();
      }
    } else if (action === 'start_night_qte') {
      startNightQte();
    } else if (action === 'enter_night_watch') {
      openNightWatchSelect();
    } else if (action === 'advance_next_day') {
      advanceNextDay();
    } else if (action === 'trigger_ending') {
      evaluateAndShowEnding();
    }
  }

  function loadSceneObj(sceneId, sceneObj, startIndex = 0) {
    state.mode = 'vn';
    state.sceneId = sceneId;
    state.lineIndex = startIndex;
    pendingReply = null;
    activeScene = sceneObj;
    if (sceneObj.shake) triggerShake();
    if (sceneObj.radio) SFX.radio();
    renderCurrentLine();
  }

  function loadSceneById(sceneId, startIndex = 0) {
    const direct =
      GAME_STORY[sceneId] ||
      GAME_STORY.radioAfter[sceneId] ||
      GAME_STORY.qteResults[sceneId];
    if (direct) {
      loadSceneObj(sceneId, direct, startIndex);
      return;
    }

    // Dynamic encoded scene IDs for save/load support
    if (sceneId.startsWith('day_')) {
      const [, memberId, idxStr] = sceneId.split('_');
      const ep = GAME_STORY.dayEvents[memberId][Number(idxStr)] || GAME_STORY.dayEvents[memberId][0];
      loadSceneObj(sceneId, { ...ep, timeOfDay: 'day', onEnd: 'after_day_event' }, startIndex);
    } else if (sceneId.startsWith('radio_day_')) {
      const dayNum = Number(sceneId.replace('radio_day_', ''));
      loadSceneObj(sceneId, GAME_STORY.radioEvents[dayNum], startIndex);
    } else if (sceneId.startsWith('qte_day_')) {
      const dayNum = Number(sceneId.replace('qte_day_', ''));
      loadSceneObj(sceneId, GAME_STORY.nightQte[dayNum], startIndex);
    } else if (sceneId.startsWith('watch_')) {
      const memberId = sceneId.replace('watch_', '');
      loadSceneObj(sceneId, GAME_STORY.nightWatchEvents[memberId], startIndex);
    } else {
      openDayMap();
    }
  }

  function resumeSceneById(sceneId, lineIndex) {
    loadSceneById(sceneId, lineIndex || 0);
  }

  /* ---------- DAY MAP & NIGHT WATCH OVERLAYS ---------- */
  function openDayMap() {
    state.mode = 'map';
    state.timeOfDay = 'day';
    state.location = 'base';
    setSceneVisuals('base', null, 'normal', false);
    $('choice-layer').classList.add('hidden');
    $('night-overlay').classList.add('hidden');
    $('map-overlay').classList.remove('hidden');

    $('map-kicker').textContent = `DAY ${state.day} · 낮 자유 탐색`;
    $('map-ap-badge').textContent = `남은 행동 ${state.ap} / 2`;

    const grid = $('map-grid');
    grid.innerHTML = '';

    GAME_DATA.memberOrder.forEach((memberId) => {
      const m = GAME_DATA.characters[memberId];
      const loc = GAME_DATA.locations[m.zone];
      const visited = state.visitedToday.includes(memberId);

      const card = document.createElement('button');
      card.type = 'button';
      card.className = 'zone-card';
      card.disabled = visited;
      card.innerHTML = `
        <div class="zone-avatar">${GAME_ART.renderCharacter(memberId, 'normal')}</div>
        <div class="zone-info">
          <div class="zone-loc">${m.badge} ${loc.name} ${visited ? '· 탐색 완료' : ''}</div>
          <div class="zone-member" style="color:${m.color}">${m.name}</div>
          <div class="zone-desc">${loc.reward}</div>
          <div class="zone-heart">💖 호감도 ${state.affection[memberId]}</div>
        </div>
      `;
      card.addEventListener('click', () => {
        SFX.click();
        state.ap -= 1;
        state.visitedToday.push(memberId);
        const epIndex = Math.min(state.memberVisits[memberId], GAME_STORY.dayEvents[memberId].length - 1);
        state.memberVisits[memberId] += 1;
        loadSceneById(`day_${memberId}_${epIndex}`);
      });
      grid.appendChild(card);
    });

    autoSave();
  }

  function startRadioInterlude() {
    const dayKey = Math.min(3, state.day);
    loadSceneById(`radio_day_${dayKey}`);
  }

  function startNightQte() {
    const dayKey = Math.min(3, state.day);
    loadSceneById(`qte_day_${dayKey}`);
  }

  function openNightWatchSelect() {
    state.mode = 'night_select';
    state.timeOfDay = 'night';
    state.location = 'rooftop';
    setSceneVisuals('rooftop', null, 'normal', false);
    $('choice-layer').classList.add('hidden');
    $('map-overlay').classList.add('hidden');
    $('night-overlay').classList.remove('hidden');

    $('night-kicker').textContent = `DAY ${state.day} · 심야 불침번`;
    const grid = $('night-grid');
    grid.innerHTML = '';

    GAME_DATA.memberOrder.forEach((memberId) => {
      const m = GAME_DATA.characters[memberId];
      const card = document.createElement('button');
      card.type = 'button';
      card.className = 'zone-card';
      card.innerHTML = `
        <div class="zone-avatar">${GAME_ART.renderCharacter(memberId, 'smile')}</div>
        <div class="zone-info">
          <div class="zone-loc">🌙 옥상 불침번 파트너</div>
          <div class="zone-member" style="color:${m.color}">${m.name}</div>
          <div class="zone-desc">${m.polaroidTitle}</div>
          <div class="zone-heart">💖 현재 호감도 ${state.affection[memberId]}</div>
        </div>
      `;
      card.addEventListener('click', () => {
        SFX.click();
        state.nightWatches[memberId] += 1;
        unlockPolaroid(memberId);
        loadSceneById(`watch_${memberId}`);
      });
      grid.appendChild(card);
    });

    autoSave();
  }

  function advanceNextDay() {
    state.day += 1;
    state.ap = 2;
    state.visitedToday = [];

    if (state.day >= 4) {
      // Day 4 Dawn Climax!
      if (state.defense <= 0 && state.supplies <= 0) {
        showEnding('bad_breach');
        return;
      }
      loadSceneById('finale_start');
    } else {
      showToast(`🌅 DAY ${state.day} 아침이 밝았다!`);
      openDayMap();
    }
  }

  /* ---------- ENDINGS ---------- */
  function evaluateAndShowEnding() {
    if (state.mental <= 0) {
      showEnding('bad_mental');
      return;
    }
    if (state.defense <= 0 && state.mental < 30) {
      showEnding('bad_breach');
      return;
    }

    // Find highest affection member
    let topMember = 'soobin';
    let topScore = -1;
    GAME_DATA.memberOrder.forEach((id) => {
      if (state.affection[id] > topScore) {
        topScore = state.affection[id];
        topMember = id;
      }
    });

    if (topScore >= 50) {
      showEnding(topMember);
    } else {
      showEnding('together');
    }
  }

  function showEnding(endingId) {
    clearQte();
    state.mode = 'ending';
    unlockEnding(endingId);

    const end = GAME_DATA.endings[endingId] || GAME_DATA.endings.together;
    $('ending-bg').innerHTML = GAME_ART.renderBackground(endingId.startsWith('bad_') ? 'hallway' : 'rooftop');
    $('ending-type-tag').textContent = end.type;
    $('ending-title').textContent = end.title;
    $('ending-desc').textContent = formatText(end.desc);
    $('ending-caption').textContent = end.caption;

    const photo = $('ending-photo');
    if (end.member) {
      photo.innerHTML = GAME_ART.renderCharacter(end.member, 'blush');
      unlockPolaroid(end.member);
    } else {
      photo.innerHTML = GAME_ART.renderBackground(endingId.startsWith('bad_') ? 'hallway' : 'rooftop');
    }

    const statsEl = $('ending-stats');
    statsEl.innerHTML = `
      <span class="ending-stat-pill">🧠 최종 멘탈 ${state.mental}</span>
      <span class="ending-stat-pill">🎒 남은 물자 ${state.supplies}</span>
      <span class="ending-stat-pill">🛡️ 방어력 ${state.defense}</span>
    `;

    switchScreen('ending');
  }

  /* ---------- MODALS (Notebook, Backlog, Save/Load, Gallery) ---------- */
  function openModal(id) {
    $(id).classList.remove('hidden');
  }

  function closeModal(id) {
    $(id).classList.add('hidden');
  }

  function closeAllModals() {
    document.querySelectorAll('.modal').forEach((m) => m.classList.add('hidden'));
  }

  function renderNotebook() {
    const list = $('notebook-list');
    list.innerHTML = '';
    GAME_DATA.memberOrder.forEach((id) => {
      const m = GAME_DATA.characters[id];
      const aff = state.affection[id] || 0;
      const item = document.createElement('div');
      item.className = 'notebook-item';
      item.innerHTML = `
        <div class="zone-avatar">${GAME_ART.renderCharacter(id, aff >= 50 ? 'blush' : 'normal')}</div>
        <div class="notebook-meta">
          <div class="notebook-name-row">
            <span class="notebook-name" style="color:${m.color}">${m.badge} ${m.name}</span>
            <span class="notebook-role">${m.role}</span>
          </div>
          <div class="heart-track"><div class="heart-fill" style="width:${aff}%"></div></div>
          <div class="notebook-bio">💖 호감도 ${aff} / 100 · ${m.bio}</div>
        </div>
      `;
      list.appendChild(item);
    });
  }

  function renderBacklog() {
    const list = $('backlog-list');
    list.innerHTML = '';
    if (state.backlog.length === 0) {
      list.innerHTML = '<p class="modal-sub">아직 기록된 대화가 없습니다.</p>';
      return;
    }
    state.backlog.forEach((entry) => {
      const div = document.createElement('div');
      div.className = 'backlog-entry';
      div.innerHTML = `<div class="backlog-speaker">${entry.speaker}</div><div>${entry.text}</div>`;
      list.appendChild(div);
    });
    list.scrollTop = list.scrollHeight;
  }

  function renderSaveSlots() {
    const container = $('save-slots');
    container.innerHTML = '';
    $('tab-save').classList.toggle('active', saveModalMode === 'save');
    $('tab-load').classList.toggle('active', saveModalMode === 'load');

    for (let i = 1; i <= 3; i++) {
      let parsed = null;
      try {
        const raw = localStorage.getItem(SLOT_PREFIX + i);
        if (raw) parsed = JSON.parse(raw);
      } catch (_) {}

      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'slot-card';
      if (saveModalMode === 'load' && !parsed) btn.disabled = true;

      btn.innerHTML = `
        <div>
          <strong>SLOT 0${i}</strong>
          <div class="notebook-role">${
            parsed
              ? `DAY ${parsed.state.day} · ${parsed.state.playerName} · 멘탈 ${parsed.state.mental}`
              : '비어 있는 슬롯'
          }</div>
        </div>
        <span class="choice-tag">${parsed ? parsed.savedAt : (saveModalMode === 'save' ? '저장 가능' : '기록 없음')}</span>
      `;

      btn.addEventListener('click', () => {
        if (saveModalMode === 'save') {
          saveToSlot(i);
        } else if (parsed) {
          SFX.click();
          loadFromData(parsed.state);
        }
      });
      container.appendChild(btn);
    }
  }

  function renderGallery() {
    const meta = loadMeta();
    const pGrid = $('gallery-polaroids');
    pGrid.innerHTML = '';

    GAME_DATA.memberOrder.forEach((id) => {
      const m = GAME_DATA.characters[id];
      const unlocked = meta.polaroids.includes(id);
      const card = document.createElement('div');
      card.className = `polaroid-frame gallery-polaroid ${unlocked ? '' : 'locked'}`;
      card.innerHTML = `
        <div class="polaroid-photo">
          ${GAME_ART.renderCharacter(id, unlocked ? 'blush' : 'normal')}
        </div>
        <div class="polaroid-caption">${unlocked ? m.polaroidTitle : `??? (${m.name})`}</div>
      `;
      pGrid.appendChild(card);
    });

    const eGrid = $('gallery-endings');
    eGrid.innerHTML = '';
    Object.values(GAME_DATA.endings).forEach((end) => {
      const unlocked = meta.endings.includes(end.id);
      const badge = document.createElement('div');
      badge.className = `ending-badge ${unlocked ? 'unlocked' : ''}`;
      badge.innerHTML = `
        <strong>${unlocked ? '✅' : '🔒'} ${unlocked ? end.title : '미해금 엔딩'}</strong>
        <span>${end.type}</span>
      `;
      eGrid.appendChild(badge);
    });
  }

  /* ---------- INITIALIZATION & EVENT BINDINGS ---------- */
  function initTitleScreen() {
    $('title-bg').innerHTML = GAME_ART.renderBackground('hallway');
    const strip = $('title-cast-strip');
    strip.innerHTML = '';
    GAME_DATA.memberOrder.forEach((id) => {
      const m = GAME_DATA.characters[id];
      const card = document.createElement('div');
      card.className = 'cast-mini-card';
      card.innerHTML = `
        <div class="cast-mini-avatar">${GAME_ART.renderCharacter(id, 'smile')}</div>
        <div class="cast-mini-name" style="color:${m.color}">${m.name}</div>
        <div class="cast-mini-role">${m.zoneName}</div>
      `;
      strip.appendChild(card);
    });
    refreshContinueButton();
    updateSoundButtons();
  }

  function bindEvents() {
    // Title actions
    $('btn-new-game').addEventListener('click', () => {
      SFX.click();
      openModal('modal-name');
      setTimeout(() => $('input-player-name').focus(), 60);
    });

    $('btn-confirm-name').addEventListener('click', () => {
      SFX.click();
      const nameVal = $('input-player-name').value.trim() || '모아';
      state = GAME_DATA.createInitialState(nameVal);
      closeModal('modal-name');
      switchScreen('game');
      loadSceneById('prologue_1');
    });

    $('input-player-name').addEventListener('keydown', (e) => {
      if (e.key === 'Enter') $('btn-confirm-name').click();
    });

    $('btn-continue').addEventListener('click', () => {
      SFX.click();
      try {
        const raw = localStorage.getItem(AUTO_SAVE_KEY);
        if (raw) loadFromData(JSON.parse(raw).state);
      } catch (_) {}
    });

    $('btn-title-load').addEventListener('click', () => {
      SFX.click();
      saveModalMode = 'load';
      renderSaveSlots();
      openModal('modal-save');
    });

    $('btn-title-gallery').addEventListener('click', () => {
      SFX.click();
      renderGallery();
      openModal('modal-gallery');
    });

    const toggleSoundHandler = () => {
      SFX.toggle();
      updateSoundButtons();
      if (SFX.isEnabled()) SFX.click();
    };
    $('btn-title-sound').addEventListener('click', toggleSoundHandler);
    $('btn-sound').addEventListener('click', toggleSoundHandler);

    // HUD buttons
    $('btn-notebook').addEventListener('click', () => {
      SFX.click();
      renderNotebook();
      openModal('modal-notebook');
    });

    $('btn-backlog').addEventListener('click', () => {
      SFX.click();
      renderBacklog();
      openModal('modal-backlog');
    });

    $('btn-save-menu').addEventListener('click', () => {
      SFX.click();
      saveModalMode = 'save';
      renderSaveSlots();
      openModal('modal-save');
    });

    $('btn-home').addEventListener('click', () => {
      SFX.click();
      clearQte();
      autoSave();
      switchScreen('title');
      refreshContinueButton();
    });

    // Save modal tabs
    $('tab-save').addEventListener('click', () => {
      SFX.click();
      saveModalMode = 'save';
      renderSaveSlots();
    });
    $('tab-load').addEventListener('click', () => {
      SFX.click();
      saveModalMode = 'load';
      renderSaveSlots();
    });

    // Ending buttons
    $('btn-ending-gallery').addEventListener('click', () => {
      SFX.click();
      renderGallery();
      openModal('modal-gallery');
    });
    $('btn-ending-title').addEventListener('click', () => {
      SFX.click();
      switchScreen('title');
      refreshContinueButton();
    });

    // Close modals
    document.querySelectorAll('[data-close]').forEach((el) => {
      el.addEventListener('click', () => {
        SFX.click();
        closeModal(el.dataset.close);
      });
    });

    // Dialogue advance (tap / click / Space / Enter)
    $('dialogue-box').addEventListener('click', advanceDialogue);
    $('vn-stage').addEventListener('click', (e) => {
      if (e.target.closest('button') || e.target.closest('.overlay-panel') || e.target.closest('.dialogue-box')) return;
      advanceDialogue();
    });

    document.addEventListener('keydown', (e) => {
      if (!screens.game.classList.contains('active')) return;
      const anyModalOpen = Array.from(document.querySelectorAll('.modal')).some((m) => !m.classList.contains('hidden'));
      if (anyModalOpen) {
        if (e.key === 'Escape') closeAllModals();
        return;
      }
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        advanceDialogue();
      }
    });
  }

  initTitleScreen();
  bindEvents();
})();
