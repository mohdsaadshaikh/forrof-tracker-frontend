export const DEPARTMENTS = {
  HR: "HR",
  IT: "IT",
  SALES: "SALES",
  MARKETING: "MARKETING",
  FINANCE: "FINANCE",
  OPERATIONS: "OPERATIONS",
} as const;

export const DEPARTMENT_OPTIONS = Object.values(DEPARTMENTS);

export const DEPARTMENT_LABELS: Record<string, string> = {
  [DEPARTMENTS.HR]: "HR",
  [DEPARTMENTS.IT]: "IT",
  [DEPARTMENTS.SALES]: "Sales",
  [DEPARTMENTS.MARKETING]: "Marketing",
  [DEPARTMENTS.FINANCE]: "Finance",
  [DEPARTMENTS.OPERATIONS]: "Operations",
};

export const LEAVE_TYPES = [
  "ANNUAL_LEAVE",
  "MATERNITY_LEAVE",
  "CASUAL_LEAVE",
  "SICK_LEAVE",
  "PERSONAL_LEAVE",
  "UNPAID_LEAVE",
] as const;

export const LEAVE_STATUSES = [
  "PENDING",
  "APPROVED",
  "REJECTED",
  "CANCELLED",
] as const;
