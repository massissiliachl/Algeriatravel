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
/* ================= RESET ================= */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  height: 100%;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
}

/* ================= VARIABLES ================= */
:root {
  --accent: #c6a43b;
  --accent-dark: #a07d2c;
  --dark: #111111;
  --dark-gray: #1a1a1a;
  --gray: #666666;
  --light-gray: #f5f5f5;
  --white: #ffffff;
}

/* ================= GLOBAL ================= */
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

/* ================= SECTION ================= */
.section {
  padding: 80px 0;
}

.section-header {
  text-align: center;
  margin-bottom: 48px;
}

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
}

.section-subtitle {
  font-size: 1.125rem;
  color: var(--gray);
}

/* ================= HERO ================= */
.hero {
  position: relative;
  min-height: 100vh;
  min-height: 100dvh;
  height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.hero-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
  overflow: hidden;
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

/* ================= BUTTONS ================= */
.btn-primary,
.btn-outline,
.btn-outline-small {
  padding: 14px 32px;
  border-radius: 40px;
  font-weight: 600;
  cursor: pointer;
  transition: 0.3s ease;
  border: none;
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

/* ================= TOURS ================= */
.tours-scroll {
  display: flex;
  gap: 24px;
  overflow-x: auto;
  scroll-behavior: smooth;
  padding: 8px 4px 24px;
}

.tour-card {
  min-width: 360px;
  background: var(--white);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
}

/* ================= TESTIMONIAL ================= */
.testimonial-card {
  display: none;
  text-align: center;
  padding: 40px;
  background: var(--white);
  border-radius: 24px;
}

.testimonial-card.active {
  display: block;
}

/* ================= NEWSLETTER ================= */
.section-newsletter {
  padding: 80px 0;
  background: var(--light-gray);
}

/* ================= BACK TO TOP ================= */
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
}

/* ================= RESPONSIVE ================= */
@media (max-width: 1024px) {
  .section-title { font-size: 2rem; }
  .tour-card { min-width: 320px; }
}

@media (max-width: 768px) {
  .hero-buttons {
    flex-direction: column;
    width: 100%;
  }

  .hero-stats {
    flex-wrap: wrap;
    gap: 20px;
  }

  .section {
    padding: 60px 0;
  }

  .tour-card {
    min-width: 85vw;
  }
}

@media (max-width: 480px) {
  .section-title {
    font-size: 1.5rem;
  }

  .hero-content {
    padding: 0 10px;
  }

  .tour-card {
    min-width: 92vw;
  }
}
`}</style>
    </>
  );
};

export default Home;