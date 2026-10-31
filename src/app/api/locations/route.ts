import { NextResponse } from "next/server";
import { getLocaleInfo, isLocale } from "@/lib/i18n";
import { searchLocalLocations } from "@/lib/locations";
import { searchPlaces } from "@/lib/photon";
import type { LocationSearchResponse, LocationSuggestion } from "@/lib/location-types";

const WINDOW_MS = 60_000;
const MAX_REQUESTS = 60;
const buckets = new Map<string, number[]>();

function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip")?.trim() || "unknown";
}

function allowed(ip: string): boolean {
  const now = Date.now();
  const hits = (buckets.get(ip) ?? []).filter((time) => now - time < WINDOW_MS);
  hits.push(now);
  buckets.set(ip, hits);
  if (buckets.size > 5000) {
    for (const key of [...buckets.keys()].slice(0, 1000)) buckets.delete(key);
  }
  return hits.length <= MAX_REQUESTS;
}

function dedupe(results: LocationSuggestion[]): LocationSuggestion[] {
  const seen = new Set<string>();
  return results.filter((item) => {
    const key = `${item.type}:${item.name.toLowerCase()}:${item.countryCode ?? ""}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export async function GET(request: Request) {
  if (!allowed(clientIp(request))) {
    return NextResponse.json(
      { ok: false, query: "", results: [], message: "Too many searches. Please wait a moment." },
      { status: 429, headers: { "Retry-After": "30" } },
    );
  }

  const { searchParams } = new URL(request.url);
  const rawQuery = (searchParams.get("q") ?? "").trim().slice(0, 80);
  const localeParam = searchParams.get("locale") ?? "en";
  const locale = isLocale(localeParam) ? localeParam : "en";
  const limitParam = Number.parseInt(searchParams.get("limit") ?? "10", 10);
  const limit = Number.isFinite(limitParam) ? Math.min(12, Math.max(1, limitParam)) : 10;

  const local = searchLocalLocations(rawQuery, locale, Math.max(6, limit));

  if (rawQuery.length < 2) {
    const body: LocationSearchResponse = {
      ok: true,
      query: rawQuery,
      results: local.slice(0, limit),
    };
    return NextResponse.json(body, {
      headers: { "Cache-Control": "public, max-age=300, stale-while-revalidate=600" },
    });
  }

  const live = await searchPlaces(rawQuery, locale, Math.min(6, limit));
  const results = dedupe([...local, ...live.results]).slice(0, limit);

  const body: LocationSearchResponse = {
    ok: true,
    query: rawQuery,
    results,
    ...(live.degraded ? { degraded: true } : {}),
    ...(live.degraded && results.length === 0
      ? { message: "Live place search is unavailable right now. Try a major seaport or a country name." }
      : {}),
  };

  return NextResponse.json(body, {
    headers: {
      "Cache-Control": "public, max-age=120, stale-while-revalidate=600",
      "X-Location-Locale": getLocaleInfo(locale).intl,
    },
  });
}
