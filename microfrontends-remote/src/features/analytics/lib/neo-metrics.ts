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
export const calculateNEOMetrics = (data: NEOResponse): NEOMetrics => {
  const allNEOs = Object.values(data.near_earth_objects).flat();
  
  const totalAsteroids = data.element_count;
  const hazardousCount = allNEOs.filter((neo) => neo.is_potentially_hazardous_asteroid).length;
  
  const sizes = allNEOs.map((neo) => {
    const diameter = neo.estimated_diameter.kilometers;
    return (diameter.estimated_diameter_min + diameter.estimated_diameter_max) / 2;
  });
  
  const averageSize = sizes.length > 0
    ? sizes.reduce((sum, size) => sum + size, 0) / sizes.length
    : 0;
  
  const approaches = allNEOs
    .flatMap((neo) => neo.close_approach_data)
    .map((approach) => parseFloat(approach.miss_distance.kilometers));
  
  const closestApproach = approaches.length > 0
    ? Math.min(...approaches)
    : 0;
  
  const velocities = allNEOs
    .flatMap((neo) => neo.close_approach_data)
    .map((approach) => parseFloat(approach.relative_velocity.kilometers_per_second));
  
  const averageVelocity = velocities.length > 0
    ? velocities.reduce((sum, vel) => sum + vel, 0) / velocities.length
    : 0;
  
  return {
    totalAsteroids,
    hazardousCount,
    averageSize: Number(averageSize.toFixed(2)),
    closestApproach: Number((closestApproach / 1000000).toFixed(2)), // Convert to millions of km
    averageVelocity: Number(averageVelocity.toFixed(2)),
  };
};

/**
 * Format metrics for display
 */
export const formatMetrics = (metrics: NEOMetrics) => {
  return {
    totalAsteroids: metrics.totalAsteroids.toLocaleString(),
    hazardousCount: metrics.hazardousCount.toLocaleString(),
    averageSize: `${metrics.averageSize} km`,
    closestApproach: `${metrics.closestApproach}M km`,
    averageVelocity: `${metrics.averageVelocity} km/s`,
  };
};

