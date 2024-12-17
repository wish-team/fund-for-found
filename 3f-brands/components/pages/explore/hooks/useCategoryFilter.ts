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

  // Fetch categories from API
  const fetchCategories = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("http://localhost:8000/categories");

      // Ensure we're getting the correct data structure
      let categoriesData = [];
      if (response.data && Array.isArray(response.data)) {
        categoriesData = response.data;
        setCategories(response.data);
      } else if (
        response.data.categories &&
        Array.isArray(response.data.categories)
      ) {
        categoriesData = response.data.categories;
        setCategories(response.data.categories);
      } else {
        throw new Error("Invalid data structure");
      }

      // Extract all brands and unique countries
      const brandsFromCategories = categoriesData.flatMap((category) =>
        category.subcategories.flatMap((subcategory) => subcategory.brands)
      );

      setAllBrands(brandsFromCategories);
      setCountries(getUniqueCountries(brandsFromCategories));

      setIsLoading(false);
    } catch (err) {
      setError("Failed to fetch categories. Please try again later.");
      setIsLoading(false);
      console.error("Error fetching categories:", err);
    }
  };

  // Memoized search and filter results
  const filteredBrands = useMemo(
    () =>
      filterBrands(
        allBrands,
        searchTerm,
        selectedCountry,
        selectedSubcategories,
        categories
      ),
    [allBrands, searchTerm, selectedCountry, selectedSubcategories, categories]
  );

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
