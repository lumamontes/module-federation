/**
 * NASA API client for mission notifications
 * Uses APOD data to create mission alerts and updates
 */

import { fetchAPODRange, getDateRange, type APODResponse } from '../../analytics/api/nasa-api';

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
export const fetchMissionNotifications = async (): Promise<MissionNotification[]> => {
  const { startDate, endDate } = getDateRange('7d');
  const apodData = await fetchAPODRange(startDate, endDate);
  
  const notificationTypes: MissionNotification['type'][] = ['info', 'success', 'warning', 'error'];
  const priorities: MissionNotification['priority'][] = ['low', 'medium', 'high', 'critical'];
  
  const missions = [
    'ISS Expedition',
    'Artemis Program',
    'Mars Perseverance',
    'James Webb Telescope',
    'DART Mission',
  ];
  
  const notificationTemplates = [
    { type: 'success' as const, title: 'Mission Milestone Achieved', priority: 'high' as const },
    { type: 'info' as const, title: 'Mission Update', priority: 'medium' as const },
    { type: 'warning' as const, title: 'System Alert', priority: 'high' as const },
    { type: 'error' as const, title: 'Critical Issue', priority: 'critical' as const },
    { type: 'success' as const, title: 'Data Collection Complete', priority: 'low' as const },
  ];
  
  return apodData.slice(0, 8).map((apod, index) => {
    const template = notificationTemplates[index % notificationTemplates.length];
    const hoursAgo = Math.floor(Math.random() * 48);
    const timestamp = hoursAgo === 0 
      ? 'Just now' 
      : hoursAgo === 1 
      ? '1 hour ago' 
      : hoursAgo < 24 
      ? `${hoursAgo} hours ago` 
      : `${Math.floor(hoursAgo / 24)} days ago`;
    
    return {
      id: `notification-${index + 1}`,
      type: template.type,
      title: `${template.title}: ${apod.title.substring(0, 40)}`,
      message: apod.explanation.substring(0, 150) + '...',
      timestamp,
      read: index > 3, // First 4 are unread
      mission: missions[index % missions.length],
      priority: template.priority,
    };
  });
};

