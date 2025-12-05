import { authClient } from "@/lib/auth-client";
import { useQuery } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";

export interface Employee {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  dateJoined: string;
  location?: string;
  salary?: number;
  status: "Online" | "Offline";
  avatar: string;
}

const getInitials = (name: string): string => {
  return name
    .split(" ")
    .filter((word) => isNaN(Number(word)))
    .map((word) => word.charAt(0).toUpperCase())
    .join("")
    .slice(0, 2);
};

const mapUserToEmployee = (user: {
  id: string;
  name: string;
  email: string;
  role?: string;
  department?: string;
  createdAt: Date | string;
  salary?: number;
}): Employee => {
  return {
    id: user.id,
    name: user.name || "Unknown",
    email: user.email,
    role: user.role || "employee",
    department: user.department || "Unassigned",
    dateJoined: formatDistanceToNow(new Date(user.createdAt), {
      addSuffix: true,
    }),
    salary: user.salary,
    status: Math.random() > 0.5 ? "Online" : "Offline",
    avatar: getInitials(user.name || ""),
  };
};

export const useEmployees = (
  page: number,
  search: string,
  department: string,
  role: string,
  location: string,
  status: string
) => {
  return useQuery({
    queryKey: ["employees", page, search, department, role, location, status],
    queryFn: async () => {
      const itemsPerPage = 8;

      const offset = (page - 1) * itemsPerPage;

      const queryObj: Record<string, string | number> = {
        limit: itemsPerPage,
        offset: offset,
        sortBy: "createdAt",
        sortDirection: "desc",
      };

      if (search) {
        queryObj.searchValue = search;
        queryObj.searchField = "name";
        queryObj.searchOperator = "contains";
      }

      if (department) {
        queryObj.filterField = "department";
        queryObj.filterValue = department;
        queryObj.filterOperator = "eq";
      }

      if (role && !department) {
        queryObj.filterField = "role";
        queryObj.filterValue = role;
        queryObj.filterOperator = "eq";
      }

      const { data: usersData, error } = await authClient.admin.listUsers({
        query: queryObj,
      });

      if (error) {
        throw new Error("Failed to fetch employees");
      }

      if (!usersData || !usersData.users) {
        return {
          employees: [],
          totalPages: 0,
          total: 0,
        };
      }

      let employees = usersData.users.map(mapUserToEmployee);

      if (search) {
        const searchLower = search.toLowerCase();
        employees = employees.filter(
          (emp) =>
            emp.name.toLowerCase().includes(searchLower) ||
            emp.email.toLowerCase().includes(searchLower)
        );
      }

      // Apply role filter on client-side if department filter was used server-side
      if (role && department) {
        employees = employees.filter((emp) => emp.role === role);
      }

      // Apply status filter on client-side (computed field based on random state)
      if (status) {
        employees = employees.filter((emp) => emp.status === status);
      }

      // Use the total count from server response for pagination
      const totalCount = usersData.total || 0;
      const totalPages = Math.ceil(totalCount / itemsPerPage);

      return {
        employees,
        totalPages,
        total: totalCount,
      };
    },
  });
};
