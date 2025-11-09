import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { type Leave } from "@/hooks/useLeaveData";
import { leaveStatuses } from "@/lib/validations/leave";
import { format } from "date-fns";
import { Eye, Trash2 } from "lucide-react";

interface LeaveTableProps {
  leaves: Leave[];
  onView: (leave: Leave) => void;
  onStatusChange: (id: string, status: string) => void;
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

export const LeaveTable = ({
  leaves,
  onView,
  onStatusChange,
  onDelete,
}: LeaveTableProps) => {
  return (
    <ScrollArea className="border rounded-lg">
      <Table className="min-w-[800px]">
        <TableHeader>
          <TableRow>
            <TableHead>Employee</TableHead>
            <TableHead>Leave Type</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead>Start Date</TableHead>
            <TableHead>End Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Applied Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leaves.map((leave) => (
            <TableRow key={leave.id}>
              <TableCell>
                <div>
                  <p className="font-medium">{leave.employeeName}</p>
                  <p className="text-sm text-muted-foreground">
                    {leave.employeeId}
                  </p>
                </div>
              </TableCell>
              <TableCell>{leave.leaveType}</TableCell>
              <TableCell>{leave.duration} days</TableCell>
              <TableCell>{format(new Date(leave.startDate), "PP")}</TableCell>
              <TableCell>{format(new Date(leave.endDate), "PP")}</TableCell>
              <TableCell>
                <Select
                  value={leave.status}
                  onValueChange={(value) => onStatusChange(leave.id, value)}
                >
                  <SelectTrigger className="w-[130px]">
                    <Badge
                      variant={getStatusVariant(leave.status)}
                      className="border-0"
                    >
                      {leave.status}
                    </Badge>
                  </SelectTrigger>
                  <SelectContent>
                    {leaveStatuses.map((status) => (
                      <SelectItem key={status} value={status}>
                        <Badge
                          variant={getStatusVariant(status)}
                          className="border-0"
                        >
                          {status}
                        </Badge>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell>{format(new Date(leave.appliedDate), "PP")}</TableCell>
              <TableCell className="text-right">
                <div className="flex gap-2 justify-end">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onView(leave)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDelete(leave.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};
