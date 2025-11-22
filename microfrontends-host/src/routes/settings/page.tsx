import React from 'react';
import { Settings } from 'remote/settings';
import { RemoteWrapper } from '../../shared/ui/remote-wrapper';

/**
 * Settings Page
 * 
 * This page loads the Settings module from the remote microfrontend.
 * The RemoteWrapper provides visual indicators and error handling.
 */
const SettingsPage = () => {
  return (
    <RemoteWrapper moduleName="settings">
      <Settings />
    </RemoteWrapper>
  );
};

export default SettingsPage;

