"use client";

import { useEffect, useState } from "react";
import { NotFound } from "@/components/NotFound";
import type { Language } from "@/lib/i18n";
import { LanguageProvider } from "@/lib/LanguageContext";

export default function RootNotFound() {
  return (
    <LanguageProvider>
      <NotFound />
    </LanguageProvider>
  );
}
