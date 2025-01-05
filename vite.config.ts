/// <reference types="vitest" />
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import svgrPlugin from 'vite-plugin-svgr';
import viteTsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  server: {
    host: '0.0.0.0', // Bind to all network interfaces
    port: process.env.PORT ? parseInt(process.env.PORT) : 5173, // Use the PORT environment variable
  },
  plugins: [react(), viteTsconfigPaths(), svgrPlugin()],
  build: {
    outDir: 'build',
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.tsx',
    coverage: {
      reporter: ['text', 'html', 'json-summary', 'json'],
      exclude: ['node_modules/', 'src/setupTests.tsx'],
    },
  },
});
