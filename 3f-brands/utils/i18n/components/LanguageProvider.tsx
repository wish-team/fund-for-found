// utils/i18n/components/LanguageProvider.tsx
"use client";

import { useLanguageStore } from "../store/languageStore";
import { useTranslations } from "../hooks/useTranslations";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { HomePageSkeleton } from "@/components/shared/skeletons/HomePageSkeleton";

interface LanguageProviderProps {
  children: React.ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const { currentLanguage, direction, fontFamily } = useLanguageStore();
  const { isLoading } = useTranslations(currentLanguage);

  useEffect(() => {
    // Set CSS variable for font-family
    document.documentElement.style.setProperty("--font-family", fontFamily);
  }, [fontFamily]);

  if (isLoading) return <HomePageSkeleton />;

  return (
    <div dir={direction()} className="font-sans">
      {children}
    </div>
  );
}
