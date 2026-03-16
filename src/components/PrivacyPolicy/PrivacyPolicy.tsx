import React from 'react';
import { Typography, Flex } from '@components/base';
import { CONTACT_EMAIL } from '@constants/config';
import styles from './PrivacyPolicy.module.css';

export interface PrivacyPolicyProps {
  className?: string;
}

export const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ className = '' }) => {
  return (
    <div className={`${styles.container} ${className}`}>
      <div className={styles.content}>
        <Flex direction="column" gap={24}>
          <div className={styles.header}>
            <Typography variant="h2" weight="light" className={styles.title}>
              מדיניות פרטיות
            </Typography>
          </div>

          <Flex direction="column" gap={16} className={styles.section}>
            <Typography variant="h4" weight="normal" className={styles.sectionTitle}>
              כללי
            </Typography>
            <Typography variant="body1" className={styles.text}>
              RIVARO מכבדת את פרטיות המשתמשים באתר ומחויבת להגן על המידע האישי שלכם. מדיניות פרטיות זו מסבירה כיצד אנו אוספים, משתמשים ומגנים על המידע האישי שלכם.
            </Typography>
          </Flex>

          <Flex direction="column" gap={16} className={styles.section}>
            <Typography variant="h4" weight="normal" className={styles.sectionTitle}>
              איסוף מידע
            </Typography>
            <Typography variant="body1" className={styles.text}>
              אנו עשויים לאסוף מידע אישי כגון שם, כתובת דוא"ל, מספר טלפון וכתובת כאשר אתם:
            </Typography>
            <ul className={styles.list}>
              <li>
                <Typography variant="body1" className={styles.text}>
                  ממלאים טופס יצירת קשר או קביעת פגישה
                </Typography>
              </li>
              <li>
                <Typography variant="body1" className={styles.text}>
                  נרשמים לניוזלטר שלנו
                </Typography>
              </li>
              <li>
                <Typography variant="body1" className={styles.text}>
                  משתמשים בשירותים שלנו
                </Typography>
              </li>
            </ul>
          </Flex>

          <Flex direction="column" gap={16} className={styles.section}>
            <Typography variant="h4" weight="normal" className={styles.sectionTitle}>
              שימוש במידע
            </Typography>
            <Typography variant="body1" className={styles.text}>
              המידע שנאסף משמש למטרות הבאות:
            </Typography>
            <ul className={styles.list}>
              <li>
                <Typography variant="body1" className={styles.text}>
                  מתן שירות ותמיכה ללקוחות
                </Typography>
              </li>
              <li>
                <Typography variant="body1" className={styles.text}>
                  שיפור חווית המשתמש באתר
                </Typography>
              </li>
              <li>
                <Typography variant="body1" className={styles.text}>
                  שליחת עדכונים והצעות מיוחדות (בהסכמתכם)
                </Typography>
              </li>
            </ul>
          </Flex>

          <Flex direction="column" gap={16} className={styles.section}>
            <Typography variant="h4" weight="normal" className={styles.sectionTitle}>
              אבטחת מידע
            </Typography>
            <Typography variant="body1" className={styles.text}>
              אנו נוקטים באמצעי אבטחה סבירים להגנה על המידע האישי שלכם מפני גישה, שימוש או חשיפה לא מורשים.
            </Typography>
          </Flex>

          <Flex direction="column" gap={16} className={styles.section}>
            <Typography variant="h4" weight="normal" className={styles.sectionTitle}>
              זכויותיכם
            </Typography>
            <Typography variant="body1" className={styles.text}>
              יש לכם זכות לעיין, לתקן או למחוק את המידע האישי שלכם. לפרטים נוספים, צרו קשר בכתובת: {CONTACT_EMAIL}
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
