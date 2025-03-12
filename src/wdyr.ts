/**
 * Why Did You Render Configuration
 * 
 * This file configures the why-did-you-render library which helps identify 
 * unnecessary re-renders in React components.
 *
 * @see https://github.com/welldone-software/why-did-you-render
 */

import { logger } from '@/services/logger';

// Create a dedicated logger instance for WDYR
const wdyrLogger = logger.createChildLogger('WDYR');

// Only include in development mode
if (import.meta.env.DEV) {
  // Dynamically load packages to avoid bundling in production
  const whyDidYouRenderPkg = () => import('@welldone-software/why-did-you-render');

  // Initialize WDYR using a Promise-based approach to avoid top-level await
  import('react').then(React => {
    wdyrLogger.info('Initializing Why Did You Render...');
    
    whyDidYouRenderPkg().then(whyDidYouRender => {
      whyDidYouRender.default(React.default, {
        // Global configuration
        trackAllPureComponents: false,  // Set to false to avoid potential conflicts
        trackExtraHooks: [],  // Only track specific hooks if needed
        logOwnerReasons: true,
        collapseGroups: true,
        trackHooks: false,  // Disable hook tracking to prevent conflicts with Router
        
        // Skip tracking for problematic components
        exclude: [
          // React Router components
          /^(Link|NavLink|Route|Router|Routes|BrowserRouter|Outlet)$/,
          // React context providers
          /^(.+Provider)$/,
          // Specific important components
          /^(Suspense|ErrorBoundary|React\.Fragment)$/,
          // Libraries
          /node_modules\/react-router/,
          /node_modules\/@tanstack/
        ]
        
        // The include property with hocFilter has been removed as it's not properly supported
        // Instead, we'll rely on explicit whyDidYouRender = true on components
      });
      
      // Use our logger service instead of console.log
      wdyrLogger.info('Why Did You Render initialized in development mode');
      
      // Create a performance mark for WDYR initialization
      wdyrLogger.mark('wdyrInitialized');
    });
  }).catch(error => {
    // Use our logger service for error reporting
    wdyrLogger.error('Failed to initialize Why Did You Render:', error);
  });
}

export {};
