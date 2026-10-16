import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Fraunces, Inter } from "next/font/google";
import type { ReactNode } from "react";
import { Analytics } from "@vercel/analytics/next";
import { getDictionary } from "@/lib/dictionaries";
import { isLocale, locales, type Locale } from "@/lib/i18n";
import { getLocaleInfo, isFrench, ogLocale } from "@/lib/i18n";
import { site } from "@/lib/site";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ConsentBanner from "@/components/ConsentBanner";
import BackToTop from "@/components/BackToTop";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-display" });

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale as Locale);
  const og = ogLocale(locale);
  const ogImage = {
    url: "https://commons.wikimedia.org/wiki/Special:FilePath/Cocoa_farmer_David_Kebu_Jnr_holding_the_finished_product,_dried_cocoa_beans_ready_for_export._(10687070725).jpg?width=1200",
    width: 1200,
    height: 800,
    alt: "HB33 — bulk cocoa from West Africa",
  };
  return {
    metadataBase: new URL(site.url),
    title: {
      default: dict.meta.homeTitle,
      template: `%s · ${dict.meta.siteName}`,
    },
    description: dict.meta.homeDescription,
    openGraph: {
      type: "website",
      siteName: "HB33",
      ...(og ? { locale: og } : {}),
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.homeTitle,
      description: dict.meta.homeDescription,
      images: [ogImage.url],
    },
    icons: {
      icon: "/icon.svg",
      shortcut: "/icon.svg",
      apple: "/icon.svg",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const info = getLocaleInfo(locale);

  return (
    <html lang={info.code} dir={info.dir} className={`${inter.variable} ${fraunces.variable}`}>
      <body className="flex min-h-full flex-col antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:start-2 focus:z-[100] focus:bg-bark focus:px-4 focus:py-2 focus:text-cream"
        >
          {isFrench(locale) ? "Aller au contenu principal" : "Skip to main content"}
        </a>
        <SiteHeader locale={locale} dict={dict} contactEmail={site.email} />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <SiteFooter locale={locale} dict={dict} />
        <ConsentBanner dict={dict} />
        <BackToTop label={dict.common.backToTop} />
        <Analytics />
        <noscript>
          <style>{`.reveal{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </body>
    </html>
  );
}
