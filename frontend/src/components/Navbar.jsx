import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Partner with us', to: '/partner-with-us' },
    { label: 'Register Restaurant', to: '/signup/restaurant' },
    { label: 'Ride with us', to: '/signup/delivery' },
    { label: 'Policies', to: '/policies' },
  ];

  const isActive = (path) => location.pathname === path;

  // Pages with dark hero images
  const isDarkHeroPage = ['/', '/partner-with-us', '/signup/restaurant', '/signup/delivery'].includes(location.pathname);
  const isTransparent = isDarkHeroPage && !scrolled && !isOpen;

  return (
    <nav className={`navbar ${isTransparent ? 'transparent' : 'solid'}`}>
      <div className="container">
        <Link to="/" className="logo">Myards</Link>
        
        {/* Desktop Nav */}
        <div className="nav-links desktop-only">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="nav-link"
              style={isActive(item.to) ? { color: 'var(--primary-color)' } : undefined}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button 
          className="mobile-nav-toggle" 
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Navigation"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Mobile Nav Overlay */}
        {isOpen && (
          <div className="mobile-nav-overlay">
            <button
              className="mobile-nav-close"
              onClick={() => setIsOpen(false)}
              aria-label="Close Navigation"
            >
              <X size={28} />
            </button>
            <div className="mobile-nav-content">
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="nav-link"
                  onClick={() => setIsOpen(false)}
                  style={isActive(item.to) ? { color: 'var(--primary-color)' } : undefined}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
