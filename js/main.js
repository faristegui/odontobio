(function () {
  const header = document.getElementById('header');
  const toggle = document.getElementById('nav-toggle');
  const links = document.getElementById('nav-links');
  const navAnchors = links.querySelectorAll('a[href^="#"]:not(.btn):not(.brand)');
  const sections = Array.from(navAnchors, a => document.querySelector(a.getAttribute('href'))).filter(Boolean);

  document.getElementById('year').textContent = new Date().getFullYear();

  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 12);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  toggle.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
  });
  links.addEventListener('click', e => {
    if (e.target.closest('a')) {
      links.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });

  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(el => io.observe(el));

    const spy = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        navAnchors.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id));
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(s => spy.observe(s));
  } else {
    reveals.forEach(el => el.classList.add('in'));
  }
})();
