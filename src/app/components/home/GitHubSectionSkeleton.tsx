import { AlignedFlickeringGrid } from "@/components/blueprint/AlignedFlickeringGrid";
import { cn } from "@/lib/utils";

/**
 * GitHubSectionSkeleton - Loading state for GitHub activity section
 */
export function GitHubSectionSkeleton() {
  return (
    <div className="relative animate-pulse">
      {/* 3-Column Header Grid Skeleton */}
      <div className="rail-bounded overflow-hidden">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {/* Column 1: Info Content Skeleton */}
          <div className="px-6 py-10 sm:px-8 sm:py-12">
            <div className="h-3 w-20 rounded bg-white/10" />
            <div className="mt-4 h-8 w-48 rounded bg-white/10 sm:h-10" />
            <div className="mt-3 h-12 w-full max-w-md rounded bg-white/10" />
          </div>

          {/* Column 2: Commit Stats Skeleton */}
          <div className="flex flex-col justify-center px-6 py-10 border-t border-dashed border-border sm:border-t-0 sm:border-l sm:py-12 lg:px-10">
            <div className="flex flex-col items-start sm:items-center">
              <div className="h-12 w-24 rounded bg-white/10 sm:h-16" />
              <div className="mt-2 h-3 w-32 rounded bg-white/10" />
            </div>
          </div>

          {/* Column 3: Decorative Grid Placeholder */}
          <div className="relative border-t border-dashed border-border lg:border-t-0 lg:border-l sm:col-span-2 lg:col-span-1 overflow-hidden min-h-[120px] sm:min-h-[160px] lg:min-h-0 bg-white/[0.02]">
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.01] to-transparent" />
          </div>
        </div>
      </div>

      {/* Contribution Graph Skeleton Area */}
      <div className="rail-bounded border-t border-dashed border-border bg-white/[0.01]">
        <div className="relative py-12 sm:py-16 flex justify-center">
          <div className="h-[120px] w-full max-w-4xl rounded bg-white/[0.02]" />
        </div>
      </div>
    </div>
  );
}
