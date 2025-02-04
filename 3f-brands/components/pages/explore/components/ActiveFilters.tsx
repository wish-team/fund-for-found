import React from "react";
import { HiX } from "react-icons/hi";
interface ActiveFiltersProps {
  selectedSubcategories: { [key: string]: string };
  selectedCountry: string;
  searchTerm?: string;
  onRemoveCountryFilter: () => void;
  onRemoveSearchFilter: () => void;
  onRemoveSubcategoryFilter: (categoryName: string) => void;
}

export const ActiveFilters: React.FC<ActiveFiltersProps> = ({
  selectedSubcategories,
  selectedCountry,
  searchTerm,
  onRemoveCountryFilter,
  onRemoveSearchFilter,
  onRemoveSubcategoryFilter,
}) => {
  // Check if any filters are active
  const hasActiveFilters =
    Object.keys(selectedSubcategories).length > 0 ||
    selectedCountry !== "All Countries" ||
    !!searchTerm;

  if (!hasActiveFilters) return null;

  return (
    <div className="my-4 flex p-1 flex-wrap items-center text-primary400 text-xs gap-2">
      {/* Country Filter */}
      {selectedCountry !== "All Countries" && (
        <div className="flex items-center bg-primary50 px-2 py-1 rounded-full">
          <span className="mr-2 text-xs">{selectedCountry}</span>
          <button onClick={onRemoveCountryFilter}>
            <HiX className="w-4 h-4 text-gray-600 hover:text-red-500" />
          </button>
        </div>
      )}

      {/* Search Filter */}
      {searchTerm && (
        <div className="flex items-center bg-gray-100 px-2 py-1 rounded-full">
          <span className="mr-2">"{searchTerm}"</span>
          <button onClick={onRemoveSearchFilter}>
            <HiX className="w-4 h-4 text-gray-600 hover:text-red-500" />
          </button>
        </div>
      )}

      {/* Category Filters */}
      {Object.entries(selectedSubcategories).map(
        ([categoryName, subcategory]) => (
          <div
            key={categoryName}
            className="flex items-center bg-gray-100 px-2 py-1 rounded-full"
          >
            <span className="mr-2">{`${categoryName}: ${subcategory}`}</span>
            <button onClick={() => onRemoveSubcategoryFilter(categoryName)}>
              <HiX className="w-4 h-4 text-gray-600 hover:text-red-500" />
            </button>
          </div>
        )
      )}
    </div>
  );
};
