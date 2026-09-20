import { Logo } from "@/components/ui";

export function NavigationSkeleton() {
  return (
    <div className="h-[57px] bg-background/80 backdrop-blur-md" aria-hidden>
      <div className="mx-auto px-4 md:max-w-4xl">
        <div className="border-x border-border px-4 sm:px-6">
          <div className="flex h-14 items-center justify-between">
            <div className="flex items-center gap-2">
              <Logo height={28} className="h-5 w-auto opacity-70 sm:h-6" />
              <div className="hidden h-3 w-24 bg-surface-3 sm:block" />
            </div>
            <div className="flex items-center gap-2">
              <div className="hidden h-7 w-28 border border-border bg-surface-2 md:block" />
              <div className="size-7 border border-border bg-surface-3" />
            </div>
          </div>
        </div>
        <div className="h-px border-x border-border bg-border" />
      </div>
    </div>
  );
}
