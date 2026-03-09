const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');

const DATA_DIR = path.join(__dirname, '..', 'data');
const DB_PATH = path.join(DATA_DIR, 'links.db');

let db;

function initDb() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  db = new Database(DB_PATH);
  db.pragma('journal_mode = WAL');

  db.exec(`
    CREATE TABLE IF NOT EXISTS org_links (
      id          INTEGER PRIMARY KEY AUTOINCREMENT,
      slug        TEXT NOT NULL UNIQUE,
      org_name    TEXT NOT NULL,
      expires_at  TEXT NOT NULL,
      created_at  TEXT NOT NULL DEFAULT (datetime('now')),
      notes       TEXT DEFAULT '',
      welcome_message TEXT DEFAULT ''
    )
  `);

  // Migration: add welcome_message column if missing (SQLite has no IF NOT EXISTS for columns)
  try {
    db.exec(`ALTER TABLE org_links ADD COLUMN welcome_message TEXT DEFAULT ''`);
  } catch (_) {
    // Column already exists
  }
}

function getAllLinks() {
  return db.prepare('SELECT * FROM org_links ORDER BY created_at DESC').all();
}

function getLinkBySlug(slug) {
  return db.prepare('SELECT * FROM org_links WHERE slug = ?').get(slug);
}

function generateSlug(orgName) {
  const base = orgName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+$/, '');
  const random = crypto.randomBytes(3).toString('hex');
  return `${base}-${random}`;
}

function createLink({ org_name, expires_at, notes, welcome_message }) {
  const slug = generateSlug(org_name);
  return db.prepare(
    'INSERT INTO org_links (slug, org_name, expires_at, notes, welcome_message) VALUES (?, ?, ?, ?, ?)'
  ).run(slug, org_name, expires_at, notes || '', welcome_message || '');
}

function updateLink(id, { org_name, expires_at, notes, welcome_message }) {
  return db.prepare(
    'UPDATE org_links SET org_name = ?, expires_at = ?, notes = ?, welcome_message = ? WHERE id = ?'
  ).run(org_name, expires_at, notes || '', welcome_message || '', id);
}

function deleteLink(id) {
  return db.prepare('DELETE FROM org_links WHERE id = ?').run(id);
}

module.exports = { initDb, getAllLinks, getLinkBySlug, createLink, updateLink, deleteLink };
