import { z } from "zod"

export const projectSchema = z.object({
  title: z.string().min(1, "Title is required").max(200, "Title must be less than 200 characters"),
  slug: z.string().min(1, "Slug is required").max(200, "Slug must be less than 200 characters"),
  tagline: z.string().min(1, "Tagline is required").max(300, "Tagline must be less than 300 characters"),
  description: z.string().min(1, "Description is required"),
  challenge: z.string().min(1, "Challenge is required"),
  whatWeDid: z.string().min(1, "What we did is required"),
  category: z.string().min(1, "Category is required"),
  year: z.number().int().min(2000).max(2100),
  clientName: z.string().min(1, "Client name is required"),
  tags: z.array(z.string()).default([]),
  stats: z.array(z.string()).default([]),
  isFeatured: z.boolean().default(false),
  coverImage: z.string().optional(),
  mockupImage: z.string().optional(),
})

export type ProjectInput = z.infer<typeof projectSchema>
