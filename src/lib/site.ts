/**
 * Single source of truth for HB33 business information.
 * Update values here (or via the documented env vars) instead of
 * hardcoding contact details across pages.
 */
export const site = {
  name: "HB33",
  tagline: "Agricultural Commodities",
  description:
    "HB33 supplies bulk cocoa products, soybeans and cocopeat from West Africa to manufacturers, processors and bulk buyers worldwide.",
  email:
    process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || "info@hb33international.com",
  whatsappNumber:
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.trim().replace(/\D/g, "") || "",
  location:
    process.env.NEXT_PUBLIC_COMPANY_LOCATION?.trim() || "West Africa",
  monthlyCapacityMt: 1000,
  url: (process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://hb33international.com").replace(
    /\/$/,
    "",
  ),
  /**
   * Privacy-friendly analytics (Plausible) site domain, e.g. "hb33.com".
   * Empty = analytics disabled entirely and no consent banner is shown.
   */
  plausibleDomain: process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN?.trim() || "",
} as const;

export const analyticsConfigured = site.plausibleDomain.length > 2;

export const whatsappConfigured = site.whatsappNumber.length >= 7;

/** Build a wa.me link with a prefilled message. Empty string when unconfigured. */
export function whatsappLink(message: string): string {
  if (!whatsappConfigured) return "";
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const MOQ_NOTICE_SHORT =
  "Minimum order: 1 shipping container. We handle bulk orders only.";

export const MOQ_NOTICE_LONG =
  "Minimum order: 1 shipping container. We handle bulk orders only. Please contact us to confirm the appropriate container size, product loading capacity, availability, and shipping arrangements.";
