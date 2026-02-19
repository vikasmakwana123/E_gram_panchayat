import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import ApplicationDetailsModal from '../components/ApplicationDetailsModal';
import './AdminApplications.css';


export default function AdminApplications() {
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedApp, setSelectedApp] = useState(null);

  useEffect(() => {
    // Check if admin is logged in
    const auth = sessionStorage.getItem('adminAuth');
    if (!auth) {
      navigate('/admin/login');
      return;
    }
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const data = await api.getAllApplications();
      setApplications(data.applications || []);
    } catch (err) {
      alert('Failed to load applications');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id, status, remarks) => {
    try {
      await api.updateApplicationStatus(id, status, remarks);
      // Update the local list to reflect changes
      setApplications(prev => prev.map(app =>
        app.id === id ? { ...app, status, remarks } : app
      ));
      alert('Status updated successfully!');
    } catch (err) {
      alert('Failed to update status: ' + err.message);
    }
  };

  return (
    <div className="admin-applications">
      <div className="page-header">
        <h1>Applications Management</h1>
        <button onClick={() => navigate('/admin/dashboard')} className="btn-back">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 12H5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12 19L5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back to Dashboard
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="applications-table" border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f0f0f0', textAlign: 'left' }}>
              <th>Applicant Name</th>
              <th>Service</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {applications.map(app => (
              <tr
                key={app.id}
                onClick={() => setSelectedApp(app)}
                style={{ cursor: 'pointer', borderBottom: '1px solid #ddd' }}
                title="Click to view details and update status"
              >
                <td>
                  {app.userName}
                  <br />
                  <small>{app.userEmail}</small>
                </td>
                <td>{app.serviceName}</td>
                <td>
                  <span className={`status-badge ${app.status.toLowerCase().replace(' ', '-')}`}>
                    {app.status}
                  </span>
                </td>
                <td>{new Date(app.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
            {applications.length === 0 && (
              <tr>
                <td colSpan="4" style={{ textAlign: 'center' }}>No applications found.</td>
              </tr>
            )}
          </tbody>
        </table>
      )}

      {selectedApp && (
        <ApplicationDetailsModal
          application={selectedApp}
          onClose={() => setSelectedApp(null)}
          onUpdateStatus={handleUpdateStatus}
        />
      )}
    </div>
  );
}
