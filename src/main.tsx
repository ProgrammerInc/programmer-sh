// Import wdyr (why-did-you-render) to track unnecessary re-renders
// This import must be first!
import './wdyr';

import * as Sentry from '@sentry/react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { initializeTheme } from './commands/theme.commands.ts';
import { initializeWallpaper } from './commands/wallpaper.commands.ts';
import SentryErrorBoundary from './errors/sentry/sentry-error.boundary.tsx';
import './index.css';

// Initialize Sentry
Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  integrations: [
    // Enable automatic instrumentation
    Sentry.browserTracingIntegration(),
    // Configure replay with better session handling to avoid warnings
    Sentry.replayIntegration({
      maskAllText: true,
      blockAllMedia: true,
      networkDetailAllowUrls: [window.location.origin],
      networkCaptureBodies: false,
    })
  ],
  // Set tracesSampleRate to 1.0 to capture 100% of transactions for performance monitoring
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
  // Capture Replay for 10% of all sessions, but reduce percentage to help with warnings
  // plus for 100% of sessions with an error
  replaysSessionSampleRate: 0.05, // Reduced from 0.1 to 0.05 (5%)
  replaysOnErrorSampleRate: 1.0,
  // Enable debug in development
  debug: import.meta.env.DEV,
  environment: import.meta.env.MODE
});

// Initialize theme on application load
initializeTheme();

// Initialize wallpaper on application load
initializeWallpaper();

createRoot(document.getElementById('root')!).render(
  <SentryErrorBoundary>
    <App />
  </SentryErrorBoundary>
);
