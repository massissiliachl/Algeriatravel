// src/pages/Gallery.jsx
import React, { useState, useEffect, useCallback } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [loadedImages, setLoadedImages] = useState({});
  const [commentText, setCommentText] = useState('');
  const [galleryImages, setGalleryImages] = useState([]);

  const initImages = [
    {
      id: 1,
      src: "/quad.jpeg",
      title: "Randonnée en Quad",
      location: "Sahara Algérien",
      description: "Aventure en quad à travers les dunes du Sahara algérien",
      size: "large",
      likes: 234,
      dislikes: 12,
      comments: []
    },
    {
      id: 2,
      src: "/parasailinf.jpeg",
      title: "Parachute Ascensionnel",
      location: "Côte Algérienne",
      description: "Vue panoramique exceptionnelle sur la mer Méditerranée",
      size: "medium",
      likes: 189,
      dislikes: 5,
      comments: []
    },
    {
      id: 3,
      src: "/i1.jpeg",
      title: "Excursion en Quad",
      location: "Algérie",
      description: "Découverte des paysages désertiques lors d'une sortie en quad",
      size: "small",
      likes: 312,
      dislikes: 8,
      comments: []
    },
    {
      id: 4,
      src: "/jetski.jpeg",
      title: "Jet Ski",
      location: "Béjaïa",
      description: "Sensations fortes sur les eaux cristallines de la Méditerranée",
      size: "large",
      likes: 456,
      dislikes: 15,
      comments: []
    },
    {
      id: 5,
      src: "/quad.jpeg",
      title: "Aventure dans les Dunes",
      location: "Algérie",
      description: "Parcours en quad à travers les magnifiques dunes dorées",
      size: "medium",
      likes: 278,
      dislikes: 9,
      comments: []
    },
    {
      id: 6,
      src: "/image.png",
      title: "Balade à Cheval",
      location: "Béjaïa",
      description: "Promenade à cheval au cœur des paysages naturels de Béjaïa",
      size: "small",
      likes: 167,
      dislikes: 6,
      comments: []
    },
    {
      id: 7,
      src: "/i.jpg",
      title: "Sortie en Bateau",
      location: "Béjaïa",
      description: "Excursion en bateau pour découvrir la côte et les criques de Béjaïa",
      size: "large",
      likes: 523,
      dislikes: 11,
      comments: []
    },
    {
      id: 8,
      src: "/quad1.jpeg",
      title: "Circuit en Quad",
      location: "Algérie",
      description: "Expérience unique au cœur des paysages sahariens",
      size: "medium",
      likes: 198,
      dislikes: 4,
      comments: []
    },
    {
      id: 9,
      src: "/vol parapente.jpg",
      title: "Vol en Parapente",
      location: "Béjaïa",
      description: "Admirez les paysages de Béjaïa depuis les airs",
      size: "small",
      likes: 145,
      dislikes: 3,
      comments: []
    },
    {
      id: 10,
      src: "/grotte.jpg",
      title: "Grottes de Béjaïa",
      location: "Béjaïa",
      description: "Découverte des magnifiques grottes naturelles de Béjaïa",
      size: "large",
      likes: 345,
      dislikes: 7,
      comments: []
    },
    {
      id: 11,
      src: "/dj.jpeg",
      title: "Ferme de Djerba",
      location: "Tazeboujt - Béjaïa",
      description: "Ferme touristique offrant un cadre naturel paisible et authentique",
      size: "medium",
      likes: 156,
      dislikes: 2,
      comments: []
    },
    {
      id: 12,
      src: "/paddle.jpeg",
      title: "Paddle en Mer",
      location: "Béjaïa",
      description: "Activité paddle sur les eaux turquoise de la côte béjaouie",
      size: "small",
      likes: 234,
      dislikes: 5,
      comments: [
        { id: 1, user: "Lilia Ben.", text: "Magnifique !!! 😍", date: "2024-01-15", avatar: "[randomuser.me](https://randomuser.me/api/portraits/women/1.jpg)" },
        { id: 2, user: "Yanis L.", text: "Un paysage a couper le souffle", date: "2024-01-10", avatar: "[randomuser.me](https://randomuser.me/api/portraits/men/1.jpg)" }
      ]    }
  ];
  useEffect(() => {
    const savedGallery = localStorage.getItem('gallery_interactions');
    if (savedGallery) {
      setGalleryImages(JSON.parse(savedGallery));
    } else {
      setGalleryImages(initImages);
      localStorage.setItem('gallery_interactions', JSON.stringify(initImages));
    }

    AOS.init({
      duration: 800,
      once: true,
      offset: 40,
      easing: 'ease-out-cubic'
    });
  }, []);

  const saveInteractions = useCallback((updatedImages) => {
    setGalleryImages(updatedImages);
    localStorage.setItem('gallery_interactions', JSON.stringify(updatedImages));
  }, []);

  const handleLike = useCallback((imageId) => {
    const updatedImages = galleryImages.map((img) =>
      img.id === imageId ? { ...img, likes: img.likes + 1 } : img
    );
    saveInteractions(updatedImages);
  }, [galleryImages, saveInteractions]);

  const handleDislike = useCallback((imageId) => {
    const updatedImages = galleryImages.map((img) =>
      img.id === imageId ? { ...img, dislikes: img.dislikes + 1 } : img
    );
    saveInteractions(updatedImages);
  }, [galleryImages, saveInteractions]);

  const handleAddComment = useCallback((imageId) => {
    if (!commentText.trim()) return;
    const newComment = {
      id: Date.now(),
      user: "Voyageur",
      text: commentText.trim(),
      date: new Date().toISOString().split('T')[0],
      avatar: `https://randomuser.me/api/portraits/lego/${Math.floor(Math.random() * 10)}.jpg`
    };
    const updatedImages = galleryImages.map((img) =>
      img.id === imageId ? { ...img, comments: [newComment, ...img.comments] } : img
    );

    saveInteractions(updatedImages);
    setCommentText('');
  }, [commentText, galleryImages, saveInteractions]);

  const handleImageLoad = (id) => {
    setLoadedImages((prev) => ({ ...prev, [id]: true }));
  };

  const currentImage = selectedImage
    ? galleryImages.find((img) => img.id === selectedImage.id)
    : null;

  const currentIndex = selectedImage
    ? galleryImages.findIndex((img) => img.id === selectedImage.id)
    : -1;

  return (
    <>
      <Navbar />

      <section className="gallery-hero">
        <div className="gallery-hero-bg"></div>
        <div className="gallery-hero-overlay"></div>
        <div className="gallery-hero-glow glow-1"></div>
        <div className="gallery-hero-glow glow-2"></div>

        <div className="container">
          <div className="gallery-hero-content" data-aos="fade-up">
            <span className="hero-badge">Explorez l'Algerie autrement</span>
            <h1>
              Galerie <span className="text-gold">Photographique</span>
            </h1>
            <p>
              Une immersion visuelle a travers les paysages, les villes et les
              tresors naturels de l'Algerie.
            </p>

            <div className="gallery-hero-stats">
              <span>
                <i className="fas fa-image"></i>
                {galleryImages.length}+ Photos
              </span>
              <span>
                <i className="fas fa-heart"></i>
                {galleryImages.reduce((sum, img) => sum + img.likes, 0)} Likes
              </span>
              <span>
                <i className="fas fa-comment"></i>
                {galleryImages.reduce((sum, img) => sum + img.comments.length, 0)} Commentaires
              </span>
            </div>
          </div>
        </div>

        <div className="hero-scroll-hint">
          <span>Scroller pour decouvrir</span>
          <i className="fas fa-chevron-down"></i>
        </div>
      </section>

      <section className="gallery-section">
        <div className="container">
          <div className="section-heading" data-aos="fade-up">
            <span className="section-kicker">Collection visuelle</span>
            <h2>Moments captures a travers le pays</h2>
            <p>
              Une selection d'instants uniques entre desert, mer, patrimoine et montagnes.
            </p>
          </div>

          <div className="masonry-grid">
            {galleryImages.map((image, index) => (
              <div
                key={image.id}
                className={`masonry-item ${image.size} ${!loadedImages[image.id] ? 'loading' : ''}`}
                data-aos="fade-up"
                data-aos-delay={60 * (index % 6)}
                onClick={() => setSelectedImage(image)}
              >
                {!loadedImages[image.id] && (
                  <div className="masonry-item-loader">
                    <div className="loader-ring"></div>
                  </div>
                )}

                <img
                  src={image.src}
                  alt={image.title}
                  loading="lazy"
                  onLoad={() => handleImageLoad(image.id)}
                  style={{ opacity: loadedImages[image.id] ? 1 : 0 }}
                />

                <div className="masonry-item-overlay">
                  <div className="masonry-top-tag">{image.location}</div>

                  <div className="masonry-item-info">
                    <div>
                      <h3>{image.title}</h3>
                      <p>{image.description}</p>
                    </div>

                    <div className="masonry-item-stats">
                      <span>
                        <i className="fas fa-heart"></i> {image.likes}
                      </span>
                      <span>
                        <i className="fas fa-comment"></i> {image.comments.length}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {selectedImage && currentImage && (
        <div className="lightbox" onClick={() => setSelectedImage(null)}>
          <button
            className="lightbox-close"
            onClick={() => setSelectedImage(null)}
          >
            <i className="fas fa-times"></i>
          </button>

          <button
            className="lightbox-nav lightbox-prev"
            onClick={(e) => {
              e.stopPropagation();
              const prevIndex = currentIndex > 0 ? currentIndex - 1 : galleryImages.length - 1;
              setSelectedImage(galleryImages[prevIndex]);
            }}
          >
            <i className="fas fa-chevron-left"></i>
          </button>

          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <div className="lightbox-image">
              <img src={currentImage.src} alt={currentImage.title} />
            </div>

            <div className="lightbox-details">
              <div className="lightbox-header">
                <div>
                  <span className="lightbox-chip">{currentImage.location}</span>
                  <h2>{currentImage.title}</h2>
                  <p className="lightbox-description">{currentImage.description}</p>
                </div>

                <div className="lightbox-actions">
                  <button
                    className="action-btn like-btn"
                    onClick={() => handleLike(currentImage.id)}
                  >
                    <i className="fas fa-heart"></i> {currentImage.likes}
                  </button>

                  <button
                    className="action-btn dislike-btn"
                    onClick={() => handleDislike(currentImage.id)}
                  >
                    <i className="fas fa-thumbs-down"></i> {currentImage.dislikes}
                  </button>
                </div>
              </div>

              <div className="comments-card">
                <h3>
                  <i className="fas fa-comments"></i>
                  Commentaires ({currentImage.comments.length})
                </h3>

                <div className="add-comment">
                  <textarea
                    placeholder="Partagez votre avis..."
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    rows="3"
                  />
                  <button
                    className="send-comment"
                    onClick={() => handleAddComment(currentImage.id)}
                    disabled={!commentText.trim()}
                  >
                    Envoyer <i className="fas fa-paper-plane"></i>
                  </button>
                </div>

                <div className="comments-list">
                  {currentImage.comments.length === 0 ? (
                    <div className="no-comments">
                      <i className="fas fa-comment-dots"></i>
                      <p>Soyez le premier a commenter !</p>
                    </div>
                  ) : (
                    currentImage.comments.map((comment) => (
                      <div key={comment.id} className="comment-item">
                        <img
                          src={comment.avatar}
                          alt={comment.user}
                          className="comment-avatar"
                        />

                        <div className="comment-content">
                          <div className="comment-header">
                            <strong>{comment.user}</strong>
                            <span className="comment-date">{comment.date}</span>
                          </div>
                          <p>{comment.text}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>

          <button
            className="lightbox-nav lightbox-next"
            onClick={(e) => {
              e.stopPropagation();
              const nextIndex = currentIndex < galleryImages.length - 1 ? currentIndex + 1 : 0;
              setSelectedImage(galleryImages[nextIndex]);
            }}
          >
            <i className="fas fa-chevron-right"></i>
          </button>

          <div className="lightbox-counter">
            {currentIndex + 1} / {galleryImages.length}
          </div>
        </div>
      )}

      <Footer />

      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        :root {
          --gold: #d4af37;
          --gold-dark: #a67c1f;
          --gold-soft: rgba(212, 175, 55, 0.16);
          --dark: #0b0b0f;
          --dark-2: #12131a;
          --dark-3: #191b24;
          --gray: #8c8f99;
          --gray-soft: #c7cad1;
          --light: #f7f7f9;
          --white: #ffffff;
          --red: #ff5b6e;
          --shadow-lg: 0 20px 60px rgba(0, 0, 0, 0.28);
          --shadow-md: 0 10px 30px rgba(0, 0, 0, 0.18);
          --border: rgba(255, 255, 255, 0.08);
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
          color: var(--white);
          background:
            radial-gradient(circle at top left, rgba(212,175,55,0.06), transparent 25%),
            linear-gradient(180deg, #0b0b0f 0%, #101118 100%);
        }

        .container {
          width: min(100%, 1440px);
          margin: 0 auto;
          padding: 0 24px;
        }

        .text-gold {
          color: var(--gold);
        }

        .gallery-hero {
          position: relative;
          min-height: 78vh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          isolation: isolate;
        }

        .gallery-hero-bg {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.7)),
            url('[images.pexels.com](https://images.pexels.com/photos/2567327/pexels-photo-2567327.jpeg)') center/cover no-repeat;
          transform: scale(1.08);
          animation: heroZoom 24s ease-in-out infinite;
        }

        .gallery-hero-overlay {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at 20% 30%, rgba(212,175,55,0.16), transparent 28%),
            linear-gradient(135deg, rgba(11,11,15,0.55), rgba(11,11,15,0.88));
          z-index: 1;
        }

        .gallery-hero-glow {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          z-index: 1;
        }

        .glow-1 {
          width: 220px;
          height: 220px;
          background: rgba(212,175,55,0.16);
          top: 12%;
          left: 10%;
        }

        .glow-2 {
          width: 260px;
          height: 260px;
          background: rgba(255,255,255,0.06);
          right: 8%;
          bottom: 12%;
        }

        @keyframes heroZoom {
          0%, 100% { transform: scale(1.06); }
          50% { transform: scale(1.12); }
        }

        .gallery-hero-content {
          position: relative;
          z-index: 2;
          max-width: 860px;
          text-align: center;
          margin: 0 auto;
          padding-top: 40px;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 18px;
          border: 1px solid rgba(255,255,255,0.16);
          background: rgba(255,255,255,0.08);
          backdrop-filter: blur(14px);
          color: var(--gray-soft);
          border-radius: 999px;
          font-size: 0.85rem;
          margin-bottom: 22px;
          box-shadow: var(--shadow-md);
        }

        .gallery-hero-content h1 {
          font-size: clamp(2.6rem, 6vw, 5.4rem);
          line-height: 1.02;
          letter-spacing: -0.03em;
          font-weight: 800;
          margin-bottom: 18px;
        }

        .gallery-hero-content p {
          font-size: clamp(1rem, 2vw, 1.15rem);
          line-height: 1.75;
          color: rgba(255,255,255,0.78);
          max-width: 700px;
          margin: 0 auto 34px;
        }

        .gallery-hero-stats {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 14px;
        }

        .gallery-hero-stats span {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 12px 18px;
          border-radius: 999px;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.12);
          backdrop-filter: blur(12px);
          color: var(--white);
          font-size: 0.92rem;
          box-shadow: var(--shadow-md);
        }

        .gallery-hero-stats i {
          color: var(--gold);
        }

        .hero-scroll-hint {
          position: absolute;
          bottom: 28px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          color: rgba(255,255,255,0.72);
          font-size: 0.78rem;
          animation: bounce 2s infinite;
        }

        @keyframes bounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(8px); }
        }

        .gallery-section {
          position: relative;
          padding: 90px 0 100px;
          background:
            radial-gradient(circle at top center, rgba(212,175,55,0.06), transparent 30%),
            linear-gradient(180deg, #11131a 0%, #0d0f15 100%);
        }

        .section-heading {
          text-align: center;
          max-width: 760px;
          margin: 0 auto 46px;
        }

        .section-kicker {
          display: inline-block;
          color: var(--gold);
          font-size: 0.82rem;
          text-transform: uppercase;
          letter-spacing: 0.16em;
          margin-bottom: 12px;
          font-weight: 700;
        }

        .section-heading h2 {
          font-size: clamp(1.9rem, 4vw, 3rem);
          margin-bottom: 14px;
          color: var(--white);
        }

        .section-heading p {
          color: rgba(255,255,255,0.66);
          line-height: 1.8;
          font-size: 1rem;
        }

        .masonry-grid {
          column-count: 4;
          column-gap: 22px;
        }

        .masonry-item {
          position: relative;
          break-inside: avoid;
          margin-bottom: 22px;
          border-radius: 24px;
          overflow: hidden;
          cursor: pointer;
          background: #1d1f28;
          border: 1px solid rgba(255,255,255,0.06);
          box-shadow: var(--shadow-lg);
          transition: transform 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease;
        }

        .masonry-item:hover {
          transform: translateY(-8px);
          border-color: rgba(212,175,55,0.28);
          box-shadow: 0 26px 60px rgba(0,0,0,0.35);
        }

        .masonry-item.loading {
          min-height: 220px;
        }

        .masonry-item-loader {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background:
            linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02));
          z-index: 2;
        }

        .loader-ring {
          width: 42px;
          height: 42px;
          border: 3px solid rgba(255,255,255,0.15);
          border-top-color: var(--gold);
          border-radius: 50%;
          animation: spin 0.9s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .masonry-item img {
          width: 100%;
          height: auto;
          display: block;
          transition: transform 0.55s ease, filter 0.4s ease, opacity 0.4s ease;
        }

        .masonry-item:hover img {
          transform: scale(1.05);
          filter: brightness(0.92);
        }

        .masonry-item.small img {
          min-height: 220px;
          object-fit: cover;
        }

        .masonry-item.medium img {
          min-height: 310px;
          object-fit: cover;
        }

        .masonry-item.large img {
          min-height: 430px;
          object-fit: cover;
        }

        .masonry-item-overlay {
          position: absolute;
          inset: 0;
          padding: 18px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          background:
            linear-gradient(to top, rgba(8,8,10,0.92) 8%, rgba(8,8,10,0.15) 52%, rgba(8,8,10,0.06) 100%);
          opacity: 0;
          transition: opacity 0.35s ease;
        }

        .masonry-item:hover .masonry-item-overlay {
          opacity: 1;
        }

        .masonry-top-tag {
          align-self: flex-start;
          padding: 8px 14px;
          border-radius: 999px;
          background: rgba(255,255,255,0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.14);
          color: var(--white);
          font-size: 0.78rem;
        }

        .masonry-item-info h3 {
          font-size: 1.15rem;
          color: var(--white);
          margin-bottom: 8px;
        }

        .masonry-item-info p {
          color: rgba(255,255,255,0.72);
          font-size: 0.9rem;
          line-height: 1.5;
          margin-bottom: 14px;
        }

        .masonry-item-stats {
          display: flex;
          gap: 16px;
          align-items: center;
        }

        .masonry-item-stats span {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: var(--white);
          font-size: 0.85rem;
          padding: 8px 12px;
          border-radius: 999px;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.1);
        }

        .masonry-item-stats .fa-heart {
          color: var(--red);
        }

        .lightbox {
          position: fixed;
          inset: 0;
          z-index: 2000;
          background: rgba(3, 4, 8, 0.78);
          backdrop-filter: blur(16px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
        }

        .lightbox-content {
          display: grid;
          grid-template-columns: 1.3fr 0.9fr;
          width: min(1320px, 100%);
          max-height: 92vh;
          border-radius: 28px;
          overflow: hidden;
          background: rgba(17, 19, 26, 0.92);
          border: 1px solid rgba(255,255,255,0.08);
          box-shadow: 0 30px 80px rgba(0,0,0,0.45);
        }

        .lightbox-image {
          background:
            radial-gradient(circle at center, rgba(212,175,55,0.08), transparent 45%),
            #090a0f;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
        }

        .lightbox-image img {
          width: 100%;
          max-height: 85vh;
          object-fit: contain;
          border-radius: 20px;
          box-shadow: 0 12px 40px rgba(0,0,0,0.35);
        }

        .lightbox-details {
          padding: 28px;
          color: var(--white);
          overflow-y: auto;
          background:
            linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01));
        }

        .lightbox-details::-webkit-scrollbar,
        .comments-list::-webkit-scrollbar {
          width: 6px;
        }

        .lightbox-details::-webkit-scrollbar-thumb,
        .comments-list::-webkit-scrollbar-thumb {
          background: rgba(212,175,55,0.55);
          border-radius: 999px;
        }

        .lightbox-header {
          display: flex;
          flex-direction: column;
          gap: 18px;
          margin-bottom: 24px;
        }

        .lightbox-chip {
          display: inline-block;
          padding: 8px 14px;
          margin-bottom: 14px;
          border-radius: 999px;
          background: var(--gold-soft);
          border: 1px solid rgba(212,175,55,0.24);
          color: var(--gold);
          font-size: 0.82rem;
          font-weight: 700;
        }

        .lightbox-header h2 {
          font-size: 2rem;
          line-height: 1.15;
          margin-bottom: 10px;
        }

        .lightbox-description {
          color: rgba(255,255,255,0.7);
          line-height: 1.8;
          font-size: 0.98rem;
        }

        .lightbox-actions {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .action-btn {
          border: none;
          border-radius: 999px;
          padding: 12px 18px;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 0.92rem;
          font-weight: 700;
          cursor: pointer;
          transition: transform 0.25s ease, background 0.25s ease, color 0.25s ease;
        }

        .action-btn:hover {
          transform: translateY(-2px);
        }

        .like-btn {
          background: rgba(255, 91, 110, 0.14);
          color: #ff8a98;
          border: 1px solid rgba(255, 91, 110, 0.2);
        }

        .like-btn:hover {
          background: rgba(255, 91, 110, 0.22);
        }

        .dislike-btn {
          background: rgba(255,255,255,0.08);
          color: var(--white);
          border: 1px solid rgba(255,255,255,0.1);
        }

        .dislike-btn:hover {
          background: rgba(255,255,255,0.15);
        }

        .comments-card {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 22px;
          padding: 20px;
        }

        .comments-card h3 {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 1rem;
          margin-bottom: 18px;
        }

        .comments-card h3 i {
          color: var(--gold);
        }

        .add-comment {
          margin-bottom: 18px;
        }

        .add-comment textarea {
          width: 100%;
          padding: 14px 16px;
          border-radius: 16px;
          border: 1px solid rgba(255,255,255,0.1);
          background: rgba(255,255,255,0.06);
          color: var(--white);
          font-size: 0.95rem;
          font-family: inherit;
          resize: vertical;
          min-height: 96px;
          transition: border-color 0.25s ease, background 0.25s ease;
        }

        .add-comment textarea:focus {
          outline: none;
          border-color: rgba(212,175,55,0.5);
          background: rgba(255,255,255,0.08);
        }

        .add-comment textarea::placeholder {
          color: rgba(255,255,255,0.42);
        }

        .send-comment {
          margin-top: 10px;
          border: none;
          border-radius: 999px;
          padding: 11px 18px;
          background: linear-gradient(135deg, var(--gold), var(--gold-dark));
          color: #fff;
          font-weight: 700;
          cursor: pointer;
          transition: transform 0.25s ease, opacity 0.25s ease, box-shadow 0.25s ease;
          box-shadow: 0 10px 24px rgba(212,175,55,0.22);
        }

        .send-comment:hover:not(:disabled) {
          transform: translateY(-2px);
        }

        .send-comment:disabled {
          opacity: 0.55;
          cursor: not-allowed;
          box-shadow: none;
        }

        .comments-list {
          max-height: 320px;
          overflow-y: auto;
          padding-right: 4px;
        }

        .no-comments {
          text-align: center;
          padding: 28px 14px;
          color: rgba(255,255,255,0.5);
        }

        .no-comments i {
          font-size: 2rem;
          margin-bottom: 10px;
          color: rgba(212,175,55,0.7);
        }

        .comment-item {
          display: flex;
          gap: 12px;
          padding: 14px;
          border-radius: 16px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.05);
          margin-bottom: 12px;
        }

        .comment-avatar {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid rgba(255,255,255,0.12);
        }

        .comment-content {
          flex: 1;
        }

        .comment-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
          margin-bottom: 6px;
        }

        .comment-header strong {
          font-size: 0.95rem;
          color: var(--white);
        }

        .comment-date {
          font-size: 0.78rem;
          color: rgba(255,255,255,0.48);
        }

        .comment-content p {
          color: rgba(255,255,255,0.74);
          line-height: 1.6;
          font-size: 0.92rem;
        }

        .lightbox-close,
        .lightbox-nav {
          position: absolute;
          z-index: 2001;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: var(--white);
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.12);
          backdrop-filter: blur(12px);
          transition: transform 0.25s ease, background 0.25s ease;
        }

        .lightbox-close:hover,
        .lightbox-nav:hover {
          transform: scale(1.06);
          background: rgba(212,175,55,0.22);
        }

        .lightbox-close {
          top: 22px;
          right: 22px;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          font-size: 1rem;
        }

        .lightbox-nav {
          top: 50%;
          transform: translateY(-50%);
          width: 52px;
          height: 52px;
          border-radius: 50%;
          font-size: 1rem;
        }

        .lightbox-prev {
          left: 26px;
        }

        .lightbox-next {
          right: 26px;
        }

        .lightbox-counter {
          position: absolute;
          bottom: 22px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 2001;
          padding: 10px 16px;
          border-radius: 999px;
          background: rgba(0,0,0,0.4);
          border: 1px solid rgba(255,255,255,0.08);
          color: var(--white);
          font-size: 0.86rem;
          backdrop-filter: blur(12px);
        }

        @media (max-width: 1200px) {
          .masonry-grid {
            column-count: 3;
          }

          .lightbox-content {
            grid-template-columns: 1fr;
          }

          .lightbox-image img {
            max-height: 48vh;
          }
        }

        @media (max-width: 768px) {
          .gallery-hero {
            min-height: 70vh;
          }

          .gallery-hero-content {
            padding-top: 70px;
          }

          .gallery-section {
            padding: 72px 0 84px;
          }

          .masonry-grid {
            column-count: 2;
            column-gap: 16px;
          }

          .masonry-item {
            margin-bottom: 16px;
            border-radius: 20px;
          }

          .masonry-item.small img {
            min-height: 180px;
          }

          .masonry-item.medium img {
            min-height: 240px;
          }

          .masonry-item.large img {
            min-height: 320px;
          }

          .lightbox {
            padding: 14px;
          }

          .lightbox-content {
            border-radius: 22px;
            max-height: 94vh;
          }

          .lightbox-details {
            padding: 20px;
          }

          .lightbox-header h2 {
            font-size: 1.5rem;
          }

          .lightbox-close {
            top: 12px;
            right: 12px;
            width: 42px;
            height: 42px;
          }

          .lightbox-nav {
            width: 42px;
            height: 42px;
          }

          .lightbox-prev {
            left: 10px;
          }

          .lightbox-next {
            right: 10px;
          }

          .lightbox-counter {
            bottom: 12px;
          }
        }

        @media (max-width: 480px) {
          .container {
            padding: 0 16px;
          }

          .hero-badge {
            font-size: 0.78rem;
            padding: 8px 14px;
          }

          .gallery-hero-stats {
            gap: 10px;
          }

          .gallery-hero-stats span {
            font-size: 0.82rem;
            padding: 10px 14px;
          }

          .masonry-grid {
            column-count: 1;
          }

          .masonry-item.small img,
          .masonry-item.medium img,
          .masonry-item.large img {
            min-height: auto;
          }

          .masonry-item-overlay {
            opacity: 1;
          }

          .masonry-item-info p {
            font-size: 0.84rem;
          }

          .lightbox-details {
            padding: 16px;
          }

          .comments-card {
            padding: 16px;
          }

          .action-btn {
            width: 100%;
            justify-content: center;
          }
        }

        [data-aos] {
          pointer-events: auto !important;
        }
      `}</style>
    </>
  );
};

export default Gallery;
