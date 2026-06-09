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

  // Données initiales avec likes et commentaires
  const initImages = [
    {
      id: 1,
      src: "https://images.pexels.com/photos/2567327/pexels-photo-2567327.jpeg",
      title: "Dunes du Grand Erg",
      location: "Grand Erg Occidental",
      description: "Coucher de soleil sur les dunes dorées du Sahara",
      size: "large",
      likes: 234,
      dislikes: 12,
      comments: [
        { id: 1, user: "Sophie M.", text: "Magnifique !!! 😍", date: "2024-01-15", avatar: "https://randomuser.me/api/portraits/women/1.jpg" },
        { id: 2, user: "Thomas L.", text: "Un paysage à couper le souffle", date: "2024-01-10", avatar: "https://randomuser.me/api/portraits/men/1.jpg" }
      ]
    },
    {
      id: 2,
      src: "https://images.pexels.com/photos/3585320/pexels-photo-3585320.jpeg",
      title: "Ruines de Tipaza",
      location: "Tipaza",
      description: "Vestiges romains face à la Méditerranée",
      size: "medium",
      likes: 189,
      dislikes: 5,
      comments: [
        { id: 1, user: "Amira K.", text: "L'histoire à l'état pur", date: "2024-01-12", avatar: "https://randomuser.me/api/portraits/women/2.jpg" }
      ]
    },
    {
      id: 3,
      src: "https://images.pexels.com/photos/2113861/pexels-photo-2113861.jpeg",
      title: "Montagnes du Djurdjura",
      location: "Tizi Ouzou",
      description: "Panorama sur les montagnes de Kabylie",
      size: "small",
      likes: 312,
      dislikes: 8,
      comments: [
        { id: 1, user: "Karim B.", text: "Ma région natale ! ❤️", date: "2024-01-08", avatar: "https://randomuser.me/api/portraits/men/2.jpg" },
        { id: 2, user: "Julie R.", text: "Les couleurs sont incroyables", date: "2024-01-05", avatar: "https://randomuser.me/api/portraits/women/3.jpg" }
      ]
    },
    {
      id: 4,
      src: "https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg",
      title: "Oasis de Timimoun",
      location: "Timimoun",
      description: "La rouge aux mille palmiers",
      size: "large",
      likes: 456,
      dislikes: 15,
      comments: [
        { id: 1, user: "Pierre D.", text: "Une oasis de rêve", date: "2024-01-14", avatar: "https://randomuser.me/api/portraits/men/3.jpg" }
      ]
    },
    {
      id: 5,
      src: "https://images.pexels.com/photos/3875826/pexels-photo-3875826.jpeg",
      title: "Casbah d'Alger",
      location: "Alger",
      description: "La blanche aux ruelles mystérieuses",
      size: "medium",
      likes: 278,
      dislikes: 9,
      comments: []
    },
    {
      id: 6,
      src: "https://images.pexels.com/photos/2641456/pexels-photo-2641456.jpeg",
      title: "Village Perché",
      location: "Beni Yenni",
      description: "Architecture traditionnelle berbère",
      size: "small",
      likes: 167,
      dislikes: 6,
      comments: []
    },
    {
      id: 7,
      src: "https://images.pexels.com/photos/417344/pexels-photo-417344.jpeg",
      title: "Massif du Hoggar",
      location: "Tamanrasset",
      description: "Paysages lunaires du Hoggar",
      size: "large",
      likes: 523,
      dislikes: 11,
      comments: [
        { id: 1, user: "Yannick F.", text: "Un endroit mythique !", date: "2024-01-13", avatar: "https://randomuser.me/api/portraits/men/4.jpg" }
      ]
    },
    {
      id: 8,
      src: "https://images.pexels.com/photos/2614831/pexels-photo-2614831.jpeg",
      title: "Baie d'Alger",
      location: "Alger",
      description: "La baie d'Alger au coucher du soleil",
      size: "medium",
      likes: 198,
      dislikes: 4,
      comments: []
    },
    {
      id: 9,
      src: "https://images.pexels.com/photos/2968982/pexels-photo-2968982.jpeg",
      title: "Forêt de cèdres",
      location: "Djurdjura",
      description: "Forêts millénaires de Kabylie",
      size: "small",
      likes: 145,
      dislikes: 3,
      comments: []
    },
    {
      id: 10,
      src: "https://images.pexels.com/photos/1658967/pexels-photo-1658967.jpeg",
      title: "Dunes au crépuscule",
      location: "Djanet",
      description: "Moment magique sur les dunes",
      size: "large",
      likes: 345,
      dislikes: 7,
      comments: []
    },
    {
      id: 11,
      src: "https://images.pexels.com/photos/2422265/pexels-photo-2422265.jpeg",
      title: "Port de pêche",
      location: "Cherchell",
      description: "Vie maritime authentique",
      size: "medium",
      likes: 156,
      dislikes: 2,
      comments: []
    },
    {
      id: 12,
      src: "https://images.pexels.com/photos/1770809/pexels-photo-1770809.jpeg",
      title: "Vallée verdoyante",
      location: "Kabylie",
      description: "Nature préservée de Kabylie",
      size: "small",
      likes: 234,
      dislikes: 5,
      comments: []
    }
  ];

  useEffect(() => {
    const savedGallery = localStorage.getItem('gallery_interactions');
    if (savedGallery) {
      setGalleryImages(JSON.parse(savedGallery));
    } else {
      setGalleryImages(initImages);
      localStorage.setItem('gallery_interactions', JSON.stringify(initImages));
    }
    AOS.init({ duration: 800, once: true, offset: 50 });
  }, []);

  const saveInteractions = useCallback((updatedImages) => {
    setGalleryImages(updatedImages);
    localStorage.setItem('gallery_interactions', JSON.stringify(updatedImages));
  }, []);

  const handleLike = useCallback((imageId) => {
    const updatedImages = galleryImages.map(img => 
      img.id === imageId ? { ...img, likes: img.likes + 1 } : img
    );
    saveInteractions(updatedImages);
  }, [galleryImages, saveInteractions]);

  const handleDislike = useCallback((imageId) => {
    const updatedImages = galleryImages.map(img => 
      img.id === imageId ? { ...img, dislikes: img.dislikes + 1 } : img
    );
    saveInteractions(updatedImages);
  }, [galleryImages, saveInteractions]);

  const handleAddComment = useCallback((imageId) => {
    if (!commentText.trim()) return;
    
    const newComment = {
      id: Date.now(),
      user: "Voyageur",
      text: commentText,
      date: new Date().toISOString().split('T')[0],
      avatar: `https://randomuser.me/api/portraits/lego/${Math.floor(Math.random() * 10)}.jpg`
    };
    
    const updatedImages = galleryImages.map(img => 
      img.id === imageId ? { ...img, comments: [newComment, ...img.comments] } : img
    );
    saveInteractions(updatedImages);
    setCommentText('');
  }, [commentText, galleryImages, saveInteractions]);

  const handleImageLoad = (id) => {
    setLoadedImages(prev => ({ ...prev, [id]: true }));
  };

  const currentImage = selectedImage ? galleryImages.find(img => img.id === selectedImage.id) : null;

  return (
    <>
      <Navbar />
      
      <section className="gallery-hero">
        <div className="gallery-hero-overlay"></div>
        <div className="gallery-hero-content" data-aos="fade-up">
          <h1>Galerie <span className="text-gold">Photographique</span></h1>
          <p>Découvrez la beauté de l'Algérie à travers l'objectif</p>
          <div className="gallery-hero-stats">
            <span><i className="fas fa-image"></i> {galleryImages.length}+ Photos</span>
            <span><i className="fas fa-heart"></i> {galleryImages.reduce((sum, img) => sum + img.likes, 0)} Likes</span>
            <span><i className="fas fa-comment"></i> {galleryImages.reduce((sum, img) => sum + img.comments.length, 0)} Commentaires</span>
          </div>
        </div>
        <div className="hero-scroll-hint">
          <span>Scroller pour découvrir</span>
          <i className="fas fa-chevron-down"></i>
        </div>
      </section>

      {/* Masonry Gallery Grid */}
      <section className="gallery-section">
        <div className="container">
          <div className="masonry-grid">
            {galleryImages.map((image, index) => (
              <div
                key={image.id}
                className={`masonry-item ${image.size} ${!loadedImages[image.id] ? 'loading' : ''}`}
                data-aos="fade-up"
                data-aos-delay={50 * (index % 6)}
                onClick={() => setSelectedImage(image)}
              >
                {!loadedImages[image.id] && (
                  <div className="masonry-item-loader">
                    <i className="fas fa-spinner fa-spin"></i>
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
                  <div className="masonry-item-info">
                    <h3>{image.title}</h3>
                    <p><i className="fas fa-map-marker-alt"></i> {image.location}</p>
                  </div>
                  <div className="masonry-item-stats">
                    <span><i className="fas fa-heart"></i> {image.likes}</span>
                    <span><i className="fas fa-comment"></i> {image.comments.length}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox avec interactions */}
      {selectedImage && currentImage && (
        <div className="lightbox" onClick={() => setSelectedImage(null)}>
          <button className="lightbox-close" onClick={() => setSelectedImage(null)}>
            <i className="fas fa-times"></i>
          </button>
          
          <button 
            className="lightbox-nav lightbox-prev" 
            onClick={(e) => {
              e.stopPropagation();
              const currentIndex = galleryImages.findIndex(i => i.id === selectedImage.id);
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
                  <h2>{currentImage.title}</h2>
                  <p className="lightbox-location">
                    <i className="fas fa-map-marker-alt"></i> {currentImage.location}
                  </p>
                </div>
                <div className="lightbox-actions">
                  <button className="action-btn like-btn" onClick={() => handleLike(currentImage.id)}>
                    <i className="fas fa-heart"></i> {currentImage.likes}
                  </button>
                  <button className="action-btn dislike-btn" onClick={() => handleDislike(currentImage.id)}>
                    <i className="fas fa-thumbs-down"></i> {currentImage.dislikes}
                  </button>
                </div>
              </div>
              
              <p className="lightbox-description">{currentImage.description}</p>
              
              <div className="lightbox-comments">
                <h3><i className="fas fa-comments"></i> Commentaires ({currentImage.comments.length})</h3>
                
                <div className="add-comment">
                  <textarea
                    placeholder="Partagez votre avis..."
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    rows="2"
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
                      <p>Soyez le premier à commenter !</p>
                    </div>
                  ) : (
                    currentImage.comments.map(comment => (
                      <div key={comment.id} className="comment-item">
                        <img src={comment.avatar} alt={comment.user} className="comment-avatar" />
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
              const currentIndex = galleryImages.findIndex(i => i.id === selectedImage.id);
              const nextIndex = currentIndex < galleryImages.length - 1 ? currentIndex + 1 : 0;
              setSelectedImage(galleryImages[nextIndex]);
            }}
          >
            <i className="fas fa-chevron-right"></i>
          </button>
          
          <div className="lightbox-counter">
            {galleryImages.findIndex(i => i.id === selectedImage.id) + 1} / {galleryImages.length}
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
          --gold: #c6a43b;
          --gold-dark: #a07d2c;
          --dark: #111111;
          --dark-gray: #1a1a1a;
          --gray: #666666;
          --light-gray: #f5f5f5;
          --white: #ffffff;
          --red: #e74c3c;
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
          color: var(--dark);
          background: var(--white);
        }

        .container {
          max-width: 1600px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .text-gold {
          color: var(--gold);
        }

        /* Hero Section */
        .gallery-hero {
          position: relative;
          height: 50vh;
          min-height: 400px;
          background: linear-gradient(135deg, var(--dark), var(--dark-gray));
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          overflow: hidden;
        }

        .gallery-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background: url('https://images.pexels.com/photos/2567327/pexels-photo-2567327.jpeg') center/cover;
          opacity: 0.15;
          animation: zoomBg 30s ease infinite;
        }

        @keyframes zoomBg {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.08); }
        }

        .gallery-hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.7));
        }

        .gallery-hero-content {
          position: relative;
          z-index: 1;
          color: var(--white);
          padding: 0 24px;
        }

        .gallery-hero-content h1 {
          font-size: 3.5rem;
          font-weight: 700;
          margin-bottom: 16px;
        }

        .gallery-hero-content p {
          font-size: 1.125rem;
          opacity: 0.9;
          margin-bottom: 32px;
        }

        .gallery-hero-stats {
          display: flex;
          justify-content: center;
          gap: 24px;
          flex-wrap: wrap;
        }

        .gallery-hero-stats span {
          font-size: 13px;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 18px;
          background: rgba(255,255,255,0.1);
          border-radius: 40px;
          backdrop-filter: blur(10px);
        }

        .gallery-hero-stats i {
          color: var(--gold);
        }

        .hero-scroll-hint {
          position: absolute;
          bottom: 30px;
          left: 50%;
          transform: translateX(-50%);
          color: var(--white);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          font-size: 11px;
          opacity: 0.7;
          animation: bounce 2s infinite;
          z-index: 2;
        }

        @keyframes bounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(8px); }
        }

        /* Masonry Gallery - Desktop 4 colonnes */
        .gallery-section {
          padding: 50px 0 80px;
          background: var(--light-gray);
        }

        .masonry-grid {
          column-count: 4;
          column-gap: 20px;
        }

        .masonry-item {
          position: relative;
          break-inside: avoid;
          margin-bottom: 20px;
          border-radius: 16px;
          overflow: hidden;
          cursor: pointer;
          background: #e0e0e0;
          transition: all 0.3s ease;
        }

        .masonry-item.loading {
          min-height: 180px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .masonry-item-loader {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--light-gray);
          z-index: 1;
        }

        .masonry-item-loader i {
          font-size: 28px;
          color: var(--gold);
        }

        .masonry-item img {
          width: 100%;
          height: auto;
          display: block;
          transition: transform 0.4s ease;
        }

        .masonry-item:hover img {
          transform: scale(1.02);
        }

        /* Tailles variables qui s'adaptent automatiquement */
        .masonry-item.small img {
          min-height: 180px;
        }

        .masonry-item.medium img {
          min-height: 260px;
        }

        .masonry-item.large img {
          min-height: 340px;
        }

        .masonry-item-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 50%, transparent 100%);
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          padding: 14px;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .masonry-item:hover .masonry-item-overlay {
          opacity: 1;
        }

        .masonry-item-info h3 {
          color: var(--white);
          font-size: 0.95rem;
          margin-bottom: 4px;
          font-weight: 600;
        }

        .masonry-item-info p {
          color: rgba(255,255,255,0.8);
          font-size: 10px;
        }

        .masonry-item-info i {
          margin-right: 4px;
          font-size: 9px;
        }

        .masonry-item-stats {
          display: flex;
          gap: 10px;
        }

        .masonry-item-stats span {
          color: var(--white);
          font-size: 11px;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .masonry-item-stats i.fa-heart {
          color: var(--red);
        }

        /* Lightbox */
        .lightbox {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.95);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          backdrop-filter: blur(20px);
        }

        .lightbox-close {
          position: absolute;
          top: 20px;
          right: 20px;
          width: 44px;
          height: 44px;
          background: rgba(255,255,255,0.1);
          border: none;
          border-radius: 50%;
          color: var(--white);
          font-size: 20px;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1001;
        }

        .lightbox-close:hover {
          background: var(--gold);
          transform: rotate(90deg);
        }

        .lightbox-nav {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 48px;
          height: 48px;
          background: rgba(255,255,255,0.1);
          border: none;
          border-radius: 50%;
          color: var(--white);
          font-size: 18px;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1001;
        }

        .lightbox-prev { left: 20px; }
        .lightbox-next { right: 20px; }

        .lightbox-nav:hover {
          background: var(--gold);
        }

        .lightbox-content {
          display: flex;
          gap: 24px;
          max-width: 1200px;
          width: 90vw;
          max-height: 85vh;
          background: var(--dark-gray);
          border-radius: 20px;
          overflow: hidden;
        }

        .lightbox-image {
          flex: 1.4;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #000;
        }

        .lightbox-image img {
          width: 100%;
          height: auto;
          max-height: 85vh;
          object-fit: contain;
        }

        .lightbox-details {
          flex: 1;
          padding: 24px;
          color: var(--white);
          display: flex;
          flex-direction: column;
          overflow-y: auto;
          max-height: 85vh;
        }

        .lightbox-details::-webkit-scrollbar {
          width: 4px;
        }

        .lightbox-details::-webkit-scrollbar-track {
          background: rgba(255,255,255,0.1);
          border-radius: 4px;
        }

        .lightbox-details::-webkit-scrollbar-thumb {
          background: var(--gold);
          border-radius: 4px;
        }

        .lightbox-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 16px;
          flex-wrap: wrap;
          gap: 16px;
        }

        .lightbox-header h2 {
          font-size: 1.4rem;
          margin-bottom: 6px;
        }

        .lightbox-location {
          color: var(--gold);
          font-size: 12px;
        }

        .lightbox-location i {
          margin-right: 6px;
        }

        .lightbox-actions {
          display: flex;
          gap: 10px;
        }

        .action-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 14px;
          border: none;
          border-radius: 40px;
          cursor: pointer;
          font-size: 13px;
          font-weight: 500;
          transition: all 0.3s ease;
        }

        .like-btn {
          background: rgba(231, 76, 60, 0.2);
          color: var(--red);
        }

        .like-btn:hover {
          background: var(--red);
          color: white;
        }

        .dislike-btn {
          background: rgba(255,255,255,0.1);
          color: var(--white);
        }

        .dislike-btn:hover {
          background: rgba(255,255,255,0.2);
        }

        .lightbox-description {
          color: rgba(255,255,255,0.8);
          font-size: 13px;
          line-height: 1.6;
          margin-bottom: 20px;
          padding-bottom: 16px;
          border-bottom: 1px solid rgba(255,255,255,0.1);
        }

        .lightbox-comments {
          flex: 1;
        }

        .lightbox-comments h3 {
          font-size: 0.95rem;
          margin-bottom: 14px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .add-comment {
          margin-bottom: 18px;
        }

        .add-comment textarea {
          width: 100%;
          padding: 10px;
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 10px;
          color: var(--white);
          font-family: inherit;
          font-size: 12px;
          resize: vertical;
          margin-bottom: 8px;
        }

        .add-comment textarea:focus {
          outline: none;
          border-color: var(--gold);
        }

        .add-comment textarea::placeholder {
          color: rgba(255,255,255,0.5);
        }

        .send-comment {
          padding: 8px 18px;
          background: var(--gold);
          border: none;
          border-radius: 40px;
          color: var(--white);
          font-weight: 600;
          font-size: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .send-comment:hover:not(:disabled) {
          background: var(--gold-dark);
          transform: translateY(-2px);
        }

        .send-comment:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .comments-list {
          max-height: 280px;
          overflow-y: auto;
        }

        .comments-list::-webkit-scrollbar {
          width: 4px;
        }

        .no-comments {
          text-align: center;
          padding: 30px;
          color: rgba(255,255,255,0.5);
        }

        .no-comments i {
          font-size: 36px;
          margin-bottom: 10px;
        }

        .no-comments p {
          font-size: 12px;
        }

        .comment-item {
          display: flex;
          gap: 10px;
          margin-bottom: 14px;
          padding: 10px;
          background: rgba(255,255,255,0.05);
          border-radius: 10px;
        }

        .comment-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          object-fit: cover;
        }

        .comment-content {
          flex: 1;
        }

        .comment-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 4px;
          flex-wrap: wrap;
          gap: 6px;
        }

        .comment-header strong {
          font-size: 12px;
        }

        .comment-date {
          font-size: 9px;
          color: rgba(255,255,255,0.5);
        }

        .comment-content p {
          font-size: 11px;
          line-height: 1.4;
          color: rgba(255,255,255,0.8);
        }

        .lightbox-counter {
          position: absolute;
          bottom: 16px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(0,0,0,0.6);
          padding: 5px 12px;
          border-radius: 40px;
          font-size: 10px;
          color: var(--white);
          z-index: 1001;
        }

        /* Responsive - Tablet (3 colonnes) */
        @media (max-width: 1024px) {
          .masonry-grid {
            column-count: 3;
            column-gap: 18px;
          }
          .gallery-hero-content h1 {
            font-size: 2.5rem;
          }
        }

        /* Responsive - Mobile (2 colonnes avec tailles conservées) */
        @media (max-width: 768px) {
          .masonry-grid {
            column-count: 2;
            column-gap: 14px;
          }
          .masonry-item {
            margin-bottom: 14px;
          }
          .masonry-item.small img {
            min-height: 140px;
          }
          .masonry-item.medium img {
            min-height: 200px;
          }
          .masonry-item.large img {
            min-height: 260px;
          }
          .gallery-hero {
            min-height: 350px;
          }
          .gallery-hero-content h1 {
            font-size: 2rem;
          }
          .gallery-hero-content p {
            font-size: 1rem;
          }
          .gallery-hero-stats span {
            font-size: 10px;
            padding: 5px 12px;
          }
          .lightbox-content {
            flex-direction: column;
            width: 95vw;
            max-height: 90vh;
          }
          .lightbox-image img {
            max-height: 35vh;
          }
          .lightbox-details {
            max-height: 50vh;
            padding: 16px;
          }
          .lightbox-header h2 {
            font-size: 1.2rem;
          }
          .lightbox-nav {
            width: 36px;
            height: 36px;
            font-size: 14px;
          }
          .lightbox-prev { left: 10px; }
          .lightbox-next { right: 10px; }
          .lightbox-close {
            top: 10px;
            right: 10px;
            width: 36px;
            height: 36px;
          }
        }

        /* Responsive - Petit mobile (1 colonne) */
        @media (max-width: 480px) {
          .masonry-grid {
            column-count: 1;
            column-gap: 0;
          }
          .masonry-item {
            margin-bottom: 16px;
          }
          .masonry-item.small img,
          .masonry-item.medium img,
          .masonry-item.large img {
            min-height: auto;
          }
          .gallery-hero-content h1 {
            font-size: 1.5rem;
          }
          .hero-scroll-hint {
            bottom: 15px;
          }
          .lightbox-header {
            flex-direction: column;
          }
          .lightbox-actions {
            width: 100%;
            justify-content: center;
          }
          .lightbox-header h2 {
            text-align: center;
          }
          .lightbox-location {
            text-align: center;
            display: block;
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