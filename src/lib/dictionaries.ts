import en from "./dictionaries/en";
import fr from "./dictionaries/fr";
import ak from "./dictionaries/ak";
import tw from "./dictionaries/tw";
import fat from "./dictionaries/fat";
import ee from "./dictionaries/ee";
import gaa from "./dictionaries/gaa";
import ig from "./dictionaries/ig";
import yo from "./dictionaries/yo";
import ha from "./dictionaries/ha";
import de from "./dictionaries/de";
import pt from "./dictionaries/pt";
import sw from "./dictionaries/sw";
import ar from "./dictionaries/ar";
import ja from "./dictionaries/ja";
import zh from "./dictionaries/zh";
import type { Dictionary } from "./dictionaries/en";
import type { Patch } from "./patch";
import { mergePatch } from "./patch";
import { getLocaleInfo, type Locale } from "./i18n";

export type DictionaryPatch = Patch<Dictionary>;

/**
 * Language packs. Full dictionaries (en, fr) and incremental starter
 * patches (ak, tw, fat, ee, gaa, ig, yo, ha) share one registry — adding a
 * language means adding one file here plus a locale entry in `lib/i18n.ts`.
 */
const patches: Record<string, DictionaryPatch | undefined> = {
  fr,
  ak,
  tw,
  fat,
  ee,
  gaa,
  ig,
  yo,
  ha,
  de,
  pt,
  sw,
  ar,
  ja,
  zh,
};

const cache = new Map<string, Dictionary>();

/**
 * Resolve the full dictionary for a locale by merging its fallback chain
 * over English. Regional variants (en-GH, fr-CI, …) reuse their base
 * language pack; anything untranslated stays in English.
 */
export function getDictionary(locale: Locale): Dictionary {
  const info = getLocaleInfo(locale);
  const cached = cache.get(info.code);
  if (cached) return cached;
  let resolved: Dictionary = en;
  for (const language of [...info.chain].reverse()) {
    const patch = patches[language];
    if (patch) resolved = mergePatch<Dictionary>(resolved, patch);
  }
  cache.set(info.code, resolved);
  return resolved;
}
