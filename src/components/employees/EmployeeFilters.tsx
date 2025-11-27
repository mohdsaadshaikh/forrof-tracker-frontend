import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DEPARTMENTS, DEPARTMENT_LABELS } from "@/lib/constants";

interface EmployeeFiltersProps {
  department: string;
  setDepartment: (value: string) => void;
  role: string;
  setRole: (value: string) => void;
}

export const EmployeeFilters = ({
  department,
  setDepartment,
  role,
  setRole,
}: EmployeeFiltersProps) => {
  return (
    <div className="flex gap-2">
      <Select value={department} onValueChange={setDepartment}>
        <SelectTrigger className="w-[180px] bg-primary text-primary-foreground">
          <SelectValue placeholder="Team/Department" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Departments</SelectItem>
          {Object.entries(DEPARTMENTS).map(([key, value]) => (
            <SelectItem key={key} value={value}>
              {DEPARTMENT_LABELS[value]}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={role} onValueChange={setRole}>
        <SelectTrigger className="w-[140px] bg-primary text-primary-foreground">
          <SelectValue placeholder="Role" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Roles</SelectItem>
          <SelectItem value="admin">Admin</SelectItem>
          <SelectItem value="employee">Employee</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
