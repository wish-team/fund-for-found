// utils/i18n/config/fonts.ts
export const languageFonts = {
  en: {
    name: 'Inter',
    import: 'Inter:ital,wght@0,100..900;1,100..900',
    family: "'Inter', sans-serif"
  },
  fa: {
    name: 'Vazirmatn',
    import: 'Vazirmatn:wght@100..900',
    family: "'Vazirmatn', sans-serif"
  },
  ar: {
    name: 'Noto Kufi Arabic',
    import: 'Noto+Kufi+Arabic:wght@100..900',
    family: "'Noto Kufi Arabic', sans-serif"
  },
  de: {
    name: 'Inter',
    import: 'Inter:ital,wght@0,100..900;1,100..900',
    family: "'Inter', sans-serif"
  },
  fr: {
    name: 'Inter',
    import: 'Inter:ital,wght@0,100..900;1,100..900',
    family: "'Inter', sans-serif"
  }
} as const;

export type LanguageCode = keyof typeof languageFonts;