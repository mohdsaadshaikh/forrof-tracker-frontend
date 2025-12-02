import { z } from "zod";

export const importantLinkSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title must be less than 100 characters"),
  url: z.string().min(1, "URL is required").url("Please enter a valid URL"),
});

export const termsConditionSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title must be less than 100 characters"),
  content: z
    .string()
    .min(1, "Content is required")
    .max(10000, "Content must be less than 10000 characters"),
});

export type ImportantLinkFormData = z.infer<typeof importantLinkSchema>;
export type TermsConditionFormData = z.infer<typeof termsConditionSchema>;
