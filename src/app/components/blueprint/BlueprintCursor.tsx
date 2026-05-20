"use client";

import { useEffect, useRef, useState } from "react";

export function BlueprintCursor() {
  const containerRef = useRef<HTMLDivElement>(null);
  // const hLineRef = useRef<HTMLDivElement>(null); // removed for subtle cursor
  // const vLineRef = useRef<HTMLDivElement>(null); // removed for subtle cursor
  const apertureRef = useRef<HTMLDivElement>(null);
  const coordsRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    // Only enable custom cursor if device supports hover and a fine pointer (mouse)
    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!mediaQuery.matches) {
      return;
    }

    const container = containerRef.current;
    const aperture = apertureRef.current;
    const coords = coordsRef.current;

    if (!container || !aperture || !coords) {
      return;
    }

    // Add class to hide standard browser cursor on the page
    document.documentElement.classList.add("custom-cursor-active");

    const onMouseMove = (e: MouseEvent) => {
      // Ensure cursor is visible when moving
      if (!container.style.opacity) {
        setIsVisible(true);
      }

      const x = e.clientX;
      const y = e.clientY;

      // Position the center indicator and coordinates
      aperture.style.transform = `translate3d(${x}px, ${y}px, 0)`;

      // Update drafting coordinates in the DOM directly for raw performance
      coords.innerText = `X:${x.toString().padStart(4, "0")} Y:${y.toString().padStart(4, "0")}`;
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    const onMouseEnter = () => {
      setIsVisible(true);
    };

    const isInteractiveElement = (el: HTMLElement): boolean => {
      const tagName = el.tagName;
      const role = el.getAttribute("role");
      const className = el.className || "";

      // 1. Semantic interactive tags
      if (
        tagName === "A" ||
        tagName === "BUTTON" ||
        tagName === "INPUT" ||
        tagName === "TEXTAREA" ||
        tagName === "SELECT" ||
        tagName === "SUMMARY" ||
        tagName === "LABEL"
      ) {
        return true;
      }

      // 2. ARIA interactive roles
      if (
        role === "button" ||
        role === "link" ||
        role === "menuitem" ||
        role === "tab" ||
        role === "checkbox" ||
        role === "radio" ||
        role === "switch"
      ) {
        return true;
      }

      // 3. Elements styled with hover transitions / classes in Tailwind
      if (
        typeof className === "string" &&
        (className.includes("hover:") ||
          className.includes("group-hover:") ||
          className.includes("peer-hover:"))
      ) {
        return true;
      }

      // 4. Elements with custom cursor styles in CSS
      const cursor = window.getComputedStyle(el).cursor;
      if (cursor === "pointer" || cursor === "text") {
        return true;
      }

      return false;
    };

    // Performance-optimized event delegation for hover states
    const onMouseOver = (e: MouseEvent) => {
      let element = e.target as HTMLElement | null;
      if (!element) return;

      let isInteractive = false;
      let depth = 0;

      // Traverse up to 4 parents to find if any parent is interactive or has custom cursor styles
      while (element && depth < 4) {
        if (isInteractiveElement(element)) {
          isInteractive = true;
          break;
        }
        element = element.parentElement;
        depth++;
      }

      setIsHovering(isInteractive);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);
    window.addEventListener("mouseover", onMouseOver, { passive: true });

    return () => {
      document.documentElement.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      window.removeEventListener("mouseover", onMouseOver);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`pointer-events-none fixed inset-0 z-[9999] transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      aria-hidden="true"
    >
      {/* Horizontal and vertical drafting lines removed for subtle cursor */}

      {/* Aperture HUD and Coordinates */}
      <div
        ref={apertureRef}
        className="absolute -left-2 -top-2 flex items-center justify-center"
        style={{ willChange: "transform" }}
      >
        {/* AutoCAD Aperture Box */}
        <div
          className={`size-4 border border-accent/30 bg-background/5 transition-all duration-250 ease-[cubic-bezier(0.25,1,0.5,1)] ${
            isHovering
              ? "scale-130 rotate-45 border-accent bg-accent/5"
              : "scale-100 rotate-0"
          }`}
        />

        {/* Central Intersection Crosshair Point */}
        <div
          className={`absolute size-1 rounded-full bg-accent transition-transform duration-250 ${
            isHovering ? "scale-150" : "scale-100"
          }`}
        />

        {/* Real-time screen coordinates */}
        <div
          ref={coordsRef}
          className={`absolute left-6 top-3 font-mono text-[9px] tracking-wider tabular-nums transition-colors duration-250 ${
            isHovering ? "text-accent" : "text-accent/40"
          }`}
        />
      </div>
    </div>
  );
}
