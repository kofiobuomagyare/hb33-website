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
    ...(data.destinationDetails ? [`Destination details: ${data.destinationDetails}`] : []),
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
  data: QuoteInquiry,
  locale: Locale,
  formType: "Enquiry" | "Request a Quote" = "Request a Quote",
): string {
  if (baseLanguage(locale) === "fr") {
    return [
      `Bonjour HB33 — ${formType === "Enquiry" ? "Demande de renseignements" : "Demande de devis"}`,
      `Nom : ${data.fullName}`,
      ...(data.company ? [`Entreprise : ${data.company}`] : []),
      `E-mail : ${data.email}`,
      `Téléphone : ${data.phone}`,
      `Pays : ${data.country}`,
      `Destination : ${data.destination}`,
      data.destinationDetails ? `Détails destination : ${data.destinationDetails}` : null,
      `Délai : ${data.timeframe}`,
      data.packaging ? `Conditionnement : ${data.packaging}` : null,
      itemSummary(data.items, locale),
      data.notes ? `Notes : ${data.notes}` : null,
    ]
      .filter(Boolean)
      .join("\n");
  }
  return [
    `Hello HB33 — ${formType}`,
    `Name: ${data.fullName}`,
    ...(data.company ? [`Company: ${data.company}`] : []),
    `Email: ${data.email}`,
    `Phone: ${data.phone}`,
    `Country: ${data.country}`,
    `Destination: ${data.destination}`,
    data.destinationDetails ? `Destination details: ${data.destinationDetails}` : null,
    `Timeframe: ${data.timeframe}`,
    data.packaging ? `Packaging: ${data.packaging}` : null,
    itemSummary(data.items, locale),
    data.notes ? `Notes: ${data.notes}` : null,
  ]
    .filter(Boolean)
    .join("\n");
}

export function contactEmailSubject(data: { name: string; subject: string }): string {
  return `[Website contact] ${data.subject} — ${data.name}`;
}

export { site };
