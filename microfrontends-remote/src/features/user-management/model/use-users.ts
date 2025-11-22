import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchUsers, transformUser, type UserWithMetadata } from '../api/users-api';

/**
 * Custom hook for managing users data
 * Uses React Query for data fetching and caching
 */
export const useUsers = () => {
  const queryClient = useQueryClient();

  // Fetch users
  const {
    data: users,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const apiUsers = await fetchUsers();
      return apiUsers.map((user, index) => transformUser(user, index));
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 30, // 30 minutes
  });

  // Update user mutation
  const updateUserMutation = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<UserWithMetadata> }) => {
      // In a real app, this would call an API
      // For now, we'll update the cache optimistically
      queryClient.setQueryData<UserWithMetadata[]>(['users'], (old) => {
        if (!old) return old;
        return old.map((user) => (user.id === id ? { ...user, ...updates } : user));
      });
      return { id, ...updates };
    },
  });

  // Delete user mutation
  const deleteUserMutation = useMutation({
    mutationFn: async (id: string) => {
      // In a real app, this would call an API
      queryClient.setQueryData<UserWithMetadata[]>(['users'], (old) => {
        if (!old) return old;
        return old.filter((user) => user.id !== id);
      });
      return id;
    },
  });

  return {
    users: users || [],
    isLoading,
    error,
    refetch,
    updateUser: updateUserMutation.mutate,
    deleteUser: deleteUserMutation.mutate,
    isUpdating: updateUserMutation.isPending,
    isDeleting: deleteUserMutation.isPending,
  };
};

