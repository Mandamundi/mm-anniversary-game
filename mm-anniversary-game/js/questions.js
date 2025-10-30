const QUESTIONS_DATABASE = [
  { id: 0, act: 1, storyText: '你的像素兔子在胡蘿蔔攤前。生意很慢。你聽說有一家傳奇的研究公司可以幫助像你這樣的企業家做出更好的決策...', character: 'bear', questionText: '熊出現了："你需要 財經 M 平方！但首先，你知道 MM 的五大核心價值觀是什麼嗎？"', answers: ['讓數據說話、教育行銷、人人研究員、專業社群、邁向世界','速度、效率、利潤、規模、品質','數據、研究、洞察、準確、及時','客戶、團隊、產品、服務、價值'], correctAnswer: 0, type: 'single-choice' },
  { id: 1, act: 1, storyText: null, character: 'bull', questionText: '公牛跑過來："大團隊意味著信任！你認為 MM 有多少人？"', answers: ['10-20 人','21-40 人','41-60 人','61-80 人'], correctAnswer: 1, type: 'single-choice' },
  { id: 2, act: 1, storyText: null, character: 'bear', questionText: '熊補充道："研究是他們的骨幹。猜猜他們的研究部門有多少人？"', answers: ['5-10 人','11-15 人','16-20 人','21-25 人'], correctAnswer: 0, type: 'single-choice' },
  { id: 3, act: 1, storyText: '熊說："你正在學習！現在，你想如何接近 MM？"', character: 'bear', questionText: '選擇你的路徑：', answers: ['我想先了解他們的社群文化','給我看他們的產品和服務'], correctAnswer: null, type: 'path-choice', pathMapping: { 0: 'community', 1: 'product' } },

  { id: 4, act: 2, path: 'community', storyText: '你決定潛伏在 MM 的社群中了解他們的文化...', character: 'bear', questionText: '你聽到 MM 員工稱呼自己一個特別的名稱。是什麼？', answers: ['MM 戰士','MMers','MM 家族','MM 團隊'], correctAnswer: 1, type: 'single-choice' },
  { id: 5, act: 2, path: 'community', storyText: null, character: 'bull', questionText: '等等，其中一位研究員看起來很年輕... Rachel 多大了？', answers: ['18 歲','22 歲'], correctAnswer: 0, type: 'single-choice' },
  { id: 6, act: 2, path: 'community', storyText: null, character: 'bear', questionText: '你正在查看 Slack 頭像以記住名字。這是誰？', answers: ['選項 A - 員工姓名','選項 B - 員工姓名','選項 C - 員工姓名','選項 D - 員工姓名'], correctAnswer: 0, type: 'single-choice', special: 'slack-avatar' },
  { id: 7, act: 2, path: 'community', storyText: null, character: 'bear', questionText: '創辦人經營一個受歡迎的 FB 粉專。它叫什麼名字？', answers: ['選項 A','選項 B','選項 C','選項 D'], correctAnswer: 1, type: 'single-choice' },

  { id: 4, act: 2, path: 'product', storyText: '你正在瀏覽 MM 的網站，試圖了解他們的產品...', character: 'bull', questionText: '以下哪個不是 MM 的訂閱方案？', answers: ['MM PRO','MM Prime','MM Max','MM Fantastic'], correctAnswer: 3, type: 'single-choice' },
  { id: 5, act: 2, path: 'product', storyText: null, character: 'bear', questionText: '哇，他們有用戶生成的圖表！有多少張？', answers: ['100-500 張','10,000-20,000 張','50,000-80,000 張','90,000+ 張'], correctAnswer: 3, type: 'single-choice' },
  { id: 6, act: 2, path: 'product', storyText: null, character: 'bull', questionText: '以下哪個專區不在 MM 平台上？', answers: ['總體經濟專區','產業研究專區','加密貨幣專區','房地產分析專區'], correctAnswer: 3, type: 'single-choice' },
  { id: 7, act: 2, path: 'product', storyText: null, character: 'bear', questionText: 'MM 最新上線的新方案名稱是什麼？', answers: ['MM Ultimate','MM Max','MM Pro Max','MM XL'], correctAnswer: 1, type: 'single-choice' },

  { id: 8, act: 3, path: 'both', storyText: '你準備好成為客戶了，但首先你需要證明你真的了解 MM...', character: 'bear', questionText: '快！"MM" 實際上代表什麼意思？', answers: ['MacroMicro（宏觀微觀）','MicroMacro','ModernMacro','MarketMacro'], correctAnswer: 0, type: 'single-choice' },
  { id: 9, act: 3, path: 'both', storyText: null, character: 'bear', questionText: 'MM 的使命宣言是什麼？', answers: ['重視基本面，人人都應該為自己的投資負責','運用數據，讓人人都可以看見世界趨勢','運用數據，讓人人都可以為自己的決策負責','將關鍵的數據轉化為友善的圖表'], correctAnswer: 2, type: 'single-choice' },
  { id: 10, act: 3, path: 'both', storyText: null, character: 'bull', questionText: '他們涵蓋產業研究和美股財報數據庫。多少個產業部門?多少家美國公司財報?', answers: ['8個產業部門,3000+家公司財報','12個產業部門,5000+家公司財報','15個產業部門,7000+家公司財報','20個產業部門,10000+家公司財報'], correctAnswer: 1, type: 'single-choice' },
  { id: 11, act: 3, path: 'both', storyText: null, character: 'bear', questionText: '用戶投票選出了他們最喜歡的工具。你認為是什麼？', answers: ['工具 A','工具 B','工具 C','工具 D'], correctAnswer: 0, type: 'single-choice' },
  { id: 12, act: 4, path: 'both', storyText: '最後一件事...', character: 'bear', questionText: 'MM 神秘的"畫外音"旁白是誰？', answers: ['Ronald','Rutger','Roger','Robert'], correctAnswer: 2, type: 'single-choice' },
  { id: 13, act: 4, path: 'both', storyText: '終極挑戰！', character: 'both', questionText: '現在，在不碰到邊緣的情況下引導游標通過 MM 標誌！穩定的手 = 穩定的投資！', answers: null, correctAnswer: null, type: 'mini-game', gameType: 'wire-loop' }
];

function getQuestion(index) {
  const currentPath = GameState.currentPath;
  const availableQuestions = QUESTIONS_DATABASE.filter(q => q.path === currentPath || q.path === 'both' || q.id <= 3);
  return availableQuestions[index] || null;
}

function handlePathChoice(choiceIndex) {
  const question = QUESTIONS_DATABASE[3];
  if (question.type === 'path-choice') {
    GameState.currentPath = question.pathMapping[choiceIndex];
  }
}

