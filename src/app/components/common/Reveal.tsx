"use client";

import { memo, type ElementType, type JSX, type ReactNode } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { revealFadeVariants, revealVariants } from "@/lib/animations";

type RevealVariant = "fade-up" | "fade";

interface RevealProps {
  children: ReactNode;
  variant?: RevealVariant;
  delay?: number;
  /** viewport amount 0–1 (default 0.2) */
  amount?: number;
  className?: string;
  /** override variants completamente */
  variants?: Variants;
  /** renderiza como outro elemento (default: div) */
  as?: keyof JSX.IntrinsicElements;
}

const VARIANT_MAP: Record<RevealVariant, Variants> = {
  "fade-up": revealVariants,
  fade: revealFadeVariants,
};

export const Reveal = memo(function Reveal({
  children,
  variant = "fade-up",
  delay = 0,
  amount = 0.2,
  className,
  variants,
  as = "div",
}: RevealProps) {
  const shouldReduce = useReducedMotion();
  const resolvedVariants = variants ?? VARIANT_MAP[variant];

  if (shouldReduce) {
    const Tag = as as ElementType;
    return <Tag className={className}>{children}</Tag>;
  }

  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;

  return (
    <MotionTag
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      variants={resolvedVariants}
      transition={delay > 0 ? { delay } : undefined}
      className={className}
    >
      {children}
    </MotionTag>
  );
});

Reveal.displayName = "Reveal";
