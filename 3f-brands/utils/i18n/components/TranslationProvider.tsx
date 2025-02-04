// features/i18n/components/TranslationProvider.tsx
'use client';

import { I18nextProvider } from 'react-i18next';
import i18next from '../utils/i18n';

export function TranslationProvider({ children }: { children: React.ReactNode }) {
  return (
    <I18nextProvider i18n={i18next}>
      {children}
    </I18nextProvider>
  );
}