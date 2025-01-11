// app/providers.tsx
"use client";

import { NextUIProvider } from "@nextui-org/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from 'react-hot-toast';
import { LanguageProvider, TranslationProvider } from '@/utils/i18n';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <NextUIProvider>
        <TranslationProvider>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </TranslationProvider>
      </NextUIProvider>
      <Toaster position="top-right" />
    </QueryClientProvider>
  );
}