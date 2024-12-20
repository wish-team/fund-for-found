interface TitleProps {
  title: string;
  desc?: string; // Optional description
  fontWeight?: string;
  textColor?: string;
  fontSize?: string;
  descSize?: string;
  justify?: string;
  paddingTop?: string;
}

const Title: React.FC<TitleProps> = ({
  title,
  desc,
  fontWeight = "font-semibold",
  textColor = "text-gray4",
  fontSize = "md:text-4xl text-2xl",
  descSize = "text-[20px]",
  paddingTop = "pt-3"
}) => {
  return (
    <>
      <h1 className={`text-primary ${fontSize} ${fontWeight} ${paddingTop}  text-justify`}>
        {title}
      </h1>
      {desc && (
        <p
          className={`${textColor} text-light1 font-light ${descSize} text-justify`}
        >
          {desc}
        </p>
      )}
    </>
  );
};

export default Title;
