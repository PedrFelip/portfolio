"use client";

import type * as React from "react";
import { useEffect, useRef } from "react";
import { useScrambleText } from "@/hooks/useScrambleText";
import { cn } from "@/lib/utils";

interface EncryptedTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  text: string;
  targets?: string[];
}

export function EncryptedText({
  text,
  targets = [],
  className,
  ...props
}: EncryptedTextProps) {
  const { display, currentTarget, handleMouseEnter, handleMouseLeave } =
    useScrambleText({
      text,
      targets,
    });

  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.addEventListener("mouseenter", handleMouseEnter);
    el.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      el.removeEventListener("mouseenter", handleMouseEnter);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [handleMouseEnter, handleMouseLeave]);

  const segments = display.split("").map((char, position) => ({
    char,
    position,
    key: `pos-${position}`,
  }));

  return (
    <span
      ref={ref}
      className={cn(
        "inline-block cursor-pointer font-mono tracking-tight",
        className,
      )}
      {...props}
    >
      {segments.map(({ char, position, key }) => {
        const isMatch = char === currentTarget[position];
        const isSpecial = char === "@" || char === "." || char === "#";
        return (
          <span key={key} className={isMatch && isSpecial ? "text-accent" : ""}>
            {char}
          </span>
        );
      })}
    </span>
  );
}
