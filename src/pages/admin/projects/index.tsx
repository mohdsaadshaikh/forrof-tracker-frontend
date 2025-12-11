import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import ProjectHeader from "@/components/projects/ProjectHeader";
import ProjectFilters from "@/components/projects/ProjectFilters";
import ProjectTable from "@/components/projects/ProjectTable";
import ProjectCard from "@/components/projects/ProjectCard";
import { ProjectForm } from "@/components/projects/ProjectForm";

// Mock data for demonstration
const mockProjects = [
  {
    id: "1",
    name: "Website Redesign",
    description: "Complete redesign of company website",
    department: "IT",
    assignedUsers: 5,
    totalHours: 240.5,
    isActive: true,
  },
  {
    id: "2",
    name: "Mobile App Development",
    description: "Native mobile app for iOS and Android",
    department: "IT",
    assignedUsers: 8,
    totalHours: 680.75,
    isActive: true,
  },
  {
    id: "3",
    name: "HR System Overhaul",
    description: "New HRMS implementation",
    department: "HR",
    assignedUsers: 3,
    totalHours: 120.25,
    isActive: true,
  },
  {
    id: "4",
    name: "Q4 Marketing Campaign",
    description: "Holiday season marketing initiatives",
    department: "MARKETING",
    assignedUsers: 6,
    totalHours: 180.5,
    isActive: true,
  },
];

interface Project {
  id: string;
  name: string;
  description: string;
  department: string;
  assignedUsers: number;
  totalHours: number;
  isActive: boolean;
}

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [projects, setProjects] = useState(mockProjects);
  const [isLoading] = useState(false);

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDepartment =
      departmentFilter === "all" || project.department === departmentFilter;
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && project.isActive) ||
      (statusFilter === "inactive" && !project.isActive);

    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const handleCreateClick = () => {
    setEditingProject(null);
    setCreateDialogOpen(true);
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setCreateDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setProjects(projects.filter((p) => p.id !== id));
  };

  const handleSubmit = (formData: any) => {
    if (editingProject) {
      setProjects(
        projects.map((p) =>
          p.id === editingProject.id ? { ...p, ...formData } : p
        )
      );
    } else {
      setProjects([
        ...projects,
        {
          id: String(projects.length + 1),
          ...formData,
        },
      ]);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-full" />
        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-20" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <ProjectHeader onCreateClick={handleCreateClick} />

      <ProjectFilters
        onSearchChange={setSearchQuery}
        onDepartmentChange={setDepartmentFilter}
        onStatusChange={setStatusFilter}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />

      {viewMode === "list" ? (
        <ProjectTable
          projects={filteredProjects}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {filteredProjects.length === 0 && (
        <Card className="p-12 text-center">
          <p className="text-muted-foreground">
            No projects found matching your criteria
          </p>
        </Card>
      )}

      <ProjectForm
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        project={editingProject}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
