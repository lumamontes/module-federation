import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchMissionNotifications, type MissionNotification } from '../api/nasa-api';

/**
 * Custom hook for managing mission notifications
 * Uses React Query for data fetching and caching
 */
export const useNotifications = () => {
  const queryClient = useQueryClient();

  // Fetch notifications
  const {
    data: notifications,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['mission-notifications'],
    queryFn: fetchMissionNotifications,
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 30, // 30 minutes
  });

  // Mark as read mutation
  const markAsReadMutation = useMutation({
    mutationFn: async (id: string) => {
      queryClient.setQueryData<MissionNotification[]>(['mission-notifications'], (old) => {
        if (!old) return old;
        return old.map((notif) => (notif.id === id ? { ...notif, read: true } : notif));
      });
      return id;
    },
  });

  // Mark all as read mutation
  const markAllAsReadMutation = useMutation({
    mutationFn: async () => {
      queryClient.setQueryData<MissionNotification[]>(['mission-notifications'], (old) => {
        if (!old) return old;
        return old.map((notif) => ({ ...notif, read: true }));
      });
    },
  });

  // Delete notification mutation
  const deleteNotificationMutation = useMutation({
    mutationFn: async (id: string) => {
      queryClient.setQueryData<MissionNotification[]>(['mission-notifications'], (old) => {
        if (!old) return old;
        return old.filter((notif) => notif.id !== id);
      });
      return id;
    },
  });

  const unreadCount = notifications?.filter((n) => !n.read).length || 0;

  return {
    notifications: notifications || [],
    unreadCount,
    isLoading,
    error,
    refetch,
    markAsRead: markAsReadMutation.mutate,
    markAllAsRead: markAllAsReadMutation.mutate,
    deleteNotification: deleteNotificationMutation.mutate,
    isMarking: markAsReadMutation.isPending,
    isDeleting: deleteNotificationMutation.isPending,
  };
};

