import React from 'react';
import type { MissionPersonnel } from '../api/nasa-api';
import { getRoleColor, getStatusColor, formatRole } from '../lib/personnel-filters';

export interface PersonnelTableProps {
  personnel: MissionPersonnel[];
  onToggleStatus: (id: string) => void;
  onDelete: (id: string) => void;
}

/**
 * PersonnelTable component for displaying mission personnel
 */
export const PersonnelTable: React.FC<PersonnelTableProps> = ({
  personnel,
  onToggleStatus,
  onDelete,
}) => {
  return (
    <div
      style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        overflow: 'hidden',
      }}
    >
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#f8f9fa', borderBottom: '2px solid #e0e0e0' }}>
            <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.85rem', color: '#666', fontWeight: '600' }}>
              Name
            </th>
            <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.85rem', color: '#666', fontWeight: '600' }}>
              Role
            </th>
            <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.85rem', color: '#666', fontWeight: '600' }}>
              Mission
            </th>
            <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.85rem', color: '#666', fontWeight: '600' }}>
              Status
            </th>
            <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.85rem', color: '#666', fontWeight: '600' }}>
              Last Activity
            </th>
            <th style={{ padding: '1rem', textAlign: 'right', fontSize: '0.85rem', color: '#666', fontWeight: '600' }}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {personnel.map((person, index) => (
            <tr
              key={person.id}
              style={{
                borderBottom: index < personnel.length - 1 ? '1px solid #f0f0f0' : 'none',
              }}
            >
              <td style={{ padding: '1rem', fontSize: '0.9rem', color: '#333', fontWeight: '500' }}>
                {person.name}
              </td>
              <td style={{ padding: '1rem' }}>
                <span
                  style={{
                    padding: '0.25rem 0.75rem',
                    borderRadius: '12px',
                    fontSize: '0.8rem',
                    fontWeight: '600',
                    backgroundColor: `${getRoleColor(person.role)}20`,
                    color: getRoleColor(person.role),
                  }}
                >
                  {formatRole(person.role)}
                </span>
              </td>
              <td style={{ padding: '1rem', fontSize: '0.9rem', color: '#666' }}>
                {person.mission}
              </td>
              <td style={{ padding: '1rem' }}>
                <span
                  style={{
                    padding: '0.25rem 0.75rem',
                    borderRadius: '12px',
                    fontSize: '0.8rem',
                    fontWeight: '600',
                    backgroundColor: `${getStatusColor(person.status)}20`,
                    color: getStatusColor(person.status),
                  }}
                >
                  {person.status.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                </span>
              </td>
              <td style={{ padding: '1rem', fontSize: '0.9rem', color: '#666' }}>
                {person.lastActivity}
              </td>
              <td style={{ padding: '1rem', textAlign: 'right' }}>
                <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                  <button
                    onClick={() => onToggleStatus(person.id)}
                    style={{
                      padding: '0.4rem 0.8rem',
                      border: 'none',
                      borderRadius: '4px',
                      backgroundColor: person.status === 'active' ? '#ffc107' : '#51cf66',
                      color: 'white',
                      cursor: 'pointer',
                      fontSize: '0.8rem',
                    }}
                  >
                    {person.status === 'active' ? 'Set Training' : 'Activate'}
                  </button>
                  <button
                    onClick={() => onDelete(person.id)}
                    style={{
                      padding: '0.4rem 0.8rem',
                      border: 'none',
                      borderRadius: '4px',
                      backgroundColor: '#dc3545',
                      color: 'white',
                      cursor: 'pointer',
                      fontSize: '0.8rem',
                    }}
                  >
                    Remove
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

