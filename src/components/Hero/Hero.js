import React from 'react';
import backgroundHero from '../../assets/backgoundhero.jpg'; // Adjust the path as necessary

const HeroSection = () => {
  const styles = {
    hero: {
      position: 'relative',
      minHeight: '100vh',
      color: 'white',
    },
    background: {
      position: 'absolute',
      inset: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    backgroundImage: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      mixBlendMode: 'overlay',
    },
    container: {
      position: 'relative',
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '96px 24px',
    },
    infoBar: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '24px',
      marginBottom: '64px',
      opacity: '0.9',
    },
    infoItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    },
    contentArea: {
      maxWidth: '640px',
    },
    heading: {
      fontSize: '60px',
      fontWeight: 'bold',
      marginBottom: '24px',
      lineHeight: 1.1,
    },
    description: {
      fontSize: '20px',
      marginBottom: '32px',
      opacity: '0.9',
      lineHeight: 1.6,
    },
    buttonGroup: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '16px',
    },
    primaryButton: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '12px 32px',
      backgroundColor: 'white',
      color: 'black',
      border: 'none',
      borderRadius: '8px',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'background-color 0.2s',
    },
    secondaryButton: {
      padding: '12px 32px',
      backgroundColor: 'transparent',
      color: 'white',
      border: '2px solid white',
      borderRadius: '8px',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'background-color 0.2s',
    },
  };

  return (
    <div style={styles.hero} id='about'>
      <div style={styles.background}>
        <img 
          src={backgroundHero}
          alt="Restaurant ambiance" 
          style={styles.backgroundImage}
        />
      </div>

      <div style={styles.container}>
        <div style={styles.infoBar}>
          <div style={styles.infoItem}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 6 12 12 16 14"/>
            </svg>
            <span>Open 11am - 10pm</span>
          </div>
          <div style={styles.infoItem}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            <span>123 Culinary Street</span>
          </div>
          <div style={styles.infoItem}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
            <span>(555) 123-4567</span>
          </div>
        </div>

        <div style={styles.contentArea}>
          <h1 style={styles.heading}>
            Experience Fine Dining at Its Best
          </h1>
          <p style={styles.description}>
            Indulge in a culinary journey where traditional flavors meet modern creativity. Our award-winning chefs craft unforgettable dining experiences using the finest local ingredients.
          </p>
          
          <div style={styles.buttonGroup}>
            <a 
              style={styles.primaryButton}
              onMouseOver={(e) => e.target.style.backgroundColor = '#f0f0f0'}
              onMouseOut={(e) => e.target.style.backgroundColor = 'white'}
              href='#reserve'
            >
              Reserve a Table
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </a>
            <a 
              style={styles.secondaryButton}
              onMouseOver={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'}
              onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
              href="#menu"
            >
              View Menu
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
