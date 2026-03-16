import React from 'react';
import { Typography, Flex, Accordion } from '@components/base';
import styles from './FaqSection.module.css';

export interface FaqSectionProps {
  className?: string;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ className = '' }) => {
  const faqItems = [
    {
      id: 'faq-1',
      title: 'מהם שעות הפעילות של הבוטיק?',
      content: 'הבוטיק פתוח בימים א\'-ה\' בין השעות 10:00-19:00, ובימי שישי בין השעות 09:00-14:00. מומלץ לתאם פגישה מראש כדי להבטיח שירות אישי ומקצועי.',
    },
    {
      id: 'faq-2',
      title: 'איזה סוגי ביגוד אתם מציעים?',
      content: 'אנו מתמחים בחליפות גברים יוקרתיות, חולצות מכופתרות, מכנסיים אלגנטיים, טוקסידו לאירועים, ומגוון אביזרים כגון עניבות, חגורות וכפתורי שרוול. כל הפריטים נבחרים בקפידה ממותגים מובילים.',
    },
    {
      id: 'faq-3',
      title: 'איך עובד תהליך ההתאמה האישית?',
      content: 'בפגישת הייעוץ הראשונה נקח מידות מדויקות ונכיר את הסגנון האישי שלכם. לאחר מכן נבחר יחד את החליפה המתאימה מהקולקציה שלנו ונבצע התאמות מדויקות לפי המידות. התהליך כולל מדידות חוזרות עד לתוצאה המושלמת.',
    },
    {
      id: 'faq-4',
      title: 'כמה זמן לוקח תהליך ההתאמה?',
      content: 'תהליך ההתאמה האישית לוקח בדרך כלל בין 2-3 שבועות, תלוי במורכבות ההתאמות הנדרשות. במקרים דחופים (כגון חתונות) אנו מציעים שירות מהיר תמורת תוספת תשלום.',
    },
    {
      id: 'faq-5',
      title: 'האם יש שירות לאחר הרכישה?',
      content: 'כן! אנו מציעים שירות התאמות ותיקונים קלים ללא עלות במשך 60 יום מיום הרכישה. בנוסף, אנו מספקים ייעוץ לטיפול ושמירה על הבגדים לאורך זמן.',
    },
  ];

  return (
    <section id="faq" className={`${styles.faqSection} ${className}`} aria-label="Frequently asked questions">
      <div className={styles.container}>
        <Flex direction="column" gap={48} align="center">
          <Flex direction="column" gap={12} align="center">
            <Typography 
              variant="h2" 
              color="text-primary"
              weight="light"
              align="center"
              className={styles.heading}
            >
              שאלות נפוצות
            </Typography>
            <Typography 
              variant="body1" 
              color="text-secondary"
              align="center"
              className={styles.subtext}
            >
              מענה לשאלות הנפוצות ביותר
            </Typography>
          </Flex>

          <div className={styles.accordionWrapper}>
            <Accordion 
              items={faqItems}
              className={styles.accordion}
            />
          </div>
        </Flex>
      </div>
    </section>
  );
};
