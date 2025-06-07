/**
 * Vite Configuration for TripMosaic-31218 (Kavia AI)
 * -----------------------------------------------------------------------------
 * Features:
 *   - React & TailwindCSS integration
 *   - Path alias for "@/src"
 *   - Customizable port for dev server
 *   - COMPLIANT: Allows internal Kavia AI deployment host
 * 
 * © 2025 Kavia AI | tripmosaic-31218-ac0cc034
 * -----------------------------------------------------------------------------
 */

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // updated to use __dirname for compatibility
    },
  },
  server: {
    host: true, // enables access via LAN/IP (important for cloud or containers)
    port: 3000, // ✅ Change this to any free port, e.g., 3000, 4000
    allowedHosts: [
      "vscode-internal-175-beta.beta01.cloud.kavia.ai", // Kavia internal access
    ],
  },
});
