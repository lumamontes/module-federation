import React from 'react';
import type { ChartDataPoint } from '../lib/chart-data';
export interface AnalyticsChartProps {
    data: ChartDataPoint[];
    maxValue: number;
}
/**
 * AnalyticsChart component for displaying traffic overview
 */
export declare const AnalyticsChart: React.FC<AnalyticsChartProps>;
