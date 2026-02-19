import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './AdminLogin.css';

const ADMIN_USER = 'admin';
const ADMIN_PASS = 'admin123'; // Demo only - replace with real auth

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/admin/dashboard';

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (email === ADMIN_USER && password === ADMIN_PASS) {
      sessionStorage.setItem('adminAuth', 'true');
      navigate(from, { replace: true });
    } else {
      setError('Invalid credentials. Use admin / admin123 for demo.');
    }
  };

  return (
    <div className="admin-login">
      <div className="admin-login-card">
        <h1>E-Gram Panchayat</h1>
        <p className="subtitle">Admin Login</p>
        <form onSubmit={handleSubmit}>
          <label>
            <span>Email / Username</span>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin"
              autoComplete="username"
              required
            />
          </label>
          <label>
            <span>Password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete="current-password"
              required
            />
          </label>
          {error && <p className="error">{error}</p>}
          <button type="submit">Sign In</button>
        </form>
        <p className="demo-hint">Demo: admin / admin123</p>
      </div>
    </div>
  );
}
