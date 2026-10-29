export interface GrammarPoint {
  pattern: string;
  meaning: string;
  exampleJp: string;
  exampleReading: string;
  exampleKr: string;
  usageNote: string;
}

export interface ExampleSentence {
  jp: string;
  reading: string;
  kr: string;
  focusPart: string;
}

export interface ExampleGroup {
  id: string;
  title: string;
  sentences: ExampleSentence[];
}

export interface VocabItem {
  jp: string;
  reading: string;
  kr: string;
  tier: '필수 어휘' | '확장 어휘' | '범용 표현';
  sampleJp: string;
  sampleKr: string;
}

export interface DrillItem {
  id: string;
  krPrompt: string;
  jpAnswer: string;
  readingAnswer: string;
  tiles: string[];
  grammarHint: string;
}

export interface SubstitutionPlayground {
  instruction: string;
  slot1Label: string;
  slot1Options: { jp: string; reading: string; kr: string }[];
  slot2Label: string;
  slot2Options: { jp: string; reading: string; kr: string }[];
  connectorParticle: string;
}

export interface CardChoiceOption {
  id: string;
  jp: string;
  reading: string;
  kr: string;
  followUpExampleJp: string;
  followUpExampleKr: string;
}

export interface ReasonChoiceOption {
  id: string;
  jp: string;
  reading: string;
  kr: string;
}

export interface ConversationCardActivity {
  headerJp: string;
  headerKr: string;
  subNote: string;
  step1Prompt: string;
  step1Choices: CardChoiceOption[];
  step2Prompt: string;
  step2Choices: ReasonChoiceOption[];
  buildSentence: (choice1: CardChoiceOption, choice2: ReasonChoiceOption) => {
    jp: string;
    reading: string;
    kr: string;
  };
  followUps: {
    jp: string;
    reading: string;
    kr: string;
    tip: string;
  }[];
}

export interface CurriculumSession {
  id: number;
  code: string;
  titleKr: string;
  titleJp: string;
  grammarSummary: string;
  learningGoal: string;
  comfortNote: string;
  themeCategory: string;
  grammarPoints: GrammarPoint[];
  exampleGroups: ExampleGroup[];
  vocabulary: VocabItem[];
  drills: DrillItem[];
  substitution: SubstitutionPlayground;
  cardActivity: ConversationCardActivity;
}

export interface PersonaOption {
  id: string;
  name: string;
  role: string;
  description: string;
  sampleTrait: string;
}

export const PERSONA_OPTIONS: PersonaOption[] = [
  {
    id: 'self',
    name: '나 (내 취향·생각)',
    role: '실제 혹은 오늘 마음에 드는 선택지',
    description: '실제 내 취향을 말해도 좋고, 단순히 오늘 눈에 들어오는 보기를 골라도 괜찮아요.',
    sampleTrait: '집에서 편안하게 음악을 듣거나 좋아하는 작품을 감상하는 시간'
  },
  {
    id: 'yuki',
    name: '유키 (집순이 고양이 집사)',
    role: '가상 인물 · 2층 다락방 거주',
    description: '내 이야기를 직접 하기 부담스러울 때, 유키의 시점으로 상상해서 대답해 보세요.',
    sampleTrait: '고양이와 단 디저트, 잔잔한 일상 애니메이션을 가장 좋아함'
  },
  {
    id: 'ren',
    name: '렌 (심야 게임·음악 크리에이터)',
    role: '가상 인물 · 온라인 취미가',
    description: 'RPG 게임, 사운드트랙, 심야 라멘 요리를 좋아하는 렌이 되어 문장을 만들어 보세요.',
    sampleTrait: '새로운 인디 게임을 탐험하고 야식으로 라멘을 끓여 먹는 것을 즐김'
  },
  {
    id: 'sora',
    name: '소라 (상상 여행 수집가)',
    role: '가상 인물 · 지도와 사진 산책가',
    description: '날씨와 계절, 가보고 싶은 조용한 소도시를 상상하며 답하는 캐릭터입니다.',
    sampleTrait: '비 오는 날 창가에서 지도 앱으로 일본 소도시 골목을 구경하는 취미'
  }
];

export const LESSON_FLOW_STAGES = [
  {
    step: 1,
    durationMin: 25,
    title: '문법 학습',
    method: '설명은 짧게, 예문은 여러 번 읽기',
    normalGuide: '복잡한 문법 용어 대신 오늘의 핵심 패턴 4가지를 짧은 예문 읽기로 익힙니다.',
    lowEnergyGuide: '문법 설명과 예문을 편안하게 눈으로 읽으며 구조만 확인해도 충분합니다.',
    targetTab: 'grammar' as const
  },
  {
    step: 2,
    durationMin: 25,
    title: '어휘·예문',
    method: '주제별 단어를 문장에 넣어 보기',
    normalGuide: '집·취미·콘텐츠와 연결된 친숙한 어휘를 확인하고, 상황별 예문을 함께 읽습니다.',
    lowEnergyGuide: '마음에 드는 예문 2~3개에 북마크 표시를 하며 어떤 뉘앙스인지 살펴봅니다.',
    targetTab: 'examples' as const
  },
  {
    step: 3,
    durationMin: 25,
    title: '반복 연습',
    method: '선택형 질문, 단어 교체, 문장 확장',
    normalGuide: '한국어 제시어를 보고 일본어로 말해보거나, 단어 교체 스위치로 문장을 변형해 봅니다.',
    lowEnergyGuide: '직접 영작하듯 말하지 않고, 화면의 단어 조각(타일)을 순서대로 클릭해 문장을 조립합니다.',
    targetTab: 'practice' as const
  },
  {
    step: 4,
    durationMin: 15,
    title: '가벼운 복습',
    method: '단어 카드, 짧은 문장 완성',
    normalGuide: '이번 회차에서 배운 핵심 단어 카드를 뒤집어 보고, 어휘별 5가지 예문으로 가볍게 복습합니다.',
    lowEnergyGuide: '직접 말하기 대신 단어 카드를 눌러 한국어 뜻과 예문만 가볍게 확인하며 복습해요.',
    targetTab: 'warmup' as const
  },
  {
    step: 5,
    durationMin: 20,
    title: '회화 활동',
    method: '역할극, 취향 카드, 가상의 상황',
    normalGuide: '취향 카드를 골라 나만의 문장이나 가상 캐릭터의 문장을 완성하고 가볍게 이야기합니다.',
    lowEnergyGuide: '가상 캐릭터 시점을 선택하고, 카드를 클릭해 완성된 문장을 한 번 읽거나 복사해 둡니다.',
    targetTab: 'conversation' as const
  },
  {
    step: 6,
    durationMin: 10,
    title: '정리',
    method: '잘한 표현 복습, 다음 수업 예고',
    normalGuide: '틀린 표현을 지적하기보다 오늘 새롭게 쓸 수 있게 된 나만의 표현 2~3개를 기록합니다.',
    lowEnergyGuide: '오늘 가장 마음에 들었던 표현 카드를 골라 나만의 표현 노트에 저장하며 마무리합니다.',
    targetTab: 'wrapup' as const
  }
];

export const THEMATIC_VOCAB_GROUPS = [
  {
    id: 'home',
    theme: '집과 일상',
    description: '가장 편안한 나만의 공간에서 시간을 보내는 표현',
    frameJp: '家で [단어] のが好きです / 今日は部屋で [단어] ます。',
    words: [
      { jp: '部屋', reading: 'へや', kr: '방', sampleJp: '自分の部屋が一番落ち着きます。', sampleKr: '내 방이 가장 마음이 놓여요.' },
      { jp: '片付ける', reading: 'かたづける', kr: '정리하다, 치우다', sampleJp: '机の上を少し片付けました。', sampleKr: '책상 위를 조금 정리했어요.' },
      { jp: '掃除する', reading: 'そうじする', kr: '청소하다', sampleJp: '週末に部屋を掃除します。', sampleKr: '주말에 방을 청소해요.' },
      { jp: '休む', reading: 'やすむ', kr: '쉬다', sampleJp: '今日は家でゆっくり休みます。', sampleKr: '오늘은 집에서 푹 쉬어요.' },
      { jp: '過ごす', reading: 'すごす', kr: '(시간을) 보내다', sampleJp: '静かに時間を過ごすのが好きです。', sampleKr: '조용히 시간을 보내는 것을 좋아해요.' },
      { jp: 'ゴロゴロする', reading: 'ごろごろする', kr: '빈둥거리다, 뒹굴거리다', sampleJp: 'ベッドでゴロゴロしたいです。', sampleKr: '침대에서 뒹굴거리고 싶어요.' }
    ]
  },
  {
    id: 'food',
    theme: '음식',
    description: '좋아하는 맛과 간식, 간단한 식사를 묘사하는 표현',
    frameJp: '[단어] ものを食べたいです / この料理は [단어] です。',
    words: [
      { jp: '味', reading: 'あじ', kr: '맛', sampleJp: 'やさしい味が好きです。', sampleKr: '부드러운(순한) 맛을 좋아해요.' },
      { jp: '甘い', reading: 'あまい', kr: '달다', sampleJp: '疲れた時は甘いものが食べたいです。', sampleKr: '피곤할 때는 단것을 먹고 싶어요.' },
      { jp: '辛い', reading: 'からい', kr: '맵다', sampleJp: '辛いラーメンもけっこう好きです。', sampleKr: '매운 라면도 꽤 좋아해요.' },
      { jp: 'すっぱい', reading: 'すっぱい', kr: '시다', sampleJp: 'すっぱい果物は少し苦手です。', sampleKr: '신 과일은 조금 못 먹어요(꺼려요).' },
      { jp: 'おかわり', reading: 'おかわり', kr: '한 그릇 더(리필)', sampleJp: '美味しくて、おかわりしました。', sampleKr: '맛있어서 한 그릇 더 먹었어요.' },
      { jp: '温かい', reading: 'あたたかい', kr: '따뜻하다', sampleJp: '温かいココアを飲みたいです。', sampleKr: '따뜻한 코코아를 마시고 싶어요.' }
    ]
  },
  {
    id: 'content',
    theme: '콘텐츠',
    description: '애니메이션, 영화, 게임, 웹툰의 감상을 이야기하는 표현',
    frameJp: 'この作品の [단어] が面白いです。',
    words: [
      { jp: '登場人物', reading: 'とうじょうじんぶつ', kr: '등장인물', sampleJp: '登場人物がみんな魅力的です。', sampleKr: '등장인물이 모두 매력적이에요.' },
      { jp: '主人公', reading: 'しゅじんこう', kr: '주인공', sampleJp: '主人公の声がとてもいいです。', sampleKr: '주인공 목소리가 정말 좋아요.' },
      { jp: '展開', reading: 'てんかい', kr: '전개', sampleJp: 'ストーリーの展開が早いです。', sampleKr: '스토리 전개가 빨라요.' },
      { jp: '結末', reading: 'けつまつ', kr: '결말', sampleJp: '結末がすごく気になります。', sampleKr: '결말이 무척 궁금해요.' },
      { jp: 'おすすめ', reading: 'おすすめ', kr: '추천', sampleJp: 'おすすめのアニメがありますか。', sampleKr: '추천하는 애니메이션이 있나요?' },
      { jp: '世界観', reading: 'せかいかん', kr: '세계관', sampleJp: 'このゲームの世界観が好きです。', sampleKr: '이 게임의 세계관을 좋아해요.' }
    ]
  },
  {
    id: 'internet',
    theme: '인터넷',
    description: '유튜브, 스트리밍, 검색 등 온라인 활동을 설명하는 표현',
    frameJp: 'よくネットで [단어] を見ます。',
    words: [
      { jp: '動画', reading: 'どうが', kr: '동영상', sampleJp: '寝る前に猫の動画を見ます。', sampleKr: '자기 전에 고양이 영상을 봐요.' },
      { jp: '配信', reading: 'はいしん', kr: '방송(스트리밍)', sampleJp: '好きなゲーム配信を見ています。', sampleKr: '좋아하는 게임 방송을 보고 있어요.' },
      { jp: '検索する', reading: 'けんさくする', kr: '검색하다', sampleJp: '分からない言葉を検索しました。', sampleKr: '모르는 단어를 검색했어요.' },
      { jp: '投稿する', reading: 'とうこうする', kr: '업로드하다, 게시하다', sampleJp: 'イラストをネットに投稿しました。', sampleKr: '일러스트를 인터넷에 올렸어요.' },
      { jp: 'コメント', reading: 'こめんと', kr: '댓글, 코멘트', sampleJp: '面白いコメントがたくさんあります。', sampleKr: '재미있는 댓글이 많이 있어요.' },
      { jp: 'お気に入り', reading: 'おきにいり', kr: '즐겨찾기, 마음에 드는 것', sampleJp: 'お気に入りの曲リストです。', sampleKr: '마음에 드는 곡 플레이리스트예요.' }
    ]
  },
  {
    id: 'emotion',
    theme: '감정·상태',
    description: '깊은 내면 고백 없이도 현재 컨디션을 담백하게 전하는 표현',
    frameJp: '今日は少し [단어] です。',
    words: [
      { jp: '嬉しい', reading: 'うれしい', kr: '기쁘다', sampleJp: '新しいゲームが出て嬉しいです。', sampleKr: '새 게임이 나와서 기뻐요.' },
      { jp: '落ち着く', reading: 'おちつく', kr: '차분해지다, 안정되다', sampleJp: '雨の音を聞くと落ち着きます。', sampleKr: '빗소리를 들으면 마음이 차분해져요.' },
      { jp: '疲れる', reading: 'つかれる', kr: '피곤하다, 지치다', sampleJp: '今日は少し疲れました。', sampleKr: '오늘은 조금 피곤하네요.' },
      { jp: '眠い', reading: 'ねむい', kr: '졸리다', sampleJp: '昼ごはんを食べて眠くなりました。', sampleKr: '점심을 먹고 졸려졌어요.' },
      { jp: '気になる', reading: 'きになる', kr: '궁금하다, 신경 쓰이다', sampleJp: '次のエピソードが気になります。', sampleKr: '다음 에피소드가 궁금해요.' },
      { jp: 'すっきりする', reading: 'すっきりする', kr: '개운하다, 산뜻하다', sampleJp: 'たくさん寝てすっきりしました。', sampleKr: '푹 자서 개운해졌어요.' }
    ]
  },
  {
    id: 'choice',
    theme: '선택·의견',
    description: '정답 압박 없이 부드럽게 내 취향과 생각을 덧붙이는 표현',
    frameJp: '[단어]、こっちのほうがいいと思います。',
    words: [
      { jp: '迷う', reading: 'まよう', kr: '망설이다, 고민하다', sampleJp: 'どっちにするか迷います。', sampleKr: '어느 쪽으로 할지 고민돼요.' },
      { jp: '選ぶ', reading: 'えらぶ', kr: '고르다, 선택하다', sampleJp: '好きな色を一つ選びました。', sampleKr: '좋아하는 색을 하나 골랐어요.' },
      { jp: '比べる', reading: 'くらべる', kr: '비교하다', sampleJp: '二つのデザインを比べてみます。', sampleKr: '두 가지 디자인을 비교해 봐요.' },
      { jp: 'たぶん', reading: 'たぶん', kr: '아마도', sampleJp: 'たぶん週末は家にいます。', sampleKr: '아마 주말에는 집에 있을 거예요.' },
      { jp: 'どちらかというと', reading: 'どちらかというと', kr: '어느 쪽인가 하면', sampleJp: 'どちらかというと、インドア派です。', sampleKr: '어느 쪽인가 하면 집콕파예요.' },
      { jp: 'べつに', reading: 'べつに', kr: '딱히, 별로', sampleJp: 'べつに嫌いじゃないです。', sampleKr: '딱히 싫어하는 건 아니에요.' }
    ]
  }
];

export const CURRICULUM_SESSIONS: CurriculumSession[] = [
  {
    id: 1,
    code: '01',
    titleKr: '좋아하는 것과 취향',
    titleJp: '好きなもの・好きなこと',
    grammarSummary: '～が好き、～たい、～から、どうして',
    learningGoal: '좋아하는 음식·게임·콘텐츠와 이유 말하기',
    comfortNote: '개인적인 사정을 묻지 않고도 가볍게 대화할 수 있으며, 가상의 취향이나 마음에 드는 보기를 골라 답해도 좋습니다.',
    themeCategory: '취향과 관심사',
    grammarPoints: [
      {
        pattern: '～が好きです',
        meaning: '~을/를 좋아해요',
        exampleJp: 'ゲームが好きです。',
        exampleReading: 'ゲームが すきです。',
        exampleKr: '게임을 좋아해요.',
        usageNote: '명사 뒤에 조사 「が」를 붙여 좋아하는 대상을 편안하게 소개합니다. 동사 뒤에 「～のが好きです」를 붙이면 행동도 말할 수 있어요.'
      },
      {
        pattern: '～たいです',
        meaning: '~하고 싶어요',
        exampleJp: 'アニメを見たいです。',
        exampleReading: 'アニメを みたいです。',
        exampleKr: '애니메이션을 보고 싶어요.',
        usageNote: '동사 ます형 어간에 「たいです」를 연결해 지금 하고 싶은 가벼운 소망을 표현합니다.'
      },
      {
        pattern: '～から',
        meaning: '~이니까, ~하기 때문이에요',
        exampleJp: '面白いからです。',
        exampleReading: 'おもしろいからです。',
        exampleKr: '재미있기 때문이에요.',
        usageNote: '짧은 형용사나 문장 뒤에 붙여 이유를 간단하고 명확하게 덧붙일 때 사용합니다.'
      },
      {
        pattern: 'どうして～？',
        meaning: '왜 ~인가요?',
        exampleJp: 'どうして好きですか。',
        exampleReading: 'どうして すきですか。',
        exampleKr: '왜 좋아하나요?',
        usageNote: '이유를 묻는 표현입니다. 대답할 때는 긴 설명 없이 「～からです」 한 문장만으로도 충분합니다.'
      }
    ],
    exampleGroups: [
      {
        id: '1-1',
        title: '① 좋아하는 것을 말하기',
        sentences: [
          { jp: '猫が好きです。', reading: 'ねこが すきです。', kr: '고양이를 좋아해요.', focusPart: 'が好きです' },
          { jp: '甘いものが好きです。', reading: 'あまいものが すきです。', kr: '단것을 좋아해요.', focusPart: 'が好きです' },
          { jp: '日本のアニメが好きです。', reading: 'にほんの アニメが すきです。', kr: '일본 애니메이션을 좋아해요.', focusPart: 'が好きです' },
          { jp: '音楽を聞くのが好きです。', reading: 'おんがくを きくのが すきです。', kr: '음악을 듣는 것을 좋아해요.', focusPart: 'のが好きです' },
          { jp: '家でゆっくりするのが好きです。', reading: 'いえで ゆっくりするのが すきです。', kr: '집에서 느긋하게 보내는 것을 좋아해요.', focusPart: 'のが好きです' }
        ]
      },
      {
        id: '1-2',
        title: '② 하고 싶은 것을 말하기',
        sentences: [
          { jp: '映画を見たいです。', reading: 'えいがを みたいです。', kr: '영화를 보고 싶어요.', focusPart: '見たいです' },
          { jp: '美味しいものを食べたいです。', reading: 'おいしいものを たべたいです。', kr: '맛있는 것을 먹고 싶어요.', focusPart: '食べたいです' },
          { jp: '新しいゲームをしたいです。', reading: 'あたらしい ゲームを したいです。', kr: '새로운 게임을 하고 싶어요.', focusPart: 'したいです' },
          { jp: '今日はゆっくり休みたいです。', reading: 'きょうは ゆっくり やすみたいです。', kr: '오늘은 푹 쉬고 싶어요.', focusPart: '休みたいです' },
          { jp: '日本のラーメンを食べてみたいです。', reading: 'にほんの ラーメンを たべてみたいです。', kr: '일본 라멘을 먹어 보고 싶어요.', focusPart: '食べてみたいです' }
        ]
      },
      {
        id: '1-3',
        title: '③ 이유를 말하기',
        sentences: [
          { jp: '面白いからです。', reading: 'おもしろいからです。', kr: '재미있기 때문이에요.', focusPart: 'からです' },
          { jp: '美味しいからです。', reading: 'おいしいからです。', kr: '맛있기 때문이에요.', focusPart: 'からです' },
          { jp: '可愛いからです。', reading: 'かわいいからです。', kr: '귀엽기 때문이에요.', focusPart: 'からです' },
          { jp: 'リラックスできるからです。', reading: 'リラックスできるからです。', kr: '마음을 편하게 할 수 있기 때문이에요.', focusPart: 'からです' },
          { jp: '好きなキャラクターがいるからです。', reading: 'すきな キャラクターが いるからです。', kr: '좋아하는 캐릭터가 있기 때문이에요.', focusPart: 'からです' }
        ]
      }
    ],
    vocabulary: [
      { jp: '好き', reading: 'すき', kr: '좋아함', tier: '필수 어휘', sampleJp: '静かな音楽が好きです。', sampleKr: '조용한 음악을 좋아해요.' },
      { jp: '苦手', reading: 'にがて', kr: '서툴거나 꺼림', tier: '필수 어휘', sampleJp: 'ホラー映画は少し苦手です。', sampleKr: '공포 영화는 조금 꺼려요.' },
      { jp: '楽しみ', reading: 'たのしみ', kr: '기대, 즐거움', tier: '필수 어휘', sampleJp: '新しいゲームが楽しみです。', sampleKr: '새 게임이 기대돼요.' },
      { jp: '癒やし', reading: 'いやし', kr: '마음의 위안(힐링)', tier: '확장 어휘', sampleJp: '猫の動画は最高の癒やしです。', sampleKr: '고양이 영상은 최고의 힐링이에요.' },
      { jp: '気分', reading: 'きぶん', kr: '기분', tier: '필수 어휘', sampleJp: '今日はいい気分です。', sampleKr: '오늘은 기분이 좋아요.' },
      { jp: 'のんびり', reading: 'のんびり', kr: '느긋하게', tier: '범용 표현', sampleJp: '部屋でのんびり過ごします。', sampleKr: '방에서 느긋하게 보내요.' },
      { jp: 'ゆっくり', reading: 'ゆっくり', kr: '천천히, 느긋하게', tier: '필수 어휘', sampleJp: '家でゆっくり休みたいです。', sampleKr: '집에서 푹 쉬고 싶어요.' },
      { jp: '最近', reading: 'さいきん', kr: '최근', tier: '범용 표현', sampleJp: '最近、この曲をよく聞きます。', sampleKr: '최근 이 곡을 자주 들어요.' },
      { jp: 'けっこう', reading: 'けっこう', kr: '꽤, 제법', tier: '범용 표현', sampleJp: 'このアニメ、けっこう面白いです。', sampleKr: '이 애니메이션, 꽤 재미있어요.' },
      { jp: 'おすすめ', reading: 'おすすめ', kr: '추천', tier: '확장 어휘', sampleJp: 'おすすめの曲がありますか。', sampleKr: '추천하는 곡이 있나요?' }
    ],
    drills: [
      {
        id: 'd1-1',
        krPrompt: '고양이를 좋아해요.',
        jpAnswer: '猫が好きです。',
        readingAnswer: 'ねこが すきです。',
        tiles: ['猫', 'が', '好き', 'です。'],
        grammarHint: '[대상] + が + 好きです'
      },
      {
        id: 'd1-2',
        krPrompt: '음악을 듣고 싶어요.',
        jpAnswer: '音楽を聞きたいです。',
        readingAnswer: 'おんがくを ききたいです。',
        tiles: ['音楽', 'を', '聞きたい', 'です。'],
        grammarHint: '聞く(듣다) → 聞きたいです(듣고 싶어요)'
      },
      {
        id: 'd1-3',
        krPrompt: '재미있기 때문이에요.',
        jpAnswer: '面白いからです。',
        readingAnswer: 'おもしろいからです。',
        tiles: ['面白い', 'から', 'です。'],
        grammarHint: '面白い(재미있다) + からです'
      },
      {
        id: 'd1-4',
        krPrompt: '집에서 느긋하게 보내는 것을 좋아해요.',
        jpAnswer: '家でゆっくりするのが好きです。',
        readingAnswer: 'いえで ゆっくりするのが すきです。',
        tiles: ['家で', 'ゆっくりするの', 'が', '好きです。'],
        grammarHint: '동사 원형 + のが好きです'
      },
      {
        id: 'd1-5',
        krPrompt: '좋아하는 캐릭터가 있기 때문이에요.',
        jpAnswer: '好きなキャラクターがいるからです。',
        readingAnswer: 'すきな キャラクターが いるからです。',
        tiles: ['好きな', 'キャラクターが', 'いる', 'からです。'],
        grammarHint: 'いる(있다) + からです'
      }
    ],
    substitution: {
      instruction: '단어 교체 스위치: 대상을 猫 → 犬 → ゲーム → 音楽으로 바꾸고, 서술어도 好きです → 苦手です로 바꿔 보세요.',
      slot1Label: '대상 단어 (무엇을)',
      slot1Options: [
        { jp: '猫', reading: 'ねこ', kr: '고양이' },
        { jp: '犬', reading: 'いぬ', kr: '강아지' },
        { jp: 'ゲーム', reading: 'ゲーム', kr: '게임' },
        { jp: '音楽', reading: 'おんがく', kr: '음악' },
        { jp: '甘いもの', reading: 'あまいもの', kr: '단것' }
      ],
      slot2Label: '취향 표현 (어떠한지)',
      slot2Options: [
        { jp: '好きです。', reading: 'すきです。', kr: '좋아해요.' },
        { jp: '大好きです。', reading: 'だいすきです。', kr: '정말 좋아해요.' },
        { jp: '少し苦手です。', reading: 'すこし にがてです。', kr: '조금 꺼려요(서툴러요).' },
        { jp: '気になります。', reading: 'きになります。', kr: '관심이 가요.' }
      ],
      connectorParticle: 'が'
    },
    cardActivity: {
      headerJp: '好きなものを選びましょう',
      headerKr: '회화 활동: 취향 카드 고르기',
      subNote: '실제 취향을 말해도 되고, 단순히 마음에 드는 선택지를 골라도 됩니다. 더 말하고 싶지 않으면 언제든 다른 선택지로 넘어가도 괜찮아요.',
      step1Prompt: '무엇을 좋아하나요?',
      step1Choices: [
        { id: 'anime', jp: 'アニメ', reading: 'アニメ', kr: '애니메이션', followUpExampleJp: 'ファンタジーのアニメが好きです。', followUpExampleKr: '판타지 애니메이션을 좋아해요.' },
        { id: 'game', jp: 'ゲーム', reading: 'ゲーム', kr: '게임', followUpExampleJp: 'RPGゲームをよくします。', followUpExampleKr: 'RPG 게임을 자주 해요.' },
        { id: 'music', jp: '音楽', reading: 'おんがく', kr: '음악', followUpExampleJp: '静かなピアノの音楽が好きです。', followUpExampleKr: '조용한 피아노 음악을 좋아해요.' },
        { id: 'food', jp: '食べ物', reading: 'たべもの', kr: '음식', followUpExampleJp: '特に甘いデザートが好きです。', followUpExampleKr: '특히 달콤한 디저트를 좋아해요.' },
        { id: 'animal', jp: '動物', reading: 'どうぶつ', kr: '동물', followUpExampleJp: '特に白い猫が好きです。', followUpExampleKr: '특히 하얀 고양이를 좋아해요.' }
      ],
      step2Prompt: '이유는 무엇인가요?',
      step2Choices: [
        { id: 'interesting', jp: '面白いから', reading: 'おもしろいから', kr: '재미있으니까' },
        { id: 'fun', jp: '楽しいから', reading: 'たのしいから', kr: '즐거우니까' },
        { id: 'cute', jp: '可愛いから', reading: 'かわいいから', kr: '귀여우니까' },
        { id: 'relax', jp: 'リラックスできるから', reading: 'リラックスできるから', kr: '편안해지니까' }
      ],
      buildSentence: (c1, c2) => ({
        jp: `${c1.jp}が好きです。${c2.jp}です。`,
        reading: `${c1.reading}が すきです。${c2.reading}です。`,
        kr: `${c1.kr}을(를) 좋아해요. ${c2.kr}요.`
      }),
      followUps: [
        { jp: 'ほかには？', reading: 'ほかには？', kr: '그 밖에는 또 있나요?', tip: '단어 하나만 덧붙여도 되고, 「特にないです(딱히 없어요)」라고 답해도 자연스러워요.' },
        { jp: '例えば？', reading: 'たとえば？', kr: '예를 들면요?', tip: '구체적인 작품명이나 음식 이름을 일본어나 한국어로 가볍게 말해 보세요.' }
      ]
    }
  },
  {
    id: 2,
    code: '02',
    titleKr: '집에서 보내는 하루',
    titleJp: '家で過ごす一日',
    grammarSummary: '시간 に、～から～まで、빈도 부사、～ませんか',
    learningGoal: '하루 일과와 반복하는 행동 설명하기',
    comfortNote: '외출이나 등교 일정을 묻지 않고, 방 안에서 일어나는 편안한 루틴이나 가상의 이상적인 휴일 시간표를 만들어 이야기합니다.',
    themeCategory: '집과 일상',
    grammarPoints: [
      {
        pattern: '[시간] に',
        meaning: '[시간]에',
        exampleJp: '十一時に起きます。',
        exampleReading: 'じゅういちじに おきます。',
        exampleKr: '11시에 일어나요.',
        usageNote: '구체적인 숫자가 들어간 시각 뒤에 「に」를 붙여 행동하는 시간을 나타냅니다.'
      },
      {
        pattern: '～から ～まで',
        meaning: '~부터 ~까지',
        exampleJp: '午後から夜までゲームをします。',
        exampleReading: 'ごごから よるまで ゲームを します。',
        exampleKr: '오후부터 밤까지 게임을 해요.',
        usageNote: '시간이나 장소의 시작점과 끝점을 연결할 때 씁니다.'
      },
      {
        pattern: 'よく / ときどき / あまり',
        meaning: '자주 / 가끔 / 그다지(~않다)',
        exampleJp: '夜によく音楽を聞きます。',
        exampleReading: 'よるに よく おんがくを ききます。',
        exampleKr: '밤에 자주 음악을 들어요.',
        usageNote: '「あまり」 뒤에는 항상 부정형(～ません)이 와서 부담 없이 "별로 안 해요"라고 답할 수 있어요.'
      },
      {
        pattern: '～ませんか',
        meaning: '~하지 않을래요? (가벼운 권유)',
        exampleJp: 'いっしょに映画を見ませんか。',
        exampleReading: 'いっしょに えいがを みませんか。',
        exampleKr: '같이 영화를 보지 않을래요?',
        usageNote: '온라인에서 게임을 하거나 콘텐츠를 볼 때 부드럽게 제안하는 표현입니다.'
      }
    ],
    exampleGroups: [
      {
        id: '2-1',
        title: '① 나만의 편안한 시간대 말하기',
        sentences: [
          { jp: 'たいてい十時に起きます。', reading: 'たいてい じゅうじに おきます。', kr: '대체로 10시에 일어나요.', focusPart: '十時に' },
          { jp: '昼から夕方まで部屋で休みます。', reading: 'ひるから ゆうがたまで へやで やすみます。', kr: '낮부터 저녁까지 방에서 쉬어요.', focusPart: 'から夕方まで' },
          { jp: '夜二時ごろ寝ます。', reading: 'よる にじごろ ねます。', kr: '밤 2시쯤 자요.', focusPart: '二時ごろ' }
        ]
      },
      {
        id: '2-2',
        title: '② 집에서 자주 하는 행동 말하기',
        sentences: [
          { jp: '家でよくユーチューブを見ます。', reading: 'いえで よく ユーチューブを みます。', kr: '집에서 자주 유튜브를 봐요.', focusPart: 'よく' },
          { jp: 'ときどき部屋の掃除をします。', reading: 'ときどき へやの そうじを します。', kr: '가끔 방 청소를 해요.', focusPart: 'ときどき' },
          { jp: '朝ごはんはあまり食べません。', reading: 'あさごはんは あまり たべません。', kr: '아침밥은 그다지 먹지 않아요.', focusPart: 'あまり～ません' }
        ]
      },
      {
        id: '2-3',
        title: '③ 가볍게 제안하고 답하기',
        sentences: [
          { jp: '少し休憩しませんか。', reading: 'すこし きゅうけいしませんか。', kr: '조금 휴식하지 않을래요?', focusPart: 'しませんか' },
          { jp: 'オンラインでゲームをしませんか。', reading: 'オンラインで ゲームを しませんか。', kr: '온라인으로 게임을 하지 않을래요?', focusPart: 'しませんか' },
          { jp: 'いいですね。やりましょう。', reading: 'いいですね。やりましょう。', kr: '좋네요. 같이 해요.', focusPart: 'ましょう' }
        ]
      }
    ],
    vocabulary: [
      { jp: '起きる', reading: 'おきる', kr: '일어나다', tier: '필수 어휘', sampleJp: '今日はゆっくり起きました。', sampleKr: '오늘은 느긋하게 일어났어요.' },
      { jp: '寝る', reading: 'ねる', kr: '자다', tier: '필수 어휘', sampleJp: '音楽を聞いて寝ます。', sampleKr: '음악을 듣고 자요.' },
      { jp: '部屋', reading: 'へや', kr: '방', tier: '필수 어휘', sampleJp: '暖かい部屋が好きです。', sampleKr: '따뜻한 방을 좋아해요.' },
      { jp: '休む', reading: 'やすむ', kr: '쉬다', tier: '필수 어휘', sampleJp: 'ソファで休みます。', sampleKr: '소파에서 쉬어요.' },
      { jp: '過ごす', reading: 'すごす', kr: '보내다', tier: '필수 어휘', sampleJp: '家で静かに過ごします。', sampleKr: '집에서 조용히 보내요.' },
      { jp: 'よく', reading: 'よく', kr: '자주', tier: '범용 표현', sampleJp: 'よくヘッドホンを使います。', sampleKr: '자주 헤드폰을 써요.' },
      { jp: 'ときどき', reading: 'ときどき', kr: '가끔', tier: '범용 표현', sampleJp: 'ときどき本を読みます。', sampleKr: '가끔 책을 읽어요.' },
      { jp: 'あまり', reading: 'あまり', kr: '그다지 (+부정)', tier: '범용 표현', sampleJp: '外にはあまり出ません。', sampleKr: '밖에는 그다지 나가지 않아요.' },
      { jp: '夜更かし', reading: 'よふかし', kr: '밤샘, 늦게까지 안 잠', tier: '확장 어휘', sampleJp: 'きのうは少し夜更かししました。', sampleKr: '어제는 조금 늦게까지 깨어 있었어요.' },
      { jp: '昼寝', reading: 'ひるね', kr: '낮잠', tier: '확장 어휘', sampleJp: '午後に昼寝をします。', sampleKr: '오후에 낮잠을 자요.' }
    ],
    drills: [
      {
        id: 'd2-1',
        krPrompt: '대체로 11시에 일어나요.',
        jpAnswer: 'たいてい十一時に起きます。',
        readingAnswer: 'たいてい じゅういちじに おきます。',
        tiles: ['たいてい', '十一時に', '起きます。'],
        grammarHint: '시각 + に + 起きます'
      },
      {
        id: 'd2-2',
        krPrompt: '밤에 자주 음악을 들어요.',
        jpAnswer: '夜によく音楽を聞きます。',
        readingAnswer: 'よるに よく おんがくを ききます。',
        tiles: ['夜に', 'よく', '音楽を', '聞きます。'],
        grammarHint: '빈도부사 よく + 동사'
      },
      {
        id: 'd2-3',
        krPrompt: '오후부터 밤까지 방에서 쉬어요.',
        jpAnswer: '午後から夜まで部屋で休みます。',
        readingAnswer: 'ごごから よるまで へやで やすみます。',
        tiles: ['午後から', '夜まで', '部屋で', '休みます。'],
        grammarHint: '～から ～まで (부터 ~까지)'
      }
    ],
    substitution: {
      instruction: '빈도 부사와 행동을 조합해 나만의 집콕 루틴 문장을 만들어 보세요.',
      slot1Label: '얼마나 자주 (빈도)',
      slot1Options: [
        { jp: 'よく', reading: 'よく', kr: '자주' },
        { jp: 'ときどき', reading: 'ときどき', kr: '가끔' },
        { jp: '毎日', reading: 'まいにち', kr: '매일' }
      ],
      slot2Label: '집에서 하는 일',
      slot2Options: [
        { jp: '動画を見ます。', reading: 'どうがを みます。', kr: '영상을 봐요.' },
        { jp: '昼寝をします。', reading: 'ひるねを します。', kr: '낮잠을 자요.' },
        { jp: 'ゲームをします。', reading: 'ゲームを します。', kr: '게임을 해요.' },
        { jp: '音楽を聞きます。', reading: 'おんがくを ききます。', kr: '음악을 들어요.' }
      ],
      connectorParticle: '家で'
    },
    cardActivity: {
      headerJp: '理想のおうち時間を選びましょう',
      headerKr: '회화 활동: 이상적인 집콕 루틴 카드',
      subNote: '실제 하루 일과가 아니어도 괜찮습니다. 가장 편안해 보이는 시간대와 활동을 골라 보세요.',
      step1Prompt: '어느 시간대를 가장 좋아하나요?',
      step1Choices: [
        { id: 'afternoon', jp: '静かな午後', reading: 'しずかな ごご', kr: '조용한 오후', followUpExampleJp: '午後はお茶を飲みます。', followUpExampleKr: '오후에는 차를 마셔요.' },
        { id: 'evening', jp: 'ゆっくりする夕方', reading: 'ゆっくりする ゆうがた', kr: '느긋한 저녁', followUpExampleJp: '夕方に好きなアニメを見ます。', followUpExampleKr: '저녁에 좋아하는 애니를 봐요.' },
        { id: 'night', jp: '一人の夜', reading: 'ひとりの よる', kr: '혼자만의 밤 시간', followUpExampleJp: '夜はゲームに集中できます。', followUpExampleKr: '밤에는 게임에 집중할 수 있어요.' }
      ],
      step2Prompt: '그 시간에 무엇을 하고 싶나요?',
      step2Choices: [
        { id: 'rest', jp: 'ベッドでごろごろする', reading: 'ベッドで ごろごろする', kr: '침대에서 뒹굴거리기' },
        { id: 'stream', jp: '好きな配信を見る', reading: 'すきな はいしんを みる', kr: '좋아하는 방송 보기' },
        { id: 'tea', jp: '温かい飲み物を飲む', reading: 'あたたかい のみものを のむ', kr: '따뜻한 음료 마시기' }
      ],
      buildSentence: (c1, c2) => ({
        jp: `${c1.jp}が好きです。よく${c2.jp}からです。`,
        reading: `${c1.reading}が すきです。よく ${c2.reading}からです。`,
        kr: `${c1.kr}을(를) 좋아해요. 자주 ${c2.kr} 때문이에요.`
      }),
      followUps: [
        { jp: '何時ごろですか？', reading: 'なんじごろですか？', kr: '몇 시쯤인가요?', tip: '정확하지 않아도 「夜十時ごろです(밤 10시쯤이에요)」처럼 가볍게 답해보세요.' }
      ]
    }
  },
  {
    id: 3,
    code: '03',
    titleKr: '음식과 간단한 요리',
    titleJp: '食べ物と簡単な料理',
    grammarSummary: '～てみる、～たい、～たり～たりする',
    learningGoal: '먹고 싶은 음식과 요리 과정 말하기',
    comfortNote: '편의점 간식, 배달 음식, 라면 끓이기 등 친숙한 먹거리를 소재로 가볍게 이야기합니다.',
    themeCategory: '음식',
    grammarPoints: [
      {
        pattern: '～てみる',
        meaning: '~해 보다',
        exampleJp: '日本のプリンを食べてみたいです。',
        exampleReading: 'にほんの プリンを たべてみたいです。',
        exampleKr: '일본 푸딩을 먹어 보고 싶어요.',
        usageNote: '동사 て형 뒤에 「みる / みたいです」를 붙여 가벼운 호기심이나 시도를 나타냅니다.'
      },
      {
        pattern: '～たいです',
        meaning: '~하고 싶어요 / 먹고 싶어요',
        exampleJp: '温かいスープを飲みたいです。',
        exampleReading: 'あたたかい スープを のみたいです。',
        exampleKr: '따뜻한 수프를 마시고 싶어요.',
        usageNote: '오늘 당장 먹고 싶거나 마시고 싶은 메뉴를 고를 때 활용합니다.'
      },
      {
        pattern: '～たり ～たりする',
        meaning: '~하거나 ~하거나 하다',
        exampleJp: '卵を入れたり、チーズを入れたりします。',
        exampleReading: 'たまごを いれたり、チーズを いれたりします。',
        exampleKr: '계란을 넣거나 치즈를 넣거나 해요.',
        usageNote: '여러 행동 중 대표적인 두 가지를 나열할 때 씁니다. 순서는 상관없어요.'
      },
      {
        pattern: '～すぎる',
        meaning: '너무 ~하다',
        exampleJp: 'このラーメンは辛すぎます。',
        exampleReading: 'この ラーメンは からすぎます。',
        exampleKr: '이 라면은 너무 매워요.',
        usageNote: '맛이 지나치게 강하거나 양이 많을 때 간단히 감상을 말할 수 있습니다.'
      }
    ],
    exampleGroups: [
      {
        id: '3-1',
        title: '① 먹어 보고 싶은 음식 말하기',
        sentences: [
          { jp: 'コンビニの新しいデザートを食べてみたいです。', reading: 'コンビニの あたらしい デザートを たべてみたいです。', kr: '편의점의 새 디저트를 먹어 보고 싶어요.', focusPart: '食べてみたいです' },
          { jp: 'アニメに出てくる料理を作ってみたいです。', reading: 'アニメに でてくる りょうりを つくってみたいです。', kr: '애니메이션에 나오는 요리를 만들어 보고 싶어요.', focusPart: '作ってみたいです' }
        ]
      },
      {
        id: '3-2',
        title: '② 나만의 간단한 조리법 말하기',
        sentences: [
          { jp: 'ラーメンにネギを入れたり、卵を入れたりします。', reading: 'ラーメンに ネギを いれたり、たまごを いれたりします。', kr: '라면에 파를 넣거나 계란을 넣거나 해요.', focusPart: '入れたり' },
          { jp: 'パンを焼いたり、コーヒーをいれたりします。', reading: 'パンを やいたり、コーヒーを いれたりします。', kr: '빵을 굽거나 커피를 내리거나 해요.', focusPart: '焼いたり' }
        ]
      }
    ],
    vocabulary: [
      { jp: '味', reading: 'あじ', kr: '맛', tier: '필수 어휘', sampleJp: 'チーズの味が好きです。', sampleKr: '치즈 맛을 좋아해요.' },
      { jp: '甘い', reading: 'あまい', kr: '달다', tier: '필수 어휘', sampleJp: '甘いチョコレートを食べます。', sampleKr: '달콤한 초콜릿을 먹어요.' },
      { jp: '辛い', reading: 'からい', kr: '맵다', tier: '필수 어휘', sampleJp: '辛いトッポッキが好きです。', sampleKr: '매운 떡볶이를 좋아해요.' },
      { jp: 'すっぱい', reading: 'すっぱい', kr: '시다', tier: '필수 어휘', sampleJp: 'レモンはすっぱいです。', sampleKr: '레몬은 셔요.' },
      { jp: 'おかわり', reading: 'おかわり', kr: '한 그릇 더', tier: '확장 어휘', sampleJp: 'ご飯をおかわりしました。', sampleKr: '밥을 한 그릇 더 먹었어요.' },
      { jp: '作る', reading: 'つくる', kr: '만들다', tier: '필수 어휘', sampleJp: '簡単な料理を作ります。', sampleKr: '간단한 요리를 만들어요.' },
      { jp: '入れる', reading: 'いれる', kr: '넣다', tier: '필수 어휘', sampleJp: '牛乳を少し入れます。', sampleKr: '우유를 조금 넣어요.' },
      { jp: '温める', reading: 'あたためる', kr: '데우다', tier: '확장 어휘', sampleJp: 'レンジで温めます。', sampleKr: '전자레인지로 데워요.' }
    ],
    drills: [
      {
        id: 'd3-1',
        krPrompt: '일본 푸딩을 먹어 보고 싶어요.',
        jpAnswer: '日本のプリンを食べてみたいです。',
        readingAnswer: 'にほんの プリンを たべてみたいです。',
        tiles: ['日本の', 'プリンを', '食べて', 'みたいです。'],
        grammarHint: '食べて + みたいです (먹어 보고 싶어요)'
      },
      {
        id: 'd3-2',
        krPrompt: '계란을 넣거나 치즈를 넣거나 해요.',
        jpAnswer: '卵を入れたりチーズを入れたりします。',
        readingAnswer: 'たまごを いれたり チーズを いれたりします。',
        tiles: ['卵を入れたり', 'チーズを入れたり', 'します。'],
        grammarHint: '～たり ～たりします'
      }
    ],
    substitution: {
      instruction: '먹고 싶은 메뉴와 시도 표현을 자유롭게 조합해 보세요.',
      slot1Label: '음식·간식 메뉴',
      slot1Options: [
        { jp: '日本のラーメン', reading: 'にほんの ラーメン', kr: '일본 라멘' },
        { jp: '抹茶のケーキ', reading: 'まっちゃの ケーキ', kr: '말차 케이크' },
        { jp: 'たこ焼き', reading: 'たこやき', kr: '타코야키' }
      ],
      slot2Label: '소망 표현',
      slot2Options: [
        { jp: '食べてみたいです。', reading: 'たべてみたいです。', kr: '먹어 보고 싶어요.' },
        { jp: '作ってみたいです。', reading: 'つくってみたいです。', kr: '만들어 보고 싶어요.' },
        { jp: '注文したいです。', reading: 'ちゅうもんしたいです。', kr: '주문하고 싶어요.' }
      ],
      connectorParticle: 'を'
    },
    cardActivity: {
      headerJp: '今日のおやつ・夜食を選びましょう',
      headerKr: '회화 활동: 오늘의 간식·야식 카드',
      subNote: '지금 당장 눈앞에 있다면 고르고 싶은 간식과 맛을 선택해 보세요.',
      step1Prompt: '어떤 음식을 먹어 보고 싶나요?',
      step1Choices: [
        { id: 'ramen', jp: 'チーズラーメン', reading: 'チーズラーメン', kr: '치즈 라면', followUpExampleJp: '夜に食べるともっと美味しいです。', followUpExampleKr: '밤에 먹으면 더 맛있어요.' },
        { id: 'pudding', jp: 'カスタードプリン', reading: 'カスタードプリン', kr: '커스터드 푸딩', followUpExampleJp: 'コンビニのプリンが好きです。', followUpExampleKr: '편의점 푸딩을 좋아해요.' },
        { id: 'cocoa', jp: 'ホットココア', reading: 'ホットココア', kr: '핫코코아', followUpExampleJp: 'マシュマロを入れて飲みます。', followUpExampleKr: '마시멜로를 넣어서 마셔요.' }
      ],
      step2Prompt: '어떤 점이 마음에 드나요?',
      step2Choices: [
        { id: 'sweet', jp: '甘くて美味しいから', reading: 'あまくて おいしいから', kr: '달콤하고 맛있으니까' },
        { id: 'warm', jp: '温かくて落ち着くから', reading: 'あたたかくて おちつくから', kr: '따뜻하고 마음이 편해지니까' },
        { id: 'easy', jp: '簡単に作れるから', reading: 'かんたんに つくれるから', kr: '간단히 만들 수 있으니까' }
      ],
      buildSentence: (c1, c2) => ({
        jp: `${c1.jp}を食べてみたいです。${c2.jp}です。`,
        reading: `${c1.reading}を たべてみたいです。${c2.reading}です。`,
        kr: `${c1.kr}을(를) 먹어 보고 싶어요. ${c2.kr}요.`
      }),
      followUps: [
        { jp: '甘いものと辛いもの、どっちが好きですか？', reading: 'あまいものと からいもの、どっちが すきですか？', kr: '단것과 매운 것 중 어느 쪽을 좋아하나요?', tip: '「甘いものです(단것이에요)」처럼 단어 하나로 답해도 좋아요.' }
      ]
    }
  },
  {
    id: 4,
    code: '04',
    titleKr: '애니메이션·영화·게임',
    titleJp: 'アニメ・映画・ゲーム',
    grammarSummary: '～と思う、～けど、～から、～すぎる',
    learningGoal: '작품의 특징과 취향 설명하기',
    comfortNote: '내 이야기 대신 작품 속 주인공, 그래픽, 음악, 스토리에 대해 이야기하므로 심리적 거리감이 편안합니다.',
    themeCategory: '콘텐츠',
    grammarPoints: [
      {
        pattern: '～と思います',
        meaning: '~라고 생각해요',
        exampleJp: 'このアニメは名作だと思います。',
        exampleReading: 'この アニメは めいさくだと おもいます。',
        exampleKr: '이 애니메이션은 명작이라고 생각해요.',
        usageNote: '단정 짓지 않고 부드럽게 내 감상이나 의견을 말할 때 가장 많이 쓰는 표현입니다.'
      },
      {
        pattern: '～けど',
        meaning: '~이지만, ~인데',
        exampleJp: '難しいけど、面白いです。',
        exampleReading: 'むずかしいけど、おもしろいです。',
        exampleKr: '어렵지만 재미있어요.',
        usageNote: '두 문장을 자연스럽게 이어 주거나 말끝을 부드럽게 흐릴 때도 유용합니다.'
      },
      {
        pattern: '～すぎる',
        meaning: '너무 ~하다',
        exampleJp: 'ストーリーが良すぎます。',
        exampleReading: 'ストーリーが よすぎます。',
        exampleKr: '스토리가 너무 좋아요.',
        usageNote: '칭찬할 때도, 아쉬운 점을 말할 때도 간단하게 강조할 수 있어요.'
      },
      {
        pattern: '～から',
        meaning: '~하니까',
        exampleJp: '音楽がきれいだから、好きです。',
        exampleReading: 'おんがくが きれいだから、すきです。',
        exampleKr: '음악이 아름다워서 좋아해요.',
        usageNote: '작품을 좋아하는 이유를 구체적인 요소(음악, 작화, 캐릭터)와 연결합니다.'
      }
    ],
    exampleGroups: [
      {
        id: '4-1',
        title: '① 작품 감상 부드럽게 말하기',
        sentences: [
          { jp: 'このゲームはデザインがいいと思います。', reading: 'この ゲームは デザインが いいと おもいます。', kr: '이 게임은 디자인이 좋다고 생각해요.', focusPart: 'と思います' },
          { jp: '少し長いけど、最後まで見ました。', reading: 'すこし ながいけど、さいごまで みました。', kr: '조금 길지만 끝까지 봤어요.', focusPart: 'けど' },
          { jp: '主人公がかっこよすぎます。', reading: 'しゅじんこうが かっこよすぎます。', kr: '주인공이 너무 멋있어요.', focusPart: 'すぎます' }
        ]
      }
    ],
    vocabulary: [
      { jp: '登場人物', reading: 'とうじょうじんぶつ', kr: '등장인물', tier: '필수 어휘', sampleJp: '登場人物が多いです。', sampleKr: '등장인물이 많아요.' },
      { jp: '主人公', reading: 'しゅじんこう', kr: '주인공', tier: '필수 어휘', sampleJp: '主人公が成長する話です。', sampleKr: '주인공이 성장하는 이야기예요.' },
      { jp: '展開', reading: 'てんかい', kr: '전개', tier: '필수 어휘', sampleJp: '予想できない展開です。', sampleKr: '예상할 수 없는 전개예요.' },
      { jp: '結末', reading: 'けつまつ', kr: '결말', tier: '확장 어휘', sampleJp: 'ハッピーエンドの結末が好きです。', sampleKr: '해피엔딩 결말을 좋아해요.' },
      { jp: '世界観', reading: 'せかいかん', kr: '세계관', tier: '확장 어휘', sampleJp: 'ファンタジーの世界観が好きです。', sampleKr: '판타지 세계관을 좋아해요.' },
      { jp: '声優', reading: 'せいゆう', kr: '성우', tier: '확장 어휘', sampleJp: '好きな声優が出ています。', sampleKr: '좋아하는 성우가 나와요.' }
    ],
    drills: [
      {
        id: 'd4-1',
        krPrompt: '어렵지만 재미있어요.',
        jpAnswer: '難しいけど、面白いです。',
        readingAnswer: 'むずかしいけど、おもしろいです。',
        tiles: ['難しい', 'けど、', '面白い', 'です。'],
        grammarHint: '형용사 + けど (어렵지만)'
      },
      {
        id: 'd4-2',
        krPrompt: '이 게임은 음악이 좋다고 생각해요.',
        jpAnswer: 'このゲームは音楽がいいと思います。',
        readingAnswer: 'この ゲームは おんがくが いいと おもいます。',
        tiles: ['このゲームは', '音楽が', 'いいと', '思います。'],
        grammarHint: 'いい + と思います'
      }
    ],
    substitution: {
      instruction: '작품의 매력 포인트와 감상을 연결해 보세요.',
      slot1Label: '작품 요소',
      slot1Options: [
        { jp: 'ストーリー', reading: 'ストーリー', kr: '스토리' },
        { jp: '主人公', reading: 'しゅじんこう', kr: '주인공' },
        { jp: '背景の絵', reading: 'はいけいの え', kr: '배경 작화' }
      ],
      slot2Label: '나의 감상',
      slot2Options: [
        { jp: 'すごくいいと思います。', reading: 'すごく いいと おもいます。', kr: '무척 좋다고 생각해요.' },
        { jp: '魅力的だと思います。', reading: 'みりょくてきだと おもいます。', kr: '매력적이라고 생각해요.' },
        { jp: '最高すぎます。', reading: 'さいこうすぎます。', kr: '너무 최고예요.' }
      ],
      connectorParticle: 'が'
    },
    cardActivity: {
      headerJp: '作品の魅力を話しましょう',
      headerKr: '회화 활동: 작품 리뷰 카드',
      subNote: '좋아하는 작품 하나를 떠올리거나, 가상의 작품을 상상하며 매력 포인트를 골라 보세요.',
      step1Prompt: '작품에서 무엇을 가장 중요하게 보나요?',
      step1Choices: [
        { id: 'story', jp: 'ストーリーの展開', reading: 'ストーリーの てんかい', kr: '스토리 전개', followUpExampleJp: '最後まで飽きないからです。', followUpExampleKr: '끝까지 지루하지 않기 때문이에요.' },
        { id: 'char', jp: '魅力的な主人公', reading: 'みりょくてきな しゅじんこう', kr: '매력적인 주인공', followUpExampleJp: '応援したくなるキャラクターです。', followUpExampleKr: '응원하고 싶어지는 캐릭터예요.' },
        { id: 'ost', jp: 'きれいな音楽と映像', reading: 'きれいな おんがくと えいぞう', kr: '아름다운 음악과 영상', followUpExampleJp: '見ているだけで癒やされます。', followUpExampleKr: '보는 것만으로도 힐링이 돼요.' }
      ],
      step2Prompt: '어떤 느낌의 작품을 선호하나요?',
      step2Choices: [
        { id: 'calm', jp: '心が落ち着く日常系', reading: 'こころが おちつく にちじょうけい', kr: '마음이 편안해지는 일상물' },
        { id: 'fantasy', jp: 'ワクワクするファンタジー', reading: 'ワクワクする ファンタジー', kr: '설레는 판타지물' },
        { id: 'mystery', jp: '結末が気になるミステリー', reading: 'けつまつが きになる ミステリー', kr: '결말이 궁금한 미스터리' }
      ],
      buildSentence: (c1, c2) => ({
        jp: `${c1.jp}が大切だと思います。特に${c2.jp}が好きです。`,
        reading: `${c1.reading}が たいせつだと おもいます。とくに ${c2.reading}が すきです。`,
        kr: `${c1.kr}이(가) 중요하다고 생각해요. 특히 ${c2.kr}을(를) 좋아해요.`
      }),
      followUps: [
        { jp: '最近見た中で、おすすめはありますか？', reading: 'さいきん みた なかで、おすすめは ありますか？', kr: '최근 본 것 중에 추천작이 있나요?', tip: '생각나지 않으면 「秘密です(비밀이에요)」 또는 「考え中です(생각 중이에요)」라고 답해도 좋아요.' }
      ]
    }
  },
  {
    id: 5,
    code: '05',
    titleKr: '기분과 컨디션',
    titleJp: '気分とコンディション',
    grammarSummary: '～ています、～くなる／になる、～ので',
    learningGoal: '상태와 변화를 간단히 표현하기',
    comfortNote: '깊은 고민을 털어놓지 않고, "조금 졸려요", "따뜻한 차를 마셔서 개운해졌어요"처럼 가벼운 신체·기분 변화를 표현합니다.',
    themeCategory: '감정·상태',
    grammarPoints: [
      {
        pattern: '～ています',
        meaning: '~하고 있어요 / ~한 상태예요',
        exampleJp: '今は少し疲れています。',
        exampleReading: 'いまは すこし つかれています。',
        exampleKr: '지금은 조금 피곤한 상태예요.',
        usageNote: '현재 진행 중인 행동이나 지금의 컨디션 상태를 설명할 때 씁니다.'
      },
      {
        pattern: '～くなる / ～になる',
        meaning: '~해지다 / ~이 되다',
        exampleJp: '音楽を聞いて気分が良くなりました。',
        exampleReading: 'おんがくを きいて きぶんが よくなりました。',
        exampleKr: '음악을 듣고 기분이 좋아졌어요.',
        usageNote: 'い형용사는 「～くなる」, な형용사·명사는 「～になる」로 상태 변화를 나타냅니다.'
      },
      {
        pattern: '～ので',
        meaning: '~해서, ~이기 때문에 (부드러운 이유)',
        exampleJp: '少し眠いので、ゆっくり話したいです。',
        exampleReading: 'すこし ねむいので、ゆっくり はなしたいです。',
        exampleKr: '조금 졸려서 천천히 이야기하고 싶어요.',
        usageNote: '「～から」보다 차분하고 정중하게 이유나 현재 컨디션을 설명할 때 좋습니다.'
      },
      {
        pattern: '～すぎないでください',
        meaning: '너무 ~하지 마세요',
        exampleJp: '無理しすぎないでくださいね。',
        exampleReading: 'むりしすぎないでくださいね。',
        exampleKr: '너무 무리하지 마세요.',
        usageNote: '스스로에게나 상대방에게 따뜻한 배려를 건네는 표현입니다.'
      }
    ],
    exampleGroups: [
      {
        id: '5-1',
        title: '① 오늘의 컨디션 가볍게 알리기',
        sentences: [
          { jp: '今日は少し眠いので、のんびりしたいです。', reading: 'きょうは すこし ねむいので、のんびりしたいです。', kr: '오늘은 조금 졸려서 느긋하게 하고 싶어요.', focusPart: '眠いので' },
          { jp: 'たくさん寝たので、すっきりしています。', reading: 'たくさん ねたので、すっきりしています。', kr: '푹 자서 개운한 상태예요.', focusPart: 'しています' },
          { jp: '温かいお茶を飲んで、落ち着きました。', reading: 'あたたかい おちゃを のんで、おちつきました。', kr: '따뜻한 차를 마시고 차분해졌어요.', focusPart: '落ち着きました' }
        ]
      }
    ],
    vocabulary: [
      { jp: '嬉しい', reading: 'うれしい', kr: '기쁘다', tier: '필수 어휘', sampleJp: '天気がよくて嬉しいです。', sampleKr: '날씨가 좋아서 기뻐요.' },
      { jp: '落ち着く', reading: 'おちつく', kr: '차분해지다', tier: '필수 어휘', sampleJp: '静かな部屋で落ち着きます。', sampleKr: '조용한 방에서 마음이 안정돼요.' },
      { jp: '疲れる', reading: 'つかれる', kr: '피곤하다', tier: '필수 어휘', sampleJp: '目が少し疲れました。', sampleKr: '눈이 조금 피곤해졌어요.' },
      { jp: '眠い', reading: 'ねむい', kr: '졸리다', tier: '필수 어휘', sampleJp: '午後になると眠くなります。', sampleKr: '오후가 되면 졸려져요.' },
      { jp: 'すっきりする', reading: 'すっきりする', kr: '개운하다', tier: '확장 어휘', sampleJp: 'シャワーを浴びてすっきりしました。', sampleKr: '샤워를 하고 개운해졌어요.' },
      { jp: '無理する', reading: 'むりする', kr: '무리하다', tier: '범용 표현', sampleJp: '今日は無理しないで休みます。', sampleKr: '오늘은 무리하지 않고 쉬어요.' }
    ],
    drills: [
      {
        id: 'd5-1',
        krPrompt: '조금 졸려서 쉬고 싶어요.',
        jpAnswer: '少し眠いので、休みたいです。',
        readingAnswer: 'すこし ねむいので、やすみたいです。',
        tiles: ['少し', '眠いので、', '休みたい', 'です。'],
        grammarHint: '眠い + ので (졸려서)'
      },
      {
        id: 'd5-2',
        krPrompt: '따뜻해졌어요.',
        jpAnswer: '暖かくなりました。',
        readingAnswer: 'あたたかくなりました。',
        tiles: ['暖かく', 'なりました。'],
        grammarHint: '暖かい → 暖かくなる'
      }
    ],
    substitution: {
      instruction: '현재 상태와 하고 싶은 행동을 「～ので」로 부드럽게 연결해 보세요.',
      slot1Label: '현재 컨디션',
      slot1Options: [
        { jp: '少し眠い', reading: 'すこし ねむい', kr: '조금 졸리다' },
        { jp: 'お腹が空いた', reading: 'おなかが すいた', kr: '배가 고프다' },
        { jp: '気分がいい', reading: 'きぶんが いい', kr: '기분이 좋다' }
      ],
      slot2Label: '원하는 행동',
      slot2Options: [
        { jp: 'ゆっくり休みます。', reading: 'ゆっくり やすみます。', kr: '푹 쉬어요.' },
        { jp: '美味しいものを食べます。', reading: 'おいしいものを たべます。', kr: '맛있는 것을 먹어요.' },
        { jp: '好きな音楽を聞きます。', reading: 'すきな おんがくを ききます。', kr: '좋아하는 음악을 들어요.' }
      ],
      connectorParticle: 'ので、'
    },
    cardActivity: {
      headerJp: '今のコンディションを選びましょう',
      headerKr: '회화 활동: 컨디션 & 힐링 처방 카드',
      subNote: '수업 시작 전이나 도중에 내 컨디션을 부담 없이 표현하는 연습입니다.',
      step1Prompt: '오늘의 에너지 상태는 어떤가요?',
      step1Choices: [
        { id: 'cozy', jp: '落ち着いている', reading: 'おちついている', kr: '차분하고 편안함', followUpExampleJp: '今日もマイペースで勉強したいです。', followUpExampleKr: '오늘도 내 페이스로 공부하고 싶어요.' },
        { id: 'sleepy', jp: '少し眠い', reading: 'すこし ねむい', kr: '조금 나른하고 졸림', followUpExampleJp: '聞く練習を中心にしたいです。', followUpExampleKr: '듣기 연습을 중심으로 하고 싶어요.' },
        { id: 'fresh', jp: 'すっきりしている', reading: 'すっきりしている', kr: '개운하고 상쾌함', followUpExampleJp: '新しい表現を練習してみたいです。', followUpExampleKr: '새로운 표현을 연습해 보고 싶어요.' }
      ],
      step2Prompt: '기분이 좋아지려면 무엇이 도움이 되나요?',
      step2Choices: [
        { id: 'tea', jp: '温かい飲み物を飲むと', reading: 'あたたかい のみものを のむと', kr: '따뜻한 음료를 마시면' },
        { id: 'cat', jp: '可愛い動物を見ると', reading: 'かわいい どうぶつを みると', kr: '귀여운 동물을 보면' },
        { id: 'music', jp: '静かな音楽を聞くと', reading: 'しずかな おんがくを きくと', kr: '조용한 음악을 들으면' }
      ],
      buildSentence: (c1, c2) => ({
        jp: `今は${c1.jp}状態です。${c2.jp}、もっと気分が良くなります。`,
        reading: `いまは ${c1.reading} じょうたいです。${c2.reading}、もっと きぶんが よくなります。`,
        kr: `지금은 ${c1.kr} 상태예요. ${c2.kr} 기분이 더 좋아져요.`
      }),
      followUps: [
        { jp: '今日もゆっくり進めましょうか？', reading: 'きょうも ゆっくり すすめましょうか？', kr: '오늘도 천천히 진행할까요?', tip: '언제든 「はい、お願いします(네, 부탁드려요)」라고 답하며 속도를 조절할 수 있어요.' }
      ]
    }
  },
  {
    id: 6,
    code: '06',
    titleKr: '온라인 활동과 인터넷',
    titleJp: 'オンライン活動とインターネット',
    grammarSummary: '～ながら、～てから、～ことがある',
    learningGoal: '인터넷에서 하는 일과 경험 설명하기',
    comfortNote: '집에서 가장 친숙하게 접하는 유튜브, 스트리밍, 검색, 플레이리스트 등 온라인 일상을 일본어로 표현합니다.',
    themeCategory: '인터넷',
    grammarPoints: [
      {
        pattern: '～ながら',
        meaning: '~하면서 (동시 동작)',
        exampleJp: '音楽を聞きながらネットを見ます。',
        exampleReading: 'おんがくを ききながら ネットを みます。',
        exampleKr: '음악을 들으면서 인터넷을 봐요.',
        usageNote: '동사 ます형 어간에 「ながら」를 붙여 두 가지 일을 동시에 하는 모습을 묘사합니다.'
      },
      {
        pattern: '～てから',
        meaning: '~하고 나서',
        exampleJp: 'レビューを読んでからゲームを買います。',
        exampleReading: 'レビューを よんでから ゲームを かいます。',
        exampleKr: '리뷰를 읽고 나서 게임을 사요.',
        usageNote: '행동의 선후 관계를 명확히 설명할 때 사용합니다.'
      },
      {
        pattern: '～たことがあります',
        meaning: '~한 적이 있어요 (경험)',
        exampleJp: '日本の配信を見たことがあります。',
        exampleReading: 'にほんの はいしんを みたことが あります。',
        exampleKr: '일본 방송(스트리밍)을 본 적이 있어요.',
        usageNote: '거창한 해외여행 경험이 아니어도, 영상을 보거나 곡을 들어본 작은 경험도 모두 말할 수 있어요.'
      },
      {
        pattern: '～たり ～たり',
        meaning: '~하거나 ~하거나',
        exampleJp: '動画を検索したり、コメントを読んだりします。',
        exampleReading: 'どうがを けんさくしたり、コメントを よんだりします。',
        exampleKr: '영상을 검색하거나 댓글을 읽거나 해요.',
        usageNote: '인터넷 서핑 중에 하는 여러 가벼운 행동을 묶어 표현합니다.'
      }
    ],
    exampleGroups: [
      {
        id: '6-1',
        title: '① 멀티태스킹과 온라인 루틴 말하기',
        sentences: [
          { jp: 'お菓子を食べながら動画を見ます。', reading: 'おかしを たべながら どうがを みます。', kr: '과자를 먹으면서 동영상을 봐요.', focusPart: '食べながら' },
          { jp: '予告編を見てから映画を選びます。', reading: 'よこくへんを みてから えいがを えらびます。', kr: '예고편을 보고 나서 영화를 골라요.', focusPart: '見てから' },
          { jp: '日本語で検索したことがあります。', reading: 'にほんごで けんさくしたことが あります。', kr: '일본어로 검색해 본 적이 있어요.', focusPart: 'たことがあります' }
        ]
      }
    ],
    vocabulary: [
      { jp: '動画', reading: 'どうが', kr: '동영상', tier: '필수 어휘', sampleJp: '短い動画を見ます。', sampleKr: '짧은 동영상을 봐요.' },
      { jp: '配信', reading: 'はいしん', kr: '스트리밍, 방송', tier: '필수 어휘', sampleJp: '生配信を見ました。', sampleKr: '생방송을 봤어요.' },
      { jp: '検索する', reading: 'けんさくする', kr: '검색하다', tier: '필수 어휘', sampleJp: '攻略を検索します。', sampleKr: '공략을 검색해요.' },
      { jp: '投稿する', reading: 'とうこうする', kr: '게시하다, 올리다', tier: '확장 어휘', sampleJp: '写真を投稿しました。', sampleKr: '사진을 올렸어요.' },
      { jp: 'コメント', reading: 'こめんと', kr: '댓글', tier: '필수 어휘', sampleJp: 'コメントを読むのが面白いです。', sampleKr: '댓글을 읽는 것이 재미있어요.' },
      { jp: 'お気に入り', reading: 'おきにいり', kr: '즐겨찾기, 애장품', tier: '범용 표현', sampleJp: 'お気に入りに登録しました。', sampleKr: '즐겨찾기에 등록했어요.' }
    ],
    drills: [
      {
        id: 'd6-1',
        krPrompt: '음악을 들으면서 게임을 해요.',
        jpAnswer: '音楽を聞きながらゲームをします。',
        readingAnswer: 'おんがくを ききながら ゲームを します。',
        tiles: ['音楽を', '聞きながら', 'ゲームを', 'します。'],
        grammarHint: '聞く → 聞きながら (들으면서)'
      },
      {
        id: 'd6-2',
        krPrompt: '일본 동영상을 본 적이 있어요.',
        jpAnswer: '日本の動画を見たことがあります。',
        readingAnswer: 'にほんの どうがを みたことが あります。',
        tiles: ['日本の', '動画を', '見たことが', 'あります。'],
        grammarHint: '見た + ことがあります'
      }
    ],
    substitution: {
      instruction: '「～ながら」를 사용해 동시에 즐기는 두 가지 행동을 연결해 보세요.',
      slot1Label: '함께 하는 행동 (~하면서)',
      slot1Options: [
        { jp: 'お茶を飲み', reading: 'おちゃを のみ', kr: '차를 마시' },
        { jp: '音楽を聞き', reading: 'おんがくを きき', kr: '음악을 들으' },
        { jp: 'ベッドで休み', reading: 'ベッドで やすみ', kr: '침대에서 쉬' }
      ],
      slot2Label: '주된 온라인 활동',
      slot2Options: [
        { jp: '動画を見ます。', reading: 'どうがを みます。', kr: '동영상을 봐요.' },
        { jp: 'ゲーム配信を見ます。', reading: 'ゲームはいしんを みます。', kr: '게임 방송을 봐요.' },
        { jp: 'ネットサーフィンをします。', reading: 'ネットサーフィンを します。', kr: '인터넷 서핑을 해요.' }
      ],
      connectorParticle: 'ながら、'
    },
    cardActivity: {
      headerJp: 'ネットでの楽しみ方を選びましょう',
      headerKr: '회화 활동: 온라인 취미 카드',
      subNote: '평소 자주 보는 채널이나 온라인에서 시간 보내는 방식을 골라 보세요.',
      step1Prompt: '인터넷에서 주로 무엇을 보나요?',
      step1Choices: [
        { id: 'gameplay', jp: 'ゲームの実況動画', reading: 'ゲームの じっきょうどうが', kr: '게임 실황 영상', followUpExampleJp: '自分でしなくても楽しいです。', followUpExampleKr: '직접 플레이하지 않아도 즐거워요.' },
        { id: 'playlist', jp: '作業用BGM・音楽', reading: 'さぎょうよう BGM・おんがく', kr: '작업용 BGM·플레이리스트', followUpExampleJp: '部屋の雰囲気が良くなります。', followUpExampleKr: '방 분위기가 좋아져요.' },
        { id: 'animal_vid', jp: '動物のショート動画', reading: 'どうぶつの ショートどうが', kr: '동물 쇼츠 영상', followUpExampleJp: '見ているだけで癒やされます。', followUpExampleKr: '보는 것만으로도 힐링이 돼요.' }
      ],
      step2Prompt: '어떤 스타일로 감상하나요?',
      step2Choices: [
        { id: 'snack', jp: 'お菓子を食べながら', reading: 'おかしを たべながら', kr: '간식을 먹으면서' },
        { id: 'bed', jp: '寝る前にゆっくり', reading: 'ねる まえに ゆっくり', kr: '자기 전에 느긋하게' },
        { id: 'comment', jp: 'コメントを読みながら', reading: 'コメントを よみながら', kr: '댓글을 읽으면서' }
      ],
      buildSentence: (c1, c2) => ({
        jp: `よく${c2.jp}、${c1.jp}を見ます。`,
        reading: `よく ${c2.reading}、${c1.reading}を みます。`,
        kr: `자주 ${c2.kr} ${c1.kr}을(를) 봐요.`
      }),
      followUps: [
        { jp: '日本のユーチューバーを見たことがありますか？', reading: 'にほんの ユーチューバーを みたことが ありますか？', kr: '일본 유튜버 영상을 본 적이 있나요?', tip: '「はい、少しあります(네, 조금 있어요)」나 「まだないです(아직 없어요)」로 가볍게 답해보세요.' }
      ]
    }
  },
  {
    id: 7,
    code: '07',
    titleKr: '쇼핑과 물건 고르기',
    titleJp: '買い物ともの選び',
    grammarSummary: '～より、～のほうが、～たい、～てもいい',
    learningGoal: '물건 비교하고 원하는 것 고르기',
    comfortNote: '온라인 쇼핑몰에서 굿즈, 헤드폰, 문구류, 간식을 고르는 가상의 상황으로 재미있게 비교 표현을 익힙니다.',
    themeCategory: '선택·의견',
    grammarPoints: [
      {
        pattern: 'Aより Bのほうが ～',
        meaning: 'A보다 B 쪽이 더 ~해요',
        exampleJp: '黒より白のほうが好きです。',
        exampleReading: 'くろより しろのほうが すきです。',
        exampleKr: '검은색보다 흰색 쪽을 더 좋아해요.',
        usageNote: '두 가지 아이템을 놓고 내 취향에 맞는 쪽을 고를 때 쓰는 핵심 비교 문법입니다.'
      },
      {
        pattern: '～てもいいですか',
        meaning: '~해도 될까요? / ~해도 괜찮아요',
        exampleJp: 'もう少し考えてもいいですか。',
        exampleReading: 'もうすこし かんがえても いいですか。',
        exampleKr: '조금 더 생각해 봐도 될까요?',
        usageNote: '결정을 서두르지 않고 여유를 요청할 때 매우 유용한 표현입니다.'
      },
      {
        pattern: '～ほしいです',
        meaning: '(물건을) 갖고 싶어요',
        exampleJp: '新しいヘッドホンがほしいです。',
        exampleReading: 'あたらしい ヘッドホンが ほしいです。',
        exampleKr: '새로운 헤드폰을 갖고 싶어요.',
        usageNote: '동작은 「～たい」, 명사(물건)를 원할 때는 「～がほしい」를 씁니다.'
      },
      {
        pattern: '～かもしれません',
        meaning: '~일지도 몰라요',
        exampleJp: 'これのほうが便利かもしれません。',
        exampleReading: 'これのほうが べんりかも しれません。',
        exampleKr: '이쪽이 더 편리할지도 몰라요.',
        usageNote: '확신하지 않아도 조심스럽게 추측을 덧붙일 수 있어요.'
      }
    ],
    exampleGroups: [
      {
        id: '7-1',
        title: '① 두 가지 물건 비교해 고르기',
        sentences: [
          { jp: 'イヤホンよりヘッドホンのほうが好きです。', reading: 'イヤホンより ヘッドホンのほうが すきです。', kr: '이어폰보다 헤드폰 쪽을 더 좋아해요.', focusPart: 'のほうが' },
          { jp: '派手なデザインよりシンプルなほうが落ち着きます。', reading: 'はでな デザインより シンプルなほうが おちつきます。', kr: '화려한 디자인보다 심플한 쪽이 마음이 편해요.', focusPart: 'より' },
          { jp: '好きなキャラクターのグッズがほしいです。', reading: 'すきな キャラクターの グッズが ほしいです。', kr: '좋아하는 캐릭터 굿즈를 갖고 싶어요.', focusPart: 'がほしいです' }
        ]
      }
    ],
    vocabulary: [
      { jp: '迷う', reading: 'まよう', kr: '망설이다, 고민하다', tier: '필수 어휘', sampleJp: '色がきれいで迷います。', sampleKr: '색이 예뻐서 고민돼요.' },
      { jp: '選ぶ', reading: 'えらぶ', kr: '고르다', tier: '필수 어휘', sampleJp: '一番使いやすいものを選びます。', sampleKr: '가장 쓰기 편한 것을 골라요.' },
      { jp: '比べる', reading: 'くらべる', kr: '비교하다', tier: '필수 어휘', sampleJp: '値段を比べてみます。', sampleKr: '가격을 비교해 봐요.' },
      { jp: 'シンプル', reading: 'シンプル', kr: '심플함, 단순함', tier: '범용 표현', sampleJp: 'シンプルなデザインが好きです。', sampleKr: '심플한 디자인을 좋아해요.' },
      { jp: '便利', reading: 'べんり', kr: '편리함', tier: '필수 어휘', sampleJp: 'ネット通販はとても便利です。', sampleKr: '인터넷 쇼핑은 무척 편리해요.' },
      { jp: 'グッズ', reading: 'グッズ', kr: '굿즈, 상품', tier: '확장 어휘', sampleJp: '限定グッズを買いたいです。', sampleKr: '한정 굿즈를 사고 싶어요.' }
    ],
    drills: [
      {
        id: 'd7-1',
        krPrompt: '검은색보다 흰색 쪽을 더 좋아해요.',
        jpAnswer: '黒より白のほうが好きです。',
        readingAnswer: 'くろより しろのほうが すきです。',
        tiles: ['黒より', '白のほうが', '好きです。'],
        grammarHint: 'Aより Bのほうが'
      },
      {
        id: 'd7-2',
        krPrompt: '새 헤드폰을 갖고 싶어요.',
        jpAnswer: '新しいヘッドホンがほしいです。',
        readingAnswer: 'あたらしい ヘッドホンが ほしいです。',
        tiles: ['新しい', 'ヘッドホンが', 'ほしいです。'],
        grammarHint: '[물건] + が + ほしいです'
      }
    ],
    substitution: {
      instruction: '두 아이템 중 더 마음에 드는 쪽을 비교 문장으로 만들어 보세요.',
      slot1Label: '비교 대상 A (~보다)',
      slot1Options: [
        { jp: '大きい画面', reading: 'おおきい がめん', kr: '큰 화면' },
        { jp: '黒いキーボード', reading: 'くろい キーボード', kr: '검은색 키보드' },
        { jp: 'オフラインのお店', reading: 'オフラインの おみせ', kr: '오프라인 매장' }
      ],
      slot2Label: '선호하는 대상 B (~쪽이 더)',
      slot2Options: [
        { jp: '軽いタブレットのほうが便利です。', reading: 'かるい タブレットのほうが べんりです。', kr: '가벼운 태블릿 쪽이 편리해요.' },
        { jp: '白いキーボードのほうがきれいです。', reading: 'しろい キーボードのほうが きれいです。', kr: '하얀 키보드 쪽이 예뻐요.' },
        { jp: 'ネットショッピングのほうが楽です。', reading: 'ネットショッピングのほうが らくです。', kr: '인터넷 쇼핑 쪽이 편해요.' }
      ],
      connectorParticle: 'より、'
    },
    cardActivity: {
      headerJp: 'ほしいアイテムを選びましょう',
      headerKr: '회화 활동: 나만의 데스크테리어·굿즈 고르기',
      subNote: '방 책상 위에 놓고 싶은 아이템과 디자인 취향을 골라 보세요.',
      step1Prompt: '선물로 하나를 받을 수 있다면 무엇이 좋나요?',
      step1Choices: [
        { id: 'headphone', jp: 'ワイヤレスヘッドホン', reading: 'ワイヤレスヘッドホン', kr: '무선 헤드폰', followUpExampleJp: '音楽やゲームに集中できるからです。', followUpExampleKr: '음악이나 게임에 집중할 수 있기 때문이에요.' },
        { id: 'lamp', jp: '暖かいムードライト', reading: 'あたたかい ムードライト', kr: '따뜻한 무드등', followUpExampleJp: '夜の部屋が落ち着くからです。', followUpExampleKr: '밤에 방 분위기가 차분해지기 때문이에요.' },
        { id: 'figure', jp: '好きな作品のグッズ', reading: 'すきな さくひんの グッズ', kr: '좋아하는 작품 굿즈', followUpExampleJp: '机の上に飾りたいからです。', followUpExampleKr: '책상 위에 장식하고 싶기 때문이에요.' }
      ],
      step2Prompt: '어떤 스타일이 더 마음에 드나요?',
      step2Choices: [
        { id: 'simple', jp: '派手なものよりシンプルなほう', reading: 'はでなものより シンプルなほう', kr: '화려한 것보다 심플한 쪽' },
        { id: 'cute', jp: '普通のものより可愛いほう', reading: 'ふつうのものより かわいいほう', kr: '평범한 것보다 귀여운 쪽' },
        { id: 'useful', jp: 'デザインより使いやすいほう', reading: 'デザインより つかいやすいほう', kr: '디자인보다 쓰기 편한 쪽' }
      ],
      buildSentence: (c1, c2) => ({
        jp: `${c1.jp}がほしいです。${c2.jp}が好きです。`,
        reading: `${c1.reading}が ほしいです。${c2.reading}が すきです。`,
        kr: `${c1.kr}을(를) 갖고 싶어요. ${c2.kr}을(를) 좋아해요.`
      }),
      followUps: [
        { jp: 'どんな色が一番好きですか？', reading: 'どんな いろが いちばん すきですか？', kr: '어떤 색을 가장 좋아하나요?', tip: '「白です(흰색이에요)」, 「青が好きです(파란색을 좋아해요)」처럼 편하게 답해 보세요.' }
      ]
    }
  },
  {
    id: 8,
    code: '08',
    titleKr: '날씨와 계절',
    titleJp: '天気と季節',
    grammarSummary: '～たら、～ので、～ほうがいい',
    learningGoal: '날씨에 따른 계획과 선택 말하기',
    comfortNote: '창밖 날씨와 좋아하는 계절, 비 오는 날 집에서 하기 좋은 일을 중심으로 이야기합니다.',
    themeCategory: '집과 일상',
    grammarPoints: [
      {
        pattern: '～たら',
        meaning: '~하면, ~한다면 (가정·조건)',
        exampleJp: '雨が降ったら、家で映画を見ます。',
        exampleReading: 'あめが ふったら、いえで えいがを みます。',
        exampleKr: '비가 오면 집에서 영화를 봐요.',
        usageNote: '과거형(た형)에 「ら」를 붙여 "~한 상황이 되면"이라는 조건을 부드럽게 만듭니다.'
      },
      {
        pattern: '～ほうがいいです',
        meaning: '~하는 편이 좋아요',
        exampleJp: '寒い日は暖かい服を着たほうがいいです。',
        exampleReading: 'さむい ひは あたたかい ふくを きたほうが いいです。',
        exampleKr: '추운 날은 따뜻한 옷을 입는 편이 좋아요.',
        usageNote: '가벼운 팁이나 나만의 선택 기준을 말할 때 사용합니다.'
      },
      {
        pattern: '～ので',
        meaning: '~해서, ~하니까',
        exampleJp: '外が寒いので、部屋でココアを飲みます。',
        exampleReading: 'そとが さむいので、へやで ココアを のみます。',
        exampleKr: '밖이 추워서 방에서 코코아를 마셔요.',
        usageNote: '날씨를 이유로 자연스럽게 실내 활동을 연결합니다.'
      },
      {
        pattern: '一番（いちばん）',
        meaning: '가장, 제일',
        exampleJp: '季節の中で秋が一番好きです。',
        exampleReading: 'きせつの なかで あきが いちばん すきです。',
        exampleKr: '계절 중에서 가을을 가장 좋아해요.',
        usageNote: '사계절 중 선호하는 계절을 고를 때 함께 씁니다.'
      }
    ],
    exampleGroups: [
      {
        id: '8-1',
        title: '① 날씨와 계절에 따른 실내 활동 말하기',
        sentences: [
          { jp: '雨が降ったら、窓の近くで音楽を聞きます。', reading: 'あめが ふったら、まどの ちかくで おんがくを ききます。', kr: '비가 오면 창가에서 음악을 들어요.', focusPart: '降ったら' },
          { jp: '夏は暑すぎるので、涼しい部屋がいいです。', reading: 'なつは あつすぎるので、すずしい へやが いいです。', kr: '여름은 너무 더워서 시원한 방이 좋아요.', focusPart: 'ので' },
          { jp: '冬は毛布の中でゲームをしたほうがいいです。', reading: 'ふゆは もうふの なかで ゲームを したほうが いいです。', kr: '겨울에는 담요 속에서 게임을 하는 편이 좋아요.', focusPart: 'ほうがいいです' }
        ]
      }
    ],
    vocabulary: [
      { jp: '季節', reading: 'きせつ', kr: '계절', tier: '필수 어휘', sampleJp: '涼しい季節が好きです。', sampleKr: '선선한 계절을 좋아해요.' },
      { jp: '雨', reading: 'あめ', kr: '비', tier: '필수 어휘', sampleJp: '雨の音が好きです。', sampleKr: '빗소리를 좋아해요.' },
      { jp: '雪', reading: 'ゆき', kr: '눈', tier: '필수 어휘', sampleJp: '窓から雪を見ます。', sampleKr: '창문으로 눈을 봐요.' },
      { jp: '涼しい', reading: 'すずしい', kr: '선선하다, 시원하다', tier: '필수 어휘', sampleJp: '秋は風が涼しいです。', sampleKr: '가을은 바람이 선선해요.' },
      { jp: '暖かい', reading: 'あたたかい', kr: '따뜻하다 (날씨·공기)', tier: '필수 어휘', sampleJp: '春は暖かくて気持ちがいいです。', sampleKr: '봄은 따뜻해서 기분이 좋아요.' },
      { jp: '毛布', reading: 'もうふ', kr: '담요', tier: '확장 어휘', sampleJp: 'ふわふわの毛布が好きです。', sampleKr: '폭신폭신한 담요를 좋아해요.' }
    ],
    drills: [
      {
        id: 'd8-1',
        krPrompt: '비가 오면 집에서 영화를 봐요.',
        jpAnswer: '雨が降ったら、家で映画を見ます。',
        readingAnswer: 'あめが ふったら、いえで えいがを みます。',
        tiles: ['雨が', '降ったら、', '家で', '映画を見ます。'],
        grammarHint: '降る(내리다) → 降ったら(내리면)'
      },
      {
        id: 'd8-2',
        krPrompt: '계절 중에서 가을을 가장 좋아해요.',
        jpAnswer: '季節の中で秋が一番好きです。',
        readingAnswer: 'きせつの なかで あきが いちばん すきです。',
        tiles: ['季節の中で', '秋が', '一番', '好きです。'],
        grammarHint: '一番 + 好きです'
      }
    ],
    substitution: {
      instruction: '날씨 조건(～たら)과 그날 하고 싶은 일을 연결해 보세요.',
      slot1Label: '날씨 조건 (~하면)',
      slot1Options: [
        { jp: '雨が降ったら', reading: 'あめが ふったら', kr: '비가 오면' },
        { jp: '雪が降ったら', reading: 'ゆきが ふったら', kr: '눈이 오면' },
        { jp: '天気が良かったら', reading: 'てんきが よかったら', kr: '날씨가 좋으면' }
      ],
      slot2Label: '하고 싶은 일',
      slot2Options: [
        { jp: '部屋の窓を開けて風を感じます。', reading: 'へやの まどを あけて かぜを かんじます。', kr: '방 창문을 열고 바람을 느껴요.' },
        { jp: '温かいスープを作って食べます。', reading: 'あたたかい スープを つくって たべます。', kr: '따뜻한 수프를 만들어 먹어요.' },
        { jp: '一日中ゲームをします。', reading: 'いちにちじゅう ゲームを します。', kr: '하루 종일 게임을 해요.' }
      ],
      connectorParticle: '、'
    },
    cardActivity: {
      headerJp: '好きな季節と天気を選びましょう',
      headerKr: '회화 활동: 계절 & 창밖 날씨 카드',
      subNote: '창밖을 바라볼 때 가장 기분이 편안해지는 계절과 날씨를 골라 보세요.',
      step1Prompt: '어느 계절이나 날씨를 좋아하나요?',
      step1Choices: [
        { id: 'autumn', jp: '涼しい秋', reading: 'すずしい あき', kr: '선선한 가을', followUpExampleJp: '暑すぎなくて過ごしやすいです。', followUpExampleKr: '너무 덥지 않아서 지내기 편해요.' },
        { id: 'rainy', jp: '静かな雨の日', reading: 'しずかな あめの ひ', kr: '조용한 비 오는 날', followUpExampleJp: '雨の音を聞くと落ち着きます。', followUpExampleKr: '빗소리를 들으면 마음이 차분해져요.' },
        { id: 'winter', jp: '暖かい部屋の冬', reading: 'あたたかい へやの ふゆ', kr: '따뜻한 방 안의 겨울', followUpExampleJp: 'ココアが美味しい季節です。', followUpExampleKr: '코코아가 맛있는 계절이에요.' }
      ],
      step2Prompt: '그런 날에는 무엇을 하는 편이 좋나요?',
      step2Choices: [
        { id: 'movie', jp: '毛布の中で映画を見たほうがいい', reading: 'もうふの なかで えいがを みたほうが いい', kr: '담요 속에서 영화를 보는 편이 좋다' },
        { id: 'tea', jp: '温かいお茶を飲んだほうがいい', reading: 'あたたかい おちゃを のんだほうが いい', kr: '따뜻한 차를 마시는 편이 좋다' },
        { id: 'sleep', jp: 'ゆっくり昼寝をしたほうがいい', reading: 'ゆっくり ひるねを したほうが いい', kr: '느긋하게 낮잠을 자는 편이 좋다' }
      ],
      buildSentence: (c1, c2) => ({
        jp: `${c1.jp}が好きです。そんな日は${c2.jp}です。`,
        reading: `${c1.reading}が すきです。そんな ひは ${c2.reading}です。`,
        kr: `${c1.kr}을(를) 좋아해요. 그런 날에는 ${c2.kr}요.`
      }),
      followUps: [
        { jp: '暑い夏と寒い冬、どっちがマシですか？', reading: 'あつい なつと さむい ふゆ、どっちが マシですか？', kr: '더운 여름과 추운 겨울 중 어느 쪽이 그나마 나은가요?', tip: '「冬のほうがマシです(겨울 쪽이 나아요)」처럼 가볍게 골라 보세요.' }
      ]
    }
  },
  {
    id: 9,
    code: '09',
    titleKr: '상상 여행과 가고 싶은 곳',
    titleJp: '空想旅行と行きたい場所',
    grammarSummary: '～つもり、～予定、～たいと思う',
    learningGoal: '가고 싶은 장소와 여행 계획 설명하기',
    comfortNote: '실제로 당장 떠나야 한다는 부담 없이, 지도나 사진으로 구경하며 "만약 순간이동을 한다면 가보고 싶은 곳"을 상상해 봅니다.',
    themeCategory: '상상 여행',
    grammarPoints: [
      {
        pattern: '～たいと思っています',
        meaning: '~하고 싶다고 생각하고 있어요',
        exampleJp: 'いつか京都の静かなお寺を見たいと思っています。',
        exampleReading: 'いつか きょうとの しずかな おてらを みたいと おもっています。',
        exampleKr: '언젠가 교토의 조용한 절을 보고 싶다고 생각하고 있어요.',
        usageNote: '막연한 소망이나 상상 속 버킷리스트를 부드럽게 이야기할 때 씁니다.'
      },
      {
        pattern: '～つもりです',
        meaning: '~할 생각이에요 (가상 계획)',
        exampleJp: '旅館で温泉に入ってゆっくりするつもりです。',
        exampleReading: 'りょかんで おんせんに はいって ゆっくりする つもりです。',
        exampleKr: '료칸에서 온천에 들어가 푹 쉴 생각이에요.',
        usageNote: '상상 여행 코스를 짤 때 "거기서는 ~할 생각이에요"라고 재미있게 꾸밀 수 있어요.'
      },
      {
        pattern: '～予定です',
        meaning: '~할 예정이에요',
        exampleJp: '夜はホテルで日本のコンビニ弁当を食べる予定です。',
        exampleReading: 'よるは ホテルで にほんの コンビニべんとうを たべる よていです。',
        exampleKr: '밤에는 호텔에서 일본 편의점 도시락을 먹을 예정이에요.',
        usageNote: '가상의 여행 일정표를 만들 때 활용합니다.'
      },
      {
        pattern: 'もし ～たら',
        meaning: '만약 ~한다면',
        exampleJp: 'もし日本に行ったら、秋葉原を見たいです。',
        exampleReading: 'もし にほんに いったら、あきはばらを みたいです。',
        exampleKr: '만약 일본에 간다면 아키하바라를 보고 싶어요.',
        usageNote: '상상 속 상황임을 전제로 편하게 이야기를 시작할 수 있습니다.'
      }
    ],
    exampleGroups: [
      {
        id: '9-1',
        title: '① 상상 여행지에서 하고 싶은 일',
        sentences: [
          { jp: '静かな海が見えるカフェに行きたいと思っています。', reading: 'しずかな うみが みえる カフェに いきたいと おもっています。', kr: '조용한 바다가 보이는 카페에 가고 싶다고 생각하고 있어요.', focusPart: 'たいと思っています' },
          { jp: '観光地より、静かな町を散歩するつもりです。', reading: 'かんこうちより、しずかな まちを さんぽする つもりです。', kr: '관광지보다 조용한 동네를 산책할 생각이에요.', focusPart: 'つもりです' },
          { jp: 'ホテルで日本のテレビを見る予定です。', reading: 'ホテルで にほんの テレビを みる よていです。', kr: '호텔에서 일본 TV를 볼 예정이에요.', focusPart: '予定です' }
        ]
      }
    ],
    vocabulary: [
      { jp: '散歩', reading: 'さんぽ', kr: '산책', tier: '필수 어휘', sampleJp: '静かな道を散歩します。', sampleKr: '조용한 길을 산책해요.' },
      { jp: '景色', reading: 'けしき', kr: '경치, 풍경', tier: '필수 어휘', sampleJp: 'きれいな景色を見たいです。', sampleKr: '아름다운 풍경을 보고 싶어요.' },
      { jp: '温泉', reading: 'おんせん', kr: '온천', tier: '필수 어휘', sampleJp: '温かい温泉に入りたいです。', sampleKr: '따뜻한 온천에 들어가고 싶어요.' },
      { jp: '旅館', reading: 'りょかん', kr: '료칸(일본 전통 숙소)', tier: '확장 어휘', sampleJp: '静かな旅館に泊まります。', sampleKr: '조용한 료칸에 묵어요.' },
      { jp: 'お土産', reading: 'おみやげ', kr: '기념품, 선물', tier: '필수 어휘', sampleJp: '可愛いお土産を選びます。', sampleKr: '귀여운 기념품을 골라요.' },
      { jp: 'いつか', reading: 'いつか', kr: '언젠가', tier: '범용 표현', sampleJp: 'いつか行ってみたいです。', sampleKr: '언젠가 가보고 싶어요.' }
    ],
    drills: [
      {
        id: 'd9-1',
        krPrompt: '언젠가 홋카이도에 가보고 싶다고 생각하고 있어요.',
        jpAnswer: 'いつか北海道に行ってみたいと思っています。',
        readingAnswer: 'いつか ほっかいどうに いってみたいと おもっています。',
        tiles: ['いつか', '北海道に', '行ってみたいと', '思っています。'],
        grammarHint: '行ってみたい + と思っています'
      },
      {
        id: 'd9-2',
        krPrompt: '호텔에서 푹 쉴 생각이에요.',
        jpAnswer: 'ホテルでゆっくり休むつもりです。',
        readingAnswer: 'ホテルで ゆっくり やすむ つもりです。',
        tiles: ['ホテルで', 'ゆっくり', '休む', 'つもりです。'],
        grammarHint: '동사 원형 + つもりです'
      }
    ],
    substitution: {
      instruction: '만약 순간이동을 할 수 있다면 어디서 무엇을 할지 상상 문장을 조합해 보세요.',
      slot1Label: '상상 여행 장소',
      slot1Options: [
        { jp: '雪の北海道', reading: 'ゆきの ほっかいどう', kr: '눈 내리는 홋카이도' },
        { jp: '静かな京都の路地', reading: 'しずかな きょうとの ろじ', kr: '조용한 교토 골목길' },
        { jp: 'アニメの聖地', reading: 'アニメの せいち', kr: '애니메이션 성지(배경지)' }
      ],
      slot2Label: '상상 속 계획',
      slot2Options: [
        { jp: '写真を撮りながら散歩するつもりです。', reading: 'しゃしんを とりながら さんぽする つもりです。', kr: '사진을 찍으며 산책할 생각이에요.' },
        { jp: '美味しいデザートを食べる予定です。', reading: 'おいしい デザートを たべる よていです。', kr: '맛있는 디저트를 먹을 예정이에요.' },
        { jp: 'ホテルで一日中ごろごろするつもりです。', reading: 'ホテルで いちにちじゅう ごろごろする つもりです。', kr: '호텔에서 하루 종일 뒹굴거릴 생각이에요.' }
      ],
      connectorParticle: 'に行って、'
    },
    cardActivity: {
      headerJp: '空想の旅プランを作りましょう',
      headerKr: '회화 활동: 나만의 상상 여행 티켓',
      subNote: '복잡한 준비 없이 지금 바로 순간이동할 수 있다면 가고 싶은 풍경을 골라 보세요.',
      step1Prompt: '어떤 분위기의 장소로 순간이동하고 싶나요?',
      step1Choices: [
        { id: 'onsen', jp: '森の中の静かな温泉旅館', reading: 'もりの なかの しずかな おんせんりょかん', kr: '숲속의 조용한 온천 료칸', followUpExampleJp: '誰もいない露天風呂に入りたいです。', followUpExampleKr: '아무도 없는 노천탕에 들어가고 싶어요.' },
        { id: 'akiba', jp: 'グッズがたくさんある専門店街', reading: 'グッズが たくさん ある せんもんてんがい', kr: '굿즈가 가득한 취미 상점가', followUpExampleJp: '珍しいゲームや本を見たいです。', followUpExampleKr: '희귀한 게임이나 책을 보고 싶어요.' },
        { id: 'sea', jp: '夜の海が見える小さな駅', reading: 'よるの うみが みえる ちいさな えき', kr: '밤바다가 보이는 작은 기차역', followUpExampleJp: 'アニメのワンシーンみたいだからです。', followUpExampleKr: '애니메이션의 한 장면 같기 때문이에요.' }
      ],
      step2Prompt: '거기서 무엇을 할 생각인가요?',
      step2Choices: [
        { id: 'relax', jp: '美味しいものを食べてゆっくり休むつもり', reading: 'おいしいものを たべて ゆっくり やすむ つもり', kr: '맛있는 것을 먹고 푹 쉴 생각' },
        { id: 'photo', jp: 'きれいな景色を写真に撮るつもり', reading: 'きれいな けしきを しゃしんに とる つもり', kr: '예쁜 풍경을 사진으로 찍을 생각' },
        { id: 'shop', jp: 'お気に入りのグッズを探すつもり', reading: 'おきにいりの グッズを さがす つもり', kr: '마음에 드는 굿즈를 찾을 생각' }
      ],
      buildSentence: (c1, c2) => ({
        jp: `いつか${c1.jp}に行きたいと思っています。そこでは${c2.jp}です。`,
        reading: `いつか ${c1.reading}に いきたいと おもっています。そこでは ${c2.reading}です。`,
        kr: `언젠가 ${c1.kr}에 가고 싶다고 생각하고 있어요. 거기서는 ${c2.kr}이에요.`
      }),
      followUps: [
        { jp: 'お土産に何を買いたいですか？', reading: 'おみやげに なにを かいたいですか？', kr: '기념품으로 무엇을 사고 싶나요?', tip: '「甘いお菓子です(달콤한 과자요)」처럼 간단히 답해 보세요.' }
      ]
    }
  },
  {
    id: 10,
    code: '10',
    titleKr: '부탁과 일상적인 대화',
    titleJp: 'お願いと日常のやりとり',
    grammarSummary: '～てください、～てもらう、～てくれる',
    learningGoal: '도움 요청하고 감사 표현하기',
    comfortNote: '수업 중 선생님께 속도 조절을 요청하거나, 온라인 게임·배달·일상에서 가볍게 부탁하고 고마움을 전하는 표현을 익힙니다.',
    themeCategory: '선택·의견',
    grammarPoints: [
      {
        pattern: '～てください',
        meaning: '~해 주세요',
        exampleJp: 'もう一度ゆっくり言ってください。',
        exampleReading: 'もういちど ゆっくり いってください。',
        exampleKr: '다시 한번 천천히 말해 주세요.',
        usageNote: '수업 중에 언제든 부담 없이 선생님께 요청할 수 있는 가장 든든한 문장입니다.'
      },
      {
        pattern: '～てもらえますか',
        meaning: '~해 주실 수 있나요? (정중한 부탁)',
        exampleJp: 'チャットに書いてもらえますか。',
        exampleReading: 'チャットに かいて もらえますか。',
        exampleKr: '채팅창에 적어 주실 수 있나요?',
        usageNote: '「～てください」보다 한결 부드럽게 도움을 청할 때 씁니다.'
      },
      {
        pattern: '～てくれてありがとう',
        meaning: '~해 줘서 고마워요',
        exampleJp: 'おすすめを教えてくれてありがとうございます。',
        exampleReading: 'おすすめを おしえてくれて ありがとうございます。',
        exampleKr: '추천작을 알려 주셔서 감사합니다.',
        usageNote: '상대방의 배려나 친절에 따뜻하게 감사를 표현하는 패턴입니다.'
      },
      {
        pattern: '～てもらいました',
        meaning: '~해 주셨어요 (도움 받음)',
        exampleJp: '先生に発音を直してもらいました。',
        exampleReading: 'せんせいに はつおんを なおして もらいました。',
        exampleKr: '선생님께 발음 교정을 받았어요.',
        usageNote: '내가 받은 기분 좋은 도움을 중심으로 서술할 때 씁니다.'
      }
    ],
    exampleGroups: [
      {
        id: '10-1',
        title: '① 수업이나 온라인에서 편안하게 요청하기',
        sentences: [
          { jp: '少し考える時間をください。', reading: 'すこし かんがえる じかんを ください。', kr: '조금 생각할 시간을 주세요.', focusPart: 'ください' },
          { jp: 'ヒントを出してもらえますか。', reading: 'ヒントを だして もらえますか。', kr: '힌트를 내주실 수 있나요?', focusPart: 'もらえますか' },
          { jp: '待ってくれてありがとうございます。', reading: 'まってくれて ありがとうございます。', kr: '기다려 주셔서 감사합니다.', focusPart: 'てくれて' }
        ]
      }
    ],
    vocabulary: [
      { jp: '教える', reading: 'おしえる', kr: '가르치다, 알려주다', tier: '필수 어휘', sampleJp: '意味を教えてください。', sampleKr: '의미를 알려 주세요.' },
      { jp: '待つ', reading: 'まつ', kr: '기다리다', tier: '필수 어휘', sampleJp: '少し待ってください。', sampleKr: '조금만 기다려 주세요.' },
      { jp: '手伝う', reading: 'てつだう', kr: '돕다', tier: '필수 어휘', sampleJp: 'クエストを手伝ってもらいました。', sampleKr: '퀘스트를 도움받았어요.' },
      { jp: '置く', reading: 'おく', kr: '놓다, 두다', tier: '확장 어휘', sampleJp: 'ドアの前に置いてください。', sampleKr: '문 앞에 놓아 주세요(비대면 배달).' },
      { jp: 'ゆっくり', reading: 'ゆっくり', kr: '천천히', tier: '필수 어휘', sampleJp: 'ゆっくり話してください。', sampleKr: '천천히 이야기해 주세요.' },
      { jp: 'ヒント', reading: 'ヒント', kr: '힌트', tier: '범용 표현', sampleJp: 'ヒントをありがとうございます。', sampleKr: '힌트 감사합니다.' }
    ],
    drills: [
      {
        id: 'd10-1',
        krPrompt: '다시 한번 천천히 말해 주세요.',
        jpAnswer: 'もう一度ゆっくり言ってください。',
        readingAnswer: 'もういちど ゆっくり いってください。',
        tiles: ['もう一度', 'ゆっくり', '言って', 'ください。'],
        grammarHint: '言う(말하다) → 言ってください'
      },
      {
        id: 'd10-2',
        krPrompt: '기다려 주셔서 감사합니다.',
        jpAnswer: '待ってくれてありがとうございます。',
        readingAnswer: 'まってくれて ありがとうございます。',
        tiles: ['待って', 'くれて', 'ありがとう', 'ございます。'],
        grammarHint: '待つ → 待ってくれて'
      }
    ],
    substitution: {
      instruction: '수업 중이나 일상에서 부담 없이 쓸 수 있는 요청 문장을 만들어 보세요.',
      slot1Label: '요청 내용',
      slot1Options: [
        { jp: 'もう一度読んで', reading: 'もういちど よんで', kr: '다시 한번 읽어' },
        { jp: 'チャットに書いて', reading: 'チャットに かいて', kr: '채팅에 적어' },
        { jp: '少し待って', reading: 'すこし まって', kr: '조금 기다려' }
      ],
      slot2Label: '정중한 마무리',
      slot2Options: [
        { jp: 'ください。', reading: 'ください。', kr: '주세요.' },
        { jp: 'もらえますか。', reading: 'もらえますか。', kr: '주실 수 있나요?' },
        { jp: 'くれてありがとうございます。', reading: 'くれて ありがとうございます。', kr: '주셔서 감사합니다.' }
      ],
      connectorParticle: ''
    },
    cardActivity: {
      headerJp: '安心フレーズを選びましょう',
      headerKr: '회화 활동: 든든한 안심 요청 카드',
      subNote: '수업이나 일상에서 내가 가장 자주 쓰고 싶은 안심 표현을 골라 입에 익혀 보세요.',
      step1Prompt: '대화 중에 어떤 도움이 있으면 가장 편안한가요?',
      step1Choices: [
        { id: 'slow', jp: 'ゆっくり話してもらうこと', reading: 'ゆっくり はなして もらうこと', kr: '천천히 이야기해 주는 것', followUpExampleJp: 'ゆっくり言ってくれると安心します。', followUpExampleKr: '천천히 말해 주면 안심이 돼요.' },
        { id: 'chat', jp: '文字で書いてもらうこと', reading: 'もじで かいて もらうこと', kr: '글자로 적어 주는 것', followUpExampleJp: '目で見て確認したいからです。', followUpExampleKr: '눈으로 보고 확인하고 싶기 때문이에요.' },
        { id: 'wait', jp: '考える時間を待ってもらうこと', reading: 'かんがえる じかんを まって もらうこと', kr: '생각할 시간을 기다려 주는 것', followUpExampleJp: '急がないほうがうまく言えます。', followUpExampleKr: '서두르지 않는 편이 잘 말할 수 있어요.' }
      ],
      step2Prompt: '어떻게 감사를 전해 볼까요?',
      step2Choices: [
        { id: 'thanks1', jp: 'いつも優しく教えてくれてありがとうございます', reading: 'いつも やさしく おしえてくれて ありがとうございます', kr: '언제나 다정하게 알려 주셔서 감사합니다' },
        { id: 'thanks2', jp: 'ゆっくり待ってくれてありがとうございます', reading: 'ゆっくり まってくれて ありがとうございます', kr: '천천히 기다려 주셔서 감사합니다' }
      ],
      buildSentence: (c1, c2) => ({
        jp: `${c1.jp}が好きです。${c2.jp}。`,
        reading: `${c1.reading}が すきです。${c2.reading}。`,
        kr: `${c1.kr}을(를) 좋아해요. ${c2.kr}.`
      }),
      followUps: [
        { jp: 'いつでもこのカードを使ってくださいね。', reading: 'いつでも この カードを つかってくださいね。', kr: '언제든 이 카드를 사용해 주세요.', tip: '말로 하기 힘들 때는 화면의 문장을 복사해서 채팅에 붙여넣어도 좋습니다.' }
      ]
    }
  },
  {
    id: 11,
    code: '11',
    titleKr: '취향 비교와 추천',
    titleJp: '好みの比較とおすすめ',
    grammarSummary: '～より、～と思う、～なら、～かもしれない',
    learningGoal: '좋아하는 것을 비교하고 추천하기',
    comfortNote: '내가 좋아하는 콘텐츠나 음식을 상대방의 취향에 맞춰 부드럽게 추천해 보는 연습입니다.',
    themeCategory: '콘텐츠',
    grammarPoints: [
      {
        pattern: '～なら',
        meaning: '~라면, ~에 관해서라면',
        exampleJp: '癒やし系のアニメなら、これがおすすめです。',
        exampleReading: 'いやしけいの アニメなら、これが おすすめです。',
        exampleKr: '힐링계 애니메이션이라면 이것을 추천해요.',
        usageNote: '상대방이 관심 있는 주제를 받아서 맞춤형으로 추천할 때 씁니다.'
      },
      {
        pattern: '～かもしれません',
        meaning: '~일지도 몰라요 (부드러운 추측)',
        exampleJp: 'この曲も好きかもしれません。',
        exampleReading: 'この きょくも すきかも しれません。',
        exampleKr: '이 곡도 좋아하실지 몰라요.',
        usageNote: '강요하지 않고 "혹시 마음에 드실지도 몰라요"라고 세심하게 권할 때 씁니다.'
      },
      {
        pattern: 'どちらかというと',
        meaning: '어느 쪽인가 하면',
        exampleJp: 'どちらかというと、静かなゲームのほうが好きです。',
        exampleReading: 'どちらかというと、しずかな ゲームのほうが すきです。',
        exampleKr: '어느 쪽인가 하면 조용한 게임 쪽을 더 좋아해요.',
        usageNote: '양자택일 질문에 부담 없이 내 성향을 부드럽게 밝히는 만능 표현입니다.'
      },
      {
        pattern: '～と思います',
        meaning: '~라고 생각해요',
        exampleJp: 'きっと面白いと思います。',
        exampleReading: 'きっと おもしろいと おもいます。',
        exampleKr: '분명 재미있을 거라고 생각해요.',
        usageNote: '추천 이유를 덧붙일 때 사용합니다.'
      }
    ],
    exampleGroups: [
      {
        id: '11-1',
        title: '① 부담 없이 취향 비교하고 추천하기',
        sentences: [
          { jp: '甘いデザートなら、このプリンがおすすめです。', reading: 'あまい デザートなら、この プリンが おすすめです。', kr: '달콤한 디저트라면 이 푸딩을 추천해요.', focusPart: 'なら' },
          { jp: 'どちらかというと、映画よりアニメのほうがよく見ます。', reading: 'どちらかというと、えいがより アニメのほうが よく みます。', kr: '어느 쪽인가 하면 영화보다 애니메이션 쪽을 더 자주 봐요.', focusPart: 'どちらかというと' },
          { jp: '猫が好きなら、このゲームも気に入るかもしれません。', reading: 'ねこが すきなら、この ゲームも きにいるかも しれません。', kr: '고양이를 좋아한다면 이 게임도 마음에 들지 몰라요.', focusPart: 'かもしれません' }
        ]
      }
    ],
    vocabulary: [
      { jp: 'おすすめ', reading: 'おすすめ', kr: '추천', tier: '필수 어휘', sampleJp: '私のおすすめはこれです。', sampleKr: '제 추천은 이것이에요.' },
      { jp: 'どちらかというと', reading: 'どちらかというと', kr: '어느 쪽인가 하면', tier: '범용 표현', sampleJp: 'どちらかというと夜型です。', sampleKr: '어느 쪽인가 하면 올빼미형이에요.' },
      { jp: 'たぶん', reading: 'たぶん', kr: '아마도', tier: '필수 어휘', sampleJp: 'たぶん気に入ると思います。', sampleKr: '아마 마음에 들 거라고 생각해요.' },
      { jp: '気に入る', reading: 'きにいる', kr: '마음에 들다', tier: '필수 어휘', sampleJp: 'この曲がすごく気に入りました。', sampleKr: '이 곡이 무척 마음에 들었어요.' },
      { jp: '雰囲気', reading: 'ふんいき', kr: '분위기', tier: '확장 어휘', sampleJp: '落ち着いた雰囲気がいいです。', sampleKr: '차분한 분위기가 좋아요.' },
      { jp: 'ぴったり', reading: 'ぴったり', kr: '딱 맞음, 안성맞춤', tier: '확장 어휘', sampleJp: '雨の日にぴったりの曲です。', sampleKr: '비 오는 날에 딱 맞는 곡이에요.' }
    ],
    drills: [
      {
        id: 'd11-1',
        krPrompt: '조용한 음악이라면 이 곡을 추천해요.',
        jpAnswer: '静かな音楽なら、この曲がおすすめです。',
        readingAnswer: 'しずかな おんがくなら、この きょくが おすすめです。',
        tiles: ['静かな音楽', 'なら、', 'この曲が', 'おすすめです。'],
        grammarHint: '[명사] + なら (~라면)'
      },
      {
        id: 'd11-2',
        krPrompt: '어느 쪽인가 하면 집콕파예요.',
        jpAnswer: 'どちらかというと、インドア派です。',
        readingAnswer: 'どちらかというと、インドアはです。',
        tiles: ['どちらかというと、', 'インドア派', 'です。'],
        grammarHint: 'どちらかというと (어느 쪽인가 하면)'
      }
    ],
    substitution: {
      instruction: '상대방의 관심사(～なら)에 맞춰 나만의 추천 문장을 만들어 보세요.',
      slot1Label: '관심 조건 (~라면)',
      slot1Options: [
        { jp: '癒やされたい', reading: 'いやされたい', kr: '힐링하고 싶다' },
        { jp: '面白いゲームを探している', reading: 'おもしろい ゲームを さがしている', kr: '재미있는 게임을 찾고 있다' },
        { jp: '甘いものが好き', reading: 'あまいものが すき', kr: '단것을 좋아한다' }
      ],
      slot2Label: '추천 멘트',
      slot2Options: [
        { jp: 'この動画がおすすめです。', reading: 'この どうがが おすすめです。', kr: '이 영상을 추천해요.' },
        { jp: 'この作品がぴったりかもしれません。', reading: 'この さくひんが ぴったりかも しれません。', kr: '이 작품이 딱 맞을지도 몰라요.' },
        { jp: 'きっと気に入ると思います。', reading: 'きっと きにいると おもいます。', kr: '분명 마음에 들 거라고 생각해요.' }
      ],
      connectorParticle: 'なら、'
    },
    cardActivity: {
      headerJp: 'あなたのおすすめを紹介しましょう',
      headerKr: '회화 활동: 취향 큐레이터 추천 카드',
      subNote: '가상의 손님에게 마음에 들 만한 콘텐츠나 간식을 골라 추천해 보세요.',
      step1Prompt: '어떤 테마를 찾는 사람에게 추천할까요?',
      step1Choices: [
        { id: 'night_bgm', jp: '眠れない夜に聞く音楽', reading: 'ねむれない よるに きく おんがく', kr: '잠이 안 오는 밤에 듣는 음악', followUpExampleJp: 'ピアノの音がとても静かです。', followUpExampleKr: '피아노 소리가 무척 고요해요.' },
        { id: 'cozy_game', jp: '一人でゆっくりできるゲーム', reading: 'ひとりで ゆっくり できる ゲーム', kr: '혼자 느긋하게 할 수 있는 게임', followUpExampleJp: '時間制限がなくて楽です。', followUpExampleKr: '시간제한이 없어서 편해요.' },
        { id: 'winter_snack', jp: '寒い日に食べるおやつ', reading: 'さむい ひに たべる おやつ', kr: '추운 날에 먹는 간식', followUpExampleJp: '温かいお茶とよく合います。', followUpExampleKr: '따뜻한 차와 잘 어울려요.' }
      ],
      step2Prompt: '어떻게 추천 말을 건네 볼까요?',
      step2Choices: [
        { id: 'rec1', jp: 'これが一番おすすめです', reading: 'これが いちばん おすすめです', kr: '이것을 가장 추천해요' },
        { id: 'rec2', jp: 'これがぴったりかもしれません', reading: 'これが ぴったりかも しれません', kr: '이것이 딱 맞을지도 몰라요' }
      ],
      buildSentence: (c1, c2) => ({
        jp: `${c1.jp}なら、${c2.jp}。`,
        reading: `${c1.reading}なら、${c2.reading}。`,
        kr: `${c1.kr}이라면, ${c2.kr}.`
      }),
      followUps: [
        { jp: 'どうしてそれがおすすめですか？', reading: 'どうして それが おすすめですか？', kr: '왜 그것을 추천하나요?', tip: '1회차에 배운 「～からです」를 사용해 짧게 이유를 붙여 보세요!' }
      ]
    }
  },
  {
    id: 12,
    code: '12',
    titleKr: '나만의 일상 이야기',
    titleJp: '私だけの日常ストーリー',
    grammarSummary: '이전 문법 종합 복습 (1~11회차 패턴 연결)',
    learningGoal: '익숙한 주제로 짧은 일본어 대화하기',
    comfortNote: '긴 스피치를 억지로 하지 않고, 그동안 배운 짧은 문장 2~3개를 블록처럼 자연스럽게 이어 나만의 작은 이야기를 완성합니다.',
    themeCategory: '종합 복습',
    grammarPoints: [
      {
        pattern: '취향 + 이유 연결 (～が好き / ～から)',
        meaning: '좋아하는 것과 그 이유 이어 말하기',
        exampleJp: '家で音楽を聞くのが好きです。落ち着くからです。',
        exampleReading: 'いえで おんがくを きくのが すきです。おちつくからです。',
        exampleKr: '집에서 음악 듣는 것을 좋아해요. 마음이 차분해지기 때문이에요.',
        usageNote: '1회차와 5회차 표현을 합쳐 자연스러운 두 문장을 만듭니다.'
      },
      {
        pattern: '일상 + 동시동작 (よく～ながら)',
        meaning: '평소 루틴과 함께 하는 행동',
        exampleJp: '夜によくお茶を飲みながら動画を見ます。',
        exampleReading: 'よるに よく おちゃを のみながら どうがを みます。',
        exampleKr: '밤에 자주 차를 마시면서 영상을 봐요.',
        usageNote: '2회차와 6회차 표현을 연결해 구체적인 장면을 그립니다.'
      },
      {
        pattern: '비교 + 감상 (～より / ～と思う)',
        meaning: '내 성향과 생각 덧붙이기',
        exampleJp: 'どちらかというと、外より家のほうが楽だと思います。',
        exampleReading: 'どちらかというと、そとより いえのほうが らくだと おもいます。',
        exampleKr: '어느 쪽인가 하면 밖보다 집 쪽이 편하다고 생각해요.',
        usageNote: '4회차, 7회차, 11회차 문법으로 내 취향을 부드럽게 표현합니다.'
      },
      {
        pattern: '소망 + 계획 (～たら / ～つもり)',
        meaning: '날씨나 주말에 하고 싶은 일',
        exampleJp: '週末は新しいゲームをしてゆっくり休むつもりです。',
        exampleReading: 'しゅうまつは あたらしい ゲームを して ゆっくり やすむ つもりです。',
        exampleKr: '주말에는 새 게임을 하며 푹 쉴 생각이에요.',
        usageNote: '8회차와 9회차 문법으로 기분 좋은 계획을 마무리합니다.'
      }
    ],
    exampleGroups: [
      {
        id: '12-1',
        title: '① 짧은 문장 3개를 연결한 나만의 미니 에세이 예시',
        sentences: [
          { jp: '私は家でゆっくり過ごすのが好きです。', reading: 'わたしは いえで ゆっくり すごすのが すきです。', kr: '저는 집에서 느긋하게 보내는 것을 좋아해요.', focusPart: 'のが好きです' },
          { jp: '夜によく甘いココアを飲みながら、アニメを見ます。', reading: 'よるに よく あまい ココアを のみながら、アニメを みます。', kr: '밤에 자주 달콤한 코코아를 마시면서 애니메이션을 봐요.', focusPart: '飲みながら' },
          { jp: '今週末も部屋でお気に入りのゲームをするつもりです。', reading: 'こんしゅうまつも へやで おきにいりの ゲームを する つもりです。', kr: '이번 주말에도 방에서 마음에 드는 게임을 할 생각이에요.', focusPart: 'つもりです' }
        ]
      }
    ],
    vocabulary: [
      { jp: 'マイペース', reading: 'マイペース', kr: '마이페이스, 나만의 속도', tier: '범용 표현', sampleJp: 'マイペースが一番いいです。', sampleKr: '나만의 속도가 가장 좋아요.' },
      { jp: 'お気に入り', reading: 'おきにいり', kr: '마음에 드는 것', tier: '필수 어휘', sampleJp: 'お気に入りの時間を過ごします。', sampleKr: '마음에 드는 시간을 보내요.' },
      { jp: '癒やし', reading: 'いやし', kr: '힐링, 위안', tier: '필수 어휘', sampleJp: '私にとって最高の癒やしです。', sampleKr: '저에게 최고의 힐링이에요.' },
      { jp: 'これから', reading: 'これから', kr: '앞으로, 지금부터', tier: '범용 표현', sampleJp: 'これからも少しずつ勉強したいです。', sampleKr: '앞으로도 조금씩 공부하고 싶어요.' },
      { jp: '楽しみ', reading: 'たのしみ', kr: '즐거움, 기대', tier: '필수 어휘', sampleJp: '毎日の小さな楽しみです。', sampleKr: '매일의 작은 즐거움이에요.' },
      { jp: '十分', reading: 'じゅうぶん', kr: '충분함', tier: '범용 표현', sampleJp: '短い文でも十分伝わります。', sampleKr: '짧은 문장으로도 충분히 전달돼요.' }
    ],
    drills: [
      {
        id: 'd12-1',
        krPrompt: '저는 집에서 느긋하게 보내는 것을 좋아해요.',
        jpAnswer: '私は家でゆっくり過ごすのが好きです。',
        readingAnswer: 'わたしは いえで ゆっくり すごすのが すきです。',
        tiles: ['私は', '家で', 'ゆっくり過ごすのが', '好きです。'],
        grammarHint: '동사 원형 + のが好きです'
      },
      {
        id: 'd12-2',
        krPrompt: '주말에는 새 게임을 할 생각이에요.',
        jpAnswer: '週末は新しいゲームをするつもりです。',
        readingAnswer: 'しゅうまつは あたらしい ゲームを する つもりです。',
        tiles: ['週末は', '新しいゲームを', 'する', 'つもりです。'],
        grammarHint: '동사 원형 + つもりです'
      }
    ],
    substitution: {
      instruction: '1~11회차에서 배운 표현을 조합해 나만의 2문장 이야기를 완성해 보세요.',
      slot1Label: '첫 번째 문장 (좋아하는 시간)',
      slot1Options: [
        { jp: '静かな夜に音楽を聞くのが好きです。', reading: 'しずかな よるに おんがくを きくのが すきです。', kr: '조용한 밤에 음악 듣는 것을 좋아해요.' },
        { jp: '部屋で甘いおやつを食べるのが好きです。', reading: 'へやで あまい おやつを たべるのが すきです。', kr: '방에서 달콤한 간식 먹는 것을 좋아해요.' },
        { jp: '休みの日にアニメを見るのが好きです。', reading: 'やすみの ひに アニメを みるのが すきです。', kr: '쉬는 날에 애니메이션 보는 것을 좋아해요.' }
      ],
      slot2Label: '두 번째 문장 (이유와 생각)',
      slot2Options: [
        { jp: 'とても落ち着くからです。', reading: 'とても おちつくからです。', kr: '무척 마음이 차분해지기 때문이에요.' },
        { jp: '私にとって最高の癒やしだと思います。', reading: 'わたしに とって さいこうの いやしだと おもいます。', kr: '저에게 최고의 힐링이라고 생각해요.' },
        { jp: '明日ものんびり過ごすつもりです。', reading: 'あしたも のんびり すごす つもりです。', kr: '내일도 느긋하게 보낼 생각이에요.' }
      ],
      connectorParticle: ' '
    },
    cardActivity: {
      headerJp: '私だけのミニストーリーを完成しましょう',
      headerKr: '회화 활동: 나만의 일상 미니 스토리북',
      subNote: '12회차 완주를 축하합니다! 지금 가장 마음에 드는 문장 블록을 골라 나만의 일본어 미니 프로필을 완성해 보세요.',
      step1Prompt: '나의 일상 키워드는 무엇인가요?',
      step1Choices: [
        { id: 'cozy_home', jp: '部屋でのんびり音楽と動画を楽しむこと', reading: 'へやで のんびり おんがくと どうがを たのしむこと', kr: '방에서 느긋하게 음악과 영상을 즐기는 것', followUpExampleJp: '静かな時間が一番落ち着きます。', followUpExampleKr: '조용한 시간이 가장 마음 편해요.' },
        { id: 'sweet_game', jp: '甘いお菓子を食べながらゲームをすること', reading: 'あまい おかしを たべながら ゲームを すること', kr: '달콤한 과자를 먹으며 게임하는 것', followUpExampleJp: '好きなキャラクターがいるからです。', followUpExampleKr: '좋아하는 캐릭터가 있기 때문이에요.' },
        { id: 'dream_trip', jp: 'きれいな景色や空想の旅を想像すること', reading: 'きれいな けしきや くうそうの たびを そうぞうすること', kr: '아름다운 풍경이나 상상 여행을 떠올리는 것', followUpExampleJp: 'いつか静かな温泉に行ってみたいです。', followUpExampleKr: '언젠가 조용한 온천에 가보고 싶어요.' }
      ],
      step2Prompt: '앞으로 일본어를 어떻게 즐기고 싶나요?',
      step2Choices: [
        { id: 'mypace', jp: 'これからもマイペースで少しずつ楽しみたい', reading: 'これからも マイペースで すこしずつ たのしみたい', kr: '앞으로도 내 속도로 조금씩 즐기고 싶다' },
        { id: 'media', jp: '好きなアニメやゲームの言葉を聞き取りたい', reading: 'すきな アニメや ゲームの ことばを ききとりたい', kr: '좋아하는 애니나 게임의 대사를 알아듣고 싶다' }
      ],
      buildSentence: (c1, c2) => ({
        jp: `私は${c1.jp}が好きです。${c2.jp}と思っています。`,
        reading: `わたしは ${c1.reading}が すきです。${c2.reading}と おもっています。`,
        kr: `저는 ${c1.kr}을(를) 좋아해요. ${c2.kr}고 생각하고 있어요.`
      }),
      followUps: [
        { jp: '12回まで本当によく頑張りましたね！', reading: 'じゅうにかいまで ほんとうに よく がんばりましたね！', kr: '12회차까지 정말 잘 해내셨어요!', tip: '오늘 완성한 문장을 나만의 표현 노트에 저장해 보세요.' }
      ]
    }
  }
];

export const PEDAGOGY_GUIDELINES = {
  recommendedDirections: [
    { label: '주제 선정', detail: '집에서의 일상, 취미, 음식, 콘텐츠 감상, 온라인 활동, 상상 여행, 가벼운 선택과 취향' },
    { label: '수업 방식', detail: '정답을 맞히는 시험보다 예문을 변형하고 자신의 표현으로 말하는 연습' },
    { label: '질문 방식', detail: '개인적인 경험을 반드시 공개하도록 요구하지 않고, 가상의 인물이나 예시를 활용해도 답할 수 있도록 구성' },
    { label: '회화 목표', detail: '긴 대화를 억지로 이어 가는 것보다, 짧은 문장을 자연스럽게 연결하고 원하는 만큼 답변을 확장하기' },
    { label: '피할 주제', detail: '학교생활, 출석, 성적, 친구 관계, 진로 압박 등 학생에게 부담이 될 수 있는 주제를 기본 교재에서 제외하기' }
  ],
  tutorChecklist: [
    '학생이 말한 문장을 매번 즉시 끊어서 고치지 않기.',
    '답변이 짧더라도 충분히 대답했다면 인정하고, 추가 설명은 선택할 수 있게 하기.',
    '자신의 실제 경험을 말하기 어려운 질문은 가상의 인물이나 캐릭터를 통해 답할 수 있게 하기.',
    '개인적인 상황을 직접 묻기보다는 작품, 음식, 취미 등 외부 대상을 중심으로 질문하기.',
    '수업 마지막에는 틀린 표현만 나열하지 말고, 학생이 새롭게 사용할 수 있게 된 표현을 2~3개 짚어 주기.'
  ]
};
