import { z } from "zod";

export const faqSchema = z.object({
  title: z.string().min(20, "Question must be at least 20 characters long"),
  content: z.string().min(20, "Answer must be at least 20 characters long")
});

export type FAQFormData = z.infer<typeof faqSchema>;

export interface AccordionItemType {
  id: string;
  title: string;
  content: string;
}

export type AccordionItemUpdate = Partial<Omit<AccordionItemType, "id">>;