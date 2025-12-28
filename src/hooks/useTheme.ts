'use client'

import { useTheme as useNextTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import type { Theme, ThemePreference } from '@/lib/theme'

interface UseThemeReturn {
  /** Current resolved theme ('light' or 'dark') */
  theme: Theme | undefined
  /** User's theme preference ('light', 'dark', or 'system') */
  themePreference: ThemePreference | undefined
  /** Actual resolved theme after system preference is applied */
  resolvedTheme: Theme | undefined
  /** System preference ('light' or 'dark') */
  systemTheme: Theme | undefined
  /** Set the theme preference */
  setTheme: (theme: ThemePreference) => void
  /** Toggle between light and dark mode */
  toggleTheme: () => void
  /** Whether dark mode is active */
  isDark: boolean
  /** Whether light mode is active */
  isLight: boolean
  /** Whether system theme is being used */
  isSystem: boolean
  /** Whether the component has mounted (for hydration safety) */
  mounted: boolean
}

/**
 * Type-safe wrapper for next-themes useTheme hook
 * Provides additional utilities for theme management
 */
export function useTheme(): UseThemeReturn {
  const [mounted, setMounted] = useState(false)
  const { theme, resolvedTheme, setTheme, systemTheme } = useNextTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  const currentTheme = (resolvedTheme as Theme) || 'light'
  const currentPreference = (theme as ThemePreference) || 'system'
  const currentSystemTheme = (systemTheme as Theme) || 'light'

  const toggleTheme = () => {
    setTheme(currentTheme === 'dark' ? 'light' : 'dark')
  }

  return {
    theme: mounted ? currentTheme : undefined,
    themePreference: mounted ? currentPreference : undefined,
    resolvedTheme: mounted ? currentTheme : undefined,
    systemTheme: mounted ? currentSystemTheme : undefined,
    setTheme: (newTheme: ThemePreference) => setTheme(newTheme),
    toggleTheme,
    isDark: mounted && currentTheme === 'dark',
    isLight: mounted && currentTheme === 'light',
    isSystem: currentPreference === 'system',
    mounted,
  }
}

export default useTheme
