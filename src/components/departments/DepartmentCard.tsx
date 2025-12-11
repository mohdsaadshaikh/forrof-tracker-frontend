import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit2, Trash2, Users, Briefcase } from "lucide-react";

interface Department {
  id: string;
  name: string;
  description: string;
  employeeCount: number;
  projectsCount: number;
  isActive: boolean;
}

interface DepartmentCardProps {
  department: Department;
  onEdit: (department: Department) => void;
  onDelete: (id: string) => void;
}

const DepartmentCard = ({
  department,
  onEdit,
  onDelete,
}: DepartmentCardProps) => {
  return (
    <Card className="p-5 hover:shadow-lg transition-shadow">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="font-semibold text-lg">{department.name}</h3>
            <p className="text-sm text-muted-foreground">
              {department.description}
            </p>
          </div>
          <Badge variant={department.isActive ? "default" : "secondary"}>
            {department.isActive ? "Active" : "Inactive"}
          </Badge>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-3 text-sm border-t pt-3">
          <div>
            <div className="flex items-center gap-1 text-muted-foreground text-xs">
              <Users className="h-3 w-3" />
              Employees
            </div>
            <p className="font-medium mt-1">{department.employeeCount}</p>
          </div>
          <div>
            <div className="flex items-center gap-1 text-muted-foreground text-xs">
              <Briefcase className="h-3 w-3" />
              Projects
            </div>
            <p className="font-medium mt-1">{department.projectsCount}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-3 border-t">
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={() => onEdit(department)}
          >
            <Edit2 className="h-4 w-4 mr-2" />
            Edit
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onDelete(department.id)}
          >
            <Trash2 className="h-4 w-4 text-red-500" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default DepartmentCard;
