// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',  // Automatically updates the service worker when changes are made
      includeAssets: ['favicon.svg', 'robots.txt', 'apple-touch-icon.png'],  // Include assets for caching
      manifest: {
        name: 'JnuIHC',
        short_name: 'JnuIHC',
        description: 'A app for Jnu IHC student',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'logo.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'logo.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
});
