/**
 * NASA API client for mission notifications
 * Uses APOD data to create mission alerts and updates
 */
export interface MissionNotification {
    id: string;
    type: 'info' | 'success' | 'warning' | 'error';
    title: string;
    message: string;
    timestamp: string;
    read: boolean;
    mission: string;
    priority: 'low' | 'medium' | 'high' | 'critical';
}
/**
 * Transform APOD data into mission notifications
 */
export declare const fetchMissionNotifications: () => Promise<MissionNotification[]>;
