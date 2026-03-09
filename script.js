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
const heroBgs = document.querySelectorAll('.hero-bg');
const heroInner = document.querySelector('.hero-inner');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const heroHeight = document.querySelector('.hero').offsetHeight;
  const heroOpacity = Math.max(0, 1 - scrollY / (heroHeight * 0.6));
  heroBgs.forEach(bg => bg.style.opacity = heroOpacity);
  heroInner.style.opacity = heroOpacity;
  heroInner.style.transform = `translateY(${scrollY * 0.3}px)`;

  // Fade all sections as they scroll out of view
  document.querySelectorAll('.section, .section-alt').forEach(section => {
    const rect = section.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    // Fade out as section scrolls above viewport
    if (rect.bottom < windowHeight * 0.2) {
      const fadeOut = Math.max(0, rect.bottom / (windowHeight * 0.2));
      section.style.opacity = fadeOut;
    // Fade in as section enters viewport
    } else if (rect.top > windowHeight * 0.85) {
      const fadeIn = Math.max(0, 1 - (rect.top - windowHeight * 0.85) / (windowHeight * 0.15));
      section.style.opacity = fadeIn;
    } else {
      section.style.opacity = 1;
    }
  });
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
