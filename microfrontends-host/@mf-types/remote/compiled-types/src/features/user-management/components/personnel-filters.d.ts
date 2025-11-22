import React from 'react';
import type { PersonnelFilters } from '../lib/personnel-filters';
export interface PersonnelFiltersProps {
    filters: PersonnelFilters;
    onFiltersChange: (filters: PersonnelFilters) => void;
}
/**
 * PersonnelFilters component for filtering mission personnel
 */
export declare const PersonnelFiltersComponent: React.FC<PersonnelFiltersProps>;
