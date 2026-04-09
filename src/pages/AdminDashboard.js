import { getAllDrivers, approveDriver, rejectDriver } from '../api';
import React, { useState, useEffect } from 'react';



function AdminDashboard({ onLogout }) {
  const [activeTab, setActiveTab] = useState('pending');
  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    loadDrivers();
  }, []);

const loadDrivers = async () => {
  const result = await getAllDrivers();
  if (result.drivers) {
    setDrivers(result.drivers);
  }
};
const handleApprove = async (driverId) => {
  await approveDriver(driverId);
  loadDrivers();
};
 const handleReject = async (driverId) => {
  await rejectDriver(driverId);
  loadDrivers();
};
  const pendingDrivers = drivers.filter(d => d.status === 'pending');
  const approvedDrivers = drivers.filter(d => d.status === 'approved');
  const currentList = activeTab === 'pending' ? pendingDrivers : approvedDrivers;

  return (
    <div style={styles.container}>

      {/* Header */}
      <div style={styles.header}>
        <div>
          <div style={styles.logoBadge}>
            <div style={styles.greenDot}></div>
            <span style={styles.logoText}>DriverVerify</span>
          </div>
          <p style={styles.greeting}>Admin Panel 🛡️</p>
        </div>
        <button style={styles.logoutBtn} onClick={onLogout}>Logout</button>
      </div>

      {/* Stats Row */}
      <div style={styles.statsRow}>
        <div style={styles.statCard}>
          <p style={styles.statNum}>{pendingDrivers.length}</p>
          <p style={styles.statLabel}>Pending</p>
        </div>
        <div style={styles.statCard}>
          <p style={styles.statNum}>{approvedDrivers.length}</p>
          <p style={styles.statLabel}>Approved</p>
        </div>
        <div style={styles.statCard}>
          <p style={styles.statNum}>{drivers.length}</p>
          <p style={styles.statLabel}>Total</p>
        </div>
      </div>

      {/* Tab Nav */}
      <div style={styles.tabRow}>
        <button
          style={{ ...styles.tabBtn, ...(activeTab === 'pending' ? styles.tabActive : {}) }}
          onClick={() => setActiveTab('pending')}>
          Pending ({pendingDrivers.length})
        </button>
        <button
          style={{ ...styles.tabBtn, ...(activeTab === 'approved' ? styles.tabActive : {}) }}
          onClick={() => setActiveTab('approved')}>
          Approved ({approvedDrivers.length})
        </button>
      </div>

      {/* Driver List */}
      {currentList.length === 0 ? (
        <div style={styles.emptyBox}>
          <p style={styles.emptyText}>
            {activeTab === 'pending' ? 'No pending drivers' : 'No approved drivers yet'}
          </p>
        </div>
      ) : (
        currentList.map(driver => (
          <div key={driver.id} style={styles.card}>

            {/* Driver Header */}
            <div style={styles.cardHeader}>
              <div style={styles.avatar}>
                {driver.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()}
              </div>
              <div style={{ flex: 1 }}>
                <p style={styles.driverName}>{driver.name}</p>
                <p style={styles.driverSub}>{driver.phone} · {driver.city}</p>
              </div>
              <span style={driver.status === 'approved' ? styles.badgeGreen : styles.badgeYellow}>
                {driver.status === 'approved' ? 'Approved' : 'Pending'}
              </span>
            </div>

            {/* Tags */}
            <div style={styles.tagRow}>
              <span style={styles.tag}>{driver.olaid}</span>
              <span style={styles.tag}>{driver.vehicle}</span>
              <span style={styles.tag}>{driver.vtype}</span>
            </div>

            {/* Details */}
            <div style={styles.divider}></div>
            {[
              ['License', driver.license],
              ['Registered', driver.registeredAt],
            ].map(([label, value]) => (
              <div key={label} style={styles.infoRow}>
                <span style={styles.infoLabel}>{label}</span>
                <span style={styles.infoValue}>{value}</span>
              </div>
            ))}

            {/* Action Buttons */}
            {driver.status === 'pending' && (
              <div style={styles.btnRow}>
                <button
                  style={styles.approveBtn}
                  onClick={() => handleApprove(driver.id)}>
                  ✓ Approve
                </button>
                <button
                  style={styles.rejectBtn}
                  onClick={() => handleReject(driver.id)}>
                  ✕ Reject
                </button>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh', backgroundColor: '#f5f5f5',
    padding: '1.5rem 1rem', maxWidth: '480px', margin: '0 auto',
  },
  header: {
    display: 'flex', justifyContent: 'space-between',
    alignItems: 'flex-start', marginBottom: '1.5rem',
  },
  logoBadge: { display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' },
  greenDot: { width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#22c55e' },
  logoText: { fontSize: '15px', fontWeight: '600', color: '#111' },
  greeting: { fontSize: '18px', fontWeight: '600', color: '#111' },
  logoutBtn: {
    fontSize: '12px', color: '#888', backgroundColor: '#fff',
    border: '1px solid #e0e0e0', borderRadius: '99px',
    padding: '5px 14px', cursor: 'pointer', fontFamily: 'inherit',
  },
  statsRow: { display: 'flex', gap: '10px', marginBottom: '1.25rem' },
  statCard: {
    flex: 1, backgroundColor: '#fff', border: '1px solid #e0e0e0',
    borderRadius: '12px', padding: '12px', textAlign: 'center',
  },
  statNum: { fontSize: '24px', fontWeight: '700', color: '#111' },
  statLabel: { fontSize: '12px', color: '#888', marginTop: '2px' },
  tabRow: {
    display: 'flex', gap: '4px', backgroundColor: '#fff',
    border: '1px solid #e0e0e0', borderRadius: '12px',
    padding: '4px', marginBottom: '1.25rem',
  },
  tabBtn: {
    flex: 1, padding: '8px', border: 'none', borderRadius: '8px',
    backgroundColor: 'transparent', fontSize: '13px',
    cursor: 'pointer', color: '#888', fontFamily: 'inherit',
  },
  tabActive: { backgroundColor: '#f5f5f5', color: '#111', fontWeight: '600' },
  emptyBox: {
    backgroundColor: '#fff', border: '1px solid #e0e0e0',
    borderRadius: '16px', padding: '2rem', textAlign: 'center',
  },
  emptyText: { fontSize: '14px', color: '#888' },
  card: {
    backgroundColor: '#fff', border: '1px solid #e0e0e0',
    borderRadius: '16px', padding: '1.25rem', marginBottom: '10px',
  },
  cardHeader: { display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' },
  avatar: {
    width: '44px', height: '44px', borderRadius: '50%',
    backgroundColor: '#e8f0fe', display: 'flex', alignItems: 'center',
    justifyContent: 'center', fontSize: '15px', fontWeight: '600', color: '#3b5bdb',
  },
  driverName: { fontSize: '14px', fontWeight: '600', color: '#111' },
  driverSub: { fontSize: '12px', color: '#888', marginTop: '2px' },
  badgeGreen: {
    fontSize: '11px', fontWeight: '600', padding: '3px 10px',
    borderRadius: '99px', backgroundColor: '#d1fae5', color: '#065f46',
  },
  badgeYellow: {
    fontSize: '11px', fontWeight: '600', padding: '3px 10px',
    borderRadius: '99px', backgroundColor: '#fef3c7', color: '#92400e',
  },
  tagRow: { display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '10px' },
  tag: {
    fontSize: '11px', padding: '3px 10px', borderRadius: '99px',
    backgroundColor: '#f5f5f5', color: '#666',
  },
  divider: { borderTop: '1px solid #f0f0f0', margin: '10px 0' },
  infoRow: {
    display: 'flex', justifyContent: 'space-between',
    padding: '6px 0', borderBottom: '1px solid #f9f9f9',
  },
  infoLabel: { fontSize: '13px', color: '#888' },
  infoValue: { fontSize: '13px', fontWeight: '600', color: '#111' },
  btnRow: { display: 'flex', gap: '8px', marginTop: '12px' },
  approveBtn: {
    flex: 1, padding: '10px', backgroundColor: '#111',
    color: '#fff', border: 'none', borderRadius: '8px',
    fontSize: '13px', fontWeight: '600', cursor: 'pointer', fontFamily: 'inherit',
  },
  rejectBtn: {
    flex: 1, padding: '10px', backgroundColor: '#fff',
    color: '#e53e3e', border: '1px solid #e53e3e', borderRadius: '8px',
    fontSize: '13px', fontWeight: '600', cursor: 'pointer', fontFamily: 'inherit',
  },
};

export default AdminDashboard;