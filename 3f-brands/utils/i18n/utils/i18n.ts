// utils/i18n/utils/i18n.ts
"use client";

import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { getOptions } from "../config/settings";
import { LanguageCode } from "../config/fonts";
import enTranslations from "../locales/en/translation.json";

const i18nInstance = i18next.createInstance();

if (!i18nInstance.isInitialized) {
  i18nInstance
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      ...getOptions(),
      resources: {
        en: {
          translation: enTranslations,
        },
      } as Record<LanguageCode, { translation: typeof enTranslations }>,
      load: "languageOnly",
      fallbackLng: "en",
      preload: ["en"],
      react: {
        useSuspense: false,
      },
      interpolation: {
        escapeValue: false,
      },
      detection: {
        order: ["localStorage", "navigator"],
        caches: ["localStorage"],
      },
    });
}

export default i18nInstance;
