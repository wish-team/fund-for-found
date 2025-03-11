import { useState, useMemo } from "react";
import axios from "axios";
import { Brand, Category } from "../types/brand";
import {
  filterBrands,
  getUniqueCountries,
  paginateBrands,
} from "../utils/filterUtils";

export const useCategoryFilter = (brandsPerPage: number = 9) => {
  // State for categories, loading, and error
  const [categories, setCategories] = useState<Category[]>([]);
  const [allBrands, setAllBrands] = useState<Brand[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // State to track selected subcategories
  const [selectedSubcategories, setSelectedSubcategories] = useState<{
    [key: string]: string;
  }>({});
  const [selectedCountry, setSelectedCountry] =
    useState<string>("All Countries");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);

  // Extract unique countries from all brands
  const [countries, setCountries] = useState<string[]>([]);

  // Fetch brands from API and organize into categories
  const fetchCategories = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get<Brand[]>("https://fund-for-found-y4d1.onrender.com/brand");
      const brands = response.data;

      // Log the first brand to see image URLs
      console.log('First brand data:', brands[0]);

      // Set all brands
      setAllBrands(brands);

      // Extract unique countries from brands
      const uniqueCountries = Array.from(new Set(brands.map((brand: Brand) => brand.brand_country)));
      setCountries(["All Countries", ...uniqueCountries]);

      // Extract unique tags and create categories
      const tagCategories = brands.reduce((acc: Category[], brand: Brand) => {
        brand.brand_tags.forEach(tag => {
          const existingCategory = acc.find(cat => cat.name === tag);
          if (!existingCategory) {
            acc.push({
              name: tag,
              subcategories: [{
                name: tag,
                brands: [brand]
              }]
            });
          } else {
            existingCategory.subcategories[0].brands.push(brand);
          }
        });
        return acc;
      }, []);

      setCategories(tagCategories);
      setIsLoading(false);
    } catch (err) {
      setError("Failed to fetch brands. Please try again later.");
      setIsLoading(false);
      console.error("Error fetching brands:", err);
    }
  };

  // Memoized search and filter results
  const filteredBrands = useMemo(() => {
    return allBrands.filter(brand => {
      // Filter by search term
      const matchesSearch = searchTerm === "" || 
        brand.brand_name.toLowerCase().includes(searchTerm.toLowerCase());

      // Filter by country
      const matchesCountry = selectedCountry === "All Countries" || 
        brand.brand_country === selectedCountry;

      // Filter by selected subcategories (tags)
      const matchesTag = Object.values(selectedSubcategories).length === 0 || 
        Object.values(selectedSubcategories).some(tag => 
          brand.brand_tags.includes(tag)
        );

      return matchesSearch && matchesCountry && matchesTag;
    });
  }, [allBrands, searchTerm, selectedCountry, selectedSubcategories]);

  // Paginated results
  const paginatedResults = useMemo(
    () => paginateBrands(filteredBrands, currentPage, brandsPerPage),
    [filteredBrands, currentPage]
  );

  // Handlers
  const handleSubcategorySelect = (
    categoryName: string,
    subcategory: string
  ) => {
    setSelectedSubcategories((prev) => ({
      ...prev,
      [categoryName]: subcategory,
    }));
    setCurrentPage(1);
  };

  const handleRemoveSubcategoryFilter = (categoryName: string) => {
    const updatedSubcategories = { ...selectedSubcategories };
    delete updatedSubcategories[categoryName];
    setSelectedSubcategories(updatedSubcategories);
    setCurrentPage(1);
  };

  const handleRemoveCountryFilter = () => {
    setSelectedCountry("All Countries");
    setCurrentPage(1);
  };

  const handleRemoveSearchFilter = () => {
    setSearchTerm("");
    setCurrentPage(1);
  };

  return {
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
  };
};
