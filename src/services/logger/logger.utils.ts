/**
 * Logger Utilities
 *
 * Helper functions for using the logger service effectively throughout the application
 */

import { logger } from './logger.service';

/**
 * Creates a component-specific logger with the component name as prefix
 *
 * @param componentName The name of the component or module
 * @returns A child logger instance for the component
 */
export const createComponentLogger = (componentName: string) => {
  return logger.createChildLogger(componentName);
};

/**
 * Creates a feature-specific logger with the feature name as prefix
 *
 * @param featureName The name of the feature or module area
 * @returns A child logger instance for the feature
 */
export const createFeatureLogger = (featureName: string) => {
  return logger.createChildLogger(featureName);
};

/**
 * Creates a service-specific logger with the service name as prefix
 *
 * @param serviceName The name of the service
 * @returns A child logger instance for the service
 */
export const createServiceLogger = (serviceName: string) => {
  return logger.createChildLogger(serviceName);
};

// Export logger instances for common application areas
export const apiLogger = createFeatureLogger('API');
export const authLogger = createFeatureLogger('Auth');
export const routerLogger = createFeatureLogger('Router');
export const storeLogger = createFeatureLogger('Store');
export const performanceLogger = createFeatureLogger('Performance');

/**
 * Utility function to safely log errors with stack traces
 *
 * @param message Error message to log
 * @param error The error object
 * @param componentName Optional component name for context
 */
export const logError = (message: string, error: unknown, componentName?: string) => {
  const targetLogger = componentName ? createComponentLogger(componentName) : logger;

  if (error instanceof Error) {
    targetLogger.error(message, {
      name: error.name,
      message: error.message,
      stack: error.stack
    });
  } else {
    // Cast the unknown error to a string or object that can be logged
    targetLogger.error(message, String(error));
  }
};

/**
 * Measures and logs the execution time of an asynchronous function
 *
 * @param name Label for the timing measurement
 * @param fn Async function to measure
 * @param loggerInstance Optional specific logger to use
 * @returns The result of the async function
 */
export const measureAsync = async <T>(
  name: string,
  fn: () => Promise<T>,
  loggerInstance = logger
): Promise<T> => {
  loggerInstance.time(name);
  try {
    const result = await fn();
    return result;
  } finally {
    loggerInstance.timeEnd(name);
  }
};

/**
 * Measures and logs the execution time of a synchronous function
 *
 * @param name Label for the timing measurement
 * @param fn Function to measure
 * @param loggerInstance Optional specific logger to use
 * @returns The result of the function
 */
export const measure = <T>(name: string, fn: () => T, loggerInstance = logger): T => {
  loggerInstance.time(name);
  try {
    const result = fn();
    return result;
  } finally {
    loggerInstance.timeEnd(name);
  }
};

/**
 * Track API requests with consistent logging
 *
 * @param method HTTP method
 * @param url Request URL
 * @param data Optional request data
 * @param loggerInstance Optional specific logger to use
 * @returns The logger instance for chaining calls
 */
export const logApiRequest = (
  method: string,
  url: string,
  data?: unknown,
  loggerInstance = apiLogger
) => {
  const requestId = `req_${Date.now()}`;
  loggerInstance.group(`${method} ${url} (${requestId})`);
  loggerInstance.info('Request', { method, url, data });

  return { requestId, logger: loggerInstance };
};

/**
 * Log API response with timing information
 *
 * @param requestId Identifier for the request
 * @param response Response data
 * @param loggerInstance Optional specific logger to use
 */
export const logApiResponse = (
  requestId: string,
  response: unknown,
  loggerInstance = apiLogger
): void => {
  loggerInstance.info('Response', String(response));
  loggerInstance.groupEnd();
};

/**
 * Log API error with timing information
 *
 * @param requestId Identifier for the request
 * @param error Error object or message
 * @param loggerInstance Optional specific logger to use
 */
export const logApiError = (
  requestId: string,
  error: unknown,
  loggerInstance = apiLogger
): void => {
  if (error instanceof Error) {
    loggerInstance.error('API Error', {
      name: error.name,
      message: error.message,
      stack: error.stack
    });
  } else {
    loggerInstance.error('API Error', String(error));
  }
  loggerInstance.groupEnd();
};
