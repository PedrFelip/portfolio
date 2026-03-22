/**
 * Global constants for the portfolio
 */

export const FLICKER_CONFIG = {
  SQUARE_SIZE: 4,
  GRID_GAP: 6,
  FLICKER_CHANCE: 0.5, // Controls how often squares flicker (velocity)
  MAX_OPACITY: 0.15, // Reduced for subtler effect aligned with border-subtle approach
  COLOR: "oklch(0.95 0.01 255)", // Uses foreground color - adapts to light/dark mode
} as const;
