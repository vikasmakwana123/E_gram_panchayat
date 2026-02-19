import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './EntryPage.css';

export default function EntryPage() {
  return (
    <div className="entry-page">
      <Navbar />

      {/* Hero Section */}
      <header className="hero-section">
        <div className="hero-content">
          <h1>Welcome to E-Gram Panchayat</h1>
          <p className="hero-subtitle">
            Empowering rural communities with digital services.
            Access government schemes, certificates, and more from the comfort of your home.
          </p>
          <div className="hero-buttons">
            <Link to="/services" className="btn btn-primary btn-lg">Browse Services</Link>
            <Link to="/login" className="btn btn-secondary btn-lg">Citizen Login</Link>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="features-section">
        <div className="feature-card">
          <div className="feature-icon">📑</div>
          <h3>Easy Applications</h3>
          <p>Apply for certificates and schemes online without visiting the office.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">⚡</div>
          <h3>Fast Processing</h3>
          <p>Track your application status in real-time and get quicker approvals.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🏛️</div>
          <h3>Transparent Governance</h3>
          <p>Direct access to village administration and public records.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© {new Date().getFullYear()} E-Gram Panchayat. All rights reserved.</p>
        <p className="footer-note">Digital India Initiative</p>
      </footer>
    </div>
  );
}
