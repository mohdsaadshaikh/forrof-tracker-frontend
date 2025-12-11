import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit2, Trash2 } from "lucide-react";

interface Project {
  id: string;
  name: string;
  description: string;
  department: string;
  assignedUsers: number;
  totalHours: number;
  isActive: boolean;
}

interface ProjectCardProps {
  project: Project;
  onEdit: (project: Project) => void;
  onDelete: (id: string) => void;
}

export default function ProjectCard({
  project,
  onEdit,
  onDelete,
}: ProjectCardProps) {
  return (
    <Card className="p-4 hover:shadow-lg transition-shadow">
      <div className="space-y-4">
        <div>
          <h3 className="font-semibold text-lg">{project.name}</h3>
          <p className="text-sm text-muted-foreground">{project.description}</p>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">Department</p>
            <Badge variant="outline" className="mt-1">
              {project.department}
            </Badge>
          </div>
          <div>
            <p className="text-muted-foreground">Status</p>
            <Badge
              variant={project.isActive ? "default" : "secondary"}
              className="mt-1"
            >
              {project.isActive ? "Active" : "Inactive"}
            </Badge>
          </div>
          <div>
            <p className="text-muted-foreground">Assigned Users</p>
            <p className="font-medium mt-1">{project.assignedUsers}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Total Hours</p>
            <p className="font-medium mt-1">{project.totalHours}h</p>
          </div>
        </div>

        <div className="flex gap-2 pt-4 border-t">
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={() => onEdit(project)}
          >
            <Edit2 className="h-4 w-4 mr-2" />
            Edit
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onDelete(project.id)}
          >
            <Trash2 className="h-4 w-4 text-red-500" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
