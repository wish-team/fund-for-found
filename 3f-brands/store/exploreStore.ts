import { create } from 'zustand';
import axios from 'axios';
import { Brand, Category } from '@/components/features/explore/types/brand';
import { filterBrands, paginateBrands } from '@/components/features/explore/utils/filterUtils';
import { BRANDS_PER_PAGE } from '@/components/features/explore/utils/constants';

interface ExploreState {
  // Data
  brands: Brand[];
  categories: Category[];
  countries: string[];
  
  // UI State
  isLoading: boolean;
  error: string | null;
  
  // Filters
  searchTerm: string;
  selectedCountry: string;
  selectedSubcategories: { [key: string]: string };
  currentPage: number;
  
  // Computed Values
  filteredBrands: Brand[];
  paginatedResults: Brand[];
  
  // Actions
  fetchBrands: () => Promise<void>;
  updateFilteredResults: () => void;
  setSearchTerm: (term: string) => void;
  setSelectedCountry: (country: string) => void;
  setCurrentPage: (page: number) => void;
  handleSubcategorySelect: (categoryName: string, subcategory: string) => void;
  handleRemoveSubcategoryFilter: (categoryName: string) => void;
  handleRemoveCountryFilter: () => void;
  handleRemoveSearchFilter: () => void;
}

export const useExploreStore = create<ExploreState>((set, get) => ({
  // Initial State
  brands: [],
  categories: [],
  countries: [],
  isLoading: false,
  error: null,
  searchTerm: '',
  selectedCountry: 'All Countries',
  selectedSubcategories: {},
  currentPage: 1,
  filteredBrands: [],
  paginatedResults: [],

  // Actions
  fetchBrands: async () => {
    try {
      set({ isLoading: true, error: null });
      const response = await axios.get<Brand[]>('/api/brands');
      const brands = response.data;

      // Extract unique countries
      const uniqueCountries = Array.from(new Set(brands.map(brand => brand.brand_country)));
      
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

      set({
        brands,
        categories: tagCategories,
        countries: ['All Countries', ...uniqueCountries],
        isLoading: false,
      });

      // Update filtered and paginated results
      get().updateFilteredResults();
    } catch (err) {
      set({
        error: 'Failed to fetch brands. Please try again later.',
        isLoading: false,
      });
      console.error('Error fetching brands:', err);
    }
  },

  // Helper function to update filtered and paginated results
  updateFilteredResults: () => {
    const { brands, searchTerm, selectedCountry, selectedSubcategories, categories, currentPage } = get();
    const filtered = filterBrands(brands, searchTerm, selectedCountry, selectedSubcategories, categories);
    const paginated = paginateBrands(filtered, currentPage, BRANDS_PER_PAGE);
    set({ filteredBrands: filtered, paginatedResults: paginated });
  },

  // Filter Actions
  setSearchTerm: (term: string) => {
    set({ searchTerm: term, currentPage: 1 });
    get().updateFilteredResults();
  },

  setSelectedCountry: (country: string) => {
    set({ selectedCountry: country, currentPage: 1 });
    get().updateFilteredResults();
  },

  setCurrentPage: (page: number) => {
    set({ currentPage: page });
    get().updateFilteredResults();
  },

  handleSubcategorySelect: (categoryName: string, subcategory: string) => {
    set(state => ({
      selectedSubcategories: {
        ...state.selectedSubcategories,
        [categoryName]: subcategory
      },
      currentPage: 1
    }));
    get().updateFilteredResults();
  },

  handleRemoveSubcategoryFilter: (categoryName: string) => {
    set(state => {
      const updatedSubcategories = { ...state.selectedSubcategories };
      delete updatedSubcategories[categoryName];
      return {
        selectedSubcategories: updatedSubcategories,
        currentPage: 1
      };
    });
    get().updateFilteredResults();
  },

  handleRemoveCountryFilter: () => {
    set({ selectedCountry: 'All Countries', currentPage: 1 });
    get().updateFilteredResults();
  },

  handleRemoveSearchFilter: () => {
    set({ searchTerm: '', currentPage: 1 });
    get().updateFilteredResults();
  },
}));
