import { Brand, Category } from "../types/brand";

export const filterBrands = (
  allBrands: Brand[],
  searchTerm: string,
  selectedCountry: string,
  selectedSubcategories: { [key: string]: string },
  categories: Category[]
): Brand[] => {
  let results = allBrands;

  // Filter by search term
  if (searchTerm) {
    results = results.filter(
      (brand) =>
        brand.brand_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  // Filter by country
  if (selectedCountry !== "All Countries") {
    results = results.filter((brand) => brand.brand_country === selectedCountry);
  }

  // Filter by selected tags (subcategories)
  results = results.filter((brand) => {
    // If no subcategories are selected, return all brands
    if (Object.keys(selectedSubcategories).length === 0) return true;

    // Check if the brand has any of the selected tags
    return Object.values(selectedSubcategories).some(tag => 
      brand.brand_tags.includes(tag)
    );
  });

  return results;
};

export const getUniqueCountries = (brands: Brand[]): string[] => {
  return [
    "All Countries",
    ...Array.from(new Set(brands.map((brand) => brand.brand_country))),
  ];
};

export const paginateBrands = (
  filteredBrands: Brand[],
  currentPage: number,
  brandsPerPage: number
): Brand[] => {
  const startIndex = (currentPage - 1) * brandsPerPage;
  return filteredBrands.slice(startIndex, startIndex + brandsPerPage);
};
