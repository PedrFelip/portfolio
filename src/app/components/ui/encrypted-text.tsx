"use client";

import { useScrambleText } from "@/hooks/useScrambleText";

interface EncryptedTextProps {
  text: string;
  targets?: string[];
  className?: string;
}

export function EncryptedText({
  text,
  targets = [],
  className = "",
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
      className={`inline-block cursor-pointer font-mono tracking-tight ${className}`}
      role="button"
      tabIndex={0}
      aria-label={text}
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
