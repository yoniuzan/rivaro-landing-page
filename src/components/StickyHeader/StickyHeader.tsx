import React, { useState, useEffect } from 'react';
import { Button, Flex } from '@components/base';
import { CALMARK_URL } from '@constants/config';
import styles from './StickyHeader.module.css';

export interface StickyHeaderProps {
  className?: string;
}

export const StickyHeader: React.FC<StickyHeaderProps> = ({ className = '' }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsVisible(scrollPosition > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleBookNow = () => {
    window.open(CALMARK_URL, '_blank', 'noopener,noreferrer');
  };

  const handleLogoClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className={`${styles.stickyHeader} ${isVisible ? styles.visible : ''} ${className}`} role="banner" aria-label="Site header">
      <div className={styles.container}>
        <Flex direction="row" justify="between" align="center" className={styles.content}>
          <button 
            onClick={handleLogoClick}
            className={styles.logoButton}
            aria-label="Return to top"
          >
            <img 
              src="/assets/RIVARO-LOGO-blue.png"
              alt="RIVARO Logo"
              className={styles.logo}
            />
          </button>

          <Button 
            variant="primary" 
            size="md"
            onClick={handleBookNow}
            className={styles.bookButton}
            aria-label="Book appointment"
          >
            קביעת פגישה
          </Button>
        </Flex>
      </div>
    </header>
  );
};
