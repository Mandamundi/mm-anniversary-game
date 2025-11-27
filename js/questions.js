const QUESTIONS = [
  {
    id: 0,
    character: 'bear',
    storyText: '我在投資上迷失方向，需要專業見解...',
    questionText: '那我推薦 財經M平方 - 一個總經數據與洞察的金融資訊平台，幫助你做出投資決策！你知道他們的核心宗旨是什麼嗎？',
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
    type: 'color',
    storyText: '財經 M 平方？在查詢市場趨勢時好像常看到那綠色 Logo...',
    questionText: '沒錯～ 你還記得他們的代表色嗎？',
    answers: [
      '#E89F3C',
      '#7de0c3',
      '#79fb9d',
      '#82dee4'
    ],
    correctAnswer: 1
  },
  {
    id: 2,
    character: 'bear',
    storyText: '財經M平方 看來是個很新的平台呢，他們是怎麼開始的呢？',
    questionText: '創辦人在擔任金融分析師時，發現金融市場的警訊往往有跡可循，希望能夠彙整這些數據與資料，來幫助大家能做出更適合自己的決策。你知道創辦人是哪兩位嗎？',
    answers: [
      'Richard、Roger',
      'Rachel、Ken',
      'Rachel、Roger',
      'Michael、Milo'
    ],
    correctAnswer: 1
  },
  {
    id: 3,
    character: 'bear',
    storyText: '那麼「財經Ｍ平方」這個名字是怎麼來的呢？',
    questionText: '是由兩個英文字組成的，也是簡稱為 MM 的原因～ 猜猜是哪兩字？',
    answers: [
      'Making Money',
      'Modern Madam',
      'Magic Moment',
      'Macroeconomics Microeconomics'
    ],
    correctAnswer: 3
  },
  {
    id: 4,
    character: 'bull',
    storyText: '感覺很棒噎，我想再多了解 MM 的文化。',
    questionText: '那讓你猜猜他們的五大核心價值觀是什麼？',
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
    storyText: 'MM 是如何提供服務的呢？',
    questionText: 'MM 提供多種訂閱服務給不同需求的會員們。哪個不是 MM 現在有的方案？',
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
    storyText: '我看 影音專區有 MEO 專區，每年都會有這個活動？',
    questionText: 'MEO 是 MM 每季縱觀全球的經濟展望分享，你知道他全名是？',
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
    storyText: 'MM 平台上真的好多內容與工具喔。',
    questionText: '平台上依照總經、產業分類，有很多專區彙整相同類型資訊。哪一個專區最受歡迎？',
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
    storyText: '好厲害喔，好想更了解他們的研究員～',
    questionText: 'Fun Fact，有位資深研究員特別喜歡右上角這隻水豚，你覺得是哪一位呢？ ',
    answers: [
      'Vivianna',
      'Jason',
      'Ralice',
      'Danny'
    ],
    correctAnswer: 1
  },
  {
    id: 9,
    character: 'bear',
    storyText: '哇，財經M平方的大家都是超人吧！',
    questionText: '他們是真的很努力～ 他們也有個對自己的特別自稱，猜猜是什麼？',
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

