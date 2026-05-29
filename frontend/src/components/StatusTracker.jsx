import React, { useState } from 'react';
import axios from 'axios';
import { Search, Loader2 } from 'lucide-react';

const StatusTracker = () => {
  const [formData, setFormData] = useState({
    applicationId: '',
    email: ''
  });
  const [statusResult, setStatusResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTrackStatus = async (e) => {
    e.preventDefault();
    if (!formData.applicationId || !formData.email) {
      setError('Please provide both Application ID and Email.');
      return;
    }
    
    setLoading(true);
    setError('');
    setStatusResult(null);

    try {
      const response = await axios.post('http://localhost:5000/api/status/check', formData);
      setStatusResult(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch status. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ padding: '60px 24px', minHeight: 'calc(100vh - 80px)' }}>
      <div className="card max-w-md animate-fade-in">
        <h2 className="mb-2 text-center">Track Application Status</h2>
        <p className="text-secondary text-center mb-8">Enter your details to check the KYC verification status of your account.</p>

        <form onSubmit={handleTrackStatus}>
          <div className="form-group">
            <label className="form-label">Application ID</label>
            <input 
              type="text" 
              name="applicationId"
              className="form-input" 
              placeholder="Enter your application ID"
              value={formData.applicationId}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input 
              type="email" 
              name="email"
              className="form-input" 
              placeholder="Enter registered email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {error && (
            <div className="mb-4 text-sm font-bold text-center" style={{ color: 'var(--error-color)' }}>
              {error}
            </div>
          )}

          <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2" disabled={loading}>
            {loading ? <Loader2 size={20} className="animate-spin" /> : <Search size={20} />}
            {loading ? 'Checking...' : 'Check Status'}
          </button>
        </form>

        {statusResult && (
          <div className="mt-8 p-4 rounded" style={{ backgroundColor: 'var(--background-color)', border: '1px solid var(--border-color)' }}>
            <h3 className="mb-4 text-center">Status Result</h3>
            <div className="flex justify-between mb-2">
              <span className="text-secondary">Type:</span>
              <span className="font-bold">{statusResult.type}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-secondary">Name:</span>
              <span className="font-bold">{statusResult.name}</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-secondary">Status:</span>
              <span className={`badge badge-${statusResult.status.toLowerCase()}`}>
                {statusResult.status}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatusTracker;
