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
        brand.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        brand.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  // Filter by country
  if (selectedCountry !== "All Countries") {
    results = results.filter((brand) => brand.country === selectedCountry);
  }

  // Filter by selected subcategories
  results = results.filter((brand) => {
    // If no subcategories are selected, return all brands
    if (Object.keys(selectedSubcategories).length === 0) return true;

    // Check if the brand belongs to any of the selected subcategories
    return categories.some((category) => {
      if (selectedSubcategories[category.name]) {
        return category.subcategories
          .find((sub) => sub.name === selectedSubcategories[category.name])
          ?.brands.includes(brand);
      }
      return false;
    });
  });

  return results;
};

export const getUniqueCountries = (brands: Brand[]): string[] => {
  return [
    "All Countries",
    ...Array.from(new Set(brands.map((brand) => brand.country))),
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
