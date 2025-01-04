// src/store/registrationStore.ts
import { create } from "zustand";
import { FormData } from "@/components/pages/steps/step1/types";

interface DropdownState {
  isOpen: boolean;
  filteredItems: string[];
}

interface RegistrationState {
  formData: Partial<FormData>;
  errors: Record<string, { message: string }>;
  dropdowns: Record<string, DropdownState>;
  
  // Form Actions
  setFormField: (field: keyof FormData, value: any) => void;
  setError: (field: keyof FormData, error: { message: string } | null) => void;
  validateField: (field: keyof FormData, value: any) => boolean;
  validateAllFields: () => boolean;
  resetForm: () => void;
  
  // Dropdown Actions
  initDropdown: (id: string) => void;
  removeDropdown: (id: string) => void;
  setDropdownState: (id: string, updates: Partial<DropdownState>) => void;
  filterDropdownItems: (id: string, items: string[], searchValue: string) => void;
}

const initialFormData: Partial<FormData> = {
  brandTags: [],
  agree: false,
};

const validators: Record<keyof FormData, (val: any) => boolean> = {
  name: (val) => Boolean(val?.trim()),
  email: (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val || ""),
  password: (val) => (val?.length || 0) >= 6,
  category: (val) => Boolean(val?.trim()),
  subcategory: (val) => Boolean(val?.trim()),
  brandTags: (val) => Array.isArray(val) && val.length > 0,
  country: (val) => Boolean(val?.trim()),
  agree: (val) => Boolean(val),
};

export const useRegistrationStore = create<RegistrationState>((set, get) => ({
  formData: initialFormData,
  errors: {},
  dropdowns: {},

  setFormField: (field, value) => {
    set((state) => ({
      formData: { ...state.formData, [field]: value }
    }));
  },

  setError: (field, error) => {
    set((state) => ({
      errors: {
        ...state.errors,
        [field]: error || undefined
      }
    }));
  },

  validateField: (field, value) => {
    const isValid = validators[field]?.(value) ?? true;
    const errorMessage = isValid ? null : { 
      message: `${field.charAt(0).toUpperCase() + field.slice(1)} is required` 
    };
    get().setError(field, errorMessage);
    return isValid;
  },

  validateAllFields: () => {
    const { formData } = get();
    const requiredFields: (keyof FormData)[] = [
      "name",
      "country",
      "category",
      "subcategory",
      "brandTags",
      "agree",
    ];

    let isValid = true;
    const newErrors: Record<string, { message: string }> = {};

    requiredFields.forEach((field) => {
      const fieldValue = formData[field];
      const fieldIsValid = validators[field]?.(fieldValue) ?? true;
      
      if (!fieldIsValid) {
        isValid = false;
        newErrors[field] = {
          message: `${field.charAt(0).toUpperCase() + field.slice(1)} is required`
        };
      }
    });

    set({ errors: newErrors });
    return isValid;
  },

  resetForm: () => {
    set({ formData: initialFormData, errors: {} });
  },

  initDropdown: (id) => {
    set((state) => ({
      dropdowns: {
        ...state.dropdowns,
        [id]: { isOpen: false, filteredItems: [] }
      }
    }));
  },

  removeDropdown: (id) => {
    set((state) => {
      const newDropdowns = { ...state.dropdowns };
      delete newDropdowns[id];
      return { dropdowns: newDropdowns };
    });
  },

  setDropdownState: (id, updates) => {
    set((state) => ({
      dropdowns: {
        ...state.dropdowns,
        [id]: { ...state.dropdowns[id], ...updates }
      }
    }));
  },

  filterDropdownItems: (id, items, searchValue) => {
    const filtered = items.filter((item) =>
      item.toLowerCase().includes(searchValue.toLowerCase())
    );
    get().setDropdownState(id, { filteredItems: filtered });
  },
}));