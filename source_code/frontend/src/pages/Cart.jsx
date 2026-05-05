import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCart, removeFromCart, checkout } from '../api/api';
import { useAuth } from '../context/AuthContext';
import AuthModal from '../components/AuthModal';

export default function Cart() {
  const { user, refreshCart } = useAuth();
  const [cart, setCart] = useState(null);
  const [orderMsg, setOrderMsg] = useState('');
  const [showAuth, setShowAuth] = useState(false);

  async function loadCart() {
    if (!user) return;
    const data = await getCart().catch(() => null);
    setCart(data);
    refreshCart();
  }

  useEffect(() => { loadCart(); }, [user]);

  async function handleRemove(productId) {
    await removeFromCart(productId).catch(() => {});
    loadCart();
  }

  async function handleCheckout() {
    try {
      const result = await checkout();
      setOrderMsg(`Order placed! ID: ${result.order_id} — Total: $${result.total.toFixed(2)}`);
      setCart(null);
      refreshCart();
    } catch (e) {
      alert(e.message || 'Checkout failed');
    }
  }

  if (!user) return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      <p className="placeholder-text">
        Please <a href="#" onClick={() => setShowAuth(true)}>login</a> to view your cart.
      </p>
      {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
    </div>
  );

  if (orderMsg) return (
    <div className="cart-container">
      <p className="success-msg" style={{ fontSize: '1.1rem', padding: '2rem 0' }}>{orderMsg}</p>
      <Link to="/products" className="btn-primary">Continue Shopping</Link>
    </div>
  );

  if (!cart) return <p className="placeholder-text" style={{ padding: '2rem' }}>Loading cart...</p>;

  if (!cart.items.length) return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      <p className="placeholder-text">Your cart is empty. <Link to="/products">Shop now</Link></p>
    </div>
  );

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      <table className="cart-table">
        <thead>
          <tr><th>Product</th><th>Price</th><th>Qty</th><th>Subtotal</th><th></th></tr>
        </thead>
        <tbody>
          {cart.items.map(item => (
            <tr key={item.product_id}>
              <td><Link to={`/products/${item.product_id}`}>{item.name}</Link></td>
              <td>${item.price.toFixed(2)}</td>
              <td>{item.quantity}</td>
              <td>${item.subtotal.toFixed(2)}</td>
              <td><button className="btn-danger" onClick={() => handleRemove(item.product_id)}>Remove</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="cart-summary">
        <h3>Total: ${cart.total.toFixed(2)}</h3>
        <button className="btn-primary" onClick={handleCheckout}>Checkout</button>
      </div>
    </div>
  );
}
