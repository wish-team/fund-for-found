'use client';

import { useTranslation } from 'react-i18next';

interface TitleProps {
  title: string;
  titleKey?: string; 
  desc?: string;
  descKey?: string; 
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
  fontSize = "text-2xl md:text-4xl", // Default responsive font sizes
  descSize = "text-[20px]",
  paddingTop = "pt-3"
}) => {
  const { t } = useTranslation();

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