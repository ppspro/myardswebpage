import React from 'react';
import { Link } from 'react-router-dom';
import { Utensils, Bike, Shield, Zap, TrendingUp, IndianRupee } from 'lucide-react';
import heroVideo from '../assets/myards-hero-bg.mp4';

const LandingPage = () => {
  return (
    <main>
      {/* Hero Section */}
      <section className="hero full-page">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="hero-bg-video"
          src={heroVideo}
        />
        <div className="hero-overlay"></div>
        <div className="container hero-content">
          <h1 className="animate-fade-in" style={{ color: 'white' }}>India's Next-Gen<br />Hyperlocal Food Delivery.</h1>
          <p className="animate-fade-in hero-sub" style={{ animationDelay: '0.1s', color: 'rgba(255, 255, 255, 0.85)' }}>
            Myards connects local restaurants with customers in record time. Zero-brokerage initial onboarding for partners, best-in-class payouts for riders.
          </p>
          <div className="hero-buttons animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <Link to="/signup/restaurant" className="btn-primary flex items-center gap-2">
              <Utensils size={20} />
              Register Restaurant
            </Link>
            <Link to="/signup/delivery" className="btn-secondary flex items-center gap-2">
              <Bike size={20} />
              Become a Rider
            </Link>
          </div>
        </div>
      </section>

      {/* Features/Value Proposition Grid */}
      <section style={{ padding: '80px 0', backgroundColor: '#FFF' }}>
        <div className="container">
          <h2 className="text-center mb-8" style={{ fontSize: '2.5rem' }}>Why Partners Choose Myards</h2>
          <div className="flex gap-8 justify-between flex-wrap">
            <div className="card flex-1" style={{ minWidth: '280px' }}>
              <div className="text-primary mb-4"><Zap size={40} /></div>
              <h3 className="mb-2">Hyper-Fast Logistics</h3>
              <p className="text-secondary">Smart algorithms that route riders within 2-minute pickup windows, ensuring hot deliveries.</p>
            </div>
            <div className="card flex-1" style={{ minWidth: '280px' }}>
              <div className="text-primary mb-4"><IndianRupee size={40} /></div>
              <h3 className="mb-2">Fair Commissions</h3>
              <p className="text-secondary">Unlike legacy platforms, Myards offers zero-brokerage models for the first 100 onboarded restaurants.</p>
            </div>
            <div className="card flex-1" style={{ minWidth: '280px' }}>
              <div className="text-primary mb-4"><Shield size={40} /></div>
              <h3 className="mb-2">KYC Verified Network</h3>
              <p className="text-secondary">Fully compliant, government-registered Indian standard checks for high safety and food quality.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section style={{ padding: '60px 0', background: 'linear-gradient(135deg, #1C1C1C 0%, #2A2A2A 100%)', color: 'white' }}>
        <div className="container responsive-row justify-between items-center text-center gap-6">
          <div className="flex-1">
            <h2 style={{ color: 'white', fontSize: '3rem' }}>10 Mins</h2>
            <p style={{ color: '#A0AEC0' }}>Average Local Delivery Time</p>
          </div>
          <div className="flex-1">
            <h2 style={{ color: 'white', fontSize: '3rem' }}>0%</h2>
            <p style={{ color: '#A0AEC0' }}>Commission on first 100 orders</p>
          </div>
          <div className="flex-1">
            <h2 style={{ color: 'white', fontSize: '3rem' }}>24/7</h2>
            <p style={{ color: '#A0AEC0' }}>Dedicated Partner Support</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '40px 0', borderTop: '1px solid var(--border-color)', backgroundColor: 'var(--background-color)' }}>
        <div className="container responsive-row justify-between items-center text-sm text-secondary">
          <div className="text-center">© {new Date().getFullYear()} Myards . All rights reserved.</div>
          <div className="flex gap-4 flex-wrap justify-center">
            <Link to="/policies/privacy" className="nav-link">Privacy Policy</Link>
            <Link to="/policies/terms" className="nav-link">Terms & Conditions</Link>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default LandingPage;
