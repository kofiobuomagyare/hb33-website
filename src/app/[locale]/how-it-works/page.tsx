import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Info } from "lucide-react";
import { isLocale, languageAlternates, localizedPath, type Locale } from "@/lib/i18n";
import { socialMetadata } from "@/lib/seo";
import { getDictionary } from "@/lib/dictionaries";
import { site } from "@/lib/site";
import { Eyebrow, MoqNotice } from "@/components/ui";
import Reveal from "@/components/Reveal";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  const social = socialMetadata(`/${locale}/how-it-works`, dict.meta.howTitle, dict.meta.howDescription);
  return {
    title: dict.meta.howTitle,
    description: dict.meta.howDescription,
    alternates: {
      canonical: `${site.url}/${locale}/how-it-works`,
      languages: languageAlternates("/how-it-works"),
    },
    ...social,
  };
}

export default async function HowItWorksPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) return null;
  const dict = getDictionary(locale as Locale);
  const h = dict.howPage;

  return (
    <div className="container-x py-10 md:py-14">
      <Eyebrow>{h.eyebrow}</Eyebrow>
      <h1 className="font-display mt-3 max-w-3xl text-4xl leading-tight font-semibold text-balance text-bark sm:text-5xl">
        {h.title}
      </h1>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-muted">{h.lead}</p>

      <MoqNotice text={dict.moq.long} className="mt-6 border" />

      <Reveal delay={100}>
        <ol className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-5 lg:gap-px lg:border lg:border-line lg:bg-line">
        {h.steps.map((step, i) => (
          <li key={step.title} className="border-t-2 border-cocoa bg-cream pt-5 lg:border-t-0 lg:p-6">
            <p aria-hidden className="font-display text-3xl font-bold text-clay-deep">
              {i + 1}
            </p>
            <h2 className="mt-2 text-lg font-semibold text-bark">{step.title}</h2>
            <p className="mt-1.5 text-[15px] leading-relaxed text-ink-muted">{step.text}</p>
          </li>
        ))}
        </ol>
      </Reveal>

      <aside aria-labelledby="how-note" className="mt-10 flex gap-3 border border-gold/50 bg-parchment p-5">
        <Info className="size-5 shrink-0 text-clay-deep" aria-hidden />
        <div>
          <h2 id="how-note" className="font-semibold text-bark">
            {h.noteTitle}
          </h2>
          <p className="mt-1 text-[15px] leading-relaxed text-ink-muted">{h.noteText}</p>
        </div>
      </aside>

      <Link
        href={localizedPath(locale as Locale, "/request-quote")}
        className="btn-primary mt-8"
      >
        {h.cta}
        <ArrowRight className="size-4" aria-hidden />
      </Link>
    </div>
  );
}
