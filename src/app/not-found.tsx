"use client";

import dynamic from "next/dynamic";
import { LanguageSync } from "@/components/LanguageSync";
import { Navigation } from "@/components/layout/Navigation";
import { NotFound } from "@/components/NotFound";
import { useIsTouchDevice } from "@/hooks/useIsTouchDevice";

const Footer = dynamic(
  () => import("@/components/layout/Footer").then((mod) => mod.Footer),
  { ssr: false },
);

const SearchCommand = dynamic(
  () =>
    import("@/components/search/SearchCommand").then(
      (mod) => mod.SearchCommand,
    ),
  { ssr: false },
);

export default function RootNotFound() {
  const isTouch = useIsTouchDevice();

  return (
    <LanguageSync>
      <Navigation />
      {!isTouch && <SearchCommand />}
      <main className="flex-grow">
        <NotFound />
      </main>
      <Footer />
    </LanguageSync>
  );
}
