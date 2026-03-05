# Contoro Operator Training — Level I

Interactive training website for Level I Duck Operators at Contoro Robotics. Covers safe operation of the Dock Duck, our Autonomous Trailer Unloading Robot.

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

Plus **3 live exercises** and **4 interactive quizzes** with instant grading (80% pass threshold).

## Project Structure

```
├── index.html              # Main training page
├── css/
│   └── style.css           # Styles and responsive layout
├── js/
│   └── script.js           # Quiz grading, progress tracking, navigation
├── assets/
│   ├── images/             # Training images (robot, UI screenshots, diagrams)
│   └── videos/             # Training videos (7 mp4 files)
└── README.md
```

## Running Locally

No build step required — just serve the files:

```bash
python3 -m http.server 8080
# Open http://localhost:8080
```

Or open `index.html` directly in a browser.

## Features

- **Progress tracking** — mark modules complete, persists in localStorage
- **Interactive quizzes** — multiple choice with instant feedback and scoring
- **Embedded videos** — 7 training videos covering operations and procedures
- **Responsive design** — sidebar navigation, works on desktop and tablet
- **Zero dependencies** — pure HTML, CSS, and JavaScript

## Hosting

Static site — deploy to any web server, S3 bucket, GitHub Pages, Netlify, Vercel, etc. No server-side code required.
