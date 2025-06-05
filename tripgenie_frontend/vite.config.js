import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  // Vite will auto-detect postcss.config.js in project root. No need to specify 'css.postcss'.
  resolve: {
    alias: {
      '@': path.resolve(new URL('./src', import.meta.url).pathname),
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
      'vscode-internal-3043-beta.beta01.cloud.kavia.ai',
    ],
  },
});
