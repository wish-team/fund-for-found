import { AccordionItemType, AccordionItemUpdate } from "../types/accordion";
import { v4 as uuidv4 } from "uuid";

export const createAccordionItem = (
  update?: AccordionItemUpdate
): AccordionItemType => ({
  id: uuidv4(),
  title: update?.title || "New Question",
  content: update?.content || "New Answer",
});

export const updateAccordionItem = (
  items: AccordionItemType[],
  id: string,
  update: AccordionItemUpdate
): AccordionItemType[] => {
  return items.map((item) => (item.id === id ? { ...item, ...update } : item));
};

export const deleteAccordionItem = (
  items: AccordionItemType[],
  id: string
): AccordionItemType[] => {
  return items.filter((item) => item.id !== id);
};
