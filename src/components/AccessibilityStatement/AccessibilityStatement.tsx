import React from 'react';
import { Typography, Flex } from '@components/base';
import { CONTACT_EMAIL } from '@constants/config';
import styles from './AccessibilityStatement.module.css';

export interface AccessibilityStatementProps {
  className?: string;
}

export const AccessibilityStatement: React.FC<AccessibilityStatementProps> = ({ className = '' }) => {
  return (
    <div className={`${styles.container} ${className}`}>
      <div className={styles.content}>
        <Flex direction="column" gap={24}>
          <div className={styles.header}>
            <Typography variant="h2" weight="light" className={styles.title}>
              הצהרת נגישות
            </Typography>
          </div>

          <Flex direction="column" gap={16} className={styles.section}>
            <Typography variant="h4" weight="normal" className={styles.sectionTitle}>
              מחויבות לנגישות
            </Typography>
            <Typography variant="body1" className={styles.text}>
              RIVARO מחויבת להנגשת האתר לאנשים עם מוגבלויות, ופועלת להנגשת האתר בהתאם לתקנות שוויון זכויות לאנשים עם מוגבלות (התאמות נגישות לשירות), התשע"ג-2013 ולתקן הישראלי (ת"י 5568) ברמת AA.
            </Typography>
          </Flex>

          <Flex direction="column" gap={16} className={styles.section}>
            <Typography variant="h4" weight="normal" className={styles.sectionTitle}>
              הנגשת האתר
            </Typography>
            <Typography variant="body1" className={styles.text}>
              האתר הונגש על ידי צוות הפיתוח של RIVARO, תוך שימוש בטכנולוגיות מתקדמות ועמידה בסטנדרטים הבינלאומיים. האתר כולל תפריט נגישות המאפשר התאמות אישיות כגון:
            </Typography>
            <ul className={styles.list}>
              <li>
                <Typography variant="body1" className={styles.text}>
                  שינוי גודל הטקסט
                </Typography>
              </li>
              <li>
                <Typography variant="body1" className={styles.text}>
                  ניגודיות גבוהה
                </Typography>
              </li>
              <li>
                <Typography variant="body1" className={styles.text}>
                  מצב גווני אפור
                </Typography>
              </li>
              <li>
                <Typography variant="body1" className={styles.text}>
                  הדגשת קישורים
                </Typography>
              </li>
              <li>
                <Typography variant="body1" className={styles.text}>
                  ניווט מקלדת מלא
                </Typography>
              </li>
            </ul>
          </Flex>

          <Flex direction="column" gap={16} className={styles.section}>
            <Typography variant="h4" weight="normal" className={styles.sectionTitle}>
              תאימות לדפדפנים וטכנולוגיות מסייעות
            </Typography>
            <Typography variant="body1" className={styles.text}>
              האתר תואם לדפדפנים הנפוצים: Chrome, Firefox, Safari, Edge, ולטכנולוגיות מסייעות כגון קוראי מסך NVDA ו-JAWS.
            </Typography>
          </Flex>

          <Flex direction="column" gap={16} className={styles.section}>
            <Typography variant="h4" weight="normal" className={styles.sectionTitle}>
              בעיות נגישות? נשמח לעזור
            </Typography>
            <Typography variant="body1" className={styles.text}>
              אם נתקלתם בבעיית נגישות באתר, אנא צרו קשר:
            </Typography>
            <ul className={styles.list}>
              <li>
                <Typography variant="body1" className={styles.text}>
                  טלפון: 052-6628404
                </Typography>
              </li>
              <li>
                <Typography variant="body1" className={styles.text}>
                  דוא"ל: {CONTACT_EMAIL}
                </Typography>
              </li>
              <li>
                <Typography variant="body1" className={styles.text}>
                  כתובת: נעמי שמר 7, בת ים (פארק הים)
                </Typography>
              </li>
            </ul>
            <Typography variant="body1" className={styles.text}>
              נשתדל לטפל בפנייתכם בהקדם האפשרי.
            </Typography>
          </Flex>

          <Flex direction="column" gap={16} className={styles.section}>
            <Typography variant="body2" className={styles.footer}>
              עודכן לאחרונה: מרץ 2026
            </Typography>
          </Flex>
        </Flex>
      </div>
    </div>
  );
};
