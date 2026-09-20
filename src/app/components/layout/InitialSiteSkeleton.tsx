import { NavigationSkeleton } from "@/components/layout/NavigationSkeleton";
import { PageLoadingSkeleton } from "@/components/layout/PageLoadingSkeleton";

export function InitialSiteSkeleton() {
  return (
    <div className="flex min-h-dvh flex-col">
      <NavigationSkeleton />
      <main className="flex-grow">
        <PageLoadingSkeleton variant="home" />
      </main>
    </div>
  );
}
