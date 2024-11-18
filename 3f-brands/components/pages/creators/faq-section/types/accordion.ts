export interface AccordionItemType {
  id: string;
  title: string;
  content: string;
}

export type AccordionItemUpdate = Partial<Omit<AccordionItemType, "id">>;
