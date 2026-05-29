import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { username, password });
      localStorage.setItem('adminToken', res.data.token);
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  const handleInitAdmin = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/init');
      alert(res.data.message);
    } catch (err) {
      alert(err.response?.data?.message || 'Error');
    }
  };

  return (
    <div className="container" style={{ padding: '60px 24px' }}>
      <div className="card max-w-md animate-fade-in">
        <h2 className="text-center mb-8 text-primary">Admin Portal</h2>
        {error && <div className="mb-4" style={{ color: 'var(--error-color)', textAlign: 'center' }}>{error}</div>}
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label className="form-label">Username</label>
            <input type="text" className="form-input" value={username} onChange={e => setUsername(e.target.value)} required />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input type="password" className="form-input" value={password} onChange={e => setPassword(e.target.value)} required />
          </div>
          <button type="submit" className="btn-primary w-full mt-4">Login to Dashboard</button>
        </form>
        <div className="mt-8 text-center">
          <button onClick={handleInitAdmin} className="btn-secondary text-sm">Initialize Test Admin (admin/password123)</button>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
