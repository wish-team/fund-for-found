// stores/tierStore.ts
import { create } from "zustand";
import { Tier, TierFormData } from "../types/tier";
import { DEFAULT_IMAGE } from "../utils/constants";

interface TierState {
  tiers: Tier[];
  isModalOpen: boolean;
  editingIndex: number | null;
  imagePreview: string | null;
  deleteConfirmation: {
    show: boolean;
    index: number | null;
  };

  // Modal actions
  openModal: () => void;
  closeModal: () => void;
  editTier: (index: number) => void;

  // Image actions
  setImagePreview: (preview: string | null) => void;
  handleImageChange: (file: File) => void;
  resetImagePreview: () => void;

  // Tier management
  initializeTiers: () => void;
  handleSubmit: (data: TierFormData) => void;
  deleteTier: (index: number) => void;

  // Delete confirmation
  showDeleteConfirmation: (index: number) => void;
  hideDeleteConfirmation: () => void;
  confirmDelete: () => void;
}

export const useTierStore = create<TierState>((set, get) => ({
  tiers: [],
  isModalOpen: false,
  editingIndex: null,
  imagePreview: null,
  deleteConfirmation: {
    show: false,
    index: null,
  },

  openModal: () => set({ isModalOpen: true }),
  closeModal: () => {
    set({
      isModalOpen: false,
      editingIndex: null,
      imagePreview: null,
    });
  },

  editTier: (index: number) => {
    const { tiers } = get();
    const tier = tiers[index];
    set({
      editingIndex: index,
      isModalOpen: true,
      imagePreview: tier.imagePreview,
    });
  },

  setImagePreview: (preview) => set({ imagePreview: preview }),

  handleImageChange: (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      set({ imagePreview: reader.result as string });
    };
    reader.readAsDataURL(file);
  },

  resetImagePreview: () => set({ imagePreview: null }),

  initializeTiers: () => {
    const savedTiers = localStorage.getItem("tiers");
    if (savedTiers) {
      set({ tiers: JSON.parse(savedTiers) });
    }
  },

  handleSubmit: (data: TierFormData) => {
    const { tiers, editingIndex, imagePreview } = get();
    const newTiers = [...tiers];
    const submissionData = {
      name: data.name,
      rewardDescription: data.rewardDescription,
      amount: data.amount,
      imagePreview: imagePreview || DEFAULT_IMAGE,
    };

    if (editingIndex !== null) {
      newTiers[editingIndex] = submissionData;
    } else {
      newTiers.push(submissionData);
    }

    localStorage.setItem("tiers", JSON.stringify(newTiers));
    set({
      tiers: newTiers,
      isModalOpen: false,
      editingIndex: null,
      imagePreview: null,
    });
  },

  deleteTier: (index: number) => {
    set((state) => ({
      deleteConfirmation: {
        show: true,
        index,
      },
    }));
  },

  showDeleteConfirmation: (index: number) =>
    set({ deleteConfirmation: { show: true, index } }),

  hideDeleteConfirmation: () =>
    set({ deleteConfirmation: { show: false, index: null } }),

  confirmDelete: () => {
    const { deleteConfirmation, tiers } = get();
    if (deleteConfirmation.index !== null) {
      const newTiers = tiers.filter((_, i) => i !== deleteConfirmation.index);
      localStorage.setItem("tiers", JSON.stringify(newTiers));
      set({
        tiers: newTiers,
        deleteConfirmation: { show: false, index: null },
      });
    }
  },
}));
