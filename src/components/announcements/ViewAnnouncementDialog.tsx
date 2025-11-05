import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { type Announcement } from "@/hooks/useAnnouncements";
import { formatDistanceToNow, format } from "date-fns";
import { CalendarDays, User, Building2 } from "lucide-react";

interface ViewAnnouncementDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  announcement: Announcement | null;
}

const categoryColors = {
  holiday: "bg-blue-500/10 text-blue-700 dark:text-blue-400",
  update: "bg-green-500/10 text-green-700 dark:text-green-400",
  urgent: "bg-red-500/10 text-red-700 dark:text-red-400",
  birthday: "bg-pink-500/10 text-pink-700 dark:text-pink-400",
  hr: "bg-purple-500/10 text-purple-700 dark:text-purple-400",
  policy: "bg-orange-500/10 text-orange-700 dark:text-orange-400",
};

const ViewAnnouncementDialog = ({
  open,
  onOpenChange,
  announcement,
}: ViewAnnouncementDialogProps) => {
  if (!announcement) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between gap-4">
            <DialogTitle className="text-2xl">{announcement.title}</DialogTitle>
            <Badge
              variant="secondary"
              className={categoryColors[announcement.category]}
            >
              {announcement.category}
            </Badge>
          </div>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>{announcement.createdBy}</span>
            </div>
            <div className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4" />
              <span>{format(announcement.createdAt, "PPP")}</span>
              <span className="text-xs">
                (
                {formatDistanceToNow(announcement.createdAt, {
                  addSuffix: true,
                })}
                )
              </span>
            </div>
            {announcement.department && (
              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4" />
                <span>{announcement.department}</span>
              </div>
            )}
          </div>

          <Separator />

          <div className="prose dark:prose-invert max-w-none">
            <p className="text-foreground whitespace-pre-wrap">
              {announcement.description}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewAnnouncementDialog;
