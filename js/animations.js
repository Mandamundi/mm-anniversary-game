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
  const npcContainer = document.getElementById('npc-container');
  
  npcContainer.style.display = 'block';
  npcContainer.style.opacity = '0';
  
  setTimeout(() => {
    if (characterType === 'bear') {
      npcSprite.src = 'assets/images/bear-idle.png';
    } else if (characterType === 'bull') {
      npcSprite.src = 'assets/images/bull-idle.png';
    } else if (characterType === 'jason') {  // New: Add your sprite here
      npcSprite.src = 'assets/images/jason.png';  // Update path to your actual file
    } else {
      npcContainer.style.opacity = '0';  // Hide for unknown types
      return;
    }
    
    npcContainer.style.opacity = '1';
    
    if (window.innerWidth <= 768) {
      npcContainer.style.transform = 'translateZ(0)';
    }
  }, 300);
}

function initializeBunnyPosition() {
  const bunnyContainer = document.getElementById('bunny-container');
  bunnyContainer.style.display = 'block';
  bunnyContainer.style.opacity = '1';
  
  if (window.innerWidth <= 768) {
    bunnyContainer.style.transform = 'translateZ(0)';
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


