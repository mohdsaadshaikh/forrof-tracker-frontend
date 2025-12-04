import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";

export interface AttendanceRecord {
  id: string;
  employeeName: string;
  department: string | null;
  status: "Online" | "Offline" | "Absent";
  checkInTime: string | null;
  checkOutTime: string | null;
  workHours: string;
}

export interface AttendanceData {
  data: AttendanceRecord[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface AttendanceSummary {
  total: number;
  online: number;
  offline: number;
  absent: number;
}

export interface AttendanceFilters {
  date?: Date;
  department?: string;
  search?: string;
  page?: number;
  pageSize?: number;
  showActiveOnly?: boolean;
}

export const useAttendanceData = (filters: AttendanceFilters) => {
  return useQuery<AttendanceData>({
    queryKey: ["attendance", filters],
    queryFn: async () => {
      const params = new URLSearchParams();

      if (filters.date) {
        params.append("date", filters.date.toISOString());
      }
      if (filters.department) {
        params.append("department", filters.department);
      }
      if (filters.search) {
        params.append("search", filters.search);
      }
      if (filters.page) {
        params.append("page", filters.page.toString());
      }
      if (filters.pageSize) {
        params.append("pageSize", filters.pageSize.toString());
      }
      if (filters.showActiveOnly !== undefined) {
        params.append("showActiveOnly", filters.showActiveOnly.toString());
      }

      const response = await api.get(`/attendance?${params.toString()}`);
      return response.data;
    },
  });
};

export const useAttendanceSummary = (date?: Date) => {
  return useQuery<AttendanceSummary>({
    queryKey: ["attendance-summary", date],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (date) {
        params.append("date", date.toISOString());
      }

      const response = await api.get(
        `/attendance/summary?${params.toString()}`
      );
      return response.data;
    },
  });
};

export const useExportAttendance = () => {
  return async (filters: Omit<AttendanceFilters, "page" | "pageSize">) => {
    const params = new URLSearchParams();

    if (filters.date) {
      params.append("date", filters.date.toISOString());
    }
    if (filters.department) {
      params.append("department", filters.department);
    }
    if (filters.search) {
      params.append("search", filters.search);
    }

    const response = await api.get(`/attendance/export?${params.toString()}`);
    return response.data.data;
  };
};
