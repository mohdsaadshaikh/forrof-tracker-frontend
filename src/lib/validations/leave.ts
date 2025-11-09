import { z } from "zod";

export const leaveTypes = [
  "Sick Leave",
  "Casual Leave",
  "Annual Leave",
  "Maternity Leave",
  "Paternity Leave",
  "Unpaid Leave",
] as const;

export const leaveStatuses = ["Pending", "Approved", "Rejected"] as const;

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

  startDate: z
    .union([z.date(), z.undefined()])
    .refine((val) => val instanceof Date, {
      message: "Start date is required",
    }),

  endDate: z
    .union([z.date(), z.undefined()])
    .refine((val) => val instanceof Date, {
      message: "End date is required",
    }),

  reason: z.string().min(10, "Reason must be at least 10 characters").max(500),
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
