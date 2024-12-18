export interface Brand {
  name: string;
  description: string;
  country: string;
  contributors: number;
  moneyRaised: number;
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
