# Contoro Operator Training — Level I

Interactive training website for Level I Duck Operators at Contoro Robotics. Covers safe operation of the Dock Duck, our Autonomous Trailer Unloading Robot.

## Pages

### Overview (`index.html`)
Scrollable reference page with sidebar navigation covering all 7 modules, embedded videos, and images. Use this to browse training content at a glance.

### Training (`training.html`)
Fullscreen, slide-based training experience (61 slides). Progresses through all modules in order with quizzes embedded at key checkpoints. Tracks quiz performance and displays results on a completion slide.

## Modules

| # | Module | Topics |
|---|--------|--------|
| 1 | Contoro at a Glance | What the Duck does, capabilities, operating limits |
| 2 | Duck System Architecture | Components, conveyors, gripper, KUKA arm |
| 3 | Safety & Risk Awareness | High voltage, E-stops, status lights, incident response |
| 4 | Operation Modes & Behaviors | Red/Blue/Yellow/Green states, manual driving |
| 5 | Setup & Teardown | Step-by-step setup and teardown procedures |
| 6 | Cloud UI | Controls, Health, Portal, Incidents, Maintenance tabs |
| 7 | Operating the Duck | Full operation workflow from setup to teardown |

Plus **3 live exercises** and **4 quizzes** (16 questions total, 80% to pass).

## Project Structure

```
├── index.html              # Overview page (scrollable reference)
├── training.html           # Training page (fullscreen slide presentation)
├── css/
│   ├── style.css           # Overview page styles
│   └── training.css        # Training page styles
├── js/
│   ├── script.js           # Overview page navigation
│   └── training.js         # Slide engine, quiz logic, performance tracking
├── assets/
│   ├── images/             # Training images (27 files)
│   └── videos/             # Training videos (7 mp4 files)
└── README.md
```

## Running Locally

No build step required — just serve the files:

```bash
python3 -m http.server 8080
# Overview:  http://localhost:8080/index.html
# Training:  http://localhost:8080/training.html
```

## Features

- **Slide-based training** — fullscreen presentation with prev/next navigation and keyboard support (arrow keys, spacebar)
- **Interactive quizzes** — must answer each question before proceeding; instant correct/incorrect feedback
- **Performance tracking** — per-quiz scores saved to localStorage; completion slide shows results table with pass/fail per quiz and overall score
- **Resume support** — training resumes where you left off; retake button to start fresh
- **Embedded videos** — 7 training videos covering operations and procedures
- **Responsive design** — works on desktop and tablet
- **Zero dependencies** — pure HTML, CSS, and JavaScript

## Hosting

Static site — deploy to any web server, S3 bucket, GitHub Pages, Netlify, Vercel, etc. No server-side code required.
