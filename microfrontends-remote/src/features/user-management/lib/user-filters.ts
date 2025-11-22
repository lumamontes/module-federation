import type { UserWithMetadata } from '../api/users-api';

export interface UserFilters {
  searchTerm: string;
  role: 'all' | UserWithMetadata['role'];
  status: 'all' | UserWithMetadata['status'];
}

/**
 * Filter users based on search term, role, and status
 */
export const filterUsers = (
  users: UserWithMetadata[],
  filters: UserFilters
): UserWithMetadata[] => {
  return users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      user.username.toLowerCase().includes(filters.searchTerm.toLowerCase());
    
    const matchesRole = filters.role === 'all' || user.role === filters.role;
    const matchesStatus = filters.status === 'all' || user.status === filters.status;
    
    return matchesSearch && matchesRole && matchesStatus;
  });
};

/**
 * Get role color for badge display
 */
export const getRoleColor = (role: UserWithMetadata['role']): string => {
  switch (role) {
    case 'admin':
      return '#dc3545';
    case 'user':
      return '#4ecaff';
    case 'viewer':
      return '#6c757d';
  }
};

/**
 * Get status color for badge display
 */
export const getStatusColor = (status: UserWithMetadata['status']): string => {
  return status === 'active' ? '#51cf66' : '#ff6b6b';
};

