import { useParams } from "react-router-dom";
import { useEmployees } from "@/hooks/useEmployees";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const EmployeesInfo = () => {
  const { id } = useParams<{ id: string }>();
  const { data } = useEmployees(1, "", "", "", "", ""); 

  const employee = data?.employees.find((emp) => emp.id === id);

  if (!employee) return <p>Employee not found</p>;

  return (
    <div className="p-4 sm:p-6 border-2">
      <div className="flex flex-col m-5 ">
        <div className="flex items-center border-b border-b-gray-200 mb-5">
          <Avatar className="h-26 w-26 mb-4  ">
          <AvatarImage src={employee.avatar} alt={employee.name} />
          <AvatarFallback>
            {employee.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
           <h2 className="text-2xl font-semibold mb-1 ml-6">{employee.name}</h2>
           <span className="ml-6">{employee.id}</span>
        </div>
       
        </div>
        
        <div className="space-y-2 text-sm w-full">
          <div className="flex justify-between">
            <span className="font-medium ">Role</span>
            <span className="text-muted-foreground">{employee.role}</span>
          </div>
          
          
          <div className="flex justify-between">
            <span className="font-medium ">Department</span>
            <span className="text-muted-foreground">{employee.department}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium ">Date Joined</span>
            <span className="text-muted-foreground">{employee.dateJoined}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium ">Location</span>
            <span className="text-muted-foreground">{employee.location}</span>
          </div>
           


          <div className="flex justify-between border-t border-t-gray-200 mt-3 ">
            <span className="font-medium  mt-5">Email</span>
            <span className="text-muted-foreground mt-5">{employee.email}</span>
          </div>
          <div className="flex justify-between mb-5">
            <span className="font-medium ">Salary</span>
            <span className="text-muted-foreground">${employee.salary}</span>
          </div>


          <div className="flex justify-between items-center border-t border-t-gray-200 ">
            <span className="font-medium  mt-5">Status</span>
            
            <Badge
              variant={employee.status === "Online" ? "default" : "secondary"}
              className={
                employee.status === "Online"
                  ? "bg-green-100 text-green-800 mt-5"
                  : "mt-5"
              }
            >
              {employee.status}
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeesInfo;
