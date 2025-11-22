import { type MissionPersonnel } from '../api/nasa-api';
/**
 * Custom hook for managing mission personnel data
 * Uses React Query for data fetching and caching
 */
export declare const useMissionPersonnel: () => {
    personnel: MissionPersonnel[];
    isLoading: boolean;
    error: Error | null;
    refetch: (options?: import("@tanstack/react-query").RefetchOptions) => Promise<import("@tanstack/react-query").QueryObserverResult<MissionPersonnel[], Error>>;
    updatePersonnel: import("@tanstack/react-query").UseMutateFunction<{
        id: string;
        name?: string | undefined;
        role?: "mission-commander" | "pilot" | "mission-specialist" | "payload-specialist" | undefined;
        status?: "active" | "on-mission" | "training" | "retired" | undefined;
        mission?: string | undefined;
        lastActivity?: string | undefined;
        imageUrl?: string | undefined;
    }, Error, {
        id: string;
        updates: Partial<MissionPersonnel>;
    }, unknown>;
    deletePersonnel: import("@tanstack/react-query").UseMutateFunction<string, Error, string, unknown>;
    isUpdating: boolean;
    isDeleting: boolean;
};
