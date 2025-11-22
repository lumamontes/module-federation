import React from 'react';
export interface UserManagementProps {
}
/**
 * User Management component - now displays NASA Mission Personnel
 * Fetches data from NASA APOD API and transforms it into mission personnel directory
 */
export declare const UserManagement: React.FC<UserManagementProps>;
export type { MissionPersonnel as User } from '../api/nasa-api';
