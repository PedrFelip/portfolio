"use client";

import { useLayoutEffect } from "react";

const SCROLL_FLAG_KEY = "blog:scroll-to-top";

export function ScrollToTop() {
  useLayoutEffect(() => {
    const shouldScrollToTop = sessionStorage.getItem(SCROLL_FLAG_KEY) === "1";

    if (!shouldScrollToTop) {
      return;
    }

    sessionStorage.removeItem(SCROLL_FLAG_KEY);
    // TODO(refactor)[P1]: smooth scroll ignores prefers-reduced-motion
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  return null;
}
