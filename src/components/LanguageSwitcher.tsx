"use client";

import { usePathname, useRouter } from "next/navigation";
import { Globe } from "lucide-react";
import type { Dictionary } from "@/lib/dictionaries/en";
import {
  localeRegistry,
  switchLocalePath,
  type Locale,
  type LocaleGroup,
} from "@/lib/i18n";

const groupOrder: LocaleGroup[] = [
  "global",
  "europe",
  "asia",
  "middle-east",
  "ghana",
  "nigeria",
  "east-africa",
  "francophone",
];

/**
 * Language switcher available in the header, mobile menu and footer.
 * Groups all 14 locales by region and preserves the current page
 * (including query string, e.g. ?product= on the quote page).
 */
export default function LanguageSwitcher({
  locale,
  dict,
  id,
  className = "",
}: {
  locale: Locale;
  dict: Dictionary;
  id: string;
  className?: string;
}) {
  const pathname = usePathname() ?? "/";
  const router = useRouter();
  const groups = dict.nav.languageGroups;

  function handleChange(next: string) {
    const qs = typeof window !== "undefined" ? window.location.search : "";
    router.push(switchLocalePath(pathname, next as Locale) + qs);
  }

  return (
    <label
      className={`inline-flex min-h-11 items-center gap-2 px-3 text-sm font-semibold ${className}`}
    >
      <Globe className="size-4 shrink-0" aria-hidden />
      <span className="sr-only">{dict.nav.language}</span>
      <select
        id={id}
        value={locale}
        onChange={(e) => handleChange(e.target.value)}
        aria-label={dict.nav.language}
        className="max-w-44 cursor-pointer truncate bg-transparent py-2 pe-1 text-sm font-semibold text-inherit"
      >
        {groupOrder.map((group) => {
          const members = localeRegistry.filter((l) => l.group === group);
          if (members.length === 0) return null;
          return (
            <optgroup key={group} label={groups[group]}>
              {members.map((l) => (
                <option key={l.code} value={l.code}>
                  {l.name}
                </option>
              ))}
            </optgroup>
          );
        })}
      </select>
    </label>
  );
}
