import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { api } from '../services/api';
import Navbar from '../components/Navbar';
import CitizenFormView from '../components/CitizenFormView';
import './ApplyService.css';

function getStoredUser() {
  try {
    const raw = sessionStorage.getItem('userAuth');
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export default function ApplyService() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const user = getStoredUser();

  useEffect(() => {
    if (!user) {
      navigate('/login', { replace: true, state: { from: `/services/apply/${id}` } });
      return;
    }
    (async () => {
      setLoading(true);
      setError('');
      try {
        const data = await api.getService(id);
        setService(data.service || null);
      } catch (err) {
        setError(err.message || 'Failed to load service');
      } finally {
        setLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, user?.id, navigate]);

  const handleSubmit = async (formData) => {
    if (!user || !service) return;
    setSubmitting(true);
    setError('');
    const submissionData = { ...formData };

    try {
      // Handle file uploads
      if (Array.isArray(service.fields)) {
        for (const field of service.fields) {
          if (field.type === 'file') {
            const key = (field.label || '').trim() || `field_${field.type}`;
            const file = submissionData[key];
            if (file instanceof File) {
              const uploadRes = await api.uploadFile(file);
              submissionData[key] = uploadRes.url;
            }
          }
        }
      }

      await api.submitApplication({
        userId: user.id,
        userName: user.name,
        userEmail: user.email,
        serviceId: service.id,
        serviceName: service.name,
        formData: submissionData
      });
      setSuccess(true);
      setTimeout(() => navigate('/profile'), 2500);
    } catch (err) {
      setError(err.message || 'Failed to submit application');
    } finally {
      setSubmitting(false);
    }
  };

  if (!user) return null;

  if (loading) {
    return (
      <div className="apply-page">
        <Navbar />
        <main className="apply-main"><p className="loading">Loading…</p></main>
      </div>
    );
  }

  if (error && !service) {
    return (
      <div className="apply-page">
        <Navbar />
        <main className="apply-main">
          <p className="error">{error}</p>
          <Link to="/services">← Back to Services</Link>
        </main>
      </div>
    );
  }

  if (success) {
    return (
      <div className="apply-page">
        <Navbar />
        <main className="apply-main">
          <div className="apply-success">
            <h2>Application submitted</h2>
            <p>Your application has been submitted successfully. You can track its status in My Profile. Redirecting…</p>
          </div>
        </main>
      </div>
    );
  }

  const fields = Array.isArray(service?.fields) && service.fields.length > 0
    ? service.fields
    : [];

  return (
    <div className="apply-page">
      <Navbar />
      <main className="apply-main">
        <div className="apply-container">
          <Link to="/services" className="back-link">← Back to Services</Link>
          <h1>Apply for {service?.name || 'Service'}</h1>
          {service?.description && <p className="service-desc">{service.description}</p>}
          {error && <p className="error">{error}</p>}
          {fields.length === 0 ? (
            <p className="empty">This service has no form fields. Please contact the admin.</p>
          ) : (
            <CitizenFormView fields={fields} onSubmit={handleSubmit} submitting={submitting} />
          )}
        </div>
      </main>
    </div>
  );
}
