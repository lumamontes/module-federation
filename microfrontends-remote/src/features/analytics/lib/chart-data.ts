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
export const generateChartData = (timeframe: '7d' | '30d' | '90d'): ChartDataPoint[] => {
  const days = timeframe === '7d' ? 7 : timeframe === '30d' ? 30 : 90;
  const dayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
  return Array.from({ length: days }, (_, index) => ({
    day: dayLabels[index % 7] + (timeframe !== '7d' ? ` ${Math.floor(index / 7) + 1}` : ''),
    value: Math.floor(Math.random() * 100),
  }));
};

/**
 * Get the maximum value from chart data
 */
export const getMaxChartValue = (data: ChartDataPoint[]): number => {
  return Math.max(...data.map((d) => d.value), 1);
};

