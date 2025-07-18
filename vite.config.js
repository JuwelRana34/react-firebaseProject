// vite.config.js
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      workbox: {
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
      },
      registerType: "autoUpdate", // Automatically updates the service worker when changes are made
      includeAssets: ["favicon.svg", "robots.txt", "apple-touch-icon.png"], // Include assets for caching
      manifest: {
        name: "JnuIHC",
        short_name: "JnuIHC",
        description: "A app for Jnu IHC student",
        theme_color: "#ffffff",
        icons: [
          {
            src: "logo.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "logo.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
});
