import { z } from "zod";

export const profileSchema = z
  .object({
    name: z
      .string()
      .min(3, "The name must be at least 3 characters")
      .max(15, "The name must be 15 characters or less"),
    email: z.email("please enter a valid email").trim().toLowerCase(),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).*$/,
        "Password must contain at least one uppercase letter, one lowercase letter, and one number",
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password do not match",
  });
