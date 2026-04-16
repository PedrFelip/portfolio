"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Children, memo, type ReactNode } from "react";
import {
  blueprintDecorativeVariants,
  blueprintDrawVariants,
  revealVariants,
} from "@/lib/animations";

interface BlueprintRevealProps {
  /** Main content — reveals first via stagger */
  children: ReactNode;
  /** Decorative elements (DotPattern, CornerBrackets, etc) — reveal after */
  decoratives?: ReactNode;
  className?: string;
  /** viewport amount (default 0.15) */
  amount?: number;
  /** Delay before starting the full sequence */
  delay?: number;
}

/**
 * BlueprintReveal
 *
 * Orchestrates a "blueprint draw" reveal sequence:
 * - Main content: 0.06s stagger, 8px fade-up
 * - Decoratives (dot pattern, corner brackets): fade after 0.3s delay
 *
 * Usage:
 * ```tsx
 * <BlueprintReveal
 *   decoratives={<><DotPattern /><CornerBrackets /></>}
 * >
 *   <H1>Título</H1>
 *   <p>Descrição</p>
 * </BlueprintReveal>
 * ```
 */
export const BlueprintReveal = memo(function BlueprintReveal({
  children,
  decoratives,
  className,
  amount = 0.15,
  delay = 0,
}: BlueprintRevealProps) {
  const shouldReduce = useReducedMotion();

  if (shouldReduce) {
    return (
      <div className={className}>
        {decoratives}
        {children}
      </div>
    );
  }

  const containerVariants =
    delay > 0
      ? {
          ...blueprintDrawVariants,
          visible: {
            ...blueprintDrawVariants.visible,
            transition: {
              ...(
                blueprintDrawVariants.visible as {
                  transition?: object;
                }
              ).transition,
              delayChildren: delay,
            },
          },
        }
      : blueprintDrawVariants;

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      variants={containerVariants}
      className={className}
    >
      {/* Main content: each child receives reveal variants through container stagger */}
      {Children.map(children, (child) => (
        <motion.div variants={revealVariants.up}>{child}</motion.div>
      ))}

      {/* Decoratives: reveal after content (delay via blueprintDecorativeVariants) */}
      {decoratives && (
        <motion.div variants={blueprintDecorativeVariants} aria-hidden="true">
          {decoratives}
        </motion.div>
      )}
    </motion.div>
  );
});

BlueprintReveal.displayName = "BlueprintReveal";
