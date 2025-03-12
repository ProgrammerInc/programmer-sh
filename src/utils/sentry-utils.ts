import * as Sentry from '@sentry/react';

/**
 * Utility functions for Sentry error reporting and monitoring
 */

/**
 * Send a test error to Sentry to verify integration is working
 * @param context Optional context information to include with the error
 * @returns The Sentry event ID of the captured error
 */
export const sendTestError = (context: Record<string, any> = {}): string => {
  try {
    // Create a specific error type for testing
    const testError = new Error('This is a test error sent to Sentry');
    
    // Add additional context to the error
    Sentry.withScope((scope) => {
      scope.setLevel('info'); // Set severity level
      scope.setTag('type', 'test'); // Add tags for filtering
      scope.setUser({
        id: 'test-user',
        email: 'test@example.com',
      });
      
      // Add any custom context
      scope.setContext('test_context', {
        timestamp: new Date().toISOString(),
        environment: import.meta.env.MODE,
        ...context,
      });
    });
    
    // Capture and send the error
    const eventId = Sentry.captureException(testError);
    console.log('Test error sent to Sentry with ID:', eventId);
    return eventId;
  } catch (error) {
    console.error('Failed to send test error to Sentry:', error);
    return '';
  }
};

/**
 * Track a custom event in Sentry
 * @param name The name of the event to track
 * @param data Optional data to include with the event
 */
export const trackEvent = (name: string, data: Record<string, any> = {}): void => {
  try {
    Sentry.captureMessage(`Event: ${name}`, {
      level: 'info',
      tags: { event_type: name },
      extra: data,
    });
  } catch (error) {
    console.error('Failed to track event in Sentry:', error);
  }
};

/**
 * Set user information for Sentry tracking
 * @param user User information to associate with subsequent errors
 */
export const setUserContext = (user: { id?: string; email?: string; username?: string; [key: string]: any }): void => {
  Sentry.setUser(user);
};

/**
 * Clear user information from Sentry context
 */
export const clearUserContext = (): void => {
  Sentry.setUser(null);
};
