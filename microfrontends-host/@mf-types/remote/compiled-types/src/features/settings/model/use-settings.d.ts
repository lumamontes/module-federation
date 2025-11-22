import { type NASASettings } from '../api/nasa-api';
/**
 * Custom hook for managing NASA API settings
 * Uses React Query for data fetching and caching
 */
export declare const useSettings: () => {
    settings: NASASettings;
    isLoading: false;
    error: Error | null;
    saveSettings: import("@tanstack/react-query").UseMutateFunction<NASASettings, Error, NASASettings, unknown>;
    isSaving: boolean;
    saveSuccess: boolean;
};
