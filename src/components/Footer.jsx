import React from 'react';

const Footer = () => {
  const handleNewsletter = () => {
    const email = document.getElementById('newsletterEmail').value;
    if(email && email.includes('@')) {
      alert('✅ Merci pour votre inscription !');
    } else {
      alert('Veuillez entrer un email valide.');
    }
  };

  return (
    <footer className="footer" id="contact">
      <div style={{ maxWidth: '1300px', margin: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '40px' }}>
          <div>
            <h3 style={{ color: 'white', fontSize: '1.8rem' }}>
              ALGERIA <span style={{ color: 'var(--ocre)' }}>TRAVEL</span>
            </h3>
            <p>contact@algeriatravel.dz<br />+213 550 12 34 56</p>
            <div style={{ display: 'flex', gap: '15px', marginTop: '20px' }}>
              <a href="#"><i className="fab fa-facebook-f"></i></a>
              <a href="#"><i className="fab fa-instagram"></i></a>
              <a href="#"><i className="fab fa-twitter"></i></a>
            </div>
          </div>
          <div>
            <strong>Liens rapides</strong><br />
            <a href="#">Circuits Sahara</a><br />
            <a href="#">Côte Méditerranée</a><br />
            <a href="#">Assistance visa</a>
          </div>
          <div>
            <strong>Apps mobiles</strong><br />
            <i className="fab fa-apple"></i> App Store<br />
            <i className="fab fa-android"></i> Google Play
          </div>
          <div className="newsletter">
            <strong><i className="fas fa-envelope-open-text"></i> Newsletter</strong>
            <div className="newsletter-input">
              <input type="email" placeholder="Votre email" id="newsletterEmail" />
              <button onClick={handleNewsletter}>S'inscrire</button>
            </div>
          </div>
        </div>
        <hr style={{ margin: '40px 0 20px', borderColor: '#2a5a6e' }} />
        <p style={{ textAlign: 'center' }}>
          © 2026 Algeria Travel — Design inspiré du Sahara et de la Méditerranée
        </p>
      </div>
    </footer>
  );
};

export default Footer;