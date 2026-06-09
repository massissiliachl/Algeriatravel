// src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fermer le menu mobile quand on change de page
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault();
    // Si on est sur la page d'accueil
    if (location.pathname === '/') {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
    setMobileMenuOpen(false);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <Link to="/" className="logo" onClick={(e) => {
        if (location.pathname === '/') {
          e.preventDefault();
          handleSmoothScroll(e, 'hero');
        }
      }}>
        ALGERIA <span>TRAVEL</span>
      </Link>
      
      <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
        <i className="fas fa-bars"></i>
      </button>
      
      <div className={`nav-links ${mobileMenuOpen ? 'active' : ''}`}>
        <Link to="/" className={`nav-link-btn ${isActive('/') ? 'active' : ''}`}>
          Accueil
        </Link>
        <Link to="/destinations" className={`nav-link-btn ${isActive('/destinations') ? 'active' : ''}`}>
          Destinations
        </Link>
        <Link to="/gallery" className={`nav-link-btn ${isActive('/gallery') ? 'active' : ''}`}>
          Galerie
        </Link>
        <Link to="/contact" className={`nav-link-btn ${isActive('/contact') ? 'active' : ''}`}>
          Contact
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;