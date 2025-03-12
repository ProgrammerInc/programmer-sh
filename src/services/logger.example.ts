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

// Production configuration example
export function configureProductionLogging(): void {
  // For production, we might want to disable debug logs
  logger.setLevel(LogLevel.WARN); // Only show warnings and errors
  
  // Disable colors in production for cleaner logs
  // Note: this would require extending the Logger class with this feature
  
  // Maybe disable timestamps for certain contexts
  logger.setTimestampEnabled(false);
}
