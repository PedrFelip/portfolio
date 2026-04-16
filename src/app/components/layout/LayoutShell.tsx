import dynamic from "next/dynamic";
import { Suspense } from "react";
import { RouteLoadingText } from "@/components/common";
import { Navigation } from "@/components/layout/Navigation";
import { RouteNavigationLoader } from "@/components/layout/RouteNavigationLoader";

const Footer = dynamic(
  () => import("@/components/layout/Footer").then((mod) => mod.Footer),
  {
    ssr: true,
    loading: () => null,
  },
);

interface LayoutShellProps {
  children: React.ReactNode;
}

export function LayoutShell({ children }: LayoutShellProps) {
  return (
    <>
      <RouteNavigationLoader />
      <Navigation />
      <Suspense fallback={<RouteLoadingText text="Loading page..." />}>
        <main className="flex-grow">{children}</main>
      </Suspense>
      <Footer />
    </>
  );
}
