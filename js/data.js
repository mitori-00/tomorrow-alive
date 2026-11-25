/* ==========================================================================
   TOMORROW X ALIVE — Core Game Data (Characters, Locations, Endings, Defaults)
   ========================================================================== */

window.GAME_DATA = {
  characters: {
    soobin: {
      id: 'soobin',
      name: '수빈',
      en: 'SOOBIN',
      role: '학생회장 · 브레인 리더',
      zone: 'broadcast',
      zoneName: '방송실',
      color: '#6ce5ff',
      badge: '📡',
      shortDesc: '교내 방송실과 교무실을 거점으로 생존자를 통솔하는 다정한 리더.',
      bio: '겉으로는 누구보다 침착하고 다정하지만, 모두를 지켜야 한다는 책임감에 밤마다 흔들리는 학생회장.',
      polaroidTitle: '새벽 2시의 교내 방송실',
      polaroidQuote: '"네 목소리가 들려야 나도 버틸 수 있어."'
    },
    yeonjun: {
      id: 'yeonjun',
      name: '연준',
      en: 'YEONJUN',
      role: '행동파 · 척후병 & 선봉',
      zone: 'gym',
      zoneName: '체육관',
      color: '#ff6b9d',
      badge: '⚾',
      shortDesc: '야구 배트를 들고 가장 먼저 길을 뚫는 올라운더 선봉.',
      bio: '장난기 넘치고 능글맞게 긴장을 풀어주지만, 좀비가 들이닥치면 망설임 없이 온몸으로 너를 감싼다.',
      polaroidTitle: '붕대 감은 손과 체육관의 노을',
      polaroidQuote: '"겁먹지 마. 내 등 뒤는 무조건 안전지대야."'
    },
    beomgyu: {
      id: 'beomgyu',
      name: '범규',
      en: 'BEOMGYU',
      role: '메이커 · 무드메이커',
      zone: 'workshop',
      zoneName: '기술실',
      color: '#8dff70',
      badge: '🔧',
      shortDesc: '공구와 폐자재로 함정과 방어선을 만들고 음악으로 멘탈을 지키는 엔지니어.',
      bio: '날카로운 상황에서도 위트와 카세트 음악으로 분위기를 띄우며 옥상 아지트를 지키는 분위기 메이커.',
      polaroidTitle: '이어폰 한쪽을 나눠 낀 기술실',
      polaroidQuote: '"좀비 소리보다 우리 노래가 더 크면 이긴 거지!"'
    },
    taehyun: {
      id: 'taehyun',
      name: '태현',
      en: 'TAEHYUN',
      role: '냉철한 전략가 · 수색조',
      zone: 'library',
      zoneName: '도서관',
      color: '#b89cff',
      badge: '🗺️',
      shortDesc: '도서관과 망루에서 좀비 이동 경로와 생존 확률을 계산하는 분석파.',
      bio: '감정보다 확률을 앞세우는 냉철한 현실주의자지만, 유독 너의 안전 앞에서만 계산이 흔들린다.',
      polaroidTitle: '달빛 아래 도서관 탈출 도면',
      polaroidQuote: '"확률상 가장 위험한 변수가… 너야. 그래도 포기 못 해."'
    },
    hueningkai: {
      id: 'hueningkai',
      name: '휴닝카이',
      en: 'HUENINGKAI',
      role: '의무병 · 보급 & 멘탈 케어',
      zone: 'infirmary',
      zoneName: '보건실',
      color: '#ffcb6b',
      badge: '🩹',
      shortDesc: '보건실 약품과 식량을 관리하며 팀의 희망을 지키는 든든한 지원군.',
      bio: '절망 속에서도 순수한 미소로 모두를 다독이는 비타민. 하지만 위기 순간엔 누구보다 단단한 담력을 보여준다.',
      polaroidTitle: '노을빛 보건실의 구급상자',
      polaroidQuote: '"다치지 마. 네가 웃어야 우리 내일도 살아 있으니까."'
    }
  },

  memberOrder: ['soobin', 'yeonjun', 'beomgyu', 'taehyun', 'hueningkai'],

  locations: {
    hallway: { id: 'hallway', name: '봉쇄된 복도' },
    base: { id: 'base', name: '생존 거점 (2-3반)' },
    broadcast: { id: 'broadcast', name: '방송실', member: 'soobin', reward: '배터리·통신장비' },
    gym: { id: 'gym', name: '체육관', member: 'yeonjun', reward: '방어 장비·식수' },
    workshop: { id: 'workshop', name: '기술실', member: 'beomgyu', reward: '함정 부품·공구' },
    library: { id: 'library', name: '도서관', member: 'taehyun', reward: '교내 도면·비상식량' },
    infirmary: { id: 'infirmary', name: '보건실', member: 'hueningkai', reward: '구급약품·멘탈 회복' },
    rooftop: { id: 'rooftop', name: '학교 옥상' }
  },

  endings: {
    soobin: {
      id: 'soobin',
      type: 'TRUE ENDING · SOOBIN',
      member: 'soobin',
      title: '새벽의 방송, 너에게만',
      caption: 'SOOBIN X YOU · DAWN ON AIR',
      desc: '구조 헬기가 옥상에 내려앉기 직전, 수빈은 마지막으로 교내 방송 마이크를 켰다. "이제 모두가 안전해요." 그리고 마이크를 끈 뒤, 오직 네 귀에만 들리도록 작게 속삭였다. "무너진 학교에서 네가 내 유일한 내일이었어."'
    },
    yeonjun: {
      id: 'yeonjun',
      type: 'TRUE ENDING · YEONJUN',
      member: 'yeonjun',
      title: '내 등 뒤는 언제나 네 자리',
      caption: 'YEONJUN X YOU · SAFE ZONE',
      desc: '바리케이드를 뚫고 옥상 철문을 잠근 연준은 붕대 감은 손으로 네 손목을 꼭 잡았다. 거친 숨을 고르며 픽 웃는 얼굴은 여전했다. "약속 지켰지? 이제 좀비 없는 데서 제대로 데이트하자."'
    },
    beomgyu: {
      id: 'beomgyu',
      type: 'TRUE ENDING · BEOMGYU',
      member: 'beomgyu',
      title: '옥상 위, 우리만의 플레이리스트',
      caption: 'BEOMGYU X YOU · TRACK 01',
      desc: '여명이 번지는 옥상 난간에 나란히 기대어 범규가 헤드폰 한쪽을 건넸다. 낡은 카세트에서 흘러나온 기타 선율 너머로 구조 헬기의 프로펠러 소리가 다가왔다. "이 노래 끝나기 전에, 우리 진짜 내일로 가자."'
    },
    taehyun: {
      id: 'taehyun',
      type: 'TRUE ENDING · TAEHYUN',
      member: 'taehyun',
      title: '생존 확률 100%의 변수',
      caption: 'TAEHYUN X YOU · PROBABILITY 100%',
      desc: '구겨진 학교 도면을 접어 주머니에 넣은 태현이 안경 너머로 너를 똑바로 바라봤다. "처음엔 네가 내 계획을 다 흔드는 변수라고 생각했어. 근데 지금은 알아. 너랑 함께 살아남는 게 내 유일한 정답이야."'
    },
    hueningkai: {
      id: 'hueningkai',
      type: 'TRUE ENDING · HUENINGKAI',
      member: 'hueningkai',
      title: '가장 따뜻한 구급상자',
      caption: 'HUENINGKAI X YOU · FIRST AID',
      desc: '헬기 불빛이 옥상을 비추자 휴닝카이는 네 손등에 마지막 반창고를 붙여주며 환하게 웃었다. "다 끝났어! 이제 아픈 일 말고, 우리 같이 맛있는 거 먹고 웃을 일만 남았어. 약속!"'
    },
    together: {
      id: 'together',
      type: 'GROUP ENDING · TXT',
      member: null,
      title: 'TOMORROW X TOGETHER',
      caption: 'ALL 6 SURVIVORS · TOMORROW ALIVE',
      desc: '수빈의 통솔, 연준의 돌파, 범규의 함정, 태현의 전략, 휴닝카이의 보급, 그리고 네 선택이 하나가 되어 단 한 명의 낙오자 없이 새벽을 맞이했다. 옥상 위로 떠오른 아침 해 아래, 여섯 명의 내일이 다시 시작된다.'
    },
    bad_mental: {
      id: 'bad_mental',
      type: 'BAD ENDING · PANIC',
      member: null,
      title: '꺼져버린 비상등',
      caption: 'SIGNAL LOST · MENTAL COLLAPSE',
      desc: '끝없는 긴장과 공포 끝에 멘탈이 한계에 다다랐다. 복도 너머의 발소리에 몸이 굳어버린 순간, 무전기 너머로 멤버들이 애타게 네 이름을 부르는 소리만 멀어져 갔다… (Tip: 보건실 탐색과 휴식으로 멘탈을 관리해 보세요!)'
    },
    bad_breach: {
      id: 'bad_breach',
      type: 'BAD ENDING · BREACHED',
      member: null,
      title: '무너진 바리케이드',
      caption: 'OUTPOST BREACHED · DAY 04',
      desc: '물자와 방어력이 바닥난 채 맞이한 마지막 밤. 2-3반 교실 문이 끝내 버티지 못했다. 칠흑 같은 어둠 속에서 다음 기회를 기약하며 기록이 끊겼다… (Tip: 낮 탐색으로 물자를 모아 야간 방어전에 대비하세요!)'
    }
  },

  createInitialState(playerName = '모아') {
    return {
      playerName: playerName.trim() || '모아',
      day: 1,
      timeOfDay: 'morning', // morning | day | evening | night
      location: 'hallway',
      mental: 80,
      supplies: 3,
      defense: 2,
      ap: 2,
      visitedToday: [],
      memberVisits: { soobin: 0, yeonjun: 0, beomgyu: 0, taehyun: 0, hueningkai: 0 },
      nightWatches: { soobin: 0, yeonjun: 0, beomgyu: 0, taehyun: 0, hueningkai: 0 },
      affection: { soobin: 10, yeonjun: 10, beomgyu: 10, taehyun: 10, hueningkai: 10 },
      sceneId: 'prologue_1',
      lineIndex: 0,
      backlog: [],
      mode: 'vn' // vn | map | night_select | ending
    };
  }
};
