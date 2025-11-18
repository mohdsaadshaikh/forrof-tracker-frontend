import { z } from "zod";

export const leaveTypes = [
  "ANNUAL_LEAVE",
  "MATERNITY_LEAVE",
  "CASUAL_LEAVE",
  "SICK_LEAVE",
  "PERSONAL_LEAVE",
  "UNPAID_LEAVE",
] as const;

export const leaveStatuses = [
  "PENDING",
  "APPROVED",
  "REJECTED",
  "CANCELLED",
] as const;

export const departments = [
  "Engineering",
  "HR",
  "Finance",
  "Marketing",
  "Sales",
  "Operations",
] as const;

export const leaveFormSchema = z.object({
  leaveType: z.enum(leaveTypes, {
    message: "Please select a leave type",
  }),

  startDate: z.coerce.date(),
  endDate: z.coerce.date(),

  reason: z
    .string({
      message: "Please provide a reason for the leave",
    })
    .min(10, {
      message: "Reason must be at least 10 characters long",
    }),
});

export const leaveFiltersSchema = z.object({
  search: z.string(),
  leaveType: z.enum([...leaveTypes, "All"]),
  status: z.enum([...leaveStatuses, "All"]),
  department: z.enum([...departments, "All"]),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
});

export type LeaveFormData = z.infer<typeof leaveFormSchema>;
export type LeaveFiltersData = z.infer<typeof leaveFiltersSchema>;
export type LeaveType = (typeof leaveTypes)[number];
export type LeaveStatus = (typeof leaveStatuses)[number];
export type Department = (typeof departments)[number];
