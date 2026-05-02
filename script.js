// ── NAVBAR SCROLL ──
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  });
}

// ── HAMBURGER ──
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
  });
}

// ── BEFORE/AFTER SLIDER ──
(function() {
  const slider = document.getElementById('baSlider');
  const after = slider ? slider.querySelector('.ba-after') : null;
  const handle = document.getElementById('baHandle');
  if (!slider || !after || !handle) return;

  let dragging = false;

  function setPos(x) {
    const rect = slider.getBoundingClientRect();
    let pct = (x - rect.left) / rect.width;
    pct = Math.min(Math.max(pct, 0.05), 0.95);
    after.style.width = (pct * 100) + '%';
    handle.style.left = (pct * 100) + '%';
    handle.style.transform = 'translateX(-50%)';
  }

  // Init at 50%
  after.style.width = '50%';
  handle.style.left = '50%';
  handle.style.transform = 'translateX(-50%)';
  handle.style.position = 'absolute';
  handle.style.top = '0';
  handle.style.height = '100%';
  handle.style.display = 'flex';
  handle.style.flexDirection = 'column';
  handle.style.alignItems = 'center';
  handle.style.justifyContent = 'center';
  handle.style.width = '3px';
  handle.style.pointerEvents = 'all';
  handle.style.cursor = 'col-resize';
  handle.style.zIndex = '10';

  slider.addEventListener('mousedown', e => { dragging = true; setPos(e.clientX); });
  window.addEventListener('mousemove', e => { if (dragging) setPos(e.clientX); });
  window.addEventListener('mouseup', () => dragging = false);

  slider.addEventListener('touchstart', e => { dragging = true; setPos(e.touches[0].clientX); }, { passive: true });
  window.addEventListener('touchmove', e => { if (dragging) setPos(e.touches[0].clientX); }, { passive: true });
  window.addEventListener('touchend', () => dragging = false);
})();

// ── TESTIMONIAL SLIDER ──
let testiIdx = 0;
function changeTesti(dir) {
  const cards = document.querySelectorAll('.testi-card');
  const dots = document.querySelectorAll('#testiDots .dot');
  if (!cards.length) return;
  cards[testiIdx].classList.remove('active');
  if (dots[testiIdx]) dots[testiIdx].classList.remove('active');
  testiIdx = (testiIdx + dir + cards.length) % cards.length;
  cards[testiIdx].classList.add('active');
  if (dots[testiIdx]) dots[testiIdx].classList.add('active');
}
// Auto-rotate
setInterval(() => changeTesti(1), 5000);

// ── FAQ ACCORDION ──
document.querySelectorAll('.faq-q').forEach(q => {
  q.addEventListener('click', () => {
    const item = q.parentElement;
    item.classList.toggle('open');
  });
});

// ── SCROLL FADE-IN ──
const faders = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });
faders.forEach(el => observer.observe(el));

// ── PROJECT FILTER (projects.html) ──
const filterBtns = document.querySelectorAll('.filter-btn');
const projCards = document.querySelectorAll('.proj-card');
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const cat = btn.dataset.cat;
    projCards.forEach(card => {
      card.style.display = (cat === 'all' || card.dataset.cat === cat) ? 'block' : 'none';
    });
  });
});

// ── FORM SUBMIT PLACEHOLDER ──
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('.btn-submit');
    btn.textContent = '✅ Message Sent! We\'ll call you soon.';
    btn.style.background = '#1a4a2e';
    setTimeout(() => {
      btn.textContent = 'Send Message';
      btn.style.background = '';
      contactForm.reset();
    }, 4000);
  });
}
