import type { Metadata } from "next";
import { Mail, MapPin, MessageCircle } from "lucide-react";
import { isLocale, languageAlternates, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import { site } from "@/lib/site";
import { socialMetadata } from "@/lib/seo";
import { whatsappConfigured } from "@/lib/site";
import { Eyebrow } from "@/components/ui";
import ContactForm from "@/components/ContactForm";
import Reveal from "@/components/Reveal";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  const social = socialMetadata(`/${locale}/contact`, dict.meta.contactTitle, dict.meta.contactDescription);
  return {
    title: dict.meta.contactTitle,
    description: dict.meta.contactDescription,
    alternates: {
      canonical: `${site.url}/${locale}/contact`,
      languages: languageAlternates("/contact"),
    },
    ...social,
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) return null;
  const dict = getDictionary(locale as Locale);
  const c = dict.contactPage;

  return (
    <div className="container-x py-10 md:py-14">
      <Eyebrow>{c.eyebrow}</Eyebrow>
      <h1 className="font-display mt-3 text-4xl leading-tight font-semibold text-bark sm:text-5xl">
        {c.title}
      </h1>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-muted">{c.lead}</p>

      <div className="mt-10 grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <aside aria-labelledby="channels">
          <h2 id="channels" className="font-display text-2xl font-semibold text-bark">
            {c.channelsTitle}
          </h2>
          <ul className="mt-5 space-y-4">
            <li className="card-warm p-5">
              <p className="flex items-center gap-2 text-xs font-bold tracking-wider text-ink-muted uppercase">
                <Mail className="size-4" aria-hidden />
                {c.emailLabel}
              </p>
              <a
                href={`mailto:${site.email}`}
                className="mt-2 block text-lg font-semibold text-clay-deep underline-offset-4 hover:underline"
              >
                {site.email}
              </a>
            </li>
            <li className="card-warm p-5">
              <p className="flex items-center gap-2 text-xs font-bold tracking-wider text-ink-muted uppercase">
                <MessageCircle className="size-4" aria-hidden />
                {c.whatsappLabel}
              </p>
              {whatsappConfigured ? (
                <>
                  <a
                    href={`https://wa.me/${site.whatsappNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 block text-lg font-semibold text-clay-deep underline-offset-4 hover:underline"
                  >
                    +{site.whatsappNumber}
                  </a>
                  <p className="mt-1 text-sm text-ink-muted">{c.whatsappHint}</p>
                </>
              ) : (
                <p className="mt-2 text-[15px] text-ink-muted">{c.whatsappUnavailable}</p>
              )}
            </li>
            <li className="card-warm p-5">
              <p className="flex items-center gap-2 text-xs font-bold tracking-wider text-ink-muted uppercase">
                <MapPin className="size-4" aria-hidden />
                {c.locationLabel}
              </p>
              <p className="mt-2 text-lg font-semibold text-bark">{site.location}</p>
            </li>
          </ul>
          <p className="mt-4 text-sm text-ink-muted">{c.responseNote}</p>
        </aside>
        </Reveal>

        <Reveal delay={120}>
          <section aria-labelledby="contact-form-title">
          <h2 id="contact-form-title" className="font-display text-2xl font-semibold text-bark">
            {c.formTitle}
          </h2>
          <div className="mt-5">
            <ContactForm locale={locale as Locale} dict={dict} />
          </div>
        </section>
        </Reveal>
      </div>
    </div>
  );
}
