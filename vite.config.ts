
import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 4300, // Change default port for all apps
  },
  build: {
    outDir: 'dist',
  },
});