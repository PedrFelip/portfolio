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
 *
 * Design principles (AGENTS.md):
 * - 4px grid: consistent spacing
 * - Monospace for code elements
 * - Syntax highlighting for meaning (types vs strings)
 * - Blink cursor animation for code-editor feel
 *
 * Best practices applied:
 * - Client component (requires useState, useEffect for animation)
 * - Memoized to prevent unnecessary re-renders
 * - useRef for timeout cleanup (prevents memory leaks)
 * - Proper cleanup in useEffect return
 * - TypeScript strict mode compatible
 */
export const TypeAnnotatedGreeting = memo(
  ({ texts }: TypeAnnotatedGreetingProps) => {
    const [displayedText, setDisplayedText] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
      // Safety check: ensure texts array is not empty
      if (texts.length === 0) return;

      const currentText = texts[currentIndex];

      const handleTyping = () => {
        if (!isDeleting) {
          // Typing forward
          if (displayedText.length < currentText.length) {
            setDisplayedText(
              currentText.substring(0, displayedText.length + 1),
            );
            timeoutRef.current = setTimeout(handleTyping, TYPING_SPEED);
          } else {
            // Finished typing, pause before deleting
            timeoutRef.current = setTimeout(() => {
              setIsDeleting(true);
            }, PAUSE_DURATION);
          }
        } else {
          // Deleting backward
          if (displayedText.length > 0) {
            setDisplayedText(
              currentText.substring(0, displayedText.length - 1),
            );
            timeoutRef.current = setTimeout(handleTyping, DELETING_SPEED);
          } else {
            // Finished deleting, move to next text
            setIsDeleting(false);
            setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
          }
        }
      };

      // Clear previous timeout before setting new one
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }

      // Start typing animation
      timeoutRef.current = setTimeout(handleTyping, TYPING_SPEED);

      // Cleanup function to prevent memory leaks
      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
          timeoutRef.current = null;
        }
      };
    }, [displayedText, currentIndex, isDeleting, texts]);

    return (
      <div className="mb-8 sm:mb-12 animate-in-up code-block">
        <div className="inline-flex flex-wrap items-baseline gap-2 text-sm sm:text-base">
          <span className="text-muted-foreground">const</span>
          <span className="syntax-keyword">greeting:</span>
          <span className="syntax-type">string</span>
          <span className="syntax-punctuation">=</span>
          <span className="syntax-string">
            "{displayedText}
            <span className="animate-blink-cursor text-foreground">|</span>"
          </span>
        </div>
      </div>
    );
  },
);

TypeAnnotatedGreeting.displayName = "TypeAnnotatedGreeting";
