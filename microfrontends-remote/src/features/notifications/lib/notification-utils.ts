import type { MissionNotification } from '../api/nasa-api';

/**
 * Get type color for notification badge
 */
export const getTypeColor = (type: MissionNotification['type']): string => {
  switch (type) {
    case 'success':
      return '#51cf66';
    case 'info':
      return '#4ecaff';
    case 'warning':
      return '#ffc107';
    case 'error':
      return '#dc3545';
  }
};

/**
 * Get priority color
 */
export const getPriorityColor = (priority: MissionNotification['priority']): string => {
  switch (priority) {
    case 'critical':
      return '#dc3545';
    case 'high':
      return '#ff6b6b';
    case 'medium':
      return '#ffc107';
    case 'low':
      return '#51cf66';
  }
};

/**
 * Get type label for display
 */
export const getTypeLabel = (type: MissionNotification['type']): string => {
  return type.toUpperCase();
};

/**
 * Filter notifications
 */
export const filterNotifications = (
  notifications: MissionNotification[],
  filter: 'all' | 'unread'
): MissionNotification[] => {
  if (filter === 'all') return notifications;
  return notifications.filter((n) => !n.read);
};

