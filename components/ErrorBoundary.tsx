/**
 * Enhanced Error Boundary with Full Error Handling
 * Catches and displays component errors gracefully
 */

import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode | ((error: Error, retry: () => void) => React.ReactNode);
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
  resetKeys?: Array<string | number>;
  level?: 'page' | 'component' | 'section';
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({
      error,
      errorInfo,
    });

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error Boundary caught an error:', error, errorInfo);
    }

    // Call external error handler
    this.props.onError?.(error, errorInfo);
  }

  componentDidUpdate(prevProps: ErrorBoundaryProps) {
    const { resetKeys } = this.props;
    const { hasError } = this.state;

    // Reset error boundary when reset keys change
    const hasResetKeyChanged = resetKeys?.some(
      (key, index) => key !== prevProps.resetKeys?.[index]
    );

    if (hasResetKeyChanged && hasError) {
      this.setState({
        hasError: false,
        error: null,
        errorInfo: null,
      });
    }
  }

  retry = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render() {
    const { hasError, error, errorInfo } = this.state;
    const { children, fallback, level = 'component' } = this.props;

    if (hasError) {
      // Use custom fallback if provided
      if (typeof fallback === 'function') {
        return fallback(error || new Error('Unknown error'), this.retry);
      }

      if (fallback) {
        return fallback;
      }

      // Default error UI
      return (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`
            flex items-center justify-center p-4 rounded-lg border border-red-500/30 bg-red-500/5
            ${level === 'page' ? 'min-h-screen' : level === 'section' ? 'min-h-[400px]' : 'min-h-[200px]'}
          `}
        >
          <div className="max-w-lg text-center">
            <div className="flex justify-center mb-4">
              <AlertTriangle className="w-12 h-12 text-red-500" />
            </div>

            <h2 className="text-2xl font-bold mb-2 text-red-600">Something went wrong</h2>

            <p className="text-gray-600 mb-4">
              An unexpected error occurred. Our team has been notified.
            </p>

            {process.env.NODE_ENV === 'development' && error && (
              <details className="mb-4 p-3 bg-gray-100 rounded text-left text-xs">
                <summary className="cursor-pointer font-mono font-bold mb-2">Error Details</summary>
                <div className="font-mono text-red-600 whitespace-pre-wrap break-words">
                  <p className="mb-2"><strong>Error:</strong> {error.toString()}</p>
                  {errorInfo && (
                    <p className="text-gray-700">
                      <strong>Component Stack:</strong>
                      <br />
                      {errorInfo.componentStack}
                    </p>
                  )}
                </div>
              </details>
            )}

            <button
              onClick={this.retry}
              className="inline-flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Try Again
            </button>
          </div>
        </motion.div>
      );
    }

    return children;
  }
}

// Functional component wrapper for easier usage
export const withErrorBoundary = <P extends object>(
  Component: React.ComponentType<P>,
  errorBoundaryProps?: Omit<ErrorBoundaryProps, 'children'>
) => {
  const WrappedComponent = (props: P) => (
    <ErrorBoundary {...errorBoundaryProps}>
      <Component {...props} />
    </ErrorBoundary>
  );

  WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name})`;

  return WrappedComponent;
};

export default ErrorBoundary;