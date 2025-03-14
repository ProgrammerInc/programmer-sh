/**
 * Logger Usage Examples
 *
 * This file demonstrates how to use the logger service in different parts of the application.
 * It shows various usage patterns and best practices.
 */

import { logger, LogLevel } from './logger.service';

// Basic usage
logger.debug('This is a debug message');
logger.info('This is an info message');
logger.warn('This is a warning message');
logger.error('This is an error message');

// Logging with context data
logger.info('User logged in', { userId: 123, role: 'admin' });

// Create a child logger for a specific component/feature
const componentLogger = logger.createChildLogger('ExampleComponent');
componentLogger.info('Component initialized');

// Table logging for structured data
const users = [
  { id: 1, name: 'Alice', role: 'Admin', active: true },
  { id: 2, name: 'Bob', role: 'User', active: false },
  { id: 3, name: 'Charlie', role: 'User', active: true }
];

logger.info('Active users:');
logger.table(users);

// Only show specific columns
logger.info('User roles:');
logger.table(users, ['name', 'role']);

// Performance timing with time/timeEnd
logger.time('operationDuration');
// Simulate some operation
setTimeout(() => {
  logger.timeEnd('operationDuration');
}, 500);

// Counter functionality
function trackApiCalls(endpoint: string) {
  logger.count('apiCalls', `API call to ${endpoint}`);

  // Simulate API call
  return Promise.resolve({ success: true });
}

// Call the function multiple times
trackApiCalls('/users');
trackApiCalls('/products');
trackApiCalls('/users');

// Reset a specific counter
logger.countReset('apiCalls');

// Grouped logs
logger.group('User Authentication');
logger.info('Validating credentials...');
logger.info('Authentication successful');
logger.groupEnd();

// Collapsed group
logger.group('Detailed Debug Info', true); // true = collapsed
logger.debug('Connection pool stats', { active: 5, idle: 10 });
logger.debug('Cache hit ratio', { hits: 127, misses: 22 });
logger.groupEnd();

// Trace for debugging with stack traces
function deepNestedFunction() {
  logger.trace("Here's what led to this point", { context: 'debugging' });
}

function nestedFunction() {
  deepNestedFunction();
}

function exampleFunction() {
  nestedFunction();
}

exampleFunction();

// Advanced example: API Request Logging
function simulateApiRequest(url: string, method: string, data?: unknown) {
  const requestLogger = logger.createChildLogger(`API:${method}`);
  const requestId = `req_${Date.now()}`;

  requestLogger.group(`Request ${requestId}`);
  requestLogger.info(`${method} ${url}`, { data });

  // Use time to measure request duration
  requestLogger.time(requestId);

  // Simulate an API call
  return new Promise(resolve => {
    setTimeout(() => {
      const response = { success: true, data: { id: 123, name: 'Example' } };

      requestLogger.timeEnd(requestId);
      requestLogger.info('Response received', response);
      requestLogger.groupEnd();

      resolve(response);
    }, 300);
  });
}

function simulateErrorRequest(url: string) {
  const requestLogger = logger.createChildLogger('API:ERROR');

  requestLogger.group(`Failed request`);
  requestLogger.info(`GET ${url}`);

  setTimeout(() => {
    try {
      // Simulate an error
      throw new Error('API connection timeout');
    } catch (error) {
      if (error instanceof Error) {
        requestLogger.error('Request failed', {
          message: error.message,
          stack: error.stack
        });
      }
      requestLogger.groupEnd();
    }
  }, 200);
}

// Examples of performance.mark() and performance.measure()

// Example 1: Basic mark and measure
logger.mark('startProcess');

// Simulate some process
setTimeout(() => {
  logger.mark('endProcess');
  logger.measure('totalProcessingTime', 'startProcess', 'endProcess');
}, 600);

// Example 2: Using measure with custom details
logger.mark('dataFetch', { detail: { source: 'database', query: 'SELECT * FROM users' } });

setTimeout(() => {
  logger.mark('dataProcessed');
  logger.measure('databaseOperation', 'dataFetch', 'dataProcessed', {
    detail: { recordsProcessed: 250 }
  });

  // Show how to retrieve performance entries
  const measures = logger.getPerformanceEntries('databaseOperation', 'measure');
  logger.info('Database operation metrics:', measures);
}, 800);

// Example 3: Multiple related operations with shared timing context
function simulateComplexOperation() {
  const perfLogger = logger.createChildLogger('PerformanceTest');

  perfLogger.mark('operationStart');

  // First sub-operation
  setTimeout(() => {
    perfLogger.mark('phase1Complete');
    perfLogger.measure('phase1Duration', 'operationStart', 'phase1Complete');

    // Second sub-operation
    setTimeout(() => {
      perfLogger.mark('phase2Complete');
      perfLogger.measure('phase2Duration', 'phase1Complete', 'phase2Complete');

      // Final operation
      setTimeout(() => {
        perfLogger.mark('operationComplete');

        // Measure individual phases and total duration
        perfLogger.measure('totalDuration', 'operationStart', 'operationComplete');

        // Log a summary of all the measurements
        const allMeasures = perfLogger.getPerformanceEntries(undefined, 'measure').map(entry => ({
          name: entry.name,
          duration: `${entry.duration.toFixed(2)}ms`,
          start: new Date(entry.startTime).toISOString()
        }));

        perfLogger.group('Performance Summary');
        perfLogger.table(allMeasures);
        perfLogger.groupEnd();

        // Clean up performance entries
        perfLogger.clearMarks();
        perfLogger.clearMeasures();
      }, 300);
    }, 400);
  }, 500);
}

simulateComplexOperation();

// Example of a practical use case: Measuring animation frame performance
// This would typically be used in an animation loop
function simulateAnimationFrameTiming() {
  const fpsLogger = logger.createChildLogger('AnimationPerformance');
  let frameCount = 0;
  let lastFrameTime = performance.now();

  function mockAnimationFrame(timestamp: number) {
    // Mark frame start
    const frameLabel = `frame${frameCount}`;
    fpsLogger.mark(frameLabel);

    // Calculate time since last frame
    const frameDelta = timestamp - lastFrameTime;
    lastFrameTime = timestamp;

    // Simulate frame rendering work
    const renderStart = performance.now();

    // Pretend we're doing complex rendering...
    const renderWork = Math.sin(Math.sqrt(timestamp)) * 1000;

    // Measure the "work" we did this frame
    const renderTime = performance.now() - renderStart;

    // Log frame statistics every 10th frame
    if (frameCount % 10 === 0) {
      fpsLogger.info(`Frame ${frameCount}`, {
        fps: (1000 / frameDelta).toFixed(1),
        frameDelta: `${frameDelta.toFixed(2)}ms`,
        renderTime: `${renderTime.toFixed(2)}ms`
      });
    }

    frameCount++;

    // Continue for 50 frames
    if (frameCount < 50) {
      // In a real app, this would be requestAnimationFrame
      setTimeout(() => mockAnimationFrame(performance.now()), 16.7); // ~60fps
    } else {
      fpsLogger.info('Animation complete', { totalFrames: frameCount });
    }
  }

  // Start the mock animation loop
  mockAnimationFrame(performance.now());
}

simulateAnimationFrameTiming();

// Run simulation examples
simulateApiRequest('/api/users', 'GET');
simulateApiRequest('/api/posts', 'POST', { title: 'New Post', body: 'Content here' });
simulateErrorRequest('/api/settings');

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
export function createComponentLogger(
  componentName: string
): ReturnType<typeof logger.createChildLogger> {
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
