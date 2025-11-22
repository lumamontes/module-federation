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
export declare const fetchNEOData: (startDate: string, endDate: string) => Promise<NEOResponse>;
/**
 * Fetch Astronomy Picture of the Day
 */
export declare const fetchAPOD: (date?: string) => Promise<APODResponse>;
/**
 * Search NASA Image and Video Library
 */
export declare const searchNASAImages: (query: string, page?: number) => Promise<ImageSearchResponse>;
/**
 * Fetch multiple APOD images for a date range
 */
export declare const fetchAPODRange: (startDate: string, endDate: string) => Promise<APODResponse[]>;
/**
 * Calculate date range for timeframe
 */
export declare const getDateRange: (timeframe: "7d" | "30d" | "90d") => {
    startDate: string;
    endDate: string;
};
