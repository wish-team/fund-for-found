import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Input,
} from "@nextui-org/react";

interface SearchCountryFilterProps {
  searchTerm: string;
  countries: string[];
  selectedCountry: string;
  onSearchChange: (value: string) => void;
  onCountrySelect: (country: string) => void;
}
export const SearchCountryFilter: React.FC<SearchCountryFilterProps> = ({
  searchTerm,
  countries,
  selectedCountry,
  onSearchChange,
  onCountrySelect,
}) => {
  return (
    <div className="grid md:grid-cols-5 gap-4 mb-6">
      {/* Search Input */}
      <Input
        value={searchTerm}
        placeholder="Search brands by name or description"
        className="w-full border col-span-4 rounded-lg text-sm shadow-md hover:border-purple-600 focus:border-purple-500"
        variant="bordered"
        onChange={(e) => onSearchChange(e.target.value)}
      />

      {/* Country Dropdown */}
      <Dropdown>
        <DropdownTrigger>
          <Button
            variant="bordered"
            className="font-light w-full bg-primary text-sm text-white rounded-lg border-light2 hover:bg-primary400"
          >
            {selectedCountry}
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          className="bg-white border shadow-sm rounded-lg text-gray3 text-sm"
          selectionMode="single"
          aria-label="Country selection"
          onAction={(key) => onCountrySelect(key.toString())}
        >
          {countries.map((country) => (
            <DropdownItem key={country} className="hover:bg-primary50">{country}</DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};
