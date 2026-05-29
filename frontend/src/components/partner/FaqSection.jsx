import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqData = [
  {
    question: 'How do I register my restaurant on Myards?',
    answer: 'Click on "Register Restaurant" from the partner page or visit /signup/restaurant. Fill in your restaurant details, upload required documents (FSSAI, PAN, bank proof), and submit your application. Our team will review and approve eligible listings.',
  },
  {
    question: 'What documents are required for restaurant onboarding?',
    answer: 'You will need: Owner PAN, Aadhaar or e-Aadhaar XML via DigiLocker, FSSAI certificate, GST certificate (if applicable), cancelled cheque or bank proof, restaurant images, and menu details.',
  },
  {
    question: 'Can cloud kitchens join Myards?',
    answer: 'Yes. Cloud kitchens, home-based food businesses, grocery stores, and any local seller with valid FSSAI licensing can register as a vendor partner on Myards.',
  },
  {
    question: 'How does document verification work?',
    answer: 'Once you upload your documents, our smart OCR system assists in reading and matching details. A Myards admin then performs a final review to ensure everything is correct before approving your application.',
  },
  {
    question: 'Is OCR review automatic approval?',
    answer: 'No. While OCR helps extract and verify text to speed up the process, all applications go through an admin review step before final approval.',
  },
  {
    question: 'How can I become a delivery partner?',
    answer: 'Visit /signup/delivery or click "Join as Rider" on the partner page. Submit your personal details, vehicle information, and KYC documents. After admin review, you can start accepting delivery requests.',
  },
  {
    question: 'Is RC required for bicycle delivery partners?',
    answer: 'No. Vehicle RC (Registration Certificate) is required only for Bike and Scooter riders. Bicycle riders do not need to upload an RC book.',
  },
  {
    question: 'How long does approval take?',
    answer: 'Most applications are reviewed within 1-3 business days. If your documents match correctly via our smart OCR system, approval may be faster.',
  },
];

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="section">
      <div className="container">
        <div className="text-center mb-8">
          <span className="eyebrow">FAQs</span>
          <h2 style={{ fontSize: '2.5rem', marginTop: '8px' }}>Frequently asked questions</h2>
          <p className="text-secondary" style={{ fontSize: '1.1rem', maxWidth: '540px', margin: '12px auto 0' }}>
            Everything you need to know about partnering with Myards.
          </p>
        </div>

        <div style={{ maxWidth: '780px', margin: '0 auto' }}>
          {faqData.map((faq, idx) => (
            <div
              key={idx}
              className={`faq-item ${openIndex === idx ? 'active' : ''}`}
            >
              <button
                className="faq-question"
                onClick={() => toggleFaq(idx)}
                aria-expanded={openIndex === idx}
                aria-controls={`faq-answer-${idx}`}
              >
                <span>{faq.question}</span>
                <ChevronDown size={20} className="faq-icon" />
              </button>
              <div
                className="faq-answer"
                id={`faq-answer-${idx}`}
                role="region"
              >
                <div className="faq-answer-inner">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
