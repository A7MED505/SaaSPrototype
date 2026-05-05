import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AuthModal from './AuthModal';

export default function Navbar() {
  const { user, cartCount, logout } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <nav className="navbar">
        <Link className="brand" to="/">FirstSaaS</Link>
        <div className="nav-links">
          <Link to="/products">Products</Link>
          <Link to="/cart">🛒 {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}</Link>
          {user ? (
            <>
              <span>Hi, {user.name}</span>
              <button className="btn-sm" onClick={() => { logout(); navigate('/'); }}>Logout</button>
            </>
          ) : (
            <button className="btn-sm" onClick={() => setShowModal(true)}>Login</button>
          )}
        </div>
      </nav>
      {showModal && <AuthModal onClose={() => setShowModal(false)} />}
    </>
  );
}
