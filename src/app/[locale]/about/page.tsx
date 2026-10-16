import type { Metadata } from "next";
import Image from "next/image";
import { isLocale, languageAlternates, localizedPath, type Locale } from "@/lib/i18n";
import { socialMetadata } from "@/lib/seo";
import { getDictionary } from "@/lib/dictionaries";
import { site } from "@/lib/site";
import { siteImages } from "@/lib/images";
import { t } from "@/lib/products";
import { Eyebrow, QuoteCtaBand, SectionHeading } from "@/components/ui";
import Reveal from "@/components/Reveal";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  const social = socialMetadata(`/${locale}/about`, dict.meta.aboutTitle, dict.meta.aboutDescription);
  return {
    title: dict.meta.aboutTitle,
    description: dict.meta.aboutDescription,
    alternates: {
      canonical: `${site.url}/${locale}/about`,
      languages: languageAlternates("/about"),
    },
    ...social,
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) return null;
  const dict = getDictionary(locale as Locale);
  const a = dict.aboutPage;
  const L = (href: string) => localizedPath(locale as Locale, href);

  return (
    <>
      <div className="container-x py-10 md:py-14">
        <Eyebrow>{a.eyebrow}</Eyebrow>
        <h1 className="font-display mt-3 max-w-3xl text-4xl leading-tight font-semibold text-balance text-bark sm:text-5xl">
          {a.title}
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-muted">{a.lead}</p>
      </div>

      <div className="container-x grid gap-10 pb-14 lg:grid-cols-2">
        <section aria-labelledby="our-story">
          <h2 id="our-story" className="font-display text-2xl font-semibold text-bark">
            {a.storyTitle}
          </h2>
          <div className="mt-4 space-y-4">
            {a.story.map((p, i) => (
              <p key={i} className="text-[15px] leading-relaxed text-ink-muted">
                {p}
              </p>
            ))}
          </div>
        </section>
        <figure>
          <div className="overflow-hidden rounded-[2rem] border border-line bg-parchment p-2">
            <Image
              src={siteImages.about.src}
              alt={t(siteImages.about.alt, locale as Locale)}
              width={1200}
              height={800}
              loading="lazy"
              className="aspect-[3/2] w-full rounded-[1.5rem] object-cover"
            />
          </div>
          <figcaption className="mt-2 text-xs text-ink-muted">
            {t(siteImages.about.alt, locale as Locale)} · Photo:{" "}
            <a
              href={siteImages.about.creditUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2"
            >
              {siteImages.about.credit}
            </a>{" "}
            ({siteImages.about.license})
          </figcaption>
        </figure>
      </div>

      <div className="border-y border-line bg-parchment/50">
        <div className="container-x py-14">
          <Reveal variant="fade">
            <SectionHeading eyebrow={a.eyebrow} title={a.valuesTitle} />
          </Reveal>
          <Reveal delay={120}>
            <ul className="mt-8 grid gap-8 md:grid-cols-3">
            {a.values.map((v, i) => (
              <li key={v.title} className="border-t-2 border-cocoa pt-5">
                <p aria-hidden className="font-display text-sm font-bold text-clay-deep">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="font-display mt-2 text-xl font-semibold text-bark">{v.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-muted">{v.text}</p>
              </li>
            ))}
            </ul>
          </Reveal>
        </div>
      </div>

      <div className="container-x py-14">
        <Reveal variant="fade">
          <SectionHeading eyebrow={a.eyebrow} title={a.factsTitle} lead={a.factsNote} />
        </Reveal>
        <Reveal delay={120}>
          <dl className="mt-8 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-5">
          {a.facts.map((fact) => (
            <div key={fact.label} className="bg-cream px-5 py-5">
              <dt className="text-xs font-bold tracking-wider text-ink-muted uppercase">
                {fact.label}
              </dt>
              <dd className="font-display mt-1.5 text-lg leading-snug font-semibold text-bark">
                {fact.value}
              </dd>
            </div>
          ))}
          </dl>
        </Reveal>
        <p className="mt-4 text-sm text-ink-muted">{dict.common.placeholderNote}</p>
      </div>

      <QuoteCtaBand
        title={a.ctaTitle}
        primaryHref={L("/request-quote")}
        primaryLabel={a.ctaPrimary}
        secondaryHref={L("/contact")}
        secondaryLabel={a.ctaSecondary}
      />
      <p className="sr-only">{a.ctaText}</p>
    </>
  );
}
