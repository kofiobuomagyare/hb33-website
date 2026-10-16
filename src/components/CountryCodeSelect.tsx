"use client";

import type { Locale } from "@/lib/i18n";
import { countries, countryName, flagEmoji } from "@/lib/countries";

/**
 * Country dialing-code dropdown. Native <select> for reliable mobile
 * keyboards, each option showing flag + dial code + localized name.
 */
export default function CountryCodeSelect({
  id,
  value,
  onChange,
  locale,
  placeholder,
  invalid,
  describedBy,
}: {
  id: string;
  value: string;
  onChange: (code: string) => void;
  locale: Locale;
  placeholder: string;
  invalid?: boolean;
  describedBy?: string;
}) {
  const sorted = [...countries].sort((a, b) =>
    countryName(a, locale).localeCompare(countryName(b, locale)),
  );
  return (
    <select
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-invalid={invalid}
      aria-describedby={describedBy}
      className="min-h-11 w-full rounded-xl border border-bark/25 bg-cream px-2 text-[15px] text-bark aria-[invalid=true]:border-red-700 sm:max-w-44"
    >
      <option value="">{placeholder}</option>
      {sorted.map((c) => (
        <option key={`${c.c}-${c.d}`} value={`+${c.d}`}>
          {flagEmoji(c.c)} +{c.d} · {countryName(c, locale)}
        </option>
      ))}
    </select>
  );
}
