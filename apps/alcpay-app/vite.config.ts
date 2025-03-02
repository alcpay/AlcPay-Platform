/**
 * Vite Configuration for Alcpay App
 *
 * This configuration sets up Vite for the Alcpay application, including plugins for Angular,
 * TypeScript path resolution, asset copying, and Tailwind CSS integration.
 *
 * import: @alcpay/tailwind
 * path: themes/switcher.component.ts
 */

import { defineConfig } from 'vite';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin';
import tailwindcss from '@tailwindcss/vite';
import angular from '@analogjs/vite-plugin-angular';

export default defineConfig({
  root: __dirname, // Root directory for the Vite project
  cacheDir: '../../node_modules/.vite/apps/alcpay-app', // Cache directory for Vite
  server: {
    port: 4200, // Development server port
    host: 'localhost', // Development server host
  },
  preview: {
    port: 4300, // Preview server port
    host: 'localhost', // Preview server host
  },
  plugins: [
    angular(), // Angular plugin for Vite
    nxViteTsPaths(), // TypeScript paths resolution plugin
    nxCopyAssetsPlugin([
      '*.css', '*.ttf', '*.woff', '*.woff2', '*.eot', '*.svg', '*.png',
      '*.jpg', '*.jpeg', '*.gif', '*.ico', '*.xml', '*.webp', '*.json',
      '*.txt', '*.md', '*.yaml', '*.yml', '*.toml', '*.lock', '*.db', '*.zip'
    ]), // Asset copying plugin
    tailwindcss() // Tailwind CSS plugin
  ],
  build: {
    outDir: '../../dist/apps/alcpay-app',
    emptyOutDir: true, // Empty the output directory before building
    reportCompressedSize: true, // Report compressed size of the build
    commonjsOptions: {
      transformMixedEsModules: true, // Transform mixed ES modules
    },
    rollupOptions: {
      input: 'apps/alcpay-app/src/index.html',
    }
  },
  test: {
    watch: false, // Disable watch mode for tests
    globals: true, // Enable global variables for tests
    environment: 'jsdom', // Test environment
    include: [
      'src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'
    ], // Test files to include
    reporters: ['default'], // Test reporters
    coverage: {
      reportsDirectory: '../../coverage/apps/alcpay-app', // Coverage reports directory
      provider: 'v8', // Coverage provider
    },
  },
});
