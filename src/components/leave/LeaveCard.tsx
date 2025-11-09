import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Check, X, Trash2, Calendar, Clock } from "lucide-react";
import { type Leave } from "@/hooks/useLeaveData";
import { format } from "date-fns";

interface LeaveCardProps {
  leave: Leave;
  onView: (leave: Leave) => void;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  onDelete: (id: string) => void;
}

const getStatusVariant = (status: string) => {
  switch (status) {
    case "Approved":
      return "default";
    case "Rejected":
      return "destructive";
    case "Pending":
      return "secondary";
    default:
      return "outline";
  }
};

export const LeaveCard = ({
  leave,
  onView,
  onApprove,
  onReject,
  onDelete,
}: LeaveCardProps) => {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-lg">{leave.employeeName}</h3>
            <p className="text-sm text-muted-foreground">{leave.employeeId}</p>
          </div>
          <Badge variant={getStatusVariant(leave.status)}>{leave.status}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <span className="font-medium">Type:</span>
            <span className="text-muted-foreground">{leave.leaveType}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="font-medium">Department:</span>
            <span className="text-muted-foreground">{leave.department}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">
              {format(new Date(leave.startDate), "MMM dd")} -{" "}
              {format(new Date(leave.endDate), "MMM dd, yyyy")}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">{leave.duration} days</span>
          </div>
        </div>

        <div className="pt-3 border-t flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={() => onView(leave)}
          >
            <Eye className="h-4 w-4 mr-1" />
            View
          </Button>
          {leave.status === "Pending" && (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onApprove(leave.id)}
              >
                <Check className="h-4 w-4 text-green-600" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onReject(leave.id)}
              >
                <X className="h-4 w-4 text-red-600" />
              </Button>
            </>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={() => onDelete(leave.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
