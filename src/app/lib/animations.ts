import type { Variants } from "framer-motion";

export const EASE: [number, number, number, number] = [0.25, 1, 0.5, 1];

type RevealDirection = "fade" | "up" | "down" | "left" | "right" | "scale";

const revealDuration = 0.2;

const createRevealVariant = (hidden: {
  opacity: number;
  y?: number;
  x?: number;
  scale?: number;
}): Variants => ({
  hidden,
  visible: (delay: number = 0) => ({
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    transition: {
      duration: revealDuration,
      ease: EASE,
      delay,
    },
  }),
});

export const revealVariants: Record<RevealDirection, Variants> = {
  fade: createRevealVariant({ opacity: 0 }),
  up: createRevealVariant({ opacity: 0, y: 8 }),
  down: createRevealVariant({ opacity: 0, y: -8 }),
  left: createRevealVariant({ opacity: 0, x: -8 }),
  right: createRevealVariant({ opacity: 0, x: 8 }),
  scale: createRevealVariant({ opacity: 0, scale: 0.98 }),
};

export const revealFadeVariants: Variants = revealVariants.fade;

export const staggerContainerFast: Variants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.02,
      staggerChildren: 0.02,
    },
  },
};

export const blueprintDecorativeVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.4, ease: EASE, delay: 0.3 },
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.03,
      staggerChildren: 0.035,
    },
  },
};

export const blueprintDrawVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.02,
      staggerChildren: 0.04,
    },
  },
};

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

export const projectGridVariants: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.15,
      ease: EASE,
      staggerChildren: 0.05,
    },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.15, ease: EASE },
  },
};

export const projectCardVariants: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: { duration: 0.25, ease: EASE },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.1, ease: EASE },
  },
};
