import Link from "next/link";
import { Mail, MapPin, Container, MessageCircle } from "lucide-react";
import type { Dictionary } from "@/lib/dictionaries/en";
import type { Locale } from "@/lib/i18n";
import { localizedPath } from "@/lib/i18n";
import { isFrench } from "@/lib/i18n";
import { site } from "@/lib/site";
import LanguageSwitcher from "./LanguageSwitcher";
import CurrentYear from "./CurrentYear";

export default function SiteFooter({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const shopLinks = [
    { href: localizedPath(locale, "/products"), label: dict.nav.products },
    { href: localizedPath(locale, "/products/cocoa-beans"), label: isFrench(locale) ? "Fèves de cacao" : "Cocoa Beans" },
    { href: localizedPath(locale, "/products/soybeans"), label: isFrench(locale) ? "Soja en grains" : "Soybeans" },
    { href: localizedPath(locale, "/products/cocopeat"), label: "Cocopeat" },
  ];
  const companyLinks = [
    { href: localizedPath(locale, "/about"), label: dict.nav.about },
    { href: localizedPath(locale, "/how-it-works"), label: dict.nav.howItWorks },
    { href: localizedPath(locale, "/request-quote"), label: dict.nav.requestQuote },
    { href: localizedPath(locale, "/contact"), label: dict.nav.contact },
  ];
  const legalLinks = [
    { href: localizedPath(locale, "/privacy"), label: dict.footer.privacy },
    { href: localizedPath(locale, "/terms"), label: dict.footer.terms },
  ];

  return (
    <footer className="bg-espresso text-cream">
      <div className="container-x grid gap-10 pt-14 sm:grid-cols-2 lg:grid-cols-[1.2fr_0.8fr_0.8fr_1fr]">
        <div>
          <p className="font-display text-3xl font-extrabold tracking-tight">
            HB33<span aria-hidden className="text-caramel">.</span>
          </p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-cream/75">
            {dict.footer.tagline}
          </p>
          <p className="mt-4 inline-flex items-start gap-2 rounded-full border border-cream/20 bg-cream/5 px-4 py-2 text-xs font-semibold text-cream/85">
            <Container className="mt-0.5 size-4 shrink-0 text-sand" aria-hidden />
            {dict.footer.minOrder}
          </p>
        </div>

        <nav aria-label={dict.footer.shop}>
          <p className="eyebrow eyebrow-light">{dict.footer.shop}</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            {shopLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-cream/85 underline-offset-4 hover:text-cream hover:underline">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label={dict.footer.company}>
          <p className="eyebrow eyebrow-light">{dict.footer.company}</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            {companyLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-cream/85 underline-offset-4 hover:text-cream hover:underline">
                  {l.label}
                </Link>
              </li>
            ))}
            {legalLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-cream/85 underline-offset-4 hover:text-cream hover:underline">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="eyebrow eyebrow-light">{dict.footer.contactTitle}</p>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <a href={`mailto:${site.email}`} className="flex items-center gap-2 text-cream/85 hover:text-cream hover:underline">
                <Mail className="size-4 shrink-0 text-sand" aria-hidden />
                {site.email}
              </a>
            </li>
            <li className="flex items-center gap-2 text-cream/85">
              <MessageCircle className="size-4 shrink-0 text-sand" aria-hidden />
              {site.whatsappNumber ? `+${site.whatsappNumber}` : dict.contactPage.whatsappUnavailable}
            </li>
            <li className="flex items-center gap-2 text-cream/85">
              <MapPin className="size-4 shrink-0 text-sand" aria-hidden />
              {site.location}
            </li>
          </ul>
          <div className="mt-4 rounded-2xl border border-cream/15 bg-cream/5 p-3">
            <span className="text-xs font-semibold tracking-wider text-cream/60 uppercase">
              {dict.footer.language}
            </span>
            <LanguageSwitcher locale={locale} dict={dict} id="lang-footer" className="px-0 text-cream" />
          </div>
        </div>
      </div>

      <div aria-hidden className="overflow-hidden px-4 pt-8">
        <p className="wordmark-giant text-center text-[24vw] lg:text-[16rem]">
          HB33
        </p>
      </div>

      <div className="border-t border-cream/15">
        <div className="container-x flex flex-col gap-1 py-5 text-xs text-cream/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© <CurrentYear /> HB33. {dict.common.allRightsReserved}</p>
          <p>SGS-verified origin · FOB / CIF worldwide</p>
        </div>
        <div className="container-x pb-5 text-[11px] text-cream/45">
          <p>{dict.footer.photoCredit}</p>
        </div>
      </div>
    </footer>
  );
}
