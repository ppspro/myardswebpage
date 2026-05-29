import React, { useState } from 'react';

const restaurantSteps = [
  {
    number: 1,
    title: 'Submit basic details',
    description: 'Fill in your restaurant name, address, contact person, phone, and email to begin onboarding.',
  },
  {
    number: 2,
    title: 'Upload documents',
    description: 'Upload required business and identity documents for review.',
  },
  {
    number: 3,
    title: 'Upload FSSAI/GST/bank documents',
    description: 'Provide your FSSAI certificate, GSTIN (if applicable), owner PAN, cancelled cheque, and bank details.',
  },
  {
    number: 4,
    title: 'Admin review',
    description: 'Our team reviews submitted documents and verification status. Smart OCR may auto-approve matching records.',
  },
  {
    number: 5,
    title: 'Start receiving orders',
    description: 'Once approved, your listing goes live and you can start receiving orders from nearby customers.',
  },
];

const deliverySteps = [
  {
    number: 1,
    title: 'Submit personal details',
    description: 'Provide your full name, phone, email, address, and vehicle type to start your rider registration.',
  },
  {
    number: 2,
    title: 'Upload documents',
    description: 'Upload required identity and vehicle documents for review.',
  },
  {
    number: 3,
    title: 'Verify DL/RC where applicable',
    description: 'Upload your driving license and vehicle RC book. RC is required for bike and scooter riders only.',
  },
  {
    number: 4,
    title: 'Admin review',
    description: 'Documents are reviewed by the Myards team. OCR-based matching may auto-approve eligible applications.',
  },
  {
    number: 5,
    title: 'Start earning',
    description: 'Once approved, start accepting delivery requests and earning money on your own schedule.',
  },
];

const OnboardingSteps = () => {
  const [activeTab, setActiveTab] = useState('restaurant');
  const steps = activeTab === 'restaurant' ? restaurantSteps : deliverySteps;

  return (
    <section className="section-muted">
      <div className="container">
        <div className="text-center mb-8">
          <span className="eyebrow">How it works</span>
          <h2 style={{ fontSize: '2.5rem', marginTop: '8px' }}>Steps to onboard</h2>
          <p className="text-secondary" style={{ fontSize: '1.1rem', maxWidth: '540px', margin: '12px auto 0' }}>
            A clear, transparent onboarding process — from application to going live.
          </p>
        </div>

        <div className="steps-tabs">
          <button
            className={`steps-tab ${activeTab === 'restaurant' ? 'active' : ''}`}
            onClick={() => setActiveTab('restaurant')}
          >
            Restaurant / Store
          </button>
          <button
            className={`steps-tab ${activeTab === 'delivery' ? 'active' : ''}`}
            onClick={() => setActiveTab('delivery')}
          >
            Delivery Partner
          </button>
        </div>

        <div className="steps-timeline">
          {steps.map((step, idx) => (
            <div key={step.number} className="timeline-item">
              <div className="timeline-marker">
                <div className="timeline-dot">{step.number}</div>
                {idx < steps.length - 1 && <div className="timeline-line" />}
              </div>
              <div className="timeline-content">
                <h4>{step.title}</h4>
                <p>{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OnboardingSteps;
