import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, MapPin, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/attendance/StatusBadge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { SalaryEditDialog } from "./SalaryEditDialog";
import { useState } from "react";
import type { Employee } from "./types";

interface EmployeeProfileCardProps {
  employee: Employee;
  getDepartmentColor: (dept: string) => string;
  onSalaryUpdated?: () => Promise<void>;
}

export const EmployeeProfileCard = ({
  employee,
  getDepartmentColor,
  onSalaryUpdated,
}: EmployeeProfileCardProps) => {
  const [salaryDialogOpen, setSalaryDialogOpen] = useState(false);

  const initials = employee.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <Card>
      <CardContent className="pt-6">
        {/* Avatar with Online Status */}
        <div className="flex justify-center mb-6 relative">
          <div className="w-24 h-24 bg-linear-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-4xl font-bold text-white">
            {initials}
          </div>
        </div>

        {/* Status and Department */}
        <div className="flex gap-2 mb-6 justify-center flex-wrap">
          <StatusBadge status={employee.isOnline ? "Online" : "Offline"} />
          <Badge className={getDepartmentColor(employee.department)}>
            {employee.department}
          </Badge>
        </div>

        {/* Contact Info */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-2 text-sm">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <a
              href={`mailto:${employee.email}`}
              className="text-blue-600 hover:underline truncate"
            >
              {employee.email}
            </a>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Phone className="h-4 w-4 text-muted-foreground" />
            <span>{employee.phone}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span>{employee.location}</span>
          </div>
        </div>

        {/* Details */}
        <div className="space-y-3 border-t pt-4">
          <div>
            <p className="text-xs text-muted-foreground uppercase font-semibold">
              Date Joined
            </p>
            <p className="text-sm font-medium">
              {employee.dateJoined
                ? new Date(employee.dateJoined).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })
                : "N/A"}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground uppercase font-semibold">
              Salary
            </p>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  {employee.salary && employee.salary > 0 ? (
                    <button
                      onClick={() => setSalaryDialogOpen(true)}
                      className="text-sm font-medium hover:text-blue-600 transition-colors cursor-pointer"
                    >
                      PKR {employee.salary.toLocaleString()}
                    </button>
                  ) : (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSalaryDialogOpen(true)}
                      className="h-8"
                    >
                      <DollarSign className="h-4 w-4" />
                    </Button>
                  )}
                </TooltipTrigger>
                <TooltipContent>
                  {employee.salary && employee.salary > 0
                    ? "Click to edit salary"
                    : "Click to add salary"}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </CardContent>

      {
        <SalaryEditDialog
          open={salaryDialogOpen}
          onOpenChange={setSalaryDialogOpen}
          employee={employee}
          onSalaryUpdate={async () => {
            setSalaryDialogOpen(false);
            if (onSalaryUpdated) {
              await onSalaryUpdated();
            }
          }}
        />
      }
    </Card>
  );
};
