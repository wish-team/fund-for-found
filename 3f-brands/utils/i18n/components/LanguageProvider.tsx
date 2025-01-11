'use client';
import { useLanguageStore } from '../store/languageStore';
import { useTranslations } from '../hooks/useTranslations';

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const { currentLanguage, direction } = useLanguageStore();
  const { isLoading } = useTranslations(currentLanguage);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div dir={direction()}>
      {children}
    </div>
  );
}