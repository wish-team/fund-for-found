import { create } from "zustand";
import { AccordionItemType, AccordionItemUpdate } from "../types/accordion";
import {
  createAccordionItem,
  updateAccordionItem,
  deleteAccordionItem,
} from "../utils/accordionHelpers";
import { faqApi } from "../services/faqApi";

interface FAQState {
  accordionItems: AccordionItemType[];
  selectedKeys: Set<string>;
  selectedItem: AccordionItemType | null;
  setSelectedItem: (item: AccordionItemType | null) => void;
  setSelectedKeys: (keys: Set<string>) => void;
  addItem: (update?: AccordionItemUpdate) => Promise<AccordionItemType>;
  updateItem: (id: string, update: AccordionItemUpdate) => Promise<void>;
  deleteItem: (id: string) => Promise<void>;
  initializeFAQ: (items: AccordionItemType[]) => void;
  isLoading: boolean;
  error: string | null;
  fetchFAQs: () => Promise<void>;
}

export const useFAQStore = create<FAQState>((set) => ({
  accordionItems: [],
  selectedKeys: new Set<string>(),
  selectedItem: null,
  isLoading: false,
  error: null,

  setSelectedItem: (item) => set({ selectedItem: item }),

  setSelectedKeys: (keys) => set({ selectedKeys: keys }),

  fetchFAQs: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await faqApi.getAllFAQs();
      const formattedItems = data.map((item: any) => ({
        id: item.id,
        title: item.question,
        content: item.answer,
      }));
      set({ accordionItems: formattedItems });
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ isLoading: false });
    }
  },

  addItem: async (update) => {
    set({ isLoading: true, error: null });
    try {
      const response = await faqApi.createFAQ(update!);
      const newItem = {
        id: response.id,
        title: response.question,
        content: response.answer,
      };
      set((state) => ({
        accordionItems: [...state.accordionItems, newItem],
        selectedKeys: new Set([newItem.id]),
      }));
      return newItem;
    } catch (error) {
      set({ error: (error as Error).message });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  updateItem: async (id, update) => {
    set({ isLoading: true, error: null });
    try {
      await faqApi.updateFAQ(id, update);
      set((state) => ({
        accordionItems: updateAccordionItem(state.accordionItems, id, update),
        selectedItem: null,
      }));
    } catch (error) {
      set({ error: (error as Error).message });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  deleteItem: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await faqApi.deleteFAQ(id);
      set((state) => ({
        accordionItems: deleteAccordionItem(state.accordionItems, id),
        selectedKeys: new Set(
          Array.from(state.selectedKeys).filter((key) => key !== id)
        ),
        selectedItem: null,
      }));
    } catch (error) {
      set({ error: (error as Error).message });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  initializeFAQ: (items) => {
    set({ accordionItems: items });
  },
}));
