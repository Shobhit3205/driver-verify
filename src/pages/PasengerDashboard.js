import React, { useState } from 'react';

function PassengerDashboard({ user, onLogout }) {
  const [phone, setPhone] = useState('');
  const [driver, setDriver] = useState(null);
  const [error, setError] = useState('');
  const [searched, setSearched] = useState(false);

  const handleVerify = () => {
    setError('');
    setDriver(null);
    setSearched(true);

    if (!phone || phone.length !== 10) {
      setError('Please enter a valid 10-digit phone number');
      return;
    }

    const drivers = JSON.parse(localStorage.getItem('dv_drivers') || '[]');
    const found = drivers.find(d => d.phone === phone);

    if (!found) {
      setError('Driver not found. This number is not registered on DriverVerify.');
      return;
    }

    setDriver(found);
  };

  return (
    <div style={styles.container}>

      {/* Header */}
      <div style={styles.header}>
        <div>
          <div style={styles.logoBadge}>
            <div style={styles.greenDot}></div>
            <span style={styles.logoText}>DriverVerify</span>
          </div>
          <p style={styles.greeting}>Hi, {user.name.split(' ')[0]} 👋</p>
        </div>
        <button style={styles.logoutBtn} onClick={onLogout}>Logout</button>
      </div>

      {/* Search Card */}
      <div style={styles.card}>
        <p style={styles.cardTitle}>Verify a Driver</p>
        <p style={styles.cardSub}>Enter driver's phone number to check their profile</p>
        <div style={styles.searchRow}>
          <input
            type="text"
            placeholder="Driver's phone number"
            maxLength={10}
            value={phone}
            onChange={e => setPhone(e.target.value)}
            style={styles.input}
          />
          <button onClick={handleVerify} style={styles.searchBtn}>
            Check
          </button>
        </div>
        {error && <p style={styles.error}>{error}</p>}
      </div>

      {/* Driver Result */}
      {driver && (
        <div style={styles.card}>

          {/* Profile Header */}
          <div style={styles.profileHeader}>
            <div style={styles.avatar}>
              {driver.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()}
            </div>
            <div>
              <p style={styles.driverName}>{driver.name}</p>
              <span style={driver.status === 'approved' ? styles.badgeGreen : styles.badgeYellow}>
                {driver.status === 'approved' ? '✓ Verified' : 'Pending Verification'}
              </span>
            </div>
          </div>

          {/* Rating */}
          <div style={styles.ratingRow}>
            <span style={styles.stars}>
              {'★'.repeat(Math.round(driver.rating))}{'☆'.repeat(5 - Math.round(driver.rating))}
            </span>
            <span style={styles.ratingNum}>{driver.rating}</span>
            <span style={styles.trips}>({driver.trips} trips)</span>
          </div>

          {/* Divider */}
          <div style={styles.divider}></div>

          {/* Details */}
          {[
            ['Ola Driver ID', driver.olaid],
            ['Vehicle Number', driver.vehicle],
            ['Vehicle Type', driver.vtype],
            ['License No.', driver.license],
            ['City', driver.city],
            ['Registered', driver.registeredAt],
          ].map(([label, value]) => (
            <div key={label} style={styles.infoRow}>
              <span style={styles.infoLabel}>{label}</span>
              <span style={styles.infoValue}>{value}</span>
            </div>
          ))}

        </div>
      )}

    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
    padding: '1.5rem 1rem',
    maxWidth: '480px',
    margin: '0 auto',
  },
  header: {
    display: 'flex', justifyContent: 'space-between',
    alignItems: 'flex-start', marginBottom: '1.5rem',
  },
  logoBadge: {
    display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px',
  },
  greenDot: { width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#22c55e' },
  logoText: { fontSize: '15px', fontWeight: '600', color: '#111' },
  greeting: { fontSize: '18px', fontWeight: '600', color: '#111' },
  logoutBtn: {
    fontSize: '12px', color: '#888',
    backgroundColor: '#fff', border: '1px solid #e0e0e0',
    borderRadius: '99px', padding: '5px 14px', cursor: 'pointer', fontFamily: 'inherit',
  },
  card: {
    backgroundColor: '#fff', border: '1px solid #e0e0e0',
    borderRadius: '16px', padding: '1.25rem', marginBottom: '1rem',
  },
  cardTitle: { fontSize: '16px', fontWeight: '600', color: '#111', marginBottom: '4px' },
  cardSub: { fontSize: '13px', color: '#888', marginBottom: '1rem' },
  searchRow: { display: 'flex', gap: '8px' },
  input: {
    flex: 1, padding: '10px 12px',
    border: '1px solid #e0e0e0', borderRadius: '8px',
    fontSize: '14px', fontFamily: 'inherit', outline: 'none',
  },
  searchBtn: {
    padding: '10px 16px', backgroundColor: '#111', color: '#fff',
    border: 'none', borderRadius: '8px', fontSize: '14px',
    cursor: 'pointer', fontFamily: 'inherit',
  },
  error: { fontSize: '13px', color: '#e53e3e', marginTop: '8px' },
  profileHeader: { display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' },
  avatar: {
    width: '52px', height: '52px', borderRadius: '50%',
    backgroundColor: '#e8f0fe', display: 'flex', alignItems: 'center',
    justifyContent: 'center', fontSize: '18px', fontWeight: '600', color: '#3b5bdb',
  },
  driverName: { fontSize: '16px', fontWeight: '600', color: '#111', marginBottom: '4px' },
  badgeGreen: {
    fontSize: '12px', fontWeight: '600', padding: '3px 10px',
    borderRadius: '99px', backgroundColor: '#d1fae5', color: '#065f46',
  },
  badgeYellow: {
    fontSize: '12px', fontWeight: '600', padding: '3px 10px',
    borderRadius: '99px', backgroundColor: '#fef3c7', color: '#92400e',
  },
  ratingRow: { display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' },
  stars: { color: '#f59e0b', fontSize: '15px' },
  ratingNum: { fontSize: '14px', fontWeight: '600', color: '#111' },
  trips: { fontSize: '13px', color: '#888' },
  divider: { borderTop: '1px solid #f0f0f0', margin: '12px 0' },
  infoRow: {
    display: 'flex', justifyContent: 'space-between',
    padding: '7px 0', borderBottom: '1px solid #f9f9f9',
  },
  infoLabel: { fontSize: '13px', color: '#888' },
  infoValue: { fontSize: '13px', fontWeight: '600', color: '#111' },
};

export default PassengerDashboard;