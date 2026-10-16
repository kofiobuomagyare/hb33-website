"use client";

import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import {
  countryName,
  findCountryByName,
  flagEmoji,
  searchCountries,
} from "@/lib/countries";

/**
 * Searchable country combobox: type to filter, arrows + Enter to pick,
 * Escape to dismiss. The submitted value is the country name; matching is
 * accent-insensitive across localized + English names, ISO codes and dial codes.
 */
export default function SearchableCountrySelect({
  id,
  value,
  onChange,
  locale,
  placeholder,
  noMatchText,
  invalid,
  describedBy,
}: {
  id: string;
  /** Stored country name (English). */
  value: string;
  onChange: (name: string) => void;
  locale: Locale;
  placeholder: string;
  noMatchText: string;
  invalid?: boolean;
  describedBy?: string;
}) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [prevStored, setPrevStored] = useState(value);
  const rootRef = useRef<HTMLDivElement>(null);
  const listId = useId();
  const results = useMemo(() => searchCountries(query, locale), [query, locale]);
  const clamped = results.length === 0 ? 0 : Math.min(active, results.length - 1);

  /** What the input shows: localized name for a stored value, else raw text. */
  const displayFor = useCallback(
    (stored: string): string => {
      if (!stored) return "";
      const found = findCountryByName(stored);
      return found ? countryName(found, locale) : stored;
    },
    [locale],
  );

  // Keep the visible text in sync when the form value changes externally
  // (render-phase update, so no effect is needed).
  if (prevStored !== value) {
    setPrevStored(value);
    setQuery(displayFor(value));
  }

  // Close on outside tap/click.
  useEffect(() => {
    if (!open) return;
    function onDown(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
        setQuery(displayFor(value));
      }
    }
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open, value, displayFor]);

  function pick(name: string) {
    onChange(name);
    setQuery(displayFor(name));
    setOpen(false);
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setOpen(true);
      setActive((a) => Math.min(a + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter") {
      if (open && results[clamped]) {
        e.preventDefault();
        pick(results[clamped].en);
      }
    } else if (e.key === "Escape") {
      setOpen(false);
      setQuery(value);
    }
  }

  return (
    <div ref={rootRef} className="relative">
      <input
        id={id}
        role="combobox"
        type="text"
        autoComplete="off"
        placeholder={placeholder}
        value={query}
        aria-expanded={open}
        aria-controls={listId}
        aria-invalid={invalid}
        aria-describedby={describedBy}
        aria-activedescendant={open && results[clamped] ? `country-${results[clamped].c}` : undefined}
        onChange={(e) => {
          setQuery(e.target.value);
          setActive(0);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => {
          // Revert free text that doesn't resolve to a country.
          if (query.trim() !== "" && !findCountryByName(query)) setQuery(displayFor(value));
        }}
        onKeyDown={onKeyDown}
        className="min-h-11 w-full rounded-xl border border-bark/25 bg-cream py-2.5 pr-10 pl-3 text-[15px] text-bark placeholder:text-ink-muted/70 aria-[invalid=true]:border-red-700"
      />
      <button
        type="button"
        tabIndex={-1}
        aria-hidden
        onClick={() => setOpen((o) => !o)}
        className="absolute top-1/2 end-3 -translate-y-1/2 p-1 text-ink-muted"
      >
        <ChevronDown className="size-4" aria-hidden />
      </button>
      {open ? (
        <ul
          id={listId}
          role="listbox"
          aria-label={placeholder}
          className="absolute inset-x-0 z-30 mt-1.5 max-h-60 overflow-auto rounded-2xl border border-line bg-cream p-1.5 shadow-2xl"
        >
          {results.length === 0 ? (
            <li className="px-3 py-2.5 text-sm text-ink-muted">{noMatchText}</li>
          ) : (
            results.map((c, i) => {
              const label = countryName(c, locale);
              const selected = value !== "" && (value === c.en || value === c.fr);
              return (
                <li
                  key={`${c.c}-${c.d}`}
                  id={`country-${c.c}`}
                  role="option"
                  aria-selected={selected || i === clamped}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    pick(c.en);
                  }}
                  onMouseEnter={() => setActive(i)}
                  className={`flex min-h-11 cursor-pointer items-center gap-2.5 rounded-xl px-3 py-2 text-[15px] ${
                    i === clamped ? "bg-parchment text-bark" : "text-bark"
                  }`}
                >
                  <span aria-hidden className="text-lg leading-none">
                    {flagEmoji(c.c)}
                  </span>
                  <span className="flex-1">{label}</span>
                  <span className="text-xs font-semibold text-ink-muted">+{c.d}</span>
                  {selected ? <Check className="size-4 text-leaf" aria-hidden /> : null}
                </li>
              );
            })
          )}
        </ul>
      ) : null}
    </div>
  );
}
