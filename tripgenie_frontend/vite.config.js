import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
server: {
  host: true,
  port: 3000,
  strictPort: true,
  cors: true,
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
  watch: {
    usePolling: true,
  },
  allowedHosts: [
    // PUBLIC_INTERFACE
    // Added to allow requests from the required VSCode cloud host
    'vscode-internal-3043-beta.beta01.cloud.kavia.ai',
  ],
},
});
