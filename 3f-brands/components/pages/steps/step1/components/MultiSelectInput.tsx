import React, { useState, useRef, KeyboardEvent } from "react";
import { InputProps } from "../types";
import { useRegistrationStore } from "../store/registrationStore";

export const MultiSelectInput = React.memo(({ 
  data, 
  label, 
  fieldName, 
  error 
}: InputProps) => {
  const [inputValue, setInputValue] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const selectedItems = useRegistrationStore((state) => state.formData[fieldName] as string[] || []);
  const setFormField = useRegistrationStore((state) => state.setFormField);

  // Memoize filtered suggestions based on input value and selected items
  const filteredSuggestions = React.useMemo(() => {
    if (!inputValue) return [];
    return data.filter(item =>
      item.toLowerCase().includes(inputValue.toLowerCase()) &&
      !selectedItems.includes(item)
    );
  }, [data, inputValue, selectedItems]);

  const addTag = React.useCallback((newTag: string) => {
    const trimmedTag = newTag.trim();
    if (trimmedTag && !selectedItems.includes(trimmedTag)) {
      setFormField(fieldName, [...selectedItems, trimmedTag]);
    }
    setInputValue("");
    setShowDropdown(false);
  }, [selectedItems, fieldName, setFormField]);

  const removeTag = React.useCallback((tagToRemove: string) => {
    setFormField(fieldName, selectedItems.filter(tag => tag !== tagToRemove));
  }, [selectedItems, fieldName, setFormField]);

  const handleInputChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setShowDropdown(true);
  }, []);

  const handleKeyDown = React.useCallback((e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      e.preventDefault();
      addTag(inputValue);
    } else if (e.key === 'Backspace' && !inputValue && selectedItems.length > 0) {
      setFormField(fieldName, selectedItems.slice(0, -1));
    }
  }, [inputValue, selectedItems, fieldName, setFormField, addTag]);

  const handleContainerClick = React.useCallback((e: React.MouseEvent) => {
    // Only focus input if click is on the container but not on a tag button
    if (e.target === e.currentTarget) {
      inputRef.current?.focus();
    }
  }, []);

  const handleBlur = React.useCallback((e: React.FocusEvent) => {
    // Check if the related target is within our component
    const isRelatedTargetInside = e.relatedTarget instanceof Node && 
      e.currentTarget.contains(e.relatedTarget);
    
    if (!isRelatedTargetInside) {
      setShowDropdown(false);
    }
  }, []);

  // Render tag component
  const Tag = React.memo(({ tag }: { tag: string }) => (
    <span className="inline-flex items-center bg-primary50 text-gray4 rounded-full px-2 py-1 text-sm">
      {tag}
      <button
        type="button"
        className="ml-1 hover:text-gray-700"
        onClick={(e) => {
          e.stopPropagation();
          removeTag(tag);
        }}
      >
        ×
      </button>
    </span>
  ));
  Tag.displayName = 'Tag';

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}<span className="text-red-500">*</span>
      </label>
      <div
        className={`
          flex flex-wrap items-center gap-1 p-2 border rounded-lg
          ${error ? 'border-red-500' : 'border-light3'}
          focus-within:border-purple-500 bg-white
        `}
        onClick={handleContainerClick}
        onBlur={handleBlur}
      >
        {selectedItems.map((tag) => (
          <Tag key={tag} tag={tag} />
        ))}
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setShowDropdown(true)}
          className="flex-grow outline-none min-w-[120px] bg-transparent"
          placeholder={selectedItems.length === 0 ? `Type to add ${label.toLowerCase()}...` : ''}
        />
      </div>
      
      {showDropdown && filteredSuggestions.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-light3 rounded-lg shadow-md max-h-60 overflow-y-auto">
          {filteredSuggestions.map((suggestion) => (
            <div
              key={suggestion}
              className="py-2 px-4 hover:bg-primary50 cursor-pointer"
              onMouseDown={(e) => {
                e.preventDefault(); // Prevent input blur
                addTag(suggestion);
              }}
            >
              {suggestion}
            </div>
          ))}
        </div>
      )}
      
      {error && <p className="text-red-500 text-xs pt-1">{error.message}</p>}
    </div>
  );
});

MultiSelectInput.displayName = 'MultiSelectInput';