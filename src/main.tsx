// Import wdyr (why-did-you-render) to track unnecessary re-renders
// This import must be first!
import './wdyr';

import * as Sentry from '@sentry/react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { initializeTheme } from './commands/theme-commands.ts';
import { initializeWallpaper } from './commands/wallpaper-commands.ts';
import SentryErrorBoundary from './components/error/sentry/sentry-error.boundary.tsx';
import './index.css';

// Initialize Sentry
Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  integrations: [
    // Enable automatic instrumentation
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration()
  ],
  // Set tracesSampleRate to 1.0 to capture 100% of transactions for performance monitoring
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
  // Capture Replay for 10% of all sessions,
  // plus for 100% of sessions with an error
  replaysSessionSampleRate: 0.1,
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
