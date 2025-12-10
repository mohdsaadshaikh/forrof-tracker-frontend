import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/axios";

export interface ServerNotification {
  id: string;
  recipientId: string;
  type: "announcement" | "leave" | "check-in" | "check-out";
  title: string;
  message: string;
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
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  data: ServerNotification[];
}

interface UnreadCountResponse {
  count: number;
}

const NOTIFICATIONS_KEY = "notifications";

export const useServerNotifications = (
  page: number = 1,
  limit: number = 10
) => {
  return useQuery<GetNotificationsResponse>({
    queryKey: [NOTIFICATIONS_KEY, page, limit],
    queryFn: async () => {
      const { data } = await api.get<GetNotificationsResponse>(
        `/notifications?page=${page}&limit=${limit}`
      );
      return data;
    },
    staleTime: 30000, // 30 seconds
    refetchInterval: 30000, // Refetch every 30 seconds
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
      const { data } = await api.patch(`/notifications/${notificationId}/read`);
      return data;
    },
    onSuccess: () => {
      // Invalidate and refetch notifications
      queryClient.invalidateQueries({ queryKey: [NOTIFICATIONS_KEY] });
      queryClient.invalidateQueries({
        queryKey: [NOTIFICATIONS_KEY, "unread-count"],
      });
    },
  });
};

export const useMarkAllAsRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const { data } = await api.patch(`/notifications/read-all`);
      return data;
    },
    onSuccess: () => {
      // Invalidate and refetch notifications
      queryClient.invalidateQueries({ queryKey: [NOTIFICATIONS_KEY] });
      queryClient.invalidateQueries({
        queryKey: [NOTIFICATIONS_KEY, "unread-count"],
      });
    },
  });
};

export const useDeleteNotification = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (notificationId: string) => {
      await api.delete(`/notifications/${notificationId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [NOTIFICATIONS_KEY] });
      queryClient.invalidateQueries({
        queryKey: [NOTIFICATIONS_KEY, "unread-count"],
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
    },
  });
};
