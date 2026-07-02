import { z } from "zod";

export const checkOutSchema = z.object({
  address: z
    .string()
    .min(4, "The Address must be at least 4 Characters or greater")
    .max(8, "The Address must be 8 Characters or less"),
  city: z
    .string()
    .min(4, "The City must be at least 4 Characters or greater")
    .max(8, "The City must be 8 Characters or less"),
  country: z
    .string()
    .min(4, "The Country must be at least 4 Characters or greater")
    .max(12, "The Country must be 8 Characters or less"),
    
});
