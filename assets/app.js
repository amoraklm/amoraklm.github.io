// assets/app.js
// Theme toggle, mobile menu, scroll reveal

(function() {
  const root = document.documentElement;
  const key = 'apix-theme';
  const saved = localStorage.getItem(key);
  if (saved) root.classList.toggle('theme-light', saved === 'light');

  const themeBtn = document.querySelector('[data-theme-toggle]');
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const isLight = root.classList.toggle('theme-light');
      localStorage.setItem(key, isLight ? 'light' : 'dark');
      themeBtn.ariaLabel = isLight ? 'Switch to dark theme' : 'Switch to light theme';
    });
  }

  const menuBtn = document.querySelector('[data-menu-toggle]');
  const drawer = document.querySelector('[data-mobile-drawer]');
  if (menuBtn && drawer) {
    menuBtn.addEventListener('click', () => drawer.classList.toggle('open'));
    document.addEventListener('click', e => {
      if (!drawer.contains(e.target) && !menuBtn.contains(e.target)) drawer.classList.remove('open');
    });
  }

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('show'); });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
})();
