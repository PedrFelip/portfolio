"use client";

import { LanguageSync } from "@/components/LanguageSync";
import { Footer } from "@/components/layout/Footer";
import { Navigation } from "@/components/layout/Navigation";
import { NotFound } from "@/components/NotFound";

export default function RootNotFound() {
  return (
    <LanguageSync>
      <Navigation />
      <main className="flex-grow">
        <NotFound />
      </main>
      <Footer />
    </LanguageSync>
  );
}
