import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAnnouncements } from "@/hooks/useAnnouncements";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, User } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function EmployeeAnnouncements() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading } = useAnnouncements({
    page: currentPage,
    pageSize: 10,
    search,
    category: "",
    department: "",
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-full" />
        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Announcements</h1>
        <p className="text-muted-foreground mt-1">
          Stay updated with company announcements
        </p>
      </div>

      <Input
        placeholder="Search announcements..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="max-w-md"
      />

      <div className="space-y-4">
        {data?.announcements.map((announcement) => (
          <Card
            key={announcement.id}
            className="p-6 hover:shadow-md transition-shadow"
          >
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="space-y-1 flex-1">
                  <h3 className="text-xl font-semibold">
                    {announcement.title}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      <span>{announcement.createdBy?.name || "Admin"}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {new Date(announcement.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Badge variant="outline">{announcement.category}</Badge>
                  {announcement.department && (
                    <Badge variant="secondary">{announcement.department}</Badge>
                  )}
                </div>
              </div>
              <p className="text-muted-foreground">
                {announcement.description}
              </p>
            </div>
          </Card>
        ))}
      </div>

      {data?.announcements.length === 0 && (
        <Card className="p-12 text-center">
          <p className="text-muted-foreground">No announcements found</p>
        </Card>
      )}
    </div>
  );
}
