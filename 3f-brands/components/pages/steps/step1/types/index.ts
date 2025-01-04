export interface FormData {
  name: string;
  email: string;
  password: string;
  category: string;
  subcategory: string;
  brandTags: string[];
  country: string;
  agree: boolean;
}

export interface InputProps {
  data: string[];
  label: string;
  fieldName: keyof FormData;  // Changed from string to keyof FormData
  error?: any;
}

export interface DropdownState {
  isOpen: boolean;
  filteredItems: string[];
}