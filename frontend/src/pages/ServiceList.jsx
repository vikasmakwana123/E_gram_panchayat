import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { api } from '../services/api';
import './ServiceList.css';

export default function ServiceList() {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (!sessionStorage.getItem('adminAuth')) {
      navigate('/admin/login', { replace: true, state: { from: { pathname: '/admin/services' } } });
      return;
    }
    load();
  }, [navigate]);

  const load = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await api.getServices(true);
      setServices(data.services || []);
    } catch (err) {
      setError(err.message || 'Failed to load services');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete service "${name}"?`)) return;
    setError('');
    try {
      await api.deleteService(id);
      setServices(s => s.filter(svc => svc.id !== id));
    } catch (err) {
      setError(err.message || 'Failed to delete');
    }
  };

  return (
    <div className="service-list">
      <header className="page-header">
        <button type="button" className="btn-back" onClick={() => navigate('/admin/dashboard')}>← Dashboard</button>
        <h1>Services</h1>
        <Link to="/admin/services/create" className="btn-create">+ Create Service</Link>
      </header>
      <main className="list-main">
        <div className="search-bar">
          <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
          <input
            type="text"
            placeholder="Search services by name or description…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        {loading && <p className="loading">Loading services…</p>}
        {error && <p className="error">{error}</p>}
        {!loading && !error && services.length === 0 && (
          <p className="empty">No services yet. <Link to="/admin/services/create">Create one</Link>.</p>
        )}
        {!loading && services.length > 0 && (() => {
          const q = search.trim().toLowerCase();
          const filtered = q
            ? services.filter(s =>
              (s.name || '').toLowerCase().includes(q) ||
              (s.description || '').toLowerCase().includes(q)
            )
            : services;

          if (filtered.length === 0) {
            return <p className="empty">No services match "{search.trim()}".</p>;
          }

          return (
            <ul className="service-cards">
              {filtered.map((svc) => (
                <li key={svc.id} className="service-card">
                  <div className="card-body">
                    <h2>{svc.name}</h2>
                    {svc.description && <p>{svc.description}</p>}
                    <span className="meta">
                      {Array.isArray(svc.fields) ? svc.fields.length : 0} field(s) · {svc.isActive !== false ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  <div className="card-actions">
                    <Link to={`/admin/services/edit/${svc.id}`} className="btn-edit">Update</Link>
                    <button type="button" onClick={() => handleDelete(svc.id, svc.name)} className="btn-delete">Delete</button>
                  </div>
                </li>
              ))}
            </ul>
          );
        })()}
      </main>
    </div>
  );
}
