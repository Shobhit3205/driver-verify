import React, { useState } from 'react';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import DriverDashboard from './pages/DriverDashboard';
import PassengerDashboard from './pages/PasengerDashboard';
import AdminDashboard from './pages/AdminDashboard';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DriverProfile from './pages/DriverProfile';

const ADMIN_SECRET = 'SHOBHIT@6389180389';

const styles = {
  adminLogin: {
    minHeight: '100vh', backgroundColor: '#f5f5f5',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
  adminCard: {
    backgroundColor: '#fff', border: '1px solid #e0e0e0',
    borderRadius: '16px', padding: '2rem', width: '100%', maxWidth: '360px',
  },
  logoBadge: { display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '1.5rem' },
  greenDot: { width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#22c55e' },
  logoText: { fontSize: '16px', fontWeight: '600', color: '#111' },
  adminTitle: { fontSize: '20px', fontWeight: '700', color: '#111', marginBottom: '1rem' },
  input: {
    width: '100%', padding: '10px 12px', border: '1px solid #e0e0e0',
    borderRadius: '8px', fontSize: '14px', fontFamily: 'inherit',
    outline: 'none', marginBottom: '8px',
  },
  error: { fontSize: '13px', color: '#e53e3e', marginBottom: '8px' },
  btn: {
    width: '100%', padding: '11px', backgroundColor: '#111',
    color: '#fff', border: 'none', borderRadius: '8px',
    fontSize: '14px', fontWeight: '600', cursor: 'pointer', fontFamily: 'inherit',
  },
};

function App() {
  const [currentRole, setCurrentRole] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [adminInput, setAdminInput] = useState('');
  const [adminError, setAdminError] = useState('');

  const handleSelectRole = (role) => {
    if (role === 'admin') {
      setCurrentRole('fake-admin');
    } else {
      setCurrentRole(role);
    }
  };

  const handleLogin = (user) => {
    setCurrentUser(user);
  };

  const handleBack = () => {
    setCurrentRole(null);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentRole(null);
  };

  const handleAdminLogin = () => {
    if (adminInput === ADMIN_SECRET) {
      setCurrentUser({ name: 'Shobhit', role: 'admin' });
    } else {
      setAdminError('Wrong password!');
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/driver/:phone" element={<DriverProfile />} />

        <Route path="/admin-dv-9x2k" element={
          currentUser && currentUser.role === 'admin' ? (
            <AdminDashboard onLogout={handleLogout} />
          ) : (
            <div style={styles.adminLogin}>
              <div style={styles.adminCard}>
                <div style={styles.logoBadge}>
                  <div style={styles.greenDot}></div>
                  <span style={styles.logoText}>DriverVerify</span>
                </div>
                <p style={styles.adminTitle}>Admin Access</p>
                <input
                  type="password"
                  placeholder="Enter admin password"
                  value={adminInput}
                  onChange={e => setAdminInput(e.target.value)}
                  style={styles.input}
                />
                {adminError && <p style={styles.error}>{adminError}</p>}
                <button style={styles.btn} onClick={handleAdminLogin}>Login</button>
              </div>
            </div>
          )
        } />

        <Route path="/*" element={
          <div>
            {currentRole === 'fake-admin' && (
              <div style={styles.adminLogin}>
                <div style={styles.adminCard}>
                  <div style={styles.logoBadge}>
                    <div style={styles.greenDot}></div>
                    <span style={styles.logoText}>DriverVerify</span>
                  </div>
                  <p style={{ fontSize: '40px', textAlign: 'center', marginBottom: '1rem' }}>🚫</p>
                  <p style={{ fontSize: '18px', fontWeight: '700', color: '#111', textAlign: 'center', marginBottom: '8px' }}>
                    Access Denied
                  </p>
                  <p style={{ fontSize: '13px', color: '#888', textAlign: 'center', marginBottom: '1.5rem', lineHeight: '1.6' }}>
                    You are not authorized to access the admin panel.
                  </p>
                  <button style={styles.btn} onClick={handleBack}>Go Back</button>
                </div>
              </div>
            )}
            {currentRole === null && (
              <LandingPage onSelectRole={handleSelectRole} />
            )}
            {currentRole !== null && currentRole !== 'fake-admin' && currentUser === null && (
              <AuthPage role={currentRole} onLogin={handleLogin} onBack={handleBack} />
            )}
            {currentUser !== null && currentUser.role === 'driver' && (
              <DriverDashboard user={currentUser} onLogout={handleLogout} />
            )}
            {currentUser !== null && currentUser.role === 'passenger' && (
              <PassengerDashboard user={currentUser} onLogout={handleLogout} />
            )}
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;