import { useState } from 'react';
import { Link } from 'react-router-dom';
import { addToCart } from '../api/api';
import { useAuth } from '../context/AuthContext';

export default function ProductCard({ product, onLoginRequired }) {
  const { user, refreshCart } = useAuth();
  const [adding, setAdding] = useState(false);

  async function handleAdd(e) {
    e.preventDefault();
    if (!user) { onLoginRequired?.(); return; }
    setAdding(true);
    try {
      await addToCart(product.id, 1);
      refreshCart();
    } catch (err) {
      alert(err.message);
    } finally {
      setAdding(false);
    }
  }

  return (
    <div className="product-card">
      <Link to={`/products/${product.id}`}>
        <img
          src={product.image_url || 'https://placehold.co/300x200?text=Product'}
          alt={product.name}
          loading="lazy"
        />
      </Link>
      <div className="card-body">
        <span className="badge">{product.category}</span>
        <h4><Link to={`/products/${product.id}`}>{product.name}</Link></h4>
        <p className="price">${parseFloat(product.price).toFixed(2)}</p>
        <button className="btn-primary" onClick={handleAdd} disabled={adding}>
          {adding ? '...' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
}
