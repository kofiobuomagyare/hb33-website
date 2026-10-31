import { ExternalLink, MapPin } from "lucide-react";
import type { Dictionary } from "@/lib/dictionaries/en";
import type { LocationSuggestion } from "@/lib/location-types";

function viewBox(location: LocationSuggestion) {
  if (location.bbox) return location.bbox;
  const pad =
    location.type === "country"
      ? 18
      : location.type === "region"
        ? 2.5
        : location.type === "city"
          ? 0.45
          : 0.16;
  return {
    south: Math.max(-85, location.lat - pad),
    north: Math.min(85, location.lat + pad),
    west: Math.max(-180, location.lon - pad * 1.5),
    east: Math.min(180, location.lon + pad * 1.5),
  };
}

/**
 * Keyless OpenStreetMap embed. No map library, API key or client JavaScript
 * is required, and the iframe is lazy-loaded so it never delays the form.
 */
export default function LocationMap({
  location,
  dict,
}: {
  location: LocationSuggestion;
  dict: Dictionary;
}) {
  const box = viewBox(location);
  const bbox = `${box.west},${box.south},${box.east},${box.north}`;
  const src = `https://www.openstreetmap.org/export/embed.html?bbox=${encodeURIComponent(
    bbox,
  )}&layer=mapnik&marker=${location.lat},${location.lon}`;
  const external = `https://www.openstreetmap.org/?mlat=${location.lat}&mlon=${location.lon}#map=${
    location.type === "country" ? 3 : location.type === "region" ? 6 : 11
  }/${location.lat}/${location.lon}`;

  return (
    <div className="mt-3 overflow-hidden rounded-2xl border border-line bg-parchment">
      <div className="flex items-center justify-between gap-3 border-b border-line bg-cream/80 px-3 py-2">
        <p className="flex min-w-0 items-center gap-1.5 text-xs font-semibold text-bark">
          <MapPin className="size-3.5 shrink-0 text-clay-deep" aria-hidden />
          <span className="truncate">{location.label}</span>
        </p>
        <a
          href={external}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex shrink-0 items-center gap-1 text-[11px] font-semibold text-clay-deep underline underline-offset-2 hover:text-bark"
        >
          {dict.locations.openMap}
          <ExternalLink className="size-3" aria-hidden />
        </a>
      </div>
      <iframe
        title={`${dict.locations.mapTitle}: ${location.label}`}
        src={src}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="h-52 w-full border-0 sm:h-60"
      />
      <p className="bg-cream/80 px-3 py-1.5 text-[10px] text-ink-muted">
        {dict.locations.mapAttribution}
      </p>
    </div>
  );
}
