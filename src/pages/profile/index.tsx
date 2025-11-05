import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { ChangePasswordForm } from "@/components/profile/ChangePasswordForm";
import { UserSettingsForm } from "@/components/profile/UserSettingsForm";
import { ReportIssueForm } from "@/components/profile/ReportIssueForm";

const Profile = () => {
  const userData = {
    name: "Gavano",
    email: "gavano@forrof.com",
    role: "HR Manager",
    avatarUrl: "/placeholder.svg",
    firstName: "Gavano",
    lastName: "Manager",
    phone: "+1 234 567 8900",
    department: "HR",
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Profile</h1>
        <p className="text-muted-foreground">
          Manage your profile and account settings
        </p>
      </div>

      <ProfileHeader
        name={userData.name}
        email={userData.email}
        role={userData.role}
        avatarUrl={userData.avatarUrl}
      />

      <Tabs defaultValue="settings" className="w-full">
        <TabsList className="grid w-full max-w-2xl grid-cols-3">
          <TabsTrigger value="settings">User Settings</TabsTrigger>
          <TabsTrigger value="password">Change Password</TabsTrigger>
          <TabsTrigger value="report">Report Issue</TabsTrigger>
        </TabsList>

        <TabsContent value="settings" className="mt-6">
          <UserSettingsForm
            initialData={{
              firstName: userData.firstName,
              lastName: userData.lastName,
              email: userData.email,
              phone: userData.phone,
              department: userData.department,
              role: userData.role,
            }}
          />
        </TabsContent>

        <TabsContent value="password" className="mt-6">
          <ChangePasswordForm />
        </TabsContent>

        <TabsContent value="report" className="mt-6">
          <ReportIssueForm />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;
