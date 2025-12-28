import * as React from 'react'
import { cn } from '@/lib/utils'

export interface FormFieldProps {
  /** Label text for the field */
  label: string
  /** HTML id for the input - used for label association */
  htmlFor: string
  /** Children (usually an input component) */
  children: React.ReactNode
  /** Error message to display */
  error?: string
  /** Help text to display below the input */
  helpText?: string
  /** Whether the field is required */
  required?: boolean
  /** Additional className for the wrapper */
  className?: string
}

/**
 * FormField pattern component
 * Wraps inputs with consistent label, error, and help text styling
 */
export function FormField({
  label,
  htmlFor,
  children,
  error,
  helpText,
  required,
  className,
}: FormFieldProps) {
  const errorId = `${htmlFor}-error`
  const helpId = `${htmlFor}-help`

  return (
    <div className={cn('space-y-space-2', className)}>
      <label
        htmlFor={htmlFor}
        className="block text-sm font-medium text-tee-ink-strong"
      >
        {label}
        {required && (
          <span className="ml-1 text-tee-error" aria-hidden="true">
            *
          </span>
        )}
      </label>

      {/* Clone children to inject aria attributes */}
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<Record<string, unknown>>, {
            id: htmlFor,
            'aria-invalid': error ? 'true' : undefined,
            'aria-describedby': error
              ? errorId
              : helpText
                ? helpId
                : undefined,
            'aria-required': required,
          })
        }
        return child
      })}

      {error && (
        <p
          id={errorId}
          data-testid="form-error"
          className="text-sm text-tee-error"
          role="alert"
        >
          {error}
        </p>
      )}

      {helpText && !error && (
        <p id={helpId} className="text-sm text-tee-ink-muted">
          {helpText}
        </p>
      )}
    </div>
  )
}
