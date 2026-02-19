import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import Navbar from '../components/Navbar';
import './PublicServices.css';

function getStoredUser() {
  try {
    const raw = sessionStorage.getItem('userAuth');
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export default function PublicServices() {
  const [services, setServices] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const user = getStoredUser();

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      setError('');
      try {
        const data = await api.getServices(true);
        if (mounted) {
          setServices(data.services || []);
        }
      } catch (err) {
        if (mounted) {
          setError(err.message || 'Failed to load services');
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    })();
    return () => { mounted = false; };
  }, []);

  const filtered = useMemo(() => {
    return search.trim()
      ? services.filter(
        (s) =>
          (s.name || '').toLowerCase().includes(search.toLowerCase()) ||
          (s.description || '').toLowerCase().includes(search.toLowerCase())
      )
      : services;
  }, [search, services]);

  return (
    <div className="public-services-page">
      <Navbar />
      <main className="public-services-main">
        <div className="public-services-container">
          <header className="services-header">
            <h1>Citizen Services</h1>
            <p className="page-desc">Browse and apply for gram panchayat services online.</p>
          </header>

          <div className="search-row">
            <input
              type="search"
              placeholder="🔍 Search for a service..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="search-input"
            />
          </div>

          {!user && (
            <div className="login-prompt">
              <p>Please <Link to="/login">login</Link> to apply for services.</p>
            </div>
          )}

          {error && <div className="error-banner">{error} <button onClick={() => window.location.reload()}>Retry</button></div>}

          {loading ? (
            <div className="services-skeleton">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="skeleton-card">
                  <div className="skeleton-title"></div>
                  <div className="skeleton-text"></div>
                  <div className="skeleton-btn"></div>
                </div>
              ))}
            </div>
          ) : (
            <>
              {filtered.length === 0 ? (
                <div className="empty-state">
                  <p>No services found matching your search.</p>
                </div>
              ) : (
                <ul className="service-grid">
                  {filtered.map((svc) => (
                    <li key={svc.id} className="service-tile">
                      <div className="service-icon">📄</div>
                      <h2>{svc.name}</h2>
                      <p>{svc.description}</p>
                      <div className="service-footer">
                        <span className="meta">
                          {Array.isArray(svc.fields) ? svc.fields.length : 0} Fields required
                        </span>
                        {user ? (
                          <Link to={`/services/apply/${svc.id}`} className="btn-apply">
                            Apply Now
                          </Link>
                        ) : (
                          <span className="btn-apply disabled" title="Login to apply">Apply Now</span>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}
