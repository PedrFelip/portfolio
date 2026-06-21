"use client";

import type * as React from "react";
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

  return (
    // biome-ignore lint/a11y/useSemanticElements: Visual effect inside parent Link
    <span
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "inline-block cursor-pointer font-mono tracking-tight",
        className,
      )}
      role="button"
      tabIndex={0}
      aria-label={text}
      {...props}
    >
      {display.split("").map((char, i) => {
        const isMatch = char === currentTarget[i];
        const isSpecial = char === "@" || char === "." || char === "#";
        return (
          <span
            key={`${i}-${char}`}
            className={isMatch && isSpecial ? "text-accent" : ""}
          >
            {char}
          </span>
        );
      })}
    </span>
  );
}
