"use client";
import React from 'react';

interface InputsProps {
  label?: string;
  extraLabel?: string; // New prop for additional text
  type?: 'text' | 'email' | 'password' | 'number'; 
  placeholder: string;
  icon?: React.ElementType;
  className?: string; 
  labelClassName?: string; 
  inputClassName?: string; 
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void; 
  value: string; 
}

const Inputs: React.FC<InputsProps> = ({
  label,
  extraLabel, // Destructure the new prop
  type = 'text',
  placeholder,
  icon: Icon,
  className = '',
  labelClassName = '',
  inputClassName = '',
  onChange,
  value,
}) => {
  return (
    <div className={`flex flex-col w-full relative ${className}`}>
      {label && (
        <label className={`mb-1 text-sm font-light text-gray2 ${labelClassName}`} htmlFor={placeholder}>
          {label}
          {extraLabel && (
            <span className="text-red-500 ml-1">{extraLabel}</span> // Style for extraLabel
          )}
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
          onChange={onChange}
          value={value}
          className={`rounded-lg border w-full border-light3 shadow-shadow1 p-3 text-xs font-extralight ${Icon ? 'pl-8' : ''} focus:border-purple-500 focus:outline-none ${inputClassName}`}
          id={placeholder} 
        />
      </div>
    </div>
  );
};

export default Inputs; 
