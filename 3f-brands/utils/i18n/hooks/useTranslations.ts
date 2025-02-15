// utils/i18n/hooks/useTranslations.ts
'use client';

import { useQuery } from '@tanstack/react-query';
import i18next from '../utils/i18n';

export const useTranslations = (lng: string) => {
  return useQuery({
    queryKey: ['translations', lng],
    queryFn: async () => {
      try {
        const translations = await import(`../locales/${lng}/translation.json`);
        
        // Remove existing resources before adding new ones
        if (i18next.hasResourceBundle(lng, 'translation')) {
          i18next.removeResourceBundle(lng, 'translation');
        }
        
        i18next.addResourceBundle(lng, 'translation', translations.default);
        
        // Change language
        await i18next.changeLanguage(lng);
        
        return translations.default;
      } catch (error) {
        console.error('Error loading translations:', error);
        throw error;
      }
    },
    staleTime: Infinity,
    gcTime: 0
  });
};