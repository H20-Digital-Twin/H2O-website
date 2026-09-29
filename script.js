const header = document.querySelector('[data-header]');
const nav = document.querySelector('[data-nav]');
const navToggle = document.querySelector('[data-nav-toggle]');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const updateHeader = () => header?.classList.toggle('scrolled', window.scrollY > Math.max(120, window.innerHeight * 0.72));
updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });
window.addEventListener('resize', updateHeader, { passive: true });

navToggle?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(open));
  navToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
});

nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  navToggle?.setAttribute('aria-expanded', 'false');
}));

const hero = document.querySelector('.hero');
const heroVideos = [...document.querySelectorAll('[data-hero-video]')];

heroVideos.forEach((video, index) => {
  video.muted = true;
  video.addEventListener('loadedmetadata', () => {
    if (video.duration > 2) video.currentTime = (index * 0.37) % Math.max(1, video.duration - 1);
  }, { once: true });
});

if (reduceMotion) {
  heroVideos.forEach(video => video.pause());
} else if (hero && 'IntersectionObserver' in window) {
  const heroVideoObserver = new IntersectionObserver(([entry]) => {
    heroVideos.forEach(video => {
      if (entry.isIntersecting) video.play().catch(() => {});
      else video.pause();
    });
  }, { threshold: 0.05 });
  heroVideoObserver.observe(hero);
}

const revealItems = document.querySelectorAll('.reveal');
if (reduceMotion || !('IntersectionObserver' in window)) {
  revealItems.forEach(item => item.classList.add('visible'));
} else {
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px' });
  revealItems.forEach(item => revealObserver.observe(item));
}

const sections = [...document.querySelectorAll('main section[id]')];
const navLinks = [...document.querySelectorAll('.site-nav a')];
if ('IntersectionObserver' in window) {
  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      navLinks.forEach(link => link.classList.toggle('active', link.hash === `#${entry.target.id}`));
    });
  }, { rootMargin: '-30% 0px -62% 0px' });
  sections.forEach(section => sectionObserver.observe(section));
}

const dialog = document.querySelector('[data-lightbox-dialog]');
const dialogImage = dialog?.querySelector('img');
const dialogCaption = dialog?.querySelector('p');

document.querySelectorAll('[data-lightbox] .figure-open').forEach(button => {
  button.addEventListener('click', () => {
    const image = button.querySelector('img');
    const caption = button.closest('[data-lightbox]')?.querySelector('figcaption');
    if (!dialog || !dialogImage || !image) return;
    dialogImage.src = image.currentSrc || image.src;
    dialogImage.alt = image.alt;
    dialogCaption.textContent = caption?.textContent || image.alt;
    dialog.showModal();
  });
});

dialog?.querySelector('.lightbox-close')?.addEventListener('click', () => dialog.close());
dialog?.addEventListener('click', event => {
  if (event.target === dialog) dialog.close();
});
