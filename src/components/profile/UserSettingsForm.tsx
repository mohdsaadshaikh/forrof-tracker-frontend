import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PhoneInput } from "@/components/common/PhoneInput";
import { updateUser } from "@/lib/auth-client";
import { useState, useEffect } from "react";
import { toast } from "sonner";

interface UserSettingsFormProps {
  initialData?: {
    name?: string;
    email?: string;
    phone?: string | null;
    department?: string | null;
    role?: string | null;
    salary?: number | null;
    address?: string | null;
  };
}

export const UserSettingsForm = ({ initialData }: UserSettingsFormProps) => {
  const [formData, setFormData] = useState(
    initialData || {
      name: "",
      email: "",
      phone: null,
      department: null,
      role: null,
      salary: null,
      address: null,
    }
  );

  // Update formData when initialData changes
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // updateUser comes from better-auth client and accepts partial user fields
      const updatePayload: Record<string, string | number | undefined> = {
        name: formData.name,
        phone: formData.phone ?? undefined,
        address: formData.address ?? undefined,
      };

      await updateUser(updatePayload);
      toast.success("Settings updated successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update settings");
    }
  };

  return (
    <div className="space-y-6">
      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>Update your personal details</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                readOnly
                className="cursor-not-allowed opacity-75"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <PhoneInput
                value={formData.phone ?? ""}
                onChange={(value: string) =>
                  setFormData({ ...formData, phone: value })
                }
                defaultCountry="PK"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Input
                  id="department"
                  value={formData.department ?? ""}
                  readOnly
                  className="cursor-not-allowed opacity-75"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Input
                  id="role"
                  value={formData.role ?? ""}
                  readOnly
                  className="cursor-not-allowed opacity-75"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="salary">Salary</Label>
              <Input
                id="salary"
                type="number"
                value={formData.salary ?? ""}
                readOnly
                className="cursor-not-allowed opacity-75"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={formData.address ?? ""}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
              />
            </div>

            <Button type="submit" className="bg-brand hover:bg-brand/90">
              Save Changes
            </Button>
          </form>
        </CardContent>
      </Card>
      {/* 
      <Card className="max-w-3xl">
        <CardHeader>
          <CardTitle>Notification Preferences</CardTitle>
          <CardDescription>
            Manage how you receive notifications
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 max-w-2xl">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Email Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Receive notifications via email
              </p>
            </div>
            <Switch
              checked={notifications.email}
              onCheckedChange={(checked) =>
                setNotifications({ ...notifications, email: checked })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Push Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Receive push notifications in browser
              </p>
            </div>
            <Switch
              checked={notifications.push}
              onCheckedChange={(checked) =>
                setNotifications({ ...notifications, push: checked })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>SMS Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Receive notifications via SMS
              </p>
            </div>
            <Switch
              checked={notifications.sms}
              onCheckedChange={(checked) =>
                setNotifications({ ...notifications, sms: checked })
              }
            />
          </div>
        </CardContent>
      </Card> */}
    </div>
  );
};
