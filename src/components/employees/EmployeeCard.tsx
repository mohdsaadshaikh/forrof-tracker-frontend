import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import type { Employee } from "@/hooks/useEmployees";
import { useNavigate } from "react-router-dom";

interface EmployeeCardProps {
  employee: Employee;
}

export const EmployeeCard = ({ employee }: EmployeeCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/employees/${employee.id}`);
  };

  return (
    <Card className="relative hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        {/* <div className="absolute top-4 left-4">
          <Checkbox />
        </div> */}
        <div className="flex flex-col items-center text-center">
          <Avatar className="h-20 w-20 mb-4">
            <AvatarImage src={employee.avatar} alt={employee.name} />
            <AvatarFallback>
              {employee.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <h3
            className="font-semibold text-lg mb-2 hover:underline cursor-pointer"
            onClick={handleClick}
          >
            {employee.name}
          </h3>
          <div className="space-y-1.5 text-sm w-full">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Role</span>
              <span className="font-medium">{employee.role}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">ID</span>
              <span className="font-medium">{employee.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Email</span>
              <span className="font-medium text-xs truncate max-w-[150px]">
                {employee.email}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Department</span>
              <span className="font-medium text-xs">{employee.department}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Date Joined</span>
              <span className="font-medium text-xs">{employee.dateJoined}</span>
            </div>
            {employee.salary && (
              <div className="flex justify-between border-t pt-1.5">
                <span className="text-muted-foreground">Salary</span>
                <span className="font-medium text-green-600">
                  PKR {employee.salary.toLocaleString()}
                </span>
              </div>
            )}
            {/* <div className="flex justify-between">
              <span className="text-muted-foreground">Location</span>
              <span className="font-medium">{employee.location}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Status</span>
              <Badge
                variant={employee.status === "Online" ? "default" : "secondary"}
                className={
                  employee.status === "Online"
                    ? "bg-green-100 text-green-800"
                    : ""
                }
              >
                {employee.status}
              </Badge>
            </div> */}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
