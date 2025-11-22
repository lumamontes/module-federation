/**
 * NASA API client for mission personnel/astronauts
 * Uses APOD data to create a mission personnel directory
 */

import { fetchAPODRange, getDateRange, type APODResponse } from '../../analytics/api/nasa-api';

export interface MissionPersonnel {
  id: string;
  name: string;
  role: 'mission-commander' | 'pilot' | 'mission-specialist' | 'payload-specialist';
  status: 'active' | 'on-mission' | 'training' | 'retired';
  mission: string;
  lastActivity: string;
  imageUrl?: string;
}

/**
 * Transform APOD data into mission personnel entries
 * Each APOD represents a different mission/personnel member
 */
export const fetchMissionPersonnel = async (): Promise<MissionPersonnel[]> => {
  const { startDate, endDate } = getDateRange('30d');
  const apodData = await fetchAPODRange(startDate, endDate);
  
  const roles: MissionPersonnel['role'][] = [
    'mission-commander',
    'pilot',
    'mission-specialist',
    'payload-specialist',
  ];
  
  const statuses: MissionPersonnel['status'][] = [
    'active',
    'on-mission',
    'training',
    'retired',
  ];
  
  const missions = [
    'ISS Expedition 68',
    'Artemis I',
    'Mars Perseverance',
    'James Webb Space Telescope',
    'DART Mission',
    'Parker Solar Probe',
  ];
  
  return apodData.slice(0, 10).map((apod, index) => {
    const daysAgo = Math.floor(Math.random() * 30);
    const lastActivity = daysAgo === 0 
      ? 'Today' 
      : daysAgo === 1 
      ? 'Yesterday' 
      : `${daysAgo} days ago`;
    
    return {
      id: `personnel-${index + 1}`,
      name: extractNameFromTitle(apod.title),
      role: roles[index % roles.length],
      status: statuses[index % statuses.length],
      mission: missions[index % missions.length],
      lastActivity,
      imageUrl: apod.url,
    };
  });
};

/**
 * Extract a name-like string from APOD title
 */
const extractNameFromTitle = (title: string): string => {
  // Try to extract meaningful names from titles
  const words = title.split(' ');
  if (words.length >= 2) {
    return `${words[0]} ${words[1]}`;
  }
  return title.substring(0, 20);
};

