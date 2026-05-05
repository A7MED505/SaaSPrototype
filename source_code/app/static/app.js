// ── Token Management ──────────────────────────────────────────
function getToken() {
  return localStorage.getItem('token');
}

function setToken(token) {
  localStorage.setItem('token', token);
}

function clearToken() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
}

// ── API Helper ────────────────────────────────────────────────
async function apiFetch(url, method = 'GET', body = null) {
  const headers = { 'Content-Type': 'application/json' };
  const token = getToken();
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const opts = { method, headers };
  if (body && method !== 'GET') opts.body = JSON.stringify(body);

  const res = await fetch(url, opts);
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: 'Request failed' }));
    throw new Error(err.detail || 'Request failed');
  }
  return res.json();
}

// ── Auth ──────────────────────────────────────────────────────
async function submitLogin() {
  const email = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-password').value;
  const errEl = document.getElementById('login-error');
  errEl.classList.add('hidden');

  if (!email || !password) {
    errEl.textContent = 'Please fill in all fields.';
    errEl.classList.remove('hidden');
    return;
  }

  try {
    // OAuth2 form expects form-encoded data
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `username=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`,
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.detail || 'Login failed');
    }
    const data = await res.json();
    setToken(data.access_token);
    closeModal('login-modal');
    updateNavAuth();
    updateCartCount();
    location.reload();
  } catch (e) {
    errEl.textContent = e.message;
    errEl.classList.remove('hidden');
  }
}

async function submitRegister() {
  const name = document.getElementById('reg-name').value.trim();
  const email = document.getElementById('reg-email').value.trim();
  const password = document.getElementById('reg-password').value;
  const errEl = document.getElementById('reg-error');
  errEl.classList.add('hidden');

  if (!name || !email || !password) {
    errEl.textContent = 'Please fill in all fields.';
    errEl.classList.remove('hidden');
    return;
  }

  try {
    const data = await apiFetch('/api/auth/register', 'POST', { name, email, password });
    setToken(data.access_token);
    closeModal('register-modal');
    updateNavAuth();
    updateCartCount();
    location.reload();
  } catch (e) {
    errEl.textContent = e.message;
    errEl.classList.remove('hidden');
  }
}

function logout() {
  clearToken();
  updateNavAuth();
  document.getElementById('cart-count').textContent = '0';
  location.reload();
}

async function updateNavAuth() {
  const loginBtn = document.getElementById('nav-login-btn');
  const logoutBtn = document.getElementById('nav-logout-btn');
  const navUser = document.getElementById('nav-user');

  if (!getToken()) {
    loginBtn && loginBtn.classList.remove('hidden');
    logoutBtn && logoutBtn.classList.add('hidden');
    if (navUser) navUser.textContent = '';
    return;
  }

  loginBtn && loginBtn.classList.add('hidden');
  logoutBtn && logoutBtn.classList.remove('hidden');

  try {
    const user = await apiFetch('/api/auth/me');
    if (navUser) navUser.textContent = `Hi, ${user.name}`;
  } catch {
    clearToken();
  }
}

// ── Cart Count ────────────────────────────────────────────────
async function updateCartCount() {
  if (!getToken()) return;
  try {
    const cart = await apiFetch('/api/cart/');
    const el = document.getElementById('cart-count');
    if (el) el.textContent = cart.items.reduce((s, i) => s + i.quantity, 0);
  } catch {}
}

// ── Product Card ──────────────────────────────────────────────
function productCard(p) {
  return `
    <div class="product-card">
      <a href="product.html?id=${p.id}">
        <img src="${p.image_url || 'https://via.placeholder.com/300x200'}" alt="${p.name}" loading="lazy" />
      </a>
      <div class="card-body">
        <span class="badge">${p.category || ''}</span>
        <h4><a href="product.html?id=${p.id}">${p.name}</a></h4>
        <p class="price">$${parseFloat(p.price).toFixed(2)}</p>
        <button class="btn-primary" onclick="quickAdd('${p.id}')">Add to Cart</button>
      </div>
    </div>
  `;
}

async function quickAdd(productId) {
  if (!getToken()) { openModal('login-modal'); return; }
  try {
    await apiFetch('/api/cart/add', 'POST', { product_id: productId, quantity: 1 });
    updateCartCount();
  } catch (e) {
    alert(e.message || 'Failed to add to cart');
  }
}

// ── Modal Helpers ─────────────────────────────────────────────
function openModal(id) {
  document.getElementById(id).classList.remove('hidden');
}

function closeModal(id) {
  document.getElementById(id).classList.add('hidden');
}

// Close modal when clicking backdrop
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal')) {
    e.target.classList.add('hidden');
  }
});

// Initialize cart count on load
document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();
});
