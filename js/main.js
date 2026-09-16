/* ============================================================
   MAIN.JS — Core interactivity engine
   Anikethana Reddy J L — Dark Cyber-Terminal Portfolio
============================================================ */

/* ── Typewriter Effect ─────────────────────────────────────── */
(function initTypewriter() {
  const el = document.getElementById('hero-typewriter');
  if (!el) return;

  const phrases = [
    'Full-Stack Engineer // Distributed Systems',
    'GenAI Architect // Multi-Agent Pipelines',
    'DevTools Creator // Open Source Contributor',
    'UI/UX Engineer // Figma + Google Stitch',
    'Event-Driven Systems // Apache Kafka + Redis',
  ];

  let pIdx = 0, cIdx = 0, deleting = false;

  function type() {
    const phrase = phrases[pIdx];
    if (deleting) {
      el.textContent = phrase.slice(0, --cIdx);
      if (cIdx === 0) {
        deleting = false;
        pIdx = (pIdx + 1) % phrases.length;
        setTimeout(type, 500);
        return;
      }
      setTimeout(type, 28);
    } else {
      el.textContent = phrase.slice(0, ++cIdx);
      if (cIdx === phrase.length) {
        deleting = true;
        setTimeout(type, 2800);
        return;
      }
      setTimeout(type, 55);
    }
  }

  setTimeout(type, 1200);
})();

/* ── Scroll-based Navbar ────────────────────────────────────── */
(function initNavbar() {
  const navbar = document.getElementById('navbar');
  const links  = document.querySelectorAll('.nav-link[data-section]');
  const sections = document.querySelectorAll('section[id]');

  if (!navbar) return;

  function onScroll() {
    navbar.classList.toggle('scrolled', window.scrollY > 60);

    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 120) {
        current = sec.getAttribute('id');
      }
    });

    links.forEach(link => {
      link.classList.toggle('active', link.getAttribute('data-section') === current);
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

/* ── Mobile Hamburger ───────────────────────────────────────── */
(function initHamburger() {
  const btn   = document.getElementById('hamburger');
  const links = document.getElementById('nav-links');
  if (!btn || !links) return;

  btn.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    btn.setAttribute('aria-expanded', String(open));
  });

  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      links.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    });
  });
})();

/* ── Scroll Reveal ─────────────────────────────────────────── */
(function initReveal() {
  const targets = [
    '.section-header',
    '.about-code-card',
    '.about-text',
    '.project-card',
    '.arsenal-item',
    '.design-tool-card',
    '.design-philosophy-card',
    '.timeline-item',
    '.telemetry-card',
    '.contact-email-block',
    '.contact-socials',
  ];

  const els = document.querySelectorAll(targets.join(', '));
  els.forEach(el => el.classList.add('reveal'));

  if (!('IntersectionObserver' in window)) {
    els.forEach(el => el.classList.add('visible'));
    return;
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), i * 60);
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.08 });

  els.forEach(el => io.observe(el));
})();

/* ── Tech Arsenal Filter ────────────────────────────────────── */
(function initArsenalFilter() {
  const tabs  = document.querySelectorAll('.filter-tab');
  const items = document.querySelectorAll('.arsenal-item');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const filter = tab.getAttribute('data-filter');

      tabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      items.forEach(item => {
        const cat = item.getAttribute('data-category') || '';
        const visible = filter === 'all' || cat.includes(filter);
        item.classList.toggle('hidden', !visible);
      });
    });
  });
})();

/* ── Copy Email ─────────────────────────────────────────────── */
(function initCopyEmail() {
  const btn  = document.getElementById('copy-email-btn');
  const toast = document.getElementById('toast');
  if (!btn) return;

  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2200);
  }

  btn.addEventListener('click', async () => {
    const email = btn.getAttribute('data-copy') || '';
    try {
      await navigator.clipboard.writeText(email);
      btn.classList.add('copied');
      showToast('✓ Email copied to clipboard');
      setTimeout(() => btn.classList.remove('copied'), 2000);
    } catch {
      showToast('⚠ Copy failed — select manually');
    }
  });
})();

/* ── Staggered Design Principle Chips ──────────────────────── */
(function initDesignChips() {
  const chips = document.querySelectorAll('.principle-chip');
  chips.forEach((chip, i) => {
    chip.style.animationDelay = `${i * 0.08}s`;
  });
})();

/* ── Arsenal Stagger ────────────────────────────────────────── */
(function initArsenalStagger() {
  const items = document.querySelectorAll('.arsenal-item');
  items.forEach((item, i) => {
    item.style.animationDelay = `${i * 0.04}s`;
  });
})();

/* ── Project Stagger ────────────────────────────────────────── */
(function initProjectStagger() {
  const cards = document.querySelectorAll('.project-card');
  cards.forEach((card, i) => {
    card.style.animationDelay = `${i * 0.08}s`;
  });
})();

/* ── Smooth anchor navigation ───────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ── Console Easter Egg ─────────────────────────────────────── */
console.log(
  '%c ANIKETH.DEV ',
  'background:#00ff41;color:#000;font-weight:900;font-size:20px;padding:8px 16px;border-radius:4px;font-family:monospace;',
);
console.log(
  '%c Distributed Systems Engineer | GenAI Architect | Bengaluru, India',
  'color:#00ff41;font-family:monospace;font-size:12px;',
);
console.log(
  '%c> anikethana2109@gmail.com',
  'color:#86efac;font-family:monospace;font-size:11px;',
);
