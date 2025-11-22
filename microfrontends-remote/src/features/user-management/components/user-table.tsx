import React from 'react';
import type { UserWithMetadata } from '../api/users-api';
import { getRoleColor, getStatusColor } from '../lib/user-filters';

export interface UserTableProps {
  users: UserWithMetadata[];
  onToggleStatus: (id: string) => void;
  onDelete: (id: string) => void;
}

/**
 * UserTable component for displaying users in a table
 */
export const UserTable: React.FC<UserTableProps> = ({
  users,
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
              Email
            </th>
            <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.85rem', color: '#666', fontWeight: '600' }}>
              Role
            </th>
            <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.85rem', color: '#666', fontWeight: '600' }}>
              Status
            </th>
            <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.85rem', color: '#666', fontWeight: '600' }}>
              Last Login
            </th>
            <th style={{ padding: '1rem', textAlign: 'right', fontSize: '0.85rem', color: '#666', fontWeight: '600' }}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr
              key={user.id}
              style={{
                borderBottom: index < users.length - 1 ? '1px solid #f0f0f0' : 'none',
              }}
            >
              <td style={{ padding: '1rem', fontSize: '0.9rem', color: '#333' }}>
                {user.name}
              </td>
              <td style={{ padding: '1rem', fontSize: '0.9rem', color: '#666' }}>
                {user.email}
              </td>
              <td style={{ padding: '1rem' }}>
                <span
                  style={{
                    padding: '0.25rem 0.75rem',
                    borderRadius: '12px',
                    fontSize: '0.8rem',
                    fontWeight: '600',
                    backgroundColor: `${getRoleColor(user.role)}20`,
                    color: getRoleColor(user.role),
                  }}
                >
                  {user.role}
                </span>
              </td>
              <td style={{ padding: '1rem' }}>
                <span
                  style={{
                    padding: '0.25rem 0.75rem',
                    borderRadius: '12px',
                    fontSize: '0.8rem',
                    fontWeight: '600',
                    backgroundColor: `${getStatusColor(user.status)}20`,
                    color: getStatusColor(user.status),
                  }}
                >
                  {user.status}
                </span>
              </td>
              <td style={{ padding: '1rem', fontSize: '0.9rem', color: '#666' }}>
                {user.lastLogin}
              </td>
              <td style={{ padding: '1rem', textAlign: 'right' }}>
                <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                  <button
                    onClick={() => onToggleStatus(user.id)}
                    style={{
                      padding: '0.4rem 0.8rem',
                      border: 'none',
                      borderRadius: '4px',
                      backgroundColor: user.status === 'active' ? '#ffc107' : '#51cf66',
                      color: 'white',
                      cursor: 'pointer',
                      fontSize: '0.8rem',
                    }}
                  >
                    {user.status === 'active' ? 'Deactivate' : 'Activate'}
                  </button>
                  <button
                    onClick={() => onDelete(user.id)}
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
                    Delete
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

