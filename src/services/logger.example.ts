/**
 * Logger Usage Examples
 * 
 * This file demonstrates how to use the logger service in different parts of the application.
 * It shows various usage patterns and best practices.
 */

import { logger, LogLevel, ChildLogger } from './logger';

// Basic usage examples
export function loggerExamples(): void {
  // Log messages at different levels
  logger.debug('Debug message - Only shown in development');
  logger.info('Info message - Shown in development and test');
  logger.warn('Warning message - Shown in all environments');
  logger.error('Error message - Shown in all environments');
  
  // Log with additional data
  logger.info('User action', { userId: 123, action: 'login', timestamp: new Date() });
  
  // Log grouped messages
  logger.group('API Request Details');
  logger.info('Endpoint: /api/users');
  logger.info('Method: GET');
  logger.info('Status: 200');
  logger.groupEnd();
  
  // Log collapsed groups (useful for verbose logs)
  logger.group('Performance Metrics', true); // true = collapsed by default
  logger.info('Render time: 42ms');
  logger.info('Network latency: 120ms');
  logger.info('Total page load: 350ms');
  logger.groupEnd();
}

// Component-specific logger example
export function createComponentLogger(componentName: string): ChildLogger {
  return logger.createChildLogger(componentName);
}

// Example usage in a terminal component
export function terminalLoggerExample(): void {
  const terminalLogger = createComponentLogger('Terminal');
  
  terminalLogger.info('Terminal initialized');
  terminalLogger.debug('Command history loaded');
  
  // Log errors with full details
  try {
    // Some operation that might fail
    throw new Error('Command execution failed');
  } catch (error) {
    if (error instanceof Error) {
      terminalLogger.error('Error executing command', { 
        message: error.message,
        stack: error.stack 
      });
    }
  }
}

// Table logging examples
export function tableLoggingExamples(): void {
  const componentLogger = createComponentLogger('TableDemo');
  
  // Simple object table
  const user = {
    id: 123,
    name: 'User Name',
    email: 'user@example.com',
    lastLogin: new Date(),
    isActive: true,
    role: 'admin'
  };
  
  logger.table(user);
  
  // Array of objects table
  const users = [
    { id: 123, name: 'User One', role: 'admin', lastActivity: '2 mins ago' },
    { id: 124, name: 'User Two', role: 'editor', lastActivity: '5 hours ago' },
    { id: 125, name: 'User Three', role: 'viewer', lastActivity: '2 days ago' }
  ];
  
  // Log all data
  logger.table(users);
  
  // Log only specific columns
  componentLogger.table(users, ['name', 'role']);
}

// Performance timing examples
export function performanceTimingExamples(): void {
  const perfLogger = createComponentLogger('Performance');
  
  // Basic timer usage
  logger.time('simpleOperation');
  // Simulate work
  for (let i = 0; i < 1000000; i++) {
    // Busy wait
  }
  logger.timeEnd('simpleOperation');
  
  // Component-specific timer
  perfLogger.time('dataProcessing');
  // Simulate async work
  setTimeout(() => {
    perfLogger.timeEnd('dataProcessing');
    perfLogger.info('Data processing complete');
  }, 500);
  
  // Timer that doesn't exist
  logger.timeEnd('nonExistentTimer'); // Will produce a warning
  
  // Multiple timers
  logger.time('totalOperation');
  
  logger.time('step1');
  // Simulate work for step 1
  setTimeout(() => {
    logger.timeEnd('step1');
    
    logger.time('step2');
    // Simulate work for step 2
    setTimeout(() => {
      logger.timeEnd('step2');
      logger.timeEnd('totalOperation');
    }, 300);
  }, 200);
}

// Counter examples
export function counterExamples(): void {
  const clickLogger = createComponentLogger('ClickTracker');
  
  // Simple counter
  for (let i = 0; i < 5; i++) {
    logger.count('buttonClicks');
  }
  
  // Counter with custom message
  for (let i = 0; i < 3; i++) {
    clickLogger.count('modalOpens', 'User opened modal');
  }
  
  // Reset specific counter
  logger.countReset('buttonClicks');
  
  // Count again after reset
  logger.count('buttonClicks'); // Will show 1
  
  // Reset all counters
  logger.countReset();
}

// Trace example for debugging
export function traceExamples(): void {
  function nestedFunction() {
    logger.trace('Stack trace');
  }
  
  function intermediateFunction() {
    nestedFunction();
  }
  
  intermediateFunction();
  
  // Component-specific trace
  const debugLogger = createComponentLogger('Debugger');
  debugLogger.trace('Component-specific trace');
}

// Production configuration example
export function configureProductionLogging(): void {
  // For production, we might want to disable debug logs
  logger.setLevel(LogLevel.WARN); // Only show warnings and errors
  
  // Disable colors in production for cleaner logs
  // Note: this would require extending the Logger class with this feature
  
  // Maybe disable timestamps for certain contexts
  logger.setTimestampEnabled(false);
}

// Combined example showing practical usage
export function practicalLoggingExample(): void {
  const apiLogger = createComponentLogger('APIClient');
  
  // Log the start of an API request
  apiLogger.info('Starting API request', { endpoint: '/api/data', method: 'GET' });
  
  // Time the API call
  apiLogger.time('apiCall');
  
  // Simulate API call
  setTimeout(() => {
    // API call completed
    apiLogger.timeEnd('apiCall');
    
    // Log response details in a table
    const responseData = {
      status: 200,
      headers: {
        'content-type': 'application/json',
        'cache-control': 'no-cache'
      },
      data: {
        items: 42,
        page: 1,
        totalPages: 5
      }
    };
    
    // Group the response information
    apiLogger.group('API Response');
    apiLogger.info('Response received');
    apiLogger.table(responseData);
    
    // Log performance metrics
    apiLogger.group('Performance', true);
    apiLogger.info('Network time: 120ms');
    apiLogger.info('Parse time: 5ms');
    apiLogger.groupEnd();
    
    apiLogger.groupEnd(); // End API Response group
    
    // Count this API call
    apiLogger.count('apiCalls', 'API requests made');
  }, 750);
}
