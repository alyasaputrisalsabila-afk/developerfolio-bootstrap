const yearEl = document.getElementById('year');
const backToTop = document.getElementById('backToTop');
const themeToggle = document.getElementById('themeToggle');
const pageLoader = document.getElementById('pageLoader');
const revealElements = document.querySelectorAll('.reveal');

yearEl.textContent = new Date().getFullYear();

const savedTheme = localStorage.getItem('portfolio-theme');
if (savedTheme === 'dark') {
  document.body.classList.add('dark-mode');
}

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  localStorage.setItem('portfolio-theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
});

function hideLoader() {
  if (!pageLoader) return;
  pageLoader.classList.add('loaded');
  // After transition remove from DOM flow for assistive tech
  setTimeout(() => {
    if (pageLoader && pageLoader.parentNode) pageLoader.setAttribute('aria-hidden', 'true');
  }, 700);
}

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealElements.forEach((el) => revealObserver.observe(el));

// Fallback for browsers without IntersectionObserver
if (!('IntersectionObserver' in window)) {
  revealElements.forEach((el) => el.classList.add('visible'));
}

const typewriterEl = document.querySelector('.typewriter-text');
const nameTypewriterEl = document.getElementById('nameTypewriter');
const typewriterPhrases = ['Web Developer', 'Mobile Developer', 'Cybersecurity Enthusiast'];
const namePhrase = 'Salsabila Alya Saputri';
let typewriterIndex = 0;
let typewriterChar = 0;
let typewriterForward = true;
let nameChar = 0;
let nameForward = true;

function runTypewriter() {
  if (!typewriterEl) return;

  const phrase = typewriterPhrases[typewriterIndex];
  if (typewriterForward) {
    typewriterChar += 1;
    typewriterEl.textContent = phrase.slice(0, typewriterChar);
    if (typewriterChar === phrase.length) {
      typewriterForward = false;
      setTimeout(runTypewriter, 1200);
      return;
    }
  } else {
    typewriterChar -= 1;
    typewriterEl.textContent = phrase.slice(0, typewriterChar);
    if (typewriterChar === 0) {
      typewriterForward = true;
      typewriterIndex = (typewriterIndex + 1) % typewriterPhrases.length;
    }
  }
  setTimeout(runTypewriter, typewriterForward ? 80 : 35);
}

function runNameTypewriter() {
  if (!nameTypewriterEl) return;

  if (nameForward) {
    nameChar += 1;
    nameTypewriterEl.textContent = namePhrase.slice(0, nameChar);
    if (nameChar === namePhrase.length) {
      nameForward = false;
      setTimeout(runNameTypewriter, 1200);
      return;
    }
  } else {
    nameChar -= 1;
    nameTypewriterEl.textContent = namePhrase.slice(0, nameChar);
    if (nameChar === 0) {
      nameForward = true;
    }
  }
  setTimeout(runNameTypewriter, nameForward ? 90 : 45);
}

window.addEventListener('load', () => {
  setTimeout(hideLoader, 200);
  setTimeout(runNameTypewriter, 600);
  setTimeout(runTypewriter, 900);


  const splash = document.getElementById('splash');
  const splashSkipBtn = document.getElementById('splashSkip');
  const splashEnterBtn = document.getElementById('splashEnter');

  if (splash) {
    // show entrance animation class
    requestAnimationFrame(() => splash.classList.add('showing'));
    // auto-hide after a brief delay
    const autoHideDelay = 2200;
    let hideTimer = setTimeout(() => hideSplash(), autoHideDelay);

    function hideSplash() {
      if (!splash) return;
      splash.classList.add('hidden');
      splash.setAttribute('aria-hidden', 'true');
    }

    // Add blink and move classes to gift icon for visual emphasis
    const giftMain = document.querySelector('.splash-gift-main');
    if (giftMain) giftMain.classList.add('blink', 'move');

    // Enter button: hide immediately
    if (splashEnterBtn) {
      splashEnterBtn.addEventListener('click', () => {
        clearTimeout(hideTimer);
        // launch confetti then hide splash
        launchConfetti();
        // small delay so confetti is visible
        setTimeout(() => hideSplash(), 600);
      });
    }

    // Skip button: hide immediately
    if (splashSkipBtn) {
      splashSkipBtn.addEventListener('click', () => {
        clearTimeout(hideTimer);
        hideSplash();
      });
    }
  }
});

// Simple confetti implementation (lightweight, no external libs)
function launchConfetti() {
  const duration = 1200;
  const colors = ['#cfa0ff', '#9b70ff', '#7b5bff', '#d9b8ff', '#e6d6ff'];
  const end = Date.now() + duration;

  const canvas = document.createElement('canvas');
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.pointerEvents = 'none';
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');

  const total = 80;
  const particles = [];
  for (let i = 0; i < total; i++) {
    particles.push({
      x: canvas.width / 2 + (Math.random() - 0.5) * 160,
      y: canvas.height / 2 + (Math.random() - 0.5) * 40,
      vx: (Math.random() - 0.5) * 10,
      vy: Math.random() * -9 - 2,
      size: Math.random() * 8 + 6,
      color: colors[Math.floor(Math.random() * colors.length)],
      rot: Math.random() * Math.PI,
      gravity: 0.28 + Math.random() * 0.18
    });
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p) => {
      p.vy += p.gravity;
      p.x += p.vx;
      p.y += p.vy;
      p.rot += 0.1;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
      ctx.restore();
    });
  }

  (function frame() {
    draw();
    if (Date.now() < end) {
      requestAnimationFrame(frame);
    } else {
      // fade out then remove
      let alpha = 1;
      const fade = setInterval(() => {
        alpha -= 0.08;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.globalAlpha = Math.max(alpha, 0);
        draw();
        ctx.globalAlpha = 1;
        if (alpha <= 0) {
          clearInterval(fade);
          if (canvas && canvas.parentNode) canvas.parentNode.removeChild(canvas);
        }
      }, 60);
    }
  })();
}

window.addEventListener('scroll', () => {
  backToTop.classList.toggle('show', window.scrollY > 500);
});

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
const navbarCollapse = document.getElementById('navbarContent');
navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    const instance = bootstrap.Collapse.getInstance(navbarCollapse);
    if (instance) instance.hide();
  });
});
