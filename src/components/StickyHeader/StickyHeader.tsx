import React, { useState, useEffect } from 'react';
import { Typography, Button, Flex } from '@components/base';
import styles from './StickyHeader.module.css';

export interface StickyHeaderProps {
  className?: string;
}

export const StickyHeader: React.FC<StickyHeaderProps> = ({ className = '' }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsVisible(scrollPosition > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleBookNow = () => {
    const bookingSection = document.getElementById('booking');
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header className={`${styles.stickyHeader} ${isVisible ? styles.visible : ''} ${className}`}>
      <div className={styles.container}>
        <Flex direction="row" justify="between" align="center" className={styles.content}>
          <Typography 
            variant="h5" 
            weight="light"
            className={styles.logo}
          >
            RIVARO
          </Typography>

          <Button 
            variant="primary" 
            size="md"
            onClick={handleBookNow}
            className={styles.bookButton}
          >
            קביעת פגישה
          </Button>
        </Flex>
      </div>
    </header>
  );
};
