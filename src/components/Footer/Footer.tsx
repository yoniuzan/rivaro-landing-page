import React from 'react';
import { Typography, Flex, Grid } from '@components/base';
import styles from './Footer.module.css';

export interface FooterProps {
  className?: string;
}

export const Footer: React.FC<FooterProps> = ({ className = '' }) => {
  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoogleMaps = () => {
    window.open('https://maps.google.com/?q=נעמי שמר 7, בת ים', '_blank');
  };

  const handleInstagram = () => {
    window.open('https://instagram.com/rivaro.suits', '_blank');
  };

  const handleWhatsApp = () => {
    window.open('https://wa.me/972526628404', '_blank');
  };

  return (
    <footer className={`${styles.footer} ${className}`}>
      <div className={styles.container}>
        <Grid 
          columns={{ mobile: 1, tablet: 2, desktop: 3 }} 
          gap={48}
          className={styles.grid}
        >
          {/* Column 1 - Brand */}
          <Flex direction="column" gap={16} className={styles.brandColumn}>
            <Typography 
              variant="h3" 
              weight="light"
              className={styles.logo}
            >
              RIVARO
            </Typography>
            <Typography 
              variant="body1" 
              className={styles.tagline}
            >
              חליפות יוקרה וחייטות אישית
            </Typography>
          </Flex>

          {/* Column 2 - Contact */}
          <Flex direction="column" gap={20} className={styles.contactColumn}>
            <Typography 
              variant="h6" 
              weight="normal"
              className={styles.columnTitle}
            >
              יצירת קשר
            </Typography>
            
            <Flex direction="column" gap={12}>
              <button 
                onClick={handleGoogleMaps}
                className={styles.contactLink}
              >
                <Flex direction="row" gap={12} align="center">
                  <span className={styles.icon}>📍</span>
                  <Typography variant="body2" className={styles.contactText}>
                    נעמי שמר 7, בת ים (פארק הים)
                  </Typography>
                </Flex>
              </button>

              <a href="tel:+972526628404" className={styles.contactLink}>
                <Flex direction="row" gap={12} align="center">
                  <span className={styles.icon}>📞</span>
                  <Typography variant="body2" className={styles.contactText}>
                    052-6628404
                  </Typography>
                </Flex>
              </a>

              <a href="mailto:info@rivaro.co.il" className={styles.contactLink}>
                <Flex direction="row" gap={12} align="center">
                  <span className={styles.icon}>✉️</span>
                  <Typography variant="body2" className={styles.contactText}>
                    info@rivaro.co.il
                  </Typography>
                </Flex>
              </a>
            </Flex>
          </Flex>

          {/* Column 3 - Socials & Navigation */}
          <Flex direction="column" gap={20} className={styles.socialsColumn}>
            <Typography 
              variant="h6" 
              weight="normal"
              className={styles.columnTitle}
            >
              עקבו אחרינו
            </Typography>
            
            <Flex direction="column" gap={12}>
              <button 
                onClick={handleInstagram}
                className={styles.socialLink}
              >
                <Flex direction="row" gap={12} align="center">
                  <span className={styles.icon}>📷</span>
                  <Typography variant="body2" className={styles.contactText}>
                    Instagram
                  </Typography>
                </Flex>
              </button>

              <button 
                onClick={handleWhatsApp}
                className={styles.socialLink}
              >
                <Flex direction="row" gap={12} align="center">
                  <span className={styles.icon}>💬</span>
                  <Typography variant="body2" className={styles.contactText}>
                    WhatsApp
                  </Typography>
                </Flex>
              </button>

              <button 
                onClick={handleBackToTop}
                className={styles.backToTop}
              >
                <Typography variant="body2" className={styles.backToTopText}>
                  חזרה למעלה ↑
                </Typography>
              </button>
            </Flex>
          </Flex>
        </Grid>

        {/* Copyright */}
        <div className={styles.copyright}>
          <Typography variant="body2" align="center" className={styles.copyrightText}>
            © 2026 RIVARO. All rights reserved.
          </Typography>
        </div>
      </div>
    </footer>
  );
};
