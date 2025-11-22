import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchMissionPersonnel, type MissionPersonnel } from '../api/nasa-api';

/**
 * Custom hook for managing mission personnel data
 * Uses React Query for data fetching and caching
 */
export const useMissionPersonnel = () => {
  const queryClient = useQueryClient();

  // Fetch mission personnel
  const {
    data: personnel,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['mission-personnel'],
    queryFn: fetchMissionPersonnel,
    staleTime: 1000 * 60 * 10, // 10 minutes
    gcTime: 1000 * 60 * 60, // 1 hour
  });

  // Update personnel mutation
  const updatePersonnelMutation = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<MissionPersonnel> }) => {
      queryClient.setQueryData<MissionPersonnel[]>(['mission-personnel'], (old) => {
        if (!old) return old;
        return old.map((person) => (person.id === id ? { ...person, ...updates } : person));
      });
      return { id, ...updates };
    },
  });

  // Delete personnel mutation
  const deletePersonnelMutation = useMutation({
    mutationFn: async (id: string) => {
      queryClient.setQueryData<MissionPersonnel[]>(['mission-personnel'], (old) => {
        if (!old) return old;
        return old.filter((person) => person.id !== id);
      });
      return id;
    },
  });

  return {
    personnel: personnel || [],
    isLoading,
    error,
    refetch,
    updatePersonnel: updatePersonnelMutation.mutate,
    deletePersonnel: deletePersonnelMutation.mutate,
    isUpdating: updatePersonnelMutation.isPending,
    isDeleting: deletePersonnelMutation.isPending,
  };
};

