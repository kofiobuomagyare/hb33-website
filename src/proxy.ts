import { NextResponse, type NextRequest } from "next/server";
import {
  isLocale,
  matchPreferredLocale,
  normalizeLocale,
} from "@/lib/i18n";

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Leave API routes, Next internals and static assets alone.
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const segments = pathname.split("/");

  if (isLocale(segments[1])) {
    // Redirect non-canonical casing (e.g. /en-gh) to the canonical locale URL.
    const canonical = normalizeLocale(segments[1]);
    if (canonical && segments[1] !== canonical) {
      segments[1] = canonical;
      const url = request.nextUrl.clone();
      url.pathname = segments.join("/") || "/";
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  // No locale prefix: redirect, honouring Accept-Language across all
  // supported languages (exact region match first, then base language).
  const locale = matchPreferredLocale(request.headers.get("accept-language"));
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)"],
};
