import { z } from "zod";

export const reportIssueSchema = z.object({
  category: z.string().nonempty("Category required"),
  subject: z.string().nonempty("Subject required"),
  description: z.string().nonempty("Description required"),
});

export type ReportIssueType = z.infer<typeof reportIssueSchema>;

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z
      .string()
      .min(8, "New password must be at least 8 characters long"),
    confirmPassword: z.string().min(1, "Confirm your new password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type ChangePasswordFormType = z.infer<typeof changePasswordSchema>;
