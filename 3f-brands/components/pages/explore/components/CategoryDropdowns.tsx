"use client";
import React, { useEffect } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";

import { useCategoryFilter } from "../hooks/useCategoryFilter";
import { ActiveFilters } from "./ActiveFilters";
import { SearchCountryFilter } from "./SearchCountryFilter";
import { BrandDisplay } from "./BrandDisplay";
import Loader from "@/components/shared/loader/Loader";

const BRANDS_PER_PAGE = 9;

export const CategoryDropdowns: React.FC = () => {
  const {
    categories,
    isLoading,
    error,
    countries,
    filteredBrands,
    paginatedResults,
    currentPage,
    selectedSubcategories,
    selectedCountry,
    searchTerm,
    fetchCategories,
    setSearchTerm,
    setSelectedCountry,
    setCurrentPage,
    handleSubcategorySelect,
    handleRemoveSubcategoryFilter,
    handleRemoveCountryFilter,
    handleRemoveSearchFilter,
  } = useCategoryFilter(BRANDS_PER_PAGE);

  // Fetch categories on component mount
  useEffect(() => {
    fetchCategories();
  }, []);

  // Loading state
  if (isLoading) {
    return (
      <div className="w-full min-h-[100vh] grid place-content-center">
        <Loader />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="p-6 bg-red-50 text-red-600 text-center">
        <p className="text-xl">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="border rounded-3xl p-8 shadow">
        <div className="">
          {/* Search and Country Filter */}
          <SearchCountryFilter
            searchTerm={searchTerm}
            countries={countries}
            selectedCountry={selectedCountry}
            onSearchChange={setSearchTerm}
            onCountrySelect={setSelectedCountry}
          />
        </div>
        {/* Category Dropdowns */}
        <div className="w-full grid md:grid-cols-5 gap-4">
          {categories.map((category) => (
            <div key={category.name} className="">
              <Dropdown>
                <DropdownTrigger>
                  <Button
                    variant="bordered"
                    className="bg-light3 w-full border border-primary200 hover:bg-primary50 hover:border-purple-500 rounded-lg text-gray4 text-xs"
                  >
                    {selectedSubcategories[category.name] || category.name}
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  className="bg-white border shadow-sm rounded-lg text-gray3 text-sm"
                  aria-label={`${category.name} subcategories`}
                  onAction={(key) => {
                    const subcategory = key.toString();
                    handleSubcategorySelect(category.name, subcategory);
                  }}
                >
                  {category.subcategories.map((subcategory) => (
                    <DropdownItem
                      className="hover:bg-primary50"
                      key={subcategory.name}
                    >
                      {subcategory.name}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
            </div>
          ))}
        </div>
        {/* Active Filters */}
        <ActiveFilters
          selectedSubcategories={selectedSubcategories}
          selectedCountry={selectedCountry}
          searchTerm={searchTerm}
          onRemoveCountryFilter={handleRemoveCountryFilter}
          onRemoveSearchFilter={handleRemoveSearchFilter}
          onRemoveSubcategoryFilter={handleRemoveSubcategoryFilter}
        />
      </div>

      {/* Brand Display */}
      <BrandDisplay
        filteredBrands={filteredBrands}
        paginatedResults={paginatedResults}
        currentPage={currentPage}
        brandsPerPage={BRANDS_PER_PAGE}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default CategoryDropdowns;
