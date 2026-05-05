import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProduct, getProducts, addToCart } from '../api/api';
import { useAuth } from '../context/AuthContext';
import ProductCard from '../components/ProductCard';
import AuthModal from '../components/AuthModal';

export default function ProductDetail() {
  const { id } = useParams();
  const { user, refreshCart } = useAuth();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [qty, setQty] = useState(1);
  const [msg, setMsg] = useState('');
  const [showAuth, setShowAuth] = useState(false);

  useEffect(() => {
    getProduct(id).then(p => {
      setProduct(p);
      getProducts({ category: p.category, limit: 4 })
        .then(list => setRelated(list.filter(x => x.id !== p.id).slice(0, 3)))
        .catch(() => {});
    }).catch(() => setProduct(null));
  }, [id]);

  async function handleAdd() {
    if (!user) { setShowAuth(true); return; }
    try {
      await addToCart(product.id, qty);
      refreshCart();
      setMsg('Added to cart!');
      setTimeout(() => setMsg(''), 2000);
    } catch (e) {
      setMsg(e.message);
    }
  }

  if (!product) return <p className="placeholder-text" style={{ padding: '2rem' }}>Loading product...</p>;

  const stars = Math.round(product.rating || 0);

  return (
    <div className="product-detail-container">
      <div className="detail-card">
        <img
          className="detail-img"
          src={product.image_url || 'https://placehold.co/400x300?text=Product'}
          alt={product.name}
        />
        <div className="detail-info">
          <span className="badge">{product.category}</span>
          <h1>{product.name}</h1>
          <div className="stars">{'★'.repeat(stars)}{'☆'.repeat(5 - stars)}</div>
          <p className="detail-price">${product.price.toFixed(2)}</p>
          <p className="detail-desc">{product.description}</p>
          <p className="stock-info">
            Stock: {product.stock > 0 ? `${product.stock} available` : <span style={{ color: 'red' }}>Out of stock</span>}
          </p>
          <div className="qty-row">
            <label>Qty:</label>
            <input type="number" value={qty} min={1} max={product.stock} onChange={e => setQty(Number(e.target.value))} />
            <button className="btn-primary" onClick={handleAdd} disabled={product.stock === 0}>Add to Cart</button>
          </div>
          {msg && <p className="success-msg">{msg}</p>}
        </div>
      </div>

      {related.length > 0 && (
        <div className="related-section">
          <h3>Related Products</h3>
          <div className="product-grid">
            {related.map(p => <ProductCard key={p.id} product={p} onLoginRequired={() => setShowAuth(true)} />)}
          </div>
        </div>
      )}

      {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
    </div>
  );
}
