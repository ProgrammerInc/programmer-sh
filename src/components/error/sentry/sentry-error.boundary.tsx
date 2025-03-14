import { Button } from '@/components/ui/button/button';
import * as Sentry from '@sentry/react';
import { Component, ErrorInfo, PropsWithChildren } from 'react';

export interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  eventId: string | null;
}

export class SentryErrorBoundary extends Component<PropsWithChildren, ErrorBoundaryState> {
  constructor(props: PropsWithChildren) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      eventId: null
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
      eventId: null
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    Sentry.withScope(scope => {
      // Convert ErrorInfo to a plain object that Sentry accepts
      scope.setExtras({
        componentStack: errorInfo.componentStack
      });
      const eventId = Sentry.captureException(error);
      this.setState({ eventId });
    });
  }

  handleReportFeedback = (): void => {
    if (this.state.eventId) {
      Sentry.showReportDialog({ eventId: this.state.eventId });
    }
  };

  handleReload = (): void => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-50 p-4 dark:bg-gray-900">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 max-w-md w-full text-center">
            <div className="mb-6">
              <svg
                className="w-16 h-16 text-red-500 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
              Something went wrong
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              We've encountered an error and our team has been notified. You can try reloading the
              page or report this issue.
            </p>
            {this.state.error && (
              <div className="mb-6 p-4 bg-gray-100 dark:bg-gray-700 rounded-md overflow-auto text-left">
                <p className="text-sm font-mono text-red-600 dark:text-red-400">
                  {this.state.error.toString()}
                </p>
              </div>
            )}
            <div className="flex flex-col space-y-3">
              <Button onClick={this.handleReload} variant="default">
                Reload Page
              </Button>
              <Button onClick={this.handleReportFeedback} variant="outline">
                Report Feedback
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default SentryErrorBoundary;
