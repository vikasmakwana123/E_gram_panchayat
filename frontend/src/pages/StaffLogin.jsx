import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './StaffLogin.css';

const STAFF_USER = 'staff';
const STAFF_PASS = 'staff123'; // Demo only

export default function StaffLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/staff/dashboard';

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        if (email === STAFF_USER && password === STAFF_PASS) {
            sessionStorage.setItem('staffAuth', 'true');
            navigate(from, { replace: true });
        } else {
            setError('Invalid credentials. Use staff / staff123 for demo.');
        }
    };

    return (
        <div className="staff-login">
            <div className="staff-login-card">
                <h1>E-Gram Panchayat</h1>
                <p className="subtitle">Staff Portal Login</p>
                <form onSubmit={handleSubmit}>
                    <label>
                        <span>Username</span>
                        <input
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="staff"
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
                <p className="demo-hint">Demo: staff / staff123</p>
            </div>
        </div>
    );
}
