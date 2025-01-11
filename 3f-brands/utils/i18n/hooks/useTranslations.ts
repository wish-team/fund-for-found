import { useQuery } from '@tanstack/react-query';
import i18next from 'i18next';
import { getOptions } from '../config/settings';

export const useTranslations = (lng: string) => {
  return useQuery({
    queryKey: ['translations', lng],
    queryFn: async () => {
      const translations = await import(`../locales/${lng}/translation.json`);
      i18next.addResourceBundle(lng, 'translation', translations.default);
      await i18next.changeLanguage(lng);
      return translations.default;
    },
    staleTime: Infinity,
  });
};