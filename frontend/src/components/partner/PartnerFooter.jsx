import React from 'react';
import { Link } from 'react-router-dom';

const PartnerFooter = () => {
  return (
    <footer className="partner-footer">
      <div className="container">
        <div className="footer-links">
          <Link to="/policies/privacy" className="footer-link">Privacy Policy</Link>
          <Link to="/policies/terms" className="footer-link">Terms &amp; Conditions</Link>
          <Link to="/policies/refunds" className="footer-link">Refund &amp; Cancellation</Link>
          <Link to="/policies/delivery" className="footer-link">KYC &amp; Verification Policy</Link>
          <a href="mailto:support@myards.in" className="footer-link">Contact Us</a>
        </div>
        <p className="footer-copy">
          © {new Date().getFullYear()} Visital Technologies Pvt. Ltd. All rights reserved. | Myards
        </p>
      </div>
    </footer>
  );
};

export default PartnerFooter;
