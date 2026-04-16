"use client";

import { motion, useReducedMotion } from "framer-motion";
import { memo, type ReactNode } from "react";
import {
  revealVariants,
  staggerContainer,
  staggerContainerFast,
} from "@/lib/animations";

type StaggerSpeed = "normal" | "fast";

interface StaggerGroupProps {
  children: ReactNode;
  speed?: StaggerSpeed;
  className?: string;
  /** delay antes do primeiro filho (segundos) */
  delayChildren?: number;
  /** viewport amount para triggar (default 0.15) */
  amount?: number;
}

const CONTAINER_MAP: Record<StaggerSpeed, typeof staggerContainer> = {
  normal: staggerContainer,
  fast: staggerContainerFast,
};

export const StaggerGroup = memo(function StaggerGroup({
  children,
  speed = "normal",
  className,
  delayChildren = 0,
  amount = 0.15,
}: StaggerGroupProps) {
  const shouldReduce = useReducedMotion();

  if (shouldReduce) {
    return <div className={className}>{children}</div>;
  }

  const containerVariants =
    delayChildren > 0
      ? {
          ...CONTAINER_MAP[speed],
          visible: {
            ...CONTAINER_MAP[speed].visible,
            transition: {
              ...(
                CONTAINER_MAP[speed].visible as {
                  transition?: object;
                }
              ).transition,
              delayChildren,
            },
          },
        }
      : CONTAINER_MAP[speed];

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      variants={containerVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
});

StaggerGroup.displayName = "StaggerGroup";

/**
 * StaggerItem — filho de StaggerGroup
 * Recebe as variants via context do motion; não precisa de props de animação.
 */
interface StaggerItemProps {
  children: ReactNode;
  className?: string;
}

export const StaggerItem = memo(function StaggerItem({
  children,
  className,
}: StaggerItemProps) {
  const shouldReduce = useReducedMotion();

  if (shouldReduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div variants={revealVariants.up} className={className}>
      {children}
    </motion.div>
  );
});

StaggerItem.displayName = "StaggerItem";
