import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import ApplicationDetailsModal from '../components/ApplicationDetailsModal';
import './AdminApplications.css';

const STATUS_OPTIONS = [
    'Submitted',
    'Under Review',
    'Pending Documents',
    'Forwarded to Officer',
    'Approved',
    'Rejected',
    'In Progress',
    'Completed',
    'Closed'
];

export default function StaffDashboard() {
    const navigate = useNavigate();
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedApp, setSelectedApp] = useState(null);

    useEffect(() => {
        // Check if staff is logged in
        const auth = sessionStorage.getItem('staffAuth');
        if (!auth) {
            navigate('/staff/login');
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

            setApplications(prev => prev.map(app =>
                app.id === id ? { ...app, status, remarks } : app
            ));
            alert('Status updated successfully!');
        } catch (err) {
            alert('Failed to update status: ' + err.message);
        }
    };

    const logout = () => {
        sessionStorage.removeItem('staffAuth');
        navigate('/staff/login');
    };

    return (
        <div className="admin-applications">
            <header className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: '#ecf0f1' }}>
                <h1 style={{ margin: 0 }}>Staff Dashboard</h1>
                <button onClick={logout} style={{ background: '#e74c3c', color: 'white', border: 'none', padding: '0.5rem 1rem', cursor: 'pointer' }}>
                    Logout
                </button>
            </header>

            <main style={{ padding: '2rem' }}>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead>
                            <tr style={{ background: '#bdc3c7' }}>
                                <th>Applicant</th>
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
                                    style={{ cursor: 'pointer', background: 'white' }}
                                    title="Click to view details"
                                >
                                    <td>{app.userName}<br /><small>{app.userEmail}</small></td>
                                    <td>{app.serviceName}</td>
                                    <td>{app.status}</td>
                                    <td>{new Date(app.createdAt).toLocaleDateString()}</td>
                                </tr>
                            ))}
                            {applications.length === 0 && (
                                <tr><td colSpan="4">No applications found.</td></tr>
                            )}
                        </tbody>
                    </table>
                )}
            </main>

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
