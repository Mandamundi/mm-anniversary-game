function initParallax() {
  const bgImage = document.getElementById('bg-image');
  const gameContainer = document.getElementById('game-container');

  function getCenterRect() {
    const rect = gameContainer.getBoundingClientRect();
    return { rect, centerX: rect.width / 2, centerY: rect.height / 2 };
  }

  gameContainer.addEventListener('mousemove', (e) => {
    const { rect, centerX, centerY } = getCenterRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const offsetX = mouseX - centerX;
    const offsetY = mouseY - centerY;
    const maxPanX = (bgImage.offsetWidth || 0) * 0.1;
    const maxPanY = (bgImage.offsetHeight || 0) * 0.1;
    const moveX = -(offsetX / centerX) * maxPanX * 0.5;
    const moveY = -(offsetY / centerY) * maxPanY * 0.5;
    bgImage.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.2)`;
  });

  gameContainer.addEventListener('mouseleave', () => {
    bgImage.style.transform = 'translate(0, 0) scale(1.2)';
  });
}

