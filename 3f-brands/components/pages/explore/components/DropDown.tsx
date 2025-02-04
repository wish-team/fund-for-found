"use client";
import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import { HiX } from "react-icons/hi";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { 
  Dropdown, 
  DropdownTrigger, 
  DropdownMenu, 
  DropdownItem, 
  Button,
  Input,
  Pagination,
} from "@nextui-org/react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

// Types remain the same as in the previous implementation
interface Brand {
  name: string;
  description: string;
  country: string;
  contributors: number;
  moneyRaised: number;
}

interface Subcategory {
  name: string;
  brands: Brand[];
}

interface Category {
  name: string;
  subcategories: Subcategory[];
}

interface SearchFormData {
  searchTerm: string;
}

// Reuse the BrandCard component
const BrandCard: React.FC<{ brand: Brand }> = ({ brand }) => {
  return (
    <div className="border rounded-lg p-4 shadow-md bg-white">
      <h3 className="text-lg font-bold mb-2">{brand.name}</h3>
      <p className="text-gray-600 mb-2">{brand.description}</p>
      <div className="grid grid-cols-2 gap-2 text-sm">
        <div>
          <strong>Country:</strong> {brand.country}
        </div>
        <div>
          <strong>Contributors:</strong> {brand.contributors}
        </div>
        <div>
          <strong>Money Raised:</strong> ${brand.moneyRaised.toLocaleString()}
        </div>
      </div>
    </div>
  );
};

const CategoryDropdowns: React.FC = () => {
  // State for categories, loading, and error
  const [categories, setCategories] = useState<Category[]>([]);
  const [allBrands, setAllBrands] = useState<Brand[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // State to track selected subcategories
  const [selectedSubcategories, setSelectedSubcategories] = useState<{[key: string]: string}>({});
  const [selectedCountry, setSelectedCountry] = useState<string>("All Countries");

  // Extract unique countries from all brands
  const [countries, setCountries] = useState<string[]>([]);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const BRANDS_PER_PAGE = 9;

  // React Hook Form for search
  const { control, watch, setValue } = useForm<SearchFormData>({
    defaultValues: {
      searchTerm: "",
    }
  });
  const searchTerm = watch("searchTerm");

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get('http://localhost:8000/categories');
        
        // Ensure we're getting the correct data structure
        let categoriesData = [];
        if (response.data && Array.isArray(response.data)) {
          categoriesData = response.data;
          setCategories(response.data);
        } else if (response.data.categories && Array.isArray(response.data.categories)) {
          categoriesData = response.data.categories;
          setCategories(response.data.categories);
        } else {
          throw new Error('Invalid data structure');
        }
        
        // Extract all brands and unique countries
        const brandsFromCategories = categoriesData.flatMap(category => 
          category.subcategories.flatMap(subcategory => subcategory.brands)
        );
        
        setAllBrands(brandsFromCategories);
        
        const uniqueCountries = ["All Countries", ...Array.from(new Set(brandsFromCategories.map(brand => brand.country)))];        setCountries(uniqueCountries);
        
        setIsLoading(false);

      } catch (err) {
        setError('Failed to fetch categories. Please try again later.');
        setIsLoading(false);
        console.error('Error fetching categories:', err);
      }
    };

    fetchCategories();
  }, []);

  // Memoized search and filter results
  const filteredBrands = useMemo(() => {
    let results = allBrands;

    // Filter by search term
    if (searchTerm) {
      results = results.filter(brand => 
        brand.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        brand.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by country
    if (selectedCountry !== "All Countries") {
      results = results.filter(brand => brand.country === selectedCountry);
    }

    // Filter by selected subcategories
    results = results.filter(brand => {
      // If no subcategories are selected, return all brands
      if (Object.keys(selectedSubcategories).length === 0) return true;

      // Check if the brand belongs to any of the selected subcategories
      return categories.some(category => {
        if (selectedSubcategories[category.name]) {
          return category.subcategories
            .find(sub => sub.name === selectedSubcategories[category.name])
            ?.brands.includes(brand);
        }
        return false;
      });
    });

    return results;
  }, [allBrands, searchTerm, selectedCountry, selectedSubcategories, categories]);

  // Pagination logic
  const paginatedResults = useMemo(() => {
    const startIndex = (currentPage - 1) * BRANDS_PER_PAGE;
    return filteredBrands.slice(startIndex, startIndex + BRANDS_PER_PAGE);
  }, [filteredBrands, currentPage]);

  // Handler for dropdown selection
  const handleSelect = (categoryName: string, subcategory: string) => {
    // Update selected subcategories
    setSelectedSubcategories((prev) => ({
      ...prev,
      [categoryName]: subcategory,
    }));
    
    // Reset to first page
    setCurrentPage(1);
  };

  // Handler for removing a category filter
  const handleRemoveFilter = (categoryName: string) => {
    // Create a new object without the specified category
    const updatedSubcategories = { ...selectedSubcategories };
    delete updatedSubcategories[categoryName];
    
    // Update the state
    setSelectedSubcategories(updatedSubcategories);
    
    // Reset to first page
    setCurrentPage(1);
  };

  // Handler for removing country filter
  const handleRemoveCountryFilter = () => {
    setSelectedCountry("All Countries");
    setCurrentPage(1);
  };

  // Handler for removing search filter
  const handleRemoveSearchFilter = () => {
    // Reset the search term
    setValue("searchTerm", "");
    setCurrentPage(1);
  };

  // Pagination render item function for desktop
  const renderPaginationItem = ({
    ref,
    key,
    value,
    isActive,
    onNext,
    onPrevious,
    setPage,
    className,
  }: any) => {
    if (value === "next") {
      return (
        <button
          key={key}
          className={`${className} bg-default-200/50 min-w-8 w-8 h-8`}
          onClick={onNext}
        >
          <MdKeyboardArrowRight className="w-6 h-6" />
        </button>
      );
    }

    if (value === "prev") {
      return (
        <button
          key={key}
          className={`${className} bg-default-200/50 min-w-8 w-8 h-8`}
          onClick={onPrevious}
        >
          <MdKeyboardArrowLeft className="w-6 h-6" />
        </button>
      );
    }

    if (value === "dots") {
      return (
        <button key={key} className={className}>
          ...
        </button>
      );
    }

    return (
      <button
        key={key}
        ref={ref}
        className={`${className} ${isActive ? "text-white bg-gradient-to-br from-indigo-500 to-pink-500 font-bold" : ""}`}
        onClick={() => setPage(value)}
      >
        {value}
      </button>
    );
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="p-6 text-center">
        <p className="text-xl">Loading categories...</p>
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
      <h1 className="text-2xl font-bold mb-6">Category Dropdowns</h1>
      
      {/* Active Filters Section */}
      {(Object.keys(selectedSubcategories).length > 0 || 
        selectedCountry !== "All Countries" || 
        searchTerm) && (
        <div className="mb-4 flex flex-wrap gap-2">
          {/* Country Filter */}
          {selectedCountry !== "All Countries" && (
            <div className="flex items-center bg-gray-100 px-2 py-1 rounded-full">
              <span className="mr-2">{selectedCountry}</span>
              <button onClick={handleRemoveCountryFilter}>
                <HiX className="w-4 h-4 text-gray-600 hover:text-red-500" />
              </button>
            </div>
          )}

          {/* Search Filter */}
          {searchTerm && (
            <div className="flex items-center bg-gray-100 px-2 py-1 rounded-full">
              <span className="mr-2">"{searchTerm}"</span>
              <button onClick={handleRemoveSearchFilter}>
                <HiX className="w-4 h-4 text-gray-600 hover:text-red-500" />
              </button>
            </div>
          )}

          {/* Category Filters */}
          {Object.entries(selectedSubcategories).map(([categoryName, subcategory]) => (
            <div 
              key={categoryName} 
              className="flex items-center bg-gray-100 px-2 py-1 rounded-full"
            >
              <span className="mr-2">{`${categoryName}: ${subcategory}`}</span>
              <button onClick={() => handleRemoveFilter(categoryName)}>
                <HiX className="w-4 h-4 text-gray-600 hover:text-red-500" />
              </button>
            </div>
          ))}
        </div>
      )}
      
      {/* Search and Country Filter Row */}
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        {/* Search Input */}
        <Controller
          name="searchTerm"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              placeholder="Search brands by name or description"
              className="w-full"
              variant="bordered"
              onChange={(e) => {
                field.onChange(e);
                setCurrentPage(1);
              }}
            />
          )}
        />

        {/* Country Dropdown */}
        <Dropdown>
          <DropdownTrigger>
            <Button variant="bordered" className="w-full">
              {selectedCountry}
            </Button>
          </DropdownTrigger>
          <DropdownMenu 
            aria-label="Country selection"
            onAction={(key) => {
              setSelectedCountry(key.toString());
              setCurrentPage(1);
            }}
          >
            {countries.map((country) => (
              <DropdownItem key={country}>
                {country}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      </div>

      {/* Category Dropdowns */}
      <div className="grid md:grid-cols-4 gap-4">
        {categories.map((category, index) => (
          <div key={index} className="mb-6">
            <h2 className="text-xl font-semibold mb-3">{category.name}</h2>
            <Dropdown>
              <DropdownTrigger>
                <Button variant="bordered" className="w-full">
                  {selectedSubcategories[category.name] || category.name}
                </Button>
              </DropdownTrigger>
              <DropdownMenu 
                aria-label={`${category.name} subcategories`}
                onAction={(key) => {
                  const subcategory = key.toString();
                  handleSelect(category.name, subcategory);
                }}
              >
                {category.subcategories.map((subcategory) => (
                  <DropdownItem key={subcategory.name}>
                    {subcategory.name}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>
        ))}
      </div>

      {/* Brand Display Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">
          Brands
        </h2>
        {filteredBrands.length > 0 ? (
          <>
            <p className="mb-4 text-gray-600">
              {`Found ${filteredBrands.length} brand${filteredBrands.length !== 1 ? 's' : ''}`}
              {selectedCountry !== "All Countries" ? ` in ${selectedCountry}` : ''}
              {searchTerm ? ` matching "${searchTerm}"` : ''}
            </p>
            
            {/* Desktop Grid View (md and up) */}
            <div className="hidden md:grid md:grid-cols-3 gap-4 mb-6">
              {paginatedResults.map((brand, index) => (
                <BrandCard key={index} brand={brand} />
              ))}
            </div>

            {/* Mobile Slider View (below md) */}
            <div className="block md:hidden mb-6">
              <Swiper
                modules={[Navigation]}
                spaceBetween={16}
                slidesPerView={1.2}
                navigation={{
                  prevEl: '.swiper-button-prev',
                  nextEl: '.swiper-button-next',
                }}
                breakpoints={{
                  480: {
                    slidesPerView: 1.5,
                  },
                  640: {
                    slidesPerView: 2,
                  }
                }}
              >
                {filteredBrands.map((brand, index) => (
                  <SwiperSlide key={index}>
                    <BrandCard brand={brand} />
                  </SwiperSlide>
                ))}
                <div className="swiper-button-prev absolute top-1/2 left-0 z-10 cursor-pointer">
                  <MdKeyboardArrowLeft className="w-8 h-8 text-gray-700" />
                </div>
                <div className="swiper-button-next absolute top-1/2 right-0 z-10 cursor-pointer">
                  <MdKeyboardArrowRight className="w-8 h-8 text-gray-700" />
                </div>
              </Swiper>
            </div>

            {/* Desktop Pagination (md and up) */}
            <div className="hidden md:flex justify-center">
              <Pagination
                disableCursorAnimation
                showControls
                className="gap-2"
                page={currentPage}
                total={Math.ceil(filteredBrands.length / BRANDS_PER_PAGE)}
                initialPage={1}
                radius="full"
                renderItem={renderPaginationItem}
                variant="light"
                onChange={(page) => setCurrentPage(page)}
              />
            </div>

            {/* Mobile Pagination (below md) */}
            <div className="block md:hidden text-center mt-4">
              <div className="inline-flex items-center gap-2">
                <button 
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="disabled:opacity-50"
                >
                  <MdKeyboardArrowLeft className="w-8 h-8" />
                </button>
                <span>
                  Page {currentPage} of {Math.ceil(filteredBrands.length / BRANDS_PER_PAGE)}
                </span>
                <button 
                  onClick={() => setCurrentPage(Math.min(Math.ceil(filteredBrands.length / BRANDS_PER_PAGE), currentPage + 1))}
                  disabled={currentPage === Math.ceil(filteredBrands.length / BRANDS_PER_PAGE)}
                  className="disabled:opacity-50"
                >
                  <MdKeyboardArrowRight className="w-8 h-8" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="bg-gray-100 border rounded-lg p-6 text-center">
            <p className="text-gray-600 text-lg">
              No brands found matching your search or filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryDropdowns;