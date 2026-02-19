import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { api } from '../services/api';
import Navbar from '../components/Navbar';
import './Profile.css';

function getStoredUser() {
  try {
    const raw = sessionStorage.getItem('userAuth');
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export default function Profile() {
  const [user, setUser] = useState(getStoredUser);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const u = getStoredUser();
    if (!u) {
      navigate('/login', { replace: true });
      return;
    }
    setUser(u);
    (async () => {
      setLoading(true);
      setError('');
      try {
        const data = await api.getMyApplications(u.id);
        setApplications(data.applications || []);
      } catch (err) {
        setError(err.message || 'Failed to load applications');
      } finally {
        setLoading(false);
      }
    })();
  }, [navigate]);

  if (!user) return null;

  return (
    <div className="profile-page">
      <Navbar />
      <main className="profile-main">
        <div className="profile-container">
          <h1 className="profile-greeting">Hi, {user.name}</h1>
          <p className="profile-email">{user.email}</p>

          <section className="profile-section">
            <h2>My Applications</h2>
            <p className="section-desc">Services you have applied for and their current status.</p>
            {loading && <p className="loading">Loading applications…</p>}
            {error && <p className="error">{error}</p>}
            {!loading && !error && applications.length === 0 && (
              <p className="empty">
                You haven’t applied for any service yet.{' '}
                <Link to="/services">Browse services</Link> and apply online.
              </p>
            )}
            {!loading && applications.length > 0 && (
              <ul className="application-list">
                {applications.map((app) => (
                  <li key={app.id} className="application-card">
                    <div className="app-service">{app.serviceName || 'Service'}</div>
                    <div className="app-meta">
                      Applied: {app.createdAt ? new Date(app.createdAt).toLocaleDateString() : '—'}
                    </div>
                    <span className={`app-status app-status-${(app.status || 'Submitted').replace(/\s+/g, '-').toLowerCase()}`}>
                      {app.status || 'Submitted'}
                    </span>
                    {app.remarks && (
                      <p className="app-remarks">Remarks: {app.remarks}</p>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
