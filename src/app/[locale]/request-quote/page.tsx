import type { Metadata } from "next";
import { isLocale, languageAlternates, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import { site } from "@/lib/site";
import { products, localizedProductOptions } from "@/lib/products";
import { Eyebrow } from "@/components/ui";
import { QuoteSection } from "@/components/QuoteForm";
import { socialMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  const social = socialMetadata(`/${locale}/request-quote`, dict.meta.quoteTitle, dict.meta.quoteDescription);
  return {
    title: dict.meta.quoteTitle,
    description: dict.meta.quoteDescription,
    alternates: {
      canonical: `${site.url}/${locale}/request-quote`,
      languages: languageAlternates("/request-quote"),
    },
    ...social,
  };
}

export default async function RequestQuotePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) return null;
  const dict = getDictionary(locale as Locale);
  const q = dict.quotePage;

  return (
    <div className="container-x max-w-4xl py-10 md:py-14">
      <Eyebrow>{q.eyebrow}</Eyebrow>
      <h1 className="font-display mt-3 text-4xl leading-tight font-semibold text-bark sm:text-5xl">
        {q.title}
      </h1>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-muted">{q.lead}</p>
      <div className="mt-8">
        <QuoteSection
          locale={locale as Locale}
          dict={dict}
          products={localizedProductOptions(products, locale as Locale)}
        />
      </div>
    </div>
  );
}
