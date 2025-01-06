import { create } from "zustand";
import { FormData } from "../types";

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
  filterDropdownItems: (
    id: string,
    items: string[],
    searchValue: string
  ) => void;
}

const initialFormData: Partial<FormData> = {
  name: "",
  email: "default@email.com",  // Add a default value
  password: "defaultpass",     // Add a default value
  category: "",
  subcategory: "",
  brandTags: [],
  country: "",
  agree: false,
};

const validators: Record<keyof FormData, (val: any) => boolean> = {
  name: (val) => Boolean(val?.trim()),
  email: () => true,  // Since we don't collect email in this step
  password: () => true,  // Since we don't collect password in this step
  category: (val) => Boolean(val?.trim()),
  subcategory: (val) => Boolean(val?.trim()),
  brandTags: (val) => Array.isArray(val) && val.length > 0,
  country: (val) => Boolean(val?.trim()),
  agree: (val) => Boolean(val),
};

const errorMessages: Record<keyof FormData, string> = {
  name: "Brand/Organisation Name is required",
  email: "",  // No message needed
  password: "",  // No message needed
  category: "Category is required",
  subcategory: "Subcategory is required",
  brandTags: "At least one brand tag is required",
  country: "Country is required",
  agree: "You must agree to the terms of service",
};
export const useRegistrationStore = create<RegistrationState>((set, get) => ({
  formData: initialFormData,
  errors: {},
  dropdowns: {},

  setFormField: (field, value) => {
    set((state) => ({
      formData: { ...state.formData, [field]: value },
    }));
    // Validate field on change
    get().validateField(field, value);
  },

  setError: (field, error) => {
    set((state) => ({
      errors: error
        ? { ...state.errors, [field]: error }
        : Object.fromEntries(
            Object.entries(state.errors).filter(([key]) => key !== field)
          ),
    }));
  },

  validateField: (field, value) => {
    const isValid = validators[field]?.(value) ?? true;
    const errorMessage = isValid
      ? null
      : {
          message: errorMessages[field] || `${field} is required`,
        };
    get().setError(field, errorMessage);
    return isValid;
  },

  validateAllFields: () => {
    const { formData } = get();
    let isValid = true;
    const newErrors: Record<string, { message: string }> = {};

    // Get all required fields from validators
    const requiredFields = Object.keys(validators) as (keyof FormData)[];

    requiredFields.forEach((field) => {
      const fieldValue = formData[field];
      const fieldIsValid = validators[field]?.(fieldValue) ?? true;

      if (!fieldIsValid) {
        isValid = false;
        newErrors[field] = {
          message: errorMessages[field] || `${field} is required`,
        };
      }
    });

    set({ errors: newErrors });
    return isValid;
  },

  resetForm: () => {
    set({
      formData: initialFormData,
      errors: {},
      dropdowns: {},
    });
  },

  initDropdown: (id) => {
    set((state) => ({
      dropdowns: {
        ...state.dropdowns,
        [id]: { isOpen: false, filteredItems: [] },
      },
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
        [id]: {
          ...state.dropdowns[id],
          ...updates,
        },
      },
    }));
  },

  filterDropdownItems: (id, items, searchValue) => {
    const filtered = items.filter((item) =>
      item.toLowerCase().includes(searchValue.toLowerCase())
    );
    get().setDropdownState(id, { filteredItems: filtered });
  },
}));

// Optional: Add a middleware to persist form data in localStorage
useRegistrationStore.subscribe((state) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(
      "registrationFormData",
      JSON.stringify(state.formData)
    );
  }
});

// Optional: Add method to hydrate form data from localStorage
export const hydrateRegistrationStore = () => {
  if (typeof window !== "undefined") {
    const storedData = localStorage.getItem("registrationFormData");
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        useRegistrationStore.setState({
          formData: {
            ...initialFormData,
            ...parsedData,
          },
        });
      } catch (error) {
        console.error("Error hydrating registration store:", error);
      }
    }
  }
};
