import { site } from "./site";
import { getProduct, t } from "./products";
import type { Locale } from "./i18n";
import { baseLanguage } from "./i18n";
import type { QuoteInquiry } from "./validation";

/**
 * Client-safe helpers for building inquiry summaries and messages.
 * (Reference numbers are generated server-side in the API route.)
 */

export function itemSummary(items: QuoteInquiry["items"], locale: Locale): string {
  return items
    .map((item) => {
      const product = getProduct(item.productSlug);
      const name = product ? t(product.name, locale) : item.productSlug;
      const unit = item.containers === 1
        ? baseLanguage(locale) === "fr" ? "conteneur" : "container"
        : baseLanguage(locale) === "fr" ? "conteneurs" : "containers";
      return `• ${name} — ${item.containers} ${unit}`;
    })
    .join("\n");
}

export function quoteEmailSubject(ref: string, data: QuoteInquiry): string {
  return `[${ref}] Bulk quote request — ${data.fullName} (${data.country})`;
}

export function quoteEmailBody(ref: string, data: QuoteInquiry): string {
  const lines = [
    `New bulk inquiry ${ref} via hb33 website.`,
    ``,
    `Name: ${data.fullName}`,
    `Company: ${data.company || "—"}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone}`,
    `Country: ${data.country}`,
    `Destination: ${data.destination}`,
    `Timeframe: ${data.timeframe}`,
    `Packaging: ${data.packaging || "—"}`,
    ``,
    `Products (MOQ: 1 container each):`,
    itemSummary(data.items, "en"),
    ``,
    `Notes: ${data.notes || "—"}`,
  ];
  return lines.join("\n");
}

export function quoteWhatsAppMessage(
  ref: string,
  data: QuoteInquiry,
  locale: Locale,
): string {
  if (baseLanguage(locale) === "fr") {
    return [
      `Bonjour HB33, demande de devis ${ref} :`,
      itemSummary(data.items, locale),
      `Nom : ${data.fullName}`,
      `Destination : ${data.destination} (${data.country})`,
      `Délai : ${data.timeframe}`,
      data.notes ? `Détails : ${data.notes}` : null,
    ]
      .filter(Boolean)
      .join("\n");
  }
  return [
    `Hello HB33, bulk quote request ${ref}:`,
    itemSummary(data.items, locale),
    `Name: ${data.fullName}`,
    `Destination: ${data.destination} (${data.country})`,
    `Timeframe: ${data.timeframe}`,
    data.notes ? `Details: ${data.notes}` : null,
  ]
    .filter(Boolean)
    .join("\n");
}

export function contactEmailSubject(data: { name: string; subject: string }): string {
  return `[Website contact] ${data.subject} — ${data.name}`;
}

export { site };
