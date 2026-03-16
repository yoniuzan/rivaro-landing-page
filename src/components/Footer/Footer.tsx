import React, { useState } from 'react';
import { Typography, Flex, Grid, Modal } from '@components/base';
import { CONTACT_EMAIL, SOCIAL_LINKS } from '@constants/config';
import { AccessibilityStatement } from '@components/AccessibilityStatement';
import { PrivacyPolicy } from '@components/PrivacyPolicy';
import { TermsOfUse } from '@components/TermsOfUse';
import styles from './Footer.module.css';

export interface FooterProps {
  className?: string;
}

export const Footer: React.FC<FooterProps> = ({ className = '' }) => {
  const [showAccessibility, setShowAccessibility] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoogleMaps = () => {
    window.open('https://maps.google.com/?q=נעמי שמר 7, בת ים', '_blank');
  };

  return (
    <footer className={`${styles.footer} ${className}`} role="contentinfo" aria-label="Site footer">
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
              חליפות וביגוד גברים יוקרתי
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
                aria-label="Open address in Google Maps"
              >
                <Flex direction="row" gap={12} align="center">
                  <span className={styles.icon}>📍</span>
                  <Typography variant="body2" className={styles.contactText}>
                    נעמי שמר 7, בת ים (פארק הים)
                  </Typography>
                </Flex>
              </button>

              <a href="tel:+972526628404" className={styles.contactLink} aria-label="Call phone number">
                <Flex direction="row" gap={12} align="center">
                  <span className={styles.icon}>📞</span>
                  <Typography variant="body2" className={styles.contactText}>
                    052-6628404
                  </Typography>
                </Flex>
              </a>

              <a href={`mailto:${CONTACT_EMAIL}`} className={styles.contactLink} aria-label="Send email">
                <Flex direction="row" gap={12} align="center">
                  <span className={styles.icon}>✉️</span>
                  <Typography variant="body2" className={styles.contactText}>
                    {CONTACT_EMAIL}
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
            
            <Flex direction="row" gap={16} className={styles.socialLinks}>
              <a 
                href={SOCIAL_LINKS.instagram}
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="Instagram"
              >
                <svg className={styles.socialIcon} viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a 
                href={SOCIAL_LINKS.facebook}
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="Facebook"
              >
                <svg className={styles.socialIcon} viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a 
                href={SOCIAL_LINKS.tiktok}
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="TikTok"
              >
                <svg className={styles.socialIcon} viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </a>
            </Flex>

            <button 
                onClick={handleBackToTop}
                className={styles.backToTop}
                aria-label="Back to top of page"
              >
                <Typography variant="body2" className={styles.backToTopText}>
                  חזרה למעלה ↑
                </Typography>
              </button>
          </Flex>
        </Grid>

        {/* Legal Links */}
        <div className={styles.legalLinks}>
          <Flex direction="row" gap={24} justify="center" align="center" className={styles.legalLinksRow}>
            <button 
              onClick={() => setShowAccessibility(true)}
              className={styles.legalLink}
              aria-label="Open accessibility statement"
            >
              <Typography variant="body2" className={styles.legalLinkText}>
                הצהרת נגישות
              </Typography>
            </button>
            <span className={styles.separator}>|</span>
            <button 
              onClick={() => setShowPrivacy(true)}
              className={styles.legalLink}
              aria-label="Open privacy policy"
            >
              <Typography variant="body2" className={styles.legalLinkText}>
                מדיניות פרטיות
              </Typography>
            </button>
            <span className={styles.separator}>|</span>
            <button 
              onClick={() => setShowTerms(true)}
              className={styles.legalLink}
              aria-label="Open terms of use"
            >
              <Typography variant="body2" className={styles.legalLinkText}>
                תקנון ותנאי שימוש
              </Typography>
            </button>
          </Flex>
        </div>

        {/* Copyright */}
        <div className={styles.copyright}>
          <Typography variant="body2" align="center" className={styles.copyrightText}>
            © 2026 RIVARO. All rights reserved.
          </Typography>
        </div>
      </div>

      {/* Modals */}
      <Modal isOpen={showAccessibility} onClose={() => setShowAccessibility(false)}>
        <AccessibilityStatement />
      </Modal>

      <Modal isOpen={showPrivacy} onClose={() => setShowPrivacy(false)}>
        <PrivacyPolicy />
      </Modal>

      <Modal isOpen={showTerms} onClose={() => setShowTerms(false)}>
        <TermsOfUse />
      </Modal>
    </footer>
  );
};
