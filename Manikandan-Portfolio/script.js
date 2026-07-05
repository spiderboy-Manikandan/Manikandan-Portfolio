// 1. Structural Interaction Framework
function toggleProj(id, btn) {
  const panel = document.getElementById(id);
  const isOpen = panel.classList.toggle('open');
  btn.innerHTML = isOpen
    ? '<i class="fas fa-eye-slash"></i> Hide Details'
    : '<i class="fas fa-eye"></i> View Details';
}

// 2. Typing Animation Core Engine
const scriptLines = [
  'Software Developer',
  'Full Stack Developer',
  'Python Developer',
  'Drawing & UI/UX Designer',
  'IoT Engineer',
  'AI Engineer',
  'Diploma CSE Student'
];
let currentLineIdx = 0, charIdx = 0, isDeleting = false;
const typingContainer = document.getElementById('typing');

function executeTypingCycle() {
  if (!typingContainer) return;
  const currentText = scriptLines[currentLineIdx];

  if (isDeleting) {
    typingContainer.textContent = currentText.substring(0, charIdx--);
  } else {
    typingContainer.textContent = currentText.substring(0, charIdx++);
  }

  if (!isDeleting && charIdx > currentText.length) {
    isDeleting = true;
    setTimeout(executeTypingCycle, 1500);
    return;
  }

  if (isDeleting && charIdx < 0) {
    isDeleting = false;
    charIdx = 0;
    currentLineIdx = (currentLineIdx + 1) % scriptLines.length;
    setTimeout(executeTypingCycle, 400);
    return;
  }

  setTimeout(executeTypingCycle, isDeleting ? 40 : 80);
}
executeTypingCycle();

// 3. Floating Particle Network Background Engine
(() => {
  const canvas = document.getElementById('bgCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  const PARTICLE_COUNT = Math.min(90, Math.floor((width * height) / 12000));
  const CONNECTION_DIST = 160;
  const MOUSE_REPEL_DIST = 120;

  let mouse = { x: width / 2, y: height / 2 };
  window.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });

  // Colour palette: pink, cyan, orange, purple
  const darkPalette  = ['rgba(255,42,135,', 'rgba(0,229,255,', 'rgba(255,145,0,', 'rgba(160,100,255,'];
  const lightPalette = ['rgba(124,58,237,', 'rgba(13,148,136,', 'rgba(249,115,22,', 'rgba(99,102,241,'];

  function makeParticle() {
    return {
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.55,
      vy: (Math.random() - 0.5) * 0.55,
      r: Math.random() * 2.4 + 1.2,
      pulse: Math.random() * Math.PI * 2,
      colorIdx: Math.floor(Math.random() * 4),
      glowPhase: Math.random() * Math.PI * 2
    };
  }

  let particles = Array.from({ length: PARTICLE_COUNT }, makeParticle);

  function renderLoop() {
    const isLight = document.body.classList.contains('light-mode');
    const palette = isLight ? lightPalette : darkPalette;

    ctx.clearRect(0, 0, width, height);

    // Draw connections
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < CONNECTION_DIST) {
          const alpha = (1 - dist / CONNECTION_DIST) * (isLight ? 0.22 : 0.30);
          const col = palette[particles[i].colorIdx];
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = col + alpha + ')';
          ctx.lineWidth = (1 - dist / CONNECTION_DIST) * 1.2;
          ctx.stroke();
        }
      }
    }

    // Draw + update particles
    particles.forEach(p => {
      p.pulse += 0.018;
      p.glowPhase += 0.012;
      const pulseR = p.r + Math.sin(p.pulse) * 0.9;
      const glowAlpha = 0.55 + Math.sin(p.glowPhase) * 0.35;
      const col = palette[p.colorIdx];

      // Glow halo
      const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, pulseR * 5);
      grad.addColorStop(0, col + glowAlpha + ')');
      grad.addColorStop(1, col + '0)');
      ctx.beginPath();
      ctx.arc(p.x, p.y, pulseR * 5, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();

      // Core dot
      ctx.beginPath();
      ctx.arc(p.x, p.y, pulseR, 0, Math.PI * 2);
      ctx.fillStyle = col + (isLight ? '0.7' : '0.95') + ')';
      ctx.fill();

      // Mouse repulsion
      const mdx = p.x - mouse.x;
      const mdy = p.y - mouse.y;
      const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
      if (mdist < MOUSE_REPEL_DIST && mdist > 0) {
        const force = (MOUSE_REPEL_DIST - mdist) / MOUSE_REPEL_DIST * 0.6;
        p.vx += (mdx / mdist) * force;
        p.vy += (mdy / mdist) * force;
      }

      // Speed cap + drift damping
      const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
      const maxSpeed = 1.8;
      if (speed > maxSpeed) { p.vx *= maxSpeed / speed; p.vy *= maxSpeed / speed; }
      p.vx *= 0.996;
      p.vy *= 0.996;

      p.x += p.vx;
      p.y += p.vy;

      // Bounce off edges
      if (p.x < 0) { p.x = 0; p.vx = Math.abs(p.vx); }
      if (p.x > width)  { p.x = width;  p.vx = -Math.abs(p.vx); }
      if (p.y < 0) { p.y = 0; p.vy = Math.abs(p.vy); }
      if (p.y > height) { p.y = height; p.vy = -Math.abs(p.vy); }
    });

    requestAnimationFrame(renderLoop);
  }

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    // Add extra particles if viewport grew
    const target = Math.min(90, Math.floor((width * height) / 12000));
    while (particles.length < target) particles.push(makeParticle());
  });

  renderLoop();
})();

// 4. Interactive Touch Burst Animation Handler
window.addEventListener('click', (e) => {
  if (e.target.tagName === 'BUTTON' || e.target.tagName === 'A' || e.target.closest('form') || e.target.closest('.ttt-cell') || e.target.closest('.puzzle-card-small')) return;
  for (let i = 0; i < 8; i++) {
    const burst = document.createElement('div');
    burst.className = 'touch-burst';
    burst.style.left = `${e.clientX}px`;
    burst.style.top = `${e.clientY}px`;
    burst.style.width = burst.style.height = `${Math.random() * 6 + 4}px`;
    burst.style.background = Math.random() > 0.5 ? 'var(--cyan)' : 'var(--pink)';

    document.body.appendChild(burst);

    const angle = Math.random() * Math.PI * 2;
    const velocity = Math.random() * 55 + 25;

    setTimeout(() => {
      burst.style.transform = `translate(${Math.cos(angle) * velocity}px, ${Math.sin(angle) * velocity}px) scale(0)`;
      burst.style.opacity = '0';
    }, 10);
    setTimeout(() => burst.remove(), 610);
  }
});

// 5. Confetti Celebration Trigger Engine (Canvas Confetti Fall)
let confettiActive = false;
const confettiCanvas = document.getElementById('confettiCanvas');

function triggerConfettiCelebration() {
  if (!confettiCanvas) return;
  const ctx = confettiCanvas.getContext('2d');
  confettiCanvas.style.display = 'block';
  let width = confettiCanvas.width = window.innerWidth;
  let height = confettiCanvas.height = window.innerHeight;

  const colors = ['#ff9100', '#7c3aed', '#ff2a85', '#00ffb3', '#00e5ff'];
  const particles = [];

  for (let i = 0; i < 150; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * -height - 20,
      r: Math.random() * 6 + 4,
      d: Math.random() * height,
      color: colors[Math.floor(Math.random() * colors.length)],
      tilt: Math.random() * 10 - 5,
      tiltAngleIncremental: Math.random() * 0.07 + 0.02,
      tiltAngle: 0,
      speed: Math.random() * 3 + 4
    });
  }

  confettiActive = true;
  let frames = 0;

  function drawConfetti() {
    if (!confettiActive) return;
    ctx.clearRect(0, 0, width, height);

    let activeParticles = 0;
    particles.forEach(p => {
      p.tiltAngle += p.tiltAngleIncremental;
      p.y += p.speed;
      p.tilt = Math.sin(p.tiltAngle - p.r / 2) * 5;

      if (p.y < height) activeParticles++;

      ctx.beginPath();
      ctx.lineWidth = p.r;
      ctx.strokeStyle = p.color;
      ctx.moveTo(p.x + p.tilt + p.r / 2, p.y);
      ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r / 2);
      ctx.stroke();
    });

    frames++;
    if (activeParticles > 0 && frames < 350) {
      requestAnimationFrame(drawConfetti);
    } else {
      confettiActive = false;
      confettiCanvas.style.display = 'none';
      ctx.clearRect(0, 0, width, height);
    }
  }

  drawConfetti();
}

// 6. Smooth Structural Viewport Scroll Revealer (Animating dynamically both directions)
const revealItems = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .animated-tl-item');
const elementObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    } else {
      entry.target.classList.remove('visible');
    }
  });
}, { threshold: 0.05, rootMargin: '0px 0px -20px 0px' });

revealItems.forEach(item => elementObserver.observe(item));

// 7. Scroll State Tracking & Background Shift & Colors Progress Sync
const sectionColors = {
  'home': 'theme-home',
  'about': 'theme-about',
  'education': 'theme-education',
  'study-journey': 'theme-education',
  'puzzle-game': 'theme-game',
  'projects': 'theme-projects',
  'certificates': 'theme-skills',
  'skills': 'theme-skills',
  'contact': 'theme-contact'
};

function updateScrollThemeState() {
  const scrollTopButton = document.getElementById('scrollTop');
  if (scrollTopButton) {
    if (window.scrollY > 400) scrollTopButton.classList.add('show');
    else scrollTopButton.classList.remove('show');
  }

  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  let currentActiveId = 'home';

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 180;
    if (window.scrollY >= sectionTop) {
      currentActiveId = section.getAttribute('id') || 'home';
    }
  });

  navLinks.forEach(link => {
    const targetId = link.getAttribute('href')?.replace('#', '');
    link.classList.toggle('active', targetId === currentActiveId);
  });

  Object.values(sectionColors).forEach(themeClass => {
    document.body.classList.remove(themeClass);
  });

  if (sectionColors[currentActiveId]) {
    document.body.classList.add(sectionColors[currentActiveId]);
  }

  const scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
  const progressBar = document.getElementById('scrollBar');
  if (progressBar && scrollTotal > 0) {
    progressBar.style.width = `${(window.scrollY / scrollTotal) * 100}%`;
  }
}

window.addEventListener('scroll', updateScrollThemeState);
window.addEventListener('load', updateScrollThemeState);
window.addEventListener('resize', updateScrollThemeState);

// 8. Contact Form Submission – powered by FormSubmit (delivers to compmanikandanb23@gmail.com)
const hireForm = document.getElementById('hireForm');
if (hireForm) {
  hireForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const statusNotifier = document.getElementById('formStatus');
    const submitBtn = hireForm.querySelector('button[type="submit"]');
    statusNotifier.style.color = 'var(--cyan)';
    statusNotifier.textContent = '⏳ Transmitting Data Packets...';
    if (submitBtn) submitBtn.disabled = true;

    const formSubmitUrl = hireForm.action; // https://formsubmit.co/ajax/compmanikandanb23@gmail.com
    const userName = document.getElementById('name').value.trim();
    const userEmail = document.getElementById('email').value.trim();
    const userMessage = document.getElementById('message').value.trim();

    try {
      const submissionPayload = new FormData(hireForm);

      const response = await fetch(formSubmitUrl, {
        method: 'POST',
        body: submissionPayload,
        headers: { 'Accept': 'application/json' }
      });

      // FormSubmit returns plain text or JSON depending on plan
      const rawText = await response.text();
      let responseData = {};
      try { responseData = JSON.parse(rawText); } catch (_) { responseData = { success: response.ok ? 'true' : 'false' }; }

      console.log('FormSubmit response', response.status, responseData);

      // FormSubmit success: { success: "true" } — note string not boolean
      const replyMsg = (responseData.message || '').toLowerCase();
      const needsActivation = replyMsg.includes('activat') || replyMsg.includes('confirm');

      if (needsActivation) {
        // FormSubmit sends a ONE-TIME activation link to the destination inbox
        // the very first time a form is submitted from a new page. Until that
        // link is clicked, FormSubmit silently discards every submission —
        // which is why messages "succeed" here but never arrive in Gmail.
        statusNotifier.style.color = 'var(--cyan)';
        statusNotifier.innerHTML = `📩 Almost there! FormSubmit sent a one-time <strong>activation email</strong> to compmanikandanb23@gmail.com — open it and click "Activate Form" once, then future messages will land in the inbox automatically.`;
      } else if (response.ok && (responseData.success === 'true' || responseData.success === true)) {
        statusNotifier.style.color = 'var(--green)';
        statusNotifier.innerHTML = `✅ Message sent! Manikandan will reply to <strong>${userEmail}</strong> soon. Check your spam folder if needed.`;
        triggerConfettiCelebration();
        hireForm.reset();
        setTimeout(() => { statusNotifier.textContent = ''; }, 10000);
      } else {
        const errMsg = responseData.message || responseData.error || `HTTP ${response.status}`;
        throw new Error(errMsg);
      }
    } catch (err) {
      console.error('Form submission error:', err);
      statusNotifier.style.color = 'var(--pink)';
      statusNotifier.innerHTML = `❌ Could not send — please try the direct options below:<br>
        <a href="mailto:compmanikandanb23@gmail.com?subject=Hiring%20Query%20from%20${encodeURIComponent(userName)}&body=Hello%20Manikandan%2C%0A%0A${encodeURIComponent(userMessage)}" style="color:var(--cyan); text-decoration:underline; font-weight:bold;">📧 compmanikandanb23@gmail.com</a>
        &nbsp;|&nbsp;
        <a href="https://wa.me/917094964875" target="_blank" rel="noreferrer" style="color:var(--green); text-decoration:underline; font-weight:bold;">💬 WhatsApp</a>`;
    } finally {
      if (submitBtn) submitBtn.disabled = false;
    }
  });
}

// 9. Theme Switcher System
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const savedTheme = localStorage.getItem('theme') || 'dark';
body.classList.toggle('light-mode', savedTheme === 'light');

if (themeToggle) {
  themeToggle.innerHTML = savedTheme === 'light' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
  themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-mode');
    const isLight = body.classList.contains('light-mode');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
    themeToggle.innerHTML = isLight ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
  });
}

// 10. Skills Filter Tabs Switcher
function switchSkillTab(tabId, btn) {
  const buttons = document.querySelectorAll('.skills-tab-btn');
  buttons.forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  const grids = document.querySelectorAll('.skill-grid-wrap');
  grids.forEach(g => g.classList.remove('active'));

  const targetGrid = document.getElementById(`skills-${tabId}`);
  if (targetGrid) {
    targetGrid.classList.add('active');
  }
}

// 11. Project Carousels Navigation
const carouselPositions = {};
const carouselIntervals = {};

function slideCarousel(containerId, direction) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const slider = container.querySelector('.carousel-slider-3d');
  const slides = container.querySelectorAll('.carousel-slide-3d');
  const dots = container.querySelectorAll('.carousel-dot-3d');
  const slideCount = slides.length;

  if (!(containerId in carouselPositions)) {
    carouselPositions[containerId] = 0;
  }

  let currentIdx = carouselPositions[containerId];
  currentIdx = (currentIdx + direction + slideCount) % slideCount;
  carouselPositions[containerId] = currentIdx;

  slider.style.transform = `translateX(-${currentIdx * 100}%)`;

  dots.forEach((dot, idx) => {
    dot.classList.toggle('active', idx === currentIdx);
  });
}

function startCarouselAutoPlay(containerId) {
  if (carouselIntervals[containerId]) clearInterval(carouselIntervals[containerId]);
  carouselIntervals[containerId] = setInterval(() => slideCarousel(containerId, 1), 4200);
}

function setCarouselSlide(containerId, index) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const slider = container.querySelector('.carousel-slider-3d');
  const dots = container.querySelectorAll('.carousel-dot-3d');

  carouselPositions[containerId] = index;
  slider.style.transform = `translateX(-${index * 100}%)`;

  dots.forEach((dot, idx) => {
    dot.classList.toggle('active', idx === index);
  });
}

 document.querySelectorAll('.carousel-container-3d').forEach((container) => {
   const containerId = container.id;
   startCarouselAutoPlay(containerId);
   container.addEventListener('mouseenter', () => clearInterval(carouselIntervals[containerId]));
   container.addEventListener('mouseleave', () => startCarouselAutoPlay(containerId));
 });

// 12. Games Suite Logic

// A. Memory Match Logic
const puzzleBoard = document.getElementById('puzzleBoard');
const gameScoreEl = document.getElementById('gameScore');
const gameMovesEl = document.getElementById('gameMoves');
const resetPuzzleBtn = document.getElementById('resetPuzzleBtn');
const gameMessageEl = document.getElementById('gameMessage');

let memoryCards = ['🚌', '📡', '🍱', '💻', '🚌', '📡', '🍱', '💻'];
let flippedCards = [];
let matchedCount = 0;
let score = 0;
let moves = 0;
let canFlip = true;

if (puzzleBoard) {
  resetPuzzleBtn.addEventListener('click', initMemoryGame);
  initMemoryGame();
}

function initMemoryGame() {
  puzzleBoard.innerHTML = '';
  flippedCards = [];
  matchedCount = 0;
  score = 0;
  moves = 0;
  canFlip = true;
  gameScoreEl.textContent = '0';
  gameMovesEl.textContent = '0';
  gameMessageEl.textContent = '';

  memoryCards.sort(() => Math.random() - 0.5);

  memoryCards.forEach((emoji, idx) => {
    const card = document.createElement('div');
    card.className = 'puzzle-card-small';
    card.setAttribute('data-emoji', emoji);
    card.setAttribute('data-index', idx);
    card.innerHTML = `<span style="display:none; font-size:24px;">${emoji}</span>`;
    card.addEventListener('click', () => handleMemoryFlip(card));
    puzzleBoard.appendChild(card);
  });
}

function handleMemoryFlip(card) {
  if (!canFlip || card.classList.contains('flipped') || card.classList.contains('matched')) return;

  card.classList.add('flipped');
  card.querySelector('span').style.display = 'block';
  flippedCards.push(card);

  if (flippedCards.length === 2) {
    moves++;
    gameMovesEl.textContent = moves;
    canFlip = false;

    const [card1, card2] = flippedCards;
    if (card1.getAttribute('data-emoji') === card2.getAttribute('data-emoji')) {
      card1.classList.add('matched');
      card2.classList.add('matched');
      matchedCount += 2;
      score += 10;
      gameScoreEl.textContent = score;
      flippedCards = [];
      canFlip = true;

      if (matchedCount === memoryCards.length) {
        gameMessageEl.textContent = '🎉 All Matched! Awesome!';
        triggerConfettiCelebration();
      }
    } else {
      setTimeout(() => {
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
        card1.querySelector('span').style.display = 'none';
        card2.querySelector('span').style.display = 'none';
        flippedCards = [];
        canFlip = true;
      }, 900);
    }
  }
}

// B. Guess the Number Logic
const guessInput = document.getElementById('guessInput');
const guessBtn = document.getElementById('guessBtn');
const guessHint = document.getElementById('guessHint');
const guessAttemptsEl = document.getElementById('guessAttempts');
const guessBestEl = document.getElementById('guessBest');
const resetGuessBtn = document.getElementById('resetGuessBtn');

let targetNumber;
let attempts = 0;
let bestScore = localStorage.getItem('guessBest') || Infinity;

if (guessBestEl) {
  guessBestEl.textContent = bestScore === Infinity ? '∞' : bestScore;
  initGuessGame();

  guessBtn.addEventListener('click', checkGuess);
  resetGuessBtn.addEventListener('click', initGuessGame);
}

function initGuessGame() {
  targetNumber = Math.floor(Math.random() * 100) + 1;
  attempts = 0;
  guessAttemptsEl.textContent = '0';
  guessHint.textContent = 'Guess a number between 1 and 100';
  guessHint.style.color = 'var(--muted)';
  guessInput.value = '';
}

function checkGuess() {
  const guess = parseInt(guessInput.value);
  if (isNaN(guess) || guess < 1 || guess > 100) {
    guessHint.textContent = '⚠️ Enter a valid number between 1 and 100';
    return;
  }

  attempts++;
  guessAttemptsEl.textContent = attempts;

  if (guess === targetNumber) {
    guessHint.textContent = `🎉 Correct! The number was ${targetNumber}!`;
    guessHint.style.color = 'var(--green)';
    triggerConfettiCelebration();

    if (attempts < bestScore) {
      bestScore = attempts;
      localStorage.setItem('guessBest', bestScore);
      guessBestEl.textContent = bestScore;
    }
  } else if (guess > targetNumber) {
    guessHint.textContent = '📉 Too High! Try lower.';
    guessHint.style.color = 'var(--pink)';
  } else {
    guessHint.textContent = '📈 Too Low! Try higher.';
    guessHint.style.color = 'var(--cyan)';
  }
}

// C. Tic-Tac-Toe vs AI (Minimax)
const tttBoard = document.getElementById('tttBoard');
const tttStatus = document.getElementById('tttStatus');
const resetTttBtn = document.getElementById('resetTttBtn');
let tttState = Array(9).fill('');
let tttActive = true;

if (tttBoard) {
  const cells = tttBoard.querySelectorAll('.ttt-cell');

  cells.forEach(cell => {
    cell.addEventListener('click', () => {
      const idx = parseInt(cell.getAttribute('data-index'));
      if (tttState[idx] !== '' || !tttActive) return;

      makeTttMove(idx, 'X');

      if (checkTttWin(tttState, 'X')) {
        tttStatus.textContent = '🎉 You won! (Amazing)';
        tttActive = false;
        triggerConfettiCelebration();
        return;
      }

      if (tttState.every(c => c !== '')) {
        tttStatus.textContent = '🤝 It\'s a draw!';
        tttActive = false;
        return;
      }

      tttStatus.textContent = '🤖 AI calculations...';
      tttActive = false;

      setTimeout(() => {
        const bestMove = getBestTttMove(tttState);
        makeTttMove(bestMove, 'O');

        if (checkTttWin(tttState, 'O')) {
          tttStatus.textContent = '💀 AI won!';
          tttActive = false;
        } else if (tttState.every(c => c !== '')) {
          tttStatus.textContent = '🤝 It\'s a draw!';
          tttActive = false;
        } else {
          tttStatus.textContent = 'Your turn (X)';
          tttActive = true;
        }
      }, 400);
    });
  });

  resetTttBtn.addEventListener('click', resetTtt);
}

function makeTttMove(idx, player) {
  tttState[idx] = player;
  const cell = tttBoard.querySelector(`[data-index="${idx}"]`);
  cell.textContent = player;
  cell.classList.add(player === 'X' ? 'x-mark' : 'o-mark');
}

function resetTtt() {
  tttState = Array(9).fill('');
  tttActive = true;
  tttStatus.textContent = 'Your turn (X)';
  const cells = tttBoard.querySelectorAll('.ttt-cell');
  cells.forEach(cell => {
    cell.textContent = '';
    cell.className = 'ttt-cell';
  });
}

function checkTttWin(board, player) {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];
  return winPatterns.some(pattern => pattern.every(idx => board[idx] === player));
}

function minimax(board, depth, isMaximizing) {
  if (checkTttWin(board, 'O')) return 10 - depth;
  if (checkTttWin(board, 'X')) return depth - 10;
  if (board.every(c => c !== '')) return 0;

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < 9; i++) {
      if (board[i] === '') {
        board[i] = 'O';
        let score = minimax(board, depth + 1, false);
        board[i] = '';
        bestScore = Math.max(score, bestScore);
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < 9; i++) {
      if (board[i] === '') {
        board[i] = 'X';
        let score = minimax(board, depth + 1, true);
        board[i] = '';
        bestScore = Math.min(score, bestScore);
      }
    }
    return bestScore;
  }
}

function getBestTttMove(board) {
  let bestScore = -Infinity;
  let move = -1;
  for (let i = 0; i < 9; i++) {
    if (board[i] === '') {
      board[i] = 'O';
      let score = minimax(board, 0, false);
      board[i] = '';
      if (score > bestScore) {
        bestScore = score;
        move = i;
      }
    }
  }
  return move;
}

// 13. Floating Chatbot widget Q&A
(() => {
  const widget = document.getElementById('aiChatWidget');
  if (!widget) return;
  const chatBody = document.getElementById('chatBody');
  const chatMessages = document.getElementById('chatMessages');
  const chatInput = document.getElementById('chatInput');
  const chatSendBtn = document.getElementById('chatSendBtn');
  const chatToggle = document.getElementById('chatToggle');
  const chatHeader = document.getElementById('chatHeader');
  const chatCloseBtn = document.getElementById('chatCloseBtn');
  let isOpen = false;

  if (!chatToggle || !chatCloseBtn || !chatBody || !chatMessages || !chatInput || !chatSendBtn) return;

  // Expanded knowledge base: each entry has trigger keywords + an answer.
  // The matcher below scores every entry by how many keywords/phrases hit,
  // so questions phrased in many different ways still get a correct answer.
  const knowledgeBase = [
    { keys: ['skill', 'stack', 'technolog', 'language', 'programming', 'know', 'proficient'],
      answer: 'Manikandan is skilled in HTML5, CSS3, JavaScript, PHP, Python, Java, C, MySQL, Bootstrap, GitHub, Machine Learning basics, Arduino IoT, Cisco networking, and computer hardware/networks.' },
    { keys: ['project', 'built', 'built', 'made', 'work on', 'portfolio project'],
      answer: 'He has built: <br>1. Online Bus Ticket Reservation (PHP/MySQL)<br>2. RFID Lab Attendance System (Python/Sheets API)<br>3. Food Redistribution System (Social Impact)<br>4. This Portfolio Website with 3D animation and games.' },
    { keys: ['education', 'study', 'college', 'school', 'cgpa', 'sslc', 'diploma', 'qualification', 'degree'],
      answer: 'He is pursuing a Diploma in Computer Science & Engineering (DCSE) at Tamil Nadu Government Polytechnic College, Madurai — current CGPA 9.4/10. His SSLC (10th) mark was 77%.' },
    { keys: ['contact', 'reach', 'email address', 'phone number', 'call him', 'whatsapp'],
      answer: 'You can email compmanikandanb23@gmail.com, call/WhatsApp +91 7094964875, or use the Contact form at the bottom of this page.' },
    { keys: ['resume', 'cv', 'download resume'],
      answer: 'Click the "View Resume" button in the Home section to preview or download his full resume as a PDF.' },
    { keys: ['hello', 'hey', 'good morning', 'good evening'],
      answer: 'Hello! I\'m Mani\'s AI assistant. Ask me about his education, skills, projects, certificates, games, or how to contact him.' },
    { keys: ['hi'],
      answer: 'Hi! How can I help you learn more about Manikandan B today?' },
    { keys: ['help', 'what can you do', 'commands'],
      answer: 'Try asking things like "What are his skills?", "Where does he study?", "What projects has he built?", "Show me certificates", "How do I contact him?", or "What games are on this site?"' },
    { keys: ['hire', 'hiring', 'job', 'internship', 'available for work', 'opportunit'],
      answer: 'He\'s open to internships and junior developer roles! Send a message via the Contact section — he is eager to learn fast and contribute to real-world software.' },
    { keys: ['cisco', 'network', 'lan', 'wan', 'routing'],
      answer: 'He has hands-on Cisco networking experience — routing, switching, LAN/WAN setup, and network security fundamentals.' },
    { keys: ['arduino', 'iot', 'rfid', 'sensor', 'hardware project'],
      answer: 'Mani has hands-on IoT experience with Arduino — for example, an RFID Lab Attendance System that syncs hardware scanner data straight into Google Sheets.' },
    { keys: ['game', 'play', 'puzzle', 'guess the number', 'tic tac toe', 'memory match', 'rock paper', 'typing test'],
      answer: 'This portfolio has a full arcade in the "Play & Explore" section: Memory Match, Guess the Number, Tic-Tac-Toe vs AI, Rock-Paper-Scissors vs Computer, and a Typing Speed Test!' },
    { keys: ['certificate', 'certification', 'credential', 'course completed'],
      answer: 'Head to the Certificates section to view his college & school mark sheets plus training certificates in HTML, CSS, Python, networking, and more — each can be opened or downloaded.' },
    { keys: ['mark sheet', 'marksheet', 'grade', 'percentage'],
      answer: 'His college mark sheet (Diploma, CGPA 9.4) and school 10th mark sheet (77%) are both viewable/downloadable in the Certificates section.' },
    { keys: ['location', 'where does he live', 'address', 'city', 'based'],
      answer: 'Manikandan is based in Madurai, Tamil Nadu, India.' },
    { keys: ['age', 'how old'],
      answer: 'I don\'t have his exact age on record — feel free to ask him directly via the Contact section!' },
    { keys: ['dark mode', 'light mode', 'theme'],
      answer: 'You can switch between dark and light themes anytime using the moon/sun icon button in the top navigation bar.' },
    { keys: ['name', 'who are you', 'who is manikandan'],
      answer: 'This is the portfolio of Manikandan B, a Diploma CSE student and aspiring software developer from Madurai, Tamil Nadu.' },
    { keys: ['ai tool', 'chatgpt', 'gemini', 'claude', 'copilot', 'deepseek'],
      answer: 'He actively works with AI tools like ChatGPT, Gemini, DeepSeek, GitHub Copilot, and Claude to speed up learning and development.' },
    { keys: ['thank', 'thanks', 'thank you'],
      answer: 'You\'re welcome! Let me know if you\'d like to know anything else about Manikandan\'s work. 🙂' },
    { keys: ['bye', 'goodbye', 'see you'],
      answer: 'Goodbye! Feel free to reach out anytime via the Contact section. 👋' }
  ];

  const defaultReply = 'I\'m not totally sure about that one — try asking about his skills, education, projects, certificates, games, or contact info!';

  function getBotReply(userMsg) {
    const msg = userMsg.toLowerCase().trim();
    if (msg.length === 0) return 'Please type a question!';

    // Score every knowledge entry by how many of its keywords appear in the
    // message (longer/more specific keyword phrases count more), then return
    // the best match. This handles rephrased or multi-part questions much
    // better than a simple "first keyword found" lookup.
    let bestEntry = null;
    let bestScore = 0;

    knowledgeBase.forEach(entry => {
      let score = 0;
      entry.keys.forEach(key => {
        if (msg.includes(key)) score += key.length; // longer phrase = stronger signal
      });
      if (score > bestScore) {
        bestScore = score;
        bestEntry = entry;
      }
    });

    return bestEntry ? bestEntry.answer : defaultReply;
  }

  function addMessage(text, sender) {
    const div = document.createElement('div');
    div.className = `msg ${sender}`;
    div.innerHTML = `<span>${text}</span>`;
    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function showTypingIndicator() {
    const typing = document.createElement('div');
    typing.className = 'msg bot typing-indicator-msg';
    typing.innerHTML = '<span><span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span></span>';
    chatMessages.appendChild(typing);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    return typing;
  }

  function handleSend() {
    const text = chatInput.value.trim();
    if (!text) return;
    addMessage(text, 'user');
    chatInput.value = '';
    chatSendBtn.disabled = true;
    const typingBubble = showTypingIndicator();
    const reply = getBotReply(text);
    setTimeout(() => {
      typingBubble.remove();
      addMessage(reply, 'bot');
      chatSendBtn.disabled = false;
      chatInput.focus();
    }, 700);
  }

  chatSendBtn.addEventListener('click', handleSend);
  chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSend();
  });

  // Quick-reply suggestion chips
  const chatChips = document.querySelectorAll('.chat-chip');
  chatChips.forEach(chip => {
    chip.addEventListener('click', () => {
      chatInput.value = chip.getAttribute('data-q') || chip.textContent;
      handleSend();
    });
  });

  function setChatOpen(open) {
    isOpen = open;
    widget.classList.toggle('open', isOpen);
    chatBody.style.display = isOpen ? 'flex' : 'none';
    chatToggle.style.display = isOpen ? 'none' : 'flex';
    chatCloseBtn.innerHTML = '<i class="fas fa-times"></i>';
    chatCloseBtn.setAttribute('aria-label', isOpen ? 'Close AI assistant' : 'Open AI assistant');

    if (isOpen) {
      setTimeout(() => chatInput.focus(), 100);
    }
  }

  chatToggle.addEventListener('click', () => {
    setChatOpen(true);
    if (!chatMessages.querySelector('.msg.bot')) {
      addMessage('Hello! I can help you explore his projects, education, certificates, and contact details.', 'bot');
    }
  });

  setChatOpen(false);

  if (chatHeader) {
    chatHeader.addEventListener('dblclick', () => setChatOpen(false));
  }
  chatCloseBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    setChatOpen(false);
  });

  let isDragging = false, startX, startY, origX, origY;
  widget.addEventListener('mousedown', (e) => {
    if (e.target.closest('.chat-body') || e.target.closest('.chat-toggle-btn')) return;
    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;
    origX = widget.offsetLeft || 0;
    origY = widget.offsetTop || 0;
    widget.style.cursor = 'grabbing';
  });
  document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    widget.style.left = (origX + dx) + 'px';
    widget.style.top = (origY + dy) + 'px';
    widget.style.bottom = 'auto';
    widget.style.right = 'auto';
  });
  document.addEventListener('mouseup', () => {
    isDragging = false;
    widget.style.cursor = 'default';
  });
})();

// 14. Resume preview modal
(function () {
  const viewResumeBtn = document.getElementById('viewResumeBtn');
  const closeResumeBtn = document.getElementById('closeResumeBtn');
  const resumeModal = document.getElementById('resumeModal');

  if (!viewResumeBtn || !closeResumeBtn || !resumeModal) return;

  const openResume = () => {
    resumeModal.classList.add('open');
    resumeModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeResume = () => {
    resumeModal.classList.remove('open');
    resumeModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  viewResumeBtn.addEventListener('click', openResume);
  closeResumeBtn.addEventListener('click', closeResume);
  resumeModal.addEventListener('click', (event) => {
    if (event.target.hasAttribute('data-close-resume')) closeResume();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && resumeModal.classList.contains('open')) closeResume();
  });
})();

// 15. Certificates detail viewer
(function(){
  const certificateCards = document.querySelectorAll('.certificate-photo-card, .view-cert');
  const certTitle = document.getElementById('certModalTitle');
  const certMeta = document.getElementById('certModalMeta');
  const certDesc = document.getElementById('certModalDesc');

  if (!certificateCards.length || !certTitle || !certMeta || !certDesc) return;

  function updateCertificateDetail(btn) {
    const title = btn.getAttribute('data-cert-title') || 'Certificate';
    const issuer = btn.getAttribute('data-cert-issuer') || 'Portfolio';
    const date = btn.getAttribute('data-cert-date') || 'Unknown';
    const desc = btn.getAttribute('data-cert-desc') || 'No description available.';

    certTitle.textContent = title;
    certMeta.textContent = `${issuer} • ${date}`;
    certDesc.textContent = desc;
  }

  certificateCards.forEach(card => {
    card.addEventListener('click', () => {
      updateCertificateDetail(card);
    });
  });
})();

// The canvas animation is already defined in your source.
// It will now automatically respond to the theme change because
// the canvas reads CSS variables or relies on fixed colors.

// 16. Scroll helpers: ensure structure order and mobile nav behavior
document.addEventListener('DOMContentLoaded', () => {
  // ensure page starts at top / Home
  if (window.location.hash === '' ) window.scrollTo({ top: 0 });

  // monitor CTA scroll handler (if present)
  const monitorCta = document.querySelector('.monitor-cta');
  if (monitorCta) {
    monitorCta.addEventListener('click', (e) => {
      // let anchor navigate naturally; also ensure smooth scroll
      const target = document.querySelector('#home');
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }

  // Close mobile navbar when link clicked
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  const bsCollapseEl = document.getElementById('navMenu');
  if (bsCollapseEl) {
    navLinks.forEach(link => link.addEventListener('click', () => {
      if (bsCollapseEl.classList.contains('show')) {
        // Using Bootstrap's collapse via its API if available
        try {
          const collapse = bootstrap.Collapse.getInstance(bsCollapseEl) || new bootstrap.Collapse(bsCollapseEl);
          collapse.hide();
        } catch (err) {
          bsCollapseEl.classList.remove('show');
        }
      }
    }));
  }
});
// 17. Rock · Paper · Scissors vs Computer
(function () {
  const buttons = document.querySelectorAll('.rps-btn');
  const playerBox = document.getElementById('rpsPlayerChoice');
  const computerBox = document.getElementById('rpsComputerChoice');
  const resultBox = document.getElementById('rpsResult');
  const winsEl = document.getElementById('rpsWins');
  const lossesEl = document.getElementById('rpsLosses');
  if (!buttons.length || !playerBox || !computerBox || !resultBox) return;

  const emojiMap = { rock: '🪨', paper: '📄', scissors: '✂️' };
  let wins = 0, losses = 0;

  function decide(player, computer) {
    if (player === computer) return 'draw';
    const beats = { rock: 'scissors', paper: 'rock', scissors: 'paper' };
    return beats[player] === computer ? 'win' : 'lose';
  }

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const player = btn.getAttribute('data-choice');
      const options = ['rock', 'paper', 'scissors'];
      const computer = options[Math.floor(Math.random() * options.length)];

      playerBox.textContent = emojiMap[player];
      computerBox.textContent = emojiMap[computer];
      computerBox.classList.add('rps-shake');
      setTimeout(() => computerBox.classList.remove('rps-shake'), 400);

      const outcome = decide(player, computer);
      if (outcome === 'win') {
        wins++;
        resultBox.style.color = 'var(--green)';
        resultBox.textContent = '🎉 You win this round!';
        if (winsEl) winsEl.textContent = wins;
      } else if (outcome === 'lose') {
        losses++;
        resultBox.style.color = 'var(--pink)';
        resultBox.textContent = '💻 Computer wins this round!';
        if (lossesEl) lossesEl.textContent = losses;
      } else {
        resultBox.style.color = 'var(--cyan)';
        resultBox.textContent = "🤝 It's a draw!";
      }
    });
  });
})();

// 18. Typing Speed Test (computer-themed sentences)
(function () {
  const targetEl = document.getElementById('typingTargetText');
  const inputEl = document.getElementById('typingInputArea');
  const startBtn = document.getElementById('typingStartBtn');
  const wpmEl = document.getElementById('typingWpm');
  const accEl = document.getElementById('typingAccuracy');
  const timerEl = document.getElementById('typingTimer');
  if (!targetEl || !inputEl || !startBtn) return;

  const sentences = [
    'The CPU processes instructions faster than the human eye can blink.',
    'A keyboard, mouse, and monitor form the core of every desktop setup.',
    'Software developers debug code to keep hardware running smoothly.',
    'RAM stores temporary data while the SSD keeps files safe long term.',
    'Clean code and fast networks power the modern software industry.'
  ];

  let timeLeft = 30;
  let timerInterval = null;
  let targetText = '';
  let running = false;

  function startTest() {
    targetText = sentences[Math.floor(Math.random() * sentences.length)];
    targetEl.textContent = targetText;
    inputEl.value = '';
    inputEl.disabled = false;
    inputEl.focus();
    timeLeft = 30;
    timerEl.textContent = timeLeft;
    wpmEl.textContent = '0';
    accEl.textContent = '100%';
    running = true;
    startBtn.innerHTML = '<i class="fas fa-redo"></i> Restart';

    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
      timeLeft--;
      timerEl.textContent = timeLeft;
      if (timeLeft <= 0) endTest();
    }, 1000);
  }

  function computeStats() {
    const typed = inputEl.value;
    let correctChars = 0;
    for (let i = 0; i < typed.length; i++) {
      if (typed[i] === targetText[i]) correctChars++;
    }
    const accuracy = typed.length ? Math.round((correctChars / typed.length) * 100) : 100;
    const elapsedMinutes = (30 - timeLeft) / 60 || (30 / 60);
    const wordsTyped = typed.trim().length ? typed.trim().split(/\s+/).length : 0;
    const wpm = Math.max(0, Math.round(wordsTyped / elapsedMinutes));
    return { accuracy, wpm };
  }

  function endTest() {
    running = false;
    clearInterval(timerInterval);
    inputEl.disabled = true;
    const { accuracy, wpm } = computeStats();
    wpmEl.textContent = wpm;
    accEl.textContent = accuracy + '%';
    startBtn.innerHTML = '<i class="fas fa-keyboard"></i> Try Again';
  }

  inputEl.addEventListener('input', () => {
    if (!running) return;
    const { accuracy, wpm } = computeStats();
    wpmEl.textContent = wpm;
    accEl.textContent = accuracy + '%';
    if (inputEl.value.trim() === targetText.trim()) endTest();
  });

  startBtn.addEventListener('click', startTest);
})();

/* ================= EDUCATION ANIMATION ================= */

const educationItems = document.querySelectorAll(".timeline-item");

function educationAnimation(){

    educationItems.forEach(item=>{

        const top=item.getBoundingClientRect().top;

        const trigger=window.innerHeight-100;

        if(top<trigger){

            item.classList.add("show");

        }

    });

}

window.addEventListener("scroll",educationAnimation);

educationAnimation();