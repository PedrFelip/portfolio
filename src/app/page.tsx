import { redirect } from "next/navigation";
import { DEFAULT_LANGUAGE } from "./lib/i18n";

/**
 * Root page component.
 * Redirection is primarily handled by middleware.ts for better performance.
 * This component serves as a static fallback.
 */
export default function RootPage() {
  redirect(`/${DEFAULT_LANGUAGE}`);
}
