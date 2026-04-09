import React, { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { getDriverByUserId } from '../api';

function DriverDashboard({ user, onLogout }) {
  const [activeTab, setActiveTab] = useState('profile');
  const [driver, setDriver] = useState(null);

useEffect(() => {
  const loadDriver = async () => {
    const result = await getDriverByUserId(user._id || user.id);
    if (result.driver) {
      setDriver(result.driver);
    }
  };
  loadDriver();
}, [user]);

  if (!driver) {
    return (
      <div style={styles.container}>
        <p style={{ color: '#888', textAlign: 'center' }}>Driver profile not found.</p>
      </div>
    );
  }

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

      {/* Tab Nav */}
      <div style={styles.tabRow}>
        <button style={{ ...styles.tabBtn, ...(activeTab === 'profile' ? styles.tabActive : {}) }}
          onClick={() => setActiveTab('profile')}>My Profile</button>
        <button style={{ ...styles.tabBtn, ...(activeTab === 'qr' ? styles.tabActive : {}) }}
          onClick={() => setActiveTab('qr')}>My QR Code</button>
      </div>

      {/* Profile Tab */}
      {activeTab === 'profile' && (
        <div style={styles.card}>

          {/* Avatar + Name */}
          <div style={styles.avatarRow}>
            <div style={styles.avatar}>
              {user.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()}
            </div>
            <div>
              <p style={styles.driverName}>{driver.name}</p>
              <span style={driver.status === 'approved' ? styles.badgeGreen : styles.badgeYellow}>
                {driver.status === 'approved' ? '✓ Verified' : 'Pending Approval'}
              </span>
            </div>
          </div>

          {/* Info Rows */}
          <div style={styles.divider}></div>
          {[
            { label: 'Phone', value: driver.phone },
            { label: 'Ola Driver ID', value: driver.olaid },
            { label: 'Vehicle Number', value: driver.vehicle },
            { label: 'Vehicle Type', value: driver.vtype },
            { label: 'License No.', value: driver.license },
            { label: 'City', value: driver.city },
            { label: 'Registered', value: driver.registeredAt },
          ].map((item, i) => (
            <div key={i} style={styles.infoRow}>
              <span style={styles.infoLabel}>{item.label}</span>
              <span style={styles.infoValue}>{item.value}</span>
            </div>
          ))}

          {driver.status === 'pending' && (
            <p style={styles.pendingNote}>
              Your profile is under review. Admin will approve it shortly.
            </p>
          )}
        </div>
      )}

      {/* QR Tab */}
      {activeTab === 'qr' && (
        <div style={{ ...styles.card, textAlign: 'center' }}>
          <p style={styles.qrTitle}>Your Verification QR</p>
          <p style={styles.qrSub}>Show this to passengers to verify your identity</p>
          <div style={styles.qrBox}>
     <QRCodeSVG
  value={`DRIVERVERIFY:${driver.phone}:${driver.id}`}
  size={130}
  level="H"
/>
  
           </div>
          <p style={{ fontSize: '12px', color: '#888', marginTop: '8px' }}>
            Driver ID: {driver.id}
          </p>
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
    display: 'flex', alignItems: 'center', gap: '6px',
    marginBottom: '4px',
  },
  greenDot: { width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#22c55e' },
  logoText: { fontSize: '15px', fontWeight: '600', color: '#111' },
  greeting: { fontSize: '18px', fontWeight: '600', color: '#111' },
  logoutBtn: {
    fontSize: '12px', color: '#888',
    backgroundColor: '#fff', border: '1px solid #e0e0e0',
    borderRadius: '99px', padding: '5px 14px', cursor: 'pointer', fontFamily: 'inherit',
  },
  tabRow: {
    display: 'flex', gap: '4px',
    backgroundColor: '#fff', border: '1px solid #e0e0e0',
    borderRadius: '12px', padding: '4px', marginBottom: '1.25rem',
  },
  tabBtn: {
    flex: 1, padding: '8px', border: 'none',
    borderRadius: '8px', backgroundColor: 'transparent',
    fontSize: '13px', cursor: 'pointer', color: '#888', fontFamily: 'inherit',
  },
  tabActive: { backgroundColor: '#f5f5f5', color: '#111', fontWeight: '600' },
  card: {
    backgroundColor: '#fff', border: '1px solid #e0e0e0',
    borderRadius: '16px', padding: '1.25rem',
  },
  avatarRow: { display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1rem' },
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
  divider: { borderTop: '1px solid #f0f0f0', margin: '12px 0' },
  infoRow: {
    display: 'flex', justifyContent: 'space-between',
    alignItems: 'center', padding: '8px 0',
    borderBottom: '1px solid #f5f5f5', fontSize: '14px',
  },
  infoLabel: { color: '#888', fontSize: '13px' },
  infoValue: { fontWeight: '600', color: '#111', fontSize: '13px' },
  pendingNote: {
    fontSize: '12px', color: '#888', textAlign: 'center',
    marginTop: '12px', lineHeight: '1.6',
  },
  qrTitle: { fontSize: '16px', fontWeight: '600', color: '#111', marginBottom: '4px' },
  qrSub: { fontSize: '13px', color: '#888', marginBottom: '1.25rem' },
  qrBox: {
    width: '140px', height: '140px',
    border: '1px solid #e0e0e0', borderRadius: '12px',
    display: 'flex', flexDirection: 'column',
    alignItems: 'center', justifyContent: 'center',
    margin: '0 auto',
  },
};

export default DriverDashboard;