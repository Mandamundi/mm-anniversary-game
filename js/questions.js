const QUESTIONS = [
  {
    id: 0,
    character: 'bear',
    storyText: '我在投資上迷失方向，需要專業見解...',
    questionText: '財經 M 平方是一個提供總經數據與洞察的金融資訊平台，絕對可以幫上忙！你知道他們的宗旨是什麼嗎？',
    answers: [
      '人人都是研究員',
      '運用數據，讓人人都可以看見世界趨勢',
      '運用數據，讓人人都可以為自己的決策負責',
      '將關鍵的數據轉化為友善的圖表'
    ],
    correctAnswer: 2
  },
  {
    id: 1,
    character: 'bull',
    storyText: '財經 M 平方？在搜索引擎查詢好像常常看到使用那抹綠色的平台...',
    questionText: '沒錯！讓我來考考你M平方的代表色是哪個顏色呢？',
    answers: [
      'A',
      'B',
      'C',
      'D'
    ],
    correctAnswer: 1
  },
  {
    id: 2,
    character: 'bear',
    storyText: 'M平方好像是個蠻創新年輕的財經內容平台耶！他們是怎麼開始的呢？',
    questionText: '創辦人在擔任金融分析師時，發現金融市場的警訊往往有跡可循，希望能夠彙整這些數據與資料，來幫助大家能做出更適合自己的決策。你知道創辦人是哪兩位嗎？',
    answers: [
      'Mark、Mike',
      'Rachel、Ken',
      'Rachel、Roger',
      'Michel、Mitchell'
    ],
    correctAnswer: 1
  },
  {
    id: 3,
    character: 'bear',
    storyText: '那麼「財經Ｍ平方」這個名字的由來，有什麼原因嗎？我很好奇...',
    questionText: '財經Ｍ平方的由來是因為英文的兩個字母，這也是他們常常被稱為MM的原因，要不要猜猜是哪兩個字母？',
    answers: [
      'Macroeconomics & Microscope',
      'Megascope & Microscope',
      'Macroeconomics & Microeconomics',
      'Macroeconomics & Marketview'
    ],
    correctAnswer: 2
  },
  {
    id: 4,
    character: 'bull',
    storyText: '原來如此...這出發點真棒，我想多了解 MM 的文化...',
    questionText: 'MM 的五大核心價值觀是什麼呢？',
    answers: [
      '正向影響、創新思維、用戶需求、團隊合作、當責熱情',
      '穩健執行、成本意識、效率至上、標準流程、成就個人',
      '相信數據、追求影響、創造不凡、努力執行、熱情開朗',
      '客戶為尊、團隊競爭、產品發展、服務至上、保守思維'
    ],
    correctAnswer: 0
  },
  {
    id: 5,
    character: 'bear',
    storyText: '可以多介紹 MM 提供的服務嗎？',
    questionText: 'MM 提供多種層級的訂閱服務方案給不同需求的會員們。哪個不是 MM 的訂閱方案？',
    answers: [
      'MM Business',
      'MM Prime',
      'MM Premium',
      'MM Max'
    ],
    correctAnswer: 2
  },
  {
    id: 6,
    character: 'bull',
    storyText: '我看到在影音專區有一區MEO專區，好像每一年也都有MEO實體活動，MEO是什麼？',
    questionText: 'MEO是縱觀全球的季度經濟展望分享，考考你它的全名是什麼？',
    answers: [
      'MM投資分析展望',
      'MM經濟預期策略',
      'MM總經戰情室',
      'MM全球經濟展望'
    ],
    correctAnswer: 3
  },
  {
    id: 7,
    character: 'bear',
    storyText: '喔～那你最推薦哪一個工具或專區呢？',
    questionText: '財經M平方有蠻多專區和功能喔！讓我從最受歡迎的功能開始跟你介紹吧～猜猜最受歡迎的專區是哪一個呢？',
    answers: [
      '央行專區',
      'AI專區',
      'ETF專區',
      '加密貨幣專區'
    ],
    correctAnswer: 2
  },
  {
    id: 8,
    character: 'jason',
    storyText: '好有趣喔！研究員們也都好帥好美～～',
    questionText: '沒錯～猜猜以下是哪位的Slack頭像？',
    answers: [
      'Vivi',
      'Jason',
      'Ralice',
      'Danny'
    ],
    correctAnswer: 1
  },
  {
    id: 9,
    character: 'bear',
    storyText: '感覺財經M平方的大家都是超人吧！',
    questionText: '那你知道在 MacroMicro 工作的夥伴，對自己有一個特別的自稱嗎，猜猜是什麼？',
    answers: [
      'MM 超人',
      'MMers',
      'MM 戰士',
      'M 平方人'
    ],
    correctAnswer: 1
  }
];

const TOTAL_QUESTIONS = QUESTIONS.length;

function getQuestion(id) {
  if (id >= QUESTIONS.length) {
    return null;
  }
  return QUESTIONS[id];
}

