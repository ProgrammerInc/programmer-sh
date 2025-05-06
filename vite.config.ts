import { sentryVitePlugin } from '@sentry/vite-plugin';
import react from '@vitejs/plugin-react-swc';
import fs from 'fs';
import path from 'path';
import { defineConfig } from 'vite';
import { Wallpaper } from './src/components/ui/wallpaper';
import wallpapers from './src/presets/wallpaper.presets';

// Loop over page class names from files in src/pages
const pages = path.resolve(__dirname, './src/pages');
const pageFiles = fs.readdirSync(pages);

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  build: {
    sourcemap: true,
    minify: 'terser', // Use Terser for better minification
    terserOptions: {
      compress: {
        drop_console: true, // Remove console logs in production
        drop_debugger: true // Remove debugger statements
      }
    },
    rollupOptions: {
      output: {
        // Enhance chunking strategy
        manualChunks: id => {
          // Core vendor libs - CRITICAL: Keep all React packages together
          if (
            id.includes('node_modules/react') ||
            id.includes('node_modules/react-dom') ||
            id.includes('node_modules/react-router') ||
            id.includes('node_modules/scheduler') ||
            id.includes('node_modules/@remix-run') ||
            id.includes('node_modules/use-sync-external-store')
          ) {
            return 'react-vendor';
          }

          // Split UI components into smaller groups
          if (id.includes('@radix-ui/react-')) {
            // Basic layout components
            if (
              id.includes('layout') ||
              id.includes('aspect-ratio') ||
              id.includes('separator') ||
              id.includes('slot')
            ) {
              return 'ui-layout';
            }

            // Form controls
            if (
              id.includes('checkbox') ||
              id.includes('radio') ||
              id.includes('slider') ||
              id.includes('switch') ||
              id.includes('select')
            ) {
              return 'ui-form';
            }

            // Navigation components
            if (
              id.includes('navigation') ||
              id.includes('tabs') ||
              id.includes('dropdown') ||
              id.includes('menubar')
            ) {
              return 'ui-navigation';
            }

            // Dialog-type components
            if (
              id.includes('dialog') ||
              id.includes('popover') ||
              id.includes('tooltip') ||
              id.includes('alert') ||
              id.includes('hover-card')
            ) {
              return 'ui-overlays';
            }

            // Remaining UI components
            return 'ui-other';
          }

          if (id.includes('src')) {
            // Demo components
            if (id.includes('demo')) {
              return 'ui-demos';
            }

            // Handle pages more explicitly - this helps with lazy loading
            if (id.includes('src/pages/Index')) {
              return 'page-index';
            }

            for (const page of pageFiles) {
              if (id.includes(page)) {
                // Convert page name from PascalCase to kebab case
                return `page${page
                  .replace('.tsx', '')
                  .replace(/([A-Z])/g, '-$1')
                  .toLowerCase()}`;
              }
            }
          }

          // Animation libraries
          if (id.includes('animejs')) {
            return 'animation-animejs';
          }

          if (id.includes('framer-motion')) {
            return 'animation-framer-motion';
          }

          if (id.includes('gsap')) {
            return 'animation-gsap';
          }

          // Three.js split into multiple smaller chunks
          if (id.includes('node_modules/three')) {
            return 'animation-three-core';
          }

          if (id.includes('@react-three/drei')) {
            return 'animation-react-three-drei';
          }

          if (id.includes('@react-three/fiber')) {
            return 'animation-react-three-fiber';
          }

          // Loop through wallpapers object values
          for (const wallpaper of Object.values<Wallpaper>(wallpapers)) {
            if (
              wallpaper.type === 'animation' &&
              wallpaper.background.animation &&
              id.includes(wallpaper.background.animation.id)
            ) {
              return `wallpaper-${wallpaper.background.animation.id}`;
            }
          }
        }
      }
    }
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
    exclude: []
  },
  preview: {
    host: '::',
    port: 8080
  },
  server: {
    host: '::',
    port: 3000
  },
  plugins: [
    react(),
    // Put the Sentry vite plugin after all other plugins
    sentryVitePlugin({
      authToken: process.env.VITE_SENTRY_AUTH_TOKEN,
      // release: {
      //   name: process.env.VITE_SENTRY_RELEASE,
      // },
      org: process.env.VITE_SENTRY_ORGANIZATION,
      project: process.env.VITE_SENTRY_PROJECT,
      telemetry: false
    })
  ].filter(Boolean),
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    },
    extensions: ['.tsx', '.ts', '.jsx', '.js']
  },
  assetsInclude: ['**/*.glb'] // Added *.glb for 3D model loading
}));
