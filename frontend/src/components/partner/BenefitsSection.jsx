import React from 'react';
import { Store, Bike, FileSearch, TrendingUp, Clock, Headphones } from 'lucide-react';

const benefits = [
  {
    icon: <Store size={28} />,
    title: 'Reach nearby customers',
    description: 'Get discovered by thousands of local customers actively looking for food, groceries, and essentials near them.',
  },
  {
    icon: <Bike size={28} />,
    title: 'Easy order management',
    description: 'Accept, prepare, and dispatch orders with a clean dashboard designed for speed and simplicity.',
  },
  {
    icon: <FileSearch size={28} />,
    title: 'OCR-assisted document review',
    description: 'Upload your documents easily. Our smart OCR helps verify details quickly for a smoother onboarding experience.',
  },
  {
    icon: <TrendingUp size={28} />,
    title: 'Easy admin approval flow',
    description: 'Track your application status in real-time. Clear steps, no hidden requirements, no surprises.',
  },
  {
    icon: <Clock size={28} />,
    title: 'Local delivery network',
    description: 'Leverage our growing rider network for fast, reliable last-mile delivery in your area.',
  },
  {
    icon: <Headphones size={28} />,
    title: 'Admin support',
    description: 'Dedicated support team to help you through onboarding, document verification, and day-to-day operations.',
  },
];

const BenefitsSection = () => {
  return (
    <section className="section">
      <div className="container">
        <div className="text-center mb-8">
          <span className="eyebrow">Why Myards</span>
          <h2 style={{ fontSize: '2.5rem', marginTop: '8px' }}>
            Built for local businesses and delivery partners
          </h2>
          <p className="text-secondary" style={{ fontSize: '1.1rem', maxWidth: '600px', margin: '12px auto 0' }}>
            Grow locally with a trusted hyperlocal delivery network designed to make onboarding fast and operations smooth.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '24px',
            maxWidth: '1100px',
            margin: '0 auto',
          }}
          className="benefits-grid"
        >
          {benefits.map((benefit, idx) => (
            <div key={idx} className="feature-card">
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '14px',
                  background: 'var(--primary-light)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--primary-color)',
                  marginBottom: '20px',
                }}
              >
                {benefit.icon}
              </div>
              <h3 style={{ fontSize: '1.15rem', marginBottom: '10px' }}>{benefit.title}</h3>
              <p className="text-secondary" style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 992px) {
          .benefits-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 600px) {
          .benefits-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};

export default BenefitsSection;
