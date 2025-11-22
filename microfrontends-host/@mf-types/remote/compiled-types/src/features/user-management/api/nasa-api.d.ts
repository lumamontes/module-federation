/**
 * NASA API client for mission personnel/astronauts
 * Uses APOD data to create a mission personnel directory
 */
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
export declare const fetchMissionPersonnel: () => Promise<MissionPersonnel[]>;
