"use client";

import { useLayoutEffect } from "react";

/** Reset a newly mounted route before the browser paints it. */
export function ScrollToPageTop() {
  useLayoutEffect(() => {
    if (window.location.hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  return null;
}
