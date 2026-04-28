"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

interface ZenLayoutTransitionProps {
  children: ReactNode;
  element: "nav" | "footer";
}

const EASE_CURVE: [number, number, number, number] = [0.25, 1, 0.5, 1];

export function ZenLayoutTransition({
  children,
  element,
}: ZenLayoutTransitionProps) {
  const pathname = usePathname();

  // Detect if we are in a single blog post route
  // Pattern: /[lang]/blog/[slug]
  // We exclude the base blog list pages
  const isBlogPost = pathname.match(/\/(en|pt)\/blog\/.+/);
  const initialVariant = isBlogPost ? "hidden" : "visible";

  const variants = {
    visible: {
      y: 0,
      opacity: 1,
      height: "auto",
      display: "block",
      transition: {
        duration: 0.5,
        ease: EASE_CURVE,
      },
    },
    hidden: {
      y: element === "nav" ? -100 : 100,
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.4,
        ease: EASE_CURVE,
      },
      transitionEnd: {
        display: "none",
      },
    },
  };

  return (
    <motion.div
      initial={initialVariant}
      animate={isBlogPost ? "hidden" : "visible"}
      variants={variants}
      className={element === "footer" ? "relative" : undefined}
      style={{ overflow: "hidden" }}
    >
      {children}
    </motion.div>
  );
}
