import { z } from "zod"

export const blogSchema = z.object({
  title: z.string().min(1, "Title is required").max(200, "Title must be less than 200 characters"),
  slug: z.string().min(1, "Slug is required").max(200, "Slug must be less than 200 characters"),
  excerpt: z.string().min(1, "Excerpt is required").max(500, "Excerpt must be less than 500 characters"),
  content: z.string().min(1, "Content is required"),
  categoryId: z.string().optional(),
  tags: z.array(z.string()).default([]),
  authorId: z.string().optional(),
  publishedAt: z.string().or(z.date()),
  coverImage: z.string().optional(),
  readingTime: z.number().int().min(1).max(60).default(5),
})

export type BlogInput = z.infer<typeof blogSchema>
