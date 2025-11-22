import type { MissionPersonnel } from '../api/nasa-api';
export interface PersonnelFilters {
    searchTerm: string;
    role: 'all' | MissionPersonnel['role'];
    status: 'all' | MissionPersonnel['status'];
}
/**
 * Filter personnel based on search term, role, and status
 */
export declare const filterPersonnel: (personnel: MissionPersonnel[], filters: PersonnelFilters) => MissionPersonnel[];
/**
 * Get role color for badge display
 */
export declare const getRoleColor: (role: MissionPersonnel["role"]) => string;
/**
 * Get status color for badge display
 */
export declare const getStatusColor: (status: MissionPersonnel["status"]) => string;
/**
 * Format role name for display
 */
export declare const formatRole: (role: MissionPersonnel["role"]) => string;
