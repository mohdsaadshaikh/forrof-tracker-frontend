import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/axios";

export interface ServerNotification {
  id: string;
  recipientId?: string;
  userId?: string;
  type: "announcement" | "leave" | "check-in" | "check-out";
  title?: string;
  message?: string;
  time?: string;
  user?: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
  };
  data?: {
    announcementId?: string;
    leaveId?: string;
    category?: string;
    department?: string;
    [key: string]: string | undefined;
  };
  isRead: boolean;
  readAt?: string;
  createdAt: string;
}

interface GetNotificationsResponse {
  meta?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  pagination?: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
  data: ServerNotification[];
  success?: boolean;
}

interface UnreadCountResponse {
  count: number;
}

interface CheckInOutNotification {
  id: string;
  userId?: string;
  type: "check_in" | "check_out";
  time: string;
  createdAt?: string;
  isRead: boolean;
  user?: {
    id: string;
    name: string;
    email: string;
  };
}

interface CheckInOutNotificationsResponse {
  data: CheckInOutNotification[];
  pagination?: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}

const NOTIFICATIONS_KEY = "notifications";
const CHECKINOUT_NOTIFICATIONS_KEY = "checkinout-notifications";

export const useServerNotifications = (
  page: number = 1,
  limit: number = 10
) => {
  return useQuery<GetNotificationsResponse>({
    queryKey: [NOTIFICATIONS_KEY, page, limit],
    queryFn: async () => {
      try {
        const { data } = await api.get<GetNotificationsResponse>(
          `/notifications?page=${page}&limit=${limit}`
        );

        // Also fetch check-in/check-out notifications if available
        try {
          const { data: checkInOutData } =
            await api.get<CheckInOutNotificationsResponse>(
              `/attendance/notifications/unread?page=${page}&pageSize=${limit}`
            );

          if (checkInOutData?.data && checkInOutData.data.length > 0) {
            // Transform check-in/check-out notifications to match ServerNotification format
            const transformedCheckInOut = checkInOutData.data.map(
              (notification: CheckInOutNotification) => {
                const type =
                  notification.type === "check_in" ? "check-in" : "check-out";
                return {
                  id: notification.id,
                  type: type as "check-in" | "check-out",
                  isRead: notification.isRead,
                  createdAt: (notification.createdAt ||
                    notification.time) as string,
                  time: notification.time,
                  user: notification.user,
                  title: `${notification.user?.name} ${
                    type === "check-in" ? "checked in" : "checked out"
                  }`,
                  message: `at ${new Date(
                    notification.time || notification.createdAt || new Date()
                  ).toLocaleTimeString()}`,
                };
              }
            );

            // Merge both notification types
            const allNotifications = [
              ...(data?.data || []),
              ...transformedCheckInOut,
            ];

            // Sort by date descending
            allNotifications.sort(
              (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            );

            return {
              meta: {
                page,
                limit,
                total: allNotifications.length,
                totalPages: Math.ceil(allNotifications.length / limit),
              },
              data: allNotifications.slice(0, limit),
            };
          }
        } catch {
          // Check-in/check-out endpoint might fail if user is not admin, continue with regular notifications
          console.log("Check-in/check-out notifications not available");
        }

        return data;
      } catch (error) {
        console.error("Error fetching notifications:", error);
        throw error;
      }
    },
    staleTime: 120000, // 2 minutes
    refetchInterval: 120000, // Refetch every 2 minutes
  });
};

export const useUnreadCount = () => {
  return useQuery<UnreadCountResponse>({
    queryKey: [NOTIFICATIONS_KEY, "unread-count"],
    queryFn: async () => {
      const { data } = await api.get<UnreadCountResponse>(
        `/notifications/unread-count`
      );
      return data;
    },
    staleTime: 15000, // 15 seconds
    refetchInterval: 15000, // Refetch every 15 seconds
  });
};

export const useMarkNotificationAsRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (notificationId: string) => {
      try {
        // Try to mark as read in attendance/check-in-out notifications first
        try {
          const { data } = await api.patch(
            `/attendance/notifications/${notificationId}/read`
          );
          return data;
        } catch {
          // Fall back to regular notifications
          const { data } = await api.patch(
            `/notifications/${notificationId}/read`
          );
          return data;
        }
      } catch (error) {
        console.error("Error marking notification as read:", error);
        throw error;
      }
    },
    onSuccess: () => {
      // Invalidate and refetch notifications
      queryClient.invalidateQueries({ queryKey: [NOTIFICATIONS_KEY] });
      queryClient.invalidateQueries({
        queryKey: [NOTIFICATIONS_KEY, "unread-count"],
      });
      queryClient.invalidateQueries({
        queryKey: [CHECKINOUT_NOTIFICATIONS_KEY],
      });
    },
  });
};

export const useMarkAllAsRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      try {
        // Try to mark all as read in attendance notifications
        try {
          const { data } = await api.patch(
            `/attendance/notifications/read-all`
          );
          return data;
        } catch {
          // Fall back to regular notifications
          const { data } = await api.patch(`/notifications/read-all`);
          return data;
        }
      } catch (error) {
        console.error("Error marking all notifications as read:", error);
        throw error;
      }
    },
    onSuccess: () => {
      // Invalidate and refetch notifications
      queryClient.invalidateQueries({ queryKey: [NOTIFICATIONS_KEY] });
      queryClient.invalidateQueries({
        queryKey: [NOTIFICATIONS_KEY, "unread-count"],
      });
      queryClient.invalidateQueries({
        queryKey: [CHECKINOUT_NOTIFICATIONS_KEY],
      });
    },
  });
};

export const useDeleteNotification = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (notificationId: string) => {
      try {
        // Try to delete from attendance/check-in-out notifications first
        try {
          await api.delete(`/attendance/notifications/${notificationId}`);
          return { success: true };
        } catch {
          // Fall back to regular notifications
          await api.delete(`/notifications/${notificationId}`);
          return { success: true };
        }
      } catch (error) {
        console.error("Error deleting notification:", error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [NOTIFICATIONS_KEY] });
      queryClient.invalidateQueries({
        queryKey: [NOTIFICATIONS_KEY, "unread-count"],
      });
      queryClient.invalidateQueries({
        queryKey: [CHECKINOUT_NOTIFICATIONS_KEY],
      });
    },
  });
};

export const useDeleteAllNotifications = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      await api.delete(`/notifications`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [NOTIFICATIONS_KEY] });
      queryClient.invalidateQueries({
        queryKey: [NOTIFICATIONS_KEY, "unread-count"],
      });
      queryClient.invalidateQueries({
        queryKey: [CHECKINOUT_NOTIFICATIONS_KEY],
      });
    },
  });
};
