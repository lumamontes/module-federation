import type { MissionPersonnel } from '../api/nasa-api';

export interface PersonnelFilters {
  searchTerm: string;
  role: 'all' | MissionPersonnel['role'];
  status: 'all' | MissionPersonnel['status'];
}

/**
 * Filter personnel based on search term, role, and status
 */
export const filterPersonnel = (
  personnel: MissionPersonnel[],
  filters: PersonnelFilters
): MissionPersonnel[] => {
  return personnel.filter((person) => {
    const matchesSearch =
      person.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      person.mission.toLowerCase().includes(filters.searchTerm.toLowerCase());
    
    const matchesRole = filters.role === 'all' || person.role === filters.role;
    const matchesStatus = filters.status === 'all' || person.status === filters.status;
    
    return matchesSearch && matchesRole && matchesStatus;
  });
};

/**
 * Get role color for badge display
 */
export const getRoleColor = (role: MissionPersonnel['role']): string => {
  switch (role) {
    case 'mission-commander':
      return '#dc3545';
    case 'pilot':
      return '#4ecaff';
    case 'mission-specialist':
      return '#51cf66';
    case 'payload-specialist':
      return '#ffc107';
  }
};

/**
 * Get status color for badge display
 */
export const getStatusColor = (status: MissionPersonnel['status']): string => {
  switch (status) {
    case 'active':
      return '#51cf66';
    case 'on-mission':
      return '#4ecaff';
    case 'training':
      return '#ffc107';
    case 'retired':
      return '#6c757d';
  }
};

/**
 * Format role name for display
 */
export const formatRole = (role: MissionPersonnel['role']): string => {
  return role.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};

