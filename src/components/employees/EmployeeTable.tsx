import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { Employee } from "@/hooks/useEmployees";
import { useNavigate } from "react-router-dom";
import { UserPlus, UserMinus, DollarSign } from "lucide-react";

interface EmployeeTableProps {
  employees: Employee[];
  onAssignClick?: (employee: Employee) => void;
  onUnassignClick?: (employee: Employee) => void;
  onSalaryClick?: (employee: Employee) => void;
}

export const EmployeeTable = ({
  employees,
  onAssignClick,
  onUnassignClick,
  onSalaryClick,
}: EmployeeTableProps) => {
  const navigate = useNavigate();
  console.log("Employees:", employees);

  const handleAssignClick = (employee: Employee) => {
    if (onAssignClick) {
      onAssignClick(employee);
    }
  };

  const handleRemoveClick = (employee: Employee) => {
    if (onUnassignClick) {
      onUnassignClick(employee);
    }
  };

  const handleSalaryClick = (employee: Employee) => {
    if (onSalaryClick) {
      onSalaryClick(employee);
    }
  };

  const handleClick = (employeeId: string) => {
    navigate(`/employees/${employeeId}`);
  };

  return (
    <div className="border rounded-lg overflow-x-auto w-full">
      <Table>
        <TableHeader>
          <TableRow>
            {/* <TableHead className="w-12">
              <Checkbox />
            </TableHead> */}
            {/* <TableHead>ID</TableHead> */}
            <TableHead>Employee</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Date Joined</TableHead>
            <TableHead>Salary</TableHead>
            <TableHead className="text-right">Manage</TableHead>
            {/* <TableHead>Location</TableHead>
            <TableHead>Status</TableHead> */}
          </TableRow>
        </TableHeader>
        <TableBody>
          {employees.map((employee) => (
            <TableRow
              key={employee.id}
              className="hover:bg-muted/50 transition-colors"
            >
              {/* <TableCell>
                <Checkbox />
              </TableCell> */}
              {/* <TableCell className="font-medium">{employee.id}</TableCell> */}
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={employee.avatar} alt={employee.name} />
                    <AvatarFallback>
                      {employee.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span
                      className="font-medium hover:underline cursor-pointer"
                      onClick={() => handleClick(employee.id)}
                    >
                      {employee.name}
                    </span>
                    <span className="text-xs">{employee.id}</span>
                  </div>
                </div>
              </TableCell>
              <TableCell className="text-muted-foreground">
                {employee.email}
              </TableCell>
              <TableCell>{employee.role}</TableCell>
              <TableCell>{employee.department}</TableCell>
              <TableCell>{employee.dateJoined}</TableCell>
              <TableCell className="text-green-600 font-medium">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      {employee.salary ? (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSalaryClick(employee);
                          }}
                          className="hover:underline cursor-pointer text-left"
                        >
                          PKR {employee.salary.toLocaleString()}
                        </button>
                      ) : (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSalaryClick(employee);
                          }}
                        >
                          <DollarSign className="h-4 w-4" />
                        </Button>
                      )}
                    </TooltipTrigger>
                    <TooltipContent>
                      {employee.salary
                        ? "Click to edit salary"
                        : "Click to add salary"}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </TableCell>
              <TableCell className="text-right">
                <TooltipProvider>
                  <div className="flex items-center justify-end gap-2">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAssignClick(employee);
                          }}
                        >
                          <UserPlus className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Assign to Department</TooltipContent>
                    </Tooltip>
                    {employee.department &&
                      employee.department !== "-" &&
                      employee.department !== "Unassigned" && (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleRemoveClick(employee);
                              }}
                            >
                              <UserMinus className="h-4 w-4 text-red-500" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            Remove from Department
                          </TooltipContent>
                        </Tooltip>
                      )}
                  </div>
                </TooltipProvider>
              </TableCell>
              {/* <TableCell>{employee.location}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    employee.status === "Online" ? "default" : "secondary"
                  }
                  className={
                    employee.status === "Online"
                      ? "bg-green-100 text-green-800"
                      : ""
                  }
                >
                  {employee.status}
                </Badge>
              </TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
