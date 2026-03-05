// ── Progress Tracking ──
const STORAGE_KEY = 'contoro_training_progress';
const TOTAL_MODULES = 7;

function getProgress() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch { return {}; }
}

function saveProgress(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function toggleComplete(moduleNum) {
  const progress = getProgress();
  const key = 'm' + moduleNum;
  progress[key] = !progress[key];
  saveProgress(progress);
  updateUI();
}

function updateUI() {
  const progress = getProgress();
  let completed = 0;

  for (let i = 1; i <= TOTAL_MODULES; i++) {
    const key = 'm' + i;
    const btn = document.querySelector(`.complete-btn[data-module="${i}"]`);
    const navLink = document.querySelector(`a[data-module="${i}"]`);

    if (progress[key]) {
      completed++;
      if (btn) {
        btn.textContent = 'Completed';
        btn.classList.add('completed');
      }
      if (navLink) navLink.classList.add('completed');
    } else {
      if (btn) {
        btn.textContent = 'Mark Complete';
        btn.classList.remove('completed');
      }
      if (navLink) navLink.classList.remove('completed');
    }
  }

  const pct = Math.round((completed / TOTAL_MODULES) * 100);
  const fill = document.getElementById('progressFill');
  if (fill) fill.style.width = pct + '%';
}

// ── Quiz Grading ──
function gradeQuiz(quizId) {
  const section = document.querySelector(`[data-quiz="${quizId}"]`);
  if (!section) return;

  const questions = section.querySelectorAll('.quiz-question');
  let correct = 0;
  let total = questions.length;
  let allAnswered = true;

  questions.forEach(q => {
    const correctVal = q.dataset.correct;
    const selected = q.querySelector('input[type="radio"]:checked');
    const feedback = q.querySelector('.quiz-feedback');
    const options = q.querySelectorAll('.quiz-option');

    // Reset styles
    options.forEach(o => {
      o.classList.remove('correct', 'incorrect');
    });

    if (!selected) {
      allAnswered = false;
      if (feedback) {
        feedback.textContent = 'Please select an answer.';
        feedback.className = 'quiz-feedback show incorrect';
      }
      return;
    }

    const isCorrect = selected.value === correctVal;

    if (isCorrect) {
      correct++;
      selected.closest('.quiz-option').classList.add('correct');
      if (feedback) {
        feedback.textContent = 'Correct!';
        feedback.className = 'quiz-feedback show correct';
      }
    } else {
      selected.closest('.quiz-option').classList.add('incorrect');
      // Highlight correct answer
      options.forEach(o => {
        const radio = o.querySelector('input[type="radio"]');
        if (radio && radio.value === correctVal) {
          o.classList.add('correct');
        }
      });
      if (feedback) {
        feedback.textContent = 'Incorrect — see the correct answer highlighted above.';
        feedback.className = 'quiz-feedback show incorrect';
      }
    }
  });

  if (!allAnswered) return;

  const pct = Math.round((correct / total) * 100);
  const passed = pct >= 80;
  const resultEl = document.getElementById('result-' + quizId);

  if (resultEl) {
    resultEl.textContent = `You scored ${correct}/${total} (${pct}%). ${passed ? 'Congratulations, you passed!' : 'You need 80% to pass. Please review the material and try again.'}`;
    resultEl.className = `quiz-result show ${passed ? 'pass' : 'fail'}`;
  }
}

// ── Active Nav Highlighting ──
function updateActiveNav() {
  const sections = document.querySelectorAll('section[id], .checkpoint[id], div[id]');
  const navLinks = document.querySelectorAll('.sidebar nav a');
  const scrollPos = window.scrollY + 120;

  let currentId = '';
  sections.forEach(section => {
    if (section.offsetTop <= scrollPos) {
      currentId = section.id;
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + currentId) {
      link.classList.add('active');
    }
  });
}

// ── Init ──
document.addEventListener('DOMContentLoaded', () => {
  updateUI();
  updateActiveNav();
});

window.addEventListener('scroll', updateActiveNav);

// Close mobile sidebar when a link is clicked
document.querySelectorAll('.sidebar nav a').forEach(link => {
  link.addEventListener('click', () => {
    document.querySelector('.sidebar').classList.remove('open');
  });
});
