"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const CHARS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&";

interface UseScrambleTextOptions {
  text: string;
  targets?: string[];
  scrambleDuration?: number;
  pauseDuration?: number;
}

export function useScrambleText({
  text,
  targets = [],
  scrambleDuration = 600,
  pauseDuration = 400,
}: UseScrambleTextOptions) {
  const [display, setDisplay] = useState(text);
  const [currentTarget, setCurrentTarget] = useState(text);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const phaseRef = useRef(0); // 0: original, 1+: target index
  const originalRef = useRef(text);

  useEffect(() => {
    originalRef.current = text;
    setDisplay(text);
  }, [text]);

  const scrambleTo = useCallback(
    (
      from: string,
      target: string,
      duration: number = 800,
      onComplete?: () => void,
    ) => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setCurrentTarget(target);
      const start = performance.now();

      intervalRef.current = setInterval(() => {
        const elapsed = performance.now() - start;
        const progress = Math.min(elapsed / duration, 1);

        let result = "";
        const maxLen = Math.max(from.length, target.length);
        for (let i = 0; i < maxLen; i++) {
          const targetChar = target[i];
          const threshold = (i + 1) / maxLen;

          if (targetChar !== undefined && progress >= threshold) {
            result += targetChar;
          } else if (progress < 1) {
            result += CHARS[Math.floor(Math.random() * CHARS.length)];
          }
        }

        setDisplay(result);

        if (progress >= 1) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          setDisplay(target);
          if (onComplete) onComplete();
        }
      }, 30);
    },
    [],
  );

  const handleMouseEnter = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (intervalRef.current) clearInterval(intervalRef.current);

    const current = display;
    phaseRef.current = 0;

    const runNext = (from: string, index: number) => {
      if (index >= targets.length) return;
      const target = targets[index];
      phaseRef.current = index + 1;
      scrambleTo(from, target, scrambleDuration, () => {
        timeoutRef.current = setTimeout(() => {
          runNext(target, index + 1);
        }, pauseDuration);
      });
    };

    runNext(current, 0);
    // TODO(refactor)[P0]: display in handleMouseEnter deps
    // callback recreated ~33x/sec during scramble, use
    // displayRef instead
  }, [scrambleTo, display, targets, scrambleDuration, pauseDuration]);

  const handleMouseLeave = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (intervalRef.current) clearInterval(intervalRef.current);
    phaseRef.current = 0;
    setCurrentTarget(originalRef.current);
    scrambleTo(display, originalRef.current, scrambleDuration);
    // TODO(refactor)[P0]: display in handleMouseLeave deps
    // same derived-state anti-pattern, read from ref
  }, [scrambleTo, display, scrambleDuration]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return { display, currentTarget, handleMouseEnter, handleMouseLeave };
}
