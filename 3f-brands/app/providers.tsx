// app/providers.tsx
"use client";

import { NextUIProvider } from "@nextui-org/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { I18nextProvider } from "react-i18next";
import i18n from "@/utils/i18n/utils/i18n";
import { LanguageProvider } from "@/utils/i18n";
import { useEffect } from "react";
import { useLanguageStore } from "@/utils/i18n";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

export function Providers({ children }: { children: React.ReactNode }) {
  const { setLanguage } = useLanguageStore();

  useEffect(() => {
    const loadTranslations = async () => {
      try {
        const translations = await import(
          `@/utils/i18n/locales/${setLanguage}/translation.json`
        );
        i18n.addResourceBundle(
          String(setLanguage),
          "translation", 
          translations.default,
          true,
          true
        );
        await i18n.changeLanguage(String(setLanguage));
      } catch (error) {
        console.error("Error loading translations:", error);
      }
    };

    loadTranslations();
  }, [setLanguage]);

  return (
    <QueryClientProvider client={queryClient}>
      <NextUIProvider>
        <I18nextProvider i18n={i18n}>
          <LanguageProvider>{children}</LanguageProvider>
        </I18nextProvider>
      </NextUIProvider>
      <Toaster position="top-right" />
    </QueryClientProvider>
  );
}
