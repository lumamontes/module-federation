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
export declare const MetricCard: React.FC<MetricCardProps>;
