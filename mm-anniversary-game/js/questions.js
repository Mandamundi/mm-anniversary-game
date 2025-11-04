const QUESTIONS = [
  {
    id: 0,
    character: 'bear',
    storyText: '你的小生意遇到困難，需要專業見解。熊出現了...',
    questionText: '「你需要 財經 M 平方！但你知道 MM 的五大核心價值觀是什麼嗎？」',
    answers: [
      '讓數據說話、教育行銷、人人研究員、專業社群、邁向世界',
      '誠實、透明、創新、團隊、品質',
      '正直、創新、協作、追求卓越、客戶至上',
      '價值投資、長期思維、研究驅動、透明、創新'
    ],
    correctAnswer: 0
  },
  {
    id: 1,
    character: 'bull',
    storyText: null,
    questionText: '「你認為 MM 有多少人？」',
    answers: [
      '15-20 人',
      '20-30 人',
      '30-40 人',
      '40-50 人'
    ],
    correctAnswer: 1
  },
  {
    id: 2,
    character: 'bear',
    storyText: null,
    questionText: '「研究是他們的主力，猜猜研究部門有多少人？」',
    answers: [
      '5-8 人',
      '8-12 人',
      '12-15 人',
      '15-20 人'
    ],
    correctAnswer: 0
  },
  {
    id: 3,
    character: 'bear',
    storyText: '你開始深入了解 MM 的文化...',
    questionText: '你聽到 MM 員工稱呼自己一個特別的名稱。是什麼？',
    answers: [
      'MM人',
      'MMers',
      'MM戰士',
      'M方人'
    ],
    correctAnswer: 1
  },
  {
    id: 4,
    character: 'bull',
    storyText: '你正在瀏覽 MM 的網站，試圖了解他們的產品...',
    questionText: '以下哪個不是 MM 的訂閱方案？',
    answers: [
      'MM PRO',
      'MM Prime',
      'MM Max',
      'MM Fantastic'
    ],
    correctAnswer: 3
  },
  {
    id: 5,
    character: 'bear',
    storyText: null,
    questionText: '以下哪個專區不在 MM 平台上？',
    answers: [
      '總經專區',
      '產業專區',
      '加密貨幣專區',
      '房地產專區'
    ],
    correctAnswer: 3
  },
  {
    id: 6,
    character: 'bull',
    storyText: null,
    questionText: 'MM 給會員最全面的訂閱方案，名稱是什麼？',
    answers: [
      'MM Ultimate',
      'MM Max',
      'MM Pro Max',
      'MM XL'
    ],
    correctAnswer: 1
  },
  {
    id: 7,
    character: 'bear',
    storyText: '你快要成為 MM 專家了！',
    questionText: '快！「MM」實際上代表什麼意思？',
    answers: [
      'MacroMicro',
      'MicroMacro',
      'ModernMacro',
      'MarketMacro'
    ],
    correctAnswer: 0
  },
  {
    id: 8,
    character: 'bull',
    storyText: null,
    questionText: 'MM 的使命宣言是什麼？',
    answers: [
      '人人都是研究員',
      '運用數據，讓人人都可以看見世界趨勢',
      '運用數據，讓人人都可以為自己的決策負責',
      '將關鍵的數據轉化為友善的圖表'
    ],
    correctAnswer: 2
  },
  {
    id: 9,
    character: 'bear',
    storyText: null,
    questionText: '他們涵蓋產業研究和美股財報數據庫。多少個產業部門？多少家美國公司財報？',
    answers: [
      '8 個產業部門、3000+ 家公司財報',
      '12 個產業部門、5000+家公司財報',
      '15 個產業部門、7000+家公司財報',
      '20 個產業部門、10000+家公司財報'
    ],
    correctAnswer: 1
  },
  {
    id: 10,
    character: 'bull',
    storyText: '最後一個問題了！',
    questionText: '最後一件事...MM Podcast 中神秘的主持人"畫外音"是誰？',
    answers: [
      'Ronald',
      'Rutger',
      'Roger',
      'Robert'
    ],
    correctAnswer: 2
  }
];

const TOTAL_QUESTIONS = QUESTIONS.length;

function getQuestion(id) {
  if (id >= QUESTIONS.length) {
    return null;
  }
  return QUESTIONS[id];
}

