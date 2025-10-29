const GameState = {
  currentScreen: 'start',
  currentQuestion: 0,
  hearts: 3,
  score: 0,
  totalQuestions: 12,
  answeredQuestions: [],
  currentPath: null,
  isMuted: false,
  gameEnded: false
};

document.addEventListener('DOMContentLoaded', () => {
  initializeGame();
});

function initializeGame() {
  preloadAudio();
  document.getElementById('start-button').addEventListener('click', startGame);
  document.getElementById('restart-button').addEventListener('click', restartGame);
  document.getElementById('share-button').addEventListener('click', shareScore);
  document.getElementById('mute-button').addEventListener('click', toggleMute);
  initParallax();
  document.getElementById('total-questions').textContent = GameState.totalQuestions;
  showScreen('start');
}

function startGame() {
  playSound('start');
  setTimeout(() => { playMusic('bgm'); }, 500);
  showScreen('game');
  setTimeout(() => {
    animateBunnyHop();
    setTimeout(() => { loadQuestion(0); }, 600);
  }, 1000);
}

function showScreen(screenName) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(`${screenName}-screen`).classList.add('active');
  GameState.currentScreen = screenName;
}

function loadQuestion(questionIndex) {
  const question = getQuestion(questionIndex);
  if (!question) { endGame(); return; }
  GameState.currentQuestion = questionIndex;
  document.getElementById('current-question').textContent = questionIndex + 1;
  loadNPCSprite(question.character);

  const wireContainer = document.getElementById('wire-game-container');
  if (!wireContainer.classList.contains('hidden')) wireContainer.classList.add('hidden');

  if (question.storyText) {
    typewriterEffect('story-text', question.storyText, () => {
      setTimeout(() => { displayQuestion(question); }, 500);
    });
  } else {
    document.getElementById('story-text').textContent = '';
    displayQuestion(question);
  }
}

function displayQuestion(question) {
  document.getElementById('question-text').textContent = '';
  const answersContainer = document.getElementById('answers-container');
  answersContainer.innerHTML = '';

  if (question.type === 'mini-game' && question.gameType === 'wire-loop') {
    document.getElementById('question-text').textContent = question.questionText || '';
    document.getElementById('wire-game-container').classList.remove('hidden');
    initWireGame();
    return;
  }

  typewriterEffect('question-text', question.questionText, () => {
    renderAnswerOptions(question);
  });
}

function renderAnswerOptions(question) {
  const { answers, correctAnswer, type } = question;
  const container = document.getElementById('answers-container');
  if (!answers) return;
  answers.forEach((answer, index) => {
    const button = document.createElement('button');
    button.className = 'answer-option';
    button.textContent = answer;
    button.dataset.index = index.toString();
    button.dataset.correct = (type === 'path-choice' ? 'false' : (index === correctAnswer).toString());
    button.addEventListener('mouseenter', () => playSound('hover'));
    button.addEventListener('click', () => handleAnswerClick(button, question));
    container.appendChild(button);
  });
}

function handleAnswerClick(button, question) {
  document.querySelectorAll('.answer-option').forEach(btn => { btn.style.pointerEvents = 'none'; });
  playSound('select');
  if (question.type === 'path-choice') {
    const choiceIndex = parseInt(button.dataset.index, 10);
    handlePathChoice(choiceIndex);
    setTimeout(() => { advanceToNextQuestion(); }, 500);
    return;
  }

  const isCorrect = button.dataset.correct === 'true';
  if (isCorrect) {
    showFeedback('correct');
    playSound('correct');
    GameState.score++;
    setTimeout(() => { advanceToNextQuestion(); }, 1500);
  } else {
    showFeedback('wrong');
    playSound('wrong');
    loseHeart();
    if (GameState.hearts <= 0) {
      setTimeout(() => { endGame(); }, 2000);
    } else {
      setTimeout(() => { advanceToNextQuestion(); }, 2000);
    }
  }
  GameState.answeredQuestions.push({ question: GameState.currentQuestion, correct: isCorrect });
}

function advanceToNextQuestion() {
  hideFeedback();
  animateBunnyHop();
  setTimeout(() => { loadQuestion(GameState.currentQuestion + 1); }, 600);
}

function loseHeart() {
  GameState.hearts--;
  const heart = document.querySelector(`.heart[data-heart="${GameState.hearts + 1}"]`);
  animateHeartLoss(heart);
  showBunnySad();
}

function endGame() {
  GameState.gameEnded = true;
  let endingTier;
  if (GameState.hearts === 3) endingTier = 'gold';
  else if (GameState.hearts === 2) endingTier = 'silver';
  else if (GameState.hearts === 1) endingTier = 'bronze';
  else endingTier = 'gameover';
  displayEnding(endingTier);
}

function displayEnding(tier) {
  const endings = {
    gold: { title: '黃金夥伴', description: '完美！MM 邀請您參加週年慶典。您不僅是客戶，更是我們的家人！', sound: 'victory-gold' },
    silver: { title: '信賴客戶', description: '做得好！您訂閱了 MM，業務蒸蒸日上。知識就是力量！', sound: 'victory-silver' },
    bronze: { title: '堅定學習者', description: '您犯了錯但從未放棄。MM 為您提供試用期。我們相信您！', sound: 'victory-bronze' },
    gameover: { title: '東山再起', description: '錯誤太多了，但這段旅程教會了您一些東西。今天您了解了 MM！這是值得的。準備好後再試一次！', sound: 'gameover' }
  };
  const ending = endings[tier];
  document.getElementById('ending-title').textContent = ending.title;
  document.getElementById('ending-description').textContent = ending.description;
  document.getElementById('score-summary').textContent = `你答對了 ${GameState.score}/${GameState.totalQuestions} 題`;
  stopMusic('bgm');
  playSound(ending.sound);
  showScreen('ending');
}

function restartGame() {
  GameState.currentQuestion = 0;
  GameState.hearts = 3;
  GameState.score = 0;
  GameState.answeredQuestions = [];
  GameState.currentPath = null;
  GameState.gameEnded = false;
  document.querySelectorAll('.heart').forEach(h => { h.src = 'assets/images/heart-full.png'; h.style.opacity = '1'; });
  startGame();
}

function shareScore() {
  const endingTitle = document.getElementById('ending-title').textContent;
  const shareText = `我在 MM 十週年遊戲中獲得了${endingTitle}！你能做得更好嗎？`;
  const shareUrl = window.location.href;
  if (navigator.share) {
    navigator.share({ title: 'MM 十週年遊戲', text: shareText, url: shareUrl }).catch(() => {});
  } else {
    navigator.clipboard.writeText(`${shareText} ${shareUrl}`).then(() => { alert('分享文字已複製到剪貼板！'); });
  }
}

function toggleMute() {
  GameState.isMuted = !GameState.isMuted;
  setMuteAll(GameState.isMuted);
  const icon = document.querySelector('.speaker-icon');
  icon.textContent = GameState.isMuted ? '🔇' : '🔊';
}

