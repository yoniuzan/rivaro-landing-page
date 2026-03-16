/**
 * RIVARO - Global Configuration Constants
 * Centralized configuration for brand identity, contact info, and integrations
 */

// Contact Information
export const CONTACT_EMAIL = 'Info@rivaro.com';
export const CONTACT_PHONE = '050-123-4567'; // TODO: Update with actual phone number
export const CONTACT_ADDRESS = 'נעמי שמר 7, בת ים - פארק הים';

// Brand Identity
export const BRAND_NAME = 'RIVARO';
export const BRAND_DOMAIN = 'www.rivaro.co.il';

// Social Media Links
export const SOCIAL_LINKS = {
  instagram: 'https://www.instagram.com/rivaro_man/',
  facebook: 'https://www.facebook.com/share/1Gr5Xu4YHh/?mibextid=wwXIfr',
  tiktok: 'https://www.tiktok.com/@rivaro_man?_r=1&_t=ZS-94jZN2qUzif',
} as const;

// Booking Integration
export const CALMARK_ID = 'OcljK';
export const CALMARK_URL = `https://calmark.io/p/${CALMARK_ID}`;

// SEO & Metadata
export const SEO = {
  title: 'RIVARO | אופנת גברים עילית, חליפות יוקרה ופרימיום',
  description: 'ריבארו - בוטיק אופנת גברים יוקרתי. חליפות פרימיום, ביגוד עילית, התאמה אישית מושלמת ובדים איכותיים. בקרו בסטודיו שלנו בבת ים. RIVARO - Premium menswear boutique with luxury suits, expert fitting, and high-end styling.',
  keywords: 'אופנת גברים, חליפות יוקרה, ביגוד פרימיום, חליפות חתן, התאמה אישית, בדים איטלקיים, ריבארו, בת ים',
} as const;
