import React from 'react';

export interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
}

/**
 * MetricCard component for displaying analytics metrics
 */
export const MetricCard: React.FC<MetricCardProps> = ({ title, value, change, trend }) => {
  return (
    <div
      style={{
        backgroundColor: 'white',
        padding: '1.5rem',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      }}
    >
      <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.85rem', color: '#666' }}>
        {title}
      </p>
      <p style={{ margin: '0 0 0.5rem 0', fontSize: '2rem', fontWeight: 'bold', color: '#333' }}>
        {value}
      </p>
      <p
        style={{
          margin: 0,
          fontSize: '0.85rem',
          color: '#666',
        }}
      >
        {change}
      </p>
    </div>
  );
};

