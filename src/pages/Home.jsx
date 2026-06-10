// src/pages/Home.jsx
import React, { useState, useEffect, lazy, Suspense, useRef } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Contact from '../components/Contact';

import AOS from 'aos';
import 'aos/dist/aos.css';

const AnimatedAlgeriaMap = lazy(() => import('../components/AnimatedAlgeriaMap'));

// Données des circuits
const FEATURED_TOURS = [
  {
    id: 1,
    name: "Timimoun la Rouge",
    tagline: "Perle du Sahara",
    description: "Découvrez les dunes rouges de Timimoun, les ksour traditionnels et les couchers de soleil magiques du Grand Erg Occidental.",
    duration: "5 jours",
    price: 45000,
    oldPrice: 55000,
    rating: 4.9,
    reviews: 234,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9ofb0IQyWwdN7RdPnQ7wFi1unr80uZcHMzA&s",
    badge: "POPULAIRE"
  },
  {
    id: 2,
    name: "Le Tassili n'Ajjer",
    tagline: "Patrimoine mondial UNESCO",
    description: "Explorez les célèbres gravures rupestres, les arches rocheuses et les paysages lunaires de Djanet.",
    duration: "8 jours",
    price: 85000,
    rating: 5.0,
    reviews: 178,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0QfJHCzON4Am5ZZ6OP5mnPLiQhwdDiGUH4A&s",
    badge: "INCONTOURNABLE"
  },
  {
    id: 3,
    name: "Ghardaïa & la Vallée du M'Zab",
    tagline: "Architecture unique",
    description: "Partez à la découverte des cités millénaires du M'Zab et de leur patrimoine exceptionnel.",
    duration: "4 jours",
    price: 35000,
    rating: 4.8,
    reviews: 312,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDSh2ht0MFpFw7A-9DBTpYxbY7nGlw_Hn6Qw&s",
    badge: "CULTURE"
  },
  {
    id: 4,
    name: "Les Merveilles de Béjaïa",
    tagline: "Mer & Montagne",
    description: "Cap Carbon, les Aiguades, les grottes d'Aokas et les magnifiques plages de la côte béjaouie.",
    duration: "3 jours",
    price: 25000,
    rating: 4.9,
    reviews: 290,
    image: "https://dia-algerie.com/wp-content/uploads/2021/03/cap-carbon.jpg",
    badge: "COUP DE CŒUR"
  },
  {
    id: 5,
    name: "Le Hoggar & Assekrem",
    tagline: "Au cœur du désert",
    description: "Vivez une aventure inoubliable dans les montagnes du Hoggar et admirez le lever du soleil à Assekrem.",
    duration: "9 jours",
    price: 95000,
    rating: 5.0,
    reviews: 167,
    image: "https://www.mosaicnorthafrica.com/wp-content/uploads/2017/01/view-from-assekrem-plateau-in-ahaggar-national-park.jpg",
    badge: "EXPERT"
  },
  {
    id: 6,
    name: "Constantine la Suspendue",
    tagline: "Ville des ponts",
    description: "Découvrez les ponts suspendus, le palais Ahmed Bey et l'histoire fascinante de Constantine.",
    duration: "3 jours",
    price: 22000,
    rating: 4.7,
    reviews: 145,
    image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1a/5b/31/eb/caption.jpg?w=1200&h=-1&s=1",
    badge: "HISTOIRE"
  }
];
const TESTIMONIALS = [
  {
    name: "Lilia D",
    role: "Voyageuse",
    content: "Le Tassili n'Ajjer est l'un des plus beaux endroits que j'ai visités. Organisation parfaite.",
    rating: 5,
    location: "France"
  },
  {
    name: "Ahmed Benali",
    role: "Voyageur",
    content: "Notre séjour à Béjaïa était exceptionnel. Les paysages sont à couper le souffle.",
    rating: 5,
    location: "Alger"
  },
  {
    name: "Laura I",
    role: "Voyageuse",
    content: "Timimoun et le Hoggar ont dépassé toutes mes attentes. Une expérience inoubliable.",
    rating: 5,
    location: "Belgique"
  }
];

const Home = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const newsletterRef = useRef(null);
  const toursScrollRef = useRef(null);

  useEffect(() => {
    AOS.init({ duration: 800, once: true, offset: 50 });
    
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5000);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
    };
  }, []);

  const scrollTours = (direction) => {
    if (toursScrollRef.current) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      toursScrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-bg">
          <video autoPlay loop muted playsInline className="hero-video">
            <source src="https://assets.mixkit.co/videos/preview/mixkit-desert-with-camels-4926-large.mp4" type="video/mp4" />
          </video>
          <div className="hero-overlay"></div>
        </div>
        
        <div className="hero-container">
          <div className="hero-content" data-aos="fade-up">
            <span className="hero-tag">EXPÉDITIONS SUR MESURE</span>
            <h1 className="hero-title">
              L'Algérie <span className="text-accent">autrement</span>
            </h1>
            <p className="hero-description">
              Des circuits d'exception conçus par des passionnés, 
              pour des voyageurs en quête d'authenticité.
            </p>
            <div className="hero-buttons">
              <button className="btn-primary" onClick={() => newsletterRef.current?.scrollIntoView({ behavior: 'smooth' })}>
                Demander un devis
              </button>
              <button className="btn-outline">
                Découvrir
              </button>
            </div>
            <div className="hero-stats">
              <div><span className="stat-value">98%</span><span className="stat-label">Satisfaction</span></div>
              <div><span className="stat-value">15+</span><span className="stat-label">Années</span></div>
              <div><span className="stat-value">5000+</span><span className="stat-label">Voyageurs</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* Circuits Section */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">NOS CIRCUITS</span>
            <h2 className="section-title">Voyages <span className="text-accent">d'exception</span></h2>
            <p className="section-subtitle">Des expériences uniques à travers l'Algérie</p>
          </div>
          
          <div className="scroll-wrapper">
            <button className="scroll-btn scroll-left" onClick={() => scrollTours('left')}>
              <i className="fas fa-chevron-left"></i>
            </button>
            
            <div className="tours-scroll" ref={toursScrollRef}>
              {FEATURED_TOURS.map((tour) => (
                <div className="tour-card" key={tour.id}>
                  {tour.badge && <span className="tour-badge">{tour.badge}</span>}
                  <div className="tour-image">
                    <img src={tour.image} alt={tour.name} />
                  </div>
                  <div className="tour-info">
                    <div className="tour-header">
                      <h3>{tour.name}</h3>
                      <div className="tour-rating">
                        <span className="stars">{"★".repeat(Math.floor(tour.rating))}</span>
                        <span>({tour.reviews})</span>
                      </div>
                    </div>
                    <p className="tour-tagline">{tour.tagline}</p>
                    <p className="tour-description">{tour.description}</p>
                    <div className="tour-footer">
                      <div className="tour-price">
                        {tour.oldPrice && <span className="old-price">{tour.oldPrice}€</span>}
                        <span className="current-price">{tour.price}DA</span>
                      </div>
                      <button className="btn-outline-small">Réserver</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <button className="scroll-btn scroll-right" onClick={() => scrollTours('right')}>
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>
        </div>
      </section>

      

      {/* Témoignages */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">ILS PARLENT DE NOUS</span>
            <h2 className="section-title">Ce que nos <span className="text-accent">voyageurs</span> disent</h2>
          </div>
          
          <div className="testimonials-slider">
            {TESTIMONIALS.map((t, index) => (
              <div key={index} className={`testimonial-card ${activeTestimonial === index ? 'active' : ''}`}>
                <div className="testimonial-quote">"</div>
                <p className="testimonial-text">{t.content}</p>
                <div className="testimonial-author">
                  <strong>{t.name}</strong>
                  <span>{t.role} • {t.location}</span>
                </div>
                <div className="testimonial-stars">{"★".repeat(t.rating)}</div>
              </div>
            ))}
          </div>
          
          <div className="testimonials-dots">
            {TESTIMONIALS.map((_, index) => (
              <button key={index} className={`dot ${activeTestimonial === index ? 'active' : ''}`} onClick={() => setActiveTestimonial(index)} />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="section-newsletter" ref={newsletterRef}>
        <div className="container">
         <Contact />
        </div>
      </section>

      <Footer />
      
      {showBackToTop && (
        <button className="back-to-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <i className="fas fa-arrow-up"></i>
        </button>
      )}

      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        :root {
          --accent: #c6a43b;
          --accent-dark: #a07d2c;
          --dark: #111111;
          --dark-gray: #1a1a1a;
          --gray: #666666;
          --light-gray: #f5f5f5;
          --white: #ffffff;
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
          color: var(--dark);
          line-height: 1.5;
        }

        .container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 24px;
        }

        /* Typography */
        .section-badge {
          display: inline-block;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 2px;
          color: var(--accent);
          margin-bottom: 16px;
          text-transform: uppercase;
        }

        .section-title {
          font-size: 2.5rem;
          font-weight: 600;
          margin-bottom: 16px;
          color: var(--dark);
        }

        .section-subtitle {
          font-size: 1.125rem;
          color: var(--gray);
          max-width: 600px;
          margin: 0 auto;
        }

        .text-accent {
          color: var(--accent);
        }

        .section {
          padding: 80px 0;
        }

        .section-dark {
          background: var(--dark-gray);
        }

        .section-dark .section-title {
          color: var(--white);
        }

        .section-dark .section-subtitle {
          color: rgba(255,255,255,0.7);
        }

        .section-header {
          text-align: center;
          margin-bottom: 48px;
        }

        /* Hero */
        /* Hero */
.hero {
  position: relative;
  height: 100vh;
  min-height: 700px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.hero-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.hero-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.5);
}

.hero-container {
  position: relative;
  z-index: 1;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: var(--white);
}

.hero-content {
  max-width: 800px;
  padding: 0 20px;
}
        .hero-buttons {
          display: flex;
          gap: 16px;
          justify-content: center;
          margin-bottom: 60px;
        }

        .hero-stats {
          display: flex;
          justify-content: center;
          gap: 48px;
        }

        .hero-stats .stat-value {
          display: block;
          font-size: 1.75rem;
          font-weight: 700;
        }

        .hero-stats .stat-label {
          font-size: 12px;
          opacity: 0.7;
          text-transform: uppercase;
        }

        /* Buttons */
        .btn-primary, .btn-outline, .btn-outline-small {
          padding: 14px 32px;
          border-radius: 40px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          border: none;
          font-size: 14px;
        }

        .btn-primary {
          background: var(--accent);
          color: var(--white);
        }

        .btn-primary:hover {
          background: var(--accent-dark);
          transform: translateY(-2px);
        }

        .btn-outline {
          background: transparent;
          border: 2px solid var(--white);
          color: var(--white);
        }

        .btn-outline:hover {
          background: var(--white);
          color: var(--dark);
        }

        .btn-outline-small {
          background: transparent;
          border: 1px solid var(--accent);
          color: var(--accent);
          padding: 8px 20px;
          font-size: 13px;
        }

        .btn-outline-small:hover {
          background: var(--accent);
          color: var(--white);
        }

        /* Scroll Wrapper */
        .scroll-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .scroll-btn {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: var(--white);
          border: 1px solid #e0e0e0;
          cursor: pointer;
          transition: all 0.3s ease;
          flex-shrink: 0;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }

        .scroll-btn:hover {
          background: var(--accent);
          border-color: var(--accent);
          color: var(--white);
        }

        /* Tours Scroll */
        .tours-scroll {
          display: flex;
          gap: 24px;
          overflow-x: auto;
          scroll-behavior: smooth;
          padding: 8px 4px 24px;
          flex: 1;
        }

        .tours-scroll::-webkit-scrollbar {
          height: 4px;
        }

        .tours-scroll::-webkit-scrollbar-track {
          background: #e0e0e0;
          border-radius: 4px;
        }

        .tours-scroll::-webkit-scrollbar-thumb {
          background: var(--accent);
          border-radius: 4px;
        }

        .tour-card {
          min-width: 360px;
          background: var(--white);
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0,0,0,0.08);
          transition: transform 0.3s ease;
          flex-shrink: 0;
        }

        .tour-card:hover {
          transform: translateY(-4px);
        }

        .tour-badge {
          position: absolute;
          top: 16px;
          left: 16px;
          background: var(--accent);
          color: var(--white);
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 10px;
          font-weight: 600;
          z-index: 1;
        }

        .tour-image {
          position: relative;
          height: 220px;
        }

        .tour-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .tour-info {
          padding: 20px;
        }

        .tour-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }

        .tour-header h3 {
          font-size: 1.2rem;
          font-weight: 600;
        }

        .tour-rating {
          font-size: 12px;
          color: var(--gray);
        }

        .tour-rating .stars {
          color: var(--accent);
        }

        .tour-tagline {
          font-size: 12px;
          color: var(--accent);
          font-weight: 600;
          text-transform: uppercase;
          margin-bottom: 12px;
        }

        .tour-description {
          font-size: 13px;
          color: var(--gray);
          line-height: 1.5;
          margin-bottom: 20px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .tour-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 16px;
          border-top: 1px solid #eee;
        }

        .tour-price {
          display: flex;
          align-items: baseline;
          gap: 8px;
        }

        .old-price {
          font-size: 12px;
          color: var(--gray);
          text-decoration: line-through;
        }

        .current-price {
          font-size: 1.4rem;
          font-weight: 700;
          color: var(--accent);
        }

        /* Map */
        .map-loader {
          height: 500px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--light-gray);
          border-radius: 24px;
        }

        /* Testimonials */
        .testimonials-slider {
          max-width: 700px;
          margin: 0 auto;
          position: relative;
        }

        .testimonial-card {
          display: none;
          text-align: center;
          padding: 40px;
          background: var(--white);
          border-radius: 24px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.05);
        }

        .testimonial-card.active {
          display: block;
          animation: fadeIn 0.4s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .testimonial-quote {
          font-size: 60px;
          color: var(--accent);
          opacity: 0.3;
          line-height: 1;
          margin-bottom: 20px;
        }

        .testimonial-text {
          font-size: 1.125rem;
          font-style: italic;
          color: var(--gray);
          margin-bottom: 24px;
          line-height: 1.6;
        }

        .testimonial-author {
          margin-bottom: 12px;
        }

        .testimonial-author strong {
          display: block;
          color: var(--dark);
          margin-bottom: 4px;
        }

        .testimonial-author span {
          font-size: 12px;
          color: var(--gray);
        }

        .testimonial-stars {
          color: var(--accent);
          letter-spacing: 2px;
        }

        .testimonials-dots {
          display: flex;
          justify-content: center;
          gap: 12px;
          margin-top: 32px;
        }

        .dot {
          width: 40px;
          height: 3px;
          background: #ddd;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .dot.active {
          background: var(--accent);
          width: 60px;
        }

        /* Newsletter */
        .section-newsletter {
          padding: 80px 0;
          background: var(--light-gray);
        }

        .newsletter-card {
          background: var(--dark);
          border-radius: 24px;
          padding: 60px;
          text-align: center;
        }

        .newsletter-card h3 {
          font-size: 1.75rem;
          color: var(--white);
          margin-bottom: 16px;
        }

        .newsletter-card p {
          color: rgba(255,255,255,0.7);
          margin-bottom: 32px;
        }

        .newsletter-form {
          display: flex;
          justify-content: center;
          gap: 12px;
          max-width: 500px;
          margin: 0 auto;
        }

        .newsletter-form input {
          flex: 1;
          padding: 14px 20px;
          border: none;
          border-radius: 40px;
          font-size: 14px;
        }

        .newsletter-form button {
          padding: 14px 32px;
          background: var(--accent);
          border: none;
          border-radius: 40px;
          color: var(--white);
          font-weight: 600;
          cursor: pointer;
          transition: background 0.3s ease;
        }

        .newsletter-form button:hover {
          background: var(--accent-dark);
        }

        /* Back to Top */
        .back-to-top {
          position: fixed;
          bottom: 30px;
          right: 30px;
          width: 48px;
          height: 48px;
          background: var(--accent);
          border: none;
          border-radius: 50%;
          color: var(--white);
          cursor: pointer;
          transition: all 0.3s ease;
          z-index: 100;
        }

        .back-to-top:hover {
          background: var(--accent-dark);
          transform: translateY(-3px);
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .hero-title { font-size: 3rem; }
          .section-title { font-size: 2rem; }
          .tour-card { min-width: 320px; }
        }

        @media (max-width: 768px) {
          .hero-title { font-size: 2rem; }
          .hero-buttons { flex-direction: column; align-items: center; }
          .hero-stats { gap: 24px; }
          .tour-card { min-width: 280px; }
          .newsletter-card { padding: 40px 24px; }
          .newsletter-form { flex-direction: column; }
          .section { padding: 60px 0; }
        }
          /* ===== MOBILE ===== */

@media (max-width: 768px) {

  .container {
    padding: 0 16px;
  }

  .hero {
    min-height: 100vh;
    padding: 100px 0 40px;
  }

  .hero-content {
    max-width: 100%;
  }

  .hero-title {
    font-size: 2.2rem !important;
    line-height: 1.2;
  }

  .hero-description {
    font-size: 1rem;
    padding: 0 10px;
  }

  .hero-buttons {
    flex-direction: column;
    width: 100%;
    gap: 12px;
  }

  .hero-buttons button {
    width: 100%;
  }

  .hero-stats {
    flex-wrap: wrap;
    gap: 20px;
  }

  .hero-stats > div {
    min-width: 90px;
  }

  .section {
    padding: 50px 0;
  }

  .section-title {
    font-size: 1.8rem !important;
    line-height: 1.3;
  }

  .section-subtitle {
    font-size: 0.95rem;
  }

  .scroll-btn {
    display: none;
  }

  .tours-scroll {
    gap: 16px;
    padding-bottom: 10px;
  }

  .tour-card {
    min-width: 85vw;
    max-width: 85vw;
  }

  .tour-image {
    height: 200px;
  }

  .tour-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 6px;
  }

  .tour-footer {
    flex-direction: column;
    gap: 15px;
    align-items: flex-start;
  }

  .btn-outline-small {
    width: 100%;
  }

  .testimonial-card {
    padding: 25px 20px;
  }

  .testimonial-text {
    font-size: 1rem;
  }

  .newsletter-card {
    padding: 30px 20px;
  }

  .back-to-top {
    width: 42px;
    height: 42px;
    right: 15px;
    bottom: 15px;
  }
}

/* ===== PETITS TELEPHONES ===== */

@media (max-width: 480px) {

  .hero-title {
    font-size: 1.8rem !important;
  }

  .hero-tag {
    font-size: 11px;
    letter-spacing: 1px;
  }

  .hero-description {
    font-size: 0.9rem;
  }

  .hero-stats .stat-value {
    font-size: 1.2rem;
  }

  .hero-stats .stat-label {
    font-size: 10px;
  }
.tour-card {
  flex: 0 0 auto;
        /* au lieu de min-width */
  scroll-snap-align: start;

    width: 85vw;
  
  background: var(--white);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
  transition: transform 0.3s ease;
}

  .tour-info {
    padding: 16px;
  }

  .tour-header h3 {
    font-size: 1rem;
  }

  .current-price {
    font-size: 1.2rem;
  }

  .testimonial-card {
    padding: 20px 15px;
  }

  .testimonial-quote {
    font-size: 40px;
  }

  .section-title {
    font-size: 1.5rem !important;
  }
}
  html, body {
  height: 100%;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
}

html, body {
  width: 100%;
  max-width: 100%;
  overflow-x: hidden;
  overscroll-behavior: none;
  touch-action: manipulation;
}

.hero {
  min-height: 100vh;
  min-height: 100dvh;
  height: 100%;
  max-height: 100vh;
  overflow: hidden;
}

.tours-scroll {
  display: flex;
  gap: 24px;
  overflow-x: auto;
  scroll-behavior: smooth;
  padding: 8px 4px 24px;
  flex: 1;

  scroll-snap-type: x mandatory; /* 👈 important */
}
      `}</style>
    </>
  );
};

export default Home;