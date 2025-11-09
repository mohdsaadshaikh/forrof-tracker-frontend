import { Button } from "@/components/ui/button";
import { Plus, LayoutGrid, List } from "lucide-react";

interface LeaveHeaderProps {
  onCreateClick: () => void;
  viewMode: "grid" | "list";
  onViewModeChange: (mode: "grid" | "list") => void;
}

export const LeaveHeader = ({
  onCreateClick,
  viewMode,
  onViewModeChange,
}: LeaveHeaderProps) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
      <div>
        <h1 className="text-3xl font-bold">Leave Management</h1>
        <p className="text-muted-foreground mt-1">
          Manage employee leave requests
        </p>
      </div>
      <div className="flex gap-2">
        <div className="hidden sm:flex border rounded-md">
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            size="icon"
            onClick={() => onViewModeChange("grid")}
            className="rounded-r-none"
          >
            <LayoutGrid className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            size="icon"
            onClick={() => onViewModeChange("list")}
            className="rounded-l-none"
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
        <Button onClick={onCreateClick}>
          <Plus className="h-4 w-4" />
          Apply Leave
        </Button>
      </div>
    </div>
  );
};
