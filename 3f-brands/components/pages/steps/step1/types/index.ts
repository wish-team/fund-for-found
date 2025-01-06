// In index.ts
export interface FormData {
  name: string;
  category: string;
  subcategory: string;
  brandTags: string[];
  country: string;
  agree: boolean;
  email?: string;  // Make these optional
  password?: string;
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