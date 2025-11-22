export { UserManagement } from './components/user-management';
export type { UserManagementProps } from './components/user-management';
export type { MissionPersonnel as User } from './api/nasa-api';

// Model exports
export { useMissionPersonnel } from './model/use-mission-personnel';

// Lib exports
export { filterPersonnel, getRoleColor, getStatusColor, formatRole } from './lib/personnel-filters';
export type { PersonnelFilters } from './lib/personnel-filters';

