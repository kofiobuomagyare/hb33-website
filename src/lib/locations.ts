import portsData from "./data/ports.json";
import countriesData from "./data/countries-geo.json";
import { baseLanguage, type Locale } from "./i18n";
import type { LocationSuggestion, LocationType } from "./location-types";

interface PortRow {
  n: string;
  c?: string | null;
  co?: string | null;
  t?: string | null;
  s?: string | null;
  lat: number;
  lon: number;
  code?: string | null;
  m?: number | null;
}

interface CountryRow {
  c: string;
  en: string;
  fr: string;
  lat: number;
  lon: number;
}

const ports = portsData as PortRow[];
const countries = countriesData as CountryRow[];

/** Human-friendly names for major ports whose dataset labels are dated. */
const PORT_NAME_OVERRIDES: Record<string, string> = {
  KRPUS: "Busan",
  VNSGN: "Ho Chi Minh City (Saigon)",
  INNSA: "Nhava Sheva (JNPT)",
  CNTXG: "Tianjin",
  MYPKG: "Port Klang",
  IDTPP: "Tanjung Priok (Jakarta)",
  IDJKT: "Jakarta",
  USNYC: "New York / New Jersey",
  USLGB: "Long Beach",
  MATNG: "Tanger Med",
  SGSIN: "Singapore",
  TWTXG: "Taichung",
};

/** Search aliases for common trade names, former names and abbreviations. */
const PORT_ALIASES: Record<string, string[]> = {
  KRPUS: ["Busan", "Pusan", "Busan Port"],
  VNSGN: ["Ho Chi Minh", "Ho Chi Minh City", "Saigon", "HCMC"],
  INNSA: ["Nhava Sheva", "JNPT", "Mumbai", "Nava Sheva"],
  CNTXG: ["Tianjin", "Tianjin Xingang", "Xingang", "Beijing port"],
  MYPKG: ["Port Klang", "Klang", "Kelang"],
  IDTPP: ["Jakarta", "Tanjung Priok"],
  IDJKT: ["Jakarta", "Tanjung Priok"],
  USNYC: ["New York", "New Jersey", "Newark", "NYC"],
  USLAX: ["Los Angeles", "LA", "LAX"],
  USLGB: ["Long Beach", "LA"],
  MATNG: ["Tanger Med", "Tangier", "Tanger"],
  AEJEA: ["Jebel Ali", "Dubai"],
  SAJED: ["Jeddah", "Jiddah"],
  EGPSD: ["Port Said", "Said"],
  CIABJ: ["Abidjan"],
  GHTEM: ["Tema", "Accra"],
  NGAPP: ["Lagos", "Apapa", "Tin Can Island"],
  KEMBA: ["Mombasa"],
  TZDAR: ["Dar es Salaam", "Dar"],
  ZADUR: ["Durban"],
  ZACPT: ["Cape Town"],
  NLRTM: ["Rotterdam"],
  BEANR: ["Antwerp", "Anvers"],
  DEHAM: ["Hamburg"],
  GBFXT: ["Felixstowe"],
  FRLEH: ["Le Havre"],
  ESVLC: ["Valencia"],
  ESBCN: ["Barcelona"],
  PABLB: ["Balboa", "Panama"],
  COBUN: ["Buenaventura"],
  BRSSZ: ["Santos", "São Paulo"],
  ARBUE: ["Buenos Aires"],
  SNDKR: ["Dakar"],
  BJCOO: ["Cotonou"],
  TGLFW: ["Lome", "Lomé"],
  GNCKY: ["Conakry"],
  LRMLW: ["Monrovia"],
  SLFNA: ["Freetown"],
  AOLAD: ["Luanda"],
  MZMPM: ["Maputo"],
  DJJIB: ["Djibouti"],
};

const COUNTRY_NAME_CACHE = new Map<string, string>();

export function flagEmoji(countryCode?: string): string | undefined {
  if (!countryCode || !/^[A-Za-z]{2}$/.test(countryCode)) return undefined;
  const upper = countryCode.toUpperCase();
  return String.fromCodePoint(
    ...[...upper].map((char) => 0x1f1e6 + char.charCodeAt(0) - 65),
  );
}

/** Localized country name via Intl, falling back to the dataset's English name. */
export function countryName(
  code: string | undefined,
  fallback: string | undefined,
  locale: Locale,
): string {
  if (!code) return fallback ?? "";
  const language = baseLanguage(locale);
  const key = `${language}:${code}`;
  const cached = COUNTRY_NAME_CACHE.get(key);
  if (cached) return cached;
  let name = fallback ?? code;
  try {
    const display = new Intl.DisplayNames([language], { type: "region" });
    name = display.of(code.toUpperCase()) ?? name;
  } catch {
    // Unsupported language tag — keep the dataset name.
  }
  COUNTRY_NAME_CACHE.set(key, name);
  return name;
}

function normalize(value: string): string {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function typeLabel(type: LocationType): string {
  switch (type) {
    case "port":
      return "Seaport";
    case "city":
      return "City";
    case "region":
      return "Region";
    case "country":
      return "Country";
    case "airport":
      return "Airport";
  }
}

export function locationTypeLabel(type: LocationType): string {
  return typeLabel(type);
}

/** Compose the value stored in the quote form's destination field. */
export function locationLabel(location: LocationSuggestion): string {
  if (location.type === "country") return location.name;
  const suffix = location.country ? `, ${location.country}` : "";
  const code = location.code ? ` (${location.code})` : "";
  return `${location.name}${suffix}${code}`;
}

/** Compose one compact line of extra context for the email / inquiry record. */
export function locationDetails(location: LocationSuggestion): string {
  return [
    typeLabel(location.type),
    location.code,
    location.city && location.city !== location.name ? location.city : undefined,
    location.region,
    location.country,
    `${location.lat.toFixed(4)}, ${location.lon.toFixed(4)}`,
  ]
    .filter(Boolean)
    .join(" · ");
}

function scoreText(query: string, value: string | undefined | null): number {
  if (!value) return 0;
  const haystack = normalize(value);
  if (!haystack) return 0;
  if (haystack === query) return 100;
  if (haystack.startsWith(query)) return 82;
  if (haystack.includes(query)) return 58;
  return 0;
}

function tokenScore(query: string, tokens: string[], haystack: string): number {
  if (tokens.length < 2) return 0;
  return tokens.every((token) => haystack.includes(token)) ? 40 : 0;
}

function portDisplayName(port: PortRow): string {
  return (port.code && PORT_NAME_OVERRIDES[port.code]) || port.n;
}

function portToSuggestion(port: PortRow, locale: Locale): LocationSuggestion | null {
  if (!Number.isFinite(port.lat) || !Number.isFinite(port.lon)) return null;
  const name = portDisplayName(port);
  const country = countryName(port.c ?? undefined, port.co ?? undefined, locale);
  const code = port.code ?? undefined;
  const kind = port.t && port.t !== "unknown" ? `${port.t} port` : "seaport";
  const size = port.s && port.s !== "unknown" ? `${port.s} port` : undefined;
  const suggestion: LocationSuggestion = {
    id: `port:${code ?? `${port.lat},${port.lon}`}`,
    type: "port",
    name,
    label: "",
    country,
    countryCode: port.c ?? undefined,
    code,
    lat: port.lat,
    lon: port.lon,
    details: [code, kind, size].filter(Boolean).join(" · "),
    popularity: port.m ?? 0,
    source: "dataset",
  };
  suggestion.label = locationLabel(suggestion);
  return suggestion;
}

function scorePort(port: PortRow, query: string, tokens: string[]): number {
  const name = portDisplayName(port);
  const aliases = (port.code && PORT_ALIASES[port.code]) || [];
  const code = port.code ?? "";
  const haystack = normalize(
    [name, port.n, port.co, port.c, code, ...aliases].filter(Boolean).join(" "),
  );

  const bestName = Math.max(
    scoreText(query, name),
    scoreText(query, port.n),
    ...aliases.map((alias) => scoreText(query, alias)),
  );
  const bestCode = scoreText(query, code);
  const base = Math.max(bestName, bestCode, tokenScore(query, tokens, haystack));
  const countryBoost = scoreText(query, port.co) * 0.3;
  if (base === 0 && countryBoost === 0) return 0;
  return base + countryBoost + (port.m ?? 0) / 40;
}

/** Popular major ports shown before the visitor types anything. */
export const popularPorts: LocationSuggestion[] = ports
  .filter((port) => (port.m ?? 0) > 0)
  .map((port) => portToSuggestion(port, "en"))
  .filter((port): port is LocationSuggestion => port !== null)
  .sort((a, b) => (b.popularity ?? 0) - (a.popularity ?? 0))
  .filter((port, index, all) => all.findIndex((p) => p.name === port.name) === index)
  .slice(0, 8);

/**
 * Search the bundled port + country data. This is fast, key-free and always
 * available even when the live OSM/Nominatim service is rate-limited.
 */
export function searchLocalLocations(
  rawQuery: string,
  locale: Locale,
  limit = 8,
): LocationSuggestion[] {
  const query = normalize(rawQuery);
  if (!query) return popularPorts.slice(0, limit);
  if (query.length < 2) return [];

  const tokens = query.split(" ").filter(Boolean);

  const portHits = ports
    .map((port) => ({ port, score: scorePort(port, query, tokens) }))
    .filter((hit) => hit.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, Math.max(limit, 8))
    .map((hit) => portToSuggestion(hit.port, locale))
    .filter((hit): hit is LocationSuggestion => hit !== null);

  const countryHits = countries
    .map((country) => {
      const localized = countryName(country.c, country.en, locale);
      const score =
        Math.max(
          scoreText(query, localized),
          scoreText(query, country.en),
          scoreText(query, country.fr),
          scoreText(query, country.c),
        ) + 6;
      return { country, localized, score };
    })
    .filter((hit) => hit.score > 6)
    .sort((a, b) => b.score - a.score)
    .slice(0, 2)
    .map(({ country, localized }): LocationSuggestion => {
      const suggestion: LocationSuggestion = {
        id: `country:${country.c}`,
        type: "country",
        name: localized,
        label: localized,
        country: localized,
        countryCode: country.c,
        code: country.c,
        lat: country.lat,
        lon: country.lon,
        details: `${country.c} · Country`,
        popularity: 20,
        source: "dataset",
      };
      return suggestion;
    });

  // Put the strongest local matches first, then countries, and de-duplicate.
  const merged = [...portHits, ...countryHits];
  const seen = new Set<string>();
  return merged
    .filter((item) => {
      const key = `${item.type}:${normalize(item.name)}:${item.countryCode ?? ""}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .slice(0, limit);
}
