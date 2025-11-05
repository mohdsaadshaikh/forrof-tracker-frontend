import type { AnnouncementFormData } from "@/lib/validations/announcement";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export interface Announcement {
  id: string;
  title: string;
  description: string;
  category: "holiday" | "update" | "urgent" | "birthday" | "hr" | "policy";
  department?: string;
  createdBy: string;
  createdAt: Date;
  publishDate?: Date;
}

// Dummy data
const dummyAnnouncements: Announcement[] = [
  {
    id: "1",
    title: "Office Will Remain Closed on Friday",
    description:
      "Due to the national holiday, our office will remain closed. Please plan your work accordingly.",
    category: "holiday",
    department: "All",
    createdBy: "HR Manager",
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
  },
  {
    id: "2",
    title: "System Maintenance Scheduled",
    description:
      "Our IT systems will undergo scheduled maintenance from 10 PM to 2 AM. Services may be temporarily unavailable.",
    category: "update",
    department: "IT",
    createdBy: "IT Admin",
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // Yesterday
  },
  {
    id: "3",
    title: "Happy Birthday Sarah!",
    description:
      "Join us in wishing Sarah from Marketing a very happy birthday! Cake cutting at 3 PM in the cafeteria.",
    category: "birthday",
    department: "Marketing",
    createdBy: "Admin",
    createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000),
  },
  {
    id: "4",
    title: "New Remote Work Policy",
    description:
      "We're implementing a new hybrid work policy effective next month. Please review the guidelines attached.",
    category: "policy",
    department: "All",
    createdBy: "HR Manager",
    createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000),
  },
];

export const useAnnouncements = () => {
  return useQuery({
    queryKey: ["announcements"],
    queryFn: async () => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      return dummyAnnouncements;
    },
  });
};

export const useCreateAnnouncement = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: AnnouncementFormData) => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return {
        id: Math.random().toString(36).substr(2, 9),
        ...data,
        createdBy: "Current User",
        createdAt: new Date(),
      };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["announcements"] });
    },
  });
};

export const useDeleteAnnouncement = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["announcements"] });
    },
  });
};
