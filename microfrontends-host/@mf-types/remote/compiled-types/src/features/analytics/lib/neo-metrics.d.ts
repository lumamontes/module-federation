import type { NEOResponse } from '../api/nasa-api';
export interface NEOMetrics {
    totalAsteroids: number;
    hazardousCount: number;
    averageSize: number;
    closestApproach: number;
    averageVelocity: number;
}
/**
 * Calculate metrics from NEO data
 */
export declare const calculateNEOMetrics: (data: NEOResponse) => NEOMetrics;
/**
 * Format metrics for display
 */
export declare const formatMetrics: (metrics: NEOMetrics) => {
    totalAsteroids: string;
    hazardousCount: string;
    averageSize: string;
    closestApproach: string;
    averageVelocity: string;
};
