/**
 * Logger Demo Component
 *
 * This component demonstrates the various features of the logger service
 * in a practical React component context.
 */

import { logger } from '@/services/logger';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// Create a component-specific logger instance
const demoLogger = logger.createChildLogger('LoggerDemo');

// Custom hook to demonstrate logger usage in hooks
function useLoggerDemo() {
  const hookLogger = logger.createChildLogger('LoggerDemoHook');

  useEffect(() => {
    hookLogger.info('Logger demo hook initialized');
    hookLogger.time('hookLifetime');

    // Create a performance mark at hook initialization
    hookLogger.mark('hookInit');

    return () => {
      hookLogger.timeEnd('hookLifetime');
      hookLogger.info('Logger demo hook cleanup');

      // Create cleanup mark and measure hook lifetime
      hookLogger.mark('hookCleanup');
      hookLogger.measure('hookLifecycle', 'hookInit', 'hookCleanup');
    };
  }, [hookLogger]); // Add hookLogger to dependency array

  return {
    logEvent: (eventName: string, data?: Record<string, unknown>) => {
      hookLogger.group(`Event: ${eventName}`);
      hookLogger.info('Event triggered', data);
      hookLogger.count(eventName, 'Event occurrence count');
      hookLogger.groupEnd();
    }
  };
}

interface ButtonProps {
  label: string;
  onClick: () => void;
  color?: string;
}

// Demo button component
function DemoButton({ label, onClick, color = '#3498db' }: ButtonProps) {
  return (
    <button
      className="px-4 py-2 m-2 rounded text-white"
      style={{ backgroundColor: color }}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

// Set this static property to enable why-did-you-render tracking
DemoButton.whyDidYouRender = true;

export default function LoggerDemo() {
  const [count, setCount] = useState(0);
  const { logEvent } = useLoggerDemo();

  // Log component mount
  useEffect(() => {
    demoLogger.info('Logger demo component mounted');
    demoLogger.table({
      component: 'LoggerDemo',
      mountTime: new Date().toISOString(),
      environment: import.meta.env?.MODE || 'unknown'
    });

    // Create a performance mark at component mount
    demoLogger.mark('componentMounted');

    return () => {
      // Create mark for unmount and measure component lifecycle
      demoLogger.mark('componentUnmounted');
      demoLogger.measure('componentLifecycle', 'componentMounted', 'componentUnmounted');
      demoLogger.info('Logger demo component unmounted');
    };
  }, []); // No dependencies needed as demoLogger is constant

  const handleIncrement = () => {
    // Track performance with Performance API
    demoLogger.mark('incrementStart');

    demoLogger.time('increment');
    setCount(prev => prev + 1);
    logEvent('increment', { previousCount: count });
    demoLogger.timeEnd('increment');

    // End mark and create measure
    demoLogger.mark('incrementEnd');
    demoLogger.measure('incrementOperation', 'incrementStart', 'incrementEnd');
  };

  const handleReset = () => {
    demoLogger.warn('Counter reset triggered');
    setCount(0);
    demoLogger.countReset('increment');
  };

  const handleShowTrace = () => {
    demoLogger.trace('Stack trace generated', { timestamp: new Date().toISOString() });
  };

  const handleLogTable = () => {
    const demoData = [
      { id: 1, name: 'Item One', status: 'active', count },
      { id: 2, name: 'Item Two', status: 'pending', count: count * 2 },
      { id: 3, name: 'Item Three', status: count > 5 ? 'active' : 'inactive', count: count * 3 }
    ];

    demoLogger.table(demoData);
  };

  const handleSimulateError = () => {
    try {
      // Intentionally cause an error
      const obj = {} as { nonExistentMethod: () => void };
      obj.nonExistentMethod();
    } catch (error) {
      if (error instanceof Error) {
        demoLogger.error('Error occurred in component', {
          message: error.message,
          stack: error.stack
        });
      }
    }
  };

  const handlePerformanceDemo = () => {
    // Create marks and measures to demonstrate Performance API integration
    demoLogger.mark('demoStart', { detail: { count } });

    // Simulate some processing with a deliberate delay
    setTimeout(() => {
      demoLogger.mark('processingDone');
      demoLogger.measure('processingTime', 'demoStart', 'processingDone', {
        detail: { description: 'Simulated processing demonstration' }
      });

      // Show how to get performance entries
      const entries = demoLogger.getPerformanceEntries('processingTime', 'measure');
      demoLogger.info('Retrieved performance entries:', entries);

      // Show performance metrics in a table
      // Convert PerformanceEntry objects to plain objects before logging as table
      const allMeasures = demoLogger.getPerformanceEntries(undefined, 'measure').map(entry => ({
        name: entry.name,
        entryType: entry.entryType,
        startTime: entry.startTime,
        duration: entry.duration,
        timestamp: new Date(entry.startTime).toISOString()
      }));

      demoLogger.group('Performance Measures');
      demoLogger.table(allMeasures);
      demoLogger.groupEnd();
    }, 500);
  };

  return (
    <div className="p-4 border rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Logger Service Demo</h2>

      <div className="mb-4">
        <p className="text-xl">Count: {count}</p>
      </div>

      <div className="flex flex-wrap">
        <DemoButton label="Increment" onClick={handleIncrement} color="#3498db" />

        <DemoButton label="Reset" onClick={handleReset} color="#e74c3c" />

        <DemoButton label="Show Stack Trace" onClick={handleShowTrace} color="#9b59b6" />

        <DemoButton label="Log Table Data" onClick={handleLogTable} color="#2ecc71" />

        <DemoButton label="Simulate Error" onClick={handleSimulateError} color="#e67e22" />

        <DemoButton label="Performance API Demo" onClick={handlePerformanceDemo} color="#16a085" />
      </div>

      <div className="mt-6 p-4 bg-blue-900 text-white rounded">
        <h3 className="text-lg font-semibold mb-2">Why Did You Render Integration</h3>
        <p className="mb-2">
          The application now includes the Why-Did-You-Render package to help identify unnecessary
          re-renders and optimize component performance.
        </p>
        <p className="mb-4 text-blue-200">
          Open the console and look for logs with the 🔍 [WDYR] prefix to see tracked re-renders.
        </p>
        <Link
          to="/demo/wdyr"
          className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          View Why-Did-You-Render Demo
        </Link>
      </div>

      <div className="mt-6 p-4 bg-green-900 text-white rounded">
        <h3 className="text-lg font-semibold mb-2">Memory Tracker Integration</h3>
        <p className="mb-2">
          The application includes a Memory Tracker service to help identify potential memory leaks
          and monitor memory usage in real-time.
        </p>
        <p className="mb-4 text-green-200">
          Use Chrome DevTools to see detailed memory usage statistics while interacting with the
          demo.
        </p>
        <Link
          to="/demo/memory"
          className="inline-block px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
        >
          View Memory Tracker Demo
        </Link>
      </div>

      <div className="mt-4 p-2 bg-gray-100 rounded">
        <p className="text-sm text-black">Open the browser console to see the logged output</p>
        <p className="text-sm text-gray-600">
          Try clicking the buttons above and watch the structured logs appear in the console
        </p>
      </div>
    </div>
  );
}
