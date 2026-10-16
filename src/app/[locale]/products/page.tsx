import type { Metadata } from "next";
import { getDictionary } from "@/lib/dictionaries";
import { isLocale, languageAlternates, type Locale } from "@/lib/i18n";
import { socialMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { products } from "@/lib/products";
import { Eyebrow, MoqNotice } from "@/components/ui";
import ProductCatalog from "@/components/ProductCatalog";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  const path = `/${locale}/products`;
  const social = socialMetadata(path, dict.meta.productsTitle, dict.meta.productsDescription);
  return {
    title: dict.meta.productsTitle,
    description: dict.meta.productsDescription,
    alternates: {
      canonical: `${site.url}${path}`,
      languages: languageAlternates("/products"),
    },
    ...social,
  };
}

export default async function ProductsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) return null;
  const dict = getDictionary(locale as Locale);

  return (
    <div className="container-x py-10 md:py-14">
      <Eyebrow>{dict.productsPage.eyebrow}</Eyebrow>
      <h1 className="font-display mt-3 max-w-2xl text-4xl leading-tight font-semibold text-bark sm:text-5xl">
        {dict.productsPage.title}
      </h1>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-muted">
        {dict.productsPage.lead}
      </p>
      <MoqNotice text={dict.moq.long} className="mt-6 border" />
      <div className="mt-8">
        <ProductCatalog products={products} locale={locale as Locale} dict={dict} />
      </div>
    </div>
  );
}
