import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { loadNASASettings, saveNASASettings, defaultNASASettings, type NASASettings } from '../api/nasa-api';

/**
 * Custom hook for managing NASA API settings
 * Uses React Query for data fetching and caching
 */
export const useSettings = () => {
  const queryClient = useQueryClient();

  // Load settings
  const {
    data: settings,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['nasa-settings'],
    queryFn: loadNASASettings,
    staleTime: Infinity, // Settings don't change often
    initialData: defaultNASASettings, // Provide initial data
  });

  // Save settings mutation
  const saveSettingsMutation = useMutation({
    mutationFn: saveNASASettings,
    onSuccess: (newSettings) => {
      queryClient.setQueryData(['nasa-settings'], newSettings);
    },
  });

  return {
    settings: settings || defaultNASASettings,
    isLoading,
    error,
    saveSettings: saveSettingsMutation.mutate,
    isSaving: saveSettingsMutation.isPending,
    saveSuccess: saveSettingsMutation.isSuccess,
  };
};

