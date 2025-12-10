import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  useCreateAnnouncement,
  useUpdateAnnouncement,
} from "@/hooks/useAnnouncements";
import {
  announcementFormSchema,
  type AnnouncementFormData,
} from "@/lib/validations/announcement";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { Announcement } from "@/hooks/useAnnouncements";
import ResponsiveDialog from "../ResponsiveDialog";

interface AnnouncementFormProps {
  announcement?: Announcement | null;
  onSuccess: () => void;
}

const AnnouncementForm = ({
  announcement,
  onSuccess,
}: AnnouncementFormProps) => {
  const createMutation = useCreateAnnouncement();
  const updateMutation = useUpdateAnnouncement();

  const isEdit = Boolean(announcement);

  const form = useForm<AnnouncementFormData>({
    resolver: zodResolver(announcementFormSchema),
    defaultValues: {
      title: announcement?.title ?? "",
      description: announcement?.description ?? "",
      category:
        (announcement?.category as AnnouncementFormData["category"]) ??
        "update",
      department: announcement?.department ?? "",
    },
  });

  const onSubmit = async (data: AnnouncementFormData) => {
    try {
      // Convert "all" to null for backend compatibility
      const submitData = {
        ...data,
        department: data.department === "all" ? null : data.department,
      };

      if (isEdit && announcement) {
        await updateMutation.mutateAsync({
          id: announcement.id,
          data: submitData as AnnouncementFormData,
        });
      } else {
        await createMutation.mutateAsync(submitData as AnnouncementFormData);
      }
      form.reset();
      onSuccess();
    } catch (err) {
      console.error(err);
    }
  };

  const loading = isEdit ? updateMutation.isPending : createMutation.isPending;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter announcement title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter announcement description"
                  className="min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="holiday">Holiday</SelectItem>
                  <SelectItem value="update">Company Update</SelectItem>
                  <SelectItem value="urgent">Urgent Notice</SelectItem>
                  <SelectItem value="birthday">Birthday</SelectItem>
                  <SelectItem value="hr">HR Announcement</SelectItem>
                  <SelectItem value="policy">Policy Update</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="department"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Department (Optional)</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    <SelectItem value="IT">IT</SelectItem>
                    <SelectItem value="HR">HR</SelectItem>
                    <SelectItem value="MARKETING">Marketing</SelectItem>
                    <SelectItem value="SALES">Sales</SelectItem>
                    <SelectItem value="FINANCE">Finance</SelectItem>
                    <SelectItem value="OPERATIONS">Operations</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-2 justify-end pt-4">
          <Button
            variant="outline"
            type="button"
            onClick={() => {
              form.reset();
              onSuccess();
            }}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            {loading
              ? isEdit
                ? "Updating..."
                : "Creating..."
              : isEdit
              ? "Update"
              : "Create"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AnnouncementForm;

interface CreateAnnouncementDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CreateAnnouncementDialog = ({
  open,
  onOpenChange,
}: CreateAnnouncementDialogProps) => {
  return (
    <ResponsiveDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Create Announcement"
      description="Share important updates with your team"
    >
      <AnnouncementForm onSuccess={() => onOpenChange(false)} />
    </ResponsiveDialog>
  );
};

interface EditAnnouncementDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  announcement?: Announcement | null;
}

export const EditAnnouncementDialog = ({
  open,
  onOpenChange,
  announcement,
}: EditAnnouncementDialogProps) => {
  return (
    <ResponsiveDialog
      open={open}
      onOpenChange={onOpenChange}
      title={announcement ? "Edit Announcement" : "Create Announcement"}
      description={
        announcement
          ? "Update your announcement"
          : "Share important updates with your team"
      }
    >
      <AnnouncementForm
        announcement={announcement}
        onSuccess={() => onOpenChange(false)}
      />
    </ResponsiveDialog>
  );
};
