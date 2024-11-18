// src/components/pages/creators/FAQ/hooks/useAccordionState.ts
import { useState } from "react";
import { AccordionItemType, AccordionItemUpdate } from "../types/accordion";
import {
  createAccordionItem,
  updateAccordionItem,
  deleteAccordionItem,
} from "../utils/accordionHelpers";

export const useAccordionState = (initialItems?: AccordionItemType[]) => {
  const [accordionItems, setAccordionItems] = useState<AccordionItemType[]>(
    initialItems || [createAccordionItem()]
  );
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());

  const addItem = (update?: AccordionItemUpdate) => {
    const newItem = createAccordionItem(update);
    setAccordionItems((prev) => [...prev, newItem]);
    setSelectedKeys(new Set([newItem.id]));
    return newItem;
  };

  const updateItem = (id: string, update: AccordionItemUpdate) => {
    setAccordionItems((prev) => updateAccordionItem(prev, id, update));
  };

  const deleteItem = (id: string) => {
    setAccordionItems((prev) => deleteAccordionItem(prev, id));
    setSelectedKeys((prev) => {
      const newKeys = new Set(prev);
      newKeys.delete(id);
      return newKeys;
    });
  };

  return {
    accordionItems,
    selectedKeys,
    setSelectedKeys,
    addItem,
    updateItem,
    deleteItem,
  };
};
