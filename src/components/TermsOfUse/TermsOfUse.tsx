import React from 'react';
import { Typography, Flex } from '@components/base';
import { CONTACT_EMAIL } from '@constants/config';
import styles from './TermsOfUse.module.css';

export interface TermsOfUseProps {
  className?: string;
}

export const TermsOfUse: React.FC<TermsOfUseProps> = ({ className = '' }) => {
  return (
    <div className={`${styles.container} ${className}`}>
      <div className={styles.content}>
        <Flex direction="column" gap={24}>
          <div className={styles.header}>
            <Typography variant="h2" weight="light" className={styles.title}>
              תקנון ותנאי שימוש
            </Typography>
          </div>

          <Flex direction="column" gap={16} className={styles.section}>
            <Typography variant="h4" weight="normal" className={styles.sectionTitle}>
              כללי
            </Typography>
            <Typography variant="body1" className={styles.text}>
              ברוכים הבאים לאתר RIVARO. השימוש באתר זה כפוף לתנאים המפורטים להלן. המשך השימוש באתר מהווה הסכמה מצדכם לתנאים אלו.
            </Typography>
          </Flex>

          <Flex direction="column" gap={16} className={styles.section}>
            <Typography variant="h4" weight="normal" className={styles.sectionTitle}>
              שימוש באתר
            </Typography>
            <Typography variant="body1" className={styles.text}>
              האתר מיועד לשימוש אישי ולא מסחרי. אסור להעתיק, לשכפל או להפיץ תכנים מהאתר ללא אישור בכתב מראש מ-RIVARO.
            </Typography>
          </Flex>

          <Flex direction="column" gap={16} className={styles.section}>
            <Typography variant="h4" weight="normal" className={styles.sectionTitle}>
              קניין רוחני
            </Typography>
            <Typography variant="body1" className={styles.text}>
              כל התכנים באתר, לרבות טקסטים, תמונות, לוגו ועיצוב, הם קניינה הבלעדי של RIVARO ומוגנים בזכויות יוצרים.
            </Typography>
          </Flex>

          <Flex direction="column" gap={16} className={styles.section}>
            <Typography variant="h4" weight="normal" className={styles.sectionTitle}>
              הגבלת אחריות
            </Typography>
            <Typography variant="body1" className={styles.text}>
              RIVARO אינה אחראית לכל נזק ישיר או עקיף הנובע משימוש באתר או מאי-יכולת להשתמש בו. המידע באתר מוצג כפי שהוא, ללא אחריות מכל סוג.
            </Typography>
          </Flex>

          <Flex direction="column" gap={16} className={styles.section}>
            <Typography variant="h4" weight="normal" className={styles.sectionTitle}>
              שינויים בתקנון
            </Typography>
            <Typography variant="body1" className={styles.text}>
              RIVARO שומרת לעצמה את הזכות לעדכן תקנון זה מעת לעת. המשך השימוש באתר לאחר עדכון התקנון מהווה הסכמה לשינויים.
            </Typography>
          </Flex>

          <Flex direction="column" gap={16} className={styles.section}>
            <Typography variant="h4" weight="normal" className={styles.sectionTitle}>
              יצירת קשר
            </Typography>
            <Typography variant="body1" className={styles.text}>
              לשאלות או הבהרות בנוגע לתקנון זה, אנא צרו קשר:
            </Typography>
            <ul className={styles.list}>
              <li>
                <Typography variant="body1" className={styles.text}>
                  דוא"ל: {CONTACT_EMAIL}
                </Typography>
              </li>
              <li>
                <Typography variant="body1" className={styles.text}>
                  טלפון: 052-6628404
                </Typography>
              </li>
            </ul>
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
