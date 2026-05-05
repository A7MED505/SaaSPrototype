// Base API fetch helper
export async function apiFetch(url, method = 'GET', body = null) {
  const headers = { 'Content-Type': 'application/json' };
  const token = localStorage.getItem('token');
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

// Auth
export async function loginRequest(email, password) {
  const res = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || 'Login failed');
  }
  return res.json();
}

export const registerRequest = (name, email, password) =>
  apiFetch('/api/auth/register', 'POST', { name, email, password });

export const getMe = () => apiFetch('/api/auth/me');

// Products
export const getProducts = (params = {}) => {
  const q = new URLSearchParams(params).toString();
  return apiFetch(`/api/products/${q ? '?' + q : ''}`);
};
export const getProduct = (id) => apiFetch(`/api/products/${id}`);
export const getCategories = () => apiFetch('/api/products/categories');

// Cart
export const getCart = () => apiFetch('/api/cart/');
export const addToCart = (product_id, quantity = 1) =>
  apiFetch('/api/cart/add', 'POST', { product_id, quantity });
export const removeFromCart = (product_id) =>
  apiFetch(`/api/cart/${product_id}`, 'DELETE');
export const checkout = () => apiFetch('/api/cart/checkout', 'POST');

// Recommendations
export const getRecommendations = (limit = 6) =>
  apiFetch(`/api/recommendations/?limit=${limit}`);

// Admin
export const getAdminStats    = () => apiFetch('/api/admin/stats');
export const getAdminUsers    = () => apiFetch('/api/admin/users');
export const toggleAdminRole  = (id) => apiFetch(`/api/admin/users/${id}/toggle-admin`, 'PATCH');
export const getAdminProducts = () => apiFetch('/api/admin/products');
export const createAdminProduct = (data) => apiFetch('/api/admin/products', 'POST', data);
export const updateAdminProduct = (id, data) => apiFetch(`/api/admin/products/${id}`, 'PUT', data);
export const deleteAdminProduct = (id) => apiFetch(`/api/admin/products/${id}`, 'DELETE');

