/* ==========================================================================
   TOMORROW X ALIVE — Branching Korean Visual Novel Script
   - Prologue (Day 1 Outbreak)
   - 5 Members × 3 Daytime 1:1 Episodes (15 scenes)
   - 3 Walkie-Talkie Radio Interludes (Day 1~3)
   - 3 Night Perimeter Defense QTE Events (Day 1~3)
   - 5 Members × 2 Night Watch Rooftop Talks (Polaroid Unlocks)
   - Day 4 Finale & Climax QTE
   ========================================================================== */

window.GAME_STORY = {
  /* ==================== PROLOGUE ==================== */
  prologue_1: {
    location: 'hallway',
    timeOfDay: 'morning',
    lines: [
      { speaker: null, text: '오후 3시 17분. 평범해야 할 5교시 종소리 대신, 귀를 찢는 교내 비상 사이렌이 울려 퍼졌다.' },
      { speaker: null, text: '창밖 운동장은 순식간에 아수라장이 되었고, 정체불명의 감염자들이 본관 현관 유리문을 부수고 밀려 들어왔다.' },
      { speaker: '연준', char: 'yeonjun', expr: 'serious', text: '야, {name}! 거기 멍하니 서 있지 말고 빨리 이쪽으로 뛰어!' },
      { speaker: null, text: '손에 야구 배트를 쥔 연준이 복도 끝에서 너의 손목을 확 잡아당겨 책상 바리케이드 안쪽으로 끌어당겼다.' },
      { speaker: '수빈', char: 'soobin', expr: 'serious', text: '모두 무사해? 2층 동쪽 계단 방화문은 방금 잠갔어. 일단 2-3반 교실을 거점으로 삼자.' },
      { speaker: '태현', char: 'taehyun', expr: 'normal', text: '지금 외부 통신망은 전부 마비됐어. 교내 무전기랑 방송실 장비만 살아 있어. 당분간은 여기서 버텨야 해.' },
      { speaker: '범규', char: 'beomgyu', expr: 'smile', text: '에이, 너무 무서워하지 마. 기술실 공구만 있으면 내가 이 학교 최강 요새로 만들어 줄 테니까!' },
      { speaker: '휴닝카이', char: 'hueningkai', expr: 'smile', text: '{name}, 다친 데는 없어? 보건실 구급상자 챙겨왔으니까 조금이라도 긁혔으면 바로 말해!' }
    ],
    choices: [
      {
        text: '수빈에게: "학생회장, 우리 앞으로 어떻게 움직이면 될까?"',
        tag: '수빈 호감도 ↑',
        effects: { affection: { soobin: 12 }, mental: 5 },
        next: 'prologue_after_soobin'
      },
      {
        text: '연준에게: "방금 구해줘서 고마워… 손에 붕대는 괜찮아?"',
        tag: '연준 호감도 ↑',
        effects: { affection: { yeonjun: 12 }, mental: 5 },
        next: 'prologue_after_yeonjun'
      },
      {
        text: '범규·태현·휴닝카이에게: "다들 무사해서 다행이야. 나도 도울게!"',
        tag: '팀 전원 호감도 ↑',
        effects: { affection: { beomgyu: 7, taehyun: 7, hueningkai: 7 }, supplies: 1 },
        next: 'prologue_after_team'
      }
    ]
  },

  prologue_after_soobin: {
    location: 'base',
    timeOfDay: 'day',
    lines: [
      { speaker: '수빈', char: 'soobin', expr: 'smile', text: '네가 그렇게 침착하게 물어봐 주니까 나도 좀 진정된다, {name}.' },
      { speaker: '수빈', char: 'soobin', expr: 'normal', text: '낮에는 두 구역씩 돌아다니며 물자를 확보하고, 밤엔 교대로 불침번을 서면서 구조 신호를 보낼 거야.' },
      { speaker: null, text: '수빈이 네 손에 작은 교내 무전기를 쥐여 주었다. 드디어 봉쇄된 학교에서의 생존 첫날이 시작된다.' }
    ],
    onEnd: 'enter_day_map'
  },

  prologue_after_yeonjun: {
    location: 'base',
    timeOfDay: 'day',
    lines: [
      { speaker: '연준', char: 'yeonjun', expr: 'smile', text: '하, 이 정도는 긁힌 것도 아니지. 네가 무사한 게 제일 중요해.' },
      { speaker: '연준', char: 'yeonjun', expr: 'blush', text: '…뭐, 그래도 걱정해 주는 건 좀 기분 좋네. 낮에 체육관 수색할 때 나랑 같이 갈래?' },
      { speaker: null, text: '긴장감이 감도는 교실 안, 연준의 농담 덕분에 숨통이 조금 트였다. 생존 첫날의 탐색을 시작할 시간이다.' }
    ],
    onEnd: 'enter_day_map'
  },

  prologue_after_team: {
    location: 'base',
    timeOfDay: 'day',
    lines: [
      { speaker: '범규', char: 'beomgyu', expr: 'smile', text: '오~ 역시 {name}! 우리 팀 분위기 메이커 한 명 추가네!' },
      { speaker: '태현', char: 'taehyun', expr: 'normal', text: '감상적인 시간은 여기까지. 낮 시간은 한정되어 있으니 각 구역에서 물자부터 확보하자.' },
      { speaker: '휴닝카이', char: 'hueningkai', expr: 'smile', text: '비상 초코바 하나 챙겨뒀어! 힘내서 같이 내일까지 버텨보자!' }
    ],
    onEnd: 'enter_day_map'
  },

  /* ==================== DAYTIME MEMBER EPISODES (5 members × 3 episodes) ==================== */
  dayEvents: {
    soobin: [
      // Episode 1
      {
        location: 'broadcast',
        lines: [
          { speaker: null, text: '초록빛 모니터 불빛만 감도는 방송실. 수빈이 주파수 다이얼을 돌리며 외부 구조 신호를 찾고 있었다.' },
          { speaker: '수빈', char: 'soobin', expr: 'normal', text: '어, {name}. 여기까지 와 줬구나. 외부 주파수가 잡힐 듯 말 듯 해서 계속 확인 중이었어.' },
          { speaker: '수빈', char: 'soobin', expr: 'serious', text: '사실… 내가 리더랍시고 다들 이끌고 있긴 한데, 내 판단 하나에 애들 목숨이 달렸다고 생각하면 가끔 숨이 막혀.' }
        ],
        choices: [
          {
            text: '"혼자 다 짊어지지 마. 나도 옆에서 같이 고민할게."',
            tag: '수빈 호감도 +15',
            effects: { affection: { soobin: 15 }, mental: 6, supplies: 1 },
            reply: { speaker: '수빈', char: 'soobin', expr: 'blush', text: '…고마워, {name}. 네가 그렇게 말해 주니까 어깨가 한결 가벼워진다. 여기 여분 배터리도 챙겨 가자.' }
          },
          {
            text: '"수빈이가 있어서 우리가 지금까지 버틴 거야. 잘하고 있어."',
            tag: '수빈 호감도 +12',
            effects: { affection: { soobin: 12 }, mental: 10 },
            reply: { speaker: '수빈', char: 'soobin', expr: 'smile', text: '진심이야? 흐음… 그럼 내일도 힘내서 방송실 지켜야겠네.' }
          },
          {
            text: '"일단 방송실 예비 배터리부터 챙겨서 거점으로 돌아가자."',
            tag: '물자 +2',
            effects: { affection: { soobin: 6 }, supplies: 2 },
            reply: { speaker: '수빈', char: 'soobin', expr: 'normal', text: '맞아, 감상에 젖을 때가 아니지. 자, 여기 보조 배터리랑 손전등 챙겼어.' }
          }
        ]
      },
      // Episode 2
      {
        location: 'broadcast',
        lines: [
          { speaker: null, text: '방송실 문을 열자 수빈이 책상에 엎드려 잠시 눈을 감고 있었다. 무전기엔 아직도 지지직거리는 잡음이 흐른다.' },
          { speaker: '수빈', char: 'soobin', expr: 'blush', text: '앗, 미안! 잠깐 눈만 붙인다는 게… {name}, 혹시 나 자는 거 보고 있었어?' },
          { speaker: '수빈', char: 'soobin', expr: 'smile', text: '아, 그리고 방금 짧은 군 구조 채널 신호를 잡았어! 4일차 새벽에 인근 구역으로 헬기가 지나간대.' }
        ],
        choices: [
          {
            text: '"진짜?! 수빈아, 포기 안 해줘서 너무 고마워!" (손을 잡는다)',
            tag: '수빈 호감도 +18',
            effects: { affection: { soobin: 18 }, mental: 12, supplies: 1 },
            reply: { speaker: '수빈', char: 'soobin', expr: 'blush', text: '어, 어…! 손이 엄청 따뜻하네. 약속할게, {name}. 그 헬기, 반드시 같이 타자.' }
          },
          {
            text: '"피곤해 보이는데 10분만 더 자. 내가 주파수 지켜볼게."',
            tag: '수빈 호감도 +15',
            effects: { affection: { soobin: 15 }, mental: 8 },
            reply: { speaker: '수빈', char: 'soobin', expr: 'smile', text: '그럼 딱 10분만… 네가 옆에 있으니까 진짜 안심된다.' }
          },
          {
            text: '"신호 기록을 정확히 적어두자. 태현이한테도 공유해야지."',
            tag: '물자 +1 · 방어 +1',
            effects: { affection: { soobin: 9 }, supplies: 1, defense: 1 },
            reply: { speaker: '수빈', char: 'soobin', expr: 'normal', text: '역시 꼼꼼하네. 주파수 메모랑 비상 조명탄 위치도 정리해 뒀어.' }
          }
        ]
      },
      // Episode 3
      {
        location: 'broadcast',
        lines: [
          { speaker: null, text: '방송실 창밖으로 붉은 노을이 스며든다. 수빈이 조용히 교내 스피커 스위치를 만지작거리고 있었다.' },
          { speaker: '수빈', char: 'soobin', expr: 'normal', text: '이 모든 게 끝나면 제일 먼저 뭘 하고 싶어, {name}?' },
          { speaker: '수빈', char: 'soobin', expr: 'blush', text: '나는… 좀비 걱정 없는 평범한 방과 후에, 너랑 학교 앞 분식집에서 떡볶이 먹고 싶어. 너무 소박한가?' }
        ],
        choices: [
          {
            text: '"완벽해. 그날은 내가 쏠게, 약속!"',
            tag: '수빈 호감도 +20',
            effects: { affection: { soobin: 20 }, mental: 15 },
            reply: { speaker: '수빈', char: 'soobin', expr: 'blush', text: '하하, 꼭 기억해 둘게. 그러니까 그때까지 절대 내 옆에서 떨어지지 마.' }
          },
          {
            text: '"나도 수빈이랑 같이 평범한 내일을 보내고 싶어."',
            tag: '수빈 호감도 +18',
            effects: { affection: { soobin: 18 }, mental: 12, supplies: 1 },
            reply: { speaker: '수빈', char: 'soobin', expr: 'smile', text: '네가 내 가장 큰 버팀목이야, {name}. 자, 마지막으로 남은 보급품도 챙기자.' }
          },
          {
            text: '"살아남기만 하면 뭐든 다 좋지. 얼른 방어 준비하자."',
            tag: '물자 +2 · 방어 +1',
            effects: { affection: { soobin: 10 }, supplies: 2, defense: 1 },
            reply: { speaker: '수빈', char: 'soobin', expr: 'serious', text: '응, 반드시 전원 생존해서 나가자. 나만 믿어.' }
          }
        ]
      }
    ],

    yeonjun: [
      // Episode 1
      {
        location: 'gym',
        lines: [
          { speaker: null, text: '어둑한 체육관 구석. 연준이 매트를 쌓아 출입구를 막고, 땀을 닦으며 야구 배트를 어깨에 걸쳤다.' },
          { speaker: '연준', char: 'yeonjun', expr: 'smile', text: '오, {name}! 나 보고 싶어서 체육관까지 온 거야? 위험한데 겁도 없네.' },
          { speaker: '연준', char: 'yeonjun', expr: 'serious', text: '잠깐, 저기 창고 문 쪽에서 긁는 소리 들리지? 넌 내 뒤에 딱 붙어 있어.' }
        ],
        choices: [
          {
            text: '"혼자 다치게 둘 순 없어. 나도 옆에서 시야 봐줄게!"',
            tag: '연준 호감도 +15',
            effects: { affection: { yeonjun: 15 }, supplies: 1, defense: 1 },
            reply: { speaker: '연준', char: 'yeonjun', expr: 'smile', text: '크, 배짱 좋은데? 좋아, 둘이서 처리하니까 10초 컷이네. 창고에 생수도 잔뜩 있잖아!' }
          },
          {
            text: '연준의 옷자락을 살짝 잡는다. "조심해, 연준아."',
            tag: '연준 호감도 +16',
            effects: { affection: { yeonjun: 16 }, mental: 6 },
            reply: { speaker: '연준', char: 'yeonjun', expr: 'blush', text: '야… 그렇게 부르면 심장 떨어지잖아. 좀비보다 네가 더 위험한데?' }
          },
          {
            text: '"소음 내지 말고 물자만 빨리 챙겨서 빠져나가자."',
            tag: '물자 +2',
            effects: { affection: { yeonjun: 8 }, supplies: 2 },
            reply: { speaker: '연준', char: 'yeonjun', expr: 'normal', text: '현명하네. 자, 스포츠음료랑 쇠파이프 챙겼어. 얼른 뜨자.' }
          }
        ]
      },
      // Episode 2
      {
        location: 'gym',
        lines: [
          { speaker: null, text: '체육관 관람석에 걸터앉은 연준이 풀어진 손목 붕대를 다시 감으려다 한 손이라 애를 먹고 있었다.' },
          { speaker: '연준', char: 'yeonjun', expr: 'normal', text: '아, 이거 생각보다 혼자 묶기 힘드네. {name}, 딱 한 번만 도와줄래?' },
          { speaker: null, text: '가까이 다가가 붕대를 감아주자, 연준이 숨을 죽인 채 너의 얼굴을 가만히 내려다보았다.' }
        ],
        choices: [
          {
            text: '조심스럽게 매듭을 지어주며 "앞으론 무리하지 마."',
            tag: '연준 호감도 +18',
            effects: { affection: { yeonjun: 18 }, mental: 10 },
            reply: { speaker: '연준', char: 'yeonjun', expr: 'blush', text: '…네가 이렇게 다정하게 굴면 일부러라도 더 다치고 싶어지는데. 농담이야, 안 다칠게.' }
          },
          {
            text: '"평소엔 센 척하더니 가까이서 보니 긴장했네?"',
            tag: '연준 호감도 +15',
            effects: { affection: { yeonjun: 15 }, mental: 8, supplies: 1 },
            reply: { speaker: '연준', char: 'yeonjun', expr: 'smile', text: '들켰냐? 아 몰라, 보답으로 내가 숨겨둔 비상 간식 하나 줄게.' }
          },
          {
            text: '단단히 고정해 주고 체육관 탈출 동선을 함께 점검한다.',
            tag: '방어 +1 · 물자 +1',
            effects: { affection: { yeonjun: 10 }, defense: 1, supplies: 1 },
            reply: { speaker: '연준', char: 'yeonjun', expr: 'serious', text: '완벽해. 이쪽 비상문 자물쇠도 확인 끝났어.' }
          }
        ]
      },
      // Episode 3
      {
        location: 'gym',
        lines: [
          { speaker: null, text: '체육관 높은 창문으로 들어온 빛 아래, 연준이 배트를 내려놓고 진지한 눈빛으로 너를 불렀다.' },
          { speaker: '연준', char: 'yeonjun', expr: 'serious', text: '{name}, 솔직히 말할게. 나 원래 무서운 거 잘 안 타는데, 요즘은 딱 하나가 무서워.' },
          { speaker: '연준', char: 'yeonjun', expr: 'blush', text: '내가 앞만 보고 뛰다가, 뒤돌아봤을 때 네가 없으면 어쩌지 하는 생각. 그게 제일 무서워.' }
        ],
        choices: [
          {
            text: '"걱정 마. 나도 끝까지 네 등 뒤에 있을게."',
            tag: '연준 호감도 +20',
            effects: { affection: { yeonjun: 20 }, mental: 15 },
            reply: { speaker: '연준', char: 'yeonjun', expr: 'blush', text: '…진짜지? 그럼 나 이제 천하무적이네. 무조건 살아서 나가자, 우리.' }
          },
          {
            text: '"그럼 앞으로는 뒤돌아보지 말고 나랑 나란히 걷자."',
            tag: '연준 호감도 +18',
            effects: { affection: { yeonjun: 18 }, mental: 12, defense: 1 },
            reply: { speaker: '연준', char: 'yeonjun', expr: 'smile', text: '하, 너 진짜 말 예쁘게 한다. 좋아, 이제부터 나란히 걷자.' }
          },
          {
            text: '"우리 팀 전부 무사할 거야. 남은 장비부터 챙기자."',
            tag: '물자 +2',
            effects: { affection: { yeonjun: 10 }, supplies: 2 },
            reply: { speaker: '연준', char: 'yeonjun', expr: 'normal', text: '그래, 감성 타령은 탈출하고 나서 하자고. 가자!' }
          }
        ]
      }
    ],

    beomgyu: [
      // Episode 1
      {
        location: 'workshop',
        lines: [
          { speaker: null, text: '기술실 작업대 위, 초록빛 납땜 인두와 낡은 카세트 플레이어 옆에서 범규가 작은 경보기를 조립하고 있었다.' },
          { speaker: '범규', char: 'beomgyu', expr: 'smile', text: '짠! {name} 왔어? 내가 만든 좀비 감지 센서 1호기 구경할래? 지나가면 삐- 하고 울려!' },
          { speaker: '범규', char: 'beomgyu', expr: 'normal', text: '아, 근데 좀비들이 소리 듣고 몰려올 수도 있으니까… LED 불빛으로만 알려주게 개조 중이야.' }
        ],
        choices: [
          {
            text: '"와, 진짜 천재 아니야? 나도 옆에서 부품 잡아줄게!"',
            tag: '범규 호감도 +15 · 방어 +1',
            effects: { affection: { beomgyu: 15 }, defense: 1, supplies: 1 },
            reply: { speaker: '범규', char: 'beomgyu', expr: 'blush', text: '천재래~ 아, 쑥스럽게! 둘이 만드니까 벌써 완성됐다. 거점 문 앞에 설치하자!' }
          },
          {
            text: '"범규 덕분에 무서운 것도 잠시 잊게 돼. 고마워."',
            tag: '범규 호감도 +16 · 멘탈 +10',
            effects: { affection: { beomgyu: 16 }, mental: 10 },
            reply: { speaker: '범규', char: 'beomgyu', expr: 'smile', text: '헤헤, 그게 내 특기지! 힘들 땐 언제든 기술실로 피신 와.' }
          },
          {
            text: '"함정에 쓸 공구랑 테이프부터 넉넉히 챙겨두자."',
            tag: '물자 +2',
            effects: { affection: { beomgyu: 8 }, supplies: 2 },
            reply: { speaker: '범규', char: 'beomgyu', expr: 'normal', text: '오케이~ 강력 테이프랑 와이어 몽땅 챙겼어!' }
          }
        ]
      },
      // Episode 2
      {
        location: 'workshop',
        lines: [
          { speaker: null, text: '기술실 구석에서 범규가 목에 걸고 있던 헤드폰을 벗어 네 쪽으로 쓱 내밀었다.' },
          { speaker: '범규', char: 'beomgyu', expr: 'smile', text: '잠깐만 숨 좀 돌리자, {name}. 밖은 온통 사이렌 소리뿐이잖아. 이거 한 번 들어봐.' },
          { speaker: null, text: '헤드폰을 쓰자 낡은 락 발라드 기타 소리가 잔잔하게 흘러나왔다. 순간 봉쇄된 학교의 공포가 멀어지는 기분이 들었다.' }
        ],
        choices: [
          {
            text: '헤드폰 한쪽을 범규 귀에 씌워주며 "같이 듣자."',
            tag: '범규 호감도 +18 · 멘탈 +12',
            effects: { affection: { beomgyu: 18 }, mental: 12 },
            reply: { speaker: '범규', char: 'beomgyu', expr: 'blush', text: '어… 가까워…! 아, 심장 소리 노래보다 크게 들리면 안 되는데.' }
          },
          {
            text: '"이 노래 좋다. 범규가 직접 고른 플레이리스트야?"',
            tag: '범규 호감도 +15 · 멘탈 +10',
            effects: { affection: { beomgyu: 15 }, mental: 10, supplies: 1 },
            reply: { speaker: '범규', char: 'beomgyu', expr: 'smile', text: '응! 탈출하면 내가 진짜 라이브로 기타 쳐줄게. 기대해!' }
          },
          {
            text: '"잠깐 쉬었으니까 이제 옥상 방어 함정을 완성하자."',
            tag: '방어 +2',
            effects: { affection: { beomgyu: 9 }, defense: 2 },
            reply: { speaker: '범규', char: 'beomgyu', expr: 'serious', text: '좋아, 오늘 밤 좀비들은 문턱도 못 넘게 만들어 주지!' }
          }
        ]
      },
      // Episode 3
      {
        location: 'workshop',
        lines: [
          { speaker: null, text: '장난기 가득하던 범규의 손이 작업대 위에서 잠시 멈췄다. 창밖을 바라보는 눈빛이 어느 때보다 진지했다.' },
          { speaker: '범규', char: 'beomgyu', expr: 'serious', text: '나 맨날 웃고 떠드니까 아무 생각 없어 보이지? 사실 나도 밤마다 무서워서 잠 못 자.' },
          { speaker: '범규', char: 'beomgyu', expr: 'blush', text: '근데 네가 내 농담에 한 번 웃어주면, 그때만큼은 진짜 다 괜찮아질 것 같거든.' }
        ],
        choices: [
          {
            text: '"나한테도 범규가 제일 큰 위로야. 억지로 웃지 않아도 돼."',
            tag: '범규 호감도 +20',
            effects: { affection: { beomgyu: 20 }, mental: 15 },
            reply: { speaker: '범규', char: 'beomgyu', expr: 'blush', text: '…반칙이야, {name}. 그렇게 말하면 나 진짜 너밖에 안 보이잖아.' }
          },
          {
            text: '"우리 탈출하면 옥상 말고 진짜 공연장 가자!"',
            tag: '범규 호감도 +18',
            effects: { affection: { beomgyu: 18 }, mental: 12, supplies: 1 },
            reply: { speaker: '범규', char: 'beomgyu', expr: 'smile', text: '콜! 티켓은 내가 구할게. 그때까지 절대 다치지 않기!' }
          },
          {
            text: '"함정 장치 마지막 점검만 끝내면 내일 새벽엔 나갈 수 있어."',
            tag: '방어 +1 · 물자 +1',
            effects: { affection: { beomgyu: 10 }, defense: 1, supplies: 1 },
            reply: { speaker: '범규', char: 'beomgyu', expr: 'normal', text: '응! 범규표 최종 방어선, 완벽하게 세팅 완료!' }
          }
        ]
      }
    ],

    taehyun: [
      // Episode 1
      {
        location: 'library',
        lines: [
          { speaker: null, text: '고요한 도서관 창가. 태현이 접힌 학교 평면도 위에 빨간 펜으로 좀비들의 이동 패턴을 빼곡히 적고 있었다.' },
          { speaker: '태현', char: 'taehyun', expr: 'normal', text: '{name}. 발소리가 커. 복도 끝 감염자 청각 범위가 15미터니까 조심해.' },
          { speaker: '태현', char: 'taehyun', expr: 'serious', text: '분석해 보니 1층은 완전히 막혔어. 우리가 살 확률이 가장 높은 루트는 4일차 새벽 옥상 탈출뿐이야.' }
        ],
        choices: [
          {
            text: '"태현이가 분석해 줘서 살 길이 보이네. 나도 지도 같이 볼래."',
            tag: '태현 호감도 +15 · 방어 +1',
            effects: { affection: { taehyun: 15 }, defense: 1, supplies: 1 },
            reply: { speaker: '태현', char: 'taehyun', expr: 'smile', text: '이해가 빠르네. 자, 여기 비상 계단 표시해 뒀어. 너랑 같이 움직이면 생존율이 12%는 오르겠어.' }
          },
          {
            text: '"너무 냉정하게만 굴지 마. 태현이도 좀 쉬어야지."',
            tag: '태현 호감도 +14 · 멘탈 +8',
            effects: { affection: { taehyun: 14 }, mental: 8 },
            reply: { speaker: '태현', char: 'taehyun', expr: 'blush', text: '…내가 쉬면 계산이 틀어져. 그래도 걱정해 준 건 고맙게 받을게.' }
          },
          {
            text: '"도서관 매점 쪽 비상식량 위치도 지도에 나와 있어?"',
            tag: '물자 +2',
            effects: { affection: { taehyun: 8 }, supplies: 2 },
            reply: { speaker: '태현', char: 'taehyun', expr: 'normal', text: '당연하지. 사서실 뒤쪽 캐비닛에 비상식량이 있어. 지금 챙겨 가자.' }
          }
        ]
      },
      // Episode 2
      {
        location: 'library',
        lines: [
          { speaker: null, text: '도서관 서가 사이로 들어온 달빛 아래, 태현이 안경을 벗어 콧등을 짚고 있었다.' },
          { speaker: '태현', char: 'taehyun', expr: 'normal', text: '이상하네. 평소의 나라면 생존 확률이 낮은 선택은 절대 안 하는데.' },
          { speaker: '태현', char: 'taehyun', expr: 'blush', text: '유독 네가 위험해 보일 때만 계산이고 뭐고 몸이 먼저 움직여. 너, 내 전략에서 제일 골치 아픈 변수야.' }
        ],
        choices: [
          {
            text: '"그럼 나도 태현이의 계산에 꼭 포함시켜 줘. 안 떨어질게."',
            tag: '태현 호감도 +18',
            effects: { affection: { taehyun: 18 }, mental: 10 },
            reply: { speaker: '태현', char: 'taehyun', expr: 'blush', text: '…이미 내 계획의 최우선 조건은 네 생존이야, {name}.' }
          },
          {
            text: '"안경 벗으니까 분위기 완전 다르다. 좀 더 쉬어."',
            tag: '태현 호감도 +16 · 멘탈 +10',
            effects: { affection: { taehyun: 16 }, mental: 10 },
            reply: { speaker: '태현', char: 'taehyun', expr: 'smile', text: '지금 이 상황에서 그런 감상평을 남기는 건 너뿐일걸. …나쁘진 않네.' }
          },
          {
            text: '"탈출 확률을 높일 물자부터 하나라도 더 확보하자."',
            tag: '물자 +2 · 방어 +1',
            effects: { affection: { taehyun: 9 }, supplies: 2, defense: 1 },
            reply: { speaker: '태현', char: 'taehyun', expr: 'normal', text: '합리적이야. 이쪽 서가 뒤에 숨겨둔 비상 랜턴과 식량을 챙기자.' }
          }
        ]
      },
      // Episode 3
      {
        location: 'library',
        lines: [
          { speaker: null, text: '태현이 완성된 옥상 탈출 도면을 조심스럽게 접어 네 주머니에 넣어주었다.' },
          { speaker: '태현', char: 'taehyun', expr: 'serious', text: '만약 내일 새벽에 무슨 일이 생겨서 우리가 떨어지더라도, 이 지도대로만 가면 무조건 옥상에 닿아.' },
          { speaker: '태현', char: 'taehyun', expr: 'blush', text: '아니, 떨어지지 마. 내가 무슨 수를 써서라도 네 손 잡고 끝까지 데려갈 거니까.' }
        ],
        choices: [
          {
            text: '"태현이가 세운 계획이니까 100% 믿어. 같이 나가자."',
            tag: '태현 호감도 +20',
            effects: { affection: { taehyun: 20 }, mental: 15 },
            reply: { speaker: '태현', char: 'taehyun', expr: 'smile', text: '그래. 100%로 만들어 줄게. 약속해, {name}.' }
          },
          {
            text: '"떨어질 생각 없어. 태현이 옆이 제일 안전한걸."',
            tag: '태현 호감도 +18',
            effects: { affection: { taehyun: 18 }, mental: 12, defense: 1 },
            reply: { speaker: '태현', char: 'taehyun', expr: 'blush', text: '…그 말, 탈출하고 나서도 취소 못 해.' }
          },
          {
            text: '"완벽해. 마지막으로 필요한 물자만 챙겨서 거점으로 가자."',
            tag: '물자 +2',
            effects: { affection: { taehyun: 10 }, supplies: 2 },
            reply: { speaker: '태현', char: 'taehyun', expr: 'normal', text: '좋아. 준비는 끝났어.' }
          }
        ]
      }
    ],

    hueningkai: [
      // Episode 1
      {
        location: 'infirmary',
        lines: [
          { speaker: null, text: '따뜻한 노을빛이 커튼 너머로 스며드는 보건실. 휴닝카이가 구급상자를 정리하다 너를 보고 환하게 웃었다.' },
          { speaker: '휴닝카이', char: 'hueningkai', expr: 'smile', text: '{name}! 마침 잘 왔어! 따뜻한 보리차 데워놨는데 한 잔 마시고 갈래?' },
          { speaker: '휴닝카이', char: 'hueningkai', expr: 'normal', text: '어, 손등에 살짝 긁힌 자국이 있네! 이리 와, 내가 소독하고 반창고 붙여줄게.' }
        ],
        choices: [
          {
            text: '손을 내밀며 "카이 덕분에 진짜 마음이 놓인다."',
            tag: '휴닝카이 호감도 +15 · 멘탈 +15',
            effects: { affection: { hueningkai: 15 }, mental: 15, supplies: 1 },
            reply: { speaker: '휴닝카이', char: 'hueningkai', expr: 'blush', text: '에헤헤, 내가 여기 있는 이유잖아! 아, 거점으로 가져갈 구급약도 챙겨놨어.' }
          },
          {
            text: '"카이 너는 무섭지 않아? 늘 웃고 있어서 대단해."',
            tag: '휴닝카이 호감도 +16 · 멘탈 +12',
            effects: { affection: { hueningkai: 16 }, mental: 12 },
            reply: { speaker: '휴닝카이', char: 'hueningkai', expr: 'smile', text: '나도 무섭지~ 근데 내가 먼저 무너지면 다들 더 힘들어질까 봐! {name} 앞에서는 든든하고 싶거든.' }
          },
          {
            text: '"고마워! 일단 비상약품이랑 식량부터 넉넉히 챙겨두자."',
            tag: '물자 +2 · 멘탈 +8',
            effects: { affection: { hueningkai: 8 }, supplies: 2, mental: 8 },
            reply: { speaker: '휴닝카이', char: 'hueningkai', expr: 'normal', text: '응! 소독약, 붕대, 영양제까지 꽉꽉 채웠어!' }
          }
        ]
      },
      // Episode 2
      {
        location: 'infirmary',
        lines: [
          { speaker: null, text: '보건실 문 밖에서 갑자기 쿵—! 하는 둔탁한 소리가 울렸다. 네가 놀라 움찔하자, 휴닝카이가 순식간에 네 앞을 막아섰다.' },
          { speaker: '휴닝카이', char: 'hueningkai', expr: 'serious', text: '쉿, {name}. 내 뒤에 있어. 문 잠금장치는 내가 이중으로 걸어놨어.' },
          { speaker: null, text: '잠시 뒤 발소리가 멀어지자, 휴닝카이가 안도의 한숨을 쉬며 평소보다 훨씬 단단한 눈빛으로 너를 돌아봤다.' }
        ],
        choices: [
          {
            text: '"방금 엄청 멋있었어… 진짜 든든하네, 카이야."',
            tag: '휴닝카이 호감도 +18 · 멘탈 +12',
            effects: { affection: { hueningkai: 18 }, mental: 12 },
            reply: { speaker: '휴닝카이', char: 'hueningkai', expr: 'blush', text: '지, 진짜? 나 맨날 막내 취급받아서… {name}이 그렇게 말해 주니까 엄청 기뻐!' }
          },
          {
            text: '"괜찮아? 손 살짝 떨리고 있잖아." (손을 감싸 쥔다)',
            tag: '휴닝카이 호감도 +17 · 멘탈 +15',
            effects: { affection: { hueningkai: 17 }, mental: 15 },
            reply: { speaker: '휴닝카이', char: 'hueningkai', expr: 'blush', text: '…들켰네. 그래도 {name}을 지킬 수 있다면 몇 번이고 앞에 설 수 있어.' }
          },
          {
            text: '"안전할 때 빨리 약품 챙겨서 거점으로 복귀하자."',
            tag: '물자 +2 · 방어 +1',
            effects: { affection: { hueningkai: 9 }, supplies: 2, defense: 1 },
            reply: { speaker: '휴닝카이', char: 'hueningkai', expr: 'normal', text: '응! 문 앞 캐비닛도 밀어놓고 가자.' }
          }
        ]
      },
      // Episode 3
      {
        location: 'infirmary',
        lines: [
          { speaker: null, text: '휴닝카이가 보건실 창틀에 작은 종이별 하나를 올려놓고 너에게 건넸다.' },
          { speaker: '휴닝카이', char: 'hueningkai', expr: 'smile', text: '자, 행운의 부적! 어릴 때 무서운 꿈 꾸면 이렇게 별을 접었거든.' },
          { speaker: '휴닝카이', char: 'hueningkai', expr: 'blush', text: '내일 아침엔 꼭 다 같이 웃으면서 학교 밖으로 나가자. 그리고… 나가면 나랑 제일 먼저 맛있는 거 먹으러 가줄래?' }
        ],
        choices: [
          {
            text: '"당연하지! 카이가 좋아하는 걸로 실컷 먹으러 가자."',
            tag: '휴닝카이 호감도 +20 · 멘탈 +15',
            effects: { affection: { hueningkai: 20 }, mental: 15 },
            reply: { speaker: '휴닝카이', char: 'hueningkai', expr: 'smile', text: '야호! 약속했다! 절대 잊어버리면 안 돼, {name}!' }
          },
          {
            text: '"종이별 평생 간직할게. 카이야, 끝까지 같이 버티자."',
            tag: '휴닝카이 호감도 +18 · 멘탈 +15',
            effects: { affection: { hueningkai: 18 }, mental: 15, supplies: 1 },
            reply: { speaker: '휴닝카이', char: 'hueningkai', expr: 'blush', text: '응! 내가 끝까지 {name} 옆에서 지켜줄게!' }
          },
          {
            text: '"고마워! 마지막 구급상자 챙겨서 모두에게 돌아가자."',
            tag: '물자 +2 · 멘탈 +10',
            effects: { affection: { hueningkai: 10 }, supplies: 2, mental: 10 },
            reply: { speaker: '휴닝카이', char: 'hueningkai', expr: 'smile', text: '좋아, 힘내서 가자!' }
          }
        ]
      }
    ]
  },

  /* ==================== WALKIE-TALKIE RADIO INTERLUDES (Day 1~3 Afternoon) ==================== */
  radioEvents: {
    1: {
      location: 'base',
      timeOfDay: 'evening',
      radio: true,
      radioTag: 'CH-01 · 수빈 & 연준',
      lines: [
        { speaker: null, text: '치직— 치지직—. 해 질 녘, 거점 책상 위 깨진 스마트폰 옆 무전기가 요란하게 울렸다.' },
        { speaker: '수빈 (무전)', char: 'soobin', expr: 'serious', text: '『아, 아— {name} 들려? 지금 1층 급식실 쪽에 좀비 떼가 몰려들고 있어!』' },
        { speaker: '연준 (무전)', char: 'yeonjun', expr: 'serious', text: '『급식실에 비상식량이 꽤 남았는데, 우리가 유인할까 아니면 바로 철수할까? 결정해 줘!』' }
      ],
      choices: [
        {
          text: '"물자보다 안전이 우선이야! 당장 거점으로 철수해!"',
          tag: '멘탈 +8 · 수빈/연준 호감도 ↑',
          effects: { mental: 8, affection: { soobin: 8, yeonjun: 8 } },
          next: 'radio_1_safe'
        },
        {
          text: '"범규 경보기로 시선을 돌리고 식량만 챙겨서 나와!"',
          tag: '물자 +2 · 범규 호감도 ↑',
          effects: { supplies: 2, mental: -4, affection: { beomgyu: 8, yeonjun: 5 } },
          next: 'radio_1_loot'
        }
      ]
    },
    2: {
      location: 'base',
      timeOfDay: 'evening',
      radio: true,
      radioTag: 'CH-03 · 태현 & 범규',
      lines: [
        { speaker: null, text: '치직—! 어둠이 깔리기 시작할 무렵, 옥상 망루 쪽 채널에서 다급한 무전이 들어왔다.' },
        { speaker: '태현 (무전)', char: 'taehyun', expr: 'serious', text: '『{name}, 옥상 계단 잠금장치가 낡아서 흔들려. 오늘 밤 비가 오면 시야가 더 나빠질 거야.』' },
        { speaker: '범규 (무전)', char: 'beomgyu', expr: 'normal', text: '『물자 하나만 쓰면 철문 보강할 수 있는데, 지금 써버릴까 아니면 아껴둘까?』' }
      ],
      choices: [
        {
          text: '"물자 1개 써서 지금 바로 보강하자! 밤을 버텨야 해."',
          tag: '물자 -1 · 방어 +2',
          requireSupplies: 1,
          effects: { supplies: -1, defense: 2, affection: { taehyun: 8, beomgyu: 8 } },
          next: 'radio_2_fortify'
        },
        {
          text: '"물자는 아껴두고, 교대로 감시를 강화하자."',
          tag: '멘탈 -5 · 물자 유지',
          effects: { mental: -5, affection: { taehyun: 5, soobin: 5 } },
          next: 'radio_2_save'
        }
      ]
    },
    3: {
      location: 'base',
      timeOfDay: 'evening',
      radio: true,
      radioTag: 'CH-05 · 긴급 구조 채널',
      lines: [
        { speaker: null, text: '치직—! 맑은 신호음과 함께 교내 무전기에서 낯선 외부 음성이 스쳐 지나갔다.' },
        { speaker: '구조대 (무전)', char: null, expr: 'normal', text: '『…여기는 제3구조헬기. 내일 새벽 05시 30분, 고등학교 옥상 상공을 통과한다. 조명탄 신호가 보이면 착륙하겠다…』' },
        { speaker: '휴닝카이 (무전)', char: 'hueningkai', expr: 'smile', text: '『{name}!! 들었어?! 내일 새벽이 마지막 밤이야! 우리 정말 나갈 수 있어!』' }
      ],
      choices: [
        {
          text: '"모두 무사히 내일 아침을 보자. 오늘 밤만 버티면 돼!"',
          tag: '멘탈 +12 · 전원 호감도 ↑',
          effects: { mental: 12, affection: { soobin: 5, yeonjun: 5, beomgyu: 5, taehyun: 5, hueningkai: 8 } },
          next: 'radio_3_hope'
        }
      ]
    }
  },

  radioAfter: {
    radio_1_safe: {
      location: 'base',
      timeOfDay: 'evening',
      lines: [
        { speaker: '수빈', char: 'soobin', expr: 'smile', text: '고마워, {name}. 덕분에 다친 사람 없이 전원 복귀했어. 이제 밤 방어 준비를 하자.' }
      ],
      onEnd: 'start_night_qte'
    },
    radio_1_loot: {
      location: 'base',
      timeOfDay: 'evening',
      lines: [
        { speaker: '연준', char: 'yeonjun', expr: 'smile', text: '작전 대성공! 통조림이랑 생수 잔뜩 챙겨왔어. 슬슬 밤이 되니까 긴장 풀지 마.' }
      ],
      onEnd: 'start_night_qte'
    },
    radio_2_fortify: {
      location: 'base',
      timeOfDay: 'evening',
      lines: [
        { speaker: '범규', char: 'beomgyu', expr: 'smile', text: '철문 용접 완료! 이제 좀비 백 마리가 밀어도 끄떡없을걸?' }
      ],
      onEnd: 'start_night_qte'
    },
    radio_2_save: {
      location: 'base',
      timeOfDay: 'evening',
      lines: [
        { speaker: '태현', char: 'taehyun', expr: 'normal', text: '알겠어. 대신 오늘 밤엔 바리케이드 앞을 더 철저히 지켜야 해.' }
      ],
      onEnd: 'start_night_qte'
    },
    radio_3_hope: {
      location: 'base',
      timeOfDay: 'evening',
      lines: [
        { speaker: '수빈', char: 'soobin', expr: 'serious', text: '드디어 마지막 밤이야. 방심하면 안 돼. 복도 끝에서 소리가 커지고 있어!' }
      ],
      onEnd: 'start_night_qte'
    }
  },

  /* ==================== NIGHT PERIMETER DEFENSE QTE (Day 1~3) ==================== */
  nightQte: {
    1: {
      location: 'hallway',
      timeOfDay: 'night',
      qteSeconds: 8,
      shake: true,
      lines: [
        { speaker: null, text: '밤 11시. 칠흑 같은 복도 너머에서 긁는 소리와 함께 좀비 무리가 2-3반 바리케이드를 들이받았다!' },
        { speaker: '연준', char: 'yeonjun', expr: 'serious', text: '젠장, 문짝이 흔들려! {name}, 지금 어떻게 막을까?!' }
      ],
      choices: [
        {
          text: '연준과 함께 책상으로 문을 밀어 막고 빈틈을 노린다!',
          tag: 'QTE · 방어 성공',
          qte: true,
          effects: { defense: 1, affection: { yeonjun: 10 }, mental: -4 },
          next: 'qte_success_1'
        },
        {
          text: '물자 1개를 소모해 복도 반대편에 유인 장치를 던진다!',
          tag: '물자 -1 · 완벽 방어',
          qte: true,
          requireSupplies: 1,
          effects: { supplies: -1, defense: 1, affection: { beomgyu: 8, taehyun: 8 } },
          next: 'qte_success_1'
        }
      ],
      timeoutNext: 'qte_fail_1',
      timeoutEffects: { mental: -18, supplies: -1 }
    },
    2: {
      location: 'hallway',
      timeOfDay: 'night',
      qteSeconds: 7.5,
      shake: true,
      lines: [
        { speaker: null, text: '비바람 치는 둘째 날 밤! 정전과 동시에 복도 비상등이 붉게 점멸하며 감염자들이 창문으로 손을 뻗었다!' },
        { speaker: '태현', char: 'taehyun', expr: 'serious', text: '시야가 사라졌어! {name}, 지금 지시를 내려!' }
      ],
      choices: [
        {
          text: '수빈의 무전기 불빛으로 신호를 맞춰 창문 합판을 고정한다!',
          tag: 'QTE · 방어 성공',
          qte: true,
          effects: { defense: 1, affection: { soobin: 10, taehyun: 6 }, mental: -5 },
          next: 'qte_success_2'
        },
        {
          text: '휴닝카이와 함께 불빛을 끄고 숨을 죽여 무리가 지나가길 기다린다!',
          tag: 'QTE · 은신 성공',
          qte: true,
          effects: { mental: -3, affection: { hueningkai: 10 } },
          next: 'qte_success_2'
        }
      ],
      timeoutNext: 'qte_fail_2',
      timeoutEffects: { mental: -20, defense: -1 }
    },
    3: {
      location: 'hallway',
      timeOfDay: 'night',
      qteSeconds: 7,
      shake: true,
      lines: [
        { speaker: null, text: '마지막 밤. 구조 헬기 소리에 반응한 감염자들이 계단으로 몰려들며 바리케이드가 금방이라도 무너질 듯 삐걱거린다!' },
        { speaker: '범규', char: 'beomgyu', expr: 'serious', text: '{name}! 함정 스위치 누를 타이밍이야! 지금이야!' }
      ],
      choices: [
        {
          text: '범규의 음향 함정을 터뜨려 옥상 계단 길을 뚫는다!',
          tag: 'QTE · 돌파 성공',
          qte: true,
          effects: { defense: 1, affection: { beomgyu: 10, yeonjun: 6 } },
          next: 'qte_success_3'
        },
        {
          text: '물자 1개로 연막을 피워 전원 옥상으로 선행 대피한다!',
          tag: '물자 -1 · 완벽 돌파',
          qte: true,
          requireSupplies: 1,
          effects: { supplies: -1, mental: 5, affection: { soobin: 8, taehyun: 8, hueningkai: 8 } },
          next: 'qte_success_3'
        }
      ],
      timeoutNext: 'qte_fail_3',
      timeoutEffects: { mental: -22, defense: -2 }
    }
  },

  qteResults: {
    qte_success_1: {
      location: 'base',
      timeOfDay: 'night',
      lines: [
        { speaker: '수빈', char: 'soobin', expr: 'smile', text: '휴… 막아냈어! {name}, 방금 판단 정말 빨랐어. 이제 잠시 숨 돌리고 옥상 불침번 조를 정하자.' }
      ],
      onEnd: 'enter_night_watch'
    },
    qte_fail_1: {
      location: 'base',
      timeOfDay: 'night',
      shake: true,
      lines: [
        { speaker: '연준', char: 'yeonjun', expr: 'serious', text: '망설이다 문이 밀렸잖아! 겨우 다시 막았지만 물자도 떨어지고 정신이 하나도 없네… 일단 불침번부터 서자.' }
      ],
      onEnd: 'enter_night_watch'
    },
    qte_success_2: {
      location: 'base',
      timeOfDay: 'night',
      lines: [
        { speaker: '태현', char: 'taehyun', expr: 'smile', text: '완벽한 대응이었어. 이제 소란이 잦아들었으니 오늘 밤 옥상 불침번 파트너를 골라.' }
      ],
      onEnd: 'enter_night_watch'
    },
    qte_fail_2: {
      location: 'base',
      timeOfDay: 'night',
      shake: true,
      lines: [
        { speaker: '휴닝카이', char: 'hueningkai', expr: 'serious', text: '깜짝이야…! 창문 합판이 떨어져서 겨우 막았어. {name}, 숨 크게 쉬어, 괜찮아…' }
      ],
      onEnd: 'enter_night_watch'
    },
    qte_success_3: {
      location: 'rooftop',
      timeOfDay: 'night',
      lines: [
        { speaker: '연준', char: 'yeonjun', expr: 'smile', text: '해냈어!! 드디어 옥상까지 올라왔다! 동틀 때까지 딱 몇 시간 남았어. 마지막 불침번, 누구랑 같이 설래?' }
      ],
      onEnd: 'enter_night_watch'
    },
    qte_fail_3: {
      location: 'rooftop',
      timeOfDay: 'night',
      shake: true,
      lines: [
        { speaker: '수빈', char: 'soobin', expr: 'serious', text: '겨우 옥상 철문을 잠갔어… 모두 지쳤지만 이제 동틀 때까지만 버티면 돼.' }
      ],
      onEnd: 'enter_night_watch'
    }
  },

  /* ==================== NIGHT WATCH 1:1 ROOFTOP TALKS (Unlocks Polaroid!) ==================== */
  nightWatchEvents: {
    soobin: {
      location: 'rooftop',
      timeOfDay: 'night',
      lines: [
        { speaker: null, text: '별빛이 내려앉은 학교 옥상. 수빈이 자신의 교복 마이 자락을 네 어깨 위에 살짝 걸쳐주었다.' },
        { speaker: '수빈', char: 'soobin', expr: 'smile', text: '밤공기 차갑지? 여기선 무전기 잡음도 안 들리고, 꼭 세상에 우리 둘만 남은 것 같다.' },
        { speaker: '수빈', char: 'soobin', expr: 'blush', text: '{name}… 사실 아까 방어전 때 네가 다칠까 봐 심장이 멎는 줄 알았어. 모두의 리더보다, 그냥 너 지키는 사람이고 싶어.' },
        { speaker: null, text: '찰칵—! 달빛 아래 다정하게 웃는 수빈의 순간이 마음속 폴라로이드에 선명하게 남았다.' }
      ],
      effects: { affection: { soobin: 18 }, mental: 12 },
      onEnd: 'advance_next_day'
    },
    yeonjun: {
      location: 'rooftop',
      timeOfDay: 'night',
      lines: [
        { speaker: null, text: '옥상 철망에 기대선 연준이 작은 랜턴 불빛 아래서 너를 향해 장난스레 웃어 보였다.' },
        { speaker: '연준', char: 'yeonjun', expr: 'smile', text: '불침번 파트너로 나 골라준 거? 역시 눈썰미는 알아줘야 해, {name}.' },
        { speaker: '연준', char: 'yeonjun', expr: 'blush', text: '근데 진지하게… 이 지옥 같은 학교에서 내가 끝까지 웃을 수 있는 이유, 너인 거 알지? 내일도 내 등 뒤는 네 자리야.' },
        { speaker: null, text: '찰칵—! 밤바람에 흩날리는 머리카락 사이로 연준이 건넨 따뜻한 눈빛이 폴라로이드에 담겼다.' }
      ],
      effects: { affection: { yeonjun: 18 }, mental: 12 },
      onEnd: 'advance_next_day'
    },
    beomgyu: {
      location: 'rooftop',
      timeOfDay: 'night',
      lines: [
        { speaker: null, text: '옥상 난간 옆, 범규가 조용히 카세트 재생 버튼을 눌렀다. 밤하늘 별빛 아래 잔잔한 멜로디가 번졌다.' },
        { speaker: '범규', char: 'beomgyu', expr: 'smile', text: '봐, 저기 별 엄청 많지? 도시 불빛이 다 꺼져서 그런가, 아이러니하게 하늘은 제일 예쁘네.' },
        { speaker: '범규', char: 'beomgyu', expr: 'blush', text: '{name}, 이 밤이 아무리 길어도 네가 옆에 있으면 하나도 안 무서워. 내일 해 뜰 때까지 같이 노래 듣자.' },
        { speaker: null, text: '찰칵—! 이어폰 한쪽을 나눠 끼고 별을 올려다본 범규와의 밤이 폴라로이드에 새겨졌다.' }
      ],
      effects: { affection: { beomgyu: 18 }, mental: 14 },
      onEnd: 'advance_next_day'
    },
    taehyun: {
      location: 'rooftop',
      timeOfDay: 'night',
      lines: [
        { speaker: null, text: '옥상 망루 위에서 어두운 도시를 살피던 태현이 네 발소리를 듣자마자 따뜻한 캔커피를 건넸다.' },
        { speaker: '태현', char: 'taehyun', expr: 'normal', text: '마셔. 체온 떨어지면 판단력이 흐려지니까. …특별히 너 주려고 아껴둔 거야.' },
        { speaker: '태현', char: 'taehyun', expr: 'blush', text: '확률로 따지면 우리가 여기서 살아남을 가능성은 높지 않았어. 근데 네가 내 옆에 있는 순간부터, 왠지 100%가 된 기분이야.' },
        { speaker: null, text: '찰칵—! 은테 안경 너머로 드물게 부드러운 미소를 지은 태현의 모습이 폴라로이드에 남았다.' }
      ],
      effects: { affection: { taehyun: 18 }, mental: 12 },
      onEnd: 'advance_next_day'
    },
    hueningkai: {
      location: 'rooftop',
      timeOfDay: 'night',
      lines: [
        { speaker: null, text: '옥상 캠핑 랜턴 옆에 나란히 앉자, 휴닝카이가 자신의 크림색 가디건 소매를 잡아당기며 환하게 웃었다.' },
        { speaker: '휴닝카이', char: 'hueningkai', expr: 'smile', text: '{name}, 오늘 하루도 정말 고생 많았어! 무서운 일 많았는데도 끝까지 버텨줘서 고마워.' },
        { speaker: '휴닝카이', char: 'hueningkai', expr: 'blush', text: '내가 꼭 지켜줄게. 내일 아침엔 좀비 없는 세상에서, 나랑 제일 먼저 웃는 얼굴로 만나자.' },
        { speaker: null, text: '찰칵—! 랜턴 불빛보다 따뜻하게 빛나는 휴닝카이의 미소가 폴라로이드에 담겼다.' }
      ],
      effects: { affection: { hueningkai: 18 }, mental: 16 },
      onEnd: 'advance_next_day'
    }
  },

  /* ==================== DAY 4 DAWN FINALE ==================== */
  finale_start: {
    location: 'rooftop',
    timeOfDay: 'morning',
    qteSeconds: 8,
    shake: true,
    lines: [
      { speaker: null, text: 'DAY 4, 새벽 05시 28분. 멀리서 웅웅거리는 프로펠러 소리와 함께 구조 헬기의 서치라이트가 학교 옥상을 비췄다!' },
      { speaker: '수빈', char: 'soobin', expr: 'serious', text: '저기 헬기야!! 지금 당장 조명탄을 쏘아 올려야 해! {name}, 방아쇠를 당겨!' }
    ],
    choices: [
      {
        text: '하늘을 향해 구조 조명탄을 힘껏 쏘아 올린다!',
        tag: 'FINAL QTE · 구조 신호!',
        qte: true,
        effects: { mental: 10 },
        next: 'finale_resolve'
      }
    ],
    timeoutNext: 'finale_timeout',
    timeoutEffects: { mental: -15 }
  },

  finale_resolve: {
    location: 'rooftop',
    timeOfDay: 'morning',
    lines: [
      { speaker: null, text: '푸슈욱—! 붉고 선명한 불꽃이 새벽 하늘을 가르며 피어올랐다.' },
      { speaker: null, text: '구조 헬기가 방향을 틀어 학교 옥상으로 하강하기 시작한다. 길고 길었던 악몽의 끝, 드디어 내일이 밝아오고 있었다.' }
    ],
    onEnd: 'trigger_ending'
  },

  finale_timeout: {
    location: 'rooftop',
    timeOfDay: 'morning',
    lines: [
      { speaker: '연준', char: 'yeonjun', expr: 'serious', text: '늦을 뻔했잖아! 내가 대신 쐈어— 다들 헬기 쪽으로 뛰어!' }
    ],
    onEnd: 'trigger_ending'
  }
};
