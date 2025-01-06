import { z } from "zod";

// Your existing form schema
export const formSchema = z.object({
  name: z.string().min(1, "Brand/Organisation Name is required"),
  category: z.string().min(1, "Category is required"),
  subcategory: z.string().min(1, "Subcategory is required"),
  brandTags: z.array(z.string()).min(1, "At least one brand tag is required"),
  country: z.string().min(1, "Country is required"),
  agree: z.boolean().refine((val) => val === true, "You must agree to the terms of service"),
});

// Add these new schemas
export const socialLinkSchema = z.object({
  id: z.number(),
  platform: z.string().min(1, "Platform is required"),
  url: z.string().url("Must be a valid URL"),
});

export const extendedFormSchema = formSchema.extend({
  trackingCode: z.string().optional(),
  brandLink: z.string().url("Must be a valid URL").optional(),
  socialLinks: z.array(socialLinkSchema),
});

// Your existing FormData type
export type FormData = z.infer<typeof formSchema>;

// Add these new types
export type SocialLink = z.infer<typeof socialLinkSchema>;
export type ExtendedFormData = z.infer<typeof extendedFormSchema>;