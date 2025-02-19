// bannerStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ZOOM_SETTINGS, DEFAULT_IMAGE } from "../utils/constants";
import i18next from "@/utils/i18n/utils/i18n";

interface BannerState {
  image: string;
  title: string;
  zoom: number;
  isEditing: boolean;
  isTitleEditing: boolean; // New state for title editing
  error?: string;

  // Temporary states for modal
  tempImage: string;
  tempTitle: string;
  tempZoom: number;

  // Actions
  openEditor: () => void;
  closeEditor: () => void;
  setTempImage: (image: string) => void;
  setTempTitle: (title: string) => void;
  setTempZoom: (zoom: number) => void;
  setError: (error?: string) => void;
  setTitleEditing: (isEditing: boolean) => void; // New action
  saveBanner: () => void;
  resetBanner: () => void;
  updateBanner: (file: File, maxSizeMB: number) => Promise<void>;
}

export const useBannerStore = create<BannerState>()(
  persist(
    (set, get) => ({
      // Persistent state
      image: DEFAULT_IMAGE,
      title: i18next.t("translation:banner.coverImage.defaultTitle"),
      zoom: ZOOM_SETTINGS.default,

      // UI state (not persisted)
      isEditing: false,
      isTitleEditing: false, // Initialize title editing state
      error: undefined,
      tempImage: DEFAULT_IMAGE,
      tempTitle: i18next.t("translation:banner.coverImage.defaultTitle"),
      tempZoom: ZOOM_SETTINGS.default,

      openEditor: () =>
        set((state) => ({
          isEditing: true,
          tempImage: state.image,
          tempTitle: state.title,
          tempZoom: state.zoom,
          error: undefined,
        })),

      closeEditor: () =>
        set({
          isEditing: false,
          isTitleEditing: false,
          error: undefined,
        }),

      setTempImage: (image: string) => set({ tempImage: image }),
      setTempTitle: (title: string) => set({ tempTitle: title }),
      setTempZoom: (zoom: number) => set({ tempZoom: zoom }),
      setError: (error?: string) => set({ error }),
      setTitleEditing: (isEditing: boolean) =>
        set({ isTitleEditing: isEditing }),

      saveBanner: () =>
        set((state) => ({
          image: state.tempImage,
          title: state.tempTitle,
          zoom: state.tempZoom,
          isEditing: false,
          isTitleEditing: false,
          error: undefined,
        })),

      resetBanner: () =>
        set({
          tempImage: DEFAULT_IMAGE,
          tempTitle: i18next.t("translation:banner.coverImage.defaultTitle"),
          tempZoom: ZOOM_SETTINGS.default,
          error: undefined,
        }),

      updateBanner: async (file: File, maxSizeMB: number) => {
        if (!file) return;

        if (file.size > maxSizeMB * 1024 * 1024) {
          set({ error: `File size must be less than ${maxSizeMB}MB` });
          return;
        }

        try {
          const reader = new FileReader();
          reader.onloadend = () => {
            set({
              tempImage: reader.result as string,
              error: undefined,
            });
          };
          reader.readAsDataURL(file);
        } catch (error) {
          set({ error: "Error processing image" });
        }
      },
    }),
    {
      name: "banner-storage",
      partialize: (state) => ({
        image: state.image,
        title: state.title,
        zoom: state.zoom,
      }),
    }
  )
);
