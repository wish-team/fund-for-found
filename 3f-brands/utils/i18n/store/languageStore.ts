import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { languages, fallbackLng } from '../config/settings';

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
        }
      },
      direction: () => ['ar', 'fa'].includes(get().currentLanguage) ? 'rtl' : 'ltr',
    }),
    {
      name: 'language-storage',
    }
  )
);