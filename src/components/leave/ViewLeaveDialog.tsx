import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { type Leave } from "@/hooks/useLeaveData";
import { format } from "date-fns";
import { Calendar, Clock, FileText, User, X } from "lucide-react";
import { useState } from "react";
import ResponsiveDialog from "../ResponsiveDialog";

interface ViewLeaveDialogProps {
  leave: Leave | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const getStatusVariant = (status: string) => {
  switch (status) {
    case "APPROVED":
      return "default";
    case "REJECTED":
      return "destructive";
    case "PENDING":
      return "secondary";
    case "CANCELLED":
      return "outline";
    default:
      return "outline";
  }
};

const getStatusLabel = (status: string) => {
  switch (status) {
    case "APPROVED":
      return "Approved";
    case "REJECTED":
      return "Rejected";
    case "PENDING":
      return "Pending";
    case "CANCELLED":
      return "Cancelled";
    default:
      return status;
  }
};

export const ViewLeaveDialog = ({
  leave,
  open,
  onOpenChange,
}: ViewLeaveDialogProps) => {
  const [showPDF, setShowPDF] = useState(false);

  if (!leave) return null;

  if (showPDF && leave.prescriptionUrl) {
    const isPDF =
      leave.prescriptionUrl.endsWith(".pdf") ||
      leave.prescriptionUrl.includes("/raw/upload/");

    return (
      <ResponsiveDialog
        open={open}
        onOpenChange={onOpenChange}
        title="Medical Prescription"
        description=""
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Prescription Document</h3>
            <Button variant="ghost" size="sm" onClick={() => setShowPDF(false)}>
              <X className="w-4 h-4" />
            </Button>
          </div>
          <div className="space-y-3">
            <div className="text-xs text-gray-500 p-2 bg-gray-50 rounded break-all">
              <p>URL: {leave.prescriptionUrl}</p>
            </div>
            <div
              className="border rounded-lg bg-gray-50 overflow-auto flex items-center justify-center"
              style={{ height: "400px" }}
            >
              {isPDF ? (
                <iframe
                  src={leave.prescriptionUrl}
                  className="w-full h-full"
                  title="Prescription PDF"
                />
              ) : (
                <img
                  src={leave.prescriptionUrl}
                  alt="Prescription"
                  className="object-contain"
                  style={{ maxWidth: "100%", maxHeight: "100%" }}
                />
              )}
            </div>
          </div>
          <div className="flex gap-2">
            <a
              href={leave.prescriptionUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1"
            >
              <Button variant="outline" size="sm" className="w-full">
                <FileText className="w-4 h-4 mr-2" />
                Open in New Tab
              </Button>
            </a>
          </div>
        </div>
      </ResponsiveDialog>
    );
  }

  return (
    <ResponsiveDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Leave Details"
      description=""
    >
      <div className="space-y-6">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-xl font-semibold">{leave.employee.name}</h3>
            <p className="text-sm text-muted-foreground">{leave.employee.id}</p>
          </div>
          <Badge variant={getStatusVariant(leave.status)} className="text-sm">
            {getStatusLabel(leave.status)}
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <FileText className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium">Leave Type</p>
                <p className="text-sm text-muted-foreground">
                  {leave.leaveType.replace(/_/g, " ")}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium">Start Date</p>
                <p className="text-sm text-muted-foreground">
                  {format(new Date(leave.startDate), "MMMM dd, yyyy")}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium">End Date</p>
                <p className="text-sm text-muted-foreground">
                  {format(new Date(leave.endDate), "MMMM dd, yyyy")}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium">Duration</p>
                <p className="text-sm text-muted-foreground">
                  {leave.duration} days
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium">Applied Date</p>
                <p className="text-sm text-muted-foreground">
                  {format(new Date(leave.createdAt), "MMMM dd, yyyy")}
                </p>
              </div>
            </div>

            {leave.approvedBy && (
              <>
                <div className="flex items-start gap-3">
                  <User className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Approved By</p>
                    <p className="text-sm text-muted-foreground">
                      {leave.approvedBy.name}
                    </p>
                  </div>
                </div>

                {leave.approvalDate && (
                  <div className="flex items-start gap-3">
                    <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Approval Date</p>
                      <p className="text-sm text-muted-foreground">
                        {format(new Date(leave.approvalDate), "MMMM dd, yyyy")}
                      </p>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {leave.reason && (
          <div className="space-y-2 pt-4 border-t">
            <p className="text-sm font-medium">Reason</p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {leave.reason}
            </p>
          </div>
        )}

        {leave.leaveType === "SICK_LEAVE" && leave.prescriptionUrl && (
          <div className="space-y-2 pt-4 border-t">
            <p className="text-sm font-medium">Medical Prescription</p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowPDF(true)}
              >
                <FileText className="w-4 h-4 mr-2" />
                View Prescription
              </Button>
            </div>
          </div>
        )}

        {leave.approvalNotes && (
          <div className="space-y-2 pt-4 border-t">
            <p className="text-sm font-medium">Approval Notes</p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {leave.approvalNotes}
            </p>
          </div>
        )}
      </div>
    </ResponsiveDialog>
  );
};
