import { appTools, defineConfig } from '@modern-js/app-tools';
import { moduleFederationPlugin } from '@module-federation/modern-js';

// https://modernjs.dev/en/configure/app/usage
export default defineConfig({
  dev: {
    port: 3051,
  },
  runtime: {
    router: true,
  },
  plugins: [
    appTools({
      bundler: 'rspack', // Set to 'webpack' to enable webpack
    }),
    moduleFederationPlugin(),
  ],
  tools: {
    rspack: (config) => {
      // Ensure React Query is properly resolved
      config.resolve = config.resolve || {};
      config.resolve.conditionNames = ['import', 'require', 'default'];
      
      // Ensure shared dependencies are properly externalized
      if (config.optimization) {
        config.optimization = {
          ...config.optimization,
          providedExports: true,
          usedExports: true,
        };
      }
      
      return config;
    },
  },
});
