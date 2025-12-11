import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import ResponsiveDialog from "@/components/ResponsiveDialog";

const DEPARTMENTS = ["IT", "HR", "SALES", "MARKETING", "FINANCE", "OPERATIONS"];

// Mock employees data
const MOCK_EMPLOYEES = [
  { id: "1", name: "John Doe", department: "IT" },
  { id: "2", name: "Jane Smith", department: "IT" },
  { id: "3", name: "Mike Johnson", department: "HR" },
  { id: "4", name: "Sarah Williams", department: "SALES" },
  { id: "5", name: "Tom Brown", department: "IT" },
];

interface Employee {
  id: string;
  name: string;
  department: string;
}

interface ProjectFormData {
  name: string;
  description: string;
  department: string;
  assignedUsers: Employee[];
  isActive: boolean;
}

interface ProjectFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  project?: {
    id: string;
    name: string;
    description: string;
    department: string;
    assignedUsers: number | Employee[];
    isActive: boolean;
  } | null;
  onSubmit?: (data: ProjectFormData) => void;
}

export function ProjectForm({
  open,
  onOpenChange,
  project,
  onSubmit,
}: ProjectFormProps) {
  const [formData, setFormData] = useState({
    name: project?.name || "",
    description: project?.description || "",
    department: project?.department || "",
    assignedUsers: Array.isArray(project?.assignedUsers)
      ? project.assignedUsers
      : [],
    isActive: project?.isActive ?? true,
  });

  const [employeeSearch, setEmployeeSearch] = useState("");

  const availableEmployees = MOCK_EMPLOYEES.filter(
    (emp) =>
      emp.name.toLowerCase().includes(employeeSearch.toLowerCase()) &&
      !formData.assignedUsers.find((u: Employee) => u.id === emp.id)
  );

  const handleAddEmployee = (employee: Employee) => {
    setFormData({
      ...formData,
      assignedUsers: [...formData.assignedUsers, employee],
    });
    setEmployeeSearch("");
  };

  const handleRemoveEmployee = (employeeId: string) => {
    setFormData({
      ...formData,
      assignedUsers: formData.assignedUsers.filter(
        (u: Employee) => u.id !== employeeId
      ),
    });
  };

  const handleSubmit = () => {
    onSubmit?.(formData);
    onOpenChange(false);
  };

  return (
    <ResponsiveDialog
      open={open}
      onOpenChange={onOpenChange}
      title={project ? "Edit Project" : "Create Project"}
      description={project ? "Update project details" : "Add a new project"}
    >
      <div className="space-y-4">
        {/* Project Name */}
        <div>
          <Label>Project Name</Label>
          <Input
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Enter project name"
            className="mt-1"
          />
        </div>

        {/* Description */}
        <div>
          <Label>Description</Label>
          <Textarea
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            placeholder="Enter project description"
            className="mt-1"
            rows={3}
          />
        </div>

        {/* Department */}
        <div>
          <Label>Department</Label>
          <Select
            value={formData.department}
            onValueChange={(value) =>
              setFormData({ ...formData, department: value })
            }
          >
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select department" />
            </SelectTrigger>
            <SelectContent>
              {DEPARTMENTS.map((dept) => (
                <SelectItem key={dept} value={dept}>
                  {dept}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Assign Users */}
        <div>
          <Label>Assign Users</Label>
          <div className="mt-2 space-y-2">
            {/* Employee Search */}
            <div className="relative">
              <Input
                placeholder="Search and add employees..."
                value={employeeSearch}
                onChange={(e) => setEmployeeSearch(e.target.value)}
                className="text-sm"
              />
              {employeeSearch && availableEmployees.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border rounded-md shadow-lg z-10 max-h-48 overflow-y-auto">
                  {availableEmployees.map((emp) => (
                    <button
                      key={emp.id}
                      onClick={() => handleAddEmployee(emp)}
                      className="w-full text-left px-3 py-2 hover:bg-accent text-sm"
                    >
                      <div className="font-medium">{emp.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {emp.department}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Assigned Users */}
            {formData.assignedUsers.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.assignedUsers.map((user: Employee) => (
                  <Badge key={user.id} variant="secondary" className="gap-1">
                    {user.name}
                    <button
                      onClick={() => handleRemoveEmployee(user.id)}
                      className="hover:opacity-70"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Active Status */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="isActive"
            checked={formData.isActive}
            onChange={(e) =>
              setFormData({ ...formData, isActive: e.target.checked })
            }
            className="rounded"
          />
          <Label htmlFor="isActive" className="cursor-pointer">
            Active Project
          </Label>
        </div>
      </div>

      <div className="flex gap-2 pt-6 justify-end">
        <Button variant="outline" onClick={() => onOpenChange(false)}>
          Cancel
        </Button>
        <Button onClick={handleSubmit}>{project ? "Update" : "Create"}</Button>
      </div>
    </ResponsiveDialog>
  );
}
