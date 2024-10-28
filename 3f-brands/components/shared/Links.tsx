
import Link from 'next/link';

interface CustomLinkProps {
  text: string;
  href: string;
  textColor?: string; 
}

const CustomLink: React.FC<CustomLinkProps> = ({ text, href, textColor = 'text-primary300' }) => {
  return (
    <Link href={href} className={`${textColor} text-center font-normal text-sm hover:underline hover:text-primary300`}>
      {text}
    </Link>
  );
};

export default CustomLink;


