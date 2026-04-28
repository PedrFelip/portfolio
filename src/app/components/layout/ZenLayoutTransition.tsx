"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

interface ZenLayoutTransitionProps {
  children: ReactNode;
  element: "nav" | "footer";
}

export function ZenLayoutTransition({ children, element }: ZenLayoutTransitionProps) {
  const pathname = usePathname();
  
  // Detect if we are in a single blog post route
  // Pattern: /[lang]/blog/[slug]
  // We exclude the base blog list pages
  const isBlogPost = pathname.match(/\/(en|pt)\/blog\/.+/);

  const variants = {
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.25, 1, 0.5, 1],
      },
    },
    hidden: {
      y: element === "nav" ? -100 : 100,
      opacity: 0,
      transition: {
        duration: 0.4,
        ease: [0.25, 1, 0.5, 1],
      },
    },
  };

  return (
    <motion.div
      initial="visible"
      animate={isBlogPost ? "hidden" : "visible"}
      variants={variants}
      className={element === "nav" ? "sticky top-0 z-50" : "relative"}
    >
      {children}
    </motion.div>
  );
}
