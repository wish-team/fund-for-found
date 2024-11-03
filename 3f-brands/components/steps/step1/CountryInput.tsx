// "use client";
// import React, { useState, useEffect, useRef } from "react";
// import { useFormContext } from "react-hook-form";
// import Inputs from "../../shared/Input";

// const countries = [
//   "United States",
//   "Canada",
//   "United Kingdom",
//   "Australia",
//   "Germany",
//   "France",
//   "India",
// ];

// const CountryInput: React.FC = () => {
//   const { register, setValue, watch } = useFormContext();
//   const [isOpen, setIsOpen] = useState<boolean>(false);
//   const [filteredCountries, setFilteredCountries] = useState<string[]>([]);
//   const inputRef = useRef<HTMLDivElement>(null);
  
//   const countryValue = watch("country") || "";

//   const toggleDropdown = (isOpen: boolean) => setIsOpen(isOpen);

//   const handleCountrySelect = (country: string) => {
//     setValue("country", country);
//     toggleDropdown(false);
//   };

//   const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const value = event.target.value;
//     setFilteredCountries(countries.filter(country =>
//       country.toLowerCase().includes(value.toLowerCase())
//     ));
//     setValue("country", value);
//     toggleDropdown(true);
//   };

//   const handleClickOutside = (event: MouseEvent) => {
//     if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
//       toggleDropdown(false);
//     }
//   };

//   useEffect(() => {
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   return (
//     <div ref={inputRef} className="relative">
//       <Inputs
//         type="text"
//         label="Country"
//         extraLabel="*"
//         value={countryValue}
//         {...register("country", { required: "Country is required" })}
//         onChange={handleInputChange}
//         onFocus={() => toggleDropdown(true)}
//         className="mt-1"
//         inputClassName="focus:border-purple-500"
//       />
//       {isOpen && filteredCountries.length > 0 && (
//         <ul className="absolute shadow-md z-10 border border-light3 rounded-lg bg-white mt-2 max-h-60 overflow-auto w-full">
//           {filteredCountries.map((country) => (
//             <li
//               key={country}
//               className="py-2 px-4 text-gray4 hover:bg-primary50 cursor-pointer"
//               onClick={() => handleCountrySelect(country)}
//             >
//               {country}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default CountryInput;












"use client";
import React, { useState, useEffect, useRef } from "react";
import { useFormContext } from "react-hook-form";
import Inputs from "../../shared/Input";

interface CountryInputProps {
  data: string[]; // Accepts an array of strings for dynamic data
  label: string; // Accepts a label for the input field
  fieldName: string; // Accepts the field name for form registration
}

const CountryInput: React.FC<CountryInputProps> = ({ data, label, fieldName }) => {
  const { register, setValue, watch } = useFormContext();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [filteredItems, setFilteredItems] = useState<string[]>([]);
  const inputRef = useRef<HTMLDivElement>(null);
  
  const value = watch(fieldName) || ""; // Use dynamic field name

  const toggleDropdown = (isOpen: boolean) => setIsOpen(isOpen);

  const handleItemSelect = (item: string) => {
    setValue(fieldName, item);
    toggleDropdown(false);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setFilteredItems(data.filter(item =>
      item.toLowerCase().includes(inputValue.toLowerCase())
    ));
    setValue(fieldName, inputValue);
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
        label={label}
        extraLabel="*"
        value={value}
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

export default CountryInput;

