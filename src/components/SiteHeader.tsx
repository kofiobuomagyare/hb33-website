"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Mail, Container } from "lucide-react";
import type { Dictionary } from "@/lib/dictionaries/en";
import type { Locale } from "@/lib/i18n";
import { localizedPath, routeKey } from "@/lib/i18n";
import { isFrench } from "@/lib/i18n";
import LanguageSwitcher from "./LanguageSwitcher";

export default function SiteHeader({
  locale,
  dict,
  contactEmail,
}: {
  locale: Locale;
  dict: Dictionary;
  contactEmail: string;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname() ?? "/";
  const key = routeKey(pathname);

  const links = [
    { href: localizedPath(locale, "/"), label: dict.nav.home, active: key === "/" || key === "" },
    { href: localizedPath(locale, "/products"), label: dict.nav.products, active: key.startsWith("/products") },
    { href: localizedPath(locale, "/about"), label: dict.nav.about, active: key === "/about" },
    { href: localizedPath(locale, "/how-it-works"), label: dict.nav.howItWorks, active: key === "/how-it-works" },
    { href: localizedPath(locale, "/contact"), label: dict.nav.contact, active: key === "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50">
      <div className="bg-espresso text-cream">
        <div className="container-x flex min-h-9 items-center justify-between gap-4 py-1.5 text-xs">
          <p className="flex items-center gap-2 text-cream/90">
            <Container className="size-3.5 shrink-0 text-sand" aria-hidden />
            <span>{dict.topbar.message}</span>
          </p>
          <a
            href={`mailto:${contactEmail}`}
            className="hidden items-center gap-1.5 font-semibold text-cream/90 underline-offset-4 hover:text-cream hover:underline sm:inline-flex"
          >
            <Mail className="size-3.5" aria-hidden />
            {contactEmail}
          </a>
        </div>
      </div>

      <div className="border-b border-line/70 bg-cream/90 backdrop-blur-md">
        <div className="container-x flex h-[4.5rem] items-center justify-between gap-4">
          <Link
            href={localizedPath(locale, "/")}
            className="flex items-baseline gap-2"
            aria-label="HB33 — home"
          >
            <span className="font-display text-[1.7rem] font-extrabold tracking-tight text-bark">
              HB33
              <span aria-hidden className="text-clay">
                .
              </span>
            </span>
            <span className="hidden text-[11px] font-semibold tracking-[0.18em] text-ink-muted uppercase md:inline">
              {isFrench(locale) ? "Matières premières" : "Commodities"}
            </span>
          </Link>

          <nav
            aria-label={dict.nav.menu}
            className="hidden items-center gap-1 rounded-full border border-line bg-white/50 px-2 py-1.5 lg:flex"
          >
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                aria-current={l.active ? "page" : undefined}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  l.active
                    ? "bg-bark text-cream"
                    : "text-bark hover:bg-parchment hover:text-clay-deep"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-1 lg:flex">
            <LanguageSwitcher locale={locale} dict={dict} id="lang-desktop" />
            <Link href={localizedPath(locale, "/request-quote")} className="btn-primary ms-2">
              {dict.nav.requestQuote}
            </Link>
          </div>

          <div className="flex items-center gap-1 lg:hidden">
            <LanguageSwitcher locale={locale} dict={dict} id="lang-mobile" />
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label={open ? dict.nav.close : dict.nav.menu}
              className="inline-flex size-11 items-center justify-center rounded-full border border-line bg-white/60 text-bark"
            >
              {open ? <X className="size-6" aria-hidden /> : <Menu className="size-6" aria-hidden />}
            </button>
          </div>
        </div>

        {open ? (
          <nav
            aria-label={dict.nav.menu}
            className="border-t border-line bg-cream px-5 py-4 lg:hidden"
          >
            <ul className="flex flex-col gap-1">
              {links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    aria-current={l.active ? "page" : undefined}
                    className={`block rounded-2xl px-4 py-3 text-base font-semibold ${
                      l.active ? "bg-bark text-cream" : "text-bark hover:bg-parchment"
                    }`}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
              <li className="pt-3">
                <Link
                  href={localizedPath(locale, "/request-quote")}
                  onClick={() => setOpen(false)}
                  className="btn-primary w-full"
                >
                  {dict.nav.requestQuote}
                </Link>
              </li>
            </ul>
          </nav>
        ) : null}
      </div>
    </header>
  );
}
