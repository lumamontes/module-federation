import React from 'react';
import type { ChartDataPoint } from '../lib/chart-data';

export interface AnalyticsChartProps {
  data: ChartDataPoint[];
  maxValue: number;
}

/**
 * AnalyticsChart component for displaying traffic overview
 */
export const AnalyticsChart: React.FC<AnalyticsChartProps> = ({ data, maxValue }) => {
  return (
    <div
      style={{
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      }}
    >
      <h2 style={{ margin: '0 0 1.5rem 0', color: '#333', fontSize: '1.25rem' }}>
        Traffic Overview
      </h2>
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          gap: '1rem',
          height: '200px',
          padding: '1rem 0',
        }}
      >
        {data.map((dataPoint, index) => (
          <div
            key={`${dataPoint.day}-${index}`}
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <div
              style={{
                width: '100%',
                backgroundColor: '#4ecaff',
                height: `${(dataPoint.value / maxValue) * 100}%`,
                borderRadius: '4px 4px 0 0',
                minHeight: '20px',
                transition: 'all 0.3s ease',
              }}
              title={`${dataPoint.value}%`}
            />
            <span style={{ fontSize: '0.85rem', color: '#666' }}>{dataPoint.day}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

