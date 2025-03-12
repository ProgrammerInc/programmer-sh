/**
 * Logger Demo Component
 *
 * This component demonstrates the various features of the logger service
 * in a practical React component context.
 */

import { logger } from '@/services/logger';
import { useEffect, useState } from 'react';

// Create a component-specific logger instance
const demoLogger = logger.createChildLogger('LoggerDemo');

// Custom hook to demonstrate logger usage in hooks
function useLoggerDemo() {
  const hookLogger = logger.createChildLogger('LoggerDemoHook');

  useEffect(() => {
    hookLogger.info('Logger demo hook initialized');
    hookLogger.time('hookLifetime');

    return () => {
      hookLogger.timeEnd('hookLifetime');
      hookLogger.info('Logger demo hook cleanup');
    };
  }, [hookLogger]);

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

const DemoButton = ({ label, onClick, color = '#3498db' }: ButtonProps) => (
  <button
    className="px-4 py-2 m-2 rounded text-white"
    style={{ backgroundColor: color }}
    onClick={onClick}
  >
    {label}
  </button>
);

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

    return () => {
      demoLogger.info('Logger demo component unmounted');
    };
  }, []);

  const handleIncrement = () => {
    demoLogger.time('increment');
    setCount(prev => prev + 1);
    logEvent('increment', { previousCount: count });
    demoLogger.timeEnd('increment');
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
