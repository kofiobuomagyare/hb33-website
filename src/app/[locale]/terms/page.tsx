import type { Metadata } from "next";
import { isLocale, languageAlternates, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import { site } from "@/lib/site";
import { socialMetadata } from "@/lib/seo";
import { Eyebrow, MoqNotice } from "@/components/ui";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  const social = socialMetadata(`/${locale}/terms`, dict.meta.termsTitle, dict.meta.termsDescription);
  return {
    title: dict.meta.termsTitle,
    description: dict.meta.termsDescription,
    alternates: {
      canonical: `${site.url}/${locale}/terms`,
      languages: languageAlternates("/terms"),
    },
    ...social,
  };
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) return null;
  const dict = getDictionary(locale as Locale);
  const page = dict.termsPage;

  return (
    <div className="container-x max-w-3xl py-10 md:py-14">
      <Eyebrow>{page.eyebrow}</Eyebrow>
      <h1 className="font-display mt-3 text-4xl leading-tight font-semibold text-bark sm:text-5xl">
        {page.title}
      </h1>
      <p className="mt-3 text-sm text-ink-muted">
        {page.updated}: {locale === "fr" ? "1er octobre 2026" : "October 1, 2026"}
      </p>
      <p className="mt-5 text-lg leading-relaxed text-ink-muted">{page.intro}</p>
      <MoqNotice text={dict.moq.long} className="mt-6 border" />
      <div className="mt-8 space-y-8">
        {page.sections.map((s) => (
          <section key={s.title} aria-labelledby={s.title}>
            <h2 id={s.title} className="font-display border-t border-line pt-5 text-2xl font-semibold text-bark">
              {s.title}
            </h2>
            <p className="mt-2 text-[15px] leading-relaxed text-ink-muted">{s.text}</p>
          </section>
        ))}
      </div>
      <p className="mt-8 text-sm text-ink-muted">
        {site.name} · {site.email}
      </p>
    </div>
  );
}
