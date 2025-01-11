import React from "react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import { HiTranslate } from "react-icons/hi";
import { Selection } from "@nextui-org/react";
import { languages, useLanguageStore, useTranslations } from '@/utils/i18n';
import { useQueryClient } from '@tanstack/react-query';

const languageNames = {
  en: 'English',
  fa: 'Persian',
  de: 'German',
  ar: 'Arabic',
  fr: 'French'
};

export default function TranslateBtn() {
  const { currentLanguage, setLanguage } = useLanguageStore();
  const { isLoading } = useTranslations(currentLanguage);
  const queryClient = useQueryClient();

  const handleLanguageChange = async (keys: Selection) => {
    const selectedLang = Array.from(keys)[0] as string;
    const langCode = Object.entries(languageNames).find(([_, value]) => value === selectedLang)?.[0];
    
    if (langCode) {
      // Invalidate the current translation query
      await queryClient.invalidateQueries({
        queryKey: ['translations', currentLanguage]
      });
      
      // Set the new language
      setLanguage(langCode);
      
      // Force a refetch of the translations
      await queryClient.refetchQueries({
        queryKey: ['translations', langCode],
        type: 'active'
      });
    }
  };

  if (isLoading) return <Button variant="bordered">Loading...</Button>;

  return (
    <Dropdown className="text-sm bg-white rounded-lg shadow">
      <DropdownTrigger>
        <Button 
          variant="bordered" 
          className="capitalize text-sm bg-white text-gray2 rounded-lg shadow"
        >
          <HiTranslate />
          {languageNames[currentLanguage as keyof typeof languageNames]}
        </Button>
      </DropdownTrigger>
      <DropdownMenu 
        aria-label="Language selection"
        variant="flat"
        disallowEmptySelection
        selectionMode="single"
        selectedKeys={new Set([languageNames[currentLanguage as keyof typeof languageNames]])}
        onSelectionChange={handleLanguageChange}
      >
        {languages.map((lang) => (
          <DropdownItem key={languageNames[lang as keyof typeof languageNames]}>
            {languageNames[lang as keyof typeof languageNames]}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}