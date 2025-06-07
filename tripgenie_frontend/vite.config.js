/**
 * Vite Configuration for TripMosaic-31218 (Kavia AI)
 * -----------------------------------------------------------------------------
 * Features:
 *   - React & TailwindCSS integration
 *   - Path alias for "@/src"
 *   - Customizable dev server host and port
 *   - Allows multiple Kavia internal deployment hosts
 * 
 * © 2025 Kavia AI | tripmosaic-31218-ac0cc034
 * -----------------------------------------------------------------------------
 */

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

// ESM-compatible __dirname
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  server: {
    host: "0.0.0.0", // Accept all interfaces (required in cloud-based IDEs)
    //port: 3000,       // ✅ You can change this to your preferred port
    strictPort: true, // Prevent Vite from switching ports if 3000 is taken
    cors: true,       // Allow CORS for frontend/backend API flexibility
    open: false,      // Don’t open browser in cloud IDEs
    allowedHosts: [
      "vscode-internal-175-beta.beta01.cloud.kavia.ai",            // existing internal domain
      "vscode-internal-495-beta.beta01.cloud.kavia.ai:3000",       // ✅ new host added with port
    ],
  },
});
