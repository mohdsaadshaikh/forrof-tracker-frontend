import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import ResponsiveDialog from "@/components/ResponsiveDialog";

interface DepartmentFormData {
  name: string;
  description: string;
  isActive: boolean;
}

interface DepartmentFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  department?: {
    id: string;
    name: string;
    description: string;
    isActive: boolean;
  } | null;
  onSubmit: (data: DepartmentFormData) => void;
}

export function DepartmentForm({
  open,
  onOpenChange,
  department,
  onSubmit,
}: DepartmentFormProps) {
  const [formData, setFormData] = React.useState<DepartmentFormData>({
    name: department?.name || "",
    description: department?.description || "",
    isActive: department?.isActive ?? true,
  });

  React.useEffect(() => {
    if (department) {
      setFormData({
        name: department.name,
        description: department.description,
        isActive: department.isActive,
      });
    }
  }, [department]);

  const handleSubmit = () => {
    onSubmit(formData);
    onOpenChange(false);
  };

  return (
    <ResponsiveDialog
      open={open}
      onOpenChange={onOpenChange}
      title={department ? "Edit Department" : "Create Department"}
      description={
        department ? "Update department details" : "Add a new department"
      }
    >
      <div className="space-y-4">
        {/* Name */}
        <div>
          <Label>Department Name</Label>
          <Input
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g., IT, HR, Sales"
            className="mt-1"
          />
        </div>

        {/* Description */}
        <div>
          <Label>Description</Label>
          <Textarea
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            placeholder="Enter department description"
            className="mt-1"
            rows={3}
          />
        </div>

        {/* Head Name */}
        {/* Removed - field no longer needed */}

        {/* Budget */}
        {/* Removed - field no longer needed */}

        {/* Active Status */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="isActive"
            checked={formData.isActive}
            onChange={(e) =>
              setFormData({ ...formData, isActive: e.target.checked })
            }
            className="rounded"
          />
          <Label htmlFor="isActive" className="cursor-pointer">
            Active Department
          </Label>
        </div>
      </div>

      <div className="flex gap-2 pt-6 justify-end">
        <Button variant="outline" onClick={() => onOpenChange(false)}>
          Cancel
        </Button>
        <Button onClick={handleSubmit}>
          {department ? "Update" : "Create"}
        </Button>
      </div>
    </ResponsiveDialog>
  );
}
