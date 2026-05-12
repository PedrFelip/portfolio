"use client";

import { Slot } from "@radix-ui/react-slot";
import { m, useInView } from "framer-motion";
import { useRef } from "react";
import { revealVariants } from "@/lib/animations";
import { cn } from "@/lib/utils";

type RevealVariant = "fade" | "up" | "down" | "left" | "right" | "scale";
type RevealElement = "div" | "span" | "section" | "article" | "li";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  variant?: RevealVariant;
  as?: RevealElement;
  asChild?: boolean;
  once?: boolean;
}

export function Reveal({
  children,
  className,
  delay = 0,
  variant = "up",
  as = "div",
  asChild = false,
  once = true,
}: RevealProps) {
  const ref = useRef<Element | null>(null);
  const isInView = useInView(ref, { once, margin: "-10% 0px -10% 0px" });
  const setRef = (node: Element | null) => {
    ref.current = node;
  };
  const Comp = asChild ? Slot : "div";

  if (as === "span") {
    return (
      <m.span
        ref={setRef}
        className={cn(className)}
        variants={revealVariants[variant]}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        custom={delay}
      >
        <Comp>{children}</Comp>
      </m.span>
    );
  }

  if (as === "section") {
    return (
      <m.section
        ref={setRef}
        className={cn(className)}
        variants={revealVariants[variant]}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        custom={delay}
      >
        <Comp>{children}</Comp>
      </m.section>
    );
  }

  if (as === "article") {
    return (
      <m.article
        ref={setRef}
        className={cn(className)}
        variants={revealVariants[variant]}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        custom={delay}
      >
        <Comp>{children}</Comp>
      </m.article>
    );
  }

  if (as === "li") {
    return (
      <m.li
        ref={setRef}
        className={cn(className)}
        variants={revealVariants[variant]}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        custom={delay}
      >
        <Comp>{children}</Comp>
      </m.li>
    );
  }

  return (
    <m.div
      ref={setRef}
      className={cn(className)}
      variants={revealVariants[variant]}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      custom={delay}
    >
      <Comp>{children}</Comp>
    </m.div>
  );
}
