/**
 * Global constants for the portfolio
 */

export const BLUEPRINT_COLOR = "#3F9AA8";

export const FLICKER_CONFIG = {
  SQUARE_SIZE: 6,
  GRID_GAP: 6,
  FLICKER_CHANCE: 3, // Controls how often squares flicker (velocity)
  MAX_OPACITY: 9, // Reduced for subtler effect aligned with border-subtle approach
  COLOR: BLUEPRINT_COLOR,
} as const;
