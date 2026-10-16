"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import type { Dictionary } from "@/lib/dictionaries/en";
import type { Locale } from "@/lib/i18n";
import { localizedPath } from "@/lib/i18n";
import { t, type Category, type Product } from "@/lib/products";
import ProductCard from "./ProductCard";

type SortKey = "featured" | "nameAsc" | "nameDesc";

export default function ProductCatalog({
  products,
  locale,
  dict,
}: {
  products: Product[];
  locale: Locale;
  dict: Dictionary;
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<"all" | Category>("all");
  const [sort, setSort] = useState<SortKey>("featured");
  const d = dict.productsPage;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = products.filter((p) => {
      const matchesCategory = category === "all" || p.category === category;
      if (!matchesCategory) return false;
      if (!q) return true;
      const haystack = [
        t(p.name, locale),
        t(p.tagline, locale),
        ...p.overview.map((o) => t(o, locale)),
      ]
        .join(" ")
        .toLowerCase();
      return q.split(/\s+/).every((word) => haystack.includes(word));
    });
    list = [...list].sort((a, b) => {
      if (sort === "nameAsc") return t(a.name, locale).localeCompare(t(b.name, locale));
      if (sort === "nameDesc") return t(b.name, locale).localeCompare(t(a.name, locale));
      return Number(b.featured ?? false) - Number(a.featured ?? false);
    });
    return list;
  }, [products, query, category, sort, locale]);

  return (
    <div>
      <div className="card-warm grid gap-4 p-4 sm:p-5 lg:grid-cols-[1fr_auto_auto] lg:items-end">
        <div>
          <label htmlFor="product-search" className="text-xs font-bold tracking-wider text-ink-muted uppercase">
            {d.searchLabel}
          </label>
          <div className="relative mt-1.5">
            <Search className="pointer-events-none absolute top-1/2 start-3 size-4 -translate-y-1/2 text-ink-muted" aria-hidden />
            <input
              id="product-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={d.searchPlaceholder}
              className="min-h-11 w-full rounded-xl border border-bark/25 bg-cream pe-3 ps-10 text-[15px] text-bark placeholder:text-ink-muted/70"
            />
          </div>
        </div>
        <div>
          <label htmlFor="category-filter" className="text-xs font-bold tracking-wider text-ink-muted uppercase">
            {d.categoryLabel}
          </label>
          <select
            id="category-filter"
            value={category}
            onChange={(e) => setCategory(e.target.value as "all" | Category)}
            className="mt-1.5 min-h-11 w-full rounded-xl border border-bark/25 bg-cream px-3 text-[15px] text-bark lg:w-52"
          >
            <option value="all">{d.allCategories}</option>
            <option value="cocoa">{d.categories.cocoa}</option>
            <option value="oilseeds">{d.categories.oilseeds}</option>
            <option value="growing-media">{d.categories["growing-media"]}</option>
          </select>
        </div>
        <div>
          <label htmlFor="sort" className="text-xs font-bold tracking-wider text-ink-muted uppercase">
            {d.sortLabel}
          </label>
          <select
            id="sort"
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="mt-1.5 min-h-11 w-full rounded-xl border border-bark/25 bg-cream px-3 text-[15px] text-bark lg:w-44"
          >
            <option value="featured">{d.sortOptions.featured}</option>
            <option value="nameAsc">{d.sortOptions.nameAsc}</option>
            <option value="nameDesc">{d.sortOptions.nameDesc}</option>
          </select>
        </div>
      </div>

      <p className="mt-6 text-sm text-ink-muted" role="status" aria-live="polite">
        {d.showing} {filtered.length} {filtered.length === 1 ? d.result : d.results}
      </p>

      {filtered.length > 0 ? (
        <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p, i) => (
            <ProductCard key={p.slug} product={p} locale={locale} dict={dict} revealDelay={(i % 6) * 60} />
          ))}
        </div>
      ) : (
        <div className="card-warm mt-4 p-10 text-center">
          <h2 className="font-display text-2xl font-semibold text-bark">{d.emptyTitle}</h2>
          <p className="mx-auto mt-2 max-w-md text-[15px] text-ink-muted">{d.emptyText}</p>
          <Link
            href={localizedPath(locale, "/request-quote")}
            className="btn-primary mt-6"
          >
            {d.emptyCta}
          </Link>
        </div>
      )}

    </div>
  );
}
