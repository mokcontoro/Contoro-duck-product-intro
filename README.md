# Contoro Duck — Product Introduction

Slide-based product introduction for the Contoro Duck, an Autonomous Trailer Unloading Robot. Designed for investors and customers.

## Viewing

Open `training.html` in a browser, or serve locally:

```bash
python3 -m http.server 8080
# Open http://localhost:8080
```

Navigate with arrow keys, spacebar, or the on-screen buttons.

## What's Covered

- What the Contoro Duck does and why it matters
- Real-life unloading demos (video)
- Operating specs and site requirements
- Safety and reliability features
- Operational modes and deployment workflow
- Cloud-based control interface

## Project Structure

```
├── index.html              # Redirects to training.html
├── training.html           # Slide presentation (~35 slides)
├── css/
│   └── training.css        # Presentation styles
├── js/
│   └── training.js         # Slide navigation engine
├── assets/
│   ├── images/             # Product images
│   └── videos/             # Demo videos
└── README.md
```

## Features

- Fullscreen slide presentation with keyboard navigation
- Embedded demo videos
- Progress bar and slide counter
- Resume support (picks up where you left off)
- Responsive design — works on desktop and tablet
- Zero dependencies — pure HTML, CSS, JavaScript

## Hosting

Static site — deploy to GitHub Pages, Netlify, Vercel, S3, or any web server.
