import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import Navbar from '../components/Navbar';
import './Register.css';

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (password.length < 6) {
      setError('Password should be at least 6 characters.');
      return;
    }
    setLoading(true);
    try {
      await api.register({ name: name.trim(), email: email.trim(), password });
      setSuccess(true);
      setTimeout(() => navigate('/'), 2000);
    } catch (err) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="register-page">
        <Navbar />
        <div className="register-content">
          <div className="register-box">
            <h1>Registration successful</h1>
            <p>You can now log in. Redirecting to home…</p>
            <Link to="/">Go to Home</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="register-page">
      <Navbar />
      <div className="register-content">
      <div className="register-box">
        <h1>User Registration</h1>
        <p className="subtitle">Create your account</p>
        <form onSubmit={handleSubmit}>
          <label>
            <span>Name</span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your full name"
              required
            />
          </label>
          <label>
            <span>Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
            />
          </label>
          <label>
            <span>Password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 6 characters"
              required
              minLength={6}
            />
          </label>
          <label>
            <span>Confirm Password</span>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Type password again"
              required
            />
          </label>
          {error && <p className="error">{error}</p>}
          <button type="submit" disabled={loading}>{loading ? 'Registering…' : 'Register'}</button>
        </form>
        <p className="login-link">Already have an account? <Link to="/login">Login</Link> or <Link to="/">Back to Home</Link></p>
      </div>
      </div>
    </div>
  );
}
