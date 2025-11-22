import { useQuery } from '@tanstack/react-query';
import { fetchNEOData, fetchAPOD, getDateRange, type APODResponse, type NEOResponse } from '../api/nasa-api';
import { calculateNEOMetrics, formatMetrics, type NEOMetrics } from '../lib/neo-metrics';

export interface UseNasaAnalyticsOptions {
  timeframe?: '7d' | '30d' | '90d';
}

/**
 * Custom hook for fetching and managing NASA NEO analytics data
 * Uses React Query for data fetching, caching, and state management
 */
export const useNasaAnalytics = (options: UseNasaAnalyticsOptions = {}) => {
  const { timeframe = '7d' } = options;
  const { startDate, endDate } = getDateRange(timeframe);

  // Fetch NEO data
  const {
    data: neoData,
    isLoading: isLoadingNEO,
    error: neoError,
    refetch: refetchNEO,
  } = useQuery({
    queryKey: ['neo-data', startDate, endDate],
    queryFn: async (): Promise<NEOResponse> => fetchNEOData(startDate, endDate),
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 30, // 30 minutes (cacheTime renamed to gcTime in v5)
    retry: 2,
  });

  // Fetch APOD for visual content
  const {
    data: apodData,
    isLoading: isLoadingAPOD,
    error: apodError,
  } = useQuery({
    queryKey: ['apod', new Date().toISOString().split('T')[0]],
    queryFn: async (): Promise<APODResponse> => fetchAPOD(),
    staleTime: 1000 * 60 * 60 * 24, // 24 hours (APOD updates daily)
    gcTime: 1000 * 60 * 60 * 48, // 48 hours (cacheTime renamed to gcTime in v5)
    retry: 2,
  });

  // Calculate metrics from NEO data
  const metrics: NEOMetrics | null = neoData ? calculateNEOMetrics(neoData) : null;
  const formattedMetrics = metrics ? formatMetrics(metrics) : null;

  return {
    // Raw data
    neoData,
    apodData,
    
    // Calculated metrics
    metrics,
    formattedMetrics,
    
    // Loading states
    isLoading: isLoadingNEO || isLoadingAPOD,
    isLoadingNEO,
    isLoadingAPOD,
    
    // Errors
    error: neoError || apodError,
    neoError,
    apodError,
    
    // Actions
    refetch: refetchNEO,
    
    // Metadata
    dateRange: { startDate, endDate },
    timeframe,
  };
};

