import { create } from "zustand";
import { Tier, TierFormData } from "../types/tier";
import { DEFAULT_IMAGE } from "../utils/constants";
import { v4 as uuidv4 } from "uuid";
import { TierService } from "@/services/tierService";

interface TierState {
  tiers: Tier[];
  isLoading: boolean;
  error: string | null;
  isModalOpen: boolean;
  editingIndex: number | null;
  imagePreview: string | null;
  deleteConfirmation: {
    show: boolean;
    index: number | null;
  };

  // Actions
  fetchTiers: () => Promise<void>;
  createTier: (data: TierFormData) => Promise<void>;
  updateTier: (id: string, data: Partial<TierFormData>) => Promise<void>;
  deleteTier: (id: string) => Promise<void>;
  setError: (error: string | null) => void;

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

  // Delete confirmation
  showDeleteConfirmation: (index: number) => void;
  hideDeleteConfirmation: () => void;
  confirmDelete: () => void;
}

export const useTierStore = create<TierState>((set, get) => ({
  tiers: [],
  isLoading: false,
  error: null,
  isModalOpen: false,
  editingIndex: null,
  imagePreview: null,
  deleteConfirmation: {
    show: false,
    index: null,
  },

  fetchTiers: async () => {
    set({ isLoading: true, error: null });
    try {
      const tiers = await TierService.getTiers();
      set({ tiers, isLoading: false });
    } catch (error) {
      set({ error: "Failed to fetch tiers", isLoading: false });
    }
  },

  createTier: async (data: TierFormData) => {
    set({ isLoading: true, error: null });
    try {
      const newTier = await TierService.createTier(data);
      set((state) => ({
        tiers: [...state.tiers, newTier],
        isLoading: false,
        isModalOpen: false,
      }));
    } catch (error) {
      set({ error: "Failed to create tier", isLoading: false });
    }
  },

  updateTier: async (id: string, data: Partial<TierFormData>) => {
    set({ isLoading: true, error: null });
    try {
      const updatedTier = await TierService.updateTier(id, data);
      set((state) => ({
        tiers: state.tiers.map((tier) => (tier.id === id ? updatedTier : tier)),
        isLoading: false,
        isModalOpen: false,
      }));
    } catch (error) {
      set({ error: "Failed to update tier", isLoading: false });
    }
  },

  deleteTier: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      await TierService.deleteTier(id);
      set((state) => ({
        tiers: state.tiers.filter((tier) => tier.id !== id),
        isLoading: false,
        deleteConfirmation: { show: false, index: null },
      }));
    } catch (error) {
      set({ error: "Failed to delete tier", isLoading: false });
    }
  },

  setError: (error) => set({ error }),

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
      id: editingIndex !== null ? tiers[editingIndex].id : uuidv4(),
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
