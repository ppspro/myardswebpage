import React from 'react';
import { FileText, CreditCard, Camera, Utensils, Building2, Image, ClipboardList, User, Car, Bike } from 'lucide-react';

const restaurantDocs = [
  { icon: <CreditCard size={18} />, label: 'Owner PAN Card' },
  { icon: <User size={18} />, label: 'Aadhaar or identity proof' },
  { icon: <Utensils size={18} />, label: 'FSSAI Certificate' },
  { icon: <Building2 size={18} />, label: 'GST Certificate (if applicable)' },
  { icon: <FileText size={18} />, label: 'Cancelled Cheque / Bank Proof' },
  { icon: <Image size={18} />, label: 'Restaurant Images' },
  { icon: <ClipboardList size={18} />, label: 'Menu Details' },
];

const deliveryDocs = [
  { icon: <User size={18} />, label: 'Aadhaar or identity proof' },
  { icon: <CreditCard size={18} />, label: 'PAN Card' },
  { icon: <Car size={18} />, label: 'Driving License' },
  { icon: <Bike size={18} />, label: 'Vehicle RC (for Bike / Scooter only)' },
  { icon: <FileText size={18} />, label: 'Bank Account Details' },
  { icon: <Camera size={18} />, label: 'Profile Photo' },
];

const RequiredDocuments = () => {
  return (
    <section className="section">
      <div className="container">
        <div className="text-center mb-8">
          <span className="eyebrow">Documentation</span>
          <h2 style={{ fontSize: '2.5rem', marginTop: '8px' }}>Required documents</h2>
          <p className="text-secondary" style={{ fontSize: '1.1rem', maxWidth: '560px', margin: '12px auto 0' }}>
            Keep these documents ready before you start your application for faster processing.
          </p>
        </div>

        <div className="docs-grid" style={{ maxWidth: '960px', margin: '0 auto' }}>
          {/* Restaurant Documents */}
          <div className="step-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  background: 'var(--primary-light)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--primary-color)',
                }}
              >
                <Utensils size={22} />
              </div>
              <h3 style={{ fontSize: '1.2rem' }}>Restaurant / Vendor</h3>
            </div>
            <ul className="docs-list">
              {restaurantDocs.map((doc, idx) => (
                <li key={idx}>
                  <div className="doc-icon">{doc.icon}</div>
                  <span>{doc.label}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Delivery Partner Documents */}
          <div className="step-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  background: 'var(--primary-light)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--primary-color)',
                }}
              >
                <Bike size={22} />
              </div>
              <h3 style={{ fontSize: '1.2rem' }}>Delivery Partner</h3>
            </div>
            <ul className="docs-list">
              {deliveryDocs.map((doc, idx) => (
                <li key={idx}>
                  <div className="doc-icon">{doc.icon}</div>
                  <span>{doc.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RequiredDocuments;
