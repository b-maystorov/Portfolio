'use strict';

// Progressive enhancements: all content, details and links work without JS.
const header = document.querySelector('.site-header');
const menu = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
const mobile = window.matchMedia('(max-width: 760px)');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const sections = [...document.querySelectorAll('main > section[id]')];
const navLinks = [...navigation.querySelectorAll('a[href^="#"]')];
let navigationFrame = 0;

function updateCurrentSection() {
  navigationFrame = 0;
  // Use the actual sticky-header edge, including expanded mobile navigation.
  const readingLine = header.getBoundingClientRect().bottom + 24;
  let current = sections[0];
  for (const section of sections) {
    if (section.getBoundingClientRect().top <= readingLine) current = section;
    else break;
  }
  if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 5) {
    current = sections[sections.length - 1];
  }
  navLinks.forEach((link) => {
    if (current && link.hash === `#${current.id}`) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
}
function scheduleNavigationUpdate() {
  if (!navigationFrame) navigationFrame = window.requestAnimationFrame(updateCurrentSection);
}
window.addEventListener('scroll', scheduleNavigationUpdate, { passive: true });
window.addEventListener('resize', scheduleNavigationUpdate);
window.addEventListener('hashchange', scheduleNavigationUpdate);
document.addEventListener('toggle', scheduleNavigationUpdate, true);
window.addEventListener('load', scheduleNavigationUpdate);

function measureHeader() {
  document.documentElement.style.setProperty('--header-height', `${header.getBoundingClientRect().height}px`);
  scheduleNavigationUpdate();
}
function setMenu(open) {
  menu.setAttribute('aria-expanded', String(open));
  navigation.classList.toggle('is-collapsed', !open);
  measureHeader();
}
function syncMenu() {
  menu.hidden = !mobile.matches;
  setMenu(!mobile.matches);
}
menu.addEventListener('click', () => setMenu(menu.getAttribute('aria-expanded') !== 'true'));
navigation.addEventListener('click', (event) => {
  const link = event.target.closest('a');
  if (mobile.matches && link) {
    setMenu(false);
    const target = document.querySelector(link.hash);
    if (target) {
      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    }
  }
});
header.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && mobile.matches && menu.getAttribute('aria-expanded') === 'true') {
    setMenu(false);
    menu.focus();
  }
});
mobile.addEventListener('change', syncMenu);
syncMenu();
if ('ResizeObserver' in window) new ResizeObserver(measureHeader).observe(header);
else window.addEventListener('resize', measureHeader);

// Filters use buttons rather than tabs: the whole project grid stays one region.
const toolbar = document.querySelector('.project-toolbar');
const filterButtons = [...toolbar.querySelectorAll('[data-filter]')];
const projects = [...document.querySelectorAll('.project[data-category]')];
const filterStatus = document.querySelector('#filter-status');
toolbar.hidden = false;
toolbar.addEventListener('click', scheduleNavigationUpdate);
filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const category = button.dataset.filter;
    let count = 0;
    projects.forEach((project) => {
      const show = category === 'all' || project.dataset.category === category;
      project.hidden = !show;
      if (show) count++;
    });
    filterButtons.forEach((item) => item.setAttribute('aria-pressed', String(item === button)));
    filterStatus.textContent = `${count} ${count === 1 ? 'Projekt' : 'Projekte'}`;
  });
});

// Native dialog supplies focus containment and Escape; anchors remain fallback.
const preview = document.querySelector('#image-preview');
const previewImage = preview.querySelector('.preview-image');
const previewCaption = preview.querySelector('#preview-caption');
const originalLink = preview.querySelector('.preview-original');
let previewOpener;
if (typeof preview.showModal === 'function') {
  document.querySelectorAll('[data-preview]').forEach((link) => {
    link.addEventListener('click', (event) => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      previewOpener = link;
      previewImage.src = link.href;
      previewImage.alt = link.querySelector('img').alt;
      previewCaption.textContent = link.dataset.caption;
      originalLink.href = link.href;
      preview.showModal();
      preview.querySelector('.preview-close').focus();
    });
  });
  preview.querySelector('.preview-close').addEventListener('click', () => preview.close());
  preview.addEventListener('click', (event) => {
    if (event.target !== preview) return;
    const bounds = preview.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) preview.close();
  });
  preview.addEventListener('close', () => {
    if (previewOpener) previewOpener.focus();
  });
}

const copyButton = document.querySelector('.copy-email');
const copyStatus = document.querySelector('.copy-status');
const emailLink = document.querySelector('.email-link');
copyButton.hidden = false;
copyButton.addEventListener('click', async () => {
  const email = emailLink.getAttribute('href').slice('mailto:'.length);
  if (!navigator.clipboard || !window.isSecureContext) {
    copyStatus.textContent = 'Bitte die E-Mail-Adresse markieren und manuell kopieren.';
    return;
  }
  try {
    await navigator.clipboard.writeText(email);
    copyStatus.textContent = 'E-Mail-Adresse kopiert.';
  } catch {
    copyStatus.textContent = 'Kopieren nicht erlaubt. Bitte die Adresse manuell kopieren.';
  }
});

// Observers are optional: unsupported browsers keep a static, fully visible site.
if ('IntersectionObserver' in window) {
  const network = document.querySelector('.network-visual');
  let networkVisible = false;
  function updateMotion() {
    network.classList.toggle('is-moving', networkVisible && !reducedMotion.matches && !document.hidden);
  }
  document.documentElement.classList.add('motion-ready');
  const motionObserver = new IntersectionObserver((entries) => {
    networkVisible = entries[0].isIntersecting;
    updateMotion();
  });
  motionObserver.observe(network);
  reducedMotion.addEventListener('change', updateMotion);
  document.addEventListener('visibilitychange', updateMotion);

  const entranceObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      if (!reducedMotion.matches) entry.target.classList.add('reveal-in');
      entranceObserver.unobserve(entry.target);
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.section-heading, .about-main, .career-intro, .contact-panel').forEach((item) => entranceObserver.observe(item));
}
