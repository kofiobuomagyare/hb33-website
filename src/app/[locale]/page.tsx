import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck, FileCheck2, Ship } from "lucide-react";
import { getDictionary } from "@/lib/dictionaries";
import { isLocale, localizedPath, type Locale } from "@/lib/i18n";
import { languageAlternates } from "@/lib/i18n";
import { site } from "@/lib/site";
import { siteImages } from "@/lib/images";
import { socialMetadata } from "@/lib/seo";
import { getProduct, t } from "@/lib/products";
import { Eyebrow, MoqBadge, QuoteCtaBand, SectionHeading, btnPrimary } from "@/components/ui";
import Reveal from "@/components/Reveal";
import ProductCard from "@/components/ProductCard";
import FaqList from "@/components/FaqList";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  const path = `/${locale}`;
  const social = socialMetadata(path, dict.meta.homeTitle, dict.meta.homeDescription);
  return {
    title: dict.meta.homeTitle,
    description: dict.meta.homeDescription,
    alternates: {
      canonical: `${site.url}${path}`,
      languages: languageAlternates(""),
    },
    ...social,
  };
}

export const instant = false;

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) return null;
  const dict = getDictionary(locale as Locale);
  const L = (href: string) => localizedPath(locale as Locale, href);

  const featuredSlugs = ["cocoa-beans", "cocoa-bean-shells", "soybeans", "cocopeat"];
  const featured = featuredSlugs.flatMap((s) => {
    const p = getProduct(s);
    return p ? [p] : [];
  });

  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "HB33",
    description: dict.meta.homeDescription,
    url: `${site.url}/${locale}`,
    email: site.email,
    areaServed: "Worldwide",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />

      {/* Hero — full-bleed harvest panel */}
      <section className="container-x pt-6 md:pt-8">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-espresso text-center text-cream">
          <Image
            src={siteImages.hero.src}
            alt={t(siteImages.hero.alt, locale as Locale)}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div aria-hidden className="absolute inset-0 bg-espresso/60" />
          <div aria-hidden className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-espresso/80 to-transparent" />
          <div className="relative px-6 py-16 sm:px-12 md:py-24">
            <Eyebrow className="eyebrow-light">{dict.hero.eyebrow}</Eyebrow>
            <h1 className="font-display mx-auto mt-5 max-w-3xl text-[2.6rem] leading-[1.05] font-semibold text-balance sm:text-6xl md:text-7xl">
              {dict.hero.title}
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-cream/85 sm:text-lg">
              {dict.hero.lead}
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href={L("/products")} className="btn-light">
                {dict.hero.primary}
                <ArrowRight className="size-4" aria-hidden />
              </Link>
              <Link href={L("/request-quote")} className="btn-outline-light">
                {dict.hero.secondary}
              </Link>
            </div>
            <dl className="mx-auto mt-10 flex max-w-3xl flex-wrap justify-center gap-2.5">
              {dict.hero.stats.map((s) => (
                <div
                  key={s.label}
                  className="flex items-center gap-2.5 rounded-full border border-cream/20 bg-cream/10 px-5 py-2.5 backdrop-blur-sm"
                >
                  <dd className="font-display text-lg font-bold">{s.value}</dd>
                  <dt className="text-xs text-cream/75">{s.label}</dt>
                </div>
              ))}
            </dl>
          </div>
          <div className="absolute bottom-5 start-5 hidden sm:block">
            <MoqBadge label={dict.moq.badge} />
          </div>
        </div>
        <p className="mt-3 text-center text-xs text-ink-muted sm:hidden">
          {dict.moq.short}
        </p>
      </section>

      {/* Trust pillars */}
      <section aria-labelledby="why-hb33" className="container-x py-14 md:py-20">
        <Reveal variant="fade">
          <SectionHeading eyebrow={dict.trust.eyebrow} title={dict.trust.title} />
        </Reveal>
        <Reveal delay={120}>
          <ol className="mt-10 grid gap-5 md:grid-cols-3">
            {dict.trust.items.map((item, i) => (
              <li key={item.title} className="card-warm p-7 transition-transform duration-300 hover:-translate-y-1">
              <p aria-hidden className="font-display text-sm font-extrabold tracking-widest text-clay-deep">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="font-display mt-3 text-[1.4rem] leading-snug font-semibold text-bark">
                {item.title}
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed text-ink-muted">{item.text}</p>
            </li>
            ))}
          </ol>
        </Reveal>
      </section>

      {/* Featured products */}
      <section aria-labelledby="featured-products" className="bg-latte/40">
        <div className="container-x py-14 md:py-20">
          <Reveal variant="fade">
            <SectionHeading
              eyebrow={dict.homeProducts.eyebrow}
              title={dict.homeProducts.title}
              lead={dict.homeProducts.lead}
            />
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((p, i) => (
              <ProductCard key={p.slug} product={p} locale={locale as Locale} dict={dict} revealDelay={(i % 4) * 70} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href={L("/products")} className={btnPrimary}>
              {dict.homeProducts.cta}
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      {/* Process preview */}
      <section aria-labelledby="process-preview" className="container-x py-14 md:py-20">
        <Reveal variant="scale">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-espresso px-6 py-12 text-cream sm:px-12 md:py-16">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-24 end-0 h-72 w-72 rounded-full bg-cocoa/60 blur-3xl"
          />
          <SectionHeading
            dark
            eyebrow={dict.processPreview.eyebrow}
            title={dict.processPreview.title}
          />
          <ol className="relative mx-auto mt-10 grid max-w-4xl gap-4 md:grid-cols-3">
            {dict.processPreview.steps.map((s, i) => (
              <li key={s.title} className="rounded-3xl border border-cream/15 bg-cream/5 p-6 text-start">
                <p aria-hidden className="font-display text-sm font-extrabold tracking-widest text-sand">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-2.5 text-lg font-semibold">{s.title}</h3>
                <p className="mt-1.5 text-[15px] leading-relaxed text-cream/75">{s.text}</p>
              </li>
            ))}
          </ol>
          <div className="relative mt-9 text-center">
            <Link href={L("/how-it-works")} className="btn-light">
              {dict.processPreview.cta}
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
          </div>
        </Reveal>
      </section>

      {/* Logistics */}
      <section aria-labelledby="logistics" className="container-x pb-14 md:pb-20">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <Reveal>
            <figure className="relative">
            <div className="overflow-hidden rounded-[2rem] border border-line">
              <Image
                src={siteImages.logistics.src}
                alt={t(siteImages.logistics.alt, locale as Locale)}
                width={1200}
                height={800}
                loading="lazy"
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
            <div className="absolute bottom-4 start-4">
              <MoqBadge label={dict.moq.badge} />
            </div>
            </figure>
          </Reveal>
          <Reveal delay={120}>
            <div>
            <SectionHeading
              align="left"
              eyebrow={dict.logistics.eyebrow}
              title={dict.logistics.title}
            />
            <ul className="mt-8 space-y-4">
              {dict.logistics.items.map((item) => (
                <li key={item.title} className="card-warm flex gap-4 p-5 transition-transform duration-300 hover:-translate-y-1">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-bark text-cream">
                    {item.title.toLowerCase().includes("container") || item.title.toLowerCase().includes("conteneur") ? (
                      <Ship className="size-5" aria-hidden />
                    ) : item.title.toLowerCase().includes("paper") || item.title.toLowerCase().includes("document") ? (
                      <FileCheck2 className="size-5" aria-hidden />
                    ) : (
                      <BadgeCheck className="size-5" aria-hidden />
                    )}
                  </span>
                  <span>
                    <h3 className="font-display text-lg font-semibold text-bark">{item.title}</h3>
                    <p className="mt-1 text-[15px] leading-relaxed text-ink-muted">{item.text}</p>
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-ink-muted">{dict.common.tonnageNote}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ preview */}
      <section aria-labelledby="home-faq" className="bg-parchment/60">
        <div className="container-x grid gap-10 py-14 md:py-20 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <Reveal>
            <div className="lg:sticky lg:top-32">
            <SectionHeading
              align="left"
              eyebrow={dict.faqPreview.eyebrow}
              title={dict.faqPreview.title}
            />
            <Link
              href={L("/how-it-works")}
              className="btn-outline mt-6"
            >
              {dict.faqPreview.cta}
              <ArrowRight className="size-4" aria-hidden />
            </Link>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="card-warm px-6 py-2 sm:px-8">
              <FaqList faqs={dict.homeFaqs} />
            </div>
          </Reveal>
        </div>
      </section>

      <div className="pt-14 md:pt-20">
        <QuoteCtaBand
          title={dict.homeCta.title}
          primaryHref={L("/request-quote")}
          primaryLabel={dict.homeCta.primary}
          secondaryHref={L("/contact")}
          secondaryLabel={dict.homeCta.secondary}
        />
      </div>
    </>
  );
}
