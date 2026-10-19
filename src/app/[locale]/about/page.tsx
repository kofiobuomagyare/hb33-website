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
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
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
        <div className="container-x py-14 md:py-20">
          <Reveal variant="fade">
            <SectionHeading eyebrow={a.valuesEyebrow} title={a.valuesTitle} />
          </Reveal>
          <Reveal delay={120}>
            <ul className="mt-10 grid gap-6 md:grid-cols-3">
            {a.values.map((v, i) => (
              <li key={v.title} className="card-warm p-7 transition-transform duration-300 hover:-translate-y-1">
                <p aria-hidden className="font-display text-sm font-extrabold tracking-widest text-clay-deep">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="font-display mt-3 text-[1.4rem] leading-snug font-semibold text-bark">
                  {v.title}
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-muted">{v.text}</p>
              </li>
            ))}
            </ul>
          </Reveal>
        </div>
      </div>

      <section
        id="founder"
        aria-labelledby="founder-heading"
        className="bg-espresso text-cream"
      >
        <div className="container-x grid items-center gap-10 py-16 md:py-24 lg:grid-cols-12 lg:gap-12 lg:py-28">
          <Reveal variant="scale" className="lg:col-span-5">
            <figure className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] bg-bark ring-1 ring-cream/20">
              <Image
                src="/founder-hugo-obed.png"
                alt={dict.founder.imageAlt}
                width={798}
                height={624}
                sizes="(max-width: 1024px) 100vw, 42vw"
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover object-center"
              />
            </figure>
          </Reveal>
          <Reveal delay={120} className="lg:col-span-7">
            <div>
              <Eyebrow className="eyebrow-light">{dict.founder.eyebrow}</Eyebrow>
              <h2
                id="founder-heading"
                className="font-display mt-5 text-3xl leading-[1.08] font-semibold text-balance sm:text-4xl md:text-5xl"
              >
                {dict.founder.title}{" "}
                <span className="italic text-sand">{dict.founder.titleAccent}</span>
              </h2>
              <div className="mt-8 space-y-5 text-base leading-relaxed text-cream/75 md:text-lg">
                {dict.founder.paragraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
              <p className="font-display mt-8 text-xl text-sand">
                {dict.founder.name}
                <span className="mt-1 block font-sans text-sm font-normal not-italic text-cream/60">
                  {dict.founder.role}
                </span>
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <div className="container-x py-14 md:py-20">
        <Reveal variant="fade">
          <SectionHeading eyebrow={a.factsEyebrow} title={a.factsTitle} lead={a.factsNote} />
        </Reveal>
        <Reveal delay={120}>
          <dl className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-5">
          {a.facts.map((fact) => (
            <div key={fact.label} className="bg-cream px-5 py-6">
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

      <div className="pt-2 md:pt-4">
        <QuoteCtaBand
          title={a.ctaTitle}
          primaryHref={L("/request-quote")}
          primaryLabel={a.ctaPrimary}
          secondaryHref={L("/contact")}
          secondaryLabel={a.ctaSecondary}
        />
      </div>
      <p className="sr-only">{a.ctaText}</p>
    </>
  );
}
