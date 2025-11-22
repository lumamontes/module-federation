import React from 'react';
import { useNasaAnalytics } from '../model/use-nasa-analytics';
import { generateChartData, getMaxChartValue } from '../lib/chart-data';
import { MetricCard } from './metric-card';
import { AnalyticsChart } from './analytics-chart';

export interface AnalyticsProps {
  timeframe?: '7d' | '30d' | '90d';
}

/**
 * Analytics feature component
 * Displays NASA NEO (Near Earth Objects) analytics data
 * Uses React Query to fetch real-time data from NASA API
 */
export const Analytics: React.FC<AnalyticsProps> = ({ timeframe = '7d' }) => {
  const {
    metrics,
    formattedMetrics,
    apodData,
    isLoading,
    error,
    dateRange,
    refetch,
  } = useNasaAnalytics({ timeframe });

  const chartData = generateChartData(timeframe);
  const maxValue = getMaxChartValue(chartData);

  if (isLoading) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem' }}>
        <div
          style={{
            width: '40px',
            height: '40px',
            margin: '0 auto 1rem',
            border: '3px solid #4ecaff',
            borderTopColor: 'transparent',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
          }}
        />
        <p style={{ color: '#666' }}>Loading NASA data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          padding: '2rem',
          border: '2px solid #dc3545',
          borderRadius: '8px',
          backgroundColor: '#fff5f5',
        }}
      >
        <h3 style={{ margin: '0 0 0.5rem 0', color: '#dc3545' }}>
          Error loading NASA data
        </h3>
        <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>
          {error instanceof Error ? error.message : 'Failed to fetch data from NASA API'}
        </p>
        <button
          onClick={() => refetch()}
          style={{
            marginTop: '1rem',
            padding: '0.5rem 1rem',
            backgroundColor: '#4ecaff',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
          }}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ margin: '0 0 0.25rem 0', color: '#333' }}>NASA NEO Analytics</h1>
          <p style={{ margin: 0, color: '#666', fontSize: '0.85rem' }}>
            Near Earth Objects data from {dateRange.startDate} to {dateRange.endDate}
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <button
            onClick={() => refetch()}
            style={{
              padding: '0.5rem 1rem',
              border: '1px solid #ddd',
              borderRadius: '6px',
              backgroundColor: 'white',
              color: '#333',
              cursor: 'pointer',
              fontSize: '0.9rem',
            }}
            title="Refresh data"
          >
            Refresh
          </button>
        </div>
      </div>

      {/* APOD Banner */}
      {apodData && apodData.media_type === 'image' && (
        <div
          style={{
            marginBottom: '2rem',
            padding: '1rem',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px',
            border: '1px solid #e0e0e0',
          }}
        >
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <img
              src={apodData.url}
              alt={apodData.title}
              style={{
                width: '120px',
                height: '120px',
                objectFit: 'cover',
                borderRadius: '6px',
              }}
            />
            <div style={{ flex: 1 }}>
              <h3 style={{ margin: '0 0 0.25rem 0', fontSize: '0.9rem', color: '#666' }}>
                Astronomy Picture of the Day
              </h3>
              <p style={{ margin: 0, fontSize: '0.85rem', color: '#333', fontWeight: '600' }}>
                {apodData.title}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Metrics Cards */}
      {formattedMetrics && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.5rem',
            marginBottom: '2rem',
          }}
        >
          <MetricCard
            title="Total Asteroids"
            value={formattedMetrics.totalAsteroids}
            change={`${metrics?.hazardousCount || 0} hazardous`}
            trend="up"
          />
          <MetricCard
            title="Hazardous Objects"
            value={formattedMetrics.hazardousCount}
            change={`${metrics ? ((metrics.hazardousCount / metrics.totalAsteroids) * 100).toFixed(1) : 0}%`}
            trend={metrics && metrics.hazardousCount > 0 ? 'up' : 'down'}
          />
          <MetricCard
            title="Avg. Size"
            value={formattedMetrics.averageSize}
            change="Diameter"
            trend="up"
          />
          <MetricCard
            title="Closest Approach"
            value={formattedMetrics.closestApproach}
            change="Million km"
            trend="down"
          />
          <MetricCard
            title="Avg. Velocity"
            value={formattedMetrics.averageVelocity}
            change="km/s"
            trend="up"
          />
        </div>
      )}

      {/* Chart */}
      <AnalyticsChart data={chartData} maxValue={maxValue} />

      <style>
        {`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

