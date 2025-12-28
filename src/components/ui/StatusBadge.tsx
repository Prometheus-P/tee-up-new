import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

/**
 * StatusBadge Design System
 *
 * 5 Core Semantic Categories:
 * - neutral: Default, inactive states
 * - success: Positive outcomes (approved, confirmed, completed)
 * - warning: Pending, attention needed (pending, disputed, escalated)
 * - error: Negative outcomes (rejected, cancelled)
 * - info: Informational, active states
 * - accent: Special emphasis (pro, admin, refunded)
 */
const statusBadgeVariants = cva(
  'inline-flex items-center rounded-full px-3 py-1 text-xs font-medium transition-colors',
  {
    variants: {
      variant: {
        // ===== Core Semantic Variants (5 categories) =====
        neutral: 'bg-tee-surface text-tee-ink-light border border-tee-stone',
        success: 'bg-tee-success/10 text-tee-success',
        warning: 'bg-tee-warning/10 text-tee-warning',
        error: 'bg-tee-error/10 text-tee-error',
        info: 'bg-tee-info/10 text-tee-info',
        accent: 'bg-tee-accent-primary/10 text-tee-accent-primary',
        'accent-gold': 'bg-tee-accent-secondary/10 text-tee-accent-secondary',

        // ===== Backward Compatibility Aliases =====
        // Maps to 'neutral'
        default: 'bg-tee-surface text-tee-ink-light border border-tee-stone',
        golfer: 'bg-tee-surface text-tee-ink-light border border-tee-stone',
        member: 'bg-tee-stone text-tee-ink-light',
        cancelled: 'bg-tee-stone text-tee-ink-light',
        revoked: 'bg-tee-stone text-tee-ink-muted',

        // Maps to 'success'
        approved: 'bg-tee-success/10 text-tee-success',
        confirmed: 'bg-tee-success/10 text-tee-success',
        accepted: 'bg-tee-success/10 text-tee-success',

        // Maps to 'info' (completed is info, not success, for visual distinction)
        completed: 'bg-tee-info/10 text-tee-info',

        // Maps to 'warning'
        pending: 'bg-tee-warning/10 text-tee-warning',
        disputed: 'bg-tee-warning/10 text-tee-warning',
        escalated: 'bg-tee-warning/10 text-tee-warning',
        expired: 'bg-tee-warning/10 text-tee-warning',

        // Maps to 'error'
        rejected: 'bg-tee-error/10 text-tee-error',

        // Maps to 'info'
        active: 'bg-tee-info/10 text-tee-info',
        customer: 'bg-tee-info/10 text-tee-info',

        // Maps to 'accent'
        pro: 'bg-tee-accent-primary/10 text-tee-accent-primary',

        // Maps to 'accent-gold'
        refunded: 'bg-tee-accent-secondary/10 text-tee-accent-secondary',
        admin: 'bg-tee-accent-secondary/10 text-tee-accent-secondary',
        owner: 'bg-tee-accent-secondary/10 text-tee-accent-secondary',
      },
      size: {
        sm: 'px-2 py-0.5 text-xs',
        default: 'px-3 py-1 text-xs',
        lg: 'px-4 py-1.5 text-sm',
      },
    },
    defaultVariants: {
      variant: 'neutral',
      size: 'default',
    },
  }
);

// Added explicit variant and size props to handle inference issues
export interface StatusBadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof statusBadgeVariants> {
  dot?: boolean;
}

const StatusBadge = React.forwardRef<HTMLSpanElement, StatusBadgeProps>(
  ({ className, variant, size, dot, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        data-testid="status-badge"
        className={cn(statusBadgeVariants({ variant, size, className }))}
        {...props}
      >
        {dot && (
          <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-current" />
        )}
        {children}
      </span>
    );
  }
);
StatusBadge.displayName = 'StatusBadge';

export { StatusBadge, statusBadgeVariants };