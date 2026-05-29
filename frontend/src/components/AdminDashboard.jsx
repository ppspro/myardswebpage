import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../api/client';

const AdminDashboard = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [deliveryPartners, setDeliveryPartners] = useState([]);
  const [activeTab, setActiveTab] = useState('restaurants');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }
    fetchData();
  }, [navigate]);

  const fetchData = async () => {
    setLoading(true);
    const token = localStorage.getItem('adminToken');
    const config = { headers: { Authorization: `Bearer ${token}` } };
    try {
      const [restRes, delRes] = await Promise.all([
        apiClient.get('/api/restaurants', config),
        apiClient.get('/api/delivery', config)
      ]);
      setRestaurants(restRes.data);
      setDeliveryPartners(delRes.data);
    } catch (err) {
      if (err.response && err.response.status === 401) {
        navigate('/admin/login');
      }
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (type, id, status) => {
    const reason = status === 'Rejected' ? prompt('Enter rejection reason:') : '';
    if (status === 'Rejected' && reason === null) return; // cancelled prompt

    const token = localStorage.getItem('adminToken');
    const config = { headers: { Authorization: `Bearer ${token}` } };
    try {
      await apiClient.put(`/api/${type}/${id}/status`, { status, reason }, config);
      fetchData();
    } catch (err) {
      alert('Failed to update status');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  return (
    <div className="container" style={{ padding: '40px 24px', maxWidth: '1200px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <h1 style={{ fontSize: '2rem' }}>Admin Dashboard</h1>
        <button onClick={handleLogout} className="btn-secondary">Logout</button>
      </div>

      <div className="responsive-row" style={{ marginBottom: '24px', gap: '16px' }}>
        <button 
          className={activeTab === 'restaurants' ? 'btn-primary' : 'btn-secondary'} 
          onClick={() => setActiveTab('restaurants')}
        >
          Restaurants ({restaurants.length})
        </button>
        <button 
          className={activeTab === 'delivery' ? 'btn-primary' : 'btn-secondary'} 
          onClick={() => setActiveTab('delivery')}
        >
          Delivery Partners ({deliveryPartners.length})
        </button>
      </div>

      <div className="card animate-fade-in" style={{ padding: '0', overflowX: 'auto' }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>Applicant Info</th>
              <th>Partner Type</th>
              <th>Status (OCR & Manual)</th>
              <th>Documents</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr><td colSpan="5" className="text-center">Loading...</td></tr>
            )}
            
            {!loading && activeTab === 'restaurants' && restaurants.map(r => (
              <tr key={r._id}>
                <td>
                  <div className="font-bold">{r.name}</div>
                  <div className="text-sm text-secondary">{r.contactPerson} • {r.phone}</div>
                  <div className="text-sm text-secondary">{r.email}</div>
                </td>
                <td>
                  <span style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>Restaurant / Vendor</span>
                </td>
                <td>
                  <div style={{ marginBottom: '4px' }}>
                    <span className={`badge badge-${r.status.toLowerCase()}`}>{r.status}</span>
                  </div>
                  {r.ocrStatus && (
                    <div className="text-sm text-secondary mt-2">OCR: {r.ocrStatus}</div>
                  )}
                  {r.rejectionReason && r.status === 'Rejected' && (
                    <div className="text-sm" style={{ color: 'var(--error-color)', marginTop: '4px' }}>
                      Reason: {r.rejectionReason}
                    </div>
                  )}
                </td>
                <td>
                  <div className="flex gap-2 flex-wrap">
                    {r.documents?.fssaiCertificate && <a href={`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'}/${r.documents.fssaiCertificate}`} target="_blank" rel="noreferrer" className="doc-btn">FSSAI</a>}
                    {r.documents?.cancelledCheque && <a href={`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'}/${r.documents.cancelledCheque}`} target="_blank" rel="noreferrer" className="doc-btn">Cheque</a>}
                    {r.documents?.ownerPanAadhaar && <a href={`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'}/${r.documents.ownerPanAadhaar}`} target="_blank" rel="noreferrer" className="doc-btn">PAN/ID</a>}
                    {r.documents?.restaurantImages && <a href={`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'}/${r.documents.restaurantImages}`} target="_blank" rel="noreferrer" className="doc-btn">Images</a>}
                    {r.documents?.menuDetails && <a href={`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'}/${r.documents.menuDetails}`} target="_blank" rel="noreferrer" className="doc-btn">Menu</a>}
                  </div>
                </td>
                <td>
                  <div className="flex gap-2 flex-col">
                    {r.status !== 'Approved' && (
                      <button onClick={() => updateStatus('restaurants', r._id, 'Approved')} className="btn-success">Approve</button>
                    )}
                    {r.status !== 'Rejected' && (
                      <button onClick={() => updateStatus('restaurants', r._id, 'Rejected')} className="btn-danger">Reject</button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
            
            {!loading && activeTab === 'delivery' && deliveryPartners.map(d => (
              <tr key={d._id}>
                <td>
                  <div className="font-bold">{d.fullName}</div>
                  <div className="text-sm text-secondary">{d.phone} • {d.email}</div>
                  <div className="text-sm text-secondary">{d.address}</div>
                </td>
                <td>
                  <span style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>Delivery ({d.vehicleInfo?.type || 'Bike'})</span>
                  {d.vehicleInfo?.vehicleNumber && <div className="text-sm text-secondary">{d.vehicleInfo.vehicleNumber}</div>}
                </td>
                <td>
                  <div style={{ marginBottom: '4px' }}>
                    <span className={`badge badge-${d.status.toLowerCase()}`}>{d.status}</span>
                  </div>
                  {d.ocrStatus && (
                    <div className="text-sm text-secondary mt-2">OCR: {d.ocrStatus}</div>
                  )}
                  {d.rejectionReason && d.status === 'Rejected' && (
                    <div className="text-sm" style={{ color: 'var(--error-color)', marginTop: '4px' }}>
                      Reason: {d.rejectionReason}
                    </div>
                  )}
                </td>
                <td>
                  <div className="flex gap-2 flex-wrap">
                    {d.documents?.aadhaarCard && <a href={`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'}/${d.documents.aadhaarCard}`} target="_blank" rel="noreferrer" className="doc-btn">ID Proof</a>}
                    {d.documents?.panCard && <a href={`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'}/${d.documents.panCard}`} target="_blank" rel="noreferrer" className="doc-btn">PAN</a>}
                    {d.documents?.drivingLicense && <a href={`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'}/${d.documents.drivingLicense}`} target="_blank" rel="noreferrer" className="doc-btn">License</a>}
                    {d.documents?.rcBook && <a href={`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'}/${d.documents.rcBook}`} target="_blank" rel="noreferrer" className="doc-btn">RC</a>}
                    {d.documents?.profilePhoto && <a href={`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'}/${d.documents.profilePhoto}`} target="_blank" rel="noreferrer" className="doc-btn">Photo</a>}
                  </div>
                </td>
                <td>
                  <div className="flex gap-2 flex-col">
                    {d.status !== 'Approved' && (
                      <button onClick={() => updateStatus('delivery', d._id, 'Approved')} className="btn-success">Approve</button>
                    )}
                    {d.status !== 'Rejected' && (
                      <button onClick={() => updateStatus('delivery', d._id, 'Rejected')} className="btn-danger">Reject</button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!loading && ((activeTab === 'restaurants' && restaurants.length === 0) || (activeTab === 'delivery' && deliveryPartners.length === 0)) && (
          <div className="text-center" style={{ padding: '40px' }}>
            <p className="text-secondary">No applications found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
