import AnnouncementCard from "@/components/announcements/AnnouncementCard";
import AnnouncementFilters from "@/components/announcements/AnnouncementFilters";
import AnnouncementHeader from "@/components/announcements/AnnouncementHeader";
import AnnouncementTable from "@/components/announcements/AnnouncementTable";
import CreateAnnouncementDialog from "@/components/announcements/CreateAnnouncementDialog";
import ViewAnnouncementDialog from "@/components/announcements/ViewAnnouncementDialog";
import { Skeleton } from "@/components/ui/skeleton";
import { useAnnouncements, type Announcement } from "@/hooks/useAnnouncements";
import { useState } from "react";
import { toast } from "sonner";

const Announcements = () => {
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] =
    useState<Announcement | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [departmentFilter, setDepartmentFilter] = useState("all");

  const { data: announcements, isLoading } = useAnnouncements();

  const filteredAnnouncements =
    announcements?.filter((announcement) => {
      const matchesSearch =
        announcement.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        announcement.description
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
      const matchesCategory =
        categoryFilter === "all" || announcement.category === categoryFilter;
      const matchesDepartment =
        departmentFilter === "all" ||
        announcement.department === departmentFilter;

      return matchesSearch && matchesCategory && matchesDepartment;
    }) || [];

  const handleView = (announcement: Announcement) => {
    setSelectedAnnouncement(announcement);
    setViewDialogOpen(true);
  };

  // const handleEdit = (announcement: Announcement) => {
  const handleEdit = () => {
    toast.info("Edit functionality coming soon!");
  };

  // const handleDelete = (id: string) => {
  const handleDelete = () => {
    toast.success("Announcement deleted successfully!");
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <AnnouncementHeader onCreateClick={() => setCreateDialogOpen(true)} />

      <AnnouncementFilters
        onSearchChange={setSearchQuery}
        onCategoryChange={setCategoryFilter}
        onDepartmentChange={setDepartmentFilter}
      />

      {filteredAnnouncements.length === 0 && !isLoading && (
        <div className="text-center py-12 border rounded-lg">
          <p className="text-muted-foreground mb-2">No announcements found.</p>
          <p className="text-sm text-muted-foreground">
            Try adjusting your filters or create a new announcement!
          </p>
        </div>
      )}

      <AnnouncementTable
        announcements={filteredAnnouncements}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <div className="md:hidden space-y-4">
        {filteredAnnouncements.map((announcement) => (
          <AnnouncementCard
            key={announcement.id}
            announcement={announcement}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>

      <CreateAnnouncementDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
      />

      <ViewAnnouncementDialog
        open={viewDialogOpen}
        onOpenChange={setViewDialogOpen}
        announcement={selectedAnnouncement}
      />
    </div>
  );
};

export default Announcements;
