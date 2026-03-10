import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import heCommon from './he/common.json';
import enCommon from './en/common.json';

export const supportedLanguages = ['he', 'en'] as const;
export type SupportedLanguage = typeof supportedLanguages[number];
export const defaultLanguage: SupportedLanguage = 'he';

export const resources = {
  he: {
    common: heCommon,
  },
  en: {
    common: enCommon,
  },
} as const;

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: defaultLanguage,
    fallbackLng: 'en',
    defaultNS: 'common',
    ns: ['common'],
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

// Set document direction based on language
i18n.on('languageChanged', (lng: string) => {
  const dir = lng === 'he' ? 'rtl' : 'ltr';
  document.documentElement.dir = dir;
  document.documentElement.lang = lng;
});

// Set initial direction
const initialDir = (defaultLanguage as string) === 'he' ? 'rtl' : 'ltr';
document.documentElement.dir = initialDir;
document.documentElement.lang = defaultLanguage;

export default i18n;
