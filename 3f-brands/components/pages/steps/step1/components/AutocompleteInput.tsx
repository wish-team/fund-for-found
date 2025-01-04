import React, { useRef, useCallback, useEffect, memo } from "react";
import { InputProps } from "../types";
import { useRegistrationStore } from "../store/registrationStore";
import Inputs from "../../../../shared/Input";

export const AutocompleteInput = memo(({ 
  data, 
  label, 
  fieldName, 
  error, 
  placeholder = `Select ${label}` 
}: InputProps & { placeholder?: string }) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const value = useRegistrationStore((state) => state.formData[fieldName] || "");
  const dropdownState = useRegistrationStore((state) => state.dropdowns[fieldName]);
  const {
    initDropdown,
    removeDropdown,
    setDropdownState,
    filterDropdownItems,
    setFormField
  } = useRegistrationStore();

  useEffect(() => {
    initDropdown(fieldName);
    return () => removeDropdown(fieldName);
  }, [fieldName, initDropdown, removeDropdown]);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setDropdownState(fieldName, { isOpen: false });
    }
  }, [fieldName, setDropdownState]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [handleClickOutside]);

  const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    filterDropdownItems(fieldName, data, inputValue);
    setFormField(fieldName, inputValue);
    setDropdownState(fieldName, { isOpen: true });
  }, [fieldName, data, filterDropdownItems, setFormField, setDropdownState]);

  const handleItemSelect = useCallback((item: string) => {
    setFormField(fieldName, item);
    setDropdownState(fieldName, { isOpen: false });
  }, [fieldName, setFormField, setDropdownState]);

  return (
    <div ref={dropdownRef} className="relative">
      <Inputs
        type="text"
        label={label}
        extraLabel="*"
        value={value}
        placeholder={placeholder}
        onChange={handleInputChange}
        onFocus={() => setDropdownState(fieldName, { isOpen: true })}
        className="mt-1"
        inputClassName="focus:border-purple-500"
      />
      {dropdownState?.isOpen && dropdownState.filteredItems?.length > 0 && (
        <ul className="absolute shadow-md z-10 border border-light3 rounded-lg bg-white mt-2 max-h-60 overflow-auto w-full">
          {dropdownState.filteredItems.map((item) => (
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
});

AutocompleteInput.displayName = 'AutocompleteInput';