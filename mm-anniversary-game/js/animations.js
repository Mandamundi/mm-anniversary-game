function animateBunnyHop() {
  const bunnySprite = document.getElementById('bunny-sprite');
  playSound('hop');
  bunnySprite.classList.add('hopping');
  setTimeout(() => { bunnySprite.classList.remove('hopping'); }, 500);
}

function showBunnySad() {
  const bunnySprite = document.getElementById('bunny-sprite');
  const originalSrc = bunnySprite.src;
  bunnySprite.src = 'assets/images/bunny-sad.png';
  setTimeout(() => { bunnySprite.src = originalSrc; }, 1000);
}

function loadNPCSprite(characterType) {
  const npcSprite = document.getElementById('npc-sprite');
  if (characterType === 'bear') {
    npcSprite.src = 'assets/images/bear-idle.png';
    npcSprite.style.opacity = '1';
  } else if (characterType === 'bull') {
    npcSprite.src = 'assets/images/bull-idle.png';
    npcSprite.style.opacity = '1';
  } else {
    npcSprite.style.opacity = '0';
  }
}

function showFeedback(type) {
  const correctIcon = document.getElementById('correct-icon');
  const wrongIcon = document.getElementById('wrong-icon');
  if (type === 'correct') {
    correctIcon.classList.add('show');
    setTimeout(() => { correctIcon.classList.remove('show'); }, 1500);
  } else if (type === 'wrong') {
    wrongIcon.classList.add('show');
    setTimeout(() => { wrongIcon.classList.remove('show'); }, 2000);
  }
}

function hideFeedback() {
  document.getElementById('correct-icon').classList.remove('show');
  document.getElementById('wrong-icon').classList.remove('show');
}

function animateHeartLoss(heartElement) {
  if (!heartElement) return;
  heartElement.style.animation = 'shake 0.3s ease-in-out';
  setTimeout(() => {
    heartElement.style.opacity = '0';
    heartElement.src = 'assets/images/heart-empty.png';
  }, 300);
}

