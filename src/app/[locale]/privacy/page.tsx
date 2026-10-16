import type { Metadata } from "next";
import { isLocale, languageAlternates, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import { site } from "@/lib/site";
import { socialMetadata } from "@/lib/seo";
import { Eyebrow } from "@/components/ui";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  const social = socialMetadata(`/${locale}/privacy`, dict.meta.privacyTitle, dict.meta.privacyDescription);
  return {
    title: dict.meta.privacyTitle,
    description: dict.meta.privacyDescription,
    alternates: {
      canonical: `${site.url}/${locale}/privacy`,
      languages: languageAlternates("/privacy"),
    },
    ...social,
  };
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) return null;
  const dict = getDictionary(locale as Locale);
  const p = dict.privacyPage;

  return (
    <div className="container-x max-w-3xl py-10 md:py-14">
      <Eyebrow>{p.eyebrow}</Eyebrow>
      <h1 className="font-display mt-3 text-4xl leading-tight font-semibold text-bark sm:text-5xl">
        {p.title}
      </h1>
      <p className="mt-3 text-sm text-ink-muted">
        {p.updated}: {locale === "fr" ? "1er octobre 2026" : "October 1, 2026"}
      </p>
      <p className="mt-5 text-lg leading-relaxed text-ink-muted">{p.intro}</p>
      <div className="mt-8 space-y-8">
        {p.sections.map((s) => (
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
