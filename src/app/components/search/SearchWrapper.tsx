"use client";

import dynamic from "next/dynamic";
import { useEffect } from "react";
import { useSearchStore } from "@/lib/search-store";

const SearchCommand = dynamic(
  () => import("./SearchCommand").then((mod) => mod.SearchCommand),
  {
    ssr: false,
  },
);

export function SearchWrapper() {
  const isOpen = useSearchStore((s) => s.isOpen);
  const toggle = useSearchStore((s) => s.toggle);

  useEffect(() => {
    const prefetch = () => {
      void import("./SearchCommand").catch((err) => {
        console.warn("Failed to prefetch SearchCommand:", err);
      });
      void useSearchStore
        .getState()
        .loadIndex()
        .catch((err) => {
          console.warn("Failed to prefetch search index:", err);
        });
    };

    if (typeof window !== "undefined") {
      if ("requestIdleCallback" in window) {
        window.requestIdleCallback(() => prefetch());
      } else {
        setTimeout(prefetch, 2000);
      }
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        toggle();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [toggle]);

  return isOpen ? <SearchCommand /> : null;
}
