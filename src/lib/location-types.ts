/** Shared location types for the destination autocomplete + map. */

export type LocationType = "port" | "city" | "region" | "country" | "airport";

export interface LocationBBox {
  south: number;
  west: number;
  north: number;
  east: number;
}

export interface LocationSuggestion {
  /** Stable id, e.g. `port:CNSHA` or `osm:node:123`. */
  id: string;
  type: LocationType;
  /** Short display name, e.g. "Busan", "Rotterdam", "Ghana". */
  name: string;
  /** One-line value written into the destination field. */
  label: string;
  country?: string;
  countryCode?: string;
  city?: string;
  region?: string;
  /** UN/LOCODE or IATA code when known. */
  code?: string;
  lat: number;
  lon: number;
  bbox?: LocationBBox;
  /** Secondary line shown under the name (port type, region, address…). */
  details?: string;
  /** Higher = more prominent; used for the popular list and tie-breaking. */
  popularity?: number;
  source: "dataset" | "osm";
}

export interface LocationSearchResponse {
  ok: boolean;
  query: string;
  results: LocationSuggestion[];
  /** True when live place search failed but local port/country data still worked. */
  degraded?: boolean;
  message?: string;
}
