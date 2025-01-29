'use client'

import { useTranslation } from "react-i18next";
import type { CustomTypeOptions } from 'i18next';

// Create a type that allows for nested paths
type NestedKeyOf<ObjectType extends object> = {
  [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
    ? `${Key}.${NestedKeyOf<ObjectType[Key]>}`
    : `${Key}`;
}[keyof ObjectType & (string | number)];

type TranslationKey = NestedKeyOf<CustomTypeOptions['resources']['translation']>;

interface TitleProps {
  title?: string;
  titleKey?: TranslationKey;  // Updated type
  desc?: string;
  descKey?: TranslationKey;  // Updated type
  fontWeight?: string;
  textColor?: string;
  fontSize?: string;
  descSize?: string;
  justify?: string;
  paddingTop?: string;
}

const Title: React.FC<TitleProps> = ({
  title = '',
  titleKey,
  desc,
  descKey,
  fontWeight = "font-semibold",
  textColor = "text-gray4",
  fontSize = "text-2xl md:text-4xl",
  descSize = "text-[20px]",
  paddingTop = "pt-3"
}) => {
  const { t } = useTranslation();

  const displayTitle = titleKey ? t(`translation:${titleKey}`) : title;
  const displayDesc = descKey ? t(`translation:${descKey}`) : desc;

  return (
    <>
      <h1 className={`text-primary ${fontSize} ${fontWeight} ${paddingTop} text-justify`}>
        {displayTitle}
      </h1>
      {displayDesc && (
        <p className={`${textColor} text-light1 font-light ${descSize} text-justify`}>
          {displayDesc}
        </p>
      )}
    </>
  );
};

export default Title;