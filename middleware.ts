import { type NextRequest, NextResponse } from "next/server";
import {
  DEFAULT_LANGUAGE,
  LANGUAGE_COOKIE,
  type Language,
} from "./src/app/lib/i18n";

function isLanguage(lang: string | null | undefined): lang is Language {
  return lang === "en" || lang === "pt";
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Skip middleware for api, _next, public files, and links page
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.includes(".") ||
    pathname.startsWith("/links")
  ) {
    return NextResponse.next();
  }

  // Check if path already has language prefix
  const languagePrefix = pathname.split("/")[1];
  if (isLanguage(languagePrefix)) {
    return NextResponse.next();
  }

  // 1. Check for cookie (user's explicit preference)
  const cookieLanguage = request.cookies.get(LANGUAGE_COOKIE)?.value;
  if (isLanguage(cookieLanguage)) {
    return NextResponse.redirect(
      new URL(`/${cookieLanguage}${pathname}`, request.url),
    );
  }

  // 2. Fallback to Accept-Language header (robust parsing with weights)
  const acceptLanguage = request.headers.get("accept-language") || "";
  let preferredLanguage: Language = DEFAULT_LANGUAGE;

  // Parse "en-US,en;q=0.9,pt-BR;q=0.8,pt;q=0.7"
  const parsedLanguages = acceptLanguage
    .split(",")
    .map((lang) => {
      const [tag, weight] = lang.split(";q=");
      return {
        tag: tag.trim().toLowerCase(),
        weight: weight ? Number.parseFloat(weight) : 1.0,
      };
    })
    .sort((a, b) => b.weight - a.weight);

  for (const lang of parsedLanguages) {
    if (lang.tag.startsWith("pt")) {
      preferredLanguage = "pt";
      break;
    }
    if (lang.tag.startsWith("en")) {
      preferredLanguage = "en";
      break;
    }
  }

  // Redirect to /[lang]/...
  const newUrl = new URL(`/${preferredLanguage}${pathname}`, request.url);
  return NextResponse.redirect(newUrl);
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
