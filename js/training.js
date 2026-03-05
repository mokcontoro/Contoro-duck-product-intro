// ── State ──
const STORAGE_KEY = 'contoro_training_state';
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;
let currentSlide = 1;
let quizAnswers = {}; // { slideNum: { answered: bool, correct: bool, quizId, qIndex } }

function getState() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; } catch { return {}; }
}

function saveState(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// ── Navigation ──
function goToSlide(n) {
  if (n < 1 || n > totalSlides) return;

  // Pause any playing videos on current slide
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
  saveProgress();

  // If completion slide, render results
  if (target && target.classList.contains('slide-completion')) {
    renderResults();
  }
}

function nextSlide() {
  // Block if quiz not answered
  const current = document.querySelector(`.slide[data-slide="${currentSlide}"]`);
  if (current && current.classList.contains('slide-quiz') && !quizAnswers[currentSlide]?.answered) {
    return;
  }
  goToSlide(currentSlide + 1);
}

function prevSlide() {
  goToSlide(currentSlide - 1);
}

function updateNav() {
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const counter = document.getElementById('slideCounter');
  const progress = document.getElementById('barProgress');

  prevBtn.disabled = currentSlide <= 1;
  nextBtn.disabled = currentSlide >= totalSlides;

  // Block next on unanswered quiz
  const current = document.querySelector(`.slide[data-slide="${currentSlide}"]`);
  if (current && current.classList.contains('slide-quiz') && !quizAnswers[currentSlide]?.answered) {
    nextBtn.disabled = true;
  }

  counter.textContent = `${currentSlide} / ${totalSlides}`;
  progress.style.width = ((currentSlide / totalSlides) * 100) + '%';
}

function saveProgress() {
  const state = getState();
  state.currentSlide = currentSlide;
  if (!state.furthest || currentSlide > state.furthest) {
    state.furthest = currentSlide;
  }
  state.quizAnswers = quizAnswers;
  saveState(state);
}

// ── Keyboard Navigation ──
document.addEventListener('keydown', e => {
  if (e.key === 'ArrowRight' || e.key === ' ') {
    e.preventDefault();
    nextSlide();
  } else if (e.key === 'ArrowLeft') {
    e.preventDefault();
    prevSlide();
  }
});

// ── Quiz Logic ──

// Enable check button when an option is selected
document.querySelectorAll('.slide-quiz').forEach(slide => {
  const radios = slide.querySelectorAll('input[type="radio"]');
  const checkBtn = slide.querySelector('.quiz-check-btn');

  radios.forEach(r => {
    r.addEventListener('change', () => {
      checkBtn.disabled = false;
      // Highlight selected
      slide.querySelectorAll('.quiz-opt').forEach(o => o.classList.remove('selected'));
      r.closest('.quiz-opt').classList.add('selected');
    });
  });
});

function checkQuizSlide(slideNum) {
  const slide = document.querySelector(`.slide[data-slide="${slideNum}"]`);
  if (!slide) return;

  const correctVal = slide.dataset.correct;
  const selected = slide.querySelector('input[type="radio"]:checked');
  if (!selected) return;

  const isCorrect = selected.value === correctVal;
  const quizId = slide.dataset.quiz;
  const qIndex = parseInt(slide.dataset.q);
  const feedback = slide.querySelector('.quiz-feedback-msg');
  const options = slide.querySelectorAll('.quiz-opt');
  const checkBtn = slide.querySelector('.quiz-check-btn');

  // Mark correct/incorrect
  options.forEach(o => {
    const radio = o.querySelector('input[type="radio"]');
    o.classList.remove('selected');
    if (radio.value === correctVal) {
      o.classList.add('correct');
    } else if (radio.checked && !isCorrect) {
      o.classList.add('incorrect');
    }
    radio.disabled = true;
  });

  checkBtn.disabled = true;
  checkBtn.style.display = 'none';

  if (isCorrect) {
    feedback.textContent = 'Correct!';
    feedback.className = 'quiz-feedback-msg show correct';
  } else {
    feedback.textContent = 'Incorrect — the correct answer is highlighted.';
    feedback.className = 'quiz-feedback-msg show incorrect';
  }

  quizAnswers[slideNum] = { answered: true, correct: isCorrect, quizId, qIndex };
  updateNav();
  saveProgress();
}

// ── Results ──
function renderResults() {
  const quizzes = {
    quiz12: { label: 'Modules 1 & 2', total: 4, correct: 0 },
    quiz3:  { label: 'Module 3 — Safety', total: 4, correct: 0 },
    quiz4:  { label: 'Module 4 — Modes', total: 3, correct: 0 },
    quiz567:{ label: 'Modules 5–7', total: 5, correct: 0 },
  };

  // Tally answers
  for (const [slideNum, ans] of Object.entries(quizAnswers)) {
    if (ans.correct && quizzes[ans.quizId]) {
      quizzes[ans.quizId].correct++;
    }
  }

  const table = document.getElementById('resultsTable');
  // Clear existing rows except header
  while (table.rows.length > 1) table.deleteRow(1);

  let totalCorrect = 0;
  let totalQuestions = 0;

  for (const [id, q] of Object.entries(quizzes)) {
    const pct = Math.round((q.correct / q.total) * 100);
    const passed = pct >= 80;
    totalCorrect += q.correct;
    totalQuestions += q.total;

    const row = table.insertRow();
    row.innerHTML = `
      <td>${q.label}</td>
      <td>${q.correct} / ${q.total} (${pct}%)</td>
      <td class="${passed ? 'pass-yes' : 'pass-no'}">${passed ? 'PASS' : 'FAIL'}</td>
    `;
  }

  const overallPct = Math.round((totalCorrect / totalQuestions) * 100);
  const overallPass = overallPct >= 80;
  const result = document.getElementById('overallResult');
  result.textContent = `Overall: ${totalCorrect}/${totalQuestions} (${overallPct}%) — ${overallPass ? 'PASSED' : 'DID NOT PASS'}`;
  result.className = `overall-result ${overallPass ? 'pass' : 'fail'}`;

  // Save completion
  const state = getState();
  state.completed = true;
  state.overallScore = { correct: totalCorrect, total: totalQuestions, pct: overallPct, passed: overallPass };
  state.quizScores = {};
  for (const [id, q] of Object.entries(quizzes)) {
    state.quizScores[id] = { correct: q.correct, total: q.total, pct: Math.round((q.correct / q.total) * 100) };
  }
  saveState(state);
}

function retakeTraining() {
  localStorage.removeItem(STORAGE_KEY);
  quizAnswers = {};
  // Reset all quiz slides
  document.querySelectorAll('.slide-quiz').forEach(slide => {
    slide.querySelectorAll('input[type="radio"]').forEach(r => {
      r.checked = false;
      r.disabled = false;
    });
    slide.querySelectorAll('.quiz-opt').forEach(o => {
      o.classList.remove('correct', 'incorrect', 'selected');
    });
    const btn = slide.querySelector('.quiz-check-btn');
    btn.disabled = true;
    btn.style.display = '';
    const fb = slide.querySelector('.quiz-feedback-msg');
    fb.className = 'quiz-feedback-msg';
    fb.textContent = '';
  });
  goToSlide(1);
}

// ── Init ──
(function init() {
  const state = getState();

  // Restore quiz answers
  if (state.quizAnswers) {
    quizAnswers = state.quizAnswers;
    // Re-apply quiz visual states
    for (const [slideNum, ans] of Object.entries(quizAnswers)) {
      if (!ans.answered) continue;
      const slide = document.querySelector(`.slide[data-slide="${slideNum}"]`);
      if (!slide) continue;
      const correctVal = slide.dataset.correct;
      slide.querySelectorAll('.quiz-opt').forEach(o => {
        const radio = o.querySelector('input[type="radio"]');
        if (radio.value === correctVal) o.classList.add('correct');
        radio.disabled = true;
      });
      // Check the previously selected answer
      const radios = slide.querySelectorAll('input[type="radio"]');
      radios.forEach(r => {
        // We don't store which was selected, but we know if it was correct
        // Just disable them; correct answer is highlighted
      });
      const btn = slide.querySelector('.quiz-check-btn');
      btn.style.display = 'none';
      const fb = slide.querySelector('.quiz-feedback-msg');
      fb.textContent = ans.correct ? 'Correct!' : 'Incorrect — the correct answer is highlighted.';
      fb.className = `quiz-feedback-msg show ${ans.correct ? 'correct' : 'incorrect'}`;
    }
  }

  // Resume from last position
  const startSlide = state.currentSlide || 1;
  goToSlide(startSlide);
})();
