"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Check, Loader2, MapPin, Search, X } from "lucide-react";
import type { Dictionary } from "@/lib/dictionaries/en";
import type { Locale } from "@/lib/i18n";
import type {
  LocationSearchResponse,
  LocationSuggestion,
} from "@/lib/location-types";
import { flagEmoji } from "@/lib/locations";
import { cn } from "@/lib/utils";

const inputCls =
  "min-h-11 w-full rounded-xl border border-bark/25 bg-cream py-2.5 ps-10 pe-10 text-[15px] text-bark placeholder:text-ink-muted/70 aria-[invalid=true]:border-red-700";

export default function DestinationCombobox({
  id,
  value,
  selected,
  onChange,
  onSelect,
  locale,
  dict,
  invalid = false,
  placeholder,
}: {
  id: string;
  value: string;
  selected: LocationSuggestion | null;
  onChange: (value: string) => void;
  onSelect: (location: LocationSuggestion | null) => void;
  locale: Locale;
  dict: Dictionary;
  invalid?: boolean;
  placeholder?: string;
}) {
  const t = dict.locations;
  const listId = useId();
  const wrapRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<LocationSuggestion[]>([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [error, setError] = useState<string | null>(null);
  const [degraded, setDegraded] = useState(false);
  const [popularLoaded, setPopularLoaded] = useState(false);

  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      if (!wrapRef.current?.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, []);

  useEffect(() => {
    if (!open) return;
    const trimmed = value.trim();
    if (trimmed.length === 1) return;

    const controller = new AbortController();
    const timer = window.setTimeout(async () => {
      setLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams({ q: trimmed, locale, limit: "10" });
        const res = await fetch(`/api/locations?${params.toString()}`, {
          signal: controller.signal,
          headers: { Accept: "application/json" },
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = (await res.json()) as LocationSearchResponse;
        setResults(json.results ?? []);
        setDegraded(Boolean(json.degraded));
        setActiveIndex(json.results?.length ? 0 : -1);
        if (!trimmed) setPopularLoaded(true);
      } catch (err) {
        if ((err as Error).name === "AbortError") return;
        setResults([]);
        setDegraded(false);
        setError(t.error);
      } finally {
        setLoading(false);
      }
    }, trimmed ? 260 : 0);

    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [open, value, locale, t.error]);

  // The input is fully controlled by the form. One-character queries simply
  // show nothing until the second character arrives; no state is written
  // synchronously inside the effect above.
  const visibleResults = value.trim().length === 1 ? [] : results;
  const showCustom = open && value.trim().length >= 2 && !loading;
  const optionCount = visibleResults.length + (showCustom ? 1 : 0);

  function choose(location: LocationSuggestion) {
    onChange(location.label);
    onSelect(location);
    setOpen(false);
    setActiveIndex(-1);
  }

  function chooseCustom() {
    onSelect(null);
    setOpen(false);
    setActiveIndex(-1);
  }

  function clear() {
    onChange("");
    onSelect(null);
    setResults([]);
    setOpen(false);
    setActiveIndex(-1);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setOpen(true);
      setActiveIndex((index) => {
        if (!optionCount) return -1;
        return index < 0 ? 0 : Math.min(index + 1, optionCount - 1);
      });
      return;
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      setOpen(true);
      setActiveIndex((index) => (index <= 0 ? 0 : index - 1));
      return;
    }
    if (event.key === "Escape") {
      setOpen(false);
      return;
    }
    if (event.key === "Tab") {
      setOpen(false);
      return;
    }
    if (event.key === "Enter" && open) {
      event.preventDefault();
      if (activeIndex >= 0 && activeIndex < visibleResults.length) {
        choose(visibleResults[activeIndex]);
      } else if (showCustom) {
        chooseCustom();
      }
    }
  }

  const activeOption =
    activeIndex >= 0 && activeIndex < visibleResults.length
      ? visibleResults[activeIndex]
      : undefined;
  const activeId = activeOption
    ? `${listId}-option-${activeIndex}`
    : showCustom && activeIndex === visibleResults.length
      ? `${listId}-custom`
      : undefined;

  return (
    <div ref={wrapRef} className="relative">
      <MapPin
        className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-clay-deep"
        aria-hidden
      />
      <input
        id={id}
        role="combobox"
        aria-autocomplete="list"
        aria-expanded={open}
        aria-controls={listId}
        aria-activedescendant={activeId}
        aria-invalid={invalid}
        autoComplete="off"
        spellCheck={false}
        className={inputCls}
        value={value}
        placeholder={placeholder ?? t.searchPlaceholder}
        onChange={(event) => {
          onChange(event.target.value);
          if (selected) onSelect(null);
          setOpen(true);
        }}
        onFocus={() => {
          setOpen(true);
          if (!popularLoaded) setPopularLoaded(true);
        }}
        onKeyDown={handleKeyDown}
      />
      <span className="absolute end-2 top-1/2 flex -translate-y-1/2 items-center gap-1">
        {loading ? (
          <Loader2 className="size-4 animate-spin text-clay-deep" aria-hidden />
        ) : value ? (
          <button
            type="button"
            onClick={clear}
            className="inline-flex size-7 items-center justify-center rounded-full text-ink-muted hover:bg-parchment hover:text-bark"
            aria-label={t.clear}
          >
            <X className="size-4" aria-hidden />
          </button>
        ) : null}
      </span>

      <span className="sr-only" aria-live="polite">
        {loading ? t.loading : visibleResults.length ? `${visibleResults.length} locations found` : ""}
      </span>

      {open ? (
        <div className="absolute inset-x-0 top-[calc(100%+0.35rem)] z-40 overflow-hidden rounded-2xl border border-line bg-cream shadow-2xl shadow-espresso/20">
          {!value.trim() ? (
            <p className="border-b border-line/70 px-4 py-2 text-[11px] font-bold tracking-wider text-ink-muted uppercase">
              {t.popular}
            </p>
          ) : null}

          {degraded ? (
            <p className="border-b border-gold/40 bg-parchment/70 px-4 py-2 text-xs text-bark/80">
              {t.degraded}
            </p>
          ) : null}

          <ul
            id={listId}
            role="listbox"
            aria-label={t.searchLabel}
            className="max-h-[min(19rem,52vh)] overflow-y-auto overscroll-contain py-1"
          >
            {visibleResults.map((location, index) => (
              <li
                key={location.id}
                role="option"
                aria-selected={activeIndex === index}
                id={`${listId}-option-${index}`}
                tabIndex={-1}
                onMouseDown={(event) => event.preventDefault()}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => choose(location)}
                className={cn(
                  "flex cursor-pointer items-start gap-2.5 px-3 py-2.5 text-start transition-colors",
                  activeIndex === index ? "bg-parchment" : "hover:bg-parchment/70",
                )}
              >
                <span className="mt-0.5 text-base leading-none" aria-hidden>
                  {flagEmoji(location.countryCode) ?? <Search className="size-4 text-clay-deep" />}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex flex-wrap items-center gap-1.5">
                    <span className="truncate text-sm font-semibold text-bark">{location.name}</span>
                    <span className="rounded-full border border-clay/30 bg-cream px-1.5 py-0.5 text-[9px] font-bold tracking-wide text-clay-deep uppercase">
                      {t.types[location.type]}
                    </span>
                    {location.code ? (
                      <span className="font-mono text-[10px] text-ink-muted">{location.code}</span>
                    ) : null}
                  </span>
                  <span className="mt-0.5 line-clamp-1 text-xs text-ink-muted">
                    {[location.city, location.region, location.country]
                      .filter(Boolean)
                      .filter((part, index, all) => all.indexOf(part) === index)
                      .join(" · ")}
                  </span>
                </span>
                {selected?.id === location.id ? (
                  <Check className="mt-1 size-4 shrink-0 text-leaf" aria-hidden />
                ) : null}
              </li>
            ))}

            {showCustom ? (
              <li
                role="option"
                aria-selected={activeIndex === visibleResults.length}
                id={`${listId}-custom`}
                tabIndex={-1}
                onMouseDown={(event) => event.preventDefault()}
                onMouseEnter={() => setActiveIndex(visibleResults.length)}
                onClick={chooseCustom}
                className={cn(
                  "flex cursor-pointer items-start gap-2.5 border-t border-line/70 px-3 py-2.5 text-start transition-colors",
                  activeIndex === visibleResults.length ? "bg-parchment" : "hover:bg-parchment/70",
                )}
              >
                <MapPin className="mt-0.5 size-4 shrink-0 text-clay-deep" aria-hidden />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-semibold text-bark">
                    {t.useCustom.replace("{value}", value.trim())}
                  </span>
                  <span className="mt-0.5 block text-xs text-ink-muted">{t.custom}</span>
                </span>
              </li>
            ) : null}
          </ul>

          {!loading && visibleResults.length === 0 && !error && value.trim().length >= 2 ? (
            <div className="px-4 py-4 text-sm text-ink-muted">
              <p className="font-semibold text-bark">{t.noResults}</p>
              <p className="mt-1 text-xs">{t.noResultsHint}</p>
            </div>
          ) : null}

          {!loading && value.trim().length === 1 ? (
            <p className="px-4 py-3 text-xs text-ink-muted">{t.hint}</p>
          ) : null}

          {error ? (
            <p className="border-t border-red-800/20 bg-red-50 px-4 py-2 text-xs font-medium text-red-900" role="alert">
              {error}
            </p>
          ) : null}
        </div>
      ) : null}

      {!open || !value.trim() ? (
        <p className="mt-1 text-xs text-ink-muted">{t.hint}</p>
      ) : null}
    </div>
  );
}
