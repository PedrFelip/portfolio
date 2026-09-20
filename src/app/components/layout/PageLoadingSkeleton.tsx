interface PageLoadingSkeletonProps {
  variant?: "page" | "home";
}

export function PageLoadingSkeleton({
  variant = "page",
}: PageLoadingSkeletonProps) {
  if (variant === "home") {
    return <HomeLoadingSkeleton />;
  }

  return (
    <div
      className="mx-auto min-h-[60dvh] px-4 md:max-w-4xl"
      role="status"
      aria-label="Loading page"
    >
      <div className="bp-panel bp-line-top bp-line-bottom relative overflow-clip">
        <LoadingSheen />
        <div className="relative px-4 py-10 sm:px-6 sm:py-12">
          <LoadingLabel />
          <div className="mt-5 h-9 w-2/3 max-w-md bg-surface-3" />
          <div className="mt-5 h-3 w-full max-w-xl bg-surface-2" />
          <div className="mt-3 h-3 w-4/5 max-w-lg bg-surface-2" />
        </div>
      </div>
      <span className="sr-only">Loading…</span>
    </div>
  );
}

function HomeLoadingSkeleton() {
  return (
    <div
      className="relative w-full overflow-x-clip overflow-y-visible"
      role="status"
      aria-label="Loading portfolio"
    >
      <div className="mx-auto px-4 md:max-w-4xl">
        <div className="bp-panel bp-line-top relative min-h-[34rem] overflow-clip sm:min-h-[38rem] lg:min-h-[32rem]">
          <LoadingSheen />

          <div
            className="pointer-events-none absolute inset-0 opacity-50"
            aria-hidden="true"
          >
            <div className="absolute left-[61.8%] top-0 h-full border-l border-dashed border-border" />
            <div className="absolute left-0 top-[61.8%] w-full border-t border-dashed border-border" />
            <div className="absolute -right-24 -top-24 size-72 rounded-full border border-border/60" />
            <div className="absolute -right-12 -top-12 size-48 rounded-full border border-dashed border-border/70" />
          </div>

          <div className="relative flex min-h-[34rem] max-w-2xl flex-col justify-center px-5 py-14 sm:min-h-[38rem] sm:px-10 lg:min-h-[32rem] lg:px-14">
            <LoadingLabel />
            <div className="mt-7 h-11 w-[88%] max-w-lg bg-surface-3 sm:h-14" />
            <div className="mt-3 h-11 w-[64%] max-w-sm bg-surface-3/70 sm:h-14" />
            <div className="mt-7 h-3 w-full max-w-lg bg-surface-2" />
            <div className="mt-3 h-3 w-4/5 max-w-md bg-surface-2" />
            <div className="mt-8 flex gap-3">
              <div className="h-10 w-36 border border-border bg-surface-3" />
              <div className="h-10 w-28 border border-border bg-surface-2" />
            </div>
          </div>

          <div className="absolute bottom-4 right-5 font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground/45 sm:right-8">
            shell / 001
          </div>
        </div>
      </div>
      <span className="sr-only">Loading portfolio…</span>
    </div>
  );
}

function LoadingLabel() {
  return (
    <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground/60">
      <span
        className="size-1.5 bg-accent bp-loading-pulse"
        aria-hidden="true"
      />
      <span>Building interface</span>
    </div>
  );
}

function LoadingSheen() {
  return (
    <div
      className="bp-loading-sheen pointer-events-none absolute inset-0"
      aria-hidden="true"
    />
  );
}
