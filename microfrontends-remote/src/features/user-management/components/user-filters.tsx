import React from 'react';
import type { UserWithMetadata } from '../api/users-api';
import type { UserFilters } from '../lib/user-filters';

export interface UserFiltersProps {
  filters: UserFilters;
  onFiltersChange: (filters: UserFilters) => void;
}

/**
 * UserFilters component for filtering users
 */
export const UserFiltersComponent: React.FC<UserFiltersProps> = ({
  filters,
  onFiltersChange,
}) => {
  const updateFilter = <K extends keyof UserFilters>(key: K, value: UserFilters[K]) => {
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
        placeholder="Search users..."
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
        onChange={(e) => updateFilter('role', e.target.value as UserFilters['role'])}
        style={{
          padding: '0.75rem',
          border: '1px solid #ddd',
          borderRadius: '6px',
          fontSize: '0.9rem',
          backgroundColor: 'white',
        }}
      >
        <option value="all">All Roles</option>
        <option value="admin">Admin</option>
        <option value="user">User</option>
        <option value="viewer">Viewer</option>
      </select>
      <select
        value={filters.status}
        onChange={(e) => updateFilter('status', e.target.value as UserFilters['status'])}
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
        <option value="inactive">Inactive</option>
      </select>
    </div>
  );
};

