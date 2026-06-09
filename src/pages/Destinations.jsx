// src/pages/Destinations.jsx
import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Destinations = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedItinerary, setSelectedItinerary] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(6);
  const heroRef = useRef(null);

  useEffect(() => {
    AOS.init({ duration: 800, once: true, offset: 50 });
    setTimeout(() => setIsLoading(false), 500);
    
    const handleScroll = () => {
      if (heroRef.current) {
        heroRef.current.style.opacity = `${1 - window.scrollY / 600}`;
        heroRef.current.style.transform = `scale(${1 - window.scrollY / 2000})`;
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const destinations = [
    {
      id: 1,
      name: "Timgad",
      subtitle: "La Pompéi de l'Afrique",
      description: "Vestiges romains classés UNESCO parmi les mieux préservés d'Afrique du Nord.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHaUG1Z_ZV2gwi8RAX55XRmHI3fqbAziuyrg&s",
      location: "Batna, Aurès",
      bestTime: "Mars - Mai / Sept - Nov",
      duration: "4 jours",
      price: "45000",
      rating: 4.8,
      category: "culture",
      activities: ["🏛️ Site antique", "📜 Mosaïques", "🚶 Randonnée"],
      itinerary: [
        { day: 1, title: "Arrivée à Batna", desc: "Accueil et installation" },
        { day: 2, title: "Timgad", desc: "Visite complète du site romain" },
        { day: 3, title: "Exploration", desc: "Thermes et forum" },
        { day: 4, title: "Départ", desc: "Transfert aéroport" }
      ]
    },
    {
      id: 2,
      name: "Timimoun",
      subtitle: "L'Oasis Rouge",
      description: "Ksour en terre rouge perchés sur les dunes du Sahara. Un spectacle unique.",
      image: "https://elwatan.dz/wp-content/uploads/storage/43970/TIMIMOUN.jpg",
      location: "Gourara, Grand Sud",
      bestTime: "Octobre - Avril",
      duration: "5 jours",
      price: "35000",
      rating: 4.9,
      category: "desert",
      activities: ["🏜️ Dunes", "🕌 Ksour", "🌅 Coucher soleil"],
      itinerary: [
        { day: 1, title: "Arrivée", desc: "Accueil et thé à la menthe" },
        { day: 2, title: "Ksour", desc: "Découverte des villages rouges" },
        { day: 3, title: "Dunes", desc: "Trek et coucher de soleil" },
        { day: 4, title: "Artisanat", desc: "Atelier poterie" },
        { day: 5, title: "Départ", desc: "Transfert aéroport" }
      ]
    },
    
    {
      id: 8,
      name: "Taghit",
      subtitle: "L'Oasis Secrète",
      description: "Dunes majestueuses et oasis préservée au cœur du Sahara.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxC8ziUGgisBwriU1vhBnxClvWqqsfs8c2kA&s",
      location: "Béchar, Sahara",
      bestTime: "Octobre - Mars",
      duration: "4 jours",
      price: "720",
      rating: 4.8,
      category: "desert",
      activities: ["🏜️ Dunes", "🌴 Palmeraie", "🌅 Coucher soleil"],
      itinerary: [
        { day: 1, title: "Arrivée", desc: "Accueil" },
        { day: 2, title: "Dunes", desc: "Trek chamelier" },
        { day: 3, title: "Oasis", desc: "Visite palmeraie" },
        { day: 4, title: "Départ", desc: "Transfert" }
      ]
    },
    {
      id: 3,
      name: "Tassili n'Ajjer",
      subtitle: "Le Musée à Ciel Ouvert",
      description: "Art rupestre préhistorique et paysages lunaires classés UNESCO.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQx0zN9XuJEhMuuosMwDbWxfkCyikBakJBMIQ&s",
      location: "Djanet, Sahara",
      bestTime: "Novembre - Février",
      duration: "7 jours",
      price: "12500",
      rating: 4.9,
      category: "nature",
      activities: ["🎨 Art rupestre", "🥾 Trek", "⛺ Bivouac"],
      itinerary: [
        { day: 1, title: "Arrivée", desc: "Préparation du trek" },
        { day: 2, title: "Départ", desc: "Route en 4x4" },
        { day: 3, title: "Gravures", desc: "Art préhistorique" },
        { day: 4, title: "Canyons", desc: "Trek dans les gorges" },
        { day: 5, title: "Bivouac", desc: "Nuit sous les étoiles" },
        { day: 6, title: "Retour", desc: "Route retour" },
        { day: 7, title: "Départ", desc: "Transfert aéroport" }
      ]
    },
 
    {
      id: 5,
      name: "Ghardaïa",
      subtitle: "Vallée du M'Zab",
      description: "Architecture berbère unique, cités fortifiées et oasis verdoyantes.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgbwTu5UUydTv5_SwzjDeb9f75Fj4J_L9OyA&s",
      location: "Vallée du M'Zab",
      bestTime: "Octobre - Mars",
      duration: "4 jours",
      price: "48000",
      rating: 4.8,
      category: "culture",
      activities: ["🏛️ Architecture", "🎨 Artisanat", "🕌 Mosquées"],
      itinerary: [
        { day: 1, title: "Arrivée", desc: "Panorama vallée" },
        { day: 2, title: "Ksour", desc: "Visite architecture" },
        { day: 3, title: "Palmeraie", desc: "Atelier local" },
        { day: 4, title: "Départ", desc: "Transfert" }
      ]
    },
    
    {
      id: 7,
      name: "Djemila",
      subtitle: "La Perle Romaine",
      description: "Site archéologique parmi les mieux conservés, classé UNESCO.",
      image: "https://visitalgeria.org/wp-content/uploads/2024/04/Djemila-the-archaeological-zone-of-the-well-preserved-Berber-Roman-ruins-in-North-Africa-Algeria.-UNESCO-World-Heritage-Site-15-1024x536.jpg",
      location: "Sétif",
      bestTime: "Mai - Octobre",
      duration: "3 jours",
      price: "20000",
      rating: 4.7,
      category: "culture",
      activities: ["🏛️ Ruines", "📜 Mosaïques", "🎭 Théâtre"],
      itinerary: [
        { day: 1, title: "Arrivée", desc: "Installation" },
        { day: 2, title: "Djemila", desc: "Visite du site" },
        { day: 3, title: "Départ", desc: "Transfert" }
      ]
    }
  ];

  const filteredDestinations = activeFilter === 'all' 
    ? destinations 
    : destinations.filter(d => d.category === activeFilter);
  
  const displayedDestinations = filteredDestinations.slice(0, visibleCount);
  const hasMore = visibleCount < filteredDestinations.length;

  const loadMore = () => setVisibleCount(prev => prev + 4);
  
  const handleBooking = (dest) => {
    alert(`✨ Réservation ${dest.name} à partir de ${dest.price}€`);
  };

  const categoryIcons = {
    all: '🌍', culture: '🏛️', desert: '🏜️', nature: '🌿', city: '🏙️', history: '📜'
  };

  if (isLoading) {
    return (
      <div className="loader-wrapper">
        <div className="loader-spinner"></div>
        <p>Découverte des trésors d'Algérie...</p>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      
      {/* Hero Section avec image locale */}
      <section className="hero" ref={heroRef}>
        <div className="hero-image"></div>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <span className="hero-tag" data-aos="fade-up">✧ Voyages d'exception ✧</span>
          <h1 className="hero-title" data-aos="fade-up" data-aos-delay="100">
            L'Algérie<br />
            <span>autrement</span>
          </h1>
          <p className="hero-subtitle" data-aos="fade-up" data-aos-delay="200">
            Des expériences uniques au cœur des paysages grandioses<br />
            et de l'authenticité algérienne.
          </p>
          <div className="hero-stats" data-aos="fade-up" data-aos-delay="300">
            <div className="stat"><strong>12+</strong><span>Destinations</span></div>
            <div className="stat"><strong>50+</strong><span>Circuits</span></div>
            <div className="stat"><strong>4.8★</strong><span>Voyageurs</span></div>
          </div>
        </div>
        <div className="hero-scroll">↓</div>
      </section>

      {/* Destinations Section */}
      <section className="destinations">
        <div className="container">
          <div className="section-header" data-aos="fade-up">
            <span className="section-subtitle">Nos destinations</span>
            <h2 className="section-title">Des lieux qui vous <span>marquent</span></h2>
            <div className="section-line"></div>
          </div>

          {/* Filters */}
          <div className="filters" data-aos="fade-up">
            {Object.entries(categoryIcons).map(([key, icon]) => (
              <button
                key={key}
                className={`filter ${activeFilter === key ? 'active' : ''}`}
                onClick={() => { setActiveFilter(key); setVisibleCount(6); }}
              >
                {icon} {key === 'all' ? 'Tous' : key.charAt(0).toUpperCase() + key.slice(1)}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid">
            {displayedDestinations.map((dest, idx) => (
              <div key={dest.id} className="card" data-aos="fade-up" data-aos-delay={idx * 50}>
                <div className="card-image">
                  <img src={dest.image} alt={dest.name} />
                  <div className="card-overlay"></div>
                  <div className="card-price">{dest.price}DA<span>/pers.</span></div>
                  <div className="card-rating">★ {dest.rating}</div>
                </div>
                <div className="card-content">
                  <div className="card-location">{dest.location}</div>
                  <h3>{dest.name}</h3>
                  <p className="card-subtitle">{dest.subtitle}</p>
                  <p className="card-desc">{dest.description}</p>
                  
                  <div className="card-activities">
                    {dest.activities.map((act, i) => (
                      <span key={i} className="activity">{act}</span>
                    ))}
                  </div>
                  
                  <div className="card-info">
                    <span>📅 {dest.bestTime}</span>
                    <span>⏱️ {dest.duration}</span>
                  </div>
                  
                  <div className="card-buttons">
                    <button 
                      className="btn-outline" 
                      onClick={() => setSelectedItinerary(selectedItinerary === dest.id ? null : dest.id)}
                    >
                      {selectedItinerary === dest.id ? '▲ Masquer' : '▼ Itinéraire'}
                    </button>
                    <button className="btn-primary" onClick={() => handleBooking(dest)}>Réserver →</button>
                  </div>
                  
                  {selectedItinerary === dest.id && (
                    <div className="itinerary">
                      <h4>🗺️ Itinéraire détaillé</h4>
                      {dest.itinerary.map((item, i) => (
                        <div key={i} className="itinerary-item">
                          <span className="day">J{i+1}</span>
                          <div>
                            <strong>{item.title}</strong>
                            <p>{item.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {hasMore && (
            <div className="load-more" data-aos="fade-up">
              <button onClick={loadMore}>Charger plus <span>↓</span></button>
            </div>
          )}
        </div>
      </section>

      {/* Features */}
      <section className="features">
        <div className="container">
          <div className="features-grid">
            <div className="feature" data-aos="fade-up">
              <div className="feature-icon">🏆</div>
              <h3>Experts locaux</h3>
              <p>Guides passionnés qui connaissent chaque recoin</p>
            </div>
            <div className="feature" data-aos="fade-up" data-aos-delay="100">
              <div className="feature-icon">✧</div>
              <h3>Sur mesure</h3>
              <p>Itinéraires adaptés à vos envies</p>
            </div>
            <div className="feature" data-aos="fade-up" data-aos-delay="200">
              <div className="feature-icon">♡</div>
              <h3>Authentique</h3>
              <p>Hors des sentiers battus</p>
            </div>
            <div className="feature" data-aos="fade-up" data-aos-delay="300">
              <div className="feature-icon">🕊️</div>
              <h3>Assistance 24/7</h3>
              <p>Une équipe à votre écoute</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <div className="cta-content">
          <span className="cta-tag">✧ Offre découverte ✧</span>
          <h2>Prêt à vivre l'aventure ?</h2>
          <p>-15% sur votre premier circuit</p>
          <button className="cta-button" onClick={() => alert('Contactez-nous')}>
            Réserver maintenant →
          </button>
        </div>
      </section>

      <Footer />

      <style>{`
        /* RESET & BASE */
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        /* LOADER */
        .loader-wrapper {
          position: fixed;
          inset: 0;
          background: #0a0a0a;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          z-index: 9999;
          gap: 20px;
          color: #c8a87c;
          font-family: system-ui, sans-serif;
        }
        .loader-spinner {
          width: 40px;
          height: 40px;
          border: 2px solid rgba(200,168,124,0.2);
          border-top-color: #c8a87c;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        /* HERO - avec image locale */
        .hero {
          position: relative;
          min-height: 90vh;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          overflow: hidden;
          color: white;
        }
        .hero-image {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: url('/design1.png');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          z-index: 0;
        } 
        .hero-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.4) 100%);
          z-index: 1;
        }
        .hero-content {
          position: relative;
          z-index: 2;
          padding: 60px 20px;
          max-width: 800px;
        }
        .hero-tag {
          font-size: 12px;
          letter-spacing: 4px;
          text-transform: uppercase;
          color: #c8a87c;
          display: inline-block;
          margin-bottom: 24px;
        }
        .hero-title {
          font-size: clamp(42px, 10vw, 82px);
          font-weight: 500;
          line-height: 1.1;
          margin-bottom: 24px;
        }
        .hero-title span {
          font-style: italic;
          font-weight: 300;
          color: #c8a87c;
        }
        .hero-subtitle {
          font-size: 16px;
          opacity: 0.85;
          margin-bottom: 40px;
          line-height: 1.6;
        }
        .hero-stats {
          display: flex;
          justify-content: center;
          gap: 48px;
        }
        .stat strong {
          font-size: 28px;
          font-weight: 400;
          color: #c8a87c;
          display: block;
        }
        .stat span {
          font-size: 12px;
          opacity: 0.7;
        }
        .hero-scroll {
          position: absolute;
          bottom: 30px;
          left: 50%;
          transform: translateX(-50%);
          font-size: 20px;
          animation: bounce 2s infinite;
          cursor: pointer;
          z-index: 2;
          color: white;
        }
        @keyframes bounce { 0%,100%{transform:translateX(-50%) translateY(0)} 50%{transform:translateX(-50%) translateY(8px)} }

        /* DESTINATIONS */
        .destinations {
          padding: 80px 0;
          background: #faf8f5;
        }
        .container {
          max-width: 1300px;
          margin: 0 auto;
          padding: 0 24px;
        }
        .section-header {
          text-align: center;
          margin-bottom: 60px;
        }
        .section-subtitle {
          font-size: 12px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: #c8a87c;
        }
        .section-title {
          font-size: clamp(28px, 6vw, 44px);
          font-weight: 400;
          margin-top: 12px;
        }
        .section-title span {
          font-weight: 600;
          color: #c8a87c;
        }
        .section-line {
          width: 50px;
          height: 2px;
          background: #c8a87c;
          margin: 20px auto 0;
        }

        /* FILTERS */
        .filters {
          display: flex;
          justify-content: center;
          gap: 12px;
          margin-bottom: 50px;
          flex-wrap: wrap;
        }
        .filter {
          background: transparent;
          border: 1px solid #e0d8d0;
          padding: 8px 24px;
          border-radius: 40px;
          font-size: 13px;
          cursor: pointer;
          transition: all 0.2s ease;
          color: #5a4a3a;
        }
        .filter:hover, .filter.active {
          background: #c8a87c;
          border-color: #c8a87c;
          color: white;
        }

        /* GRID */
        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
          gap: 32px;
        }
        .card {
          background: white;
          border-radius: 8px;
          overflow: hidden;
          transition: all 0.3s ease;
          box-shadow: 0 8px 25px rgba(0,0,0,0.05);
        }
        .card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.1);
        }
        .card-image {
          position: relative;
          height: 250px;
          overflow: hidden;
        }
        .card-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }
        .card:hover .card-image img {
          transform: scale(1.03);
        }
        .card-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.5), transparent);
        }
        .card-price {
          position: absolute;
          bottom: 16px;
          right: 16px;
          background: rgba(0,0,0,0.7);
          backdrop-filter: blur(8px);
          padding: 6px 14px;
          border-radius: 30px;
          color: #c8a87c;
          font-weight: 600;
          font-size: 18px;
        }
        .card-price span {
          font-size: 11px;
          color: rgba(255,255,255,0.7);
          font-weight: normal;
        }
        .card-rating {
          position: absolute;
          top: 16px;
          left: 16px;
          background: rgba(0,0,0,0.6);
          backdrop-filter: blur(4px);
          padding: 4px 10px;
          border-radius: 20px;
          font-size: 12px;
          color: #ffc107;
        }
        .card-content {
          padding: 24px;
        }
        .card-location {
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: #c8a87c;
          margin-bottom: 8px;
        }
        .card-content h3 {
          font-size: 24px;
          font-weight: 500;
          margin-bottom: 4px;
        }
        .card-subtitle {
          font-size: 13px;
          color: #c8a87c;
          margin-bottom: 12px;
        }
        .card-desc {
          font-size: 13px;
          color: #6b5b4e;
          line-height: 1.5;
          margin-bottom: 16px;
        }
        .card-activities {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 16px;
        }
        .activity {
          background: #f0ebe5;
          padding: 4px 10px;
          border-radius: 20px;
          font-size: 11px;
          color: #5a4a3a;
        }
        .card-info {
          display: flex;
          gap: 16px;
          font-size: 12px;
          color: #8a7a6a;
          padding: 12px 0;
          border-top: 1px solid #eee;
          border-bottom: 1px solid #eee;
          margin-bottom: 16px;
        }
        .card-buttons {
          display: flex;
          gap: 12px;
        }
        .btn-outline {
          flex: 1;
          background: transparent;
          border: 1px solid #c8a87c;
          padding: 10px;
          border-radius: 30px;
          font-size: 13px;
          cursor: pointer;
          transition: all 0.2s;
          color: #c8a87c;
        }
        .btn-outline:hover {
          background: #c8a87c10;
        }
        .btn-primary {
          flex: 1;
          background: #c8a87c;
          border: none;
          padding: 10px;
          border-radius: 30px;
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
          color: white;
        }
        .btn-primary:hover {
          background: #b8956a;
        }

        /* ITINERARY */
        .itinerary {
          margin-top: 20px;
          padding-top: 16px;
          border-top: 1px solid #eee;
        }
        .itinerary h4 {
          font-size: 14px;
          margin-bottom: 12px;
          color: #c8a87c;
        }
        .itinerary-item {
          display: flex;
          gap: 12px;
          margin-bottom: 12px;
        }
        .itinerary-item .day {
          min-width: 32px;
          height: 32px;
          background: #f0ebe5;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: 600;
          color: #c8a87c;
        }
        .itinerary-item strong {
          font-size: 13px;
          display: block;
          margin-bottom: 2px;
        }
        .itinerary-item p {
          font-size: 11px;
          color: #8a7a6a;
        }

        /* LOAD MORE */
        .load-more {
          text-align: center;
          margin-top: 50px;
        }
        .load-more button {
          background: transparent;
          border: 1px solid #c8a87c;
          padding: 12px 36px;
          border-radius: 40px;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.2s;
          color: #c8a87c;
        }
        .load-more button:hover {
          background: #c8a87c;
          color: white;
        }

        /* FEATURES */
        .features {
          padding: 70px 0;
          background: #1a1a1a;
          color: white;
        }
        .features-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 30px;
        }
        .feature {
          text-align: center;
          padding: 24px;
        }
        .feature-icon {
          font-size: 40px;
          margin-bottom: 16px;
          opacity: 0.8;
        }
        .feature h3 {
          font-size: 18px;
          font-weight: 500;
          margin-bottom: 8px;
          color: #c8a87c;
        }
        .feature p {
          font-size: 13px;
          opacity: 0.6;
          line-height: 1.5;
        }

        /* CTA */
        .cta {
          padding: 80px 20px;
          text-align: center;
          background: #faf8f5;
        }
        .cta-content {
          max-width: 600px;
          margin: 0 auto;
        }
        .cta-tag {
          font-size: 11px;
          letter-spacing: 3px;
          color: #c8a87c;
          text-transform: uppercase;
        }
        .cta-content h2 {
          font-size: clamp(28px, 6vw, 42px);
          font-weight: 400;
          margin: 16px 0 8px;
        }
        .cta-content p {
          font-size: 16px;
          color: #8a7a6a;
          margin-bottom: 32px;
        }
        .cta-button {
          background: #c8a87c;
          border: none;
          padding: 14px 48px;
          border-radius: 40px;
          font-size: 15px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
          color: white;
        }
        .cta-button:hover {
          background: #b8956a;
          transform: translateY(-2px);
        }

        /* RESPONSIVE */
        @media (max-width: 900px) {
          .features-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 700px) {
          .hero-stats {
            gap: 24px;
          }
          .features-grid {
            grid-template-columns: 1fr;
          }
          .grid {
            grid-template-columns: 1fr;
          }
          .hero-title {
            font-size: 36px;
          }
        }
        @media (max-width: 480px) {
          .hero-stats {
            gap: 16px;
          }
          .stat strong {
            font-size: 20px;
          }
          .filter {
            padding: 6px 16px;
            font-size: 12px;
          }
        }
      `}</style>
    </>
  );
};

export default Destinations;