import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type {
  LeaveFormData,
  LeaveType,
  LeaveStatus,
  Department,
} from "@/lib/validations/leave";

export interface Leave {
  id: string;
  employeeName: string;
  employeeId: string;
  department: Department;
  leaveType: LeaveType;
  startDate: string;
  endDate: string;
  duration: number;
  reason: string;
  status: LeaveStatus;
  appliedDate: string;
  reviewedBy?: string;
  reviewDate?: string;
  attachmentUrl?: string;
}

// Generate dummy data
const generateDummyLeaves = (): Leave[] => {
  const employees = [
    "John Doe",
    "Jane Smith",
    "Mike Johnson",
    "Sarah Williams",
    "David Brown",
  ];
  const types: LeaveType[] = [
    "Sick Leave",
    "Casual Leave",
    "Annual Leave",
    "Maternity Leave",
  ];
  const statuses: LeaveStatus[] = ["Pending", "Approved", "Rejected"];
  const departments: Department[] = [
    "Engineering",
    "HR",
    "Finance",
    "Marketing",
    "Sales",
    "Operations",
  ];

  return Array.from({ length: 50 }, (_, i) => ({
    id: `leave-${i + 1}`,
    employeeName: employees[Math.floor(Math.random() * employees.length)],
    employeeId: `EMP${1000 + i}`,
    department: departments[Math.floor(Math.random() * departments.length)],
    leaveType: types[Math.floor(Math.random() * types.length)],
    startDate: new Date(
      2025,
      0,
      Math.floor(Math.random() * 28) + 1
    ).toISOString(),
    endDate: new Date(
      2025,
      0,
      Math.floor(Math.random() * 28) + 5
    ).toISOString(),
    duration: Math.floor(Math.random() * 10) + 1,
    reason: "Personal reasons requiring time off from work duties.",
    status: statuses[Math.floor(Math.random() * statuses.length)],
    appliedDate: new Date(
      2025,
      0,
      Math.floor(Math.random() * 20) + 1
    ).toISOString(),
    reviewedBy:
      statuses[Math.floor(Math.random() * statuses.length)] !== "Pending"
        ? "Admin User"
        : undefined,
    reviewDate:
      statuses[Math.floor(Math.random() * statuses.length)] !== "Pending"
        ? new Date(2025, 0, Math.floor(Math.random() * 25) + 1).toISOString()
        : undefined,
  }));
};

const dummyLeaves = generateDummyLeaves();

interface UseLeaveDataParams {
  page: number;
  pageSize: number;
  search: string;
  leaveType: string;
  status: string;
  department: string;
  startDate?: Date;
  endDate?: Date;
}

export const useLeaveData = ({
  page,
  pageSize,
  search,
  leaveType,
  status,
  department,
  startDate,
  endDate,
}: UseLeaveDataParams) => {
  return useQuery({
    queryKey: [
      "leaves",
      page,
      pageSize,
      search,
      leaveType,
      status,
      department,
      startDate,
      endDate,
    ],
    queryFn: async () => {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      let filtered = [...dummyLeaves];

      // Apply filters
      if (search) {
        filtered = filtered.filter(
          (leave) =>
            leave.employeeName.toLowerCase().includes(search.toLowerCase()) ||
            leave.employeeId.toLowerCase().includes(search.toLowerCase()) ||
            leave.reason.toLowerCase().includes(search.toLowerCase())
        );
      }

      if (leaveType && leaveType !== "All") {
        filtered = filtered.filter((leave) => leave.leaveType === leaveType);
      }

      if (status && status !== "All") {
        filtered = filtered.filter((leave) => leave.status === status);
      }

      if (department && department !== "All") {
        filtered = filtered.filter((leave) => leave.department === department);
      }

      if (startDate) {
        filtered = filtered.filter(
          (leave) => new Date(leave.startDate) >= startDate
        );
      }

      if (endDate) {
        filtered = filtered.filter(
          (leave) => new Date(leave.endDate) <= endDate
        );
      }

      // Pagination
      const start = (page - 1) * pageSize;
      const end = start + pageSize;
      const paginatedLeaves = filtered.slice(start, end);

      return {
        leaves: paginatedLeaves,
        totalPages: Math.ceil(filtered.length / pageSize),
        totalLeaves: filtered.length,
      };
    },
  });
};

export const useCreateLeave = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: LeaveFormData) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return { success: true, data };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leaves"] });
    },
  });
};

export const useUpdateLeaveStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      return { success: true, id, status };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leaves"] });
    },
  });
};

export const useDeleteLeave = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      return { success: true, id };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leaves"] });
    },
  });
};
