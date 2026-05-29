import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import PartnerLandingPage from './components/partner/PartnerLandingPage';
import RestaurantSignup from './components/RestaurantSignup';
import DeliverySignup from './components/DeliverySignup';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import Policies from './components/Policies';
import StatusTracker from './components/StatusTracker';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/partner-with-us" element={<PartnerLandingPage />} />
        <Route path="/signup/restaurant" element={<RestaurantSignup />} />
        <Route path="/signup/delivery" element={<DeliverySignup />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/track-status" element={<StatusTracker />} />
        <Route path="/policies" element={<Policies />} />
        <Route path="/policies/:tab" element={<Policies />} />
      </Routes>
    </Router>
  );
}

export default App;
