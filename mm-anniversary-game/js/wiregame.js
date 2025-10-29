const WireGame = {
  canvas: null,
  ctx: null,
  isActive: false,
  cursorX: 0,
  cursorY: 0,
  logoPath: [],
  hitboxRadius: 10,
  pathWidth: 5,
  tolerance: 10,
  gameStarted: false,
  gameCompleted: false,
  gameFailed: false,
  timer: 30,
  timerInterval: null,
  progress: 0
};

function initWireGame() {
  WireGame.canvas = document.getElementById('wire-game-canvas');
  WireGame.ctx = WireGame.canvas.getContext('2d');
  generateLogoPath();
  WireGame.canvas.addEventListener('mouseenter', startWireGame);
  WireGame.canvas.addEventListener('mousemove', updateWireGameCursor);
  WireGame.canvas.addEventListener('mouseleave', failWireGame);
  document.getElementById('wire-game-container').classList.remove('hidden');
  drawWireGame();
}

function generateLogoPath() {
  const cx = WireGame.canvas.width / 2;
  const cy = WireGame.canvas.height / 2;
  const size = 150;
  WireGame.logoPath = [
    {x: cx - size, y: cy + size/2},
    {x: cx - size, y: cy - size/2},
    {x: cx - size/2, y: cy},
    {x: cx - size/2, y: cy - size/2},
    {x: cx - size/2, y: cy + size/2},
    {x: cx + size/2, y: cy + size/2},
    {x: cx + size/2, y: cy - size/2},
    {x: cx + size, y: cy},
    {x: cx + size, y: cy - size/2},
    {x: cx + size, y: cy + size/2}
  ];
}

function startWireGame() {
  if (!WireGame.gameStarted && !WireGame.gameCompleted) {
    WireGame.gameStarted = true;
    WireGame.isActive = true;
    WireGame.timer = 30;
    document.getElementById('timer-value').textContent = WireGame.timer;
    WireGame.timerInterval = setInterval(() => {
      WireGame.timer--;
      document.getElementById('timer-value').textContent = WireGame.timer;
      if (WireGame.timer <= 0) { failWireGame(); }
    }, 1000);
  }
}

function updateWireGameCursor(e) {
  if (!WireGame.isActive) return;
  const rect = WireGame.canvas.getBoundingClientRect();
  WireGame.cursorX = e.clientX - rect.left;
  WireGame.cursorY = e.clientY - rect.top;

  const collision = checkPathCollision(WireGame.cursorX, WireGame.cursorY);
  if (collision) { failWireGame(); return; }

  updateProgress(WireGame.cursorX, WireGame.cursorY);
  if (WireGame.progress >= 100) { completeWireGame(); }
  drawWireGame();
}

function checkPathCollision(x, y) {
  for (let i = 0; i < WireGame.logoPath.length - 1; i++) {
    const p1 = WireGame.logoPath[i];
    const p2 = WireGame.logoPath[i + 1];
    const dist = distanceToLineSegment(x, y, p1.x, p1.y, p2.x, p2.y);
    if (dist < WireGame.pathWidth / 2 - WireGame.hitboxRadius) { return true; }
  }
  return false;
}

function distanceToLineSegment(px, py, x1, y1, x2, y2) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len2 = dx * dx + dy * dy;
  if (len2 === 0) return Math.hypot(px - x1, py - y1);
  let t = ((px - x1) * dx + (py - y1) * dy) / len2;
  t = Math.max(0, Math.min(1, t));
  const projX = x1 + t * dx;
  const projY = y1 + t * dy;
  return Math.hypot(px - projX, py - projY);
}

function updateProgress(x, y) {
  // Placeholder: simple progress based on x position across canvas
  WireGame.progress = Math.min(100, Math.max(0, ((x / WireGame.canvas.width) * 100)));
}

function drawWireGame() {
  const ctx = WireGame.ctx;
  ctx.clearRect(0, 0, WireGame.canvas.width, WireGame.canvas.height);
  ctx.fillStyle = '#1a1a1a';
  ctx.fillRect(0, 0, WireGame.canvas.width, WireGame.canvas.height);

  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = WireGame.pathWidth;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.beginPath();
  ctx.moveTo(WireGame.logoPath[0].x, WireGame.logoPath[0].y);
  for (let i = 1; i < WireGame.logoPath.length; i++) { ctx.lineTo(WireGame.logoPath[i].x, WireGame.logoPath[i].y); }
  ctx.stroke();

  if (WireGame.isActive && WireGame.gameStarted) {
    let minDist = Infinity;
    for (let i = 0; i < WireGame.logoPath.length - 1; i++) {
      const p1 = WireGame.logoPath[i];
      const p2 = WireGame.logoPath[i + 1];
      const dist = distanceToLineSegment(WireGame.cursorX, WireGame.cursorY, p1.x, p1.y, p2.x, p2.y);
      if (dist < minDist) minDist = dist;
    }
    ctx.strokeStyle = minDist < WireGame.tolerance ? '#ff0000' : '#00ff00';
    ctx.beginPath();
    ctx.arc(WireGame.cursorX, WireGame.cursorY, WireGame.hitboxRadius, 0, Math.PI * 2);
    ctx.stroke();
  }

  ctx.fillStyle = '#00ff00';
  ctx.fillRect(50, 50, (WireGame.canvas.width - 100) * (WireGame.progress / 100), 20);
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 2;
  ctx.strokeRect(50, 50, WireGame.canvas.width - 100, 20);
}

function completeWireGame() {
  WireGame.isActive = false;
  WireGame.gameCompleted = true;
  clearInterval(WireGame.timerInterval);
  playSound('correct');
  document.getElementById('wire-game-container').classList.add('hidden');
  setTimeout(() => { endGame(); }, 1500);
}

function failWireGame() {
  if (WireGame.gameFailed) return;
  WireGame.isActive = false;
  WireGame.gameFailed = true;
  clearInterval(WireGame.timerInterval);
  playSound('wrong');
  loseHeart();
  if (GameState.hearts <= 0) {
    setTimeout(() => { endGame(); }, 1200);
  } else {
    setTimeout(() => {
      WireGame.gameStarted = false;
      WireGame.gameFailed = false;
      WireGame.progress = 0;
      document.getElementById('timer-value').textContent = 30;
      drawWireGame();
    }, 800);
  }
}

