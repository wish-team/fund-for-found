interface TitleProps {
  title: string;
  desc?: string; // Optional description
  fontWeight: string;
  textColor: string;
  fontSize: string;
  descSize: string;
  justify: string;
}

const Title: React.FC<TitleProps> = ({
  title,
  desc,
  fontWeight = "font-semibold",
  textColor = "text-gray4",
  fontSize = "text-3xl",
  descSize = "text-[20px]",
}) => {
  return (
    <>
      <h1 className={`text-primary ${fontSize} ${fontWeight}`}>
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
