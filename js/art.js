/* ==========================================================================
   TOMORROW X ALIVE — Anime/Manhwa SVG Character Portraits & Scene Backgrounds
   Supports 4 expressions per member: 'normal' | 'smile' | 'blush' | 'serious'
   ========================================================================== */

window.GAME_ART = (() => {
  /* ---------- SCENE BACKGROUNDS (16:9 scalable viewBox, preserveAspectRatio slice) ---------- */
  function renderBackground(locationId) {
    const scenes = {
      hallway: `
        <svg viewBox="0 0 1280 720" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="hwSky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#0b101b"/>
              <stop offset="55%" stop-color="#171f2e"/>
              <stop offset="100%" stop-color="#0c0f16"/>
            </linearGradient>
            <radialGradient id="redGlow" cx="76%" cy="22%" r="36%">
              <stop offset="0%" stop-color="#ff2e55" stop-opacity="0.58"/>
              <stop offset="100%" stop-color="#ff2e55" stop-opacity="0"/>
            </radialGradient>
            <radialGradient id="greenGlow" cx="50%" cy="28%" r="28%">
              <stop offset="0%" stop-color="#6eff66" stop-opacity="0.34"/>
              <stop offset="100%" stop-color="#6eff66" stop-opacity="0"/>
            </radialGradient>
          </defs>
          <rect width="1280" height="720" fill="url(#hwSky)"/>
          <!-- Perspective Hallway -->
          <polygon points="0,0 430,200 430,520 0,720" fill="#141a26"/>
          <polygon points="1280,0 850,200 850,520 1280,720" fill="#121722"/>
          <polygon points="0,720 430,520 850,520 1280,720" fill="#1b2230"/>
          <rect x="430" y="200" width="420" height="320" fill="#0d121c"/>
          <!-- Left Windows -->
          <polygon points="40,90 190,145 190,415 40,460" fill="#233148" stroke="#0c1018" stroke-width="8"/>
          <polygon points="220,155 340,192 340,400 220,425" fill="#1e2a3f" stroke="#0c1018" stroke-width="7"/>
          <!-- Right Classroom Doors -->
          <polygon points="940,210 1070,185 1070,565 940,515" fill="#1a1f2d" stroke="#0b0e14" stroke-width="6"/>
          <polygon points="1100,175 1255,140 1255,610 1100,565" fill="#171b27" stroke="#0b0e14" stroke-width="6"/>
          <!-- Emergency Exit Signs -->
          <rect x="602" y="218" width="76" height="28" rx="4" fill="#1b4d25" stroke="#6eff66" stroke-width="2"/>
          <text x="640" y="237" text-anchor="middle" fill="#baffb5" font-size="13" font-family="monospace" font-weight="bold">EXIT</text>
          <rect x="935" y="148" width="90" height="28" rx="4" fill="#4f1020" stroke="#ff2e55" stroke-width="2"/>
          <text x="980" y="167" text-anchor="middle" fill="#ffc4d0" font-size="13" font-family="monospace" font-weight="bold">비상구</text>
          <!-- Barricade Desks Silhouette -->
          <g fill="#26201f" stroke="#0b0d12" stroke-width="5">
            <rect x="385" y="425" width="165" height="95" rx="4" transform="rotate(-7 465 470)"/>
            <rect x="520" y="390" width="190" height="125" rx="4" transform="rotate(6 615 452)"/>
            <rect x="690" y="430" width="165" height="95" rx="4" transform="rotate(-4 770 475)"/>
            <line x1="420" y1="360" x2="540" y2="490" stroke="#393e4c" stroke-width="8"/>
            <line x1="740" y1="350" x2="670" y2="510" stroke="#393e4c" stroke-width="8"/>
          </g>
          <!-- Glows -->
          <rect width="1280" height="720" fill="url(#redGlow)"/>
          <rect width="1280" height="720" fill="url(#greenGlow)"/>
        </svg>`,

      base: `
        <svg viewBox="0 0 1280 720" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="baseWall" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#141a28"/>
              <stop offset="100%" stop-color="#0d111a"/>
            </linearGradient>
            <radialGradient id="lampGlow" cx="50%" cy="56%" r="36%">
              <stop offset="0%" stop-color="#ffbe5c" stop-opacity="0.45"/>
              <stop offset="100%" stop-color="#ffbe5c" stop-opacity="0"/>
            </radialGradient>
          </defs>
          <rect width="1280" height="720" fill="url(#baseWall)"/>
          <!-- Boarded Windows Left -->
          <rect x="40" y="75" width="230" height="310" fill="#1e2d49" stroke="#0d111a" stroke-width="10"/>
          <rect x="30" y="150" width="250" height="34" fill="#473326" transform="rotate(-6 150 165)"/>
          <rect x="30" y="255" width="250" height="36" fill="#3e2c21" transform="rotate(4 150 272)"/>
          <!-- Chalkboard with Evacuation Map -->
          <rect x="340" y="95" width="660" height="270" rx="6" fill="#162e28" stroke="#533d2d" stroke-width="12"/>
          <g stroke="#8fff94" stroke-width="2" fill="none" opacity="0.65">
            <rect x="420" y="150" width="190" height="120"/>
            <line x1="420" y1="210" x2="610" y2="210"/>
            <line x1="515" y1="150" x2="515" y2="270"/>
            <circle cx="515" cy="180" r="14" stroke="#ff5c7c"/>
            <path d="M635 160 L740 160 L740 250 L840 250" stroke-dasharray="6 5"/>
          </g>
          <!-- Polaroids on Board -->
          <rect x="860" y="135" width="52" height="62" fill="#ece6d5" transform="rotate(-5 886 166)"/>
          <rect x="866" y="141" width="40" height="38" fill="#232c3d" transform="rotate(-5 886 160)"/>
          <rect x="920" y="150" width="52" height="62" fill="#ece6d5" transform="rotate(6 946 181)"/>
          <rect x="926" y="156" width="40" height="38" fill="#292338" transform="rotate(6 946 175)"/>
          <!-- Floor & Supply Table -->
          <rect x="0" y="490" width="1280" height="230" fill="#19161b"/>
          <rect x="370" y="450" width="540" height="110" rx="6" fill="#3a2b22" stroke="#18120e" stroke-width="6"/>
          <!-- Radio with Neon Green LED -->
          <rect x="595" y="405" width="90" height="50" rx="6" fill="#1d242e" stroke="#0c0f15" stroke-width="4"/>
          <rect x="615" y="418" width="46" height="16" rx="2" fill="#6eff66" opacity="0.88"/>
          <rect width="1280" height="720" fill="url(#lampGlow)"/>
        </svg>`,

      broadcast: `
        <svg viewBox="0 0 1280 720" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="bcGlow" cx="50%" cy="44%" r="44%">
              <stop offset="0%" stop-color="#4be3ff" stop-opacity="0.32"/>
              <stop offset="100%" stop-color="#0b101b" stop-opacity="0"/>
            </radialGradient>
          </defs>
          <rect width="1280" height="720" fill="#0c121e"/>
          <!-- Soundproof Studio Glass -->
          <rect x="190" y="80" width="900" height="310" rx="8" fill="#132033" stroke="#223149" stroke-width="10"/>
          <!-- ON AIR Sign -->
          <rect x="545" y="34" width="190" height="38" rx="6" fill="#4f1020" stroke="#ff385c" stroke-width="2.5"/>
          <text x="640" y="59" text-anchor="middle" fill="#ffd2dc" font-size="18" font-family="monospace" font-weight="bold">ON AIR · 109.4</text>
          <!-- Audio Console -->
          <polygon points="120,460 1160,460 1240,680 40,680" fill="#1a2232" stroke="#0d121c" stroke-width="6"/>
          <g fill="#6eff66" opacity="0.8">
            <rect x="260" y="510" width="14" height="40" rx="2"/>
            <rect x="290" y="500" width="14" height="50" rx="2"/>
            <rect x="320" y="520" width="14" height="30" rx="2"/>
            <rect x="350" y="495" width="14" height="55" rx="2"/>
            <rect x="890" y="505" width="14" height="45" rx="2"/>
            <rect x="920" y="518" width="14" height="32" rx="2"/>
            <rect x="950" y="498" width="14" height="52" rx="2"/>
          </g>
          <rect width="1280" height="720" fill="url(#bcGlow)"/>
        </svg>`,

      gym: `
        <svg viewBox="0 0 1280 720" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="gymBg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#171224"/>
              <stop offset="60%" stop-color="#291a2a"/>
              <stop offset="100%" stop-color="#171316"/>
            </linearGradient>
            <radialGradient id="gymRed" cx="25%" cy="30%" r="42%">
              <stop offset="0%" stop-color="#ff3b6b" stop-opacity="0.34"/>
              <stop offset="100%" stop-color="#ff3b6b" stop-opacity="0"/>
            </radialGradient>
          </defs>
          <rect width="1280" height="720" fill="url(#gymBg)"/>
          <!-- High Gym Windows -->
          <g fill="#422a3c" stroke="#18121f" stroke-width="8">
            <rect x="90" y="70" width="190" height="120"/>
            <rect x="330" y="70" width="190" height="120"/>
            <rect x="760" y="70" width="190" height="120"/>
            <rect x="1000" y="70" width="190" height="120"/>
          </g>
          <!-- Basketball Backboard -->
          <rect x="545" y="135" width="190" height="125" rx="6" fill="rgba(255,255,255,0.08)" stroke="#9da7bc" stroke-width="5"/>
          <rect x="605" y="185" width="70" height="52" fill="none" stroke="#ff5c7c" stroke-width="4"/>
          <ellipse cx="640" cy="245" rx="34" ry="8" fill="none" stroke="#ff5c7c" stroke-width="5"/>
          <!-- Court Floor -->
          <polygon points="0,460 1280,460 1280,720 0,720" fill="#2c201a"/>
          <line x1="0" y1="535" x2="1280" y2="535" stroke="#d99a5b" stroke-width="4" opacity="0.32"/>
          <rect width="1280" height="720" fill="url(#gymRed)"/>
        </svg>`,

      workshop: `
        <svg viewBox="0 0 1280 720" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="wsLamp" cx="50%" cy="22%" r="48%">
              <stop offset="0%" stop-color="#ffbe55" stop-opacity="0.34"/>
              <stop offset="100%" stop-color="#0f151b" stop-opacity="0"/>
            </radialGradient>
            <radialGradient id="wsNeon" cx="18%" cy="55%" r="32%">
              <stop offset="0%" stop-color="#6eff66" stop-opacity="0.3"/>
              <stop offset="100%" stop-color="#6eff66" stop-opacity="0"/>
            </radialGradient>
          </defs>
          <rect width="1280" height="720" fill="#10151c"/>
          <!-- Pegboard with Tools -->
          <rect x="120" y="95" width="420" height="270" rx="6" fill="#1b232e" stroke="#2d3848" stroke-width="6"/>
          <rect x="740" y="95" width="420" height="270" rx="6" fill="#182738" stroke="#3c668f" stroke-width="4"/>
          <g stroke="#7bc3ff" stroke-width="2" fill="none" opacity="0.45">
            <rect x="780" y="135" width="160" height="100"/>
            <circle cx="1020" cy="195" r="42"/>
            <line x1="780" y1="275" x2="1110" y2="275" stroke-dasharray="8 6"/>
          </g>
          <!-- Hanging Lamps -->
          <polygon points="390,0 440,0 480,75 350,75" fill="#232a35"/>
          <polygon points="840,0 890,0 930,75 800,75" fill="#232a35"/>
          <!-- Workbench -->
          <rect x="0" y="470" width="1280" height="250" fill="#271f1a"/>
          <rect x="0" y="455" width="1280" height="24" fill="#463529"/>
          <rect width="1280" height="720" fill="url(#wsLamp)"/>
          <rect width="1280" height="720" fill="url(#wsNeon)"/>
        </svg>`,

      library: `
        <svg viewBox="0 0 1280 720" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="libMoon" cx="50%" cy="32%" r="48%">
              <stop offset="0%" stop-color="#8cb4ff" stop-opacity="0.34"/>
              <stop offset="100%" stop-color="#0b1020" stop-opacity="0"/>
            </radialGradient>
          </defs>
          <rect width="1280" height="720" fill="#0d1324"/>
          <!-- Tall Moonlit Windows -->
          <rect x="440" y="55" width="175" height="390" fill="#213559" stroke="#0d1324" stroke-width="10"/>
          <rect x="665" y="55" width="175" height="390" fill="#213559" stroke="#0d1324" stroke-width="10"/>
          <!-- Bookshelves Left & Right -->
          <g fill="#1c1926" stroke="#0b0e18" stroke-width="6">
            <rect x="20" y="40" width="340" height="580"/>
            <rect x="920" y="40" width="340" height="580"/>
          </g>
          <g fill="#312b42">
            <rect x="45" y="110" width="290" height="14"/>
            <rect x="45" y="220" width="290" height="14"/>
            <rect x="45" y="330" width="290" height="14"/>
            <rect x="945" y="110" width="290" height="14"/>
            <rect x="945" y="220" width="290" height="14"/>
            <rect x="945" y="330" width="290" height="14"/>
          </g>
          <!-- Reading Table -->
          <rect x="280" y="500" width="720" height="220" fill="#211a21"/>
          <rect width="1280" height="720" fill="url(#libMoon)"/>
        </svg>`,

      infirmary: `
        <svg viewBox="0 0 1280 720" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="infSun" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stop-color="#3c2824"/>
              <stop offset="50%" stop-color="#221e28"/>
              <stop offset="100%" stop-color="#12141e"/>
            </linearGradient>
            <radialGradient id="infWarm" cx="52%" cy="35%" r="48%">
              <stop offset="0%" stop-color="#ffc97a" stop-opacity="0.42"/>
              <stop offset="100%" stop-color="#ffc97a" stop-opacity="0"/>
            </radialGradient>
          </defs>
          <rect width="1280" height="720" fill="url(#infSun)"/>
          <!-- Curtain Window -->
          <rect x="370" y="70" width="540" height="320" fill="#5e4333" stroke="#1e1b24" stroke-width="10"/>
          <rect x="370" y="70" width="130" height="320" fill="#d9c6b0" opacity="0.24"/>
          <rect x="780" y="70" width="130" height="320" fill="#d9c6b0" opacity="0.24"/>
          <!-- Medicine Cabinet -->
          <rect x="980" y="130" width="210" height="290" rx="8" fill="#272c38" stroke="#141822" stroke-width="6"/>
          <rect x="1074" y="185" width="22" height="66" rx="3" fill="#6eff66" opacity="0.75"/>
          <rect x="1052" y="207" width="66" height="22" rx="3" fill="#6eff66" opacity="0.75"/>
          <!-- Infirmary Bed -->
          <rect x="80" y="455" width="420" height="145" rx="10" fill="#3a3f4e"/>
          <rect x="105" y="435" width="115" height="38" rx="12" fill="#d8dce6" opacity="0.8"/>
          <rect width="1280" height="720" fill="url(#infWarm)"/>
        </svg>`,

      rooftop: `
        <svg viewBox="0 0 1280 720" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="nightSky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#070b18"/>
              <stop offset="55%" stop-color="#121e38"/>
              <stop offset="100%" stop-color="#192334"/>
            </linearGradient>
            <radialGradient id="lantern" cx="34%" cy="68%" r="24%">
              <stop offset="0%" stop-color="#ffba59" stop-opacity="0.52"/>
              <stop offset="100%" stop-color="#ffba59" stop-opacity="0"/>
            </radialGradient>
          </defs>
          <rect width="1280" height="720" fill="url(#nightSky)"/>
          <!-- Stars & Crescent Moon -->
          <g fill="#eaf2ff" opacity="0.85">
            <circle cx="140" cy="85" r="2"/>
            <circle cx="290" cy="145" r="1.8"/>
            <circle cx="480" cy="70" r="2.2"/>
            <circle cx="660" cy="120" r="1.5"/>
            <circle cx="960" cy="90" r="2.1"/>
            <circle cx="1120" cy="160" r="1.8"/>
            <circle cx="1040" cy="220" r="1.4"/>
            <circle cx="220" cy="210" r="1.6"/>
          </g>
          <path d="M845 95 A42 42 0 1 0 885 168 A34 34 0 1 1 845 95 Z" fill="#f3f6ff"/>
          <!-- Distant City Skyline -->
          <path d="M0,450 L90,450 L90,390 L160,390 L160,440 L250,440 L250,360 L330,360 L330,435 L460,435 L460,380 L550,380 L550,445 L720,445 L720,370 L810,370 L810,435 L980,435 L980,385 L1080,385 L1080,450 L1280,450 L1280,520 L0,520 Z" fill="#0d1321"/>
          <!-- Rooftop Fence -->
          <g stroke="#566680" stroke-width="2.5" opacity="0.55">
            <line x1="0" y1="260" x2="1280" y2="260"/>
            <line x1="0" y1="490" x2="1280" y2="490"/>
            <line x1="180" y1="250" x2="180" y2="510"/>
            <line x1="480" y1="250" x2="480" y2="510"/>
            <line x1="780" y1="250" x2="780" y2="510"/>
            <line x1="1080" y1="250" x2="1080" y2="510"/>
          </g>
          <!-- Concrete Ledge & Lantern -->
          <rect x="0" y="495" width="1280" height="225" fill="#1b202b"/>
          <rect x="415" y="438" width="38" height="58" rx="8" fill="#2c241f" stroke="#ffb85c" stroke-width="3"/>
          <rect x="424" y="452" width="20" height="30" rx="4" fill="#ffd98a"/>
          <rect width="1280" height="720" fill="url(#lantern)"/>
        </svg>`
    };
    return scenes[locationId] || scenes.base;
  }

  /* ---------- CHARACTER PORTRAITS (Expressive Manhwa/Anime SVG) ---------- */
  function renderCharacter(memberId, expression = 'normal') {
    const presets = {
      soobin: {
        hair: '#1a202c', hairHighlight: '#36435e', skin: '#fce3d2', skinShade: '#e8c2ab',
        eyes: '#3a2a28', accent: '#6ce5ff',
        jacket: '#1b2740', jacketTrim: '#2e4166', shirt: '#f4f7fb', tie: '#243454',
        hairStyle: 'soobin', prop: 'radio', glasses: false, armband: true
      },
      yeonjun: {
        hair: '#1d1c24', hairHighlight: '#453b54', skin: '#f9ded0', skinShade: '#e4bca8',
        eyes: '#45302c', accent: '#ff6b9d',
        jacket: '#f3f6fb', jacketTrim: '#d7dfeb', shirt: '#f3f6fb', tie: '#1e2433',
        hairStyle: 'yeonjun', prop: 'bat', glasses: false, openCollar: true
      },
      beomgyu: {
        hair: '#3e2920', hairHighlight: '#69493a', skin: '#fde5d4', skinShade: '#e8c4ad',
        eyes: '#4f3325', accent: '#8dff70',
        jacket: '#1e2633', jacketTrim: '#344157', shirt: '#f2f5f9', tie: '#2d3748',
        hairStyle: 'beomgyu', prop: 'headphones', glasses: false
      },
      taehyun: {
        hair: '#1b1f29', hairHighlight: '#3b455e', skin: '#fbe4d8', skinShade: '#e3c0b0',
        eyes: '#303b52', accent: '#b89cff',
        jacket: '#23283b', jacketTrim: '#3a4261', shirt: '#f6f8fc', tie: '#1a2033',
        hairStyle: 'taehyun', prop: 'map', glasses: true
      },
      hueningkai: {
        hair: '#876348', hairHighlight: '#b88f6c', skin: '#ffeadc', skinShade: '#ebc8b3',
        eyes: '#593e2b', accent: '#ffcb6b',
        jacket: '#e8dcc8', jacketTrim: '#cbb99e', shirt: '#ffffff', tie: '#2a374d',
        hairStyle: 'hueningkai', prop: 'medkit', glasses: false
      }
    };

    const c = presets[memberId];
    if (!c) return '';

    // Dynamic expressions (brows, eyes, mouth, blush)
    let leftBrow = 'M158 178 Q174 172 190 177';
    let rightBrow = 'M210 177 Q226 172 242 178';
    let mouth = 'M189 242 Q200 248 211 242';
    let blushOpacity = '0.16';
    let eyeHighlight = '';

    if (expression === 'smile') {
      leftBrow = 'M158 175 Q174 168 190 174';
      rightBrow = 'M210 174 Q226 168 242 175';
      mouth = 'M186 239 Q200 253 214 239';
      blushOpacity = '0.28';
      eyeHighlight = '<circle cx="179" cy="197" r="2.2" fill="#fff"/><circle cx="229" cy="197" r="2.2" fill="#fff"/>';
    } else if (expression === 'blush') {
      leftBrow = 'M158 180 Q174 174 190 181';
      rightBrow = 'M210 181 Q226 174 242 180';
      mouth = 'M191 243 Q200 249 209 243';
      blushOpacity = '0.58';
    } else if (expression === 'serious') {
      leftBrow = 'M158 176 Q175 180 191 184';
      rightBrow = 'M209 184 Q225 180 242 176';
      mouth = 'M190 245 Q200 242 210 245';
      blushOpacity = '0.08';
    }

    // Hair Back & Front Shapes per member
    let hairBack = '';
    let hairFront = '';
    if (c.hairStyle === 'soobin') {
      hairBack = `<path d="M126 198 Q122 108 200 94 Q278 108 274 198 L266 226 L134 226 Z" fill="${c.hair}"/>`;
      hairFront = `
        <path d="M132 182 Q132 104 200 96 Q268 104 268 182 Q256 150 236 142 Q226 170 212 176 Q204 150 196 144 Q182 172 164 178 Q154 152 132 182 Z" fill="${c.hair}"/>
        <path d="M162 126 Q198 112 238 128" stroke="${c.hairHighlight}" stroke-width="5" stroke-linecap="round" fill="none" opacity="0.65"/>`;
    } else if (c.hairStyle === 'yeonjun') {
      hairBack = `<path d="M118 202 Q115 98 200 88 Q285 98 282 202 L268 232 L132 232 Z" fill="${c.hair}"/>`;
      hairFront = `
        <path d="M124 186 Q128 96 200 92 Q272 96 276 186 Q256 146 232 140 Q222 174 206 178 Q200 136 192 142 Q178 174 162 176 Q146 148 124 186 Z" fill="${c.hair}"/>
        <path d="M148 118 Q195 102 252 122" stroke="${c.hairHighlight}" stroke-width="5" stroke-linecap="round" fill="none" opacity="0.7"/>`;
    } else if (c.hairStyle === 'beomgyu') {
      hairBack = `<path d="M114 236 Q114 102 200 90 Q286 102 286 236 Q266 254 252 240 L148 240 Q134 254 114 236 Z" fill="${c.hair}"/>`;
      hairFront = `
        <path d="M124 196 Q126 100 200 94 Q274 100 276 196 Q254 154 234 146 Q220 176 204 174 Q194 146 186 150 Q174 178 156 178 Q144 154 124 196 Z" fill="${c.hair}"/>
        <path d="M156 124 Q200 108 244 126" stroke="${c.hairHighlight}" stroke-width="6" stroke-linecap="round" fill="none" opacity="0.72"/>`;
    } else if (c.hairStyle === 'taehyun') {
      hairBack = `<path d="M128 194 Q126 104 200 94 Q274 104 272 194 L262 222 L138 222 Z" fill="${c.hair}"/>`;
      hairFront = `
        <path d="M132 178 Q134 100 200 94 Q266 100 268 178 Q248 148 224 146 Q216 172 204 174 Q194 144 184 174 Q166 170 156 146 Q142 158 132 178 Z" fill="${c.hair}"/>
        <path d="M164 122 Q200 110 236 122" stroke="${c.hairHighlight}" stroke-width="4.5" stroke-linecap="round" fill="none" opacity="0.65"/>`;
    } else {
      // hueningkai
      hairBack = `<path d="M120 208 Q118 98 200 88 Q282 98 280 208 Q264 230 250 222 L150 222 Q136 230 120 208 Z" fill="${c.hair}"/>`;
      hairFront = `
        <path d="M126 186 Q128 96 200 92 Q272 96 274 186 Q252 146 230 144 Q218 174 202 170 Q192 142 182 172 Q166 172 152 146 Q140 158 126 186 Z" fill="${c.hair}"/>
        <path d="M152 122 Q200 105 248 124" stroke="${c.hairHighlight}" stroke-width="6" stroke-linecap="round" fill="none" opacity="0.75"/>`;
    }

    // Signature Props
    let propSvg = '';
    if (c.prop === 'bat') {
      propSvg = `
        <g transform="rotate(34 290 255)">
          <rect x="268" y="130" width="26" height="210" rx="12" fill="#8b6240" stroke="#18120e" stroke-width="4"/>
          <rect x="272" y="295" width="18" height="40" rx="4" fill="#e5e8ef"/>
        </g>`;
    } else if (c.prop === 'radio') {
      propSvg = `
        <g transform="translate(245 318)">
          <rect x="24" y="-34" width="6" height="40" rx="3" fill="#2c3545"/>
          <rect x="0" y="0" width="44" height="72" rx="8" fill="#1e2532" stroke="#0d111a" stroke-width="3.5"/>
          <rect x="8" y="10" width="28" height="14" rx="3" fill="#6eff66" opacity="0.88"/>
          <line x1="10" y1="34" x2="34" y2="34" stroke="#53627a" stroke-width="3"/>
          <line x1="10" y1="44" x2="34" y2="44" stroke="#53627a" stroke-width="3"/>
        </g>`;
    } else if (c.prop === 'headphones') {
      propSvg = `
        <g>
          <path d="M148 292 Q200 336 252 292" fill="none" stroke="#2d3442" stroke-width="11" stroke-linecap="round"/>
          <rect x="132" y="278" width="24" height="38" rx="9" fill="#1c212b" stroke="#8dff70" stroke-width="2.5"/>
          <rect x="244" y="278" width="24" height="38" rx="9" fill="#1c212b" stroke="#8dff70" stroke-width="2.5"/>
        </g>`;
    } else if (c.prop === 'map') {
      propSvg = `
        <g transform="translate(105 340) rotate(-6)">
          <rect x="0" y="0" width="110" height="72" rx="4" fill="#dce6f5" stroke="#232c3d" stroke-width="3"/>
          <path d="M14 18 L52 18 L52 54 L94 54" fill="none" stroke="#4668a8" stroke-width="2.5"/>
          <circle cx="52" cy="36" r="8" fill="none" stroke="#ff2e55" stroke-width="2.5"/>
        </g>`;
    } else if (c.prop === 'medkit') {
      propSvg = `
        <g transform="translate(132 342)">
          <rect x="46" y="-12" width="44" height="14" rx="5" fill="none" stroke="#9ea8ba" stroke-width="4"/>
          <rect x="0" y="0" width="136" height="84" rx="12" fill="#f3f6fa" stroke="#242b38" stroke-width="4"/>
          <rect x="61" y="22" width="14" height="40" rx="2" fill="#2bc468"/>
          <rect x="48" y="35" width="40" height="14" rx="2" fill="#2bc468"/>
        </g>`;
    }

    const glassesSvg = c.glasses ? `
      <g fill="rgba(220,235,255,0.12)" stroke="#cfd8e8" stroke-width="2.6">
        <rect x="152" y="185" width="40" height="27" rx="8"/>
        <rect x="208" y="185" width="40" height="27" rx="8"/>
        <line x1="192" y1="196" x2="208" y2="196"/>
      </g>` : '';

    const armbandSvg = c.armband ? `
      <rect x="275" y="368" width="42" height="24" rx="3" fill="#8f1d2e" stroke="#e3b659" stroke-width="2.5" transform="rotate(-10 296 380)"/>` : '';

    return `
      <svg viewBox="0 0 400 460" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${memberId} 일러스트">
        <defs>
          <radialGradient id="aura_${memberId}" cx="50%" cy="42%" r="48%">
            <stop offset="0%" stop-color="${c.accent}" stop-opacity="0.28"/>
            <stop offset="100%" stop-color="${c.accent}" stop-opacity="0"/>
          </radialGradient>
        </defs>
        <!-- Soft Character Backlight -->
        <circle cx="200" cy="210" r="170" fill="url(#aura_${memberId})"/>
        ${c.prop === 'bat' ? propSvg : ''}
        <!-- Hair Back -->
        ${hairBack}
        <!-- Shoulders & Uniform -->
        <path d="M74 460 L96 330 Q114 294 166 286 L234 286 Q286 294 304 330 L326 460 Z" fill="${c.jacket}" stroke="#10141f" stroke-width="4.5"/>
        <!-- Shirt V-neck & Collar -->
        <polygon points="164,286 200,364 236,286" fill="${c.shirt}"/>
        <polygon points="166,284 188,318 156,314" fill="${c.shirt}" stroke="#161b28" stroke-width="2.5"/>
        <polygon points="234,284 212,318 244,314" fill="${c.shirt}" stroke="#161b28" stroke-width="2.5"/>
        <!-- Tie -->
        <polygon points="193,308 207,308 212,396 200,414 188,396" fill="${c.tie}" stroke="#10141f" stroke-width="2.5"/>
        <!-- Jacket Lapels -->
        <path d="M164 286 L186 382 L144 358 Z" fill="${c.jacketTrim}" opacity="0.65"/>
        <path d="M236 286 L214 382 L256 358 Z" fill="${c.jacketTrim}" opacity="0.65"/>
        ${armbandSvg}
        <!-- Neck -->
        <rect x="181" y="252" width="38" height="44" rx="14" fill="${c.skin}"/>
        <path d="M181 264 Q200 282 219 264 L219 276 Q200 292 181 276 Z" fill="${c.skinShade}"/>
        <!-- Ears -->
        <ellipse cx="140" cy="206" rx="10" ry="15" fill="${c.skin}" stroke="#2b1e1c" stroke-width="2.2"/>
        <ellipse cx="260" cy="206" rx="10" ry="15" fill="${c.skin}" stroke="#2b1e1c" stroke-width="2.2"/>
        <!-- Face Contour -->
        <path d="M142 164 Q142 114 200 114 Q258 114 258 164 L254 214 Q250 256 200 272 Q150 256 146 214 Z" fill="${c.skin}" stroke="#2b1e1c" stroke-width="2.8"/>
        <!-- Cheek Blush -->
        <ellipse cx="166" cy="222" rx="14" ry="7" fill="#ff6b8b" opacity="${blushOpacity}"/>
        <ellipse cx="234" cy="222" rx="14" ry="7" fill="#ff6b8b" opacity="${blushOpacity}"/>
        <!-- Eyes -->
        <g>
          <!-- Left Eye -->
          <path d="M159 197 Q174 187 189 197 Q174 206 159 197 Z" fill="#ffffff"/>
          <circle cx="174" cy="197" r="7.5" fill="${c.eyes}"/>
          <circle cx="174" cy="197" r="3.6" fill="#11131a"/>
          <circle cx="171" cy="194" r="2.4" fill="#ffffff"/>
          <path d="M157 195 Q174 185 190 196" fill="none" stroke="#18151d" stroke-width="3.2" stroke-linecap="round"/>
          <!-- Right Eye -->
          <path d="M211 197 Q226 187 241 197 Q226 206 211 197 Z" fill="#ffffff"/>
          <circle cx="226" cy="197" r="7.5" fill="${c.eyes}"/>
          <circle cx="226" cy="197" r="3.6" fill="#11131a"/>
          <circle cx="223" cy="194" r="2.4" fill="#ffffff"/>
          <path d="M210 196 Q226 185 243 195" fill="none" stroke="#18151d" stroke-width="3.2" stroke-linecap="round"/>
          ${eyeHighlight}
        </g>
        <!-- Eyebrows -->
        <path d="${leftBrow}" fill="none" stroke="${c.hair}" stroke-width="3.2" stroke-linecap="round"/>
        <path d="${rightBrow}" fill="none" stroke="${c.hair}" stroke-width="3.2" stroke-linecap="round"/>
        <!-- Nose & Mouth -->
        <path d="M199 208 L197 224 L203 226" fill="none" stroke="#c89a84" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="${mouth}" fill="none" stroke="#7d4745" stroke-width="2.8" stroke-linecap="round"/>
        ${glassesSvg}
        <!-- Hair Front -->
        ${hairFront}
        <!-- Foreground Props -->
        ${c.prop !== 'bat' ? propSvg : ''}
      </svg>`;
  }

  return { renderBackground, renderCharacter };
})();
