# Contoro Duck — Product Introduction

Slide-based product introduction for the Contoro Duck, an Autonomous Trailer Unloading Robot. Designed for investors and customers.

## Running

Requires Node.js. Install dependencies and start the server:

```bash
npm install
npm start
# Server runs on http://localhost:3000
```

Presentations are accessed via org-specific URLs (e.g., `/bosch-a1b2c3/start`). Direct access to `training.html` is blocked — visitors must go through a landing page.

Navigate slides with arrow keys, spacebar, or the on-screen buttons.

## What's Covered (28 slides)

- What the Contoro Duck does and why it matters
- Real-life unloading demos (video)
- Operating specs and site requirements
- Safety and reliability features
- Operational modes and deployment workflow
- Cloud-based control interface
- Q&A / contact slide

## Admin Dashboard

Access at `/admin` (password-protected). Manage org-specific presentation links:

- Create links with org name, expiration date, and optional welcome message
- Edit or delete existing links
- Auto-generated URL slugs
- Expired links show a dedicated expiry page

## Project Structure

```
├── server.js               # Express server with routes and auth
├── server/
│   ├── auth.js             # Admin authentication
│   ├── db.js               # SQLite database (better-sqlite3)
│   └── views.js            # HTML templates (landing, admin, etc.)
├── data/
│   └── links.db            # SQLite database (auto-created)
├── training.html           # Slide presentation (28 slides)
├── index.html              # Redirect to training.html
├── css/
│   └── training.css        # Presentation styles
├── js/
│   └── training.js         # Slide navigation engine
├── assets/
│   ├── images/             # Product images
│   └── videos/             # Demo videos
├── package.json
└── README.md
```

## Features

- Fullscreen slide presentation with keyboard navigation
- Embedded demo videos
- Progress bar and slide counter
- Resume support (picks up where you left off)
- Responsive design — works on desktop and tablet
- Org-specific landing pages with custom welcome messages
- Link expiration with automatic expiry pages
- Admin dashboard for link management

## Dependencies

- [Express](https://expressjs.com/) — web server and routing
- [express-session](https://www.npmjs.com/package/express-session) — admin session management
- [better-sqlite3](https://www.npmjs.com/package/better-sqlite3) — SQLite database

## Hosting

Requires a Node.js server. Deploy to any platform that supports Node.js (Railway, Render, VPS, etc.).
