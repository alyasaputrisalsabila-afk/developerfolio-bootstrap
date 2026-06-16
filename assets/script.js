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
  // Hide splash overlay after a short delay so users see the intro
  const splash = document.getElementById('splash');
  if (splash) {
    setTimeout(() => {
      splash.classList.add('hidden');
      splash.setAttribute('aria-hidden', 'true');
    }, 1400);
  }
});

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
