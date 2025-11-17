import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ApplyLeaveDialog } from "@/components/leave/ApplyLeaveDialog";
import { LeaveCard } from "@/components/leave/LeaveCard";
import { ViewLeaveDialog } from "@/components/leave/ViewLeaveDialog";
import { useLeaveData, type Leave } from "@/hooks/useLeaveData";
import { Skeleton } from "@/components/ui/skeleton";

export default function EmployeeLeaves() {
  const [isApplyDialogOpen, setIsApplyDialogOpen] = useState(false);
  const [selectedLeave, setSelectedLeave] = useState<Leave | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading } = useLeaveData({
    page: currentPage,
    pageSize: 10,
    status: "",
    search: "",
    leaveType: "",
    department: "",
    startDate: undefined,
    endDate: undefined,
  });

  const handleViewLeave = (leave: Leave) => {
    setSelectedLeave(leave);
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-full" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="h-48" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">My Leaves</h1>
          <p className="text-muted-foreground mt-1">
            View and manage your leave requests
          </p>
        </div>
        <Button onClick={() => setIsApplyDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Apply Leave
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Total Requests</p>
          <p className="text-2xl font-bold">{data?.totalLeaves || 0}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Pending</p>
          <p className="text-2xl font-bold text-yellow-600">
            {data?.leaves.filter((l) => l.status === "Pending").length || 0}
          </p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Approved</p>
          <p className="text-2xl font-bold text-green-600">
            {data?.leaves.filter((l) => l.status === "Approved").length || 0}
          </p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Rejected</p>
          <p className="text-2xl font-bold text-red-600">
            {data?.leaves.filter((l) => l.status === "Rejected").length || 0}
          </p>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data?.leaves.map((leave) => (
          <LeaveCard
            key={leave.id}
            leave={leave}
            onView={handleViewLeave}
            onApprove={() => {}}
            onReject={() => {}}
            onDelete={() => {}}
          />
        ))}
      </div>

      {data?.leaves.length === 0 && (
        <Card className="p-12 text-center">
          <p className="text-muted-foreground">No leave requests found</p>
          <Button onClick={() => setIsApplyDialogOpen(true)} className="mt-4">
            Apply for your first leave
          </Button>
        </Card>
      )}

      <ApplyLeaveDialog
        open={isApplyDialogOpen}
        onOpenChange={setIsApplyDialogOpen}
      />
      <ViewLeaveDialog
        leave={selectedLeave}
        open={!!selectedLeave}
        onOpenChange={(open) => !open && setSelectedLeave(null)}
      />
    </div>
  );
}
