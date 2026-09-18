"use client";

import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { GitHubSectionSkeleton } from "./GitHubSectionSkeleton";

const GitHubSection = lazy(() =>
  import("./GitHubSection").then((mod) => ({
    default: mod.GitHubSection,
  })),
);

interface GitHubSectionLoaderProps {
  title: string;
  subtitle: string;
  description: string;
  swipeHint: string;
  less: string;
  more: string;
  tapHint: string;
  commitLabel: string;
  commitsLabel: string;
  commitsLastYearLabel: string;
}

export function GitHubSectionLoader(props: GitHubSectionLoaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || shouldLoad) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setShouldLoad(true);
        observer.disconnect();
      },
      { rootMargin: "500px 0px" },
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [shouldLoad]);

  return (
    <div ref={containerRef}>
      {shouldLoad ? (
        <Suspense fallback={<GitHubSectionSkeleton />}>
          <GitHubSection {...props} />
        </Suspense>
      ) : (
        <GitHubSectionSkeleton />
      )}
    </div>
  );
}
