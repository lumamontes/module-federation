import React from 'react';
import { useSettings } from '../model/use-settings';
import type { NASASettings } from '../api/nasa-api';

export interface SettingsProps {
  // Legacy prop for compatibility
}

/**
 * Settings component - manages NASA API preferences and configuration
 */
export const Settings: React.FC<SettingsProps> = () => {
  const { settings, isLoading, error, saveSettings, isSaving, saveSuccess } = useSettings();
  const [localSettings, setLocalSettings] = React.useState<NASASettings>(settings);

  React.useEffect(() => {
    setLocalSettings(settings);
  }, [settings]);

  const handleSave = () => {
    saveSettings(localSettings);
  };

  const updateSetting = <K extends keyof NASASettings>(key: K, value: NASASettings[K]) => {
    setLocalSettings({ ...localSettings, [key]: value });
  };

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
        <p style={{ color: '#666' }}>Loading settings...</p>
        <style>
          {`
            @keyframes spin {
              to { transform: rotate(360deg); }
            }
          `}
        </style>
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
          Error loading settings
        </h3>
        <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>
          {error instanceof Error ? error.message : 'Failed to load settings'}
        </p>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ margin: '0 0 0.25rem 0', color: '#333' }}>NASA API Settings</h1>
          <p style={{ margin: 0, color: '#666', fontSize: '0.85rem' }}>
            Configure your NASA API preferences and data refresh settings
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={isSaving}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: saveSuccess ? '#51cf66' : isSaving ? '#ccc' : '#4ecaff',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: isSaving ? 'not-allowed' : 'pointer',
            fontSize: '0.9rem',
            fontWeight: '600',
            transition: 'all 0.2s ease',
          }}
        >
          {isSaving ? 'Saving...' : saveSuccess ? 'Saved!' : 'Save Changes'}
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {/* API Configuration */}
        <SettingSection title="API Configuration">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#333', fontWeight: '500' }}>
                API Key
              </label>
              <input
                type="text"
                value={localSettings.apiKey}
                onChange={(e) => updateSetting('apiKey', e.target.value)}
                placeholder="Enter your NASA API key"
                style={{
                  width: '100%',
                  maxWidth: '400px',
                  padding: '0.75rem',
                  border: '1px solid #ddd',
                  borderRadius: '6px',
                  fontSize: '0.9rem',
                }}
              />
              <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.85rem', color: '#666' }}>
                Get your API key from{' '}
                <a
                  href="https://api.nasa.gov/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#4ecaff' }}
                >
                  api.nasa.gov
                </a>
              </p>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#333', fontWeight: '500' }}>
                Default Timeframe
              </label>
              <select
                value={localSettings.defaultTimeframe}
                onChange={(e) => updateSetting('defaultTimeframe', e.target.value as NASASettings['defaultTimeframe'])}
                style={{
                  width: '100%',
                  maxWidth: '300px',
                  padding: '0.75rem',
                  border: '1px solid #ddd',
                  borderRadius: '6px',
                  fontSize: '0.9rem',
                  backgroundColor: 'white',
                }}
              >
                <option value="7d">7 Days</option>
                <option value="30d">30 Days</option>
                <option value="90d">90 Days</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#333', fontWeight: '500' }}>
                Data Refresh Interval (minutes)
              </label>
              <input
                type="number"
                min="1"
                max="60"
                value={localSettings.dataRefreshInterval}
                onChange={(e) => updateSetting('dataRefreshInterval', parseInt(e.target.value) || 5)}
                style={{
                  width: '100%',
                  maxWidth: '200px',
                  padding: '0.75rem',
                  border: '1px solid #ddd',
                  borderRadius: '6px',
                  fontSize: '0.9rem',
                }}
              />
            </div>
          </div>
        </SettingSection>

        {/* Display Preferences */}
        <SettingSection title="Display Preferences">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <SettingToggle
              label="Enable Notifications"
              description="Receive real-time mission updates and alerts"
              checked={localSettings.enableNotifications}
              onChange={(checked) => updateSetting('enableNotifications', checked)}
            />
            <SettingToggle
              label="Auto Refresh"
              description="Automatically refresh data at specified intervals"
              checked={localSettings.enableAutoRefresh}
              onChange={(checked) => updateSetting('enableAutoRefresh', checked)}
            />
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#333', fontWeight: '500' }}>
                Preferred Image Quality
              </label>
              <select
                value={localSettings.preferredImageQuality}
                onChange={(e) => updateSetting('preferredImageQuality', e.target.value as NASASettings['preferredImageQuality'])}
                style={{
                  width: '100%',
                  maxWidth: '300px',
                  padding: '0.75rem',
                  border: '1px solid #ddd',
                  borderRadius: '6px',
                  fontSize: '0.9rem',
                  backgroundColor: 'white',
                }}
              >
                <option value="standard">Standard</option>
                <option value="hd">HD</option>
              </select>
            </div>
          </div>
        </SettingSection>

        {/* Regional Settings */}
        <SettingSection title="Regional Settings">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#333', fontWeight: '500' }}>
                Language
              </label>
              <select
                value={localSettings.language}
                onChange={(e) => updateSetting('language', e.target.value)}
                style={{
                  width: '100%',
                  maxWidth: '300px',
                  padding: '0.75rem',
                  border: '1px solid #ddd',
                  borderRadius: '6px',
                  fontSize: '0.9rem',
                  backgroundColor: 'white',
                }}
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#333', fontWeight: '500' }}>
                Timezone
              </label>
              <select
                value={localSettings.timezone}
                onChange={(e) => updateSetting('timezone', e.target.value)}
                style={{
                  width: '100%',
                  maxWidth: '300px',
                  padding: '0.75rem',
                  border: '1px solid #ddd',
                  borderRadius: '6px',
                  fontSize: '0.9rem',
                  backgroundColor: 'white',
                }}
              >
                <option value="UTC">UTC</option>
                <option value="America/New_York">Eastern Time</option>
                <option value="America/Chicago">Central Time</option>
                <option value="America/Denver">Mountain Time</option>
                <option value="America/Los_Angeles">Pacific Time</option>
                <option value="Europe/London">London</option>
                <option value="Europe/Paris">Paris</option>
                <option value="Asia/Tokyo">Tokyo</option>
              </select>
            </div>
          </div>
        </SettingSection>
      </div>
    </div>
  );
};

interface SettingSectionProps {
  title: string;
  children: React.ReactNode;
}

const SettingSection: React.FC<SettingSectionProps> = ({ title, children }) => {
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
        {title}
      </h2>
      {children}
    </div>
  );
};

interface SettingToggleProps {
  label: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const SettingToggle: React.FC<SettingToggleProps> = ({
  label,
  description,
  checked,
  onChange,
}) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>
        <label style={{ display: 'block', color: '#333', fontWeight: '500', marginBottom: '0.25rem' }}>
          {label}
        </label>
        <p style={{ margin: 0, color: '#666', fontSize: '0.85rem' }}>{description}</p>
      </div>
      <button
        onClick={() => onChange(!checked)}
        style={{
          width: '50px',
          height: '28px',
          borderRadius: '14px',
          border: 'none',
          backgroundColor: checked ? '#4ecaff' : '#ccc',
          cursor: 'pointer',
          position: 'relative',
          transition: 'background-color 0.2s ease',
        }}
      >
        <span
          style={{
            position: 'absolute',
            top: '2px',
            left: checked ? '24px' : '2px',
            width: '24px',
            height: '24px',
            borderRadius: '50%',
            backgroundColor: 'white',
            transition: 'left 0.2s ease',
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
          }}
        />
      </button>
    </div>
  );
};
