const header = document.querySelector('[data-header]');
const menuToggle = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
let menuFocusReturn = null;

function setMenu(open) {
  if (!menuToggle || !mobileMenu) return;
  if (open) menuFocusReturn = document.activeElement;
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  mobileMenu.classList.toggle('is-open', open);
  document.body.classList.toggle('menu-open', open);
  if (open) {
    window.requestAnimationFrame(() => mobileMenu.querySelector('a')?.focus());
  } else if (menuFocusReturn && typeof menuFocusReturn.focus === 'function') {
    menuFocusReturn.focus();
    menuFocusReturn = null;
  }
}

menuToggle?.addEventListener('click', () => {
  setMenu(menuToggle.getAttribute('aria-expanded') !== 'true');
});
mobileMenu?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menuToggle?.getAttribute('aria-expanded') === 'true') setMenu(false);
});
document.addEventListener('click', (event) => {
  if (menuToggle?.getAttribute('aria-expanded') !== 'true') return;
  if (!header?.contains(event.target)) setMenu(false);
});

const updateHeader = () => header?.classList.toggle('is-scrolled', window.scrollY > 12);
updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}

const reviewCard = document.querySelector('[data-review-card]');
const demoTrigger = document.querySelector('.demo-trigger');
demoTrigger?.addEventListener('click', () => {
  const clean = reviewCard?.classList.toggle('is-clean');
  demoTrigger.innerHTML = clean
    ? 'Reset the preview <span aria-hidden="true">↺</span>'
    : 'Preview a clean copy <span aria-hidden="true">↗</span>';
});

const modeContent = {
  photo: {
    overline: 'PHOTO · DEFAULT CHECK',
    title: 'For the photo you almost shared.',
    copy: 'Strip personal metadata, cover the address on the label, then export a copy with a purpose watermark.',
    type: 'JPG',
    meta: 'IMG_4823_clean',
    list: ['GPS and device fields reviewed', 'One visual region confirmed', 'New file verified after export']
  },
  document: {
    overline: 'DOCUMENT · CAPABILITY BOUNDARY',
    title: 'For a file that needs context.',
    copy: 'When document support is available, properties and structure stay visible in the review before delivery.',
    type: 'PDF',
    meta: 'Capabilities_by_format',
    list: ['Supported actions shown first', 'Purpose watermark made explicit', 'Unverified structure stays flagged']
  },
  batch: {
    overline: 'BATCH · ONE RULE, MANY FILES',
    title: 'For the folder with a deadline.',
    copy: 'Apply one clean-up preset across a group, then retry only the files that need attention.',
    type: '12×',
    meta: 'Batch_2026-09-25',
    list: ['Shared rules across the queue', 'Each result keeps its own status', 'Failures stay separate and retryable']
  }
};

const modeTabs = document.querySelectorAll('.mode-tab');
const modePanel = document.querySelector('[data-mode-panel]');
const modeOverline = document.querySelector('.mode-overline');
const modeTitle = document.querySelector('[data-mode-title]');
const modeCopy = document.querySelector('[data-mode-copy]');
const modeList = document.querySelector('[data-mode-list]');
const modeType = document.querySelector('[data-mode-type]');
const modeMeta = document.querySelector('[data-mode-meta]');

function selectMode(mode) {
  const data = modeContent[mode];
  if (!data) return;
  modeTabs.forEach((tab) => {
    const active = tab.dataset.mode === mode;
    tab.classList.toggle('is-active', active);
    tab.setAttribute('aria-selected', String(active));
    tab.tabIndex = active ? 0 : -1;
  });
  if (modePanel?.animate && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    modePanel.animate([{ opacity: .35, transform: 'translateY(5px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 260, easing: 'ease-out' });
  }
  if (modeOverline) modeOverline.textContent = data.overline;
  if (modeTitle) modeTitle.textContent = data.title;
  if (modeCopy) modeCopy.textContent = data.copy;
  if (modeType) modeType.textContent = data.type;
  if (modeMeta) modeMeta.textContent = data.meta;
  if (modeList) modeList.innerHTML = data.list.map((item) => `<li><span>✓</span> ${item}</li>`).join('');
}
modeTabs.forEach((tab, index) => {
  tab.tabIndex = index === 0 ? 0 : -1;
  tab.addEventListener('click', () => selectMode(tab.dataset.mode));
  tab.addEventListener('keydown', (event) => {
    if (!['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const currentIndex = [...modeTabs].indexOf(tab);
    const nextIndex = event.key === 'Home' ? 0
      : event.key === 'End' ? modeTabs.length - 1
      : (currentIndex + (event.key === 'ArrowRight' ? 1 : -1) + modeTabs.length) % modeTabs.length;
    const nextTab = modeTabs[nextIndex];
    nextTab.focus();
    selectMode(nextTab.dataset.mode);
  });
});

const toast = document.querySelector('[data-toast]');
let toastTimer;
document.querySelector('[data-toast-trigger]')?.addEventListener('click', () => {
  if (!toast) return;
  toast.classList.add('is-visible');
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove('is-visible'), 3500);
});

document.querySelectorAll('[data-year]').forEach((year) => { year.textContent = String(new Date().getFullYear()); });
