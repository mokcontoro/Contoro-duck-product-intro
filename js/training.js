// ── State ──
const STORAGE_KEY = 'contoro_slide_state';
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;
let currentSlide = 1;

function getState() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; } catch { return {}; }
}

function saveState(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// ── Navigation ──
function goToSlide(n) {
  if (n < 1 || n > totalSlides) return;

  const currentEl = document.querySelector(`.slide[data-slide="${currentSlide}"]`);
  if (currentEl) {
    const vid = currentEl.querySelector('video');
    if (vid) vid.pause();
  }

  currentSlide = n;
  slides.forEach(s => s.classList.remove('active'));
  const target = document.querySelector(`.slide[data-slide="${n}"]`);
  if (target) target.classList.add('active');

  updateNav();
  saveState({ currentSlide });
}

function nextSlide() { goToSlide(currentSlide + 1); }
function prevSlide() { goToSlide(currentSlide - 1); }

function updateNav() {
  document.getElementById('prevBtn').disabled = currentSlide <= 1;
  document.getElementById('nextBtn').disabled = currentSlide >= totalSlides;
  document.getElementById('slideCounter').textContent = `${currentSlide} / ${totalSlides}`;
  document.getElementById('barProgress').style.width = ((currentSlide / totalSlides) * 100) + '%';
}

// ── Keyboard ──
document.addEventListener('keydown', e => {
  if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); nextSlide(); }
  else if (e.key === 'ArrowLeft') { e.preventDefault(); prevSlide(); }
});

// ── Init ──
goToSlide(getState().currentSlide || 1);
