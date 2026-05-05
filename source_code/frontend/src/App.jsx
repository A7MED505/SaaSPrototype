import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Admin from './pages/Admin';
import { useAuth } from './context/AuthContext';

function AdminRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="loading-spinner">Loading...</div>;
  if (!user?.isAdmin) return <Navigate to="/" replace />;
  return children;
}

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/admin" element={<AdminRoute><Admin /></AdminRoute>} />
      </Routes>
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-brand">✦ FirstSaaS</div>
          <p>&copy; 2026 FirstSaaS. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}
