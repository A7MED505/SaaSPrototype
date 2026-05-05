import { useState, useEffect, useCallback } from 'react';
import {
  getAdminStats, getAdminUsers, toggleAdminRole,
  getAdminProducts, createAdminProduct, updateAdminProduct, deleteAdminProduct,
} from '../api/api';

const EMPTY_FORM = { name: '', description: '', price: '', category: '', image_url: '', stock: '', tags: '' };

export default function Admin() {
  const [tab, setTab] = useState('stats');

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div style={{ fontWeight: 800, fontSize: '1.1rem', color: '#e0e7ff', marginBottom: '1.5rem', paddingLeft: '0.5rem' }}>
          ⚡ Admin Panel
        </div>
        <span className="admin-sidebar-title">Overview</span>
        <button className={`admin-nav-btn ${tab === 'stats' ? 'active' : ''}`} onClick={() => setTab('stats')}>
          <span className="admin-nav-icon">📊</span> Dashboard
        </button>
        <span className="admin-sidebar-title">Manage</span>
        <button className={`admin-nav-btn ${tab === 'products' ? 'active' : ''}`} onClick={() => setTab('products')}>
          <span className="admin-nav-icon">📦</span> Products
        </button>
        <button className={`admin-nav-btn ${tab === 'users' ? 'active' : ''}`} onClick={() => setTab('users')}>
          <span className="admin-nav-icon">👥</span> Users
        </button>
      </aside>

      {/* Content */}
      <main className="admin-content">
        {tab === 'stats'    && <StatsTab />}
        {tab === 'products' && <ProductsTab />}
        {tab === 'users'    && <UsersTab />}
      </main>
    </div>
  );
}

/* ── Stats Tab ─────────────────────────────────────────────── */
function StatsTab() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAdminStats().then(setStats).catch(() => {}).finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="loading-spinner">Loading stats...</div>;

  return (
    <>
      <h1 className="admin-page-title">Dashboard</h1>
      <p className="admin-page-sub">Overview of your store performance</p>

      <div className="stat-cards">
        <div className="stat-card">
          <div className="stat-card-icon purple">👥</div>
          <div className="stat-card-val">{stats?.totalUsers ?? 0}</div>
          <div className="stat-card-label">Total Users</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-icon blue">📦</div>
          <div className="stat-card-val">{stats?.totalProducts ?? 0}</div>
          <div className="stat-card-label">Total Products</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-icon green">🛒</div>
          <div className="stat-card-val">{stats?.totalOrders ?? 0}</div>
          <div className="stat-card-label">Total Orders</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-icon amber">💰</div>
          <div className="stat-card-val">${(stats?.totalRevenue ?? 0).toFixed(0)}</div>
          <div className="stat-card-label">Total Revenue</div>
        </div>
      </div>

      <div style={{ background: '#fff', borderRadius: 'var(--radius-lg)', padding: '2rem', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}>
        <h3 style={{ marginBottom: '1rem', fontWeight: 700 }}>Quick Actions</h3>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: 200, padding: '1.2rem', background: 'var(--primary-light)', borderRadius: 'var(--radius)', textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📦</div>
            <div style={{ fontWeight: 600, color: 'var(--primary)' }}>Manage Products</div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>Add, edit, delete products</div>
          </div>
          <div style={{ flex: 1, minWidth: 200, padding: '1.2rem', background: '#d1fae5', borderRadius: 'var(--radius)', textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>👥</div>
            <div style={{ fontWeight: 600, color: 'var(--success)' }}>Manage Users</div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>View & manage permissions</div>
          </div>
        </div>
      </div>
    </>
  );
}

/* ── Products Tab ──────────────────────────────────────────── */
function ProductsTab() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');
  const [search, setSearch] = useState('');

  const load = useCallback(() => {
    setLoading(true);
    getAdminProducts().then(setProducts).catch(() => {}).finally(() => setLoading(false));
  }, []);

  useEffect(() => { load(); }, [load]);

  function openAdd() { setForm(EMPTY_FORM); setEditProduct(null); setShowForm(true); setMsg(''); }
  function openEdit(p) {
    setForm({ name: p.name, description: p.description, price: p.price, category: p.category, image_url: p.image_url || '', stock: p.stock, tags: (p.tags || []).join(', ') });
    setEditProduct(p);
    setShowForm(true);
    setMsg('');
  }

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true); setMsg('');
    const data = { ...form, price: parseFloat(form.price), stock: parseInt(form.stock) || 0, tags: form.tags ? form.tags.split(',').map(t => t.trim()).filter(Boolean) : [] };
    try {
      if (editProduct) { await updateAdminProduct(editProduct._id, data); }
      else             { await createAdminProduct(data); }
      setMsg('Saved successfully!');
      setShowForm(false);
      load();
    } catch (err) {
      setMsg('Error: ' + err.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id, name) {
    if (!confirm(`Delete "${name}"?`)) return;
    try {
      await deleteAdminProduct(id);
      load();
    } catch (err) {
      alert(err.message);
    }
  }

  const filtered = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase()));

  return (
    <>
      <h1 className="admin-page-title">Products</h1>
      <p className="admin-page-sub">Manage your product catalog</p>

      {showForm ? (
        <div className="product-form">
          <h3>{editProduct ? '✏️ Edit Product' : '➕ Add New Product'}</h3>
          <form onSubmit={handleSave}>
            <div className="form-grid">
              <div className="form-group full">
                <label>Product Name *</label>
                <input value={form.name} onChange={e => setForm({...form, name: e.target.value})} required placeholder="e.g. Wireless Headphones" />
              </div>
              <div className="form-group full">
                <label>Description *</label>
                <textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})} required placeholder="Product description..." />
              </div>
              <div className="form-group">
                <label>Price ($) *</label>
                <input type="number" step="0.01" min="0" value={form.price} onChange={e => setForm({...form, price: e.target.value})} required placeholder="0.00" />
              </div>
              <div className="form-group">
                <label>Stock</label>
                <input type="number" min="0" value={form.stock} onChange={e => setForm({...form, stock: e.target.value})} placeholder="0" />
              </div>
              <div className="form-group">
                <label>Category *</label>
                <input value={form.category} onChange={e => setForm({...form, category: e.target.value})} required placeholder="e.g. Electronics" />
              </div>
              <div className="form-group">
                <label>Tags (comma separated)</label>
                <input value={form.tags} onChange={e => setForm({...form, tags: e.target.value})} placeholder="e.g. sale, new, featured" />
              </div>
              <div className="form-group full">
                <label>Image URL</label>
                <input value={form.image_url} onChange={e => setForm({...form, image_url: e.target.value})} placeholder="https://..." />
              </div>
            </div>
            {msg && <p className={msg.startsWith('Error') ? 'error-msg' : 'success-msg'} style={{marginTop:'0.8rem'}}>{msg}</p>}
            <div className="form-actions">
              <button type="submit" className="btn-primary" disabled={saving}>{saving ? 'Saving...' : 'Save Product'}</button>
              <button type="button" className="btn-ghost" onClick={() => setShowForm(false)}>Cancel</button>
            </div>
          </form>
        </div>
      ) : (
        <div className="admin-table-wrap">
          <div className="admin-table-header">
            <h3>All Products ({filtered.length})</h3>
            <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
              <div className="search-bar">
                <span className="search-icon">🔍</span>
                <input placeholder="Search products..." value={search} onChange={e => setSearch(e.target.value)} />
              </div>
              <button className="btn-primary" onClick={openAdd}>+ Add Product</button>
            </div>
          </div>
          {loading ? (
            <div className="loading-spinner">Loading products...</div>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(p => (
                  <tr key={p._id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                        <img src={p.image_url || `https://placehold.co/40x40/e0e7ff/4f46e5?text=${encodeURIComponent(p.name[0])}`} alt={p.name} style={{ width: 40, height: 40, objectFit: 'cover', borderRadius: 8, border: '1px solid var(--border)' }} />
                        <div>
                          <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{p.name}</div>
                          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{p._id}</div>
                        </div>
                      </div>
                    </td>
                    <td><span className="chip chip-primary">{p.category}</span></td>
                    <td style={{ fontWeight: 700, color: 'var(--primary-dark)' }}>${parseFloat(p.price).toFixed(2)}</td>
                    <td>
                      {p.stock > 10
                        ? <span className="chip chip-success">{p.stock}</span>
                        : p.stock > 0
                        ? <span className="chip chip-warning">{p.stock} low</span>
                        : <span className="chip chip-danger">Out</span>}
                    </td>
                    <td>
                      <div className="admin-actions">
                        <button className="btn-ghost" onClick={() => openEdit(p)}>✏️ Edit</button>
                        <button className="btn-danger" onClick={() => handleDelete(p._id, p.name)}>🗑️</button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr><td colSpan={5} style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>No products found</td></tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      )}
    </>
  );
}

/* ── Users Tab ─────────────────────────────────────────────── */
function UsersTab() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const load = useCallback(() => {
    setLoading(true);
    getAdminUsers().then(setUsers).catch(() => {}).finally(() => setLoading(false));
  }, []);

  useEffect(() => { load(); }, [load]);

  async function handleToggleAdmin(id, name, isAdmin) {
    if (!confirm(`${isAdmin ? 'Remove' : 'Grant'} admin for "${name}"?`)) return;
    try { await toggleAdminRole(id); load(); }
    catch (err) { alert(err.message); }
  }

  const filtered = users.filter(u => u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()));

  return (
    <>
      <h1 className="admin-page-title">Users</h1>
      <p className="admin-page-sub">Manage user accounts and permissions</p>

      <div className="admin-table-wrap">
        <div className="admin-table-header">
          <h3>All Users ({filtered.length})</h3>
          <div className="search-bar">
            <span className="search-icon">🔍</span>
            <input placeholder="Search users..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
        </div>
        {loading ? (
          <div className="loading-spinner">Loading users...</div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Email</th>
                <th>Role</th>
                <th>Joined</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(u => (
                <tr key={u._id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                      <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: 'var(--primary)', fontSize: '0.9rem' }}>
                        {u.name[0].toUpperCase()}
                      </div>
                      <span style={{ fontWeight: 600 }}>{u.name}</span>
                    </div>
                  </td>
                  <td style={{ color: 'var(--text-muted)' }}>{u.email}</td>
                  <td>
                    {u.isAdmin
                      ? <span className="chip" style={{ background: 'linear-gradient(135deg,#f59e0b,#ef4444)', color: '#fff' }}>Admin</span>
                      : <span className="chip chip-primary">User</span>}
                  </td>
                  <td style={{ color: 'var(--text-muted)' }}>{new Date(u.createdAt).toLocaleDateString()}</td>
                  <td>
                    <button
                      className={u.isAdmin ? 'btn-danger' : 'btn-success'}
                      onClick={() => handleToggleAdmin(u._id, u.name, u.isAdmin)}
                      style={{ fontSize: '0.8rem', padding: '0.3rem 0.8rem' }}
                    >
                      {u.isAdmin ? 'Remove Admin' : 'Make Admin'}
                    </button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={5} style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>No users found</td></tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
