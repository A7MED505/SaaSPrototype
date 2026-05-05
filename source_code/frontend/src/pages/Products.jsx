import { useEffect, useState, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getProducts, getCategories } from '../api/api';
import ProductCard from '../components/ProductCard';
import AuthModal from '../components/AuthModal';

const PAGE_SIZE = 12;

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(0);
  const [showAuth, setShowAuth] = useState(false);

  const category = searchParams.get('category') || '';
  const search = searchParams.get('search') || '';

  const load = useCallback(async () => {
    const params = { skip: page * PAGE_SIZE, limit: PAGE_SIZE };
    if (category) params.category = category;
    if (search) params.search = search;
    const data = await getProducts(params).catch(() => []);
    setProducts(data);
  }, [page, category, search]);

  useEffect(() => { getCategories().then(setCategories).catch(() => {}); }, []);
  useEffect(() => { load(); }, [load]);

  function setFilter(key, value) {
    setPage(0);
    const p = new URLSearchParams(searchParams);
    if (value) p.set(key, value); else p.delete(key);
    setSearchParams(p);
  }

  return (
    <div className="page-container">
      <aside className="sidebar">
        <h3>Filters</h3>
        <label>Category</label>
        <select value={category} onChange={e => setFilter('category', e.target.value)}>
          <option value="">All Categories</option>
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <label>Search</label>
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={e => setFilter('search', e.target.value)}
        />
      </aside>

      <main>
        <h2 className="page-title">All Products</h2>
        <div className="product-grid">
          {products.length
            ? products.map(p => <ProductCard key={p.id} product={p} onLoginRequired={() => setShowAuth(true)} />)
            : <p className="placeholder-text">No products found.</p>}
        </div>
        <div className="pagination">
          <button className="btn-sm" onClick={() => setPage(p => Math.max(0, p - 1))} disabled={page === 0}>← Prev</button>
          <span>Page {page + 1}</span>
          <button className="btn-sm" onClick={() => setPage(p => p + 1)} disabled={products.length < PAGE_SIZE}>Next →</button>
        </div>
      </main>

      {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
    </div>
  );
}
