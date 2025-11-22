import { createModuleFederationConfig } from '@module-federation/modern-js';

export default createModuleFederationConfig({
  name: 'remote',
  manifest: {
    filePath: 'static',
  },
  filename: 'static/remoteEntry.js',
  exposes: {
    './analytics': './src/features/analytics',
    './user-management': './src/features/user-management',
    './notifications': './src/features/notifications',
    './settings': './src/features/settings',
  },
  shared: {
    react: {
      singleton: true,
      requiredVersion: '^18.3.1',
      eager: true,
      strictVersion: false,
    },
    'react-dom': {
      singleton: true,
      requiredVersion: '^18.3.1',
      eager: true,
      strictVersion: false,
    },
    '@tanstack/react-query': {
      singleton: true,
      requiredVersion: '^5.90.10',
      eager: true,
      strictVersion: false,
    },
  },
});