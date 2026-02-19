import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../services/api';
import DynamicFormBuilder from '../components/DynamicFormBuilder';
import './ServiceCreate.css';

export default function ServiceEdit() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [fields, setFields] = useState([{ label: '', type: 'text', placeholder: '', required: false, options: [] }]);
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!sessionStorage.getItem('adminAuth')) {
      navigate('/admin/login', { replace: true, state: { from: { pathname: `/admin/services/edit/${id}` } } });
      return;
    }
    loadService();
  }, [navigate, id]);

  const loadService = async () => {
    setLoadError('');
    try {
      const data = await api.getService(id);
      const svc = data.service;
      if (svc) {
        setName(svc.name || '');
        setDescription(svc.description || '');
        setFields(Array.isArray(svc.fields) && svc.fields.length > 0 ? svc.fields : [{ label: '', type: 'text', placeholder: '', required: false, options: [] }]);
      }
    } catch (err) {
      setLoadError(err.message || 'Failed to load service');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const validFields = fields.filter(f => f.label && f.label.trim());
    if (validFields.length === 0) {
      setError('Add at least one field with a label.');
      return;
    }
    setLoading(true);
    try {
      await api.updateService(id, {
        name: name.trim(),
        description: description.trim(),
        fields: validFields
      });
      navigate('/admin/services');
    } catch (err) {
      setError(err.message || 'Failed to update service');
    } finally {
      setLoading(false);
    }
  };

  if (loadError) {
    return (
      <div className="service-create">
        <header className="page-header">
          <button type="button" className="btn-back" onClick={() => navigate('/admin/services')}>← Back to Services</button>
          <h1>Edit Service</h1>
        </header>
        <p className="form-error">{loadError}</p>
      </div>
    );
  }

  return (
    <div className="service-create">
      <header className="page-header">
        <button type="button" className="btn-back" onClick={() => navigate('/admin/dashboard')}>← Dashboard</button>
        <h1>Update Service</h1>
      </header>
      <form onSubmit={handleSubmit} className="service-form">
        <label>
          <span>Service Name *</span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Income Certificate"
            required
          />
        </label>
        <label>
          <span>Description</span>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Brief description of the service"
            rows={3}
          />
        </label>
        <DynamicFormBuilder fields={fields} onChange={setFields} />
        {error && <p className="form-error">{error}</p>}
        <div className="form-actions">
          <button type="button" onClick={() => navigate('/admin/services')}>Cancel</button>
          <button type="submit" disabled={loading}>{loading ? 'Updating…' : 'Update Service'}</button>
        </div>
      </form>
    </div>
  );
}
