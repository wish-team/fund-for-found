import React from 'react';

interface ButtonProps {
  text: string;
  onClick: () => void;
  bgColor?: string;
  textColor?: string;
  hover?: string;
  type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<ButtonProps> = ({
  text,
  onClick,
  bgColor = 'bg-primary', // Default background color
  textColor = 'text-white', // Default text color
  type = 'button', // Default button type
  hover= 'bg-primary300',
}) => {
  return (
    <button
      className={`${bgColor} ${textColor} hover:${hover} rounded-lg py-3 mb-2 mt-12 w-full font-extralight leading-4 text-sm`}
      onClick={onClick}
      type={type}
    >
      {text}
    </button>
  );
};

export default Button;
