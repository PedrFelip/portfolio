import type { Variants } from "framer-motion";

export const EASE: [number, number, number, number] = [0.25, 1, 0.5, 1];

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

export const DURATIONS = {
  /** Micro-interactions: 150ms */
  micro: 0.15,
  /** Standard reveal: 220ms */
  reveal: 0.22,
  /** Slow reveal for decoratives: 280ms */
  revealSlow: 0.28,
} as const;

/** Fade + translateY(8px → 0) — usado em Reveal */
export const revealVariants: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATIONS.reveal, ease: EASE },
  },
};

/** Fade simples — decorativos leves */
export const revealFadeVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: DURATIONS.revealSlow, ease: EASE },
  },
};

/** Container que aplica stagger nos filhos — usado em StaggerGroup */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0,
    },
  },
};

/** Container com stagger leve para grids densos */
export const staggerContainerFast: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0,
    },
  },
};

/**
 * Sequência blueprint: container orquestra conteúdo → decorativos.
 * Stagger 0.06s nos filhos diretos.
 */
export const blueprintDrawVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0,
    },
  },
};

/**
 * Decorativo blueprint: fade lento com delay —
 * revela APÓS o conteúdo principal.
 */
export const blueprintDecorativeVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.4, ease: EASE, delay: 0.3 },
  },
};
