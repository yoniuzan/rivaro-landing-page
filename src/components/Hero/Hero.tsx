import React from 'react';
import { Typography, Button, Flex, Grid } from '@components/base';
import styles from './Hero.module.css';

export interface HeroProps {
  className?: string;
}

export const Hero: React.FC<HeroProps> = ({ className = '' }) => {
  const handleBookAppointment = () => {
    const bookingSection = document.getElementById('booking');
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleViewCollection = () => {
    const collectionSection = document.getElementById('collection');
    if (collectionSection) {
      collectionSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className={`${styles.hero} ${className}`}>
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
                variant="h3" 
                color="text-primary"
                weight="normal"
                className={styles.subheadline}
              >
                חייטות אישית. יוקרה בלתי מתפשרת.
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

          {/* Right Column - Image */}
          <div className={styles.imageWrapper}>
            <div className={styles.imagePlaceholder}>
              <Typography variant="body2" color="text-secondary" align="center">
                Hero Image
              </Typography>
            </div>
          </div>
        </Grid>
      </div>
    </section>
  );
};
