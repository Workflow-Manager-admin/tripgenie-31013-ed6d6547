/* eslint-disable no-undef */
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

/**
 * Patch: Ensure Vite "base" config is correct for dev/prod.
 * If you intend to deploy to a subdirectory or custom domain, update 'base' accordingly.
 * For most React SPAs with Vercel/Netlify/static hosting, base should be "/" (default).
 * No "root" misconfiguration present (defaults to project root). No "public/src" path issues found.
 */

export default defineConfig({
  plugins: [react()],
  base: "/", // Ensures all asset/script URLs are absolute from server root; prevents 404s on /@vite/client & /src/main.jsx
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  server: {
    host: "0.0.0.0", // Accept all interfaces (required in cloud-based IDEs)
    port: 3000,      // Explicitly set port to 3000 for cloud IDEs (and forwarded envs)
    strictPort: true, // Prevent Vite from switching ports if 3000 is taken
    cors: true,       // Allow CORS for frontend/backend API flexibility
    open: false,      // Don’t open browser in cloud IDEs
    // Use process.env for build-time env vars; only set if available to avoid undefined errors
    ...(process.env.CLOUD_IDE_EXTERNAL_URL
      ? { origin: process.env.CLOUD_IDE_EXTERNAL_URL }
      : {}),
    hmr: process.env.CLOUD_IDE_EXTERNAL_HOST
      ? {
          host: process.env.CLOUD_IDE_EXTERNAL_HOST,
          port: 3000,
          protocol: "ws",
        }
      : undefined,
    allowedHosts: [
      "vscode-internal-175-beta.beta01.cloud.kavia.ai",            // existing internal domain
      "vscode-internal-495-beta.beta01.cloud.kavia.ai:3000",       // ✅ new host added with port
      // Add additional allowed hosts here if needed for new cloud IDE domains
    ],
  },
});
