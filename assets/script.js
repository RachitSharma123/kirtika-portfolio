// ============================================
// KIRTIKA SHARMA — PORTFOLIO
// Interactions & micro-animations
// ============================================

// Set year
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile nav
const burger = document.querySelector('.nav__burger');
const mobileNav = document.querySelector('.nav__mobile');
if (burger && mobileNav) {
  burger.addEventListener('click', () => {
    const open = burger.classList.toggle('open');
    burger.setAttribute('aria-expanded', open);
    mobileNav.classList.toggle('open');
    mobileNav.setAttribute('aria-hidden', !open);
  });
  mobileNav.querySelectorAll('.nav__mobile-link').forEach(link => {
    link.addEventListener('click', () => {
      burger.classList.remove('open');
      burger.setAttribute('aria-expanded', false);
      mobileNav.classList.remove('open');
      mobileNav.setAttribute('aria-hidden', true);
    });
  });
}

// Custom cursor
const cursor = document.querySelector('.cursor');
const cursorDot = document.querySelector('.cursor-dot');

if (cursor && cursorDot && window.matchMedia('(pointer: fine)').matches) {
  let mouseX = 0, mouseY = 0;
  let cursorX = 0, cursorY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top = mouseY + 'px';
  });

  // Smooth cursor follow
  function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.18;
    cursorY += (mouseY - cursorY) * 0.18;
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Hover state on interactive elements
  const hoverables = document.querySelectorAll('a, button, .project, .contact-card, .talk, .role, .stat');
  hoverables.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
  });
}

// Scroll reveal
const revealTargets = document.querySelectorAll(
  '.section__header, .about__prose > *, .about__card, .skills-group, .role, .project, .talk, .contact__title, .contact__desc, .contact-card, .contact__availability'
);

revealTargets.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('in');
      }, i * 40);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

revealTargets.forEach(el => observer.observe(el));

// Nav background on scroll
const nav = document.querySelector('.nav');
let lastScroll = 0;
window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  if (currentScroll > 80) {
    nav.style.background = 'rgba(11, 11, 13, 0.92)';
  } else {
    nav.style.background = 'rgba(11, 11, 13, 0.72)';
  }
  lastScroll = currentScroll;
});

// Smooth anchor scroll with offset
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#' || targetId === '#top') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      const y = target.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  });
});

// Parallax on hero subtle
const hero = document.querySelector('.hero');
if (hero) {
  window.addEventListener('scroll', () => {
    const scroll = window.pageYOffset;
    if (scroll < window.innerHeight) {
      const title = hero.querySelector('.hero__title');
      if (title) {
        title.style.transform = `translateY(${scroll * 0.15}px)`;
      }
    }
  });
}

// Stat count-up on view
const stats = document.querySelectorAll('.stat__num');
const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const text = el.textContent.trim();
      // Only animate if purely numeric-ish
      const num = parseInt(text);
      if (!isNaN(num) && text.match(/^\d+\+?$/)) {
        const suffix = text.includes('+') ? '+' : '';
        let current = 0;
        const duration = 1200;
        const steps = 40;
        const increment = num / steps;
        const interval = duration / steps;
        const timer = setInterval(() => {
          current += increment;
          if (current >= num) {
            el.textContent = num + suffix;
            clearInterval(timer);
          } else {
            el.textContent = Math.floor(current) + suffix;
          }
        }, interval);
      }
      statObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

stats.forEach(s => statObserver.observe(s));
