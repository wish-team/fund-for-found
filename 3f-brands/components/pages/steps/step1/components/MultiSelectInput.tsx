import React, { useState } from "react";
import { useFormContext} from "react-hook-form";
import { InputProps } from "../types";
import { useDropdown } from "../hooks/useDropdown";
import Inputs from "../../../../shared/Input";

export const MultiSelectInput: React.FC<InputProps> = ({
  data,
  label,
  fieldName,
  error,
}) => {
  const { register, setValue, watch } = useFormContext();
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>("");

  const { state, dropdownRef, toggleDropdown, filterItems } = useDropdown({
    initialState: {
      isOpen: false,
      filteredItems: [],
    },
  });

  const handleItemSelect = (item: string) => {
    if (!selectedItems.includes(item)) {
      const newSelectedItems = [...selectedItems, item];
      setSelectedItems(newSelectedItems);
      setValue(fieldName, newSelectedItems);
      setInputValue(newSelectedItems.join(", "));
    }
    toggleDropdown(false);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    filterItems(data, newValue);
    toggleDropdown(true);
  };

  // Separate the register function to handle the field registration
  const { onChange: registerOnChange, ...registerRest } = register(fieldName, {
    required: `${label} is required`,
  });

  return (
    <div ref={dropdownRef} className="relative">
      <Inputs
        type="text"
        label={label}
        extraLabel="*"
        value={inputValue}
        placeholder={`Select ${label}`}
        onChange={(e) => {
          registerOnChange(e); // Handle the react-hook-form onChange
          handleInputChange(e); // Handle our custom onChange
        }}
        onFocus={() => toggleDropdown(true)}
        className="mt-1"
        inputClassName="focus:border-purple-500"
      />
      {state.isOpen && state.filteredItems.length > 0 && (
        <ul className="absolute shadow-md z-10 border border-light3 rounded-lg bg-white mt-2 max-h-60 overflow-auto w-full">
          {state.filteredItems.map((item) => (
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
      {error && <p className="text-red-500 text-xs pt-1">{error.message}</p>}
    </div>
  );
};