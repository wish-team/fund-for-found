// utils/i18n/store/languageStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { languages, fallbackLng } from "../config/settings";
import { languageFonts, LanguageCode } from "../config/fonts";

interface LanguageState {
  currentLanguage: LanguageCode;
  fontFamily: string;
  setLanguage: (lang: LanguageCode) => void;
  direction: () => "ltr" | "rtl";
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set, get) => ({
      currentLanguage: fallbackLng as LanguageCode,
      fontFamily: languageFonts[fallbackLng as LanguageCode].family,
      setLanguage: (lang: LanguageCode) => {
        if (languages.includes(lang)) {
          // Update store state
          set({
            currentLanguage: lang,
            fontFamily: languageFonts[lang].family,
          });
        }
      },
      direction: () =>
        ["ar", "fa"].includes(get().currentLanguage) ? "rtl" : "ltr",
    }),
    {
      name: "language-storage",
    }
  )
);
