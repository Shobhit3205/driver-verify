import React from 'react';

function LandingPage({ onSelectRole }) {
  return (
    <div style={styles.container}>
      
      {/* Logo */}
      <div style={styles.logoSection}>
        <div style={styles.logoBadge}>
          <div style={styles.greenDot}></div>
          <span style={styles.logoText}>DriverVerify</span>
        </div>
        <p style={styles.logoSub}>Trust layer for Ola drivers · India</p>
      </div>

      {/* Heading */}
      <div style={styles.heroSection}>
        <h1 style={styles.heroTitle}>Verify your driver<br/>before you ride</h1>
        <p style={styles.heroSub}>
          Drivers register once. Passengers verify instantly.
          Admins keep the platform safe.
        </p>
      </div>

      {/* Role Cards */}
      <p style={styles.selectText}>Select your role to continue</p>
      <div style={styles.roleGrid}>

        <div style={styles.roleCard} onClick={() => onSelectRole('driver')}>
          <div style={styles.roleIcon}>🚗</div>
          <p style={styles.roleLabel}>Driver</p>
          <p style={styles.roleDesc}>Register & get verified</p>
        </div>

        <div style={styles.roleCard} onClick={() => onSelectRole('passenger')}>
          <div style={styles.roleIcon}>👤</div>
          <p style={styles.roleLabel}>Passenger</p>
          <p style={styles.roleDesc}>Verify your driver</p>
        </div>

        <div style={styles.roleCard} onClick={() => onSelectRole('admin')}>
          <div style={styles.roleIcon}>🛡️</div>
          <p style={styles.roleLabel}>Admin</p>
          <p style={styles.roleDesc}>Manage platform</p>
        </div>

      </div>
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
  logoSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '2rem',
  },
  logoBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    backgroundColor: '#fff',
    border: '1px solid #e0e0e0',
    borderRadius: '99px',
    padding: '6px 16px',
  },
  greenDot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: '#22c55e',
  },
  logoText: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#111',
  },
  logoSub: {
    fontSize: '13px',
    color: '#888',
    marginTop: '8px',
  },
  heroSection: {
    textAlign: 'center',
    marginBottom: '2rem',
  },
  heroTitle: {
    fontSize: '28px',
    fontWeight: '700',
    color: '#111',
    lineHeight: '1.3',
    marginBottom: '12px',
  },
  heroSub: {
    fontSize: '14px',
    color: '#666',
    lineHeight: '1.7',
  },
  selectText: {
    fontSize: '13px',
    color: '#888',
    marginBottom: '16px',
  },
  roleGrid: {
    display: 'flex',
    gap: '12px',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  roleCard: {
    backgroundColor: '#fff',
    border: '1px solid #e0e0e0',
    borderRadius: '16px',
    padding: '1.5rem 1rem',
    textAlign: 'center',
    cursor: 'pointer',
    width: '120px',
    transition: 'all 0.2s',
  },
  roleIcon: {
    fontSize: '28px',
    marginBottom: '8px',
  },
  roleLabel: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#111',
    marginBottom: '4px',
  },
  roleDesc: {
    fontSize: '11px',
    color: '#888',
  },
};

export default LandingPage;