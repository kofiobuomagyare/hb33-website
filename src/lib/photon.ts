import { baseLanguage, type Locale } from "./i18n";
import type { LocationBBox, LocationSuggestion, LocationType } from "./location-types";
import { countryName, locationLabel } from "./locations";

/**
 * Live city / region / country / airport search through Photon, the
 * OpenStreetMap search engine built for type-ahead use.
 *
 * Ports stay in the bundled WFP dataset; this fills in everything else. The
 * public Photon instance needs no key. Requests are lightly serialized and
 * cached so a visitor typing quickly cannot flood it.
 */

interface PhotonProperties {
  osm_id?: number;
  osm_type?: string;
  osm_key?: string;
  osm_value?: string;
  name?: string;
  country?: string;
  countrycode?: string;
  city?: string;
  county?: string;
  state?: string;
  district?: string;
  locality?: string;
  type?: string;
  /** [west, north, east, south] */
  extent?: [number, number, number, number];
}

interface PhotonFeature {
  geometry?: { coordinates?: [number, number] };
  properties?: PhotonProperties;
}

interface PhotonResponse {
  features?: PhotonFeature[];
}

interface PlaceSearch {
  results: LocationSuggestion[];
  degraded: boolean;
}

const CACHE_TTL_MS = 10 * 60 * 1000;
const CACHE_MAX = 400;
const REQUEST_SPACING_MS = 300;
const cache = new Map<string, { at: number; value: PlaceSearch }>();

let nextRequestAt = 0;
let requestChain: Promise<unknown> = Promise.resolve();

function schedule<T>(task: () => Promise<T>): Promise<T> {
  const run = requestChain.then(async () => {
    const wait = nextRequestAt - Date.now();
    if (wait > 0) await new Promise((resolve) => setTimeout(resolve, wait));
    nextRequestAt = Date.now() + REQUEST_SPACING_MS;
    return task();
  });
  requestChain = run.then(
    () => undefined,
    () => undefined,
  );
  return run;
}

function endpoint(): string {
  return (process.env.PHOTON_URL?.trim() || "https://photon.komoot.io").replace(/\/$/, "");
}

function contactEmail(): string {
  return (
    process.env.LOCATION_SEARCH_EMAIL?.trim() ||
    process.env.INQUIRY_TO_EMAIL?.trim() ||
    process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() ||
    "info@hb33international.com"
  );
}

/**
 * Photon's public instance documents en/de/fr name support; for other site
 * locales we ask for English rather than sending an unsupported code.
 */
function searchLanguage(locale: Locale): string {
  const base = baseLanguage(locale);
  return ["en", "de", "fr"].includes(base) ? base : "en";
}

function classify(properties: PhotonProperties): LocationType | undefined {
  const key = properties.osm_key?.toLowerCase();
  const value = properties.osm_value?.toLowerCase();
  const type = properties.type?.toLowerCase();

  if (key === "aeroway" && ["aerodrome", "airport"].includes(value ?? "")) return "airport";
  if (key === "harbour" || value === "port" || value === "harbour") return "port";
  if (type === "country" || value === "country") return "country";
  if (
    type === "state" ||
    ["state", "province", "region", "county", "state_district"].includes(value ?? "")
  ) {
    return "region";
  }
  if (
    type === "city" ||
    ["city", "town", "village", "municipality", "hamlet", "borough"].includes(value ?? "")
  ) {
    return "city";
  }
  return undefined;
}

function parseBBox(extent: PhotonProperties["extent"]): LocationBBox | undefined {
  if (!Array.isArray(extent) || extent.length !== 4) return undefined;
  const [west, north, east, south] = extent;
  if ([west, north, east, south].some((value) => !Number.isFinite(value))) return undefined;
  return { south, north, west, east };
}

function toSuggestion(feature: PhotonFeature, locale: Locale): LocationSuggestion | null {
  const properties = feature.properties;
  const coordinates = feature.geometry?.coordinates;
  if (!properties || !coordinates) return null;

  const type = classify(properties);
  const [lon, lat] = coordinates;
  if (!type || !Number.isFinite(lat) || !Number.isFinite(lon)) return null;

  const name = properties.name?.trim();
  if (!name) return null;

  const countryCode = properties.countrycode?.toUpperCase();
  const country = countryName(countryCode, properties.country, locale);
  const city =
    properties.city ??
    properties.locality ??
    (type === "city" ? name : undefined);
  const region = properties.state ?? properties.county ?? properties.district;
  const details = [...new Set([city, region].filter((value): value is string => Boolean(value)))]
    .filter((value) => value !== name)
    .join(" · ");

  const suggestion: LocationSuggestion = {
    id: `photon:${properties.osm_type ?? "place"}:${properties.osm_id ?? `${lat},${lon}`}`,
    type,
    name,
    label: "",
    country: country || undefined,
    countryCode,
    city,
    region,
    code: type === "country" ? countryCode : undefined,
    lat,
    lon,
    bbox: parseBBox(properties.extent),
    details: details || undefined,
    source: "osm",
  };
  suggestion.label = locationLabel(suggestion);
  return suggestion;
}

function cacheRead(key: string): PlaceSearch | undefined {
  const hit = cache.get(key);
  if (!hit) return undefined;
  if (Date.now() - hit.at > CACHE_TTL_MS) {
    cache.delete(key);
    return undefined;
  }
  return hit.value;
}

function cacheWrite(key: string, value: PlaceSearch) {
  cache.set(key, { at: Date.now(), value });
  if (cache.size > CACHE_MAX) {
    const oldest = [...cache.entries()].sort((a, b) => a[1].at - b[1].at).slice(0, 100);
    for (const [entry] of oldest) cache.delete(entry);
  }
}

/** Search places through Photon. Never throws: degrades to an empty list. */
export async function searchPlaces(
  rawQuery: string,
  locale: Locale,
  limit = 6,
): Promise<PlaceSearch> {
  const query = rawQuery.trim();
  if (query.length < 2) return { results: [], degraded: false };

  const language = searchLanguage(locale);
  const key = `${language}:${limit}:${query.toLowerCase()}`;
  const cached = cacheRead(key);
  if (cached) return cached;

  const url = new URL(`${endpoint()}/api/`);
  url.searchParams.set("q", query);
  url.searchParams.set("limit", String(Math.min(10, Math.max(limit, 4))));
  url.searchParams.set("lang", language);

  try {
    const result = await schedule(async () => {
      const res = await fetch(url, {
        headers: {
          "User-Agent": `HB33Website/1.0 (bulk commodity quote form; ${contactEmail()})`,
          Accept: "application/json",
        },
        cache: "no-store",
        signal: AbortSignal.timeout(6_000),
      });
      if (!res.ok) {
        console.error("HB33: Photon error", res.status);
        return { ok: false as const };
      }
      return { ok: true as const, data: (await res.json()) as PhotonResponse };
    });

    if (!result.ok) {
      const degraded = { results: [], degraded: true };
      cacheWrite(key, degraded);
      return degraded;
    }

    const seen = new Set<string>();
    const results = (result.data.features ?? [])
      .map((feature) => toSuggestion(feature, locale))
      .filter((item): item is LocationSuggestion => item !== null)
      .filter((item) => {
        const dedupe = `${item.type}:${item.name.toLowerCase()}:${item.countryCode ?? ""}`;
        if (seen.has(dedupe)) return false;
        seen.add(dedupe);
        return true;
      })
      .slice(0, limit);

    const value = { results, degraded: false };
    cacheWrite(key, value);
    return value;
  } catch (err) {
    console.error("HB33: Photon search failed", err);
    const degraded = { results: [], degraded: true };
    cacheWrite(key, degraded);
    return degraded;
  }
}
