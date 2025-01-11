import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { languages, fallbackLng } from '../config/settings';
import i18next from 'i18next';

interface LanguageState {
  currentLanguage: string;
  setLanguage: (lang: string) => void;
  direction: () => 'ltr' | 'rtl';
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set, get) => ({
      currentLanguage: fallbackLng,
      setLanguage: (lang: string) => {
        if (languages.includes(lang)) {
          set({ currentLanguage: lang });
          // Force i18next to update immediately
          i18next.changeLanguage(lang);
        }
      },
      direction: () => ['ar', 'fa'].includes(get().currentLanguage) ? 'rtl' : 'ltr',
    }),
    {
      name: 'language-storage',
    }
  )
);