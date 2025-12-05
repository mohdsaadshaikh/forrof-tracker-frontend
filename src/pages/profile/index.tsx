import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { ChangePasswordForm } from "@/components/profile/ChangePasswordForm";
import { UserSettingsForm } from "@/components/profile/UserSettingsForm";
import { ReportIssueForm } from "@/components/profile/ReportIssueForm";
import { useSession } from "@/lib/auth-client";

const Profile = () => {
  const { data: session } = useSession();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Profile</h1>
        <p className="text-muted-foreground">
          Manage your profile and account settings
        </p>
      </div>

      <ProfileHeader
        name={session?.user?.name || "Not Specified"}
        email={session?.user?.email || "Not Specified"}
        department={session?.user?.department || "Not Specified"}
        avatarUrl={session?.user?.image || undefined}
      />

      <Tabs defaultValue="settings" className="w-full">
        <TabsList className="grid w-full max-w-2xl grid-cols-3">
          <TabsTrigger value="settings">User Settings</TabsTrigger>
          <TabsTrigger value="password">Change Password</TabsTrigger>
          <TabsTrigger value="report">Report Issue</TabsTrigger>
        </TabsList>

        <TabsContent value="settings" className="mt-6">
          <UserSettingsForm
            initialData={
              session?.user
                ? {
                    name: session.user.name,
                    email: session.user.email,
                    phone:
                      ((session.user as unknown as Record<string, unknown>)
                        .phone as string | null) || null,
                    department:
                      ((session.user as unknown as Record<string, unknown>)
                        .department as string | null) || null,
                    role:
                      ((session.user as unknown as Record<string, unknown>)
                        .role as string | null) || null,
                    salary:
                      ((session.user as unknown as Record<string, unknown>)
                        .salary as number | null) || null,
                    address:
                      ((session.user as unknown as Record<string, unknown>)
                        .address as string | null) || null,
                  }
                : undefined
            }
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
