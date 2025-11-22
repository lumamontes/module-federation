import React from 'react';
import { UserManagement } from 'remote/user-management';
import { RemoteWrapper } from '../../shared/ui/remote-wrapper';

/**
 * Users Page
 * 
 * This page loads the User Management module from the remote microfrontend.
 * The RemoteWrapper provides visual indicators and error handling.
 */
const UsersPage = () => {
  return (
    <RemoteWrapper moduleName="user-management">
      <UserManagement />
    </RemoteWrapper>
  );
};

export default UsersPage;

