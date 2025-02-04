// components/shared/Links.tsx
'use client';

import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import type { CustomTypeOptions } from 'i18next';

// Create a type that allows for nested paths
type NestedKeyOf<ObjectType extends object> = {
  [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
    ? `${Key}.${NestedKeyOf<ObjectType[Key]>}`
    : `${Key}`;
}[keyof ObjectType & (string | number)];

type TranslationKey = NestedKeyOf<CustomTypeOptions['resources']['translation']>;

interface CustomLinkProps {
  text: string;
  translationKey?: TranslationKey;
  href: string;
  textColor?: string;
}

const CustomLink: React.FC<CustomLinkProps> = ({ 
  text, 
  translationKey, 
  href, 
  textColor = 'text-primary300' 
}) => {
  const { t } = useTranslation();
  
  // Add the translation: namespace prefix to the key
  const displayText = translationKey ? t(`translation:${translationKey}`) : text;
  
  return (
    <Link 
      href={href} 
      className={`${textColor} text-center font-normal text-sm hover:underline hover:text-primary300`}
    >
      {displayText}
    </Link>
  );
};

export default CustomLink;