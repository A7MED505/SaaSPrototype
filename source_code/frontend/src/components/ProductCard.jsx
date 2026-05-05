import { useState } from 'react';
import { Link } from 'react-router-dom';
import { addToCart } from '../api/api';
import { useAuth } from '../context/AuthContext';

function StarRating({ rating }) {
  const stars = Math.round(rating || 0);
  return (
    <span className="stars-small">
      {'★'.repeat(stars)}{'☆'.repeat(5 - stars)}
    </span>
  );
}

export default function ProductCard({ product, onLoginRequired }) {
  const { user, refreshCart } = useAuth();
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);

  async function handleAdd(e) {
    e.preventDefault();
    if (!user) { onLoginRequired?.(); return; }
    setAdding(true);
    try {
      await addToCart(product.id, 1);
      refreshCart();
      setAdded(true);
      setTimeout(() => setAdded(false), 1500);
    } catch (err) {
      alert(err.message);
    } finally {
      setAdding(false);
    }
  }

  const inStock = product.stock > 0;

  return (
    <div className="product-card">
      <div className="card-img-wrap">
        <Link to={`/products/${product.id}`}>
          <img
            src={product.image_url || `https://placehold.co/400x280/e0e7ff/4f46e5?text=${encodeURIComponent(product.name)}`}
            alt={product.name}
            loading="lazy"
          />
        </Link>
      </div>
      <div className="card-body">
        <span className="card-category">{product.category}</span>
        <h4><Link to={`/products/${product.id}`}>{product.name}</Link></h4>
        {product.rating > 0 && (
          <div className="card-rating">
            <StarRating rating={product.rating} />
            <span className="rating-count">{product.rating?.toFixed(1)}</span>
          </div>
        )}
        <div className="card-footer">
          <span className="price">${parseFloat(product.price).toFixed(2)}</span>
          {inStock
            ? <span className="badge badge-success">In Stock</span>
            : <span className="badge badge-danger">Out</span>}
        </div>
        <button
          className="btn-primary"
          style={{ width: '100%', justifyContent: 'center', marginTop: '0.5rem' }}
          onClick={handleAdd}
          disabled={adding || !inStock}
        >
          {added ? '✓ Added!' : adding ? 'Adding...' : '+ Add to Cart'}
        </button>
      </div>
    </div>
  );
}
