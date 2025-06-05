import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

// ESM-compatible __dirname resolution
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    host: true, // listen on all addresses, needed for remote access
    port: 3000,
    strictPort: true, // fail if port is busy
    cors: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    watch: {
      usePolling: true,
    },
    allowedHosts: [
      'vscode-internal-3043-beta.beta01.cloud.kavia.ai',
    ],
  },
});
