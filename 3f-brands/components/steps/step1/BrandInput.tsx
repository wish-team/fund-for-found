"use client";
import React, { useState, useEffect, useRef } from "react";
import { useFormContext } from "react-hook-form";
import Inputs from "../../shared/Input";

interface BrandInputProps {
  data: string[]; // Accepts an array of strings for dynamic data
  label: string; // Accepts a label for the input field
  fieldName: string; // Accepts the field name for form registration
}

const BrandInput: React.FC<BrandInputProps> = ({ data, label, fieldName }) => {
  const { register, setValue } = useFormContext();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [filteredItems, setFilteredItems] = useState<string[]>([]);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>(""); // State for the input value
  const inputRef = useRef<HTMLDivElement>(null);
  
  const toggleDropdown = (isOpen: boolean) => setIsOpen(isOpen);

  const handleItemSelect = (item: string) => {
    if (!selectedItems.includes(item)) {
      const newSelectedItems = [...selectedItems, item];
      setSelectedItems(newSelectedItems);
      setValue(fieldName, newSelectedItems); // Update the form value with the array of selected items
      setInputValue(newSelectedItems.join(", ") + (inputValue ? `, ${inputValue}` : "")); // Update input value to include selected items
    }
    toggleDropdown(false);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setInputValue(newValue); // Update the input value state
    setFilteredItems(data.filter(item =>
      item.toLowerCase().includes(newValue.toLowerCase())
    ));
    toggleDropdown(true);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
      toggleDropdown(false);
    }
  };

  const handleItemRemove = (item: string) => {
    const newSelectedItems = selectedItems.filter(selected => selected !== item);
    setSelectedItems(newSelectedItems);
    setValue(fieldName, newSelectedItems); // Update the form value
    // Update input value to reflect current selections
    setInputValue(newSelectedItems.join(", ") + (inputValue ? `, ${inputValue}` : ""));
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={inputRef} className="relative">
      <Inputs
        type="text"
        label={label}
        extraLabel="*"
        value={inputValue} // Use the input value state
        {...register(fieldName, { required: `${label} is required` })}
        onChange={handleInputChange}
        onFocus={() => toggleDropdown(true)}
        className="mt-1"
        inputClassName="focus:border-purple-500"
      />
      {isOpen && filteredItems.length > 0 && (
        <ul className="absolute shadow-md z-10 border border-light3 rounded-lg bg-white mt-2 max-h-60 overflow-auto w-full">
          {filteredItems.map((item) => (
            <li
              key={item}
              className="py-2 px-4 text-gray4 hover:bg-primary50 cursor-pointer"
              onClick={() => handleItemSelect(item)}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BrandInput;
