import { useState, useEffect } from 'react';

export interface AnalyticsMetrics {
  visitors: number;
  pageViews: number;
  bounceRate: number;
  avgSession: number;
}

export interface UseAnalyticsOptions {
  timeframe?: '7d' | '30d' | '90d';
  autoRefresh?: boolean;
  refreshInterval?: number;
}

/**
 * Custom hook for managing analytics data and metrics
 * Handles data fetching, state management, and auto-refresh
 */
export const useAnalytics = (options: UseAnalyticsOptions = {}) => {
  const {
    timeframe = '7d',
    autoRefresh = true,
    refreshInterval = 2000,
  } = options;

  const [selectedTimeframe, setSelectedTimeframe] = useState(timeframe);
  const [metrics, setMetrics] = useState<AnalyticsMetrics>({
    visitors: 0,
    pageViews: 0,
    bounceRate: 0,
    avgSession: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  // Simulate data fetching
  const fetchMetrics = async () => {
    setIsLoading(true);
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 300));
    
    setMetrics({
      visitors: Math.floor(Math.random() * 10000) + 5000,
      pageViews: Math.floor(Math.random() * 50000) + 20000,
      bounceRate: Number((Math.random() * 30 + 20).toFixed(1)),
      avgSession: Number((Math.random() * 5 + 2).toFixed(1)),
    });
    
    setIsLoading(false);
  };

  useEffect(() => {
    fetchMetrics();
  }, [selectedTimeframe]);

  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      fetchMetrics();
    }, refreshInterval);

    return () => clearInterval(interval);
  }, [autoRefresh, refreshInterval, selectedTimeframe]);

  return {
    metrics,
    selectedTimeframe,
    setSelectedTimeframe,
    isLoading,
    refetch: fetchMetrics,
  };
};

