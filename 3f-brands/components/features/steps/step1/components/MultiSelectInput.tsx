import React, { useState, useRef, KeyboardEvent } from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { FormData } from "../types";

interface Option {
  id: number;
  name: string;
}

interface MultiSelectInputProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder: string;
  options?: string[];
}

export const MultiSelectInput = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  options = [],
}: MultiSelectInputProps<T>) => {
  const [inputValue, setInputValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLDivElement>(null);

  const filterOptions = (searchValue: string, selectedItems: string[]) => {
    return options.filter(
      (option) =>
        option.toLowerCase().includes(searchValue.toLowerCase()) &&
        !selectedItems.includes(option)
    );
  };

  const handleKeyDown = (
    e: KeyboardEvent<HTMLInputElement>,
    value: string[],
    onChange: (value: string[]) => void
  ) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault();
      if (!value.includes(inputValue.trim())) {
        const newValue = [...value, inputValue.trim()];
        onChange(newValue);
        setInputValue("");
      }
    }
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value = [] }, fieldState: { error } }) => {
        const filteredOptions = filterOptions(inputValue, value as string[]);

        const handleAddTag = (option: string) => {
          if (!(value as string[]).includes(option)) {
            const newValue = [...(value as string[]), option];
            onChange(newValue);
            setInputValue("");
            setIsOpen(false);
          }
        };

        const handleRemoveTag = (tagToRemove: string) => {
          const newValue = (value as string[]).filter(
            (tag) => tag !== tagToRemove
          );
          onChange(newValue);
        };

        return (
          <div ref={inputRef} className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {label}
              <span className="text-red-500">*</span>
            </label>
            <div
              className={`
                flex flex-wrap items-center gap-1 p-2 border rounded-lg bg-white
                ${
                  error
                    ? "border-red-500"
                    : "border-light3 focus-within:border-purple-500"
                }
              `}
            >
              {(value as string[]).map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center bg-primary50 text-gray4 rounded-full px-2 py-1 text-sm"
                >
                  {tag}
                  <button
                    type="button"
                    className="ml-1 hover:text-gray-700"
                    onClick={() => handleRemoveTag(tag)}
                  >
                    ×
                  </button>
                </span>
              ))}
              <input
                type="text"
                value={inputValue}
                onChange={(e) => {
                  setInputValue(e.target.value);
                  setIsOpen(true);
                }}
                onKeyDown={(e) => handleKeyDown(e, value as string[], onChange)}
                onFocus={() => setIsOpen(true)}
                className="flex-grow outline-none min-w-[120px] bg-transparent"
                placeholder={
                  (value as string[])?.length === 0
                    ? placeholder || `Type to add ${label.toLowerCase()}...`
                    : ""
                }
              />
            </div>

            {isOpen && filteredOptions.length > 0 && (
              <ul className="absolute z-10 w-full mt-1 bg-white border border-light3 rounded-lg shadow-md max-h-60 overflow-y-auto">
                {filteredOptions.map((option) => (
                  <li
                    key={option}
                    className="py-2 px-4 hover:bg-primary50 cursor-pointer"
                    onClick={() => handleAddTag(option)}
                  >
                    {option}
                  </li>
                ))}
              </ul>
            )}

            {error && (
              <p className="text-red-500 text-xs mt-1">{error.message}</p>
            )}
          </div>
        );
      }}
    />
  );
};

MultiSelectInput.displayName = "MultiSelectInput";
