import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import DepartmentHeader from "@/components/departments/DepartmentHeader";
import DepartmentFilters from "@/components/departments/DepartmentFilters";
import DepartmentTable from "@/components/departments/DepartmentTable";
import DepartmentCard from "@/components/departments/DepartmentCard";
import { DepartmentForm } from "@/components/departments/DepartmentForm";

// Mock departments data
const mockDepartments = [
  {
    id: "1",
    name: "IT",
    description: "Information Technology Department",
    employeeCount: 15,
    projectsCount: 8,
    isActive: true,
  },
  {
    id: "2",
    name: "HR",
    description: "Human Resources Department",
    employeeCount: 8,
    projectsCount: 3,
    isActive: true,
  },
  {
    id: "3",
    name: "SALES",
    description: "Sales and Business Development",
    employeeCount: 12,
    projectsCount: 5,
    isActive: true,
  },
  {
    id: "4",
    name: "MARKETING",
    description: "Marketing and Communications",
    employeeCount: 10,
    projectsCount: 4,
    isActive: true,
  },
  {
    id: "5",
    name: "FINANCE",
    description: "Financial Management and Accounting",
    employeeCount: 7,
    projectsCount: 2,
    isActive: true,
  },
  {
    id: "6",
    name: "OPERATIONS",
    description: "Operations and Business Process",
    employeeCount: 11,
    projectsCount: 6,
    isActive: true,
  },
];

interface Department {
  id: string;
  name: string;
  description: string;
  employeeCount: number;
  projectsCount: number;
  isActive: boolean;
}

interface DepartmentFormData {
  name: string;
  description: string;
  isActive: boolean;
}

export default function DepartmentsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editingDepartment, setEditingDepartment] = useState<Department | null>(
    null
  );
  const [departments, setDepartments] = useState(mockDepartments);
  const [isLoading] = useState(false);

  const filteredDepartments = departments.filter((dept) => {
    const matchesSearch =
      dept.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dept.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && dept.isActive) ||
      (statusFilter === "inactive" && !dept.isActive);

    return matchesSearch && matchesStatus;
  });

  const handleCreateClick = () => {
    setEditingDepartment(null);
    setCreateDialogOpen(true);
  };

  const handleEdit = (department: Department) => {
    setEditingDepartment(department);
    setCreateDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setDepartments(departments.filter((d) => d.id !== id));
  };

  const handleSubmit = (formData: DepartmentFormData) => {
    if (editingDepartment) {
      setDepartments(
        departments.map((d) =>
          d.id === editingDepartment.id ? { ...d, ...formData } : d
        )
      );
    } else {
      setDepartments([
        ...departments,
        {
          id: String(departments.length + 1),
          ...formData,
          employeeCount: 0,
          projectsCount: 0,
        },
      ]);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-full" />
        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-20" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <DepartmentHeader onCreateClick={handleCreateClick} />

      <DepartmentFilters
        onSearchChange={setSearchQuery}
        onStatusChange={setStatusFilter}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />

      {viewMode === "list" ? (
        <DepartmentTable
          departments={filteredDepartments}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDepartments.map((department) => (
            <DepartmentCard
              key={department.id}
              department={department}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {filteredDepartments.length === 0 && (
        <Card className="p-12 text-center">
          <p className="text-muted-foreground">
            No departments found matching your criteria
          </p>
        </Card>
      )}

      <DepartmentForm
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        department={editingDepartment}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
