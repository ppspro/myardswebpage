import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Store, UploadCloud } from 'lucide-react';
import apiClient from '../api/client';

const RestaurantSignup = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '', address: '', contactPerson: '', phone: '', email: '',
    fssaiLicenseNumber: '', gstin: '', pan: '', accountNumber: '', ifsc: '', bankName: ''
  });
  
  const [files, setFiles] = useState({ 
    fssaiCertificate: null, 
    cancelledCheque: null, 
    ownerPanAadhaar: null,
    restaurantImages: null,
    menuDetails: null
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFiles({ ...files, [e.target.name]: e.target.files[0] });
  };

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const data = new FormData();
    Object.keys(formData).forEach(key => data.append(key, formData[key]));
    Object.keys(files).forEach(key => {
      if (files[key]) data.append(key, files[key]);
    });

    try {
      await apiClient.post('/api/restaurants/register', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert('Registration successful! We will review your application.');
      navigate('/');
    } catch (err) {
      alert(err.response?.data?.message || 'Submission failed. Make sure all required files are attached.');
    } finally {
      setSubmitting(false);
    }
  };

  const steps = [
    { id: 1, label: 'Basic Details' },
    { id: 2, label: 'Documents' },
    { id: 3, label: 'Bank Details' },
    { id: 4, label: 'Review' }
  ];

  return (
    <div style={{ paddingBottom: '80px' }}>
      <section className="hero" style={{ padding: '140px 0 160px' }}>
        <div className="hero-bg-image bg-partner"></div>
        <div className="hero-overlay"></div>
        <div className="container hero-content">
          <h1 className="animate-fade-in" style={{ color: 'white' }}>Register your restaurant</h1>
          <p className="animate-fade-in hero-sub" style={{ color: 'rgba(255, 255, 255, 0.85)' }}>
            Partner with Myards to reach more customers and grow locally.
          </p>
        </div>
      </section>

      <div className="container" style={{ marginTop: '-80px', position: 'relative', zIndex: 10, maxWidth: '800px' }}>
        <div className="card animate-fade-in" style={{ padding: '48px' }}>
        
        {/* Progress Indicator */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '48px', position: 'relative' }}>
          <div style={{ position: 'absolute', top: '14px', left: '0', right: '0', height: '2px', background: 'var(--border-color)', zIndex: 0 }}></div>
          <div style={{ position: 'absolute', top: '14px', left: '0', width: `${((step - 1) / 3) * 100}%`, height: '2px', background: 'var(--primary-color)', zIndex: 0, transition: 'width 0.3s ease' }}></div>
          
          {steps.map((s) => (
            <div key={s.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', position: 'relative', zIndex: 1 }}>
              <div style={{ 
                width: '30px', height: '30px', borderRadius: '50%', 
                background: step >= s.id ? 'var(--primary-color)' : 'var(--surface-color)',
                border: `2px solid ${step >= s.id ? 'var(--primary-color)' : 'var(--border-color)'}`,
                color: step >= s.id ? 'white' : 'var(--text-secondary)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '0.85rem', fontWeight: 600, transition: 'all 0.3s ease'
              }}>
                {step > s.id ? <CheckCircle size={16} /> : s.id}
              </div>
              <span style={{ fontSize: '0.8rem', fontWeight: step >= s.id ? 600 : 500, color: step >= s.id ? 'var(--text-primary)' : 'var(--text-secondary)' }}>
                {s.label}
              </span>
            </div>
          ))}
        </div>

        <form onSubmit={step === 4 ? handleSubmit : (e) => { e.preventDefault(); handleNext(); }}>
          
          {/* STEP 1: Basic Details */}
          {step === 1 && (
            <div className="animate-fade-up">
              <h3 style={{ marginBottom: '24px', fontSize: '1.25rem' }}>Basic Details</h3>
              <div className="responsive-row">
                <div className="form-group flex-1">
                  <label className="form-label">Restaurant Name</label>
                  <input type="text" name="name" className="form-input" value={formData.name} onChange={handleInputChange} required />
                </div>
                <div className="form-group flex-1">
                  <label className="form-label">Contact Person</label>
                  <input type="text" name="contactPerson" className="form-input" value={formData.contactPerson} onChange={handleInputChange} required />
                </div>
              </div>
              
              <div className="form-group">
                <label className="form-label">Address</label>
                <input type="text" name="address" className="form-input" value={formData.address} onChange={handleInputChange} required />
              </div>

              <div className="responsive-row">
                <div className="form-group flex-1">
                  <label className="form-label">Phone Number</label>
                  <input type="text" name="phone" className="form-input" value={formData.phone} onChange={handleInputChange} required />
                </div>
                <div className="form-group flex-1">
                  <label className="form-label">Email Address</label>
                  <input type="email" name="email" className="form-input" value={formData.email} onChange={handleInputChange} required />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Documents */}
          {step === 2 && (
            <div className="animate-fade-up">
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'var(--primary-light)', padding: '16px', borderRadius: 'var(--border-radius-sm)', border: '1px solid var(--primary-color)', marginBottom: '24px' }}>
                <UploadCloud size={24} style={{ color: 'var(--primary-color)' }} />
                <p style={{ fontSize: '0.9rem', color: 'var(--primary-hover)', margin: 0 }}>
                  <strong>Note:</strong> Documents are reviewed using OCR/manual verification before approval. Make sure the images are clear.
                </p>
              </div>

              <div className="responsive-row">
                <div className="form-group flex-1">
                  <label className="form-label">FSSAI License Number</label>
                  <input type="text" name="fssaiLicenseNumber" className="form-input" value={formData.fssaiLicenseNumber} onChange={handleInputChange} required />
                </div>
                <div className="form-group flex-1">
                  <label className="form-label">GSTIN (if applicable)</label>
                  <input type="text" name="gstin" className="form-input" value={formData.gstin} onChange={handleInputChange} />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">PAN Number</label>
                <input type="text" name="pan" className="form-input" value={formData.pan} onChange={handleInputChange} required />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '16px' }}>
                <div className="form-group mb-0">
                  <label className="form-label">Owner PAN / Identity Proof (PDF/Image)</label>
                  <input type="file" name="ownerPanAadhaar" className="form-file w-full" onChange={handleFileChange} required />
                </div>
                <div className="form-group mb-0">
                  <label className="form-label">FSSAI Certificate (PDF/Image)</label>
                  <input type="file" name="fssaiCertificate" className="form-file w-full" onChange={handleFileChange} required />
                </div>
                <div className="form-group mb-0">
                  <label className="form-label">Restaurant Images (Storefront/Kitchen)</label>
                  <input type="file" name="restaurantImages" className="form-file w-full" onChange={handleFileChange} required />
                </div>
                <div className="form-group mb-0">
                  <label className="form-label">Menu Details (PDF/Image)</label>
                  <input type="file" name="menuDetails" className="form-file w-full" onChange={handleFileChange} required />
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Bank Details */}
          {step === 3 && (
            <div className="animate-fade-up">
              <h3 style={{ marginBottom: '24px', fontSize: '1.25rem' }}>Bank Details</h3>
              <div className="form-group">
                <label className="form-label">Bank Name</label>
                <input type="text" name="bankName" className="form-input" value={formData.bankName} onChange={handleInputChange} required />
              </div>
              <div className="responsive-row">
                <div className="form-group flex-1">
                  <label className="form-label">Account Number</label>
                  <input type="text" name="accountNumber" className="form-input" value={formData.accountNumber} onChange={handleInputChange} required />
                </div>
                <div className="form-group flex-1">
                  <label className="form-label">IFSC Code</label>
                  <input type="text" name="ifsc" className="form-input" value={formData.ifsc} onChange={handleInputChange} required />
                </div>
              </div>
              <div className="form-group mt-4">
                <label className="form-label">Cancelled Cheque or Bank Statement</label>
                <input type="file" name="cancelledCheque" className="form-file w-full" onChange={handleFileChange} required />
              </div>
            </div>
          )}

          {/* STEP 4: Review */}
          {step === 4 && (
            <div className="animate-fade-up">
              <h3 style={{ marginBottom: '24px', fontSize: '1.25rem' }}>Review & Submit</h3>
              <div style={{ background: 'var(--section-bg)', padding: '24px', borderRadius: 'var(--border-radius-md)', marginBottom: '24px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div><strong style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Name</strong><br/>{formData.name}</div>
                  <div><strong style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Contact</strong><br/>{formData.contactPerson} ({formData.phone})</div>
                  <div style={{ gridColumn: '1 / -1' }}><strong style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Address</strong><br/>{formData.address}</div>
                  <div><strong style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>FSSAI</strong><br/>{formData.fssaiLicenseNumber}</div>
                  <div><strong style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>PAN</strong><br/>{formData.pan}</div>
                  <div><strong style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Bank</strong><br/>{formData.bankName} - {formData.accountNumber}</div>
                </div>
              </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', textAlign: 'center' }}>
                By submitting, you agree to Myards Terms & Conditions and acknowledge that your documents will be reviewed by our team.
              </p>
            </div>
          )}

          <div style={{ display: 'flex', gap: '16px', marginTop: '32px' }}>
            {step > 1 && (
              <button type="button" className="btn-secondary" style={{ flex: 1 }} onClick={handleBack}>
                Back
              </button>
            )}
            <button type="submit" className="btn-primary" style={{ flex: 2 }} disabled={submitting}>
              {submitting ? 'Submitting...' : step === 4 ? 'Submit Application' : 'Next Step'}
            </button>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
};

export default RestaurantSignup;
