import React from 'react';
import { Link } from 'react-router-dom';
import { Store, Bike, ArrowRight } from 'lucide-react';

const FinalCta = () => {
  return (
    <section className="section-muted">
      <div className="container">
        <div className="cta-banner">
          <h2>Ready to grow with Myards?</h2>
          <p>
            Restaurants, cloud kitchens, grocery stores, local sellers, and delivery partners can join Myards today. Fast onboarding with secure OCR-assisted verification.
          </p>
          <div className="flex gap-4 justify-center" style={{ flexWrap: 'wrap', position: 'relative', zIndex: 1 }}>
            <Link
              to="/signup/restaurant"
              className="btn-primary"
              style={{ background: '#FFFFFF', color: 'var(--primary-color)', boxShadow: '0 8px 24px rgba(0,0,0,0.15)' }}
            >
              <Store size={20} />
              Register Restaurant
              <ArrowRight size={16} />
            </Link>
            <Link
              to="/signup/delivery"
              className="btn-secondary"
              style={{ borderColor: 'rgba(255,255,255,0.3)', color: 'white', background: 'rgba(255,255,255,0.1)' }}
            >
              <Bike size={20} />
              Join as Delivery Partner
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCta;
