import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DEPARTMENTS, DEPARTMENT_LABELS } from "@/lib/constants";

interface DashboardFiltersProps {
  timeRange: string;
  department: string;
  project: string;
  employee: string;
  onTimeRangeChange: (value: string) => void;
  onDepartmentChange: (value: string) => void;
  onProjectChange: (value: string) => void;
  onEmployeeChange: (value: string) => void;
}

export const DashboardFilters = ({
  timeRange,
  department,
  project,
  employee,
  onTimeRangeChange,
  onDepartmentChange,
  onProjectChange,
  onEmployeeChange,
}: DashboardFiltersProps) => {
  return (
    <div className="flex justify-end gap-3 flex-wrap">
      <Select value={timeRange} onValueChange={onTimeRangeChange}>
        <SelectTrigger className="w-[150px] bg-primary text-primary-foreground">
          <SelectValue placeholder="Time Range" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Time</SelectItem>
          <SelectItem value="today">Today</SelectItem>
          <SelectItem value="week">This Week</SelectItem>
          <SelectItem value="month">This Month</SelectItem>
        </SelectContent>
      </Select>

      <Select value={department} onValueChange={onDepartmentChange}>
        <SelectTrigger className="w-[165px] bg-primary text-primary-foreground">
          <SelectValue placeholder="Department" />
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

      <Select value={project} onValueChange={onProjectChange}>
        <SelectTrigger className="w-[150px] bg-primary text-primary-foreground">
          <SelectValue placeholder="Project" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Projects</SelectItem>
          <SelectItem value="project1">Project 1</SelectItem>
          <SelectItem value="project2">Project 2</SelectItem>
        </SelectContent>
      </Select>

      <Select value={employee} onValueChange={onEmployeeChange}>
        <SelectTrigger className="w-[150px] bg-primary text-primary-foreground">
          <SelectValue placeholder="Employee" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Employees</SelectItem>
          <SelectItem value="emp1">Employee 1</SelectItem>
          <SelectItem value="emp2">Employee 2</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
