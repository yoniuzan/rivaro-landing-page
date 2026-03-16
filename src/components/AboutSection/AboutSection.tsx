import React from 'react';
import { Typography, Flex } from '@components/base';
import styles from './AboutSection.module.css';

export interface AboutSectionProps {
  className?: string;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ className = '' }) => {
  return (
    <section id="about" className={`${styles.aboutSection} ${className}`} aria-label="About RIVARO">
      <div className={styles.container}>
        <div className={styles.splitLayout}>
          {/* Left Side - Image */}
          <div className={styles.imageColumn}>
            <div className={styles.imagePlaceholder} role="img" aria-label="בוטיק ריבארו - אופנת גברים יוקרתית ומקצועית">
              <Typography variant="body2" color="text-secondary" align="center">
                Boutique Interior Image
              </Typography>
            </div>
          </div>

          {/* Right Side - Content */}
          <div className={styles.contentColumn}>
            <Flex direction="column" gap={24} className={styles.content}>
              <Typography 
                variant="h2" 
                color="text-primary"
                weight="light"
                className={styles.heading}
              >
                הבוטיק שלנו
              </Typography>
              
              <Typography 
                variant="body1" 
                color="text-secondary"
                className={styles.description}
              >
                RIVARO הוא בוטיק אופנת גברים יוקרתי המתמחה בחליפות וביגוד פרימיום. אנו מציעים קולקציה מובחרת של חליפות, חולצות ואביזרים מהמותגים המובילים בעולם, לצד שירות התאמה אישי ברמה הגבוהה ביותר.
              </Typography>

              <Typography 
                variant="body1" 
                color="text-secondary"
                className={styles.description}
              >
                כל פריט נבחר בקפידה כדי להעניק לגבר המודרני מראה מושלם, נוחות מקסימלית ובטחון עצמי. אנו מאמינים שחליפה איכותית היא לא רק בגד - היא הצהרת סטייל.
              </Typography>
            </Flex>
          </div>
        </div>
      </div>
    </section>
  );
};
