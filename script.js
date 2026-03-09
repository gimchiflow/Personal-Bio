// ============================
// Bomb Drop Intro Animation
// ============================
function dropBombs() {
  const count = 10;
  for (let i = 0; i < count; i++) {
    setTimeout(() => {
      const bomb = document.createElement('div');
      bomb.classList.add('bomb');
      bomb.textContent = '💣';
      const left = Math.random() * 95 + 2;
      const duration = (Math.random() * 1.2 + 1.2).toFixed(2);
      bomb.style.left = left + 'vw';
      bomb.style.animationDuration = duration + 's';
      document.body.appendChild(bomb);

      // explosion at bottom
      const landTime = parseFloat(duration) * 900;
      setTimeout(() => {
        const exp = document.createElement('div');
        exp.classList.add('explosion');
        exp.textContent = '💥';
        exp.style.left = (left - 2) + 'vw';
        exp.style.bottom = '0px';
        exp.style.top = 'auto';
        document.body.appendChild(exp);
        setTimeout(() => exp.remove(), 700);
        bomb.remove();
      }, landTime);

    }, i * 180);
  }
}

dropBombs();

// ============================
// Missile Cursor
// ============================
const cursor = document.getElementById('missile-cursor');

document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});

// ============================
// Mobile Nav Toggle
// ============================
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close mobile nav when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});

// ============================
// Scroll Fade-In Animation
// ============================
const fadeEls = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12
});

fadeEls.forEach(el => observer.observe(el));

// ============================
// Hero Background Fade on Scroll
// ============================
const heroBg = document.querySelector('.hero-bg');
const heroInner = document.querySelector('.hero-inner');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const heroHeight = document.querySelector('.hero').offsetHeight;
  const opacity = Math.max(0, 1 - scrollY / (heroHeight * 0.6));
  heroBg.style.opacity = opacity;
  heroInner.style.opacity = opacity;
  heroInner.style.transform = `translateY(${scrollY * 0.3}px)`;
});

// ============================
// Active Nav Link on Scroll
// ============================
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navAnchors.forEach(a => {
    a.style.color = '';
    if (a.getAttribute('href') === `#${current}`) {
      a.style.color = 'var(--color-accent)';
    }
  });
});
