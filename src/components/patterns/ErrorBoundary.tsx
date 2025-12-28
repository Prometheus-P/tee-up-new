'use client'

import React, { Component, ErrorInfo, ReactNode } from 'react'

interface ErrorBoundaryProps {
  children: ReactNode
  /** Context identifier for error tracking (e.g., 'portfolio-theme', 'dashboard-layout') */
  context?: string
  /** Custom fallback UI to show on error */
  fallback?: ReactNode
  /** Callback when error is caught */
  onError?: (error: Error, errorInfo: ErrorInfo) => void
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

/**
 * Error Boundary component with Sentry integration support
 * Catches JavaScript errors in child component tree
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  // Explicitly define properties for the class component
  state: ErrorBoundaryState = { hasError: false, error: null };

  constructor(props: ErrorBoundaryProps) {
    super(props)
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    const { context, onError } = this.props

    // Log to console in development
    console.error(`[ErrorBoundary${context ? `:${context}` : ''}]`, error, errorInfo)

    // Call custom error handler if provided
    if (onError) {
      onError(error, errorInfo)
    }

    // TODO: Integrate with Sentry when available
    // if (typeof window !== 'undefined' && window.Sentry) {
    //   window.Sentry.captureException(error, {
    //     extra: {
    //       context,
    //       componentStack: errorInfo.componentStack,
    //     },
    //   })
    // }
  }

  render() {
    if (this.state.hasError) {
      // Return custom fallback if provided
      if (this.props.fallback) {
        return this.props.fallback
      }

      // Default fallback UI
      return (
        <div
          role="alert"
          className="flex flex-col items-center justify-center p-space-8 text-center"
        >
          <div className="w-16 h-16 mb-space-4 rounded-full bg-tee-error/10 flex items-center justify-center">
            <svg
              className="w-8 h-8 text-tee-error"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h2 className="text-h3 font-pretendard text-tee-ink-strong mb-space-2">
            문제가 발생했습니다
          </h2>
          <p className="text-body text-tee-ink-light mb-space-4 max-w-md">
            페이지를 새로고침하거나, 문제가 계속되면 고객 지원에 문의해 주세요.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-space-6 py-space-3 bg-tee-accent-primary text-white rounded-md hover:bg-tee-accent-primary-hover transition-colors focus-visible:ring-2 focus-visible:ring-tee-accent-primary focus-visible:ring-offset-2"
          >
            새로고침
          </button>
        </div>
      )
    }

    return this.props.children
  }
}

/**
 * Hook-based error boundary wrapper for functional components
 * Use this when you need to reset the boundary programmatically
 */
export function withErrorBoundary<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  options?: Omit<ErrorBoundaryProps, 'children'>
) {
  const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component'

  const ComponentWithErrorBoundary = (props: P) => (
    <ErrorBoundary {...(options as any)}>
      <WrappedComponent {...props} />
    </ErrorBoundary>
  )

  ComponentWithErrorBoundary.displayName = `withErrorBoundary(${displayName})`

  return ComponentWithErrorBoundary
}
