import dynamic from "next/dynamic";
import { Suspense } from "react";
import { Navigation } from "@/components/layout/Navigation";
import { ZenLayoutTransition } from "@/components/layout/ZenLayoutTransition";
import { SearchWrapper } from "@/components/search/SearchWrapper";

// TODO(refactor)[P1]: dynamic() with ssr:true is redundant
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
      <Suspense fallback={null}>
        <ZenLayoutTransition element="nav">
          <Navigation />
        </ZenLayoutTransition>
      </Suspense>
      <SearchWrapper />
      <main className="flex-grow">{children}</main>
      <Suspense fallback={null}>
        <ZenLayoutTransition element="footer">
          <Footer />
        </ZenLayoutTransition>
      </Suspense>
    </>
  );
}
