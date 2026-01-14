import { type NextRequest, NextResponse } from "next/server";

const SUPPORTED_LANGUAGES = ["en", "pt"];
const DEFAULT_LANGUAGE = "en";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Skip middleware for api, _next, public files
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // Check if path already has language prefix
  const languagePrefix = pathname.split("/")[1];
  if (SUPPORTED_LANGUAGES.includes(languagePrefix)) {
    return NextResponse.next();
  }

  // Get preferred language from Accept-Language header
  const acceptLanguage = request.headers.get("accept-language") || "";
  let preferredLanguage = DEFAULT_LANGUAGE;

  // Parse accept-language header
  for (const lang of SUPPORTED_LANGUAGES) {
    if (acceptLanguage.includes(lang)) {
      preferredLanguage = lang;
      break;
    }
  }

  // Special case for Portuguese variants
  if (acceptLanguage.toLowerCase().includes("pt")) {
    preferredLanguage = "pt";
  }

  // Redirect to /[lang]/...
  const newUrl = new URL(`/${preferredLanguage}${pathname}`, request.url);
  return NextResponse.redirect(newUrl);
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
