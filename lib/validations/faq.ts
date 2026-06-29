import { z } from "zod"

export const faqSchema = z.object({
  question: z.string().min(1, "Question is required").max(300, "Question must be less than 300 characters"),
  answer: z.string().min(1, "Answer is required").max(1000, "Answer must be less than 1000 characters"),
  order: z.number().int().min(0).default(0),
})

export type FAQInput = z.infer<typeof faqSchema>
