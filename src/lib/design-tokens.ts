/**
 * Design Tokens TypeScript Module
 * Programmatic access to design system tokens
 */

export const tokens = {
  colors: {
    background: 'var(--tee-background)',
    surface: 'var(--tee-surface)',
    stone: 'var(--tee-stone)',
    inkStrong: 'var(--tee-ink-strong)',
    inkLight: 'var(--tee-ink-light)',
    inkMuted: 'var(--tee-ink-muted)',
    accentPrimary: 'var(--tee-accent-primary)',
    accentPrimaryHover: 'var(--tee-accent-primary-hover)',
    accentPrimaryActive: 'var(--tee-accent-primary-active)',
    accentPrimaryDisabled: 'var(--tee-accent-primary-disabled)',
    accentSecondary: 'var(--tee-accent-secondary)',
    error: 'var(--tee-error)',
    success: 'var(--tee-success)',
    warning: 'var(--tee-warning)',
    info: 'var(--tee-info)',
    kakao: 'var(--tee-kakao)',
    kakaoText: 'var(--tee-kakao-text)',
  },
  spacing: {
    1: '0.25rem', // 4px
    2: '0.5rem', // 8px
    3: '0.75rem', // 12px
    4: '1rem', // 16px
    5: '1.25rem', // 20px
    6: '1.5rem', // 24px
    7: '1.75rem', // 28px
    8: '2rem', // 32px
    10: '2.5rem', // 40px
    12: '3rem', // 48px
    16: '4rem', // 64px
    20: '5rem', // 80px
    24: '6rem', // 96px
    32: '8rem', // 128px
  },
  typography: {
    h1: { size: '3rem', lineHeight: '1.2' },
    h2: { size: '2.25rem', lineHeight: '1.25' },
    h3: { size: '1.5rem', lineHeight: '1.33' },
    body: { size: '1rem', lineHeight: '1.5' },
    caption: { size: '0.875rem', lineHeight: '1.4' },
  },
  borderRadius: {
    none: '0',
    sm: '0.25rem',
    md: '0.5rem',
    lg: '1rem',
    xl: '1.25rem',
    full: '9999px',
  },
  shadows: {
    card: '0px 2px 8px rgba(0, 0, 0, 0.05)',
  },
  /**
   * Elevation System (3 levels)
   * Use these for consistent depth across the app
   * - elevation-1: Cards, panels (shadow-elevation-1)
   * - elevation-2: Hover states, dropdowns (shadow-elevation-2)
   * - elevation-3: Modals, overlays (shadow-elevation-3)
   */
  elevation: {
    1: '0 2px 8px rgba(26, 26, 26, 0.05)',
    2: '0 4px 12px rgba(26, 26, 26, 0.08)',
    3: '0 8px 24px rgba(26, 26, 26, 0.12)',
  },
  /**
   * StatusBadge Variants Guide
   *
   * Core Semantic (use these for new code):
   * - neutral: Default, inactive states
   * - success: Positive outcomes (approved, confirmed)
   * - warning: Pending, attention needed
   * - error: Negative outcomes (rejected)
   * - info: Informational, active states
   * - accent: Primary emphasis (pro status)
   * - accent-gold: Secondary emphasis (admin, refunded)
   *
   * Specific aliases (backward compatible):
   * pending, disputed, escalated → warning
   * approved, confirmed, accepted → success
   * rejected → error
   * active, completed, customer → info
   * cancelled, member, golfer → neutral
   * pro → accent
   * admin, owner, refunded → accent-gold
   */
  statusBadgeVariants: [
    'neutral',
    'success',
    'warning',
    'error',
    'info',
    'accent',
    'accent-gold',
  ],
} as const

/**
 * Get computed token value at runtime
 * @param token CSS custom property name (e.g., '--tee-accent-primary')
 * @returns The computed value or empty string if not available
 */
export function getTokenValue(token: string): string {
  if (typeof window === 'undefined') return ''
  return getComputedStyle(document.documentElement).getPropertyValue(token).trim()
}

/**
 * Token type exports for TypeScript consumers
 */
export type ColorToken = keyof typeof tokens.colors
export type SpacingToken = keyof typeof tokens.spacing
export type TypographyToken = keyof typeof tokens.typography
export type BorderRadiusToken = keyof typeof tokens.borderRadius
