import React from 'react';
import { Notifications } from 'remote/notifications';
import { RemoteWrapper } from '../../shared/ui/remote-wrapper';

/**
 * Notifications Page
 * 
 * This page loads the Notifications module from the remote microfrontend.
 * The RemoteWrapper provides visual indicators and error handling.
 */
const NotificationsPage = () => {
  return (
    <RemoteWrapper moduleName="notifications">
      <Notifications />
    </RemoteWrapper>
  );
};

export default NotificationsPage;

