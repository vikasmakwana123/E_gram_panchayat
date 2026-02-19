import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const DEFAULT_AVATAR = 'https://static.vecteezy.com/system/resources/previews/037/336/395/original/user-profile-flat-illustration-avatar-person-icon-gender-neutral-silhouette-profile-picture-free-vector.jpg';

function getStoredUser() {
  try {
    const raw = sessionStorage.getItem('userAuth');
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export default function Navbar() {
  const [user, setUser] = useState(getStoredUser);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleStorage = () => setUser(getStoredUser());
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem('userAuth');
    setUser(null);
    setDropdownOpen(false);
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-brand">
          E-Gram Panchayat
        </Link>
        <div className="navbar-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/services" className="nav-link">Services</Link>
          {user ? (
            <div className="nav-user" ref={dropdownRef}>
              <button
                type="button"
                className="nav-avatar-btn"
                onClick={() => setDropdownOpen((o) => !o)}
                aria-expanded={dropdownOpen}
                aria-haspopup="true"
              >
                <img src={DEFAULT_AVATAR} alt="Profile" className="nav-avatar" />
              </button>
              {dropdownOpen && (
                <div className="nav-dropdown">
                  <Link to="/profile" className="nav-dropdown-item" onClick={() => setDropdownOpen(false)}>
                    My Profile
                  </Link>
                  <button type="button" className="nav-dropdown-item" onClick={handleLogout}>
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="nav-link nav-link-login">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
}
