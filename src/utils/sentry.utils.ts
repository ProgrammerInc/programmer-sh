import * as Sentry from '@sentry/react';

/**
 * Utility functions for Sentry error reporting and monitoring
 */

/**
 * Type definition for context data passed to Sentry
 */
export type SentryContext = Record<string, string | number | boolean | null | undefined>;

/**
 * Severity levels for Sentry events
 */
export enum SentrySeverity {
  Fatal = 'fatal',
  Error = 'error',
  Warning = 'warning',
  Info = 'info',
  Debug = 'debug'
}

/**
 * User information interface for Sentry tracking
 */
export interface SentryUser {
  /** Unique user identifier */
  id?: string;
  /** User email address */
  email?: string;
  /** User's username */
  username?: string;
  /** Any additional user attributes */
  [key: string]: string | number | boolean | null | undefined;
}

/**
 * Send a test error to Sentry to verify integration is working
 * @param context Optional context information to include with the error
 * @returns The Sentry event ID of the captured error or empty string if capture fails
 */
export const sendTestError = (
  context: SentryContext = {}
): string => {
  try {
    // Create a specific error type for testing
    const testError = new Error('This is a test error sent to Sentry');

    // Add additional context to the error
    Sentry.withScope(scope => {
      scope.setLevel(SentrySeverity.Info); // Set severity level using enum for type safety
      scope.setTag('type', 'test'); // Add tags for filtering
      scope.setUser({
        id: 'test-user',
        email: 'test@example.com'
      });

      // Add any custom context
      scope.setContext('test_context', {
        timestamp: new Date().toISOString(),
        environment: import.meta.env.MODE,
        ...context
      });
    });

    // Capture and send the error
    const eventId = Sentry.captureException(testError);
    console.log('Test error sent to Sentry with ID:', eventId);
    return eventId || '';
  } catch (error) {
    console.error('Failed to send test error to Sentry:', error);
    return '';
  }
};

/**
 * Track a custom event in Sentry
 * @param name The name of the event to track
 * @param data Optional data to include with the event
 * @param level Severity level for the event (defaults to 'info')
 */
export const trackEvent = (
  name: string,
  data: SentryContext = {},
  level: SentrySeverity = SentrySeverity.Info
): void => {
  if (!name || typeof name !== 'string') {
    console.error('Invalid event name provided to trackEvent');
    return;
  }
  
  try {
    Sentry.captureMessage(`Event: ${name}`, {
      level,
      tags: { event_type: name },
      extra: data
    });
  } catch (error) {
    console.error('Failed to track event in Sentry:', error);
  }
};

/**
 * Set user information for Sentry tracking
 * @param user User information to associate with subsequent errors
 */
export const setUserContext = (user: SentryUser): void => {
  try {
    Sentry.setUser(user);
  } catch (error) {
    console.error('Failed to set user context in Sentry:', error);
  }
};

/**
 * Clear user information from Sentry context
 */
export const clearUserContext = (): void => {
  try {
    Sentry.setUser(null);
  } catch (error) {
    console.error('Failed to clear user context in Sentry:', error);
  }
};
