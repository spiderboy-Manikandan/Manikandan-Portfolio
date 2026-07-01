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

// 3. Cyber Code Rain Background Engine
(() => {
  const canvas = document.getElementById('bgCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  const codeChars = "010101{}[]constfunction=>ifwhileselectclassMBlogo";
  const columns = Math.floor(width / 20);
  const drops = Array(columns).fill(1);
  const charSizes = Array(columns).fill(0).map(() => Math.random() * 6 + 10);
  const dropSpeeds = Array(columns).fill(0).map(() => Math.random() * 1.5 + 1.2);

  function renderLoop() {
    const isLightMode = document.body.classList.contains('light-mode');
    ctx.fillStyle = isLightMode ? 'rgba(248, 250, 252, 0.12)' : 'rgba(6, 4, 13, 0.12)';
    ctx.fillRect(0, 0, width, height);

    for (let i = 0; i < drops.length; i++) {
      const text = codeChars[Math.floor(Math.random() * codeChars.length)];
      const x = i * 20;
      const y = drops[i] * 20;

      ctx.font = `bold ${charSizes[i]}px 'JetBrains Mono', monospace`;

      if (i % 3 === 0) {
        ctx.fillStyle = isLightMode ? 'rgba(124, 58, 237, 0.28)' : 'rgba(255, 42, 135, 0.5)';
      } else if (i % 3 === 1) {
        ctx.fillStyle = isLightMode ? 'rgba(249, 115, 22, 0.28)' : 'rgba(255, 145, 0, 0.5)';
      } else {
        ctx.fillStyle = isLightMode ? 'rgba(13, 148, 136, 0.28)' : 'rgba(0, 229, 255, 0.5)';
      }

      ctx.fillText(text, x, y);

      if (y > height && Math.random() > 0.985) {
        drops[i] = 0;
      }
      drops[i] += dropSpeeds[i];
    }
    requestAnimationFrame(renderLoop);
  }

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    const newCols = Math.floor(width / 20);
    while (drops.length < newCols) {
      drops.push(1);
      charSizes.push(Math.random() * 6 + 10);
      dropSpeeds.push(Math.random() * 1.5 + 1.2);
    }
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

// 8. Failsafe Contact Form Submission Router
const hireForm = document.getElementById('hireForm');
if (hireForm) {
  hireForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const statusNotifier = document.getElementById('formStatus');
    statusNotifier.style.color = 'var(--cyan)';
    statusNotifier.textContent = '⏳ Transmitting Data Packets...';

    const submissionPayload = new FormData(hireForm);
    const formspreeUrl = hireForm.action;
    const userName = document.getElementById('name').value;

    try {
      const response = await fetch(formspreeUrl, {
        method: 'POST',
        body: submissionPayload,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        statusNotifier.style.color = 'var(--green)';
        statusNotifier.innerHTML = `✨ Message sent successfully! You'll receive a reply at your email. Check spam folder if needed.`;
        triggerConfettiCelebration();
        hireForm.reset();
        
        // Optional: Clear status after 8 seconds
        setTimeout(() => {
          statusNotifier.textContent = '';
        }, 8000);
      } else {
        throw new Error('Formspree rejection');
      }
    } catch (err) {
      statusNotifier.style.color = 'var(--pink)';
      const userEmail = document.getElementById('email').value;
      statusNotifier.innerHTML = `❌ Network error occurred. <strong>Alternative:</strong> Email directly: <a href="mailto:compmanikandanb23@gmail.com?subject=Hiring Query from ${encodeURIComponent(userName)}&body=Hello Manikandan,%0A%0A${encodeURIComponent(document.getElementById('message').value)}" style="color:var(--cyan); text-decoration:underline; font-weight:bold;">compmanikandanb23@gmail.com</a> or <a href="https://wa.me/917094964875" target="_blank" rel="noreferrer" style="color:var(--green); text-decoration:underline; font-weight:bold;">WhatsApp</a>`;
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

  const knowledge = {
    'skills': 'Manikandan B is skilled in HTML5, CSS3, JavaScript, PHP, Python, Java, C, MySQL, Bootstrap, GitHub, Arduino IoT, Cisco, and Computer Networks.',
    'projects': 'He has built: <br>1. Online Bus Ticket Reservation (PHP/MySQL)<br>2. RFID Lab Attendance System (Python/Sheets API)<br>3. Food Redistribution System (Social Impact)<br>4. Interactive games on this Portfolio.',
    'education': 'He is studying for a Diploma in Computer Science & Engineering (DCSE) at Tamil Nadu Government Polytechnic College, Madurai (CGPA: 9.4). SSLC mark was 77%.',
    'contact': 'You can email him at compmanikandanb23@gmail.com or call him at +91 7094964875. The Contact form at the bottom is also active.',
    'resume': 'You can download Manikandan\'s full Resume directly from the Home section by clicking the "View Resume" button.',
    'hello': 'Hello! I\'m Mani\'s AI. Ask me about his education, skills, projects, games, or contact info.',
    'hi': 'Hi! How can I help you learn more about Manikandan B today?',
    'help': 'Ask me queries like "What are his skills?", "Where does he study?", "What projects has he built?", or "How do I contact him?"',
    'hiring': 'You can hire him by sending a message in the Contact section! He is eager to adapt and contribute to real-world software.',
    'cisco': 'He is certified in Cisco networking structures, including network security routing and layout configuration.',
    'arduino': 'Mani has hands-on IoT layout design experience with Arduino, syncing hardware swiping sensors straight to Sheets APIs.',
    'games': 'Mani built three custom neon mini-games on this portfolio: Memory Match, Guess the Number, and Tic-Tac-Toe vs an AI opponent!',
    'default': 'I\'m not sure I understand that query. Try asking about his skills, education, projects, games, or contact information!'
  };

  function getBotReply(userMsg) {
    const msg = userMsg.toLowerCase().trim();
    if (msg.length === 0) return 'Please type a question!';
    for (const [key, value] of Object.entries(knowledge)) {
      if (msg.includes(key)) return value;
    }
    return knowledge['default'];
  }

  function addMessage(text, sender) {
    const div = document.createElement('div');
    div.className = `msg ${sender}`;
    div.innerHTML = `<span>${text}</span>`;
    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function handleSend() {
    const text = chatInput.value.trim();
    if (!text) return;
    addMessage(text, 'user');
    chatInput.value = '';
    const reply = getBotReply(text);
    setTimeout(() => addMessage(reply, 'bot'), 400);
  }

  chatSendBtn.addEventListener('click', handleSend);
  chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSend();
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

  setChatOpen(false);

  chatToggle.addEventListener('click', () => setChatOpen(true));
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

// 14. Certificates detail viewer
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