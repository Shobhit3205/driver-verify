import React, { useState } from 'react';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import DriverDashboard from './pages/DriverDashboard';

function App() {
  const [currentRole, setCurrentRole] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  const handleSelectRole = (role) => {
    setCurrentRole(role);
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

  return (
    <div>
      {/* Landing Page */}
      {currentRole === null && (
        <LandingPage onSelectRole={handleSelectRole} />
      )}

      {/* Auth Page */}
      {currentRole !== null && currentUser === null && (
        <AuthPage
          role={currentRole}
          onLogin={handleLogin}
          onBack={handleBack}
        />
      )}

      {/* Driver Dashboard */}
      {currentUser !== null && currentUser.role === 'driver' && (
        <DriverDashboard user={currentUser} onLogout={handleLogout} />
      )}

      {/* Passenger Dashboard — coming next */}
      {currentUser !== null && currentUser.role === 'passenger' && (
        <div style={{ padding: '2rem', textAlign: 'center' }}>
          <h1>Passenger Dashboard — Coming Soon</h1>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}

      {/* Admin Dashboard — coming next */}
      {currentUser !== null && currentUser.role === 'admin' && (
        <div style={{ padding: '2rem', textAlign: 'center' }}>
          <h1>Admin Dashboard — Coming Soon</h1>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
}

export default App;