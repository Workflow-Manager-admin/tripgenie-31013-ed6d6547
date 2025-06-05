import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss'
import path from 'path'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(new URL('./src', import.meta.url).pathname),
    },
  },
  server: {
    host: true, // ✅ allows access from any hostname
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
      'vscode-internal-3043-beta.beta01.cloud.kavia.ai'
    ],
  },
})
