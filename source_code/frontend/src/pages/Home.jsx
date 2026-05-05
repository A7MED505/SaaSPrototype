import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCategories, getRecommendations } from '../api/api';
import ProductCard from '../components/ProductCard';
import { useAuth } from '../context/AuthContext';

const CATEGORY_ICONS = {
  Electronics: '💻', Clothing: '👕', Books: '📚', Sports: '⚽',
  Home: '🏠', Beauty: '💄', Food: '🍕', Toys: '🧸',
};

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
          <div className="hero-badge">✦ New arrivals every week</div>
          <h1>Discover <span>Amazing</span><br />Products</h1>
          <p>Shop smarter with AI-powered personalized recommendations tailored just for you.</p>
          <div className="hero-actions">
            <Link to="/products" className="btn-hero">🛍️ Shop Now</Link>
            {!user && <button className="btn-hero-outline">Learn More</button>}
          </div>
        </div>
      </header>

      <div className="stats-bar">
        <div className="stats-inner">
          <div className="stat-item"><div className="stat-num">500+</div><div className="stat-label">Products</div></div>
          <div className="stat-item"><div className="stat-num">10K+</div><div className="stat-label">Happy Customers</div></div>
          <div className="stat-item"><div className="stat-num">50+</div><div className="stat-label">Categories</div></div>
          <div className="stat-item"><div className="stat-num">24/7</div><div className="stat-label">Support</div></div>
        </div>
      </div>

      {user && (
        <section className="section">
          <div className="section-header">
            <div>
              <h2 className="section-title">Recommended <span>for You</span></h2>
              <p className="section-subtitle">Based on your shopping history</p>
            </div>
            <Link to="/products" className="btn-outline">View All →</Link>
          </div>
          <div className="product-grid">
            {recommendations.length
              ? recommendations.map(p => <ProductCard key={p.id} product={p} />)
              : <p className="placeholder-text">No recommendations yet. Start browsing products!</p>}
          </div>
        </section>
      )}

      <div className="bg-light">
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
          <div className="section-header">
            <div>
              <h2 className="section-title">Browse <span>Categories</span></h2>
              <p className="section-subtitle">Find exactly what you're looking for</p>
            </div>
          </div>
          <div className="category-grid">
            {categories.map(c => (
              <Link key={c} to={`/products?category=${encodeURIComponent(c)}`} className="category-card">
                <span className="category-icon">{CATEGORY_ICONS[c] || '📦'}</span>
                {c}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
