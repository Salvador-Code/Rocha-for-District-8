/* ============================================================
   ROCHA FOR DISTRICT 8 — main.js
   ============================================================ */

'use strict';

// ----- Mobile nav toggle -----
(function initNav() {
  const toggle = document.getElementById('nav-toggle');
  const links  = document.getElementById('nav-links');
  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  // Close nav when a link is clicked
  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      links.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
})();

// ----- Sticky header shadow on scroll -----
(function initHeaderScroll() {
  const header = document.getElementById('site-header');
  if (!header) return;

  const onScroll = () => {
    header.style.boxShadow = window.scrollY > 10
      ? '0 2px 16px rgba(0,0,0,.45)'
      : '0 2px 12px rgba(0,0,0,.3)';
  };

  window.addEventListener('scroll', onScroll, { passive: true });
})();

// ----- Active nav link highlighting -----
(function initActiveNav() {
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          const href = link.getAttribute('href').replace('#', '');
          link.classList.toggle('active', href === id);
        });
      }
    });
  }, { rootMargin: '-30% 0px -60% 0px' });

  sections.forEach(sec => observer.observe(sec));
})();

// ----- Fade-up scroll animations -----
(function initFadeUp() {
  const animatable = [
    '.hero-content',
    '.hero-photo-wrap',
    '.bio-text',
    '.bio-stat-grid',
    '.why-body',
    '.priority-card',
    '.quote-card',
    '.endorse-groups',
    '.involved-volunteer',
    '.involved-email',
    '.district-info',
    '.contact-info',
  ];

  const elements = document.querySelectorAll(animatable.join(','));
  elements.forEach(el => el.classList.add('fade-up'));

  if (!('IntersectionObserver' in window)) {
    elements.forEach(el => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  elements.forEach(el => observer.observe(el));
})();

// ----- Volunteer form -----
(function initVolunteerForm() {
  const form    = document.getElementById('volunteer-form');
  const success = document.getElementById('vol-success');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    // Collect data (wire to your backend / ActBlue / NGP VAN as needed)
    const data = new FormData(form);
    const payload = Object.fromEntries(data.entries());
    payload.help = data.getAll('help');
    console.info('[Volunteer] Form submitted:', payload);

    // Show success state
    form.reset();
    if (success) {
      success.hidden = false;
      success.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  });
})();

// ----- Email sign-up form -----
(function initEmailForm() {
  const form    = document.getElementById('email-form');
  const success = document.getElementById('email-success');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const email = form.querySelector('input[type="email"]').value.trim();
    console.info('[Email signup]', email);

    form.reset();
    if (success) {
      success.hidden = false;
      success.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  });
})();

// ----- Smooth scroll polyfill for browsers without native support -----
(function polyfillSmoothScroll() {
  if ('scrollBehavior' in document.documentElement.style) return; // native support

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
})();
