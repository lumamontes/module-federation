import { createModuleFederationConfig } from '@module-federation/modern-js';

export default createModuleFederationConfig({
  name: 'host',
  remotes: {
    remote: 'remote@http://localhost:3051/static/mf-manifest.json',
  },
  shareStrategy: 'loaded-first', // Defer manifest loading until remote is actually used
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
