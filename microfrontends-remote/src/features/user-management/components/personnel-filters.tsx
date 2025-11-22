import React from 'react';
import type { MissionPersonnel } from '../api/nasa-api';
import type { PersonnelFilters } from '../lib/personnel-filters';

export interface PersonnelFiltersProps {
  filters: PersonnelFilters;
  onFiltersChange: (filters: PersonnelFilters) => void;
}

/**
 * PersonnelFilters component for filtering mission personnel
 */
export const PersonnelFiltersComponent: React.FC<PersonnelFiltersProps> = ({
  filters,
  onFiltersChange,
}) => {
  const updateFilter = <K extends keyof PersonnelFilters>(key: K, value: PersonnelFilters[K]) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  return (
    <div
      style={{
        display: 'flex',
        gap: '1rem',
        marginBottom: '2rem',
        flexWrap: 'wrap',
      }}
    >
      <input
        type="text"
        placeholder="Search personnel or missions..."
        value={filters.searchTerm}
        onChange={(e) => updateFilter('searchTerm', e.target.value)}
        style={{
          flex: 1,
          minWidth: '200px',
          padding: '0.75rem',
          border: '1px solid #ddd',
          borderRadius: '6px',
          fontSize: '0.9rem',
        }}
      />
      <select
        value={filters.role}
        onChange={(e) => updateFilter('role', e.target.value as PersonnelFilters['role'])}
        style={{
          padding: '0.75rem',
          border: '1px solid #ddd',
          borderRadius: '6px',
          fontSize: '0.9rem',
          backgroundColor: 'white',
        }}
      >
        <option value="all">All Roles</option>
        <option value="mission-commander">Mission Commander</option>
        <option value="pilot">Pilot</option>
        <option value="mission-specialist">Mission Specialist</option>
        <option value="payload-specialist">Payload Specialist</option>
      </select>
      <select
        value={filters.status}
        onChange={(e) => updateFilter('status', e.target.value as PersonnelFilters['status'])}
        style={{
          padding: '0.75rem',
          border: '1px solid #ddd',
          borderRadius: '6px',
          fontSize: '0.9rem',
          backgroundColor: 'white',
        }}
      >
        <option value="all">All Status</option>
        <option value="active">Active</option>
        <option value="on-mission">On Mission</option>
        <option value="training">Training</option>
        <option value="retired">Retired</option>
      </select>
    </div>
  );
};

