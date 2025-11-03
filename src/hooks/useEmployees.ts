import { useQuery } from "@tanstack/react-query";

export interface Employee {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  dateJoined: string;
  location: string;
  salary: number;
  status: "Online" | "Offline";
  avatar: string;
}

const generateDummyEmployees = (): Employee[] => {
  const roles = [
    "Accountant",
    "Senior Executive",
    "Senior Manager",
    "Developer",
    "Designer",
  ];
  const departments = [
    "IT Department",
    "Marketing",
    "Design",
    "Sales",
    "Development",
  ];
  const locations = ["Lahore", "Karachi", "Islamabad"];
  const statuses: ("Online" | "Offline")[] = ["Online", "Offline"];

  return Array.from({ length: 50 }, (_, i) => ({
    id: `2541${421 + i}`,
    name: `Lisa Greg ${i + 1}`,
    email: `lisa_greg${i + 1}@email.com`,
    role: roles[i % roles.length],
    department: departments[i % departments.length],
    dateJoined: "30 July 2025",
    location: locations[i % locations.length],
    salary: 95000,
    status: statuses[i % statuses.length],
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
  }));
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
    queryFn: () => {
      const allEmployees = generateDummyEmployees();

      const filtered = allEmployees.filter((emp) => {
        const matchesSearch =
          emp.name.toLowerCase().includes(search.toLowerCase()) ||
          emp.email.toLowerCase().includes(search.toLowerCase());
        const matchesDepartment = !department || emp.department === department;
        const matchesRole = !role || emp.role === role;
        const matchesLocation = !location || emp.location === location;
        const matchesStatus = !status || emp.status === status;

        return (
          matchesSearch &&
          matchesDepartment &&
          matchesRole &&
          matchesLocation &&
          matchesStatus
        );
      });

      // Pagination
      const itemsPerPage = 8;
      const startIndex = (page - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const paginatedData = filtered.slice(startIndex, endIndex);

      return {
        employees: paginatedData,
        totalPages: Math.ceil(filtered.length / itemsPerPage),
        total: filtered.length,
      };
    },
  });
};
