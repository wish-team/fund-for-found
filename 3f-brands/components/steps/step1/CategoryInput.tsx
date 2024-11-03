"use client";
import React, { useState, useEffect, useRef } from "react";
import { useFormContext } from "react-hook-form";
import Inputs from "../../shared/Input";

const countries = [
  "art",
  "start up",
  "block chain",
  "nft",
  "sport",
  "music",
  "develope",
];

const CategoryInput: React.FC = () => {
  const { register, setValue, watch } = useFormContext();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [filteredCountries, setFilteredCountries] = useState<string[]>([]);
  const inputRef = useRef<HTMLDivElement>(null);
  
  const countryValue = watch("country") || "";

  const toggleDropdown = (isOpen: boolean) => setIsOpen(isOpen);

  const handleCountrySelect = (country: string) => {
    setValue("country", country);
    toggleDropdown(false);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setFilteredCountries(countries.filter(country =>
      country.toLowerCase().includes(value.toLowerCase())
    ));
    setValue("country", value);
    toggleDropdown(true);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
      toggleDropdown(false);
    }
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
        label="Category"
        extraLabel="*"
        value={countryValue}
        {...register("country", { required: "Country is required" })}
        onChange={handleInputChange}
        onFocus={() => toggleDropdown(true)}
        className="mt-1"
        inputClassName="focus:border-purple-500"
      />
      {isOpen && filteredCountries.length > 0 && (
        <ul className="absolute shadow-md z-10 border border-light3 rounded-lg bg-white mt-2 max-h-60 overflow-auto w-full">
          {filteredCountries.map((country) => (
            <li
              key={country}
              className="py-2 px-4 text-gray4 hover:bg-primary50 cursor-pointer"
              onClick={() => handleCountrySelect(country)}
            >
              {country}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CategoryInput;
