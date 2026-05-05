import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getMe, getCart } from '../api/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const refreshCart = useCallback(async () => {
    if (!localStorage.getItem('token')) { setCartCount(0); return; }
    try {
      const cart = await getCart();
      setCartCount(cart.items.reduce((s, i) => s + i.quantity, 0));
    } catch {
      setCartCount(0);
    }
  }, []);

  const refreshUser = useCallback(async () => {
    if (!localStorage.getItem('token')) { setUser(null); setLoading(false); return; }
    try {
      const me = await getMe();
      setUser(me);
    } catch {
      localStorage.removeItem('token');
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshUser();
    refreshCart();
  }, [refreshUser, refreshCart]);

  const login = (token) => {
    localStorage.setItem('token', token);
    refreshUser();
    refreshCart();
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setCartCount(0);
  };

  return (
    <AuthContext.Provider value={{ user, cartCount, loading, login, logout, refreshCart }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
