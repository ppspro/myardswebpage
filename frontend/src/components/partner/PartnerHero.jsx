import React from 'react';
import { Link } from 'react-router-dom';

const PartnerHero = () => {
  return (
    <section className="hero">
      <div className="hero-bg-image bg-partner"></div>
      <div className="hero-overlay"></div>
      <div className="container">
        <div className="hero-content animate-fade-in">
          <span className="eyebrow" style={{ marginBottom: '16px' }}>
            Myards partner
          </span>
          <h1>
            Partner with Myards and grow your business
          </h1>
          <p className="hero-sub">
            Join Myards to reach local customers, streamline onboarding, and grow with a trusted hyperlocal platform.
          </p>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 16px',
            background: 'rgba(255,255,255,0.1)',
            backdropFilter: 'blur(10px)',
            borderRadius: '99px',
            color: 'white',
            fontSize: '0.85rem',
            fontWeight: 500,
            marginBottom: '32px',
            border: '1px solid rgba(255,255,255,0.2)'
          }}>
            Fast onboarding • OCR-assisted document review
          </div>
          <div className="hero-buttons">
            <Link to="/signup/restaurant" className="btn-primary" style={{ padding: '16px 32px' }}>
              Register your restaurant
            </Link>
            <Link to="/signup/delivery" className="btn-secondary" style={{
              background: 'transparent',
              color: 'white',
              borderColor: 'rgba(255,255,255,0.5)',
              padding: '16px 32px'
            }}>
              Become a delivery partner
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnerHero;
