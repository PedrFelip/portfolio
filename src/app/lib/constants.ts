/**
 * Global constants for the portfolio
 */

export const FLICKER_CONFIG = {
  SQUARE_SIZE: 4,
  GRID_GAP: 6,
  FLICKER_CHANCE: 1, // Controls how often squares flicker (velocity)
  MAX_OPACITY: 1, // Reduced for subtler effect aligned with border-subtle approach
  COLOR: "#5E92B8", // Blueprint cyan tint (oklch 0.62 0.10 220 approx)
} as const;
