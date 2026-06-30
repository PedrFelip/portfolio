import dynamic from "next/dynamic";
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
      <ZenLayoutTransition element="nav">
        <Navigation />
      </ZenLayoutTransition>
      <SearchWrapper />
      <main className="flex-grow">{children}</main>
      <ZenLayoutTransition element="footer">
        <Footer />
      </ZenLayoutTransition>
    </>
  );
}
