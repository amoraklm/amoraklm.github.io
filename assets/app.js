/* Apix UI Controller — theme, mobile menu, motion
   Author: Ali Torkaman (Apix)
*/

(function () {
  const root = document.documentElement;
  const THEME_KEY = 'apix-theme';

  // 1) Theme initialization
  const savedTheme = localStorage.getItem(THEME_KEY);
  if (savedTheme === 'light') root.classList.add('theme-light');
  if (savedTheme === 'dark') root.classList.remove('theme-light');

  const themeBtn = document.querySelector('[data-theme-toggle]');
  const setThemeIcon = () => {
    if (!themeBtn) return;
    const icon = themeBtn.querySelector('.icon');
    const isLight = root.classList.contains('theme-light');
    if (icon) icon.textContent = isLight ? '☀️' : '🌙';
    themeBtn.setAttribute('aria-pressed', isLight ? 'true' : 'false');
    themeBtn.setAttribute('aria-label', isLight ? 'Switch to dark theme' : 'Switch to light theme');
  };
  setThemeIcon();

  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const isLight = root.classList.toggle('theme-light');
      localStorage.setItem(THEME_KEY, isLight ? 'light' : 'dark');

      // spin animation
      themeBtn.classList.add('rotate');
      setTimeout(() => themeBtn.classList.remove('rotate'), 450);

      setThemeIcon();
    });
  }

  // 2) Mobile menu
  const menuBtn = document.querySelector('[data-menu-toggle]');
  const drawer = document.querySelector('[data-mobile-drawer]');

  const openDrawer = () => {
    if (!drawer || !menuBtn) return;
    drawer.classList.add('open');
    menuBtn.setAttribute('aria-expanded', 'true');
    // focus first link for accessibility
    const first = drawer.querySelector('a, button');
    if (first) first.focus({ preventScroll: true });
  };

  const closeDrawer = () => {
    if (!drawer || !menuBtn) return;
    drawer.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
  };

  if (menuBtn && drawer) {
    menuBtn.setAttribute('aria-haspopup', 'true');
    menuBtn.setAttribute('aria-expanded', 'false');

    menuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      drawer.classList.contains('open') ? closeDrawer() : openDrawer();
    });

    // close on click outside
    document.addEventListener('click', (e) => {
      if (!drawer.classList.contains('open')) return;
      const clickInside = drawer.contains(e.target) || menuBtn.contains(e.target);
      if (!clickInside) closeDrawer();
    });

    // close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && drawer.classList.contains('open')) {
        closeDrawer();
        menuBtn.focus();
      }
    });

    // close when a link is clicked
    drawer.addEventListener('click', (e) => {
      const link = e.target.closest('a');
      if (link) closeDrawer();
    });
  }

  // 3) Scroll reveal animations (respect reduced motion)
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!prefersReduced && 'IntersectionObserver' in window) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    document.querySelectorAll('.reveal').forEach((el) => obs.observe(el));
  } else {
    // If reduced motion or no IO, show instantly
    document.querySelectorAll('.reveal').forEach((el) => el.classList.add('show'));
  }

  // 4) Smooth hash navigation offset (optional enhancement)
  const offsetScrollTo = (id) => {
    const el = document.querySelector(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 72;
    window.scrollTo({ top: y, behavior: prefersReduced ? 'auto' : 'smooth' });
  };

  window.addEventListener('hashchange', () => {
    offsetScrollTo(location.hash);
  });

  if (location.hash) {
    // ensure initial anchor positions account for sticky header
    setTimeout(() => offsetScrollTo(location.hash), 0);
  }
})();
