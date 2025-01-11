// components/shared/Links.tsx
'use client';

import Link from 'next/link';
import { useTranslation } from 'react-i18next';

interface CustomLinkProps {
  text: string;
  translationKey?: string;
  href: string;
  textColor?: string; 
}

const CustomLink: React.FC<CustomLinkProps> = ({ text, translationKey, href, textColor = 'text-primary300' }) => {
  const { t } = useTranslation();
  
  const displayText = translationKey ? t(translationKey) : text;
  
  return (
    <Link href={href} className={`${textColor} text-center font-normal text-sm hover:underline hover:text-primary300`}>
      {displayText}
    </Link>
  );
};

export default CustomLink;