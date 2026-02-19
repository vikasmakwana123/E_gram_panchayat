import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import EntryPage from './pages/EntryPage';
import Register from './pages/Register';
import UserLogin from './pages/UserLogin';
import Profile from './pages/Profile';
import PublicServices from './pages/PublicServices';
import ApplyService from './pages/ApplyService';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import ServiceList from './pages/ServiceList';
import ServiceCreate from './pages/ServiceCreate';
import ServiceEdit from './pages/ServiceEdit';
import AdminApplications from './pages/AdminApplications';
import StaffLogin from './pages/StaffLogin';
import StaffDashboard from './pages/StaffDashboard';
import './App.css';

function RequireAdmin({ children }) {
  const location = useLocation();
  if (!sessionStorage.getItem('adminAuth')) {
    return <Navigate to="/admin/login" replace state={{ from: { pathname: location.pathname } }} />;
  }
  return children;
}

function RequireStaff({ children }) {
  const location = useLocation();
  if (!sessionStorage.getItem('staffAuth')) {
    return <Navigate to="/staff/login" replace state={{ from: { pathname: location.pathname } }} />;
  }
  return children;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EntryPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/services" element={<PublicServices />} />
        <Route path="/services/apply/:id" element={<ApplyService />} />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<RequireAdmin><AdminDashboard /></RequireAdmin>} />
        <Route path="/admin/services" element={<RequireAdmin><ServiceList /></RequireAdmin>} />
        <Route path="/admin/services/create" element={<RequireAdmin><ServiceCreate /></RequireAdmin>} />
        <Route path="/admin/services/edit/:id" element={<RequireAdmin><ServiceEdit /></RequireAdmin>} />
        <Route path="/admin/applications" element={<RequireAdmin><AdminApplications /></RequireAdmin>} />

        {/* Staff Routes */}
        <Route path="/staff/login" element={<StaffLogin />} />
        <Route path="/staff/dashboard" element={<RequireStaff><StaffDashboard /></RequireStaff>} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
