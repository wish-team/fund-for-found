import { useQuery } from '@tanstack/react-query';
import i18next from 'i18next';
import { getOptions } from '../config/settings';

export const useTranslations = (lng: string) => {
  return useQuery({
    queryKey: ['translations', lng],
    queryFn: async () => {
      const translations = await import(`../locales/${lng}/translation.json`);
      
      // Remove existing resources before adding new ones to prevent stale data
      if (i18next.hasResourceBundle(lng, 'translation')) {
        i18next.removeResourceBundle(lng, 'translation');
      }
      
      i18next.addResourceBundle(lng, 'translation', translations.default);
      
      // Force language change
      await i18next.changeLanguage(lng);
      
      return translations.default;
    },
    staleTime: Infinity,
    cacheTime: 0, // Disable caching to ensure fresh data on language change
  });
};