import React from 'react';
import { Analytics } from 'remote/analytics';
import { RemoteWrapper } from '../../shared/ui/remote-wrapper';

/**
 * Analytics Page
 * 
 * This page loads the Analytics module from the remote microfrontend.
 * The RemoteWrapper provides visual indicators and error handling.
 */
const AnalyticsPage = () => {
  return (
    <RemoteWrapper moduleName="analytics">
      <Analytics />
    </RemoteWrapper>
  );
};

export default AnalyticsPage;

