"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { Dictionary } from "@/lib/dictionaries/en";
import type { Locale } from "@/lib/i18n";
import { localizedPath } from "@/lib/i18n";
import { t, type Product } from "@/lib/products";
import { MoqBadge } from "./ui";
import { useReveal } from "./Reveal";
import { cn } from "@/lib/utils";

export default function ProductCard({
  product,
  locale,
  dict,
  revealDelay = 0,
}: {
  product: Product;
  locale: Locale;
  dict: Dictionary;
  revealDelay?: number;
}) {
  const detailHref = localizedPath(locale, `/products/${product.slug}`);
  const quoteHref = localizedPath(locale, `/request-quote?product=${product.slug}`);
  const categoryLabel = dict.productsPage.categories[product.category];
  const { ref, shown } = useReveal();

  return (
    <article
      ref={ref}
      style={revealDelay > 0 ? { transitionDelay: `${revealDelay}ms` } : undefined}
      className={cn(
        "reveal card-warm group flex flex-col overflow-hidden p-3 transition-transform duration-200 hover:-translate-y-1",
        shown && "is-in",
      )}
    >  <Link
        href={detailHref}
        className="relative block overflow-hidden rounded-[1.25rem] bg-parchment"
        aria-label={`${dict.common.viewProduct}: ${t(product.name, locale)}`}
      >
        <Image
          src={product.image}
          alt={t(product.imageAlt, locale)}
          width={800}
          height={600}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          loading="lazy"
        />
        <span className="absolute top-3 start-3 rounded-full bg-espresso/85 px-3 py-1.5 text-[11px] font-bold tracking-[0.14em] text-cream uppercase backdrop-blur-sm">
          {categoryLabel}
        </span>
      </Link>
      <div className="flex flex-1 flex-col px-2 pt-4 pb-2">
        <MoqBadge label={dict.moq.badge} className="self-start" />
        <h3 className="font-display mt-2.5 text-[1.35rem] leading-snug font-semibold text-bark">
          <Link href={detailHref} className="underline-offset-4 hover:underline">
            {t(product.name, locale)}
          </Link>
        </h3>
        <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-ink-muted">
          {t(product.tagline, locale)}
        </p>
        <div className="mt-4 flex items-center gap-2 pt-1">
          <Link
            href={quoteHref}
            className="btn-primary min-h-10 flex-1 px-4 py-2.5 text-[13px]"
          >
            {dict.productsPage.quoteAction}
            <ArrowRight className="size-4" aria-hidden />
          </Link>
          <Link
            href={detailHref}
            aria-label={`${dict.common.viewProduct}: ${t(product.name, locale)}`}
            className="btn-outline btn-icon min-h-10"
          >
            <ArrowUpRight className="size-4" aria-hidden />
          </Link>
        </div>
      </div>
    </article>
  );
}
