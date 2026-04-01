"use client";

import { NotFound } from "@/components/NotFound";
import { LanguageProvider } from "@/lib/LanguageContext";

export default function RootNotFound() {
  return (
    <LanguageProvider>
      <NotFound />
    </LanguageProvider>
  );
}
