import React from "react";
import { useFormContext } from "react-hook-form";
import { InputProps } from "../types";
import { useDropdown } from "../hooks/useDropdown";
import Inputs from "../../../../shared/Input";

export const AutocompleteInput: React.FC<InputProps & { placeholder?: string }> = ({
  data,
  label,
  fieldName,
  error,
  placeholder = `Select ${label}`,
}) => {
  const { register, setValue, watch } = useFormContext();
  const value = watch(fieldName) || "";

  const { state, dropdownRef, toggleDropdown, filterItems } = useDropdown({
    initialState: {
      isOpen: false,
      filteredItems: [],
    },
  });

  const handleItemSelect = (item: string) => {
    setValue(fieldName, item);
    toggleDropdown(false);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    filterItems(data, inputValue);
    setValue(fieldName, inputValue);
    toggleDropdown(true);
  };

  return (
    <div ref={dropdownRef} className="relative">
      <Inputs
        type="text"
        label={label}
        extraLabel="*"
        value={value}
        placeholder={placeholder}
        {...register(fieldName, { required: `${label} is required` })}
        onChange={handleInputChange}
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