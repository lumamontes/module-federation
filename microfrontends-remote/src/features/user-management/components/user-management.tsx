import React, { useState } from 'react';
import { useMissionPersonnel } from '../model/use-mission-personnel';
import { filterPersonnel, type PersonnelFilters } from '../lib/personnel-filters';
import { PersonnelTable } from './personnel-table';
import { PersonnelFiltersComponent } from './personnel-filters';
import type { MissionPersonnel } from '../api/nasa-api';

export interface UserManagementProps {
  // Legacy prop name for compatibility
}

/**
 * User Management component - now displays NASA Mission Personnel
 * Fetches data from NASA APOD API and transforms it into mission personnel directory
 */
export const UserManagement: React.FC<UserManagementProps> = () => {
  const { personnel, isLoading, error, refetch, updatePersonnel, deletePersonnel } = useMissionPersonnel();
  const [filters, setFilters] = useState<PersonnelFilters>({
    searchTerm: '',
    role: 'all',
    status: 'all',
  });

  const filteredPersonnel = filterPersonnel(personnel, filters);

  const handleToggleStatus = (id: string) => {
    const person = personnel.find((p) => p.id === id);
    if (!person) return;

    const statusMap: Record<string, MissionPersonnel['status']> = {
      active: 'training',
      'on-mission': 'active',
      training: 'active',
      retired: 'active',
    };

    updatePersonnel({
      id,
      updates: { status: statusMap[person.status] || 'active' },
    });
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to remove this personnel from the mission?')) {
      deletePersonnel(id);
    }
  };

  if (isLoading) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem' }}>
        <div
          style={{
            width: '40px',
            height: '40px',
            margin: '0 auto 1rem',
            border: '3px solid #4ecaff',
            borderTopColor: 'transparent',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
          }}
        />
        <p style={{ color: '#666' }}>Loading mission personnel...</p>
        <style>
          {`
            @keyframes spin {
              to { transform: rotate(360deg); }
            }
          `}
        </style>
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          padding: '2rem',
          border: '2px solid #dc3545',
          borderRadius: '8px',
          backgroundColor: '#fff5f5',
        }}
      >
        <h3 style={{ margin: '0 0 0.5rem 0', color: '#dc3545' }}>
          Error loading mission personnel
        </h3>
        <p style={{ margin: '0 0 1rem 0', color: '#666', fontSize: '0.9rem' }}>
          {error instanceof Error ? error.message : 'Failed to fetch data from NASA API'}
        </p>
        <button
          onClick={() => refetch()}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#4ecaff',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
          }}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ margin: '0 0 0.25rem 0', color: '#333' }}>Mission Personnel</h1>
          <p style={{ margin: 0, color: '#666', fontSize: '0.85rem' }}>
            Manage NASA mission personnel and crew assignments
          </p>
        </div>
        <button
          onClick={() => refetch()}
          style={{
            padding: '0.5rem 1rem',
            border: '1px solid #ddd',
            borderRadius: '6px',
            backgroundColor: 'white',
            color: '#333',
            cursor: 'pointer',
            fontSize: '0.9rem',
          }}
          title="Refresh data"
        >
          Refresh
        </button>
      </div>

      <PersonnelFiltersComponent filters={filters} onFiltersChange={setFilters} />

      <PersonnelTable
        personnel={filteredPersonnel}
        onToggleStatus={handleToggleStatus}
        onDelete={handleDelete}
      />

      <div style={{ marginTop: '1rem', color: '#666', fontSize: '0.85rem' }}>
        Showing {filteredPersonnel.length} of {personnel.length} personnel
      </div>
    </div>
  );
};

// Re-export type for compatibility
export type { MissionPersonnel as User } from '../api/nasa-api';
