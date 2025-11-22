import React from 'react';
import type { MissionNotification } from '../api/nasa-api';
export interface NotificationItemProps {
    notification: MissionNotification;
    onMarkAsRead: (id: string) => void;
    onDelete: (id: string) => void;
}
/**
 * NotificationItem component for displaying individual notifications
 */
export declare const NotificationItem: React.FC<NotificationItemProps>;
