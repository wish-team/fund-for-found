import { create } from "zustand";
import { FormData } from "../types";

interface FormStore {
  formData: Partial<FormData>;
  registrationId?: string;
  setFormData: (data: Partial<FormData>, registrationId?: string) => void;
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