import { site } from "./site";

/**
 * Locale registry — the single source of truth for supported locales.
 *
 * To add a language later:
 *  1. Append its code to `localeCodes`.
 *  2. Add a registry entry below (code, language, native name, group,
 *     Intl tag, fallback chain, status).
 *  3. Optionally add `src/lib/dictionaries/<language>.ts` and register it
 *     in `src/lib/dictionaries.ts`. Missing keys fall back through `chain`
 *     to English automatically — no other file changes required.
 */
export const localeCodes = [
  "en",
  "en-GH",
  "en-NG",
  "fr",
  "fr-CI",
  "fr-SN",
  "ak",
  "tw",
  "fat",
  "ee",
  "gaa",
  "ig",
  "yo",
  "ha",
  "de",
  "pt",
  "sw",
  "ar",
  "ja",
  "zh-CN",
] as const;

export type Locale = (typeof localeCodes)[number];

export type LocaleGroup =
  | "global"
  | "europe"
  | "asia"
  | "middle-east"
  | "ghana"
  | "nigeria"
  | "east-africa"
  | "francophone";

export interface LocaleInfo {
  code: Locale;
  /** Base language subtag used for dictionary + content resolution. */
  language: string;
  /** Native language/region name shown in the language switcher. */
  name: string;
  group: LocaleGroup;
  /** BCP 47 tag for Intl formatting. */
  intl: string;
  dir: "ltr" | "rtl";
  /** Dictionary fallback chain, most-specific first (English implied last). */
  chain: string[];
  /** "complete" = fully translated, "starter" = core UI, rest falls back to English. */
  status: "complete" | "starter";
}

const registry: Record<Locale, Omit<LocaleInfo, "code">> = {
  en: { language: "en", name: "English", group: "global", intl: "en-US", dir: "ltr", chain: [], status: "complete" },
  "en-GH": { language: "en", name: "English (Ghana)", group: "ghana", intl: "en-GH", dir: "ltr", chain: [], status: "complete" },
  "en-NG": { language: "en", name: "English (Nigeria)", group: "nigeria", intl: "en-NG", dir: "ltr", chain: [], status: "complete" },
  fr: { language: "fr", name: "Français", group: "global", intl: "fr-FR", dir: "ltr", chain: ["fr"], status: "complete" },
  "fr-CI": { language: "fr", name: "Français (Côte d’Ivoire)", group: "francophone", intl: "fr-CI", dir: "ltr", chain: ["fr"], status: "complete" },
  "fr-SN": { language: "fr", name: "Français (Sénégal)", group: "francophone", intl: "fr-SN", dir: "ltr", chain: ["fr"], status: "complete" },
  ak: { language: "ak", name: "Akan", group: "ghana", intl: "ak-GH", dir: "ltr", chain: ["ak"], status: "starter" },
  tw: { language: "tw", name: "Twi", group: "ghana", intl: "tw-GH", dir: "ltr", chain: ["tw", "ak"], status: "starter" },
  fat: { language: "fat", name: "Fante (Mfantse)", group: "ghana", intl: "fat-GH", dir: "ltr", chain: ["fat", "ak"], status: "starter" },
  ee: { language: "ee", name: "Eʋegbe (Ewe)", group: "ghana", intl: "ee-GH", dir: "ltr", chain: ["ee"], status: "starter" },
  gaa: { language: "gaa", name: "Ga", group: "ghana", intl: "gaa-GH", dir: "ltr", chain: ["gaa"], status: "starter" },
  ig: { language: "ig", name: "Igbo", group: "nigeria", intl: "ig-NG", dir: "ltr", chain: ["ig"], status: "starter" },
  yo: { language: "yo", name: "Yorùbá", group: "nigeria", intl: "yo-NG", dir: "ltr", chain: ["yo"], status: "starter" },
  ha: { language: "ha", name: "Hausa", group: "nigeria", intl: "ha-NG", dir: "ltr", chain: ["ha"], status: "starter" },
  de: { language: "de", name: "Deutsch", group: "europe", intl: "de-DE", dir: "ltr", chain: ["de"], status: "starter" },
  pt: { language: "pt", name: "Português", group: "europe", intl: "pt-PT", dir: "ltr", chain: ["pt"], status: "starter" },
  sw: { language: "sw", name: "Kiswahili", group: "east-africa", intl: "sw-KE", dir: "ltr", chain: ["sw"], status: "starter" },
  ar: { language: "ar", name: "العربية", group: "middle-east", intl: "ar-EG", dir: "rtl", chain: ["ar"], status: "starter" },
  ja: { language: "ja", name: "日本語", group: "asia", intl: "ja-JP", dir: "ltr", chain: ["ja"], status: "starter" },
  "zh-CN": { language: "zh", name: "简体中文", group: "asia", intl: "zh-CN", dir: "ltr", chain: ["zh"], status: "starter" },
};

export const localeRegistry: LocaleInfo[] = localeCodes.map((code) => ({
  code,
  ...registry[code],
}));

/** Backwards-compatible alias used for static params + sitemap generation. */
export const locales: readonly Locale[] = localeCodes;

export const defaultLocale: Locale = "en";

/** Canonicalize a locale tag (case-insensitive). Returns undefined when unsupported. */
export function normalizeLocale(input: string): Locale | undefined {
  const dash = input.indexOf("-");
  const candidate =
    dash === -1
      ? input.toLowerCase()
      : `${input.slice(0, dash).toLowerCase()}-${input.slice(dash + 1).toUpperCase()}`;
  return (localeCodes as readonly string[]).includes(candidate)
    ? (candidate as Locale)
    : undefined;
}

export function isLocale(value: string | undefined | null): value is Locale {
  return typeof value === "string" && normalizeLocale(value) !== undefined;
}

export function getLocaleInfo(code: string): LocaleInfo {
  const canonical = normalizeLocale(code);
  const found = canonical
    ? localeRegistry.find((l) => l.code === canonical)
    : undefined;
  return found ?? localeRegistry[0];
}

/** Base language subtag, e.g. "fr" for "fr-CI", "tw" for "tw". */
export function baseLanguage(code: string): string {
  return getLocaleInfo(code).language;
}

export function isFrench(code: string): boolean {
  return baseLanguage(code) === "fr";
}

/** Rewrite a locale-prefixed path to another locale, preserving the page. */
export function switchLocalePath(pathname: string, nextLocale: Locale): string {
  const segments = pathname.split("/");
  if (isLocale(segments[1])) {
    segments[1] = nextLocale;
    return segments.join("/") || "/";
  }
  return `/${nextLocale}${pathname === "/" ? "" : pathname}`;
}

/** Strip the locale prefix to get the locale-agnostic route key. */
export function routeKey(pathname: string): string {
  const segments = pathname.split("/");
  if (isLocale(segments[1])) return "/" + segments.slice(2).join("/");
  return pathname;
}

export function localizedPath(locale: Locale, href: string): string {
  if (href.startsWith(`/${locale}/`) || href === `/${locale}`) return href;
  return `/${locale}${href === "/" ? "" : href}`;
}

/** hreflang map for every supported locale variant. */
export function languageAlternates(pathWithoutLocale: string): Record<string, string> {
  const out: Record<string, string> = {};
  for (const code of localeCodes) out[code] = `${site.url}/${code}${pathWithoutLocale}`;
  return out;
}

/** Open Graph locale tag where a standard code exists; otherwise undefined. */
export function ogLocale(code: string): string | undefined {
  switch (normalizeLocale(code)) {
    case "en":
      return "en_US";
    case "en-GH":
      return "en_GH";
    case "en-NG":
      return "en_NG";
    case "fr":
    case "fr-CI":
    case "fr-SN":
      return "fr_FR";
    case "de":
      return "de_DE";
    case "pt":
      return "pt_PT";
    case "ja":
      return "ja_JP";
    case "zh-CN":
      return "zh_CN";
    case "ar":
      return "ar_AR";
    default:
      return undefined;
  }
}

/** Pick the best supported locale from an Accept-Language header value. */
export function matchPreferredLocale(header: string | null): Locale {
  if (!header) return defaultLocale;
  const tags = header
    .split(",")
    .map((part) => {
      const [tag, q] = part.trim().split(";q=");
      return { tag: (tag ?? "").trim(), q: q === undefined ? 1 : Number.parseFloat(q) };
    })
    .filter((t) => t.tag !== "" && t.tag !== "*" && !Number.isNaN(t.q))
    .sort((a, b) => b.q - a.q);
  for (const { tag } of tags) {
    const exact = normalizeLocale(tag);
    if (exact) return exact;
  }
  for (const { tag } of tags) {
    const language = tag.split("-")[0].toLowerCase();
    const found = localeRegistry.find((l) => l.language === language);
    if (found) return found.code;
  }
  return defaultLocale;
}

/** Locale-aware number formatting. */
export function formatNumber(locale: string, value: number): string {
  return new Intl.NumberFormat(getLocaleInfo(locale).intl).format(value);
}

/** Locale-aware date formatting. */
export function formatDate(locale: string, date: Date): string {
  return new Intl.DateTimeFormat(getLocaleInfo(locale).intl, {
    dateStyle: "long",
  }).format(date);
}
