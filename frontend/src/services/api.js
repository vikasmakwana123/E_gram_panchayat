const API_BASE = import.meta.env.VITE_API_URL || '/api';
const TIMEOUT_MS = 15000;

async function request(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);

  const config = {
    signal: controller.signal,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    },
    ...options
  };
  if (options.body && typeof options.body === 'object' && !(options.body instanceof FormData)) {
    config.body = JSON.stringify(options.body);
  } else if (options.body) {
    config.body = options.body;
  }

  try {
    const res = await fetch(url, config);
    clearTimeout(timeoutId);
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      throw new Error(data.error || data.message || res.statusText || 'Request failed');
    }
    return data;
  } catch (err) {
    clearTimeout(timeoutId);
    if (err.name === 'AbortError') {
      throw new Error('Request timed out. Check if the server is running and Firebase is configured.');
    }
    if (err.message) throw err;
    throw new Error('Network error. Is the backend running on port 3000?');
  }
}

export const api = {
  health: () => request('/health'),
  register: (body) => request('/register', { method: 'POST', body }),
  login: (body) => request('/login', { method: 'POST', body }),

  getServices: (activeOnly = true) =>
    request(`/admin/services${activeOnly !== undefined ? `?active=${!!activeOnly}` : ''}`),
  getService: (id) => request(`/admin/services/${id}`),
  createService: (body) => request('/admin/services', { method: 'POST', body }),
  updateService: (id, body) => request(`/admin/services/${id}`, { method: 'PUT', body }),
  deleteService: (id) => request(`/admin/services/${id}`, { method: 'DELETE' }),

  submitApplication: (body) => request('/applications', { method: 'POST', body }),
  getMyApplications: (userId) => request(`/applications/my?userId=${encodeURIComponent(userId)}`),
  getAllApplications: () => request('/admin/applications'),
  getApplicationStatuses: () => request('/admin/applications/statuses'),
  updateApplicationStatus: (id, status, remarks) =>
    request(`/admin/applications/${id}/status`, { method: 'PUT', body: { status, remarks } }),

  uploadFile: async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    const url = `${API_BASE}/upload`;

    // Use raw fetch to let browser set Content-Type with boundary
    const res = await fetch(url, {
      method: 'POST',
      body: formData
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || 'Upload failed');
    }
    return res.json();
  }
};

export default api;
