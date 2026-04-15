import type { Variants } from "framer-motion";

const EASE: [number, number, number, number] = [0.25, 1, 0.5, 1];

export const FLICKER_TIMING = {
  /** Delay (ms) before applying the state change and starting the exit transition */
  APPLY_DELAY: 650,
  /** Delay (ms) before resetting the overlay phase back to idle */
  IDLE_DELAY: 950,
} as const;

export const flickerContentVariants: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: { duration: 0.25, ease: EASE },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.25, ease: EASE },
  },
};

export const flickerOverlayVariants: Variants = {
  idle: {
    opacity: 0,
  },
  visible: {
    opacity: 0.85,
    transition: { duration: 0.15, ease: EASE },
  },
  exiting: {
    opacity: 0,
    transition: { duration: 0.25, ease: EASE },
  },
};
