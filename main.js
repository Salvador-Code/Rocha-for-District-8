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

// ----- Scroll progress bar + header shadow + back-to-top -----
(function initScrollUI() {
  const header  = document.getElementById('site-header');
  const bar     = document.getElementById('scroll-progress');
  const backTop = document.getElementById('back-to-top');

  const onScroll = () => {
    const scrolled = window.scrollY;
    const docH = document.documentElement.scrollHeight - window.innerHeight;

    // Progress bar
    if (bar) bar.style.width = docH > 0 ? (scrolled / docH * 100) + '%' : '0%';

    // Header shadow
    if (header) header.style.boxShadow = scrolled > 10
      ? '0 2px 20px rgba(74,53,200,.18)'
      : '0 1px 8px rgba(74,53,200,.07)';

    // Back-to-top visibility
    if (backTop) {
      backTop.hidden = scrolled < 400;
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });

  // Back-to-top click
  if (backTop) {
    backTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
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
    '.hero-photo-col',
    '.bio-photo-col',
    '.bio-text',
    '.bio-stat-grid',
    '.bio-stat-grid .stat-card',
    '.why-photo-col',
    '.why-content',
    '.priority-card',
    '.gallery-item',
    '.gallery-follow',
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
