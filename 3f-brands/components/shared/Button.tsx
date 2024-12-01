import Link from "next/link";
import React from "react";

interface ButtonProps {
  text: string;
  onClick?: () => void; // Make onClick optional
  bgColor?: string;
  textColor?: string;
  hover?: string;
  href?: string; // href prop for links
  type?: "button" | "submit" | "reset";
}

const Button: React.FC<ButtonProps> = ({
  text,
  onClick,
  href,
  bgColor = "bg-primary", // Default background color
  textColor = "text-white", // Default text color
  type = "button", // Default button type
  hover = "bg-primary300",
}) => {
  const buttonClass = `${bgColor} ${textColor} hover:${hover} rounded-lg py-3 mb-2 mt-12 w-full font-extralight leading-4 text-sm hover:bg-primary400`;

  if (href) {
    // If href is provided, render a Link component
    return (
      <Link href={href}>
        <span className={buttonClass}>
          {text}
        </span>
      </Link>
    );
  }

  // If no href, render a regular button
  return (
    <button
      className={buttonClass}
      onClick={onClick}
      type={type}
    >
      {text}
    </button>
  );
};

export default Button;
