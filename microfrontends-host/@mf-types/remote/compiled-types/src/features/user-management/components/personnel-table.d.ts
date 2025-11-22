import React from 'react';
import type { MissionPersonnel } from '../api/nasa-api';
export interface PersonnelTableProps {
    personnel: MissionPersonnel[];
    onToggleStatus: (id: string) => void;
    onDelete: (id: string) => void;
}
/**
 * PersonnelTable component for displaying mission personnel
 */
export declare const PersonnelTable: React.FC<PersonnelTableProps>;
