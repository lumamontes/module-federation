import { type APODResponse, type NEOResponse } from '../api/nasa-api';
import { type NEOMetrics } from '../lib/neo-metrics';
export interface UseNasaAnalyticsOptions {
    timeframe?: '7d' | '30d' | '90d';
}
/**
 * Custom hook for fetching and managing NASA NEO analytics data
 * Uses React Query for data fetching, caching, and state management
 */
export declare const useNasaAnalytics: (options?: UseNasaAnalyticsOptions) => {
    neoData: NEOResponse | undefined;
    apodData: APODResponse | undefined;
    metrics: NEOMetrics | null;
    formattedMetrics: {
        totalAsteroids: string;
        hazardousCount: string;
        averageSize: string;
        closestApproach: string;
        averageVelocity: string;
    } | null;
    isLoading: boolean;
    isLoadingNEO: boolean;
    isLoadingAPOD: boolean;
    error: Error | null;
    neoError: Error | null;
    apodError: Error | null;
    refetch: (options?: import("@tanstack/react-query").RefetchOptions) => Promise<import("@tanstack/react-query").QueryObserverResult<NEOResponse, Error>>;
    dateRange: {
        startDate: string;
        endDate: string;
    };
    timeframe: "7d" | "30d" | "90d";
};
