import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import { getOptions } from '../config/settings';
import LanguageDetector from 'i18next-browser-languagedetector';
import enTranslations from '../locales/en/translation.json';

if (!i18next.isInitialized) {
  i18next
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      ...getOptions(),
      resources: {
        en: {
          translation: enTranslations
        }
      },
      load: 'languageOnly',
      fallbackLng: 'en',
      preload: ['en'],
      react: {
        useSuspense: false
      },
      interpolation: {
        escapeValue: false
      },
      detection: {
        order: ['localStorage', 'navigator'],
        caches: ['localStorage']
      }
    });
}

export default i18next;