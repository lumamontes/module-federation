/**
 * NASA API preferences and settings
 * Manages API configuration and data preferences
 */

export interface NASASettings {
  apiKey: string;
  dataRefreshInterval: number; // in minutes
  defaultTimeframe: '7d' | '30d' | '90d';
  enableNotifications: boolean;
  enableAutoRefresh: boolean;
  preferredImageQuality: 'standard' | 'hd';
  language: string;
  timezone: string;
}

export const defaultNASASettings: NASASettings = {
  apiKey: 'DEMO_KEY',
  dataRefreshInterval: 5,
  defaultTimeframe: '7d',
  enableNotifications: true,
  enableAutoRefresh: true,
  preferredImageQuality: 'standard',
  language: 'en',
  timezone: 'UTC',
};

/**
 * Save settings to localStorage (simulated API call)
 */
export const saveNASASettings = async (settings: NASASettings): Promise<NASASettings> => {
  // In a real app, this would call an API
  localStorage.setItem('nasa-settings', JSON.stringify(settings));
  return new Promise((resolve) => {
    setTimeout(() => resolve(settings), 500);
  });
};

/**
 * Load settings from localStorage (simulated API call)
 */
export const loadNASASettings = async (): Promise<NASASettings> => {
  // In a real app, this would call an API
  try {
    const stored = localStorage.getItem('nasa-settings');
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Failed to load settings from localStorage:', error);
  }
  return defaultNASASettings;
};

