import { z } from "zod";

export const blogSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  category: z.string().min(1, "Category is required"),
  summary: z.string().min(1, "Summary is required"),
  content: z.string().min(1, "Content is required"),
  image: z.union([z.instanceof(File), z.string().url()]).optional(),
});

export type BlogSchema = z.infer<typeof blogSchema>;
