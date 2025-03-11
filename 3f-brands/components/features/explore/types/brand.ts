export interface Brand {
  brand_id: string;
  brand_name: string;
  background_image: string | null;
  main_image: string | null;
  brand_country: string;
  brand_tags: string[];
  total_contributions: number;
  total_contributed_amount: number;
}

export interface Subcategory {
  name: string;
  brands: Brand[];
}

export interface Category {
  name: string;
  subcategories: Subcategory[];
}

export interface SearchFormData {
  searchTerm: string;
}
