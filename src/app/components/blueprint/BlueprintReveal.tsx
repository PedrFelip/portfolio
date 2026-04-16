"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { blueprintDrawVariants, revealVariants } from "@/lib/animations";
import { cn } from "@/lib/utils";

interface BlueprintRevealProps {
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
  decorClassName?: string;
  dotPattern?: React.ReactNode;
  cornerBrackets?: React.ReactNode;
  flickeringGrid?: React.ReactNode;
  once?: boolean;
}

const decorativeCascade = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.11,
      staggerChildren: 0.06,
    },
  },
};

export function BlueprintReveal({
  children,
  className,
  contentClassName,
  decorClassName,
  dotPattern,
  cornerBrackets,
  flickeringGrid,
  once = true,
}: BlueprintRevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once, margin: "-10% 0px -10% 0px" });

  return (
    <motion.div
      ref={ref}
      className={cn("relative", className)}
      variants={blueprintDrawVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <div
        className={cn(
          "relative z-10 flex flex-col items-center w-full",
          contentClassName,
        )}
      >
        {children}
      </div>

      {(dotPattern || cornerBrackets || flickeringGrid) && (
        <motion.div
          className={cn("absolute inset-0 pointer-events-none", decorClassName)}
          variants={decorativeCascade}
        >
          {dotPattern ? (
            <motion.div variants={revealVariants.fade}>{dotPattern}</motion.div>
          ) : null}
          {cornerBrackets ? (
            <motion.div variants={revealVariants.fade}>
              {cornerBrackets}
            </motion.div>
          ) : null}
          {flickeringGrid ? (
            <motion.div variants={revealVariants.fade}>
              {flickeringGrid}
            </motion.div>
          ) : null}
        </motion.div>
      )}
    </motion.div>
  );
}
