import { useState } from 'react';
import { loginRequest, registerRequest } from '../api/api';
import { useAuth } from '../context/AuthContext';

export default function AuthModal({ onClose }) {
  const { login } = useAuth();
  const [mode, setMode] = useState('login'); // 'login' | 'register'
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  async function submit() {
    setError('');
    if (!form.email || !form.password || (mode === 'register' && !form.name)) {
      setError('Please fill in all fields.');
      return;
    }
    setLoading(true);
    try {
      let data;
      if (mode === 'login') {
        data = await loginRequest(form.email, form.password);
      } else {
        data = await registerRequest(form.name, form.email, form.password);
      }
      login(data.access_token);
      onClose();
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        <h3>{mode === 'login' ? 'Login' : 'Register'}</h3>

        {mode === 'register' && (
          <input placeholder="Full Name" value={form.name} onChange={set('name')} />
        )}
        <input type="email" placeholder="Email" value={form.email} onChange={set('email')} />
        <input type="password" placeholder="Password" value={form.password} onChange={set('password')} />

        {error && <p className="error-msg">{error}</p>}

        <button className="btn-primary" onClick={submit} disabled={loading}>
          {loading ? 'Please wait...' : mode === 'login' ? 'Login' : 'Register'}
        </button>

        <p style={{ fontSize: '0.9rem' }}>
          {mode === 'login' ? (
            <>No account? <a href="#" onClick={() => { setMode('register'); setError(''); }}>Register</a></>
          ) : (
            <>Have an account? <a href="#" onClick={() => { setMode('login'); setError(''); }}>Login</a></>
          )}
        </p>
      </div>
    </div>
  );
}
