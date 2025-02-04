// components/FontLoader.tsx
'use client';

import { useEffect } from 'react';
import { useLanguageStore } from '@/utils/i18n/store/languageStore';
import { languageFonts, type LanguageCode } from '@/utils/i18n/config/fonts';

export function FontLoader() {
  const { currentLanguage } = useLanguageStore();

  useEffect(() => {
    // Create a link element for Google Fonts
    const link = document.createElement('link');
    link.href = `https://fonts.googleapis.com/css2?family=${languageFonts[currentLanguage as LanguageCode].import}&display=swap`;
    link.rel = 'stylesheet';

    // Remove any existing font stylesheets
    document.head
      .querySelectorAll('link[href*="fonts.googleapis.com"]')
      .forEach(el => el.remove());

    // Add the new stylesheet
    document.head.appendChild(link);
  }, [currentLanguage]);

  return null;
}