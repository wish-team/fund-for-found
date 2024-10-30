import React from 'react';

interface InputsProps {
  label?: string;
  type?: 'text' | 'email' | 'password' | 'number'; 
  placeholder: string;
  icon?: React.ElementType;
  className?: string; 
  labelClassName?: string; 
  inputClassName?: string; 
}


const Inputs: React.FC<InputsProps> = ({
  label,
  type = 'text',
  placeholder,
  icon: Icon,
  className = '',
  labelClassName = '',
  inputClassName = '',
}) => {
  return (
    <div className={`flex flex-col relative ${className}`}>
      {label && (
        <label className={`mb-1 ${labelClassName}`} htmlFor={placeholder}>
          {label}
        </label>
      )}
      <div className="flex items-center">
        {Icon && (
          <span className="absolute left-3 text-light1">
            <Icon />
          </span>
        )}
        <input
          type={type}
          placeholder={placeholder}
          className={`rounded-lg border border-light3 shadow-shadow1 p-3 text-xs font-extralight ${Icon ? 'pl-8' : ''} focus:border-purple-500 focus:outline-none ${inputClassName}`}
          id={placeholder} 
        />
      </div>
    </div>
  );
};

export default Inputs;
