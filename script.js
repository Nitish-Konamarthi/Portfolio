// =========================================
// PORTFOLIO SCRIPT - NITISH VEERA VENKATESH
// =========================================

document.addEventListener('DOMContentLoaded', () => {

  // ── TYPEWRITER EFFECT ──────────────────────────────────
  const roles = [
    'Full Stack Developer',
    'AI/ML Engineer',
    'Research Lead',
    'Problem Solver'
  ];
  let roleIdx = 0, charIdx = 0, deleting = false;
  const typeEl = document.getElementById('typewriter');

  function type() {
    if (!typeEl) return;
    const current = roles[roleIdx];
    if (!deleting) {
      typeEl.textContent = current.slice(0, ++charIdx);
      if (charIdx === current.length) {
        deleting = true;
        setTimeout(type, 1800);
        return;
      }
    } else {
      typeEl.textContent = current.slice(0, --charIdx);
      if (charIdx === 0) {
        deleting = false;
        roleIdx = (roleIdx + 1) % roles.length;
      }
    }
    setTimeout(type, deleting ? 60 : 90);
  }
  type();

  // ── NAVBAR SCROLL ──────────────────────────────────────
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });

  // ── HAMBURGER / MOBILE MENU ────────────────────────────
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
  });
  mobileMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
    });
  });

  // ── FADE-UP SCROLL ANIMATION ───────────────────────────
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), i * 80);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

  // ── CONTACT FORM (FORMSPREE AJAX) ──────────────────────
  const form = document.getElementById('contactForm');
  const msgBox = document.getElementById('form-message');
  const submitBtn = document.getElementById('submitBtn');

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>&nbsp; Sending...';
      msgBox.textContent = '';
      msgBox.className = '';

      try {
        const res = await fetch('https://formspree.io/f/mkokngag', {
          method: 'POST',
          body: new FormData(form),
          headers: { Accept: 'application/json' }
        });

        if (res.ok) {
          msgBox.textContent = '✅ Message sent! I\'ll get back to you soon.';
          msgBox.className = 'success';
          form.reset();
        } else {
          const data = await res.json();
          const err = data.errors ? data.errors.map(x => x.message).join(', ') : 'Unknown error.';
          msgBox.textContent = '❌ ' + err;
          msgBox.className = 'error';
        }
      } catch {
        msgBox.textContent = '❌ Network error. Please try again later.';
        msgBox.className = 'error';
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i>&nbsp; Send Message';
      }
    });
  }

  // ── ACTIVE NAV LINK HIGHLIGHT ──────────────────────────
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
    });
    navLinks.forEach(a => {
      a.style.color = a.getAttribute('href') === '#' + current
        ? 'var(--accent-mid)'
        : '';
    });
  });

});
