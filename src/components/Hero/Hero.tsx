import React from 'react';
import { Typography, Button, Flex, Grid } from '@components/base';
import { CALMARK_URL } from '@constants/config';
import styles from './Hero.module.css';

export interface HeroProps {
  className?: string;
}

export const Hero: React.FC<HeroProps> = ({ className = '' }) => {
  const handleBookAppointment = () => {
    window.open(CALMARK_URL, '_blank', 'noopener,noreferrer');
  };

  const handleViewCollection = () => {
    const collectionSection = document.getElementById('collection');
    if (collectionSection) {
      collectionSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className={`${styles.hero} ${className}`} aria-label="Hero section">
      <div className={styles.container}>
        <Grid 
          columns={{ mobile: 1, tablet: 1, desktop: 2 }} 
          gap={48}
          className={styles.grid}
        >
          {/* Left Column - Content */}
          <Flex direction="column" gap={32} justify="center" className={styles.content}>
            <Flex direction="column" gap={20}>
              <Typography 
                variant="h1" 
                color="text-primary"
                weight="light"
                className={styles.heading}
              >
                RIVARO
              </Typography>
              
              <Typography 
                variant="h5" 
                color="text-primary"
                weight="normal"
                className={styles.subheadline}
              >
                אופנת גברים עילית. יוקרה בלתי מתפשרת.
              </Typography>
              
              <Typography 
                variant="body1" 
                color="text-secondary"
                className={styles.description}
              >
                קבעו פגישת מדידה אישית באולם התצוגה שלנו וגלו את קולקציית החליפות החדשה.
              </Typography>
            </Flex>

            <Flex direction="row" gap={16} className={styles.actions}>
              <Button 
                variant="primary" 
                size="lg"
                onClick={handleBookAppointment}
                className={styles.primaryCta}
              >
                תיאום פגישה אישית
              </Button>
              <Button 
                variant="secondary" 
                size="lg"
                onClick={handleViewCollection}
              >
                לצפייה בקולקציה
              </Button>
            </Flex>
          </Flex>

          {/* Right Column - Video */}
          <div className={styles.videoWrapper}>
            <div className={styles.videoOverlay} />
            <video
              className={styles.heroVideo}
              autoPlay
              muted
              loop
              playsInline
              aria-label="חליפות יוקרה של ריבארו - ביגוד גברים פרימיום והתאמה מושלמת"
            >
              <source src="/assets/hero-video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </Grid>
      </div>
    </section>
  );
};
