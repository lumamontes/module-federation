/**
 * NASA API preferences and settings
 * Manages API configuration and data preferences
 */
export interface NASASettings {
    apiKey: string;
    dataRefreshInterval: number;
    defaultTimeframe: '7d' | '30d' | '90d';
    enableNotifications: boolean;
    enableAutoRefresh: boolean;
    preferredImageQuality: 'standard' | 'hd';
    language: string;
    timezone: string;
}
export declare const defaultNASASettings: NASASettings;
/**
 * Save settings to localStorage (simulated API call)
 */
export declare const saveNASASettings: (settings: NASASettings) => Promise<NASASettings>;
/**
 * Load settings from localStorage (simulated API call)
 */
export declare const loadNASASettings: () => Promise<NASASettings>;
