import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

/**
 * Skeleton loading component
 * Displays a placeholder that animates while content loads
 */
const skeletonVariants = cva('animate-pulse rounded-md bg-tee-stone/50', {
  variants: {
    variant: {
      default: '',
      text: 'h-4',
      heading: 'h-8',
      avatar: 'rounded-full',
      button: 'h-10',
      card: 'h-32',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

// Added explicit variant prop to handle inference issues
export interface SkeletonProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof skeletonVariants> {
  variant?: 'default' | 'text' | 'heading' | 'avatar' | 'button' | 'card' | null | undefined;
}

export function Skeleton({ className, variant, ...props }: SkeletonProps) {
  return (
    <div
      data-testid="skeleton"
      className={cn(skeletonVariants({ variant }), className)}
      {...props}
    />
  )
}

/**
 * Spinner loading component
 * Displays a spinning indicator
 */
// Fixed: Ensure className is part of SpinnerProps
export interface SpinnerProps extends React.SVGAttributes<SVGSVGElement> {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const spinnerSizes = {
  sm: 'h-4 w-4',
  md: 'h-6 w-6',
  lg: 'h-8 w-8',
}

export function Spinner({ size = 'md', className, ...props }: SpinnerProps) {
  return (
    <svg
      className={cn('animate-spin text-tee-accent-primary', spinnerSizes[size], className)}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
      {...props}
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  )
}

/**
 * Loading dots component
 * Displays animated dots for loading states
 */
export function LoadingDots({ className }: { className?: string }) {
  return (
    <span className={cn('inline-flex items-center gap-1', className)}>
      <span className="h-1.5 w-1.5 rounded-full bg-current animate-bounce [animation-delay:-0.3s]" />
      <span className="h-1.5 w-1.5 rounded-full bg-current animate-bounce [animation-delay:-0.15s]" />
      <span className="h-1.5 w-1.5 rounded-full bg-current animate-bounce" />
    </span>
  )
}

/**
 * Full page loading state
 * Centers a spinner with optional message
 */
export interface PageLoadingProps {
  message?: string
}

export function PageLoading({ message = '로딩 중...' }: PageLoadingProps) {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center">
      <Spinner size="lg" />
      <p className="mt-space-4 text-sm text-tee-ink-light">{message}</p>
    </div>
  )
}

/**
 * Inline loading state
 * Shows a spinner next to text
 */
export interface InlineLoadingProps {
  children: React.ReactNode
  loading?: boolean
}

export function InlineLoading({ children, loading }: InlineLoadingProps) {
  if (!loading) return <>{children}</>

  return (
    <span className="inline-flex items-center gap-space-2">
      <Spinner size="sm" />
      {children}
    </span>
  )
}

/**
 * Card skeleton for data cards
 */
export function CardSkeleton() {
  return (
    <div className="rounded-xl border border-tee-stone bg-tee-surface p-space-6">
      <Skeleton className="mb-space-4 h-4 w-1/3" />
      <Skeleton className="mb-space-2 h-8 w-1/2" />
      <Skeleton className="h-4 w-2/3" />
    </div>
  )
}

/**
 * Table row skeleton
 */
export function TableRowSkeleton({ columns = 4 }: { columns?: number }) {
  return (
    <tr className="border-b border-tee-stone">
      {Array.from({ length: columns }).map((_, i) => (
        <td key={i} className="p-space-4">
          <Skeleton className="h-4 w-full" />
        </td>
      ))}
    </tr>
  )
}