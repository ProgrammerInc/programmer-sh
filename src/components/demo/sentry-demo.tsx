import { logger } from '@/services/logger/logger';
import { clearUserContext, sendTestError, setUserContext, trackEvent } from '@/utils/sentry-utils';
import * as Sentry from '@sentry/react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

// Create a child logger for the Sentry demo component
const demoLogger = logger.createChildLogger('SentryDemo');

interface DemoButtonProps {
  label: string;
  onClick: () => void;
  color?: string;
}

// Demo button component
function DemoButton({ label, onClick, color = '#3498db' }: DemoButtonProps) {
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

export default function SentryDemo() {
  const [eventId, setEventId] = useState<string>('');
  const [userIdentified, setUserIdentified] = useState(false);

  // Send a test error to Sentry
  const handleSendTestError = () => {
    demoLogger.info('Sending test error to Sentry');
    const newEventId = sendTestError({ source: 'sentry-demo', manual: true });
    setEventId(newEventId);
  };

  // Trigger a real JavaScript error
  const handleCauseRealError = () => {
    demoLogger.info('Causing a real JavaScript error');
    try {
      // @ts-ignore - Intentionally causing an error
      const obj = null;
      obj.nonExistentMethod(); // This will throw a TypeError
    } catch (error) {
      Sentry.captureException(error);
      alert('Error captured and sent to Sentry!');
    }
  };

  // Trigger an unhandled promise rejection
  const handleUnhandledRejection = () => {
    demoLogger.info('Triggering unhandled promise rejection');
    // This promise rejection will be captured by Sentry's global handlers
    new Promise((_, reject) => {
      reject(new Error('This is an unhandled promise rejection'));
    });
  };

  // Show Sentry feedback dialog
  const handleShowFeedbackDialog = () => {
    if (eventId) {
      demoLogger.info('Showing Sentry feedback dialog');
      Sentry.showReportDialog({ eventId });
    } else {
      alert('Please send a test error first to get an event ID');
    }
  };

  // Set user context for better error tracking
  const handleSetUserContext = () => {
    demoLogger.info('Setting user context for Sentry');
    setUserContext({
      id: 'test-user-123',
      email: 'demo-user@example.com',
      username: 'demo_user',
      subscription: 'premium'
    });
    setUserIdentified(true);
    trackEvent('user_identified', { method: 'demo' });
  };

  // Clear user context
  const handleClearUserContext = () => {
    demoLogger.info('Clearing user context for Sentry');
    clearUserContext();
    setUserIdentified(false);
  };

  return (
    <div className="p-4 border rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Sentry Error Tracking Demo</h2>

      <div className="mb-4 p-4 bg-gray-100 rounded-lg">
        <p className="text-black mb-2">
          Sentry provides error tracking, performance monitoring, and session replay capabilities.
          Use the buttons below to test various error scenarios and see how they're captured in your
          Sentry dashboard.
        </p>
        {eventId && (
          <div className="mt-2 p-2 bg-blue-100 rounded">
            <p className="text-black text-sm font-mono break-all">Event ID: {eventId}</p>
          </div>
        )}
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">User Context</h3>
        <div className="flex items-center mb-2">
          <div
            className="w-4 h-4 rounded-full mr-2"
            style={{ backgroundColor: userIdentified ? 'green' : 'red' }}
          ></div>
          <span>User {userIdentified ? 'Identified' : 'Anonymous'}</span>
        </div>
      </div>

      <div className="flex flex-wrap">
        <DemoButton label="Send Test Error" onClick={handleSendTestError} color="#3498db" />
        <DemoButton label="Cause Real Error" onClick={handleCauseRealError} color="#e74c3c" />
        <DemoButton
          label="Unhandled Rejection"
          onClick={handleUnhandledRejection}
          color="#9b59b6"
        />
        <DemoButton label="Feedback Dialog" onClick={handleShowFeedbackDialog} color="#2ecc71" />
        {userIdentified ? (
          <DemoButton label="Clear User Context" onClick={handleClearUserContext} color="#f39c12" />
        ) : (
          <DemoButton label="Set User Context" onClick={handleSetUserContext} color="#f39c12" />
        )}
      </div>

      <div className="mt-6 p-4 bg-blue-900 text-white rounded">
        <h3 className="text-lg font-semibold mb-2">Integration with Other Tools</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium mb-2">Logger Integration</h4>
            <p className="mb-2 text-blue-200">
              Sentry works alongside our custom logger to provide comprehensive error tracking and
              debugging.
            </p>
            <Link
              to="/demo"
              className="inline-block px-3 py-1 bg-blue-700 text-white rounded hover:bg-blue-800 transition-colors"
            >
              Logger Demo
            </Link>
          </div>
          <div>
            <h4 className="font-medium mb-2">Memory Tracker Integration</h4>
            <p className="mb-2 text-blue-200">
              Performance issues like memory leaks can be monitored alongside error tracking.
            </p>
            <Link
              to="/demo/memory"
              className="inline-block px-3 py-1 bg-blue-700 text-white rounded hover:bg-blue-800 transition-colors"
            >
              Memory Tracker Demo
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-4 p-2 bg-gray-100 rounded">
        <p className="text-sm text-gray-600">
          After triggering errors, visit your Sentry dashboard to see detailed reports.
        </p>
      </div>
    </div>
  );
}
