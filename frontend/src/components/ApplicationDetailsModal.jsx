import { useState } from 'react';
import './ApplicationDetailsModal.css';

export default function ApplicationDetailsModal({ application, onClose, onUpdateStatus }) {
    const [status, setStatus] = useState(application?.status || '');
    const [remarks, setRemarks] = useState(application?.remarks || '');
    const [updating, setUpdating] = useState(false);

    if (!application) return null;

    const { formData, userName, userEmail, serviceName } = application;

    const handleSave = async () => {
        if (!onUpdateStatus) return;
        setUpdating(true);
        await onUpdateStatus(application.id, status, remarks);
        setUpdating(false);
        onClose();
    };

    const STATUS_OPTIONS = [
        'Submitted', 'Under Review', 'Pending Documents',
        'Forwarded to Officer', 'Approved', 'Rejected',
        'In Progress', 'Completed', 'Closed'
    ];

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <header className="modal-header">
                    <h2>Application Details</h2>
                    <button className="modal-close" onClick={onClose}>×</button>
                </header>
                <div className="modal-body">
                    <div className="detail-row">
                        <strong>Service:</strong> <span>{serviceName}</span>
                    </div>
                    <div className="detail-row">
                        <strong>Applicant:</strong> <span>{userName} ({userEmail})</span>
                    </div>

                    <hr />

                    <div className="status-update-section">
                        <h3>Update Status</h3>
                        <div className="form-group">
                            <label>Status:</label>
                            <select value={status} onChange={(e) => setStatus(e.target.value)}>
                                {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Remarks:</label>
                            <textarea
                                rows="2"
                                value={remarks}
                                onChange={(e) => setRemarks(e.target.value)}
                                placeholder="Add remarks here..."
                            />
                        </div>
                    </div>

                    <hr />
                    <h3>Form Data</h3>
                    <div className="form-data-grid">
                        {Object.entries(formData || {}).map(([key, value]) => (
                            <div key={key} className="data-item">
                                <label>{key}</label>
                                <div className="value">
                                    {isUrl(value) ? (
                                        <a href={value} target="_blank" rel="noopener noreferrer" className="file-link">
                                            View File ↗
                                        </a>
                                    ) : (
                                        <span>{String(value)}</span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <footer className="modal-footer">
                    <button onClick={handleSave} className="btn-primary" disabled={updating}>
                        {updating ? 'Saving...' : 'Save & Close'}
                    </button>
                    <button onClick={onClose} className="btn-secondary">Cancel</button>
                </footer>
            </div>
        </div>
    );
}

function isUrl(string) {
    try {
        const url = new URL(string);
        return url.protocol === 'http:' || url.protocol === 'https:';
    } catch (_) {
        return false;
    }
}
