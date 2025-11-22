import type { MissionNotification } from '../api/nasa-api';
/**
 * Get type color for notification badge
 */
export declare const getTypeColor: (type: MissionNotification["type"]) => string;
/**
 * Get priority color
 */
export declare const getPriorityColor: (priority: MissionNotification["priority"]) => string;
/**
 * Get type label for display
 */
export declare const getTypeLabel: (type: MissionNotification["type"]) => string;
/**
 * Filter notifications
 */
export declare const filterNotifications: (notifications: MissionNotification[], filter: "all" | "unread") => MissionNotification[];
