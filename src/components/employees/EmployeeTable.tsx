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
import type { Employee } from "@/hooks/useEmployees";
import { useNavigate } from "react-router-dom";

interface EmployeeTableProps {
  employees: Employee[];
}

export const EmployeeTable = ({ employees }: EmployeeTableProps) => {
  const navigate = useNavigate();

  const handleRowClick = (employeeId: string) => {
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
            {/* <TableHead>Location</TableHead>
            <TableHead>Status</TableHead> */}
          </TableRow>
        </TableHeader>
        <TableBody>
          {employees.map((employee) => (
            <TableRow
              key={employee.id}
              className="cursor-pointer hover:bg-muted/50 transition-colors"
              onClick={() => handleRowClick(employee.id)}
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
                    <span className="font-medium">{employee.name}</span>
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
                {employee.salary ? `$${employee.salary.toLocaleString()}` : "-"}
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
