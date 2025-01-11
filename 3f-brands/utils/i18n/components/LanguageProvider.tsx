// utils/i18n/components/LanguageProvider.tsx
'use client';

import { useLanguageStore } from '../store/languageStore';
import { useTranslations } from '../hooks/useTranslations';
import { useEffect } from 'react';

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const { currentLanguage, direction, fontFamily } = useLanguageStore();
  const { isLoading } = useTranslations(currentLanguage);

  useEffect(() => {
    // Set CSS variable for font-family
    document.documentElement.style.setProperty('--font-family', fontFamily);
  }, [fontFamily]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div dir={direction()} className="font-sans">
      {children}
    </div>
  );
}