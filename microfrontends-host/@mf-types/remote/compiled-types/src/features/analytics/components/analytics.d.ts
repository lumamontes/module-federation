import React from 'react';
export interface AnalyticsProps {
    timeframe?: '7d' | '30d' | '90d';
}
/**
 * Analytics feature component
 * Displays NASA NEO (Near Earth Objects) analytics data
 * Uses React Query to fetch real-time data from NASA API
 */
export declare const Analytics: React.FC<AnalyticsProps>;
