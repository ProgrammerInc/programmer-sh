import { sentryVitePlugin } from '@sentry/vite-plugin';
import react from '@vitejs/plugin-react-swc';
import { componentTagger } from 'lovable-tagger';
import path from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  build: {
    sourcemap: true,
    minify: 'terser', // Use Terser for better minification
    terserOptions: {
      compress: {
        drop_console: true, // Remove console logs in production
        drop_debugger: true, // Remove debugger statements
      },
    },
    rollupOptions: {
      output: {
        // Enhance chunking strategy
        manualChunks: (id) => {
          // Core vendor libs - CRITICAL: Keep all React packages together
          if (id.includes('node_modules/react') || 
              id.includes('node_modules/react-dom') || 
              id.includes('node_modules/react-router') || 
              id.includes('node_modules/scheduler') ||
              id.includes('node_modules/@remix-run') ||
              id.includes('node_modules/use-sync-external-store')) {
            return 'react-vendor';
          }
          
          // Three.js split into multiple smaller chunks
          if (id.includes('node_modules/three')) {
            return 'three-core';
          }
          if (id.includes('@react-three/fiber')) {
            return 'r3f-fiber';
          }
          if (id.includes('@react-three/drei')) {
            return 'r3f-drei';
          }
          
          // Split UI components into smaller groups
          if (id.includes('@radix-ui/react-')) {
            // Basic layout components
            if (id.includes('layout') || 
                id.includes('aspect-ratio') || 
                id.includes('separator') || 
                id.includes('slot')) {
              return 'ui-layout';
            }
            
            // Form controls
            if (id.includes('checkbox') || 
                id.includes('radio') || 
                id.includes('slider') || 
                id.includes('switch') || 
                id.includes('select')) {
              return 'ui-form';
            }
            
            // Navigation components
            if (id.includes('navigation') || 
                id.includes('tabs') || 
                id.includes('dropdown') || 
                id.includes('menubar')) {
              return 'ui-navigation';
            }
            
            // Dialog-type components
            if (id.includes('dialog') || 
                id.includes('popover') || 
                id.includes('tooltip') || 
                id.includes('alert') || 
                id.includes('hover-card')) {
              return 'ui-overlays';
            }
            
            // Remaining UI components
            return 'ui-other';
          }
          
          // Animation libraries
          if (id.includes('framer-motion')) {
            return 'framer-motion';
          }
          if (id.includes('gsap')) {
            return 'gsap';
          }
          if (id.includes('animejs')) {
            return 'animejs';
          }
          
          // Particles
          if (id.includes('@tsparticles')) {
            return 'particles';
          }
        }
      }
    }
  },
  server: {
    host: '::',
    port: 8080
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
    // Put the Sentry vite plugin after all other plugins
    sentryVitePlugin({
      authToken: process.env.SENTRY_AUTH_TOKEN,
      org: 'programmer-inc',
      project: 'programmer-sh',
      telemetry: true
    })
  ].filter(Boolean),
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  assetsInclude: ['**/*.glb'] // Restore this for 3D model loading
}));
