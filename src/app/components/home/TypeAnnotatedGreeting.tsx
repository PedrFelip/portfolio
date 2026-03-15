"use client";

import { memo, useCallback, useEffect, useRef, useState } from "react";

interface TypeAnnotatedGreetingProps {
  texts: string[];
}

// Animation configuration - easy to modify
const TYPING_SPEED = 80; // ms per character
const DELETING_SPEED = 50; // ms per character (faster deletion)
const PAUSE_DURATION = 2500; // ms to pause before deleting
const ANIMATION_START_DELAY = 1000; // ms to wait before starting typing animation (FCP optimization)

/**
 * TypeAnnotatedGreeting component with typing/deleting animation
 *
 * Displays greeting in TypeScript-style constant declaration format:
 * const greeting: string = "Hi, I'm [Name]"
 *
 * Features:
 * - Typing animation that cycles through multiple texts
 * - Automatic deletion and re-typing
 * - Infinite loop through provided texts array
 * - Modular: easy to customize texts, speeds, and pause duration
 * - CLS optimization: reserved space, initial text displayed
 * - FCP optimization: requestAnimationFrame for smooth animation
 *
 * Design principles (AGENTS.md):
 * - 4px grid: consistent spacing
 * - Monospace for code elements
 * - Syntax highlighting for meaning (types vs strings)
 * - Blink cursor animation for code-editor feel
 * - CLS prevention: reserved space for dynamic content
 *
 * Best practices applied:
 * - Client component (requires useState, useEffect for animation)
 * - Memoized to prevent unnecessary re-renders
 * - useRef for timeout cleanup (prevents memory leaks)
 * - Proper cleanup in useEffect return
 * - TypeScript strict mode compatible
 * - CLS fix: initial state shows first text, reserved height
 * - FCP fix: requestAnimationFrame for smooth, efficient animation
 */
export const TypeAnnotatedGreeting = memo(
  ({ texts }: TypeAnnotatedGreetingProps) => {
    const [displayedText, setDisplayedText] = useState("");
    const rafIdRef = useRef<number | null>(null);
    const animationRef = useRef<{
      currentTextIndex: number;
      isDeleting: boolean;
      isInitialized: boolean;
    }>({
      currentTextIndex: 0,
      isDeleting: false,
      isInitialized: false,
    });
    const accumulatorRef = useRef(0);
    const displayedTextRef = useRef("");

    useEffect(() => {
      displayedTextRef.current = displayedText;
    }, [displayedText]);

    const maxLength = texts.reduce(
      (max, text) => Math.max(max, text.length),
      0,
    );

    const startAnimation = useCallback(() => {
      let lastTimestamp = 0;

      const animate = (timestamp: number) => {
        if (!lastTimestamp) {
          lastTimestamp = timestamp;
          rafIdRef.current = requestAnimationFrame(animate);
          return;
        }

        const delta = timestamp - lastTimestamp;
        lastTimestamp = timestamp;
        accumulatorRef.current += delta;

        const { currentTextIndex, isDeleting } = animationRef.current;
        const currentText = texts[currentTextIndex];
        const speed = isDeleting ? DELETING_SPEED : TYPING_SPEED;

        if (accumulatorRef.current >= speed) {
          accumulatorRef.current = 0;

          if (isDeleting) {
            if (displayedTextRef.current.length > 0) {
              const nextText = currentText.substring(
                0,
                displayedTextRef.current.length - 1,
              );
              setDisplayedText(nextText);
              displayedTextRef.current = nextText;
            } else {
              animationRef.current.isDeleting = false;
              animationRef.current.currentTextIndex =
                (currentTextIndex + 1) % texts.length;
            }
          } else {
            if (displayedTextRef.current.length < currentText.length) {
              const nextText = currentText.substring(
                0,
                displayedTextRef.current.length + 1,
              );
              setDisplayedText(nextText);
              displayedTextRef.current = nextText;
            } else {
              accumulatorRef.current = -PAUSE_DURATION;
              animationRef.current.isDeleting = true;
            }
          }
        }

        rafIdRef.current = requestAnimationFrame(animate);
      };

      rafIdRef.current = requestAnimationFrame(animate);
    }, [texts]);

    useEffect(() => {
      if (!animationRef.current.isInitialized && texts.length > 0) {
        const delayId = setTimeout(() => {
          animationRef.current.isInitialized = true;
          startAnimation();
        }, ANIMATION_START_DELAY);

        return () => {
          clearTimeout(delayId);
          if (rafIdRef.current !== null) {
            cancelAnimationFrame(rafIdRef.current);
          }
        };
      }
      return () => {
        if (rafIdRef.current !== null) {
          cancelAnimationFrame(rafIdRef.current);
        }
      };
    }, [startAnimation, texts.length]);

    return (
      <div className="mb-6 sm:mb-8 md:mb-12 code-block min-h-[28px]">
        <div className="inline-flex flex-wrap items-baseline gap-2 text-sm sm:text-base">
          <span className="text-muted-foreground">const</span>
          <span className="syntax-keyword">greeting:</span>
          <span className="syntax-type">string</span>
          <span className="syntax-punctuation">=</span>
          <span
            className="syntax-string font-mono break-words"
            style={{ minWidth: `${Math.min(maxLength + 2, 20)}ch` }}
          >
            "{displayedText}
            {animationRef.current.isInitialized && (
              <span className="animate-blink-cursor text-foreground">|</span>
            )}
            "
          </span>
        </div>
      </div>
    );
  },
);

TypeAnnotatedGreeting.displayName = "TypeAnnotatedGreeting";
