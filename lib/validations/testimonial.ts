import { z } from "zod"

export const testimonialSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  role: z.string().min(1, "Role is required").max(100, "Role must be less than 100 characters"),
  company: z.string().min(1, "Company is required").max(100, "Company must be less than 100 characters"),
  quote: z.string().min(1, "Quote is required").max(500, "Quote must be less than 500 characters"),
  image: z.string().url("Invalid image URL").optional().or(z.literal("")),
  order: z.number().int().min(0).default(0),
})

export type TestimonialInput = z.infer<typeof testimonialSchema>
