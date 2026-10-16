"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { getDictionary } from "@/lib/dictionaries";
import { isLocale, localizedPath, normalizeLocale, type Locale } from "@/lib/i18n";
import { Eyebrow } from "@/components/ui";

export default function LocaleNotFound() {
  const params = useParams();
  const raw = params?.locale;
  const normalized =
    typeof raw === "string" ? normalizeLocale(raw) : undefined;
  const safe: Locale = normalized && isLocale(normalized) ? normalized : "en";
  const dict = getDictionary(safe);
  const n = dict.notFound;

  return (
    <div className="container-x max-w-2xl py-16 text-center md:py-24">
      <Eyebrow className="justify-center">{n.eyebrow}</Eyebrow>
      <h1 className="font-display mx-auto mt-4 max-w-xl text-4xl leading-tight font-semibold text-balance text-bark sm:text-5xl">
        {n.title}
      </h1>
      <p className="mx-auto mt-4 max-w-md text-lg text-ink-muted">{n.text}</p>
      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <Link
          href={localizedPath(safe, "/")}
          className="btn-primary"
        >
          {n.home}
        </Link>
        <Link
          href={localizedPath(safe, "/products")}
          className="btn-outline"
        >
          {n.products}
        </Link>
      </div>
    </div>
  );
}
