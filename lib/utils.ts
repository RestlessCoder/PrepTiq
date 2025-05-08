import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { z } from "zod"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Form Validations
export const authFormSchema = (type: string) => z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: type === "sign-in" 
  ? z.string()
      .min(6, { message: "Password must be at least 6 characters" })
      .max(20, { message: "Password must no more than 20 characters"})
  : z.string()
      .min(6, { message: "Password must be at least 6 characters" })
      .max(20, { message: "Password must no more than 20 characters"})
      .refine((value) => /^(?:(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*)$/.test(value ?? ""), 
      { message: "Password needs at least 1 number, 1 lower case and 1 upper case letter"}
  ),
  confirmPassword: type === "sign-in" ? z.string().optional() : z.string().min(1, { message: "Confirm Password is required"}),
  email: z.string().email(),
})
