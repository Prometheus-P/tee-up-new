/**
 * Color utility functions for theme customization
 */

/**
 * Validate a hex color string
 */
export function isValidHexColor(color: string): boolean {
  return /^#[0-9A-Fa-f]{6}$/.test(color)
}

/**
 * Parse hex color to RGB values
 */
export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  if (!isValidHexColor(hex)) return null

  const result = /^#([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  if (!result) return null

  return {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  }
}

/**
 * Convert RGB to hex
 */
export function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (n: number) => {
    const hex = Math.max(0, Math.min(255, Math.round(n))).toString(16)
    return hex.length === 1 ? '0' + hex : hex
  }
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`
}

/**
 * Darken a hex color by a percentage
 */
export function darkenColor(hex: string, percent: number): string {
  const rgb = hexToRgb(hex)
  if (!rgb) return hex

  const factor = 1 - percent / 100
  return rgbToHex(
    rgb.r * factor,
    rgb.g * factor,
    rgb.b * factor
  )
}

/**
 * Lighten a hex color by a percentage
 */
export function lightenColor(hex: string, percent: number): string {
  const rgb = hexToRgb(hex)
  if (!rgb) return hex

  const factor = percent / 100
  return rgbToHex(
    rgb.r + (255 - rgb.r) * factor,
    rgb.g + (255 - rgb.g) * factor,
    rgb.b + (255 - rgb.b) * factor
  )
}

/**
 * Calculate relative luminance for WCAG contrast checking
 */
function getLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    const sRGB = c / 255
    return sRGB <= 0.03928
      ? sRGB / 12.92
      : Math.pow((sRGB + 0.055) / 1.055, 2.4)
  })
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs
}

/**
 * Calculate contrast ratio between two colors
 * Returns a value between 1 and 21
 */
export function getContrastRatio(
  color1: { r: number; g: number; b: number },
  color2: { r: number; g: number; b: number }
): number {
  const l1 = getLuminance(color1.r, color1.g, color1.b)
  const l2 = getLuminance(color2.r, color2.g, color2.b)
  const lighter = Math.max(l1, l2)
  const darker = Math.min(l1, l2)
  return (lighter + 0.05) / (darker + 0.05)
}

/**
 * Check if a color meets WCAG AA contrast requirements against white
 * Requires 4.5:1 for normal text, 3:1 for large text
 */
export function meetsContrastRequirement(
  hex: string,
  level: 'AA' | 'AAA' = 'AA',
  isLargeText: boolean = false
): boolean {
  const rgb = hexToRgb(hex)
  if (!rgb) return false

  const white = { r: 255, g: 255, b: 255 }
  const ratio = getContrastRatio(rgb, white)

  if (level === 'AAA') {
    return isLargeText ? ratio >= 4.5 : ratio >= 7
  }
  return isLargeText ? ratio >= 3 : ratio >= 4.5
}

/**
 * Generate accent color variants for theme
 */
export function generateAccentVariants(baseColor: string): {
  base: string
  hover: string
  active: string
  disabled: string
} {
  return {
    base: baseColor,
    hover: darkenColor(baseColor, 15),
    active: darkenColor(baseColor, 25),
    disabled: lightenColor(baseColor, 40),
  }
}

/**
 * Suggest a safe accent color if the provided one doesn't meet contrast
 */
export function getSafeAccentColor(hex: string, fallback: string = '#0A362B'): string {
  if (!isValidHexColor(hex)) return fallback
  if (meetsContrastRequirement(hex)) return hex

  // Try darkening the color until it meets requirements
  let adjusted = hex
  for (let i = 5; i <= 50; i += 5) {
    adjusted = darkenColor(hex, i)
    if (meetsContrastRequirement(adjusted)) return adjusted
  }

  return fallback
}
