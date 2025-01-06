import { create } from "zustand";
import { ExtendedFormData } from "../types";

interface FormStore {
  formData: Partial<ExtendedFormData>;
  registrationId?: string;
  setFormData: (data: Partial<ExtendedFormData>, registrationId?: string) => void;
  resetForm: () => void;
}

export const useFormStore = create<FormStore>((set) => ({
  formData: {},
  registrationId: undefined,
  setFormData: (data, registrationId) =>
    set((state) => ({
      formData: { ...state.formData, ...data },
      registrationId,
    })),
  resetForm: () => set({ formData: {}, registrationId: undefined }),
}));