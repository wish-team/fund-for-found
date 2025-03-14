import React, { useRef, useState, useEffect } from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { useTranslation } from "react-i18next";

interface Option {
  id: number;
  name: string;
}

interface AutocompleteInputProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder: string;
  options?: Option[] | string[];
  allowCustomInput?: boolean;
}

export const AutocompleteInput = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  options = [],
  allowCustomInput = false,
}: AutocompleteInputProps<T>) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState<Option[]>([]);
  const inputRef = useRef<HTMLDivElement>(null);

  // Only show suggestions if options are provided and custom input isn't allowed
  const shouldShowSuggestions = !allowCustomInput && options.length > 0;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filterOptions = (inputValue: string) => {
    const normalizedOptions = (options as (Option | string)[]).map((option) => {
      if (typeof option === "string") {
        return { id: (options as string[]).indexOf(option), name: option };
      }
      return option as Option;
    });

    return normalizedOptions.filter((option) =>
      option.name.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const getErrorMessage = (fieldName: string, fieldLabel: string) => {
    // Using type assertion to handle the translation options
    return t(`step1.validation.${fieldName}`, {
      field: fieldLabel,
      defaultValue: t("step1.validation.required", {
        field: fieldLabel,
      } as any),
    } as any);
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <div ref={inputRef} className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {label}
            <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              value={(value as string) || ""}
              onChange={(e) => {
                const inputValue = e.target.value;
                onChange(inputValue);
                if (shouldShowSuggestions) {
                  setFilteredOptions(filterOptions(inputValue));
                  setIsOpen(true);
                }
              }}
              onFocus={() => {
                if (shouldShowSuggestions) {
                  setFilteredOptions(filterOptions((value as string) || ""));
                  setIsOpen(true);
                }
              }}
              placeholder={placeholder}
              className={`
                w-full px-3 py-2 border rounded-lg focus:outline-none
                ${
                  error
                    ? "border-red-500"
                    : "border-light3 focus:border-purple-500"
                }
              `}
            />
            {isOpen && shouldShowSuggestions && filteredOptions.length > 0 && (
              <ul className="absolute z-10 w-full mt-1 bg-white border border-light3 rounded-lg shadow-md max-h-60 overflow-y-auto">
                {filteredOptions.map((option, index) => {
                  const optionValue =
                    typeof option === "string" ? option : option.name;
                  const optionKey =
                    typeof option === "string" ? index : option.id;
                  return (
                    <li
                      key={optionKey}
                      className="py-2 px-4 hover:bg-primary50 cursor-pointer"
                      onClick={() => {
                        onChange(optionValue);
                        setIsOpen(false);
                      }}
                    >
                      {optionValue}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
          {error && (
            <p className="text-red-500 text-xs mt-1">
              {getErrorMessage(name, label)}
            </p>
          )}
        </div>
      )}
    />
  );
};

AutocompleteInput.displayName = "AutocompleteInput";
