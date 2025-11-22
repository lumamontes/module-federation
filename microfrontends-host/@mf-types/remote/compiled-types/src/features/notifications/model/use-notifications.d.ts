import { type MissionNotification } from '../api/nasa-api';
/**
 * Custom hook for managing mission notifications
 * Uses React Query for data fetching and caching
 */
export declare const useNotifications: () => {
    notifications: MissionNotification[];
    unreadCount: number;
    isLoading: boolean;
    error: Error | null;
    refetch: (options?: import("@tanstack/react-query").RefetchOptions) => Promise<import("@tanstack/react-query").QueryObserverResult<MissionNotification[], Error>>;
    markAsRead: import("@tanstack/react-query").UseMutateFunction<string, Error, string, unknown>;
    markAllAsRead: import("@tanstack/react-query").UseMutateFunction<void, Error, void, unknown>;
    deleteNotification: import("@tanstack/react-query").UseMutateFunction<string, Error, string, unknown>;
    isMarking: boolean;
    isDeleting: boolean;
};
