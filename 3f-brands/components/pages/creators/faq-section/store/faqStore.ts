import { create } from 'zustand';
import { AccordionItemType, AccordionItemUpdate } from '../types/accordion';
import {
  createAccordionItem,
  updateAccordionItem,
  deleteAccordionItem,
} from '../utils/accordionHelpers';

interface FAQState {
  accordionItems: AccordionItemType[];
  selectedKeys: Set<string>;
  selectedItem: AccordionItemType | null;
  setSelectedItem: (item: AccordionItemType | null) => void;
  setSelectedKeys: (keys: Set<string>) => void;
  addItem: (update?: AccordionItemUpdate) => AccordionItemType;
  updateItem: (id: string, update: AccordionItemUpdate) => void;
  deleteItem: (id: string) => void;
  initializeFAQ: (items: AccordionItemType[]) => void;
}

export const useFAQStore = create<FAQState>((set) => ({
  accordionItems: [],
  selectedKeys: new Set<string>(),
  selectedItem: null,

  setSelectedItem: (item) => set({ selectedItem: item }),
  
  setSelectedKeys: (keys) => set({ selectedKeys: keys }),

  addItem: (update) => {
    const newItem = createAccordionItem(update);
    set((state) => ({
      accordionItems: [...state.accordionItems, newItem],
      selectedKeys: new Set([newItem.id]),
    }));
    return newItem;
  },

  updateItem: (id, update) => {
    set((state) => ({
      accordionItems: updateAccordionItem(state.accordionItems, id, update),
      selectedItem: null, // Reset selected item after update
    }));
  },

  deleteItem: (id) => {
    set((state) => ({
      accordionItems: deleteAccordionItem(state.accordionItems, id),
      selectedKeys: new Set(
        Array.from(state.selectedKeys).filter((key) => key !== id)
      ),
      selectedItem: null, // Reset selected item after delete
    }));
  },

  initializeFAQ: (items) => {
    set({ accordionItems: items });
  },
}));