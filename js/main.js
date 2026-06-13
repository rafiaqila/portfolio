/* Nav scroll shadow */
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 10);
});

/* Hamburger menu */
const hamburger = document.querySelector('.nav__hamburger');
const mobileMenu = document.querySelector('.nav__mobile');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
  document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
});
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});

/* Active nav link on scroll */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav__link');
const observerNav = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(l => l.classList.remove('active'));
      const id = entry.target.getAttribute('id');
      document.querySelectorAll(`.nav__link[href="#${id}"]`).forEach(l => l.classList.add('active'));
    }
  });
}, { rootMargin: '-40% 0px -60% 0px' });
sections.forEach(s => observerNav.observe(s));

/* Scroll reveal */
const reveals = document.querySelectorAll('.reveal');
const observerReveal = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observerReveal.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
reveals.forEach(el => observerReveal.observe(el));

/* Project image placeholder fallback */
document.querySelectorAll('.project-img img').forEach(img => {
  img.onerror = function () {
    this.style.display = 'none';
    this.parentElement.querySelector('.project-img__placeholder').style.display = 'flex';
  };
});

/* Project modals */
const modalOverlay = document.getElementById('modal-overlay');
const modalContent = document.getElementById('modal-content');
const modalCloseBtn = document.getElementById('modal-close');

function openModal(card) {
  const details = card.querySelector('.project-details');
  if (!details) return;
  modalContent.innerHTML = details.innerHTML;
  modalOverlay.classList.add('open');
  modalOverlay.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modalOverlay.classList.remove('open');
  modalOverlay.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('click', e => {
    if (e.target.closest('a')) return;
    openModal(card);
  });
});

modalCloseBtn.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', e => {
  if (e.target === modalOverlay) closeModal();
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && modalOverlay.classList.contains('open')) closeModal();
});
