import { z } from "zod";

export const formSchema = z.object({
  name: z.string().min(1, "Brand/Organisation Name is required"),
  category: z.string().min(1, "Category is required"),
  subcategory: z.string().min(1, "Subcategory is required"),
  brandTags: z.array(z.string()).min(1, "At least one brand tag is required"),
  country: z.string().min(1, "Country is required"),
  agree: z.boolean().refine((val) => val === true, "You must agree to the terms of service"),
});

export type FormData = z.infer<typeof formSchema>;