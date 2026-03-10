import React, { useState } from 'react';
import { Typography, Flex, LoadingSpinner } from '@components/base';
import styles from './BookingSection.module.css';

export interface BookingSectionProps {
  className?: string;
}

export const BookingSection: React.FC<BookingSectionProps> = ({ className = '' }) => {
  const [isLoading, setIsLoading] = useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="booking" className={`${styles.bookingSection} ${className}`}>
      <div className={styles.container}>
        <Flex direction="column" gap={24} align="center" className={styles.content}>
          <Flex direction="column" gap={12} align="center">
            <Typography 
              variant="h2" 
              color="text-primary"
              weight="light"
              align="center"
              className={styles.heading}
            >
              קביעת פגישת מדידה
            </Typography>
            
            <Typography 
              variant="body1" 
              color="text-secondary"
              align="center"
              className={styles.subtext}
            >
              בחרו את הזמן הנוח לכם לפגישה אישית בסטודיו שלנו. נחזור אליכם לאישור סופי.
            </Typography>
          </Flex>

          <div className={styles.widgetContainer}>
            {isLoading ? (
              <Flex direction="column" gap={16} align="center" justify="center" className={styles.loadingState}>
                <LoadingSpinner size="lg" />
                <Typography variant="body2" color="text-secondary">
                  טוען את לוח הזמנים...
                </Typography>
              </Flex>
            ) : (
              <div className={styles.calendlyPlaceholder}>
                <Flex direction="column" gap={16} align="center">
                  <Typography variant="h4" color="text-secondary" align="center">
                    📅
                  </Typography>
                  <Typography variant="body1" color="text-secondary" align="center">
                    Calendly Widget Placeholder
                  </Typography>
                  <Typography variant="body2" color="text-secondary" align="center" className={styles.instructions}>
                    To integrate Calendly:
                    <br />
                    1. Install: npm install react-calendly
                    <br />
                    2. Import: InlineWidget from 'react-calendly'
                    <br />
                    3. Replace this placeholder with the widget
                  </Typography>
                </Flex>
              </div>
            )}
          </div>
        </Flex>
      </div>
    </section>
  );
};
