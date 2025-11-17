import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSession } from "@/lib/auth-client";
import {
  AlertCircle,
  Calendar,
  CheckCircle,
  Clock,
  FileText,
  XCircle,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function EmployeeDashboard() {
  const { data: session } = useSession();
  const userName = session?.user?.name || "Employee";

  const stats = {
    totalLeaves: 20,
    usedLeaves: 5,
    pendingLeaves: 2,
    approvedLeaves: 3,
    rejectedLeaves: 0,
  };

  const recentLeaves = [
    {
      id: 1,
      type: "Sick Leave",
      startDate: "2025-11-15",
      endDate: "2025-11-16",
      status: "Approved",
      days: 2,
    },
    {
      id: 2,
      type: "Casual Leave",
      startDate: "2025-11-20",
      endDate: "2025-11-20",
      status: "Pending",
      days: 1,
    },
  ];

  const upcomingHolidays = [
    { id: 1, name: "Christmas", date: "2025-12-25" },
    { id: 2, name: "New Year", date: "2026-01-01" },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold">Welcome back, {userName}!</h1>
        <p className="text-muted-foreground mt-1">
          Here's your attendance and leave overview
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Leaves</p>
                <p className="text-2xl font-bold">{stats.totalLeaves}</p>
              </div>
              <Calendar className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Used Leaves</p>
                <p className="text-2xl font-bold">{stats.usedLeaves}</p>
              </div>
              <FileText className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold">{stats.pendingLeaves}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Approved</p>
                <p className="text-2xl font-bold">{stats.approvedLeaves}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Rejected</p>
                <p className="text-2xl font-bold">{stats.rejectedLeaves}</p>
              </div>
              <XCircle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Leave Requests */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Leave Requests</CardTitle>
            <Button asChild size="sm" variant="outline">
              <Link to="/employee/leaves">View All</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentLeaves.map((leave) => (
                <div
                  key={leave.id}
                  className="flex items-start justify-between border-b pb-3 last:border-0"
                >
                  <div className="space-y-1">
                    <p className="font-medium">{leave.type}</p>
                    <p className="text-sm text-muted-foreground">
                      {leave.startDate} to {leave.endDate} ({leave.days} day
                      {leave.days > 1 ? "s" : ""})
                    </p>
                  </div>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      leave.status === "Approved"
                        ? "bg-green-100 text-green-800"
                        : leave.status === "Pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {leave.status}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Holidays */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Holidays</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingHolidays.map((holiday) => (
                <div
                  key={holiday.id}
                  className="flex items-center justify-between border-b pb-3 last:border-0"
                >
                  <div className="flex items-center gap-3">
                    <AlertCircle className="h-5 w-5 text-blue-500" />
                    <p className="font-medium">{holiday.name}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {holiday.date}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button asChild className="h-auto py-6" variant="outline">
              <Link
                to="/employee/leaves"
                className="flex flex-col items-center gap-2"
              >
                <FileText className="h-6 w-6" />
                <span>Apply for Leave</span>
              </Link>
            </Button>
            <Button asChild className="h-auto py-6" variant="outline">
              <Link
                to="/employee/announcements"
                className="flex flex-col items-center gap-2"
              >
                <Calendar className="h-6 w-6" />
                <span>View Announcements</span>
              </Link>
            </Button>
            <Button asChild className="h-auto py-6" variant="outline">
              <Link
                to="/employee/profile"
                className="flex flex-col items-center gap-2"
              >
                <FileText className="h-6 w-6" />
                <span>Update Profile</span>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
