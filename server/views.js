const THEME = {
  navy: '#0a1628',
  blue: '#1a73e8',
  lightBg: '#f0f4f8',
  white: '#ffffff',
  red: '#dc3545',
  green: '#28a745',
  yellow: '#ffc107',
  gray: '#6c757d',
};

function layout(title, body) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} — Contoro Duck</title>
  <link rel="icon" type="image/png" href="/assets/images/contoro-logo.png">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: ${THEME.lightBg}; color: ${THEME.navy}; min-height: 100vh; }
    .container { max-width: 900px; margin: 0 auto; padding: 2rem; }
    h1, h2 { margin-bottom: 1rem; }
    a { color: ${THEME.blue}; }
    .btn { display: inline-block; padding: 0.5rem 1.2rem; border: none; border-radius: 6px; cursor: pointer; font-size: 0.95rem; text-decoration: none; color: ${THEME.white}; }
    .btn-primary { background: ${THEME.blue}; }
    .btn-primary:hover { opacity: 0.9; }
    .btn-danger { background: ${THEME.red}; }
    .btn-danger:hover { opacity: 0.9; }
    .btn-sm { padding: 0.3rem 0.8rem; font-size: 0.85rem; }
    input, textarea { padding: 0.5rem; border: 1px solid #ccc; border-radius: 6px; font-size: 0.95rem; width: 100%; }
    input:focus, textarea:focus { outline: none; border-color: ${THEME.blue}; }
    table { width: 100%; border-collapse: collapse; margin-top: 1rem; }
    th, td { padding: 0.6rem 0.8rem; text-align: left; border-bottom: 1px solid #ddd; }
    th { background: ${THEME.navy}; color: ${THEME.white}; }
    .badge { display: inline-block; padding: 0.2rem 0.6rem; border-radius: 12px; font-size: 0.8rem; font-weight: 600; color: ${THEME.white}; }
    .badge-active { background: ${THEME.green}; }
    .badge-expired { background: ${THEME.red}; }
    .card { background: ${THEME.white}; border-radius: 12px; padding: 2rem; box-shadow: 0 2px 8px rgba(0,0,0,0.08); margin-bottom: 1.5rem; }
    .error { color: ${THEME.red}; margin-bottom: 1rem; font-weight: 600; }
    .form-group { margin-bottom: 1rem; }
    .form-group label { display: block; margin-bottom: 0.3rem; font-weight: 600; }
    .header { background: ${THEME.navy}; color: ${THEME.white}; padding: 1rem 2rem; display: flex; justify-content: space-between; align-items: center; }
    .header a { color: ${THEME.white}; text-decoration: none; }
    .center-page { display: flex; align-items: center; justify-content: center; min-height: 100vh; text-align: center; }
  </style>
</head>
<body>
${body}
</body>
</html>`;
}

function loginPage(error) {
  return layout('Admin Login', `
  <div class="center-page">
    <div class="card" style="width:360px;">
      <h2>Admin Login</h2>
      ${error ? `<p class="error">${error}</p>` : ''}
      <form method="POST" action="/admin/login">
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" name="password" required autofocus>
        </div>
        <button type="submit" class="btn btn-primary" style="width:100%;">Login</button>
      </form>
    </div>
  </div>`);
}

function dashboardPage(links, error) {
  const now = new Date().toISOString().slice(0, 10);
  const rows = links.map(l => {
    const expired = l.expires_at < now;
    const badge = expired
      ? `<span class="badge badge-expired">Expired</span>`
      : `<span class="badge badge-active">Active</span>`;
    return `<tr>
      <td>${esc(l.org_name)}</td>
      <td><code>/${esc(l.slug)}</code></td>
      <td>${esc(l.expires_at)}</td>
      <td>${badge}</td>
      <td>${esc(l.notes)}</td>
      <td>
        <a href="/admin/links/${l.id}/edit" class="btn btn-primary btn-sm">Edit</a>
        <form method="POST" action="/admin/links/${l.id}/delete" style="display:inline;" onsubmit="return confirm('Delete this link?')">
          <button type="submit" class="btn btn-danger btn-sm">Delete</button>
        </form>
      </td>
    </tr>`;
  }).join('');

  return layout('Admin Dashboard', `
  <div class="header">
    <strong>Contoro Duck — Admin</strong>
    <a href="/admin/logout">Logout</a>
  </div>
  <div class="container">
    ${error ? `<p class="error">${error}</p>` : ''}

    <div class="card">
      <h2>Create New Link</h2>
      <form method="POST" action="/admin/links" style="display:grid; grid-template-columns:1fr 1fr; gap:0.8rem; align-items:end;">
        <div class="form-group">
          <label for="org_name">Organization Name</label>
          <input type="text" id="org_name" name="org_name" placeholder="e.g. Bosch" required>
        </div>
        <div class="form-group">
          <label for="expires_at">Expires</label>
          <input type="date" id="expires_at" name="expires_at" required>
        </div>
        <div class="form-group" style="grid-column:1/3;">
          <label for="welcome_message">Welcome Message (optional)</label>
          <textarea id="welcome_message" name="welcome_message" rows="2" placeholder="Custom welcome message (leave blank for default)"></textarea>
        </div>
        <div class="form-group" style="grid-column:1/3;">
          <label for="notes">Notes (optional)</label>
          <input type="text" id="notes" name="notes" placeholder="Internal notes">
        </div>
        <div class="form-group">
          <button type="submit" class="btn btn-primary">Create Link</button>
        </div>
      </form>
    </div>

    <div class="card">
      <h2>Active Links</h2>
      <table>
        <thead><tr><th>Organization</th><th>URL</th><th>Expires</th><th>Status</th><th>Notes</th><th>Actions</th></tr></thead>
        <tbody>${rows || '<tr><td colspan="6" style="text-align:center;color:#999;">No links yet</td></tr>'}</tbody>
      </table>
    </div>
  </div>`);
}

function editPage(link) {
  return layout('Edit Link', `
  <div class="header">
    <strong>Contoro Duck — Admin</strong>
    <a href="/admin">← Back</a>
  </div>
  <div class="container">
    <div class="card">
      <h2>Edit Link: /${esc(link.slug)}</h2>
      <form method="POST" action="/admin/links/${link.id}/edit">
        <div class="form-group">
          <label>Slug (read-only)</label>
          <input type="text" value="${esc(link.slug)}" disabled>
        </div>
        <div class="form-group">
          <label for="org_name">Organization Name</label>
          <input type="text" id="org_name" name="org_name" value="${esc(link.org_name)}" required>
        </div>
        <div class="form-group">
          <label for="expires_at">Expires</label>
          <input type="date" id="expires_at" name="expires_at" value="${esc(link.expires_at)}" required>
        </div>
        <div class="form-group">
          <label for="welcome_message">Welcome Message (optional)</label>
          <textarea id="welcome_message" name="welcome_message" rows="2" placeholder="Custom welcome message (leave blank for default)">${esc(link.welcome_message)}</textarea>
        </div>
        <div class="form-group">
          <label for="notes">Notes</label>
          <input type="text" id="notes" name="notes" value="${esc(link.notes)}">
        </div>
        <button type="submit" class="btn btn-primary">Save Changes</button>
        <a href="/admin" style="margin-left:1rem;">Cancel</a>
      </form>
    </div>
  </div>`);
}

function expiredPage(orgName) {
  return layout('Link Expired', `
  <div class="center-page">
    <div class="card" style="max-width:480px;">
      <h1 style="color:${THEME.red};">Link Expired</h1>
      <p style="margin-top:1rem;">The access link for <strong>${esc(orgName)}</strong> has expired.</p>
      <p style="margin-top:0.5rem;color:${THEME.gray};">Please contact your Contoro representative for a new link.</p>
    </div>
  </div>`);
}

function notFoundPage() {
  return layout('Not Found', `
  <div class="center-page">
    <div class="card" style="max-width:480px;">
      <h1>Page Not Found</h1>
      <p style="margin-top:1rem;color:${THEME.gray};">The link you followed does not exist or is no longer available.</p>
      <p style="margin-top:0.5rem;color:${THEME.gray};">Please check the URL or contact your Contoro representative.</p>
    </div>
  </div>`);
}

function landingPage(link, baseUrl) {
  const welcomeMsg = link.welcome_message || 'Here is your exclusive Contoro Duck product introduction.';
  const expiryDate = new Date(link.expires_at + 'T00:00:00').toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  const shareUrl = `${baseUrl}/${link.slug}`;

  return layout(`Welcome, ${esc(link.org_name)}`, `
  <div class="center-page">
    <div class="card" style="max-width:520px; text-align:center;">
      <img src="/assets/images/contoro-logo.png" alt="Contoro" style="width:80px; margin-bottom:1.5rem;">
      <h1 style="margin-bottom:0.5rem;">Welcome, ${esc(link.org_name)}</h1>
      <p style="margin:1rem 0; font-size:1.05rem;">${esc(welcomeMsg)}</p>
      <p style="margin:1rem 0; color:${THEME.gray}; font-size:0.9rem; font-style:italic;">
        This link is provided exclusively for ${esc(link.org_name)}. Please do not share this outside of your organization.
      </p>
      <p style="margin:1rem 0; color:${THEME.gray}; font-size:0.9rem;">This link expires on <strong>${expiryDate}</strong></p>
      <div style="margin:1.5rem 0; display:flex; align-items:center; gap:0.5rem; justify-content:center;">
        <input type="text" value="${esc(shareUrl)}" readonly style="max-width:300px; font-size:0.85rem; background:#f5f5f5;">
        <button onclick="navigator.clipboard.writeText('${esc(shareUrl)}').then(()=>{this.textContent='Copied!';setTimeout(()=>this.textContent='Copy',1500)})" class="btn btn-primary btn-sm" style="white-space:nowrap;">Copy</button>
      </div>
      <a href="/${esc(link.slug)}/start" class="btn btn-primary" style="font-size:1.1rem; padding:0.7rem 2rem;">Start Presentation →</a>
    </div>
  </div>`);
}

function esc(str) {
  if (!str) return '';
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

module.exports = { loginPage, dashboardPage, editPage, expiredPage, notFoundPage, landingPage };
