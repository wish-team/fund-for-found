import i18next from "i18next";
import { z } from "zod";

export const faqSchema = z.object({
  title: z.string().min(20, {
    message: i18next.t('translation:faq.validation.questionRequired')
  }),
  content: z.string().min(20, {
    message: i18next.t('translation:faq.validation.answerRequired')
  })
});

export type FAQFormData = z.infer<typeof faqSchema>;

export interface AccordionItemType {
  id: string;
  title: string;
  content: string;
}

export type AccordionItemUpdate = Partial<Omit<AccordionItemType, "id">>;