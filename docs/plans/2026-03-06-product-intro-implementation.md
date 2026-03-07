# Product Intro Redesign — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Transform the operator training slide deck into a product introduction presentation for investors and customers.

**Architecture:** Edit `training.html` in place — remove excluded slides/quizzes/exercises/completion, rewrite copy. Simplify `training.js` to pure slide navigation. Replace `index.html` with redirect. Update README.

**Tech Stack:** HTML, CSS, vanilla JavaScript (no dependencies)

---

### Task 1: Strip training.html — Remove quizzes, exercises, completion slide

**Files:**
- Modify: `training.html`

**Step 1: Delete all quiz slides**

Remove these slide blocks (each starts with `<div class="slide slide-quiz"` and ends with `</div>`):
- Slides 20–23 (Quiz — Modules 1 & 2, 4 slides)
- Slides 31–34 (Quiz — Safety, 4 slides)
- Slides 40–42 (Quiz — Operation Modes, 3 slides)
- Slides 56–60 (Quiz — Modules 5–7, 5 slides)

**Step 2: Delete all exercise slides**

Remove these slide blocks (each starts with `<div class="slide slide-exercise"`):
- Slide 35 (Live Exercise I)
- Slide 47 (Live Exercise II)
- Slide 61 (Live Exercise III)

**Step 3: Delete the completion slide**

Remove the slide block starting with `<div class="slide slide-completion" data-slide="62">` through its closing `</div>`.

**Step 4: Delete the training plan slide**

Remove slide 2 (`<div class="slide slide-content" data-slide="2">`) — the "Training Plan" slide listing 7 modules.

**Step 5: Commit**

```bash
git add training.html
git commit -m "Remove quizzes, exercises, completion, and training plan slides"
```

---

### Task 2: Strip training.html — Remove excluded content slides

**Files:**
- Modify: `training.html`

**Step 1: Delete excluded slides**

Remove these slide blocks:
- Slide 12: "System Components Overview" (`data-slide="12"`)
- Slide 13: "Key Components" — contains Duck/Unloading Robot + Safety Fence & Cart (`data-slide="13"`)
- Slide 18: "Gripper & KUKA Arm" (`data-slide="18"`)
- Slide 29: "The 6 E-Stops" (`data-slide="29"`)

Also remove these module title slides that now have no content following them:
- Slide 11: Module 2 title "Duck System Architecture" (`data-slide="11" data-module="2"`) — keep slides 14–17 (real-life scene, videos, conveyor flow) but they no longer need a module title

**Step 2: Delete slide 28 "KUKA Arm & High Voltage"**

This contains both KUKA Arm Safety and High Voltage details. We'll rewrite this content in the reframing task as a single "Industrial-Grade Safety Design" slide instead.

**Step 3: Commit**

```bash
git add training.html
git commit -m "Remove excluded component detail and safety slides"
```

---

### Task 3: Renumber slides and update title

**Files:**
- Modify: `training.html`

**Step 1: Renumber all remaining slides sequentially**

After removal, renumber all `data-slide="N"` attributes from 1 to the final count (~30). Update the slide counter in the bottom bar (`1 / 30`).

**Step 2: Update the page title**

Change `<title>Training — Contoro Operator Training</title>` to `<title>Contoro Duck — Product Introduction</title>`.

**Step 3: Commit**

```bash
git add training.html
git commit -m "Renumber slides sequentially and update page title"
```

---

### Task 4: Rewrite slide copy — Welcome and product framing

**Files:**
- Modify: `training.html`

**Step 1: Rewrite the welcome slide (slide 1)**

Change from:
```html
<div class="module-badge">Level I Certification</div>
<h1>The <span>Duck</span> Camp</h1>
<p>Training Program for Level I Duck Operators</p>
```

To:
```html
<div class="module-badge">Product Introduction</div>
<h1>The Dock <span>Duck</span></h1>
<p>Autonomous Trailer Unloading Robot by Contoro</p>
```

**Step 2: Remove all `data-module` attributes**

These were for training module tracking. Remove `data-module="N"` from all remaining slides.

**Step 3: Rewrite remaining module title slides**

Change module title slides to section headers without module numbers:
- Module 3 title → section title: "Safety & Reliability"
- Module 4 title → section title: "Operational Intelligence"
- Module 5 title → section title: "Deployment"
- Module 6 title → section title: "Cloud Control Interface"
- Module 7 title → section title: "Operation Workflow"

Remove `<div class="module-badge">Module N</div>` from each, or change to a descriptive badge.

**Step 4: Commit**

```bash
git add training.html
git commit -m "Rewrite welcome slide and section titles for product intro"
```

---

### Task 5: Rewrite slide copy — Safety slides reframing

**Files:**
- Modify: `training.html`

**Step 1: Rewrite safety overview slide (was slide 25)**

Change heading from "Why Safety Matters" to "Built for Safety".

Change copy from training warnings to product features:
```html
<h2>Built for Safety</h2>
<p>The Duck is designed with multiple layers of industrial safety:</p>
<ol>
  <li><strong>High Voltage Isolation</strong> — Fully enclosed 480V power system with safety interlocks</li>
  <li><strong>Protected Moving Parts</strong> — Conveyors and drive mechanisms behind safety barriers</li>
  <li><strong>Controlled Robotic Arm</strong> — KUKA arm with multi-zone safety monitoring</li>
</ol>
```

**Step 2: Rewrite safety features slide (was slide 26)**

Change heading from "Things to Pay Attention To" to "Comprehensive Safety Features".

Reframe as capabilities:
```html
<h2>Comprehensive Safety Features</h2>
<ol>
  <li><strong>Status Indicator Light</strong> — Clear visual status for operational awareness</li>
  <li><strong>KUKA Arm Monitoring</strong> — Real-time force and position monitoring</li>
  <li><strong>Electrical Safety</strong> — Fully enclosed panels with lockout/tagout</li>
  <li><strong>Environmental Awareness</strong> — Designed for busy warehouse environments</li>
  <li><strong>6 Emergency Stops</strong> — Redundant E-stops throughout the system</li>
</ol>
```

**Step 3: Rewrite container situations slide (was slide 30)**

Change heading from "Container Unloading Situations" to "Smart Exception Handling".

Reframe:
```html
<h2>Smart Exception Handling</h2>
<p>The Duck handles edge cases with built-in response protocols:</p>
<ol>
  <li><strong>Collision Detection</strong> — Immediate stop on unexpected contact</li>
  <li><strong>Stall Recovery</strong> — Automatic reporting and remote support integration</li>
  <li><strong>Zone Monitoring</strong> — Instant shutdown if unauthorized entry detected</li>
  <li><strong>Anomaly Response</strong> — Immediate halt on unexpected movement patterns</li>
</ol>
```

**Step 4: Rewrite E-stop during unloading slide (was slide 55)**

Change heading from "When to Press E-Stop During Unloading" to "Fail-Safe Operation".

Reframe:
```html
<h2>Fail-Safe Operation</h2>
<p>Multiple layers of protection ensure safe operation at all times:</p>
<ol>
  <li><strong>Collision Protection</strong> — Automatic stop on any unexpected contact</li>
  <li><strong>Incident Protocols</strong> — Built-in reporting and escalation workflows</li>
  <li><strong>Access Control</strong> — Zone-based safety interlocks prevent unauthorized access</li>
</ol>
```

**Step 5: Commit**

```bash
git add training.html
git commit -m "Reframe safety slides as product strengths"
```

---

### Task 6: Rewrite slide copy — Operations and UI slides reframing

**Files:**
- Modify: `training.html`

**Step 1: Rewrite robot status modes slide (was slide 37)**

Change intro paragraph from "The Duck has four states, indicated by the Status Indicator Light:" to "Four clear operational states provide intuitive system awareness:".

**Step 2: Rewrite setup procedure slide (was slide 44)**

Change heading from "Setup Procedure" to "Quick Deployment".
Change intro from "Before unloading, you must set up the following components in order:" to "The Duck deploys in four simple steps:".

**Step 3: Rewrite teardown procedure slide (was slide 46)**

Change heading from "Teardown Procedure" to "Easy Teardown".
Change intro from "After unloading is complete, tear down in reverse order:" to "Teardown is just as simple — reverse the four steps:".

**Step 4: Rewrite Cloud UI slides**

- UI Overview (was slide 49): Change intro from "The Cloud UI runs in a browser on the Safety Cart laptop. It's your primary interface for monitoring and controlling the Duck." to "A cloud-based control interface provides real-time monitoring and control from any browser."
- Health & Portal (was slide 51): Change heading from "Health & Portal Tabs" to "Real-Time Monitoring & 3D Visualization"
- Incident Reporting (was slide 52): Change heading from "Incident Reporting" to "Built-in Incident Tracking"

**Step 5: Rewrite operation workflow slide (was slide 54)**

Change heading from "Full Operation Workflow" to "Simple 6-Step Operation".
Change intro to "Operating the Duck is straightforward:".

**Step 6: Commit**

```bash
git add training.html
git commit -m "Reframe operations and UI slides for product intro"
```

---

### Task 7: Simplify training.js — Remove quiz logic

**Files:**
- Modify: `js/training.js`

**Step 1: Rewrite training.js**

Replace the entire file with a simplified version that only handles:
- Slide navigation (goToSlide, nextSlide, prevSlide)
- Keyboard navigation (arrow keys, spacebar)
- Progress bar updates
- Video pause on slide change
- LocalStorage resume support

Remove all of:
- `quizAnswers` state and quiz-related localStorage
- `checkQuizSlide()` function
- `renderResults()` function
- `retakeTraining()` function
- Quiz slide radio button event listeners
- Quiz blocking logic in `nextSlide()` and `updateNav()`

The simplified file should be approximately:

```javascript
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
```

**Step 2: Commit**

```bash
git add js/training.js
git commit -m "Simplify slide engine: remove quiz logic, keep navigation"
```

---

### Task 8: Clean up training.css — Remove quiz and exercise styles

**Files:**
- Modify: `css/training.css`

**Step 1: Remove quiz styles**

Delete everything from `/* ── Quiz Slide ── */` through `.quiz-feedback-msg.incorrect { ... }` (lines 287–397).

**Step 2: Remove completion slide styles**

Delete everything from `/* ── Completion Slide ── */` through `.completion-actions a:hover, .completion-actions button:hover { ... }` (lines 399–479).

**Step 3: Remove exercise slide styles**

Delete everything from `/* Exercise Slide */` through `.slide-exercise p { ... }` (lines 263–285).

**Step 4: Commit**

```bash
git add css/training.css
git commit -m "Remove quiz, exercise, and completion CSS"
```

---

### Task 9: Replace index.html with redirect

**Files:**
- Modify: `index.html`

**Step 1: Replace index.html contents**

Replace the entire file with a simple redirect:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="refresh" content="0;url=training.html">
  <title>Contoro Duck — Product Introduction</title>
</head>
<body>
  <p>Redirecting to <a href="training.html">presentation</a>...</p>
</body>
</html>
```

**Step 2: Commit**

```bash
git add index.html
git commit -m "Replace index.html with redirect to presentation"
```

---

### Task 10: Update bottom bar

**Files:**
- Modify: `training.html`

**Step 1: Remove "Overview" link from bottom bar**

Change the bottom bar's `bar-left` section. Remove the `<a href="index.html" class="bar-home">← Overview</a>` link since there's no separate overview page anymore. Replace with the Contoro logo or just leave empty.

```html
<div class="bar-left">
  <span class="bar-home">Contoro</span>
</div>
```

**Step 2: Commit**

```bash
git add training.html
git commit -m "Update bottom bar: remove overview link"
```

---

### Task 11: Update README.md

**Files:**
- Modify: `README.md`

**Step 1: Rewrite README**

```markdown
# Contoro Duck — Product Introduction

Slide-based product introduction for the Contoro Dock Duck, an Autonomous Trailer Unloading Robot. Designed for investors and customers.

## Viewing

Open `training.html` in a browser, or serve locally:

\`\`\`bash
python3 -m http.server 8080
# Open http://localhost:8080
\`\`\`

Navigate with arrow keys, spacebar, or the on-screen buttons.

## What's Covered

- What the Duck does and why it matters
- Real-life unloading demos (video)
- Operating specs and site requirements
- Safety and reliability features
- Operational modes and deployment workflow
- Cloud-based control interface

## Project Structure

\`\`\`
├── index.html              # Redirects to training.html
├── training.html           # Slide presentation (~30 slides)
├── css/
│   └── training.css        # Presentation styles
├── js/
│   └── training.js         # Slide navigation engine
├── assets/
│   ├── images/             # Product images (27 files)
│   └── videos/             # Demo videos (7 mp4 files)
└── README.md
\`\`\`

## Features

- Fullscreen slide presentation with keyboard navigation
- Embedded demo videos
- Progress bar and slide counter
- Resume support (picks up where you left off)
- Responsive design — works on desktop and tablet
- Zero dependencies — pure HTML, CSS, JavaScript

## Hosting

Static site — deploy to GitHub Pages, Netlify, Vercel, S3, or any web server.
```

**Step 2: Commit**

```bash
git add README.md
git commit -m "Rewrite README for product introduction site"
```

---

### Task 12: Test and verify

**Step 1: Open training.html in browser**

Verify:
- All ~30 slides display correctly and in order
- No quiz, exercise, or completion slides appear
- All videos play
- All images load
- Navigation (prev/next buttons, arrow keys, spacebar) works
- Progress bar updates correctly
- Slide counter shows correct total
- Copy reads naturally as product intro, not training

**Step 2: Open index.html in browser**

Verify it redirects to training.html.

**Step 3: Final commit if any fixes needed**

```bash
git add -A
git commit -m "Fix any issues found during testing"
```

---

### Task 13: Push to mokcontoro remote

**Step 1: Push all commits**

```bash
git push mokcontoro main
```
