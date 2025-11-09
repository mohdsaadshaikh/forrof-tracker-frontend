import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Search, Calendar as CalendarIcon } from "lucide-react";
import {
  leaveTypes,
  leaveStatuses,
  departments,
} from "@/lib/validations/leave";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface LeaveFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  leaveType: string;
  onLeaveTypeChange: (value: string) => void;
  status: string;
  onStatusChange: (value: string) => void;
  department: string;
  onDepartmentChange: (value: string) => void;
  startDate?: Date;
  onStartDateChange: (date?: Date) => void;
  endDate?: Date;
  onEndDateChange: (date?: Date) => void;
}

export const LeaveFilters = ({
  search,
  onSearchChange,
  leaveType,
  onLeaveTypeChange,
  status,
  onStatusChange,
  department,
  onDepartmentChange,
  startDate,
  onStartDateChange,
  endDate,
  onEndDateChange,
}: LeaveFiltersProps) => {
  return (
    <div className="space-y-4 mb-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by employee or ID..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <Select value={leaveType} onValueChange={onLeaveTypeChange}>
          <SelectTrigger>
            <SelectValue placeholder="Leave Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Types</SelectItem>
            {leaveTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={status} onValueChange={onStatusChange}>
          <SelectTrigger>
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Status</SelectItem>
            {leaveStatuses.map((stat) => (
              <SelectItem key={stat} value={stat}>
                {stat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={department} onValueChange={onDepartmentChange}>
          <SelectTrigger>
            <SelectValue placeholder="Department" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Departments</SelectItem>
            {departments.map((dept) => (
              <SelectItem key={dept} value={dept}>
                {dept}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "justify-start text-left font-normal",
                !startDate && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {startDate ? format(startDate, "PPP") : "From Date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={startDate}
              onSelect={onStartDateChange}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "justify-start text-left font-normal",
                !endDate && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {endDate ? format(endDate, "PPP") : "To Date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={endDate}
              onSelect={onEndDateChange}
              initialFocus
              disabled={(date: Date | undefined) =>
                startDate ? (date ? date < startDate : false) : false
              }
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};
