import * as z from 'zod';
import { MIN_SOCIAL_LINKS } from '../constants';

export const urlSchema = z.string()
  .min(1, "URL is required")
  .refine((url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }, "Please enter a valid URL");

export const socialLinkSchema = z.object({
  type: z.string(),
  url: urlSchema
});

export const socialLinksSchema = z.object({
  socialLinks: z.array(socialLinkSchema)
    .min(MIN_SOCIAL_LINKS, `You must have at least ${MIN_SOCIAL_LINKS} social links`)
    .refine(
      (links) => {
        const types = links.map(link => link.type);
        return types.length === new Set(types).size;
      },
      "Each social media platform can only be added once"
    )
});

export type SocialLinksSchema = z.infer<typeof socialLinksSchema>;