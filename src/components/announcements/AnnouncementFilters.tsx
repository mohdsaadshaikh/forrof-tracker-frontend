import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";

interface AnnouncementFiltersProps {
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onDepartmentChange: (value: string) => void;
}

const AnnouncementFilters = ({
  onSearchChange,
  onCategoryChange,
  onDepartmentChange,
}: AnnouncementFiltersProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search announcements..."
          className="pl-10"
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <Select onValueChange={onCategoryChange}>
        <SelectTrigger className="w-full sm:w-[180px] bg-primary text-primary-foreground!">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Categories</SelectItem>
          <SelectItem value="holiday">Holiday</SelectItem>
          <SelectItem value="update">Update</SelectItem>
          <SelectItem value="urgent">Urgent</SelectItem>
          <SelectItem value="birthday">Birthday</SelectItem>
          <SelectItem value="hr">HR</SelectItem>
          <SelectItem value="policy">Policy</SelectItem>
        </SelectContent>
      </Select>
      <Select onValueChange={onDepartmentChange}>
        <SelectTrigger className="w-full sm:w-[180px] bg-primary text-primary-foreground!">
          <SelectValue placeholder="Department" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Departments</SelectItem>
          <SelectItem value="IT">IT</SelectItem>
          <SelectItem value="HR">HR</SelectItem>
          <SelectItem value="Marketing">Marketing</SelectItem>
          <SelectItem value="Sales">Sales</SelectItem>
          <SelectItem value="Finance">Finance</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default AnnouncementFilters;
