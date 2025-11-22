/**
 * NASA API client
 * Documentation: https://api.nasa.gov/
 * 
 * Available endpoints:
 * - NEO (Near Earth Objects): /neo/rest/v1/feed
 * - APOD (Astronomy Picture of the Day): /planetary/apod
 * - Image and Video Library: /search
 * - Mars Weather: /insight_weather/
 */

const NASA_API_KEY = 'DEMO_KEY'; // Use DEMO_KEY for development, register for production
const NASA_BASE_URL = 'https://api.nasa.gov';

export interface NEOResponse {
  element_count: number;
  near_earth_objects: Record<string, NEOObject[]>;
}

export interface NEOObject {
  id: string;
  name: string;
  estimated_diameter: {
    kilometers: {
      estimated_diameter_min: number;
      estimated_diameter_max: number;
    };
  };
  close_approach_data: Array<{
    close_approach_date: string;
    miss_distance: {
      kilometers: string;
    };
    relative_velocity: {
      kilometers_per_second: string;
    };
  }>;
  is_potentially_hazardous_asteroid: boolean;
}

export interface APODResponse {
  date: string;
  explanation: string;
  hdurl?: string;
  media_type: string;
  service_version: string;
  title: string;
  url: string;
}

export interface ImageSearchResponse {
  collection: {
    items: Array<{
      data: Array<{
        title: string;
        description: string;
        date_created: string;
        keywords?: string[];
      }>;
      links: Array<{
        href: string;
        rel: string;
      }>;
    }>;
  };
}

/**
 * Fetch Near Earth Objects data for a date range
 */
export const fetchNEOData = async (
  startDate: string,
  endDate: string
): Promise<NEOResponse> => {
  const url = `${NASA_BASE_URL}/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=${NASA_API_KEY}`;
  
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error(`NASA API error: ${response.statusText}`);
  }
  
  return response.json();
};

/**
 * Fetch Astronomy Picture of the Day
 */
export const fetchAPOD = async (date?: string): Promise<APODResponse> => {
  const dateParam = date ? `&date=${date}` : '';
  const url = `${NASA_BASE_URL}/planetary/apod?api_key=${NASA_API_KEY}${dateParam}`;
  
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error(`NASA API error: ${response.statusText}`);
  }
  
  return response.json();
};

/**
 * Search NASA Image and Video Library
 */
export const searchNASAImages = async (
  query: string,
  page: number = 1
): Promise<ImageSearchResponse> => {
  const url = `${NASA_BASE_URL}/search?q=${encodeURIComponent(query)}&media_type=image&page=${page}&api_key=${NASA_API_KEY}`;
  
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error(`NASA API error: ${response.statusText}`);
  }
  
  return response.json();
};

/**
 * Fetch multiple APOD images for a date range
 */
export const fetchAPODRange = async (
  startDate: string,
  endDate: string
): Promise<APODResponse[]> => {
  const dates = getDateRangeArray(startDate, endDate);
  const promises = dates.map((date) => fetchAPOD(date).catch(() => null));
  const results = await Promise.all(promises);
  return results.filter((result): result is APODResponse => result !== null);
};

/**
 * Calculate date range for timeframe
 */
export const getDateRange = (timeframe: '7d' | '30d' | '90d'): { startDate: string; endDate: string } => {
  const endDate = new Date();
  const startDate = new Date();
  
  switch (timeframe) {
    case '7d':
      startDate.setDate(endDate.getDate() - 7);
      break;
    case '30d':
      startDate.setDate(endDate.getDate() - 30);
      break;
    case '90d':
      startDate.setDate(endDate.getDate() - 90);
      break;
  }
  
  return {
    startDate: startDate.toISOString().split('T')[0],
    endDate: endDate.toISOString().split('T')[0],
  };
};

/**
 * Get array of dates between start and end
 */
const getDateRangeArray = (startDate: string, endDate: string): string[] => {
  const dates: string[] = [];
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    dates.push(d.toISOString().split('T')[0]);
  }
  
  return dates;
};
