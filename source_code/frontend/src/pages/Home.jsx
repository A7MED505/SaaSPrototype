import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCategories, getRecommendations } from '../api/api';
import ProductCard from '../components/ProductCard';
import { useAuth } from '../context/AuthContext';

export default function Home() {
  const { user } = useAuth();
  const [recommendations, setRecommendations] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then(setCategories).catch(() => {});
    if (user) {
      getRecommendations(4).then(setRecommendations).catch(() => {});
    }
  }, [user]);

  return (
    <>
      <header className="hero">
        <div className="hero-content">
          <h1>Discover Amazing Products</h1>
          <p>Shop smarter with personalized recommendations</p>
          <Link to="/products" className="btn-primary">Shop Now</Link>
        </div>
      </header>

      {user && (
        <section className="section">
          <h2 className="section-title">Recommended for You</h2>
          <div className="product-grid">
            {recommendations.length
              ? recommendations.map(p => <ProductCard key={p.id} product={p} />)
              : <p className="placeholder-text">No recommendations yet. Start shopping!</p>}
          </div>
        </section>
      )}

      <section className="section bg-light">
        <h2 className="section-title">Browse Categories</h2>
        <div className="category-grid">
          {categories.map(c => (
            <Link key={c} to={`/products?category=${encodeURIComponent(c)}`} className="category-card">
              {c}
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
