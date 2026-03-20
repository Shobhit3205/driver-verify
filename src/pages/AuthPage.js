import React, { useState } from 'react';

function AuthPage({ role, onLogin, onBack }) {
  const [activeTab, setActiveTab] = useState('login');
  const [error, setError] = useState('');

  // Login fields
  const [loginPhone, setLoginPhone] = useState('');
  const [loginPass, setLoginPass] = useState('');

  // Signup fields
  const [suName, setSuName] = useState('');
  const [suPhone, setSuPhone] = useState('');
  const [suPass, setSuPass] = useState('');
  const [suOlaId, setSuOlaId] = useState('');
  const [suVehicle, setSuVehicle] = useState('');
  const [suLicense, setSuLicense] = useState('');
  const [suVtype, setSuVtype] = useState('');
  const [suCity, setSuCity] = useState('');

  const handleLogin = () => {
    setError('');
    if (!loginPhone || !loginPass) {
      setError('Please fill all fields'); return;
    }
    if (role === 'admin') {
      if (loginPhone === '0000000000' && loginPass === 'admin123') {
        onLogin({ name: 'Admin', role: 'admin' });
      } else {
        setError('Invalid admin credentials');
      }
      return;
    }
    const users = JSON.parse(localStorage.getItem('dv_users') || '[]');
    const user = users.find(u => u.phone === loginPhone && u.password === loginPass && u.role === role);
    if (!user) {
      setError('Phone or password incorrect'); return;
    }
    onLogin(user);
  };

  const handleSignup = () => {
    setError('');
    if (!suName || !suPhone || !suPass) {
      setError('Please fill all fields'); return;
    }
    if (suPhone.length !== 10) {
      setError('Enter valid 10-digit phone'); return;
    }
    if (suPass.length < 6) {
      setError('Password must be 6+ characters'); return;
    }
    if (role === 'driver') {
      if (!suOlaId || !suVehicle || !suLicense || !suVtype || !suCity) {
        setError('Please fill all driver fields'); return;
      }
    }
    const users = JSON.parse(localStorage.getItem('dv_users') || '[]');
    if (users.find(u => u.phone === suPhone)) {
      setError('Account already exists'); return;
    }
    const newUser = { id: 'U' + Date.now(), name: suName, phone: suPhone, password: suPass, role };
    users.push(newUser);
    localStorage.setItem('dv_users', JSON.stringify(users));

    if (role === 'driver') {
      const drivers = JSON.parse(localStorage.getItem('dv_drivers') || '[]');
      const newDriver = {
        id: 'DV' + Date.now(), userId: newUser.id, name: suName, phone: suPhone,
        olaid: suOlaId, vehicle: suVehicle, license: suLicense, vtype: suVtype,
        city: suCity, status: 'pending', rating: '4.5', trips: 0,
        registeredAt: new Date().toLocaleDateString('en-IN')
      };
      drivers.push(newDriver);
      localStorage.setItem('dv_drivers', JSON.stringify(drivers));
    }
    onLogin(newUser);
  };

  return (
    <div style={styles.container}>

      {/* Logo */}
      <div style={styles.logoSection}>
        <div style={styles.logoBadge}>
          <div style={styles.greenDot}></div>
          <span style={styles.logoText}>DriverVerify</span>
        </div>
      </div>

      {/* Card */}
      <div style={styles.card}>

        {/* Tab switcher — hide signup for admin */}
        <div style={styles.tabRow}>
          <button
            style={{ ...styles.tabBtn, ...(activeTab === 'login' ? styles.tabActive : {}) }}
            onClick={() => setActiveTab('login')}>
            Login
          </button>
          {role !== 'admin' && (
            <button
              style={{ ...styles.tabBtn, ...(activeTab === 'signup' ? styles.tabActive : {}) }}
              onClick={() => setActiveTab('signup')}>
              Sign Up
            </button>
          )}
        </div>

        {/* Login Form */}
        {activeTab === 'login' && (
          <div>
            <p style={styles.title}>
              {role === 'admin' ? 'Admin Login' : role === 'driver' ? 'Driver Login' : 'Passenger Login'}
            </p>
            <div style={styles.field}>
              <label style={styles.label}>Phone Number</label>
              <input style={styles.input} placeholder="10-digit phone"
                value={loginPhone} onChange={e => setLoginPhone(e.target.value)} maxLength={10} />
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Password</label>
              <input style={styles.input} type="password" placeholder="Enter password"
                value={loginPass} onChange={e => setLoginPass(e.target.value)} />
            </div>
            {error && <p style={styles.error}>{error}</p>}
            <button style={styles.btn} onClick={handleLogin}>Login</button>
          </div>
        )}

        {/* Signup Form */}
        {activeTab === 'signup' && (
          <div>
            <p style={styles.title}>
              {role === 'driver' ? 'Driver Registration' : 'Create Account'}
            </p>
            <div style={styles.field}>
              <label style={styles.label}>Full Name</label>
              <input style={styles.input} placeholder="Your full name"
                value={suName} onChange={e => setSuName(e.target.value)} />
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Phone Number</label>
              <input style={styles.input} placeholder="10-digit phone"
                value={suPhone} onChange={e => setSuPhone(e.target.value)} maxLength={10} />
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Password</label>
              <input style={styles.input} type="password" placeholder="Min 6 characters"
                value={suPass} onChange={e => setSuPass(e.target.value)} />
            </div>

            {/* Extra fields for driver */}
            {role === 'driver' && (
              <>
                <div style={styles.field}>
                  <label style={styles.label}>Ola Driver ID</label>
                  <input style={styles.input} placeholder="OLA-DL-XXXXX"
                    value={suOlaId} onChange={e => setSuOlaId(e.target.value)} />
                </div>
                <div style={styles.field}>
                  <label style={styles.label}>Vehicle Number</label>
                  <input style={styles.input} placeholder="DL 01 AB 1234"
                    value={suVehicle} onChange={e => setSuVehicle(e.target.value)} />
                </div>
                <div style={styles.field}>
                  <label style={styles.label}>Driving License No.</label>
                  <input style={styles.input} placeholder="DL-0120110012345"
                    value={suLicense} onChange={e => setSuLicense(e.target.value)} />
                </div>
                <div style={styles.field}>
                  <label style={styles.label}>Vehicle Type</label>
                  <select style={styles.input} value={suVtype} onChange={e => setSuVtype(e.target.value)}>
                    <option value="">Select type</option>
                    <option>Ola Mini</option>
                    <option>Ola Sedan</option>
                    <option>Ola Prime</option>
                    <option>Ola Auto</option>
                    <option>Ola Bike</option>
                  </select>
                </div>
                <div style={styles.field}>
                  <label style={styles.label}>City</label>
                  <input style={styles.input} placeholder="Delhi"
                    value={suCity} onChange={e => setSuCity(e.target.value)} />
                </div>
              </>
            )}

            {error && <p style={styles.error}>{error}</p>}
            <button style={styles.btn} onClick={handleSignup}>Create Account</button>
          </div>
        )}
      </div>

      {/* Back button */}
      <button style={styles.backBtn} onClick={onBack}>← Change role</button>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '2rem 1rem',
  },
  logoSection: { marginBottom: '1.5rem' },
  logoBadge: {
    display: 'flex', alignItems: 'center', gap: '8px',
    backgroundColor: '#fff', border: '1px solid #e0e0e0',
    borderRadius: '99px', padding: '6px 16px',
  },
  greenDot: { width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#22c55e' },
  logoText: { fontSize: '16px', fontWeight: '600', color: '#111' },
  card: {
    backgroundColor: '#fff', border: '1px solid #e0e0e0',
    borderRadius: '16px', padding: '1.5rem', width: '100%', maxWidth: '400px',
  },
  tabRow: {
    display: 'flex', gap: '4px',
    backgroundColor: '#f5f5f5', borderRadius: '10px',
    padding: '3px', marginBottom: '1.25rem',
  },
  tabBtn: {
    flex: 1, padding: '8px', border: 'none',
    borderRadius: '8px', backgroundColor: 'transparent',
    fontSize: '14px', cursor: 'pointer', color: '#888', fontFamily: 'inherit',
  },
  tabActive: { backgroundColor: '#fff', color: '#111', fontWeight: '600' },
  title: { fontSize: '18px', fontWeight: '600', color: '#111', marginBottom: '1rem' },
  field: { marginBottom: '12px' },
  label: { display: 'block', fontSize: '13px', color: '#666', marginBottom: '5px' },
  input: {
    width: '100%', padding: '10px 12px',
    border: '1px solid #e0e0e0', borderRadius: '8px',
    fontSize: '14px', fontFamily: 'inherit',
    outline: 'none', backgroundColor: '#fff', color: '#111',
  },
  btn: {
    width: '100%', padding: '11px',
    backgroundColor: '#111', color: '#fff',
    border: 'none', borderRadius: '8px',
    fontSize: '14px', fontWeight: '600',
    cursor: 'pointer', fontFamily: 'inherit', marginTop: '4px',
  },
  error: { fontSize: '13px', color: '#e53e3e', marginBottom: '8px', textAlign: 'center' },
  backBtn: {
    marginTop: '1rem', background: 'none', border: 'none',
    color: '#888', fontSize: '13px', cursor: 'pointer', fontFamily: 'inherit',
  },
};

export default AuthPage;