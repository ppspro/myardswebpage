import React from 'react';
import { Play } from 'lucide-react';

const PartnerIntroCard = () => {
  return (
    <div className="intro-card-container">
      <div className="intro-card">
        {/* Left Content */}
        <div className="intro-card-left">
          <h2 style={{ fontSize: '1.75rem', marginBottom: '8px', color: 'var(--text-primary)' }}>
            Get started: it only takes 10 minutes
          </h2>
          <p className="text-secondary" style={{ fontSize: '1rem', marginBottom: '32px' }}>
            Please keep these documents and details ready for a smooth sign-up
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '32px' }}>
            {/* Restaurant Checklist */}
            <div>
              <h4 style={{ fontSize: '1.05rem', marginBottom: '16px', color: 'var(--text-primary)' }}>
                Restaurant Partners
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  <span style={{ color: 'var(--primary-color)' }}>•</span> PAN card
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  <span style={{ color: 'var(--primary-color)' }}>•</span> FSSAI license
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  <span style={{ color: 'var(--primary-color)' }}>•</span> GST number, if applicable
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  <span style={{ color: 'var(--primary-color)' }}>•</span> Bank account details
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  <span style={{ color: 'var(--primary-color)' }}>•</span> Menu details
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  <span style={{ color: 'var(--primary-color)' }}>•</span> Profile/food images
                </li>
              </ul>
            </div>

            {/* Delivery Checklist */}
            <div>
              <h4 style={{ fontSize: '1.05rem', marginBottom: '16px', color: 'var(--text-primary)' }}>
                Delivery Partners
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  <span style={{ color: 'var(--primary-color)' }}>•</span> Aadhaar or identity proof
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  <span style={{ color: 'var(--primary-color)' }}>•</span> PAN card
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  <span style={{ color: 'var(--primary-color)' }}>•</span> Driving license
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  <span style={{ color: 'var(--primary-color)' }}>•</span> Vehicle RC for bike/scooter
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  <span style={{ color: 'var(--primary-color)' }}>•</span> Bank details
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  <span style={{ color: 'var(--primary-color)' }}>•</span> Profile photo
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Right Content / Help visual */}
        <div className="intro-card-right">
          <div className="intro-video-placeholder">
            <div className="play-btn">
              <Play size={24} fill="currentColor" />
            </div>
          </div>
          <h4 style={{ fontSize: '1.1rem', marginBottom: '12px' }}>How onboarding works</h4>
          <ul style={{ listStyle: 'none', padding: 0, textAlign: 'left', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <li style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>1. Submit details</li>
            <li style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>2. Upload documents</li>
            <li style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>3. Quick review</li>
            <li style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>4. Start earning</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PartnerIntroCard;
