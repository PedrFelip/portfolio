import { Suspense } from "react";
import { Footer } from "@/components/layout/Footer";
import { Navigation } from "@/components/layout/Navigation";
import { NavigationSkeleton } from "@/components/layout/NavigationSkeleton";
import { ZenLayoutTransition } from "@/components/layout/ZenLayoutTransition";
import { SearchWrapper } from "@/components/search/SearchWrapper";
import type { Language, Translation } from "@/lib/i18n";

interface LayoutShellProps {
  children: React.ReactNode;
  lang: Language;
  nav: Translation["nav"];
  footerYear: number;
}

export function LayoutShell({
  children,
  lang,
  nav,
  footerYear,
}: LayoutShellProps) {
  return (
    <>
      <Suspense fallback={<NavigationSkeleton />}>
        <ZenLayoutTransition>
          <Navigation />
        </ZenLayoutTransition>
      </Suspense>
      <SearchWrapper />
      <main className="flex-grow">{children}</main>
      <Suspense fallback={null}>
        <ZenLayoutTransition>
          <Footer lang={lang} nav={nav} year={footerYear} />
        </ZenLayoutTransition>
      </Suspense>
    </>
  );
}
