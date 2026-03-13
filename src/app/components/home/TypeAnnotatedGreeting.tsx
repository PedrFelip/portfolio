"use client";

import { memo, useEffect, useRef, useState } from "react";

interface TypeAnnotatedGreetingProps {
  texts: string[];
}

// Animation configuration - easy to modify
const TYPING_SPEED = 80; // ms per character
const DELETING_SPEED = 50; // ms per character (faster deletion)
const PAUSE_DURATION = 2500; // ms to pause before deleting

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
 */
export const TypeAnnotatedGreeting = memo(
  ({ texts }: TypeAnnotatedGreetingProps) => {
    const [displayedText, setDisplayedText] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Calculate max length for space reservation
    const maxLength = texts.reduce(
      (max, text) => Math.max(max, text.length),
      0,
    );
    const initialText = texts[0] || "";

    useEffect(() => {
      // Safety check: ensure texts array is not empty
      if (texts.length === 0) return;

      // Start with first text fully displayed (CLS fix)
      if (!isMounted) {
        setDisplayedText(initialText);
        setIsMounted(true);
        // Start deletion after initial pause
        timeoutRef.current = setTimeout(() => {
          setIsDeleting(true);
        }, PAUSE_DURATION);
        return;
      }

      const currentText = texts[currentIndex];

      const handleTyping = () => {
        if (!isDeleting) {
          if (displayedText.length < currentText.length) {
            setDisplayedText(
              currentText.substring(0, displayedText.length + 1),
            );
            timeoutRef.current = setTimeout(handleTyping, TYPING_SPEED);
          } else {
            timeoutRef.current = setTimeout(() => {
              setIsDeleting(true);
            }, PAUSE_DURATION);
          }
        } else {
          if (displayedText.length > 0) {
            setDisplayedText(
              currentText.substring(0, displayedText.length - 1),
            );
            timeoutRef.current = setTimeout(handleTyping, DELETING_SPEED);
          } else {
            setIsDeleting(false);
            setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
          }
        }
      };

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }

      timeoutRef.current = setTimeout(handleTyping, TYPING_SPEED);

      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
          timeoutRef.current = null;
        }
      };
    }, [
      displayedText,
      currentIndex,
      isDeleting,
      texts,
      isMounted,
      initialText,
    ]);

    return (
      <div className="mb-8 sm:mb-12 code-block min-h-[28px]">
        <div className="inline-flex flex-wrap items-baseline gap-2 text-sm sm:text-base">
          <span className="text-muted-foreground">const</span>
          <span className="syntax-keyword">greeting:</span>
          <span className="syntax-type">string</span>
          <span className="syntax-punctuation">=</span>
          <span
            className="syntax-string font-mono"
            style={{ minWidth: `${maxLength + 2}ch` }}
          >
            "{displayedText}
            <span className="animate-blink-cursor text-foreground">|</span>"
          </span>
        </div>
      </div>
    );
  },
);

TypeAnnotatedGreeting.displayName = "TypeAnnotatedGreeting";
