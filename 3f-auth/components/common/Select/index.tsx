'use client'

import React from "react";

interface SelectProps {
  options: string[];
  onChange: (value: string) => void;
  // Removed 'value' from props if it's not being used
}

const Select = ({ options, onChange }: SelectProps) => {
  return (
    <select onChange={(e) => onChange(e.target.value)}>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

export default Select;
