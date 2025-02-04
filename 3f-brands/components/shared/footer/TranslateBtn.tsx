'use client';

import React from "react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import { HiTranslate } from "react-icons/hi";
import { Selection } from "@nextui-org/react";
import { languages, useLanguageStore } from '@/utils/i18n';
import { useTranslation } from 'react-i18next';
import { useQueryClient } from '@tanstack/react-query';

type LanguageCode = 'en' | 'fa' | 'de' | 'ar' | 'fr';

const languageNames: Record<LanguageCode, string> = {
  en: 'English',
  fa: 'Persian',
  de: 'German',
  ar: 'Arabic',
  fr: 'French'
};

export default function TranslateBtn() {
  const { currentLanguage, setLanguage } = useLanguageStore();
  const { i18n } = useTranslation();
  const queryClient = useQueryClient();

  const handleLanguageChange = async (keys: Selection) => {
    const selectedLang = Array.from(keys)[0] as string;
    const langCode = Object.entries(languageNames).find(([_, value]) => value === selectedLang)?.[0] as LanguageCode | undefined;
    
    if (langCode) {
      try {
        // Invalidate current translations
        await queryClient.invalidateQueries({
          queryKey: ['translations', currentLanguage]
        });

        // Load new translations
        const newTranslations = await import(`@/utils/i18n/locales/${langCode}/translation.json`);
        
        // Update i18next resources
        i18n.addResourceBundle(langCode, 'translation', newTranslations.default, true, true);
        
        // Change language in i18next
        await i18n.changeLanguage(langCode);
        
        // Update language in store
        setLanguage(langCode);

        // Prefetch translations for next time
        queryClient.prefetchQuery({
          queryKey: ['translations', langCode],
          queryFn: () => Promise.resolve(newTranslations.default)
        });

      } catch (error) {
        console.error('Error changing language:', error);
      }
    }
  };

  return (
    <Dropdown className="text-sm bg-white rounded-lg shadow">
      <DropdownTrigger>
        <Button 
          variant="bordered" 
          className="capitalize text-sm bg-white text-gray2 rounded-lg shadow"
        >
          <HiTranslate />
          {languageNames[currentLanguage as LanguageCode]}
        </Button>
      </DropdownTrigger>
      <DropdownMenu 
        aria-label="Language selection"
        variant="flat"
        disallowEmptySelection
        selectionMode="single"
        selectedKeys={new Set([languageNames[currentLanguage as LanguageCode]])}
        onSelectionChange={handleLanguageChange}
      >
        {languages.map((lang) => (
          <DropdownItem key={languageNames[lang as LanguageCode]}>
            {languageNames[lang as LanguageCode]}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}