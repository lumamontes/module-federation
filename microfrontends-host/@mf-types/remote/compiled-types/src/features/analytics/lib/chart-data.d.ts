/**
 * Chart data utilities for analytics
 */
export interface ChartDataPoint {
    day: string;
    value: number;
}
/**
 * Generate sample chart data for the selected timeframe
 */
export declare const generateChartData: (timeframe: "7d" | "30d" | "90d") => ChartDataPoint[];
/**
 * Get the maximum value from chart data
 */
export declare const getMaxChartValue: (data: ChartDataPoint[]) => number;
