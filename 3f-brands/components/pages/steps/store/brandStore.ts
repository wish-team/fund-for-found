import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface BrandTag {
  tag_name: string;
}

interface SocialMedia {
  name: string;
  link: string;
}

export interface Brand {
  brand_name: string;
  brand_image?: string;
  about_brand: string;
  brand_country: string;
  owner_id: string;
  brand_tags: BrandTag[];
  social_media: SocialMedia[];
}

interface BrandState {
  brand: Brand | null;
  isLoading: boolean;
  error: string | null;
  setBrand: (brand: Brand) => void;
  updateBrand: (brandData: Partial<Brand>) => void;
  clearBrand: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useBrandStore = create<BrandState>()(
  devtools((set) => ({
    brand: null,
    isLoading: false,
    error: null,
    setBrand: (brand) => set({ brand, error: null }),
    updateBrand: (brandData) =>
      set((state) => ({
        brand: state.brand ? { ...state.brand, ...brandData } : null,
        error: null,
      })),
    clearBrand: () => set({ brand: null, error: null }),
    setLoading: (loading) => set({ isLoading: loading }),
    setError: (error) => set({ error }),
  }))
);
