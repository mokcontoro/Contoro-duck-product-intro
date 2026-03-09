const express = require('express');
const path = require('path');
const session = require('express-session');
const { initDb, getAllLinks, getLinkBySlug, createLink, updateLink, deleteLink } = require('./server/db');
const { requireAuth } = require('./server/auth');
const views = require('./server/views');

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize database
initDb();

// Parse form bodies
app.use(express.urlencoded({ extended: false }));

// Session middleware
app.use(session({
  secret: process.env.SESSION_SECRET || 'dev-secret-change-me',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 24 * 60 * 60 * 1000 } // 24 hours
}));

// Block direct access to training.html and index.html
app.get('/training.html', (req, res) => res.status(404).send(views.notFoundPage()));
app.get('/index.html', (req, res) => res.status(404).send(views.notFoundPage()));

// Static files (css, js, assets, images) — no index serving
app.use(express.static(path.join(__dirname), {
  index: false,
  extensions: []
}));

// ── Admin Routes ──

app.get('/admin', (req, res) => {
  if (!req.session.authenticated) {
    return res.send(views.loginPage());
  }
  const links = getAllLinks();
  res.send(views.dashboardPage(links));
});

app.post('/admin/login', (req, res) => {
  const { password } = req.body;
  if (password === process.env.ADMIN_PASSWORD) {
    req.session.authenticated = true;
    return res.redirect('/admin');
  }
  res.send(views.loginPage('Invalid password'));
});

app.get('/admin/logout', (req, res) => {
  req.session.destroy(() => res.redirect('/admin'));
});

app.post('/admin/links', requireAuth, (req, res) => {
  const { slug, org_name, expires_at, notes } = req.body;
  try {
    createLink({ slug, org_name, expires_at, notes: notes || '' });
  } catch (err) {
    const links = getAllLinks();
    return res.send(views.dashboardPage(links, `Error: ${err.message}`));
  }
  res.redirect('/admin');
});

app.get('/admin/links/:id/edit', requireAuth, (req, res) => {
  const links = getAllLinks();
  const link = links.find(l => l.id === Number(req.params.id));
  if (!link) return res.redirect('/admin');
  res.send(views.editPage(link));
});

app.post('/admin/links/:id/edit', requireAuth, (req, res) => {
  const { org_name, expires_at, notes } = req.body;
  try {
    updateLink(Number(req.params.id), { org_name, expires_at, notes: notes || '' });
  } catch (err) {
    return res.status(400).send(err.message);
  }
  res.redirect('/admin');
});

app.post('/admin/links/:id/delete', requireAuth, (req, res) => {
  deleteLink(Number(req.params.id));
  res.redirect('/admin');
});

// ── Org Slug Route (must be last) ──

app.get('/', (req, res) => {
  res.send(views.notFoundPage());
});

app.get('/:slug', (req, res) => {
  const link = getLinkBySlug(req.params.slug);
  if (!link) {
    return res.status(404).send(views.notFoundPage());
  }

  const now = new Date().toISOString().slice(0, 10);
  if (link.expires_at < now) {
    return res.status(410).send(views.expiredPage(link.org_name));
  }

  res.sendFile(path.join(__dirname, 'training.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
