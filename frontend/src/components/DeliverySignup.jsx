import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Bike, UploadCloud } from 'lucide-react';
import apiClient from '../api/client';

const DeliverySignup = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: '', phone: '', email: '', address: '',
    vehicleType: 'Bike', vehicleNumber: '',
    aadhaarNumber: '', panNumber: '', drivingLicenseNumber: ''
  });
  
  const [files, setFiles] = useState({ 
    aadhaarCard: null, 
    panCard: null, 
    drivingLicense: null, 
    rcBook: null,
    profilePhoto: null
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
      await apiClient.post('/api/delivery/register', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert('Registration successful! We will contact you soon.');
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
    { id: 3, label: 'Review' }
  ];

  return (
    <div style={{ paddingBottom: '80px' }}>
      <section className="hero" style={{ padding: '140px 0 160px' }}>
        <div className="hero-bg-image bg-delivery"></div>
        <div className="hero-overlay"></div>
        <div className="container hero-content">
          <h1 className="animate-fade-in" style={{ color: 'white' }}>Become a Delivery Partner</h1>
          <p className="animate-fade-in hero-sub" style={{ color: 'rgba(255, 255, 255, 0.85)' }}>
            Earn money on your own schedule with Myards.
          </p>
        </div>
      </section>

      <div className="container" style={{ marginTop: '-80px', position: 'relative', zIndex: 10, maxWidth: '800px' }}>
        <div className="card animate-fade-in" style={{ padding: '48px' }}>
        
        {/* Progress Indicator */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '48px', position: 'relative' }}>
          <div style={{ position: 'absolute', top: '14px', left: '0', right: '0', height: '2px', background: 'var(--border-color)', zIndex: 0 }}></div>
          <div style={{ position: 'absolute', top: '14px', left: '0', width: `${((step - 1) / 2) * 100}%`, height: '2px', background: 'var(--primary-color)', zIndex: 0, transition: 'width 0.3s ease' }}></div>
          
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

        <form onSubmit={step === 3 ? handleSubmit : (e) => { e.preventDefault(); handleNext(); }}>
          
          {/* STEP 1: Basic Details */}
          {step === 1 && (
            <div className="animate-fade-up">
              <h3 style={{ marginBottom: '24px', fontSize: '1.25rem' }}>Personal & Vehicle Details</h3>
              <div className="responsive-row">
                <div className="form-group flex-1">
                  <label className="form-label">Full Name</label>
                  <input type="text" name="fullName" className="form-input" value={formData.fullName} onChange={handleInputChange} required />
                </div>
                <div className="form-group flex-1">
                  <label className="form-label">Phone Number</label>
                  <input type="text" name="phone" className="form-input" value={formData.phone} onChange={handleInputChange} required />
                </div>
              </div>
              
              <div className="responsive-row">
                <div className="form-group flex-1">
                  <label className="form-label">Email Address</label>
                  <input type="email" name="email" className="form-input" value={formData.email} onChange={handleInputChange} required />
                </div>
                <div className="form-group flex-1">
                  <label className="form-label">Address</label>
                  <input type="text" name="address" className="form-input" value={formData.address} onChange={handleInputChange} required />
                </div>
              </div>

              <div className="responsive-row mt-4">
                <div className="form-group flex-1">
                  <label className="form-label">Vehicle Type</label>
                  <select name="vehicleType" className="form-input" value={formData.vehicleType} onChange={handleInputChange} required>
                    <option value="Bike">Bike</option>
                    <option value="Scooter">Scooter</option>
                    <option value="Bicycle">Bicycle</option>
                  </select>
                </div>
                {formData.vehicleType !== 'Bicycle' && (
                  <div className="form-group flex-1">
                    <label className="form-label">Vehicle Registration Number</label>
                    <input type="text" name="vehicleNumber" className="form-input" value={formData.vehicleNumber} onChange={handleInputChange} required />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* STEP 2: Documents */}
          {step === 2 && (
            <div className="animate-fade-up">
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'var(--primary-light)', padding: '16px', borderRadius: 'var(--border-radius-sm)', border: '1px solid var(--primary-color)', marginBottom: '24px' }}>
                <UploadCloud size={24} style={{ color: 'var(--primary-color)' }} />
                <p style={{ fontSize: '0.9rem', color: 'var(--primary-hover)', margin: 0 }}>
                  <strong>Note:</strong> Your documents will be reviewed manually and with OCR before approval. Ensure all images are readable.
                </p>
              </div>

              <div className="responsive-row">
                <div className="form-group flex-1">
                  <label className="form-label">Aadhaar/ID Number</label>
                  <input type="text" name="aadhaarNumber" className="form-input" value={formData.aadhaarNumber} onChange={handleInputChange} required />
                </div>
                <div className="form-group flex-1">
                  <label className="form-label">PAN Number</label>
                  <input type="text" name="panNumber" className="form-input" value={formData.panNumber} onChange={handleInputChange} required />
                </div>
              </div>

              {formData.vehicleType !== 'Bicycle' && (
                <div className="form-group">
                  <label className="form-label">Driving License Number</label>
                  <input type="text" name="drivingLicenseNumber" className="form-input" value={formData.drivingLicenseNumber} onChange={handleInputChange} required />
                </div>
              )}

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '16px' }}>
                <div className="form-group mb-0">
                  <label className="form-label">Profile Photo</label>
                  <input type="file" name="profilePhoto" className="form-file w-full" onChange={handleFileChange} required />
                </div>
                <div className="form-group mb-0">
                  <label className="form-label">Identity Proof / Aadhaar Front & Back</label>
                  <input type="file" name="aadhaarCard" className="form-file w-full" onChange={handleFileChange} required />
                </div>
                <div className="form-group mb-0">
                  <label className="form-label">PAN Card</label>
                  <input type="file" name="panCard" className="form-file w-full" onChange={handleFileChange} required />
                </div>
                {formData.vehicleType !== 'Bicycle' && (
                  <>
                    <div className="form-group mb-0">
                      <label className="form-label">Driving License Image</label>
                      <input type="file" name="drivingLicense" className="form-file w-full" onChange={handleFileChange} required />
                    </div>
                    <div className="form-group mb-0">
                      <label className="form-label">Vehicle RC Book</label>
                      <input type="file" name="rcBook" className="form-file w-full" onChange={handleFileChange} required />
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {/* STEP 3: Review */}
          {step === 3 && (
            <div className="animate-fade-up">
              <h3 style={{ marginBottom: '24px', fontSize: '1.25rem' }}>Review & Submit</h3>
              <div style={{ background: 'var(--section-bg)', padding: '24px', borderRadius: 'var(--border-radius-md)', marginBottom: '24px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div><strong style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Name</strong><br/>{formData.fullName}</div>
                  <div><strong style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Contact</strong><br/>{formData.phone}</div>
                  <div style={{ gridColumn: '1 / -1' }}><strong style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Vehicle</strong><br/>{formData.vehicleType} {formData.vehicleNumber && `(${formData.vehicleNumber})`}</div>
                  <div><strong style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>ID Proof</strong><br/>{formData.aadhaarNumber}</div>
                  <div><strong style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>PAN</strong><br/>{formData.panNumber}</div>
                </div>
              </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', textAlign: 'center' }}>
                By submitting, you agree to Myards Rider Terms & Conditions and consent to manual document verification.
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
              {submitting ? 'Submitting...' : step === 3 ? 'Submit Application' : 'Next Step'}
            </button>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
};

export default DeliverySignup;
