import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle2, MessageCircle } from "lucide-react";
import { getDictionary } from "@/lib/dictionaries";
import { isLocale, languageAlternates, localizedPath, type Locale } from "@/lib/i18n";
import { site, whatsappConfigured, whatsappLink } from "@/lib/site";
import { getProduct, productSlugs, relatedProducts, t } from "@/lib/products";
import { isFrench, locales } from "@/lib/i18n";
import { Eyebrow, MoqBadge, MoqNotice } from "@/components/ui";
import Reveal from "@/components/Reveal";
import ProductCard from "@/components/ProductCard";
import FaqList from "@/components/FaqList";

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    productSlugs.map((slug) => ({ locale, slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const product = getProduct(slug);
  if (!product) return {};
  const path = `/${locale}/products/${slug}`;
  const title = `${t(product.name, locale)} — Bulk ${t(product.name, locale)} | HB33`;
  const description = `${t(product.tagline, locale)} ${t(product.overview[0], locale).slice(0, 120)}…`;
  return {
    title,
    description,
    alternates: {
      canonical: `${site.url}${path}`,
      languages: languageAlternates(`/products/${slug}`),
    },
    openGraph: {
      title,
      description,
      url: `${site.url}${path}`,
      images: [{ url: product.image, alt: t(product.imageAlt, locale) }],
    },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const product = getProduct(slug);
  if (!product) notFound();
  const dict = getDictionary(locale as Locale);
  const d = dict.productDetail;
  const L = (href: string) => localizedPath(locale as Locale, href);
  const related = relatedProducts(slug, 3);
  const quoteHref = L(`/request-quote?product=${product.slug}`);

  const waMessage =
    isFrench(locale)
      ? `Bonjour HB33, je souhaite un devis en vrac pour : ${t(product.name, locale as Locale)} (quantité : 1 conteneur minimum).`
      : `Hello HB33, I'd like a bulk quote for: ${t(product.name, locale as Locale)} (quantity: 1 container minimum).`;
  const waHref = whatsappLink(waMessage);

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `HB33 ${t(product.name, locale as Locale)}`,
    description: t(product.overview[0], locale as Locale),
    image: product.image,
    brand: { "@type": "Brand", name: "HB33" },
  };

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="container-x pt-6">
        <ol className="flex flex-wrap items-center gap-2 text-sm text-ink-muted">
          <li>
            <Link href={L("/products")} className="font-semibold text-clay-deep underline-offset-4 hover:underline">
              {dict.nav.products}
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li aria-current="page" className="text-bark">
            {t(product.name, locale as Locale)}
          </li>
        </ol>
      </nav>

      {/* Header split */}
      <div className="container-x grid gap-10 py-8 lg:grid-cols-2">
        <figure>
          <div className="overflow-hidden rounded-[2rem] border border-line bg-parchment p-2">
            <Image
              src={product.image}
              alt={t(product.imageAlt, locale as Locale)}
              width={1200}
              height={900}
              priority
              className="aspect-[4/3] w-full rounded-[1.5rem] object-cover"
            />
          </div>
          <figcaption className="mt-2 text-xs text-ink-muted">
            {t(product.imageAlt, locale as Locale)} · Photo:{" "}
            <a
              href={product.creditUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2"
            >
              {product.credit}
            </a>{" "}
            ({product.license})
          </figcaption>
        </figure>

        <div>
          <div className="flex flex-wrap items-center gap-2">
            <Eyebrow>{dict.productsPage.categories[product.category]}</Eyebrow>
            <MoqBadge label={dict.moq.badge} />
          </div>
          <h1 className="font-display mt-3 text-4xl leading-tight font-semibold text-bark sm:text-5xl">
            {t(product.name, locale as Locale)}
          </h1>
          <p className="mt-3 text-lg leading-relaxed text-ink-muted">
            {t(product.tagline, locale as Locale)}
          </p>
          <div className="mt-5 space-y-4">
            {product.overview.map((p, i) => (
              <p key={i} className="text-[15px] leading-relaxed text-ink-muted">
                {t(p, locale as Locale)}
              </p>
            ))}
          </div>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link
              href={quoteHref}
              className="btn-primary min-h-12 flex-1 text-base"
            >
              {d.quoteButton}
              <ArrowRight className="size-4" aria-hidden />
            </Link>
            {whatsappConfigured && waHref ? (
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline min-h-12 flex-1 text-base"
              >
                <MessageCircle className="size-4" aria-hidden />
                {d.whatsappButton}
              </a>
            ) : null}
          </div>
          {!whatsappConfigured ? (
            <p className="mt-3 text-xs text-ink-muted">{d.whatsappUnavailable}</p>
          ) : null}
        </div>
      </div>

      <div className="container-x">
        <MoqNotice text={dict.moq.long} className="border" />
      </div>

      {/* Background & uses */}
      <div className="container-x grid gap-10 py-12 lg:grid-cols-[1.1fr_0.9fr]">
        <section aria-labelledby="pd-background">
          <h2 id="pd-background" className="font-display text-2xl font-semibold text-bark">
            {d.background}
          </h2>
          <div className="mt-4 space-y-4">
            {product.history.map((p, i) => (
              <p key={i} className="text-[15px] leading-relaxed text-ink-muted">
                {t(p, locale as Locale)}
              </p>
            ))}
          </div>
            <p className="mt-4 border-s-2 border-gold bg-parchment/60 px-3 py-2 text-sm text-ink-muted">
            {d.educationalNote}
          </p>
        </section>
        <section aria-labelledby="pd-uses" className="border border-line bg-white/60 p-6">
          <h2 id="pd-uses" className="font-display text-2xl font-semibold text-bark">
            {d.uses}
          </h2>
          <ul className="mt-4 space-y-4">
            {product.uses.map((u) => (
              <li key={t(u.title, locale as Locale)} className="flex gap-3">
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-leaf" aria-hidden />
                <span>
                  <strong className="font-semibold text-bark">{t(u.title, locale as Locale)}</strong>
                  <span className="text-ink-muted"> — {t(u.text, locale as Locale)}</span>
                </span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* Specs + quality */}
      <div className="border-y border-line bg-parchment/50">
        <div className="container-x grid gap-10 py-12 lg:grid-cols-2">
          <section aria-labelledby="pd-specs">
            <h2 id="pd-specs" className="font-display text-2xl font-semibold text-bark">
              {d.specs}
            </h2>
            <dl className="mt-4 border-t border-line">
              {product.specs.map((s) => (
                <div key={t(s.label, locale as Locale)} className="ledger-row">
                  <dt className="text-sm font-bold text-bark">{t(s.label, locale as Locale)}</dt>
                  <dd className="text-[15px] text-ink-muted">{t(s.value, locale as Locale)}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-3 text-sm text-ink-muted">{d.specsNote}</p>
          </section>
          <div className="space-y-8">
            <section aria-labelledby="pd-quality">
              <h2 id="pd-quality" className="font-display text-2xl font-semibold text-bark">
                {d.quality}
              </h2>
              <div className="mt-4 space-y-3">
                {product.quality.map((q, i) => (
                  <p key={i} className="text-[15px] leading-relaxed text-ink-muted">
                    {t(q, locale as Locale)}
                  </p>
                ))}
              </div>
            </section>
            <section aria-labelledby="pd-packaging">
              <h2 id="pd-packaging" className="font-display text-2xl font-semibold text-bark">
                {d.packaging}
              </h2>
              <ul className="mt-4 list-disc space-y-2 ps-5 text-[15px] text-ink-muted">
                {product.packaging.map((p, i) => (
                  <li key={i}>{t(p, locale as Locale)}</li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </div>

      {/* Buyers + MOQ */}
      <div className="container-x grid gap-10 py-12 lg:grid-cols-2">
        <Reveal>
          <section aria-labelledby="pd-buyers">
          <h2 id="pd-buyers" className="font-display text-2xl font-semibold text-bark">
            {d.buyers}
          </h2>
          <ul className="mt-4 space-y-4">
            {product.buyers.map((b) => (
              <li key={t(b.title, locale as Locale)} className="border-s-2 border-clay/50 ps-4">
                <h3 className="font-semibold text-bark">{t(b.title, locale as Locale)}</h3>
                <p className="text-[15px] text-ink-muted">{t(b.text, locale as Locale)}</p>
              </li>
            ))}
            </ul>
          </section>
        </Reveal>
        <Reveal delay={120}>
          <section aria-labelledby="pd-moq" className="h-fit rounded-[2rem] border border-clay/40 bg-parchment p-6 sm:p-8">
          <h2 id="pd-moq" className="font-display text-2xl font-semibold text-bark">
            {d.moqTitle}
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-bark">{dict.moq.long}</p>
          <p className="mt-2 text-sm text-ink-muted">{dict.common.tonnageNote}</p>
          <Link
            href={quoteHref}
            className="btn-primary mt-5 w-full text-base"
          >
            {d.quoteCta}
            <ArrowRight className="size-4" aria-hidden />
          </Link>
          </section>
        </Reveal>
      </div>

      {/* FAQ */}
      <div className="container-x pb-12">
        <Reveal>
          <h2 className="font-display text-2xl font-semibold text-bark">{d.faq}</h2>
          <div className="mt-4 max-w-3xl">
            <FaqList
              faqs={product.faqs.map((f) => ({
                q: t(f.q, locale as Locale),
                a: t(f.a, locale as Locale),
              }))}
            />
          </div>
        </Reveal>
      </div>

      {/* Related */}
      <div className="border-t border-line bg-parchment/50">
        <div className="container-x py-12">
          <div className="flex items-center justify-between gap-4">
            <h2 className="font-display text-2xl font-semibold text-bark">
              {dict.common.relatedProducts}
            </h2>
            <Link
              href={L("/products")}
              className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-clay-deep underline underline-offset-4 hover:text-bark"
            >
              <ArrowLeft className="size-4" aria-hidden />
              {dict.common.backToProducts}
            </Link>
          </div>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p, i) => (
              <ProductCard key={p.slug} product={p} locale={locale as Locale} dict={dict} revealDelay={(i % 3) * 70} />
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
