/**
 * Not Found page content (English)
 */

import type { NotFoundSection } from "./types";

export const notFoundEn = {
  notFound: {
    title: "Page Not Found",
    subtitle: "404",
    description: "The page you're looking for doesn't exist or has been moved.",
    cta: "Back to Home",
    errorCode: "Error 404",
    quickNav: "Quick Navigation",
  },
} satisfies { notFound: NotFoundSection };
