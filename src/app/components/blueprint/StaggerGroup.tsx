"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { revealVariants, staggerContainer } from "@/lib/animations";
import { cn } from "@/lib/utils";

interface StaggerGroupProps {
  children: React.ReactNode;
  className?: string;
  once?: boolean;
}

export function StaggerGroup({
  children,
  className,
  once = true,
}: StaggerGroupProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once, margin: "-10% 0px -10% 0px" });

  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      variants={staggerContainer}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {children}
    </motion.div>
  );
}

interface StaggerItemProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  variant?: "fade" | "up" | "down" | "left" | "right" | "scale";
}

export function StaggerItem({
  children,
  className,
  style,
  variant = "left",
}: StaggerItemProps) {
  return (
    <motion.div
      className={cn(className)}
      style={style}
      variants={revealVariants[variant]}
    >
      {children}
    </motion.div>
  );
}
