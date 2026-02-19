import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import './AdminDashboard.css';

export default function AdminDashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!sessionStorage.getItem('adminAuth')) {
      navigate('/admin/login', { replace: true, state: { from: { pathname: '/admin/dashboard' } } });
    }
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem('adminAuth');
    navigate('/admin/login', { replace: true });
  };

  return (
    <div className="admin-dashboard">
      <header className="dashboard-header">
        <h1>E-Gram Panchayat – Admin</h1>
        <button type="button" className="btn-logout" onClick={handleLogout}>Logout</button>
      </header>
      <main className="dashboard-main">
        <section className="dashboard-cards">
          <Link to="/admin/services" className="card">
            <span className="card-icon">📋</span>
            <h2>Services</h2>
            <p>View and manage all citizen services</p>
          </Link>
          <Link to="/admin/services/create" className="card">
            <span className="card-icon">➕</span>
            <h2>Create Service</h2>
            <p>Add a new service with dynamic form</p>
          </Link>
          <Link to="/admin/applications" className="card">
            <span className="card-icon">📄</span>
            <h2>Applications</h2>
            <p>View and update application status</p>
          </Link>
        </section>
      </main>
    </div>
  );
}
