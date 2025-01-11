'use client';

import { useTranslation } from 'react-i18next';

interface TitleProps {
  title: string;
  titleKey?: string; // Optional translation key for title
  desc?: string; // Optional description
  descKey?: string; // Optional translation key for description
  fontWeight?: string;
  textColor?: string;
  fontSize?: string;
  descSize?: string;
  justify?: string;
  paddingTop?: string;
}

const Title: React.FC<TitleProps> = ({
  title,
  titleKey,
  desc,
  descKey,
  fontWeight = "font-semibold",
  textColor = "text-gray4",
  fontSize = "md:text-4xl text-2xl",
  descSize = "text-[20px]",
  paddingTop = "pt-3"
}) => {
  const { t } = useTranslation();

  // Use translation if key is provided, otherwise use direct text
  const displayTitle = titleKey ? t(titleKey) : title;
  const displayDesc = descKey ? t(descKey) : desc;

  return (
    <>
      <h1 className={`text-primary ${fontSize} ${fontWeight} ${paddingTop} text-justify`}>
        {displayTitle}
      </h1>
      {displayDesc && (
        <p
          className={`${textColor} text-light1 font-light ${descSize} text-justify`}
        >
          {displayDesc}
        </p>
      )}
    </>
  );
};

export default Title;