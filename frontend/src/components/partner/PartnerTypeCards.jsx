import React from 'react';
import { Link } from 'react-router-dom';
import { Store, Bike, ArrowRight } from 'lucide-react';

const PartnerTypeCards = () => {
  return (
    <section className="section-muted">
      <div className="container">
        <div className="text-center mb-8">
          <span className="eyebrow">Choose your path</span>
          <h2 style={{ fontSize: '2.5rem', marginTop: '8px' }}>
            How would you like to partner?
          </h2>
          <p className="text-secondary" style={{ fontSize: '1.1rem', maxWidth: '560px', margin: '12px auto 0' }}>
            Whether you run a restaurant or want to deliver — Myards has the right onboarding for you.
          </p>
        </div>

        <div className="partner-type-grid" style={{ maxWidth: '900px', margin: '0 auto' }}>
          {/* Restaurant / Vendor Card */}
          <div className="partner-type-card">
            <div className="icon-wrap">
              <Store size={36} />
            </div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '12px' }}>
              Restaurant / Vendor Partner
            </h3>
            <p className="text-secondary" style={{ marginBottom: '28px', lineHeight: '1.6' }}>
              For restaurants, cloud kitchens, grocery stores, and local sellers looking to reach nearby customers.
            </p>
            <Link to="/signup/restaurant" className="btn-primary">
              Register Restaurant
              <ArrowRight size={18} />
            </Link>
          </div>

          {/* Delivery Partner Card */}
          <div className="partner-type-card">
            <div className="icon-wrap">
              <Bike size={36} />
            </div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '12px' }}>
              Delivery Partner
            </h3>
            <p className="text-secondary" style={{ marginBottom: '28px', lineHeight: '1.6' }}>
              For bike, scooter, and bicycle riders looking to earn flexibly through hyperlocal deliveries.
            </p>
            <Link to="/signup/delivery" className="btn-primary">
              Join as Rider
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnerTypeCards;
