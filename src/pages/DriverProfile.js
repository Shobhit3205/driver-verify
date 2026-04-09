import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { verifyDriver } from '../api';

function DriverProfile() {
  const { phone } = useParams();
  const [driver, setDriver] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadDriver = async () => {
      const result = await verifyDriver(phone);
      if (result.driver) {
        setDriver(result.driver);
      } else {
        setError('Driver not found');
      }
      setLoading(false);
    };
    loadDriver();
  }, [phone]);

  if (loading) {
    return (
      <div style={styles.container}>
        <p style={styles.loadingText}>Loading driver profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <p style={{ fontSize: '40px', textAlign: 'center' }}>🚫</p>
          <p style={styles.errorText}>Driver not found</p>
          <p style={styles.errorSub}>This driver is not registered on DriverVerify</p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>

      {/* Logo */}
      <div style={styles.logoSection}>
        <div style={styles.logoBadge}>
          <div style={styles.greenDot}></div>
          <span style={styles.logoText}>DriverVerify</span>
        </div>
      </div>

      {/* Driver Card */}
      <div style={styles.card}>

        {/* Avatar + Name */}
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

      <p style={styles.footer}>Powered by DriverVerify 🇮🇳</p>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh', backgroundColor: '#f5f5f5',
    padding: '1.5rem 1rem', maxWidth: '480px', margin: '0 auto',
  },
  logoSection: { display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' },
  logoBadge: {
    display: 'flex', alignItems: 'center', gap: '8px',
    backgroundColor: '#fff', border: '1px solid #e0e0e0',
    borderRadius: '99px', padding: '6px 16px',
  },
  greenDot: { width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#22c55e' },
  logoText: { fontSize: '16px', fontWeight: '600', color: '#111' },
  loadingText: { textAlign: 'center', color: '#888', marginTop: '2rem' },
  card: {
    backgroundColor: '#fff', border: '1px solid #e0e0e0',
    borderRadius: '16px', padding: '1.25rem', marginBottom: '1rem',
  },
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
  errorText: { fontSize: '18px', fontWeight: '600', color: '#111', textAlign: 'center', marginBottom: '8px' },
  errorSub: { fontSize: '13px', color: '#888', textAlign: 'center' },
  footer: { textAlign: 'center', fontSize: '12px', color: '#888', marginTop: '1rem' },
};

export default DriverProfile;