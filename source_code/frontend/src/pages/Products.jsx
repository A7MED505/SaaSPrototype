import { useEffect, useState, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getProducts, getCategories } from '../api/api';
import ProductCard from '../components/ProductCard';
import AuthModal from '../components/AuthModal';

const PAGE_SIZE = 12;

const SORT_OPTIONS = [
  { value: '',          label: 'Default' },
  { value: 'price_asc', label: 'Price: Low → High' },
  { value: 'price_desc',label: 'Price: High → Low' },
  { value: 'rating',    label: 'Top Rated' },
  { value: 'name',      label: 'Name A–Z' },
];

function sortProducts(list, sort) {
  if (!sort) return list;
  const copy = [...list];
  if (sort === 'price_asc')  return copy.sort((a, b) => a.price - b.price);
  if (sort === 'price_desc') return copy.sort((a, b) => b.price - a.price);
  if (sort === 'rating')     return copy.sort((a, b) => b.rating - a.rating);
  if (sort === 'name')       return copy.sort((a, b) => a.name.localeCompare(b.name));
  return copy;
}

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts]     = useState([]);
  const [categories, setCategories] = useState([]);
  const [page, setPage]             = useState(0);
  const [sort, setSort]             = useState('');
  const [loading, setLoading]       = useState(false);
  const [showAuth, setShowAuth]     = useState(false);

  const category = searchParams.get('category') || '';
  const search   = searchParams.get('search')   || '';

  const load = useCallback(async () => {
    setLoading(true);
    const params = { skip: page * PAGE_SIZE, limit: PAGE_SIZE };
    if (category) params.category = category;
    if (search)   params.search   = search;
    const data = await getProducts(params).catch(() => []);
    setProducts(data);
    setLoading(false);
  }, [page, category, search]);

  useEffect(() => { getCategories().then(setCategories).catch(() => {}); }, []);
  useEffect(() => { load(); }, [load]);

  function setFilter(key, value) {
    setPage(0);
    const p = new URLSearchParams(searchParams);
    if (value) p.set(key, value); else p.delete(key);
    setSearchParams(p);
  }

  function clearFilters() {
    setPage(0);
    setSearchParams({});
  }

  const displayed = sortProducts(products, sort);
  const hasFilters = category || search;

  return (
    <div className="page-container">

      {/* ── Sidebar ── */}
      <aside className="sidebar">
        <h3>🔍 Filters</h3>

        <label>Search</label>
        <input
          type="text"
          placeholder="Search products…"
          value={search}
          onChange={e => setFilter('search', e.target.value)}
        />

        <label>Category</label>
        <select value={category} onChange={e => setFilter('category', e.target.value)}>
          <option value="">All Categories</option>
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>

        <label>Sort By</label>
        <select value={sort} onChange={e => setSort(e.target.value)}>
          {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>

        {hasFilters && (
          <button
            className="btn-outline"
            style={{ width: '100%', marginTop: '1.2rem', justifyContent: 'center' }}
            onClick={clearFilters}
          >
            ✕ Clear Filters
          </button>
        )}
      </aside>

      {/* ── Main ── */}
      <main style={{ flex: 1, minWidth: 0 }}>

        {/* Header row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div>
            <h2 className="page-title" style={{ margin: 0 }}>
              {category ? category : 'All Products'}
            </h2>
            {!loading && (
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                {displayed.length === 0
                  ? 'No products found'
                  : `Showing ${displayed.length} product${displayed.length !== 1 ? 's' : ''}${page > 0 ? `, page ${page + 1}` : ''}`}
              </p>
            )}
          </div>
        </div>

        {/* Grid */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-muted)', fontSize: '1rem' }}>
            Loading products…
          </div>
        ) : displayed.length > 0 ? (
          <div className="product-grid">
            {displayed.map(p => (
              <ProductCard key={p.id} product={p} onLoginRequired={() => setShowAuth(true)} />
            ))}
          </div>
        ) : (
          <div style={{
            textAlign: 'center', padding: '5rem 2rem',
            background: 'var(--card-bg)', borderRadius: 'var(--radius-lg)',
            border: '1px dashed var(--border)',
          }}>
            <p style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>🔎</p>
            <p style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.4rem' }}>No products found</p>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
              Try adjusting your filters or search term.
            </p>
            <button className="btn-primary" onClick={clearFilters}>Clear Filters</button>
          </div>
        )}

        {/* Pagination */}
        {!loading && products.length > 0 && (
          <div className="pagination" style={{ marginTop: '2.5rem' }}>
            <button
              className="page-btn"
              onClick={() => setPage(p => Math.max(0, p - 1))}
              disabled={page === 0}
            >
              ← Prev
            </button>
            <span style={{ padding: '0.4rem 0.9rem', fontWeight: 600, fontSize: '0.9rem', color: 'var(--text)' }}>
              Page {page + 1}
            </span>
            <button
              className="page-btn"
              onClick={() => setPage(p => p + 1)}
              disabled={products.length < PAGE_SIZE}
            >
              Next →
            </button>
          </div>
        )}
      </main>

      {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
    </div>
  );
}
