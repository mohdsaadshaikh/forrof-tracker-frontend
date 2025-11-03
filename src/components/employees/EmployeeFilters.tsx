import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface EmployeeFiltersProps {
  department: string;
  setDepartment: (value: string) => void;
  role: string;
  setRole: (value: string) => void;
  location: string;
  setLocation: (value: string) => void;
  status: string;
  setStatus: (value: string) => void;
}

export const EmployeeFilters = ({
  department,
  setDepartment,
  role,
  setRole,
  location,
  setLocation,
  status,
  setStatus,
}: EmployeeFiltersProps) => {
  return (
    <div className="flex gap-2">
      <Select value={department} onValueChange={setDepartment}>
        <SelectTrigger className="w-[180px] bg-primary text-primary-foreground">
          <SelectValue placeholder="Team/Department" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Departments</SelectItem>
          <SelectItem value="IT Department">IT Department</SelectItem>
          <SelectItem value="Marketing">Marketing</SelectItem>
          <SelectItem value="Design">Design</SelectItem>
          <SelectItem value="Sales">Sales</SelectItem>
          <SelectItem value="Development">Development</SelectItem>
        </SelectContent>
      </Select>

      <Select value={role} onValueChange={setRole}>
        <SelectTrigger className="w-[140px] bg-primary text-primary-foreground">
          <SelectValue placeholder="Role" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Roles</SelectItem>
          <SelectItem value="Accountant">Accountant</SelectItem>
          <SelectItem value="Senior Executive">Senior Executive</SelectItem>
          <SelectItem value="Senior Manager">Senior Manager</SelectItem>
          <SelectItem value="Developer">Developer</SelectItem>
          <SelectItem value="Designer">Designer</SelectItem>
        </SelectContent>
      </Select>

      <Select value={location} onValueChange={setLocation}>
        <SelectTrigger className="w-[140px] bg-primary text-primary-foreground">
          <SelectValue placeholder="Location" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Locations</SelectItem>
          <SelectItem value="Lahore">Lahore</SelectItem>
          <SelectItem value="Karachi">Karachi</SelectItem>
          <SelectItem value="Islamabad">Islamabad</SelectItem>
        </SelectContent>
      </Select>

      <Select value={status} onValueChange={setStatus}>
        <SelectTrigger className="w-[140px] bg-primary text-primary-foreground">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Status</SelectItem>
          <SelectItem value="Online">Online</SelectItem>
          <SelectItem value="Offline">Offline</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
