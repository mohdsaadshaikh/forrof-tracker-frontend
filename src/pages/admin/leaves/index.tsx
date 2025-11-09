import { useState } from "react";
import { LeaveHeader } from "@/components/leave/LeaveHeader";
import { LeaveFilters } from "@/components/leave/LeaveFilters";
import { LeaveTable } from "@/components/leave/LeaveTable";
import { LeaveCard } from "@/components/leave/LeaveCard";
import { ApplyLeaveDialog } from "@/components/leave/ApplyLeaveDialog";
import { ViewLeaveDialog } from "@/components/leave/ViewLeaveDialog";
import {
  useLeaveData,
  useUpdateLeaveStatus,
  useDeleteLeave,
  type Leave,
} from "@/hooks/useLeaveData";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";

const Leaves = () => {
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [search, setSearch] = useState("");
  const [leaveType, setLeaveType] = useState("All");
  const [status, setStatus] = useState("All");
  const [department, setDepartment] = useState("All");
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [selectedLeave, setSelectedLeave] = useState<Leave | null>(null);

  const { data, isLoading } = useLeaveData({
    page,
    pageSize,
    search,
    leaveType,
    status,
    department,
    startDate,
    endDate,
  });

  const updateStatus = useUpdateLeaveStatus();
  const deleteLeave = useDeleteLeave();

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      await updateStatus.mutateAsync({ id, status: newStatus });
      toast({
        title: "Success",
        description: `Leave request ${newStatus.toLowerCase()}`,
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to update leave status",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteLeave.mutateAsync(id);
      toast({
        title: "Success",
        description: "Leave request deleted",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to delete leave request",
        variant: "destructive",
      });
    }
  };

  const handleView = (leave: Leave) => {
    setSelectedLeave(leave);
    setViewDialogOpen(true);
  };

  return (
    <div className="container space-y-6">
      <LeaveHeader
        onCreateClick={() => setCreateDialogOpen(true)}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />

      <LeaveFilters
        search={search}
        onSearchChange={setSearch}
        leaveType={leaveType}
        onLeaveTypeChange={setLeaveType}
        status={status}
        onStatusChange={setStatus}
        department={department}
        onDepartmentChange={setDepartment}
        startDate={startDate}
        onStartDateChange={setStartDate}
        endDate={endDate}
        onEndDateChange={setEndDate}
      />

      {isLoading ? (
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-20 w-full" />
          ))}
        </div>
      ) : !data?.leaves.length ? (
        <div className="text-center py-12 border rounded-lg bg-muted/50">
          <p className="text-muted-foreground mb-4">No leave requests found</p>
        </div>
      ) : (
        <>
          {isMobile || viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {data.leaves.map((leave) => (
                <LeaveCard
                  key={leave.id}
                  leave={leave}
                  onView={handleView}
                  onApprove={(id) => handleStatusChange(id, "Approved")}
                  onReject={(id) => handleStatusChange(id, "Rejected")}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          ) : (
            <LeaveTable
              leaves={data.leaves}
              onView={handleView}
              onStatusChange={handleStatusChange}
              onDelete={handleDelete}
            />
          )}

          {data.totalPages > 1 && (
            <Pagination className="mt-6">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    className={
                      page === 1
                        ? "pointer-events-none opacity-50"
                        : "cursor-pointer"
                    }
                  />
                </PaginationItem>
                {Array.from({ length: data.totalPages }, (_, i) => i + 1).map(
                  (pageNum) => (
                    <PaginationItem key={pageNum}>
                      <PaginationLink
                        onClick={() => setPage(pageNum)}
                        isActive={page === pageNum}
                        className="cursor-pointer"
                      >
                        {pageNum}
                      </PaginationLink>
                    </PaginationItem>
                  )
                )}
                <PaginationItem>
                  <PaginationNext
                    onClick={() =>
                      setPage((p) => Math.min(data.totalPages, p + 1))
                    }
                    className={
                      page === data.totalPages
                        ? "pointer-events-none opacity-50"
                        : "cursor-pointer"
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </>
      )}

      <ApplyLeaveDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
      />
      <ViewLeaveDialog
        leave={selectedLeave}
        open={viewDialogOpen}
        onOpenChange={setViewDialogOpen}
      />
    </div>
  );
};

export default Leaves;
