const GameState = {
  currentScreen: 'start',
  currentQuestion: 0,
  score: 0,
  totalQuestions: TOTAL_QUESTIONS,
  answeredQuestions: [],
  isMuted: false,
  gameEnded: false
};

let activeTimeouts = [];

function setGameTimeout(callback, delay) {
  const timeoutId = setTimeout(() => {
    callback();
    activeTimeouts = activeTimeouts.filter(id => id !== timeoutId);
  }, delay);
  activeTimeouts.push(timeoutId);
  return timeoutId;
}

function clearAllTimeouts() {
  activeTimeouts.forEach(id => clearTimeout(id));
  activeTimeouts = [];
}

document.addEventListener('DOMContentLoaded', () => {
  initializeGame();
});

function initializeGame() {
  preloadAudio();
  document.getElementById('start-button').addEventListener('click', startGame);
  document.getElementById('restart-button').addEventListener('click', restartGame);
  document.getElementById('mute-button').addEventListener('click', toggleMute);
  document.getElementById('copy-code-button').addEventListener('click', copyDiscountCode);
  initParallax();
  document.getElementById('total-questions').textContent = GameState.totalQuestions;
  showScreen('start');
}

function startGame() {
  playSound('start');
  setGameTimeout(() => { playMusic('bgm'); }, 500);
  showScreen('game');
  
  initializeBunnyPosition();
  
  setGameTimeout(() => {
    animateBunnyHop();
    setGameTimeout(() => { loadQuestion(0); }, 600);
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
  
  // Clear previous question content IMMEDIATELY
  document.getElementById('question-text').textContent = '';
  document.getElementById('answers-container').innerHTML = '';
  
  // Optional: fade out NPC during transition
  const npcContainer = document.getElementById('npc-container');
  npcContainer.style.opacity = '0';
  
  GameState.currentQuestion = questionIndex;
  document.getElementById('current-question').textContent = questionIndex + 1;
  
  // Small delay before loading new NPC to prevent flash
  setGameTimeout(() => {
    loadNPCSprite(question.character);
    npcContainer.style.opacity = '1';
    
    if (question.storyText) {
      typewriterEffect('story-text', question.storyText, () => {
        setGameTimeout(() => { displayQuestion(question); }, 500);
      });
    } else {
      document.getElementById('story-text').textContent = '';
      displayQuestion(question);
    }
  }, 100);
}


function displayQuestion(question) {
  document.getElementById('question-text').textContent = '';
  const answersContainer = document.getElementById('answers-container');
  answersContainer.innerHTML = '';

  typewriterEffect('question-text', question.questionText, () => {
    renderAnswerOptions(question);
  });
}

function renderAnswerOptions(question) {
  const { answers, correctAnswer } = question;
  const container = document.getElementById('answers-container');
  if (!answers) return;
  answers.forEach((answer, index) => {
    const button = document.createElement('button');
    button.className = 'answer-option';
    button.textContent = answer;
    button.dataset.index = index.toString();
    button.dataset.correct = (index === correctAnswer).toString();
    button.addEventListener('mouseenter', () => playSound('hover'));
    button.addEventListener('click', () => handleAnswerClick(button, question));
    container.appendChild(button);
  });
}

function handleAnswerClick(button, question) {
  document.querySelectorAll('.answer-option').forEach(btn => { btn.style.pointerEvents = 'none'; });
  playSound('select');

  const isCorrect = button.dataset.correct === 'true';
  if (isCorrect) {
    showFeedback('correct');
    playSound('correct');
    incrementScore();
    setGameTimeout(() => { advanceToNextQuestion(); }, 1500);
  } else {
    showFeedback('wrong');
    playSound('wrong');
    setGameTimeout(() => { advanceToNextQuestion(); }, 2000);
  }
  GameState.answeredQuestions.push({ question: GameState.currentQuestion, correct: isCorrect });
}

function incrementScore() {
  GameState.score++;
  const scoreElement = document.getElementById('score-display');
  scoreElement.textContent = GameState.score;
  
  scoreElement.style.transform = 'scale(1.2)';
  scoreElement.style.color = '#FFD700';
  playSound('score-increase');
  
  setGameTimeout(() => {
    scoreElement.style.transform = 'scale(1)';
    scoreElement.style.color = '#FFFFFF';
  }, 300);
}

function advanceToNextQuestion() {
  hideFeedback();
  animateBunnyHop();
  setGameTimeout(() => { loadQuestion(GameState.currentQuestion + 1); }, 600);
}

function endGame() {
  GameState.gameEnded = true;
  const endingTier = determineEnding(GameState.score);
  displayEnding(endingTier);
}

function determineEnding(score) {
  const maxScore = TOTAL_QUESTIONS;
  const percentage = (score / maxScore) * 100;
  
  if (percentage === 100) {
    return 'perfect';
  } else if (percentage >= 80) {
    return 'excellent';
  } else if (percentage >= 60) {
    return 'good';
  } else if (percentage >= 40) {
    return 'okay';
  } else {
    return 'tryagain';
  }
}

function displayEnding(tier) {
  const score = GameState.score;
  const endings = {
    perfect: {
      title: '完美無瑕！',
      message: '恭喜！你答對了所有 11 題！',
      encouragement: '你對 MM 的了解令人印象深刻。作為獎勵，和 MM 一起持續成長吧！',
      icon: '🏆',
      sound: 'victory-gold'
    },
    excellent: {
      title: '表現優異！',
      message: `太棒了！你答對了 ${score} 題！你對 MM 非常了解！`,
      encouragement: '你的知識令人欽佩！和 MM 一起持續成長吧！',
      icon: '⭐',
      sound: 'victory-silver'
    },
    good: {
      title: '做得不錯！',
      message: `很好！你答對了 ${score} 題！你已經掌握了 MM 的基礎！`,
      encouragement: '繼續學習，你會越來越厲害！和 MM 一起持續成長吧！',
      icon: '👍',
      sound: 'victory-bronze'
    },
    okay: {
      title: '還不錯！',
      message: `你答對了 ${score} 題！還有進步空間！`,
      encouragement: '別擔心，每個人都是從學習開始的！和 MM 一起持續成長吧！',
      icon: '💪',
      sound: 'victory-bronze'
    },
    tryagain: {
      title: '繼續加油！',
      message: `你答對了 ${score} 題。別灰心！`,
      encouragement: '沒關係！這是學習的過程。和 MM 一起持續成長吧！',
      icon: '🌱',
      sound: 'gameover'
    }
  };
  
  const ending = endings[tier];
  document.getElementById('ending-title').textContent = ending.title;
  document.getElementById('ending-description').textContent = ending.message + ' ' + ending.encouragement;
  document.getElementById('score-summary').textContent = `你答對了 ${score}/${GameState.totalQuestions} 題`;
  stopMusic('bgm');
  playSound(ending.sound);
  showScreen('ending');
}

function copyDiscountCode() {
  const code = document.getElementById('discount-code-text').textContent;
  navigator.clipboard.writeText(code).then(() => {
    const button = document.getElementById('copy-code-button');
    button.textContent = '已複製！';
    playSound('correct');
    
    setGameTimeout(() => {
      button.textContent = '複製';
    }, 2000);
  }).catch(() => {
    alert('無法複製，請手動複製：' + code);
  });
}

function restartGame() {
  clearAllTimeouts();
  
  GameState.currentQuestion = 0;
  GameState.score = 0;
  GameState.answeredQuestions = [];
  GameState.gameEnded = false;
  
  document.getElementById('story-text').textContent = '';
  document.getElementById('question-text').textContent = '';
  document.getElementById('answers-container').innerHTML = '';
  
  const scoreElement = document.getElementById('score-display');
  scoreElement.textContent = '0';
  scoreElement.style.transform = 'scale(1)';
  scoreElement.style.color = '#FFFFFF';
  
  hideFeedback();
  
  const bunnySprite = document.getElementById('bunny-sprite');
  bunnySprite.src = 'assets/images/bunny-idle.png';
  bunnySprite.className = 'character-sprite';
  
  const npcSprite = document.getElementById('npc-sprite');
  npcSprite.src = '';
  
  document.getElementById('npc-container').style.opacity = '0';
  
  if (window.typewriterTimeout) {
    clearTimeout(window.typewriterTimeout);
  }
  
  document.getElementById('current-question').textContent = '1';
  
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

