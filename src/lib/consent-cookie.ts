/**
 * Consent cookie utilities — works both client-side (document.cookie)
 * and server-side (next/headers cookies()).
 *
 * Cookie name: `hb33_consent`
 * Values: "accepted" | "declined" | undefined
 * Expires: 1 year
 * Path: /
 * SameSite: Lax (allows cross-subdomain navigation)
 * Secure: only on HTTPS (handled automatically by browser)
 */

export const CONSENT_COOKIE_NAME = "hb33_consent";
export type ConsentValue = "accepted" | "declined";

/** Read consent from document.cookie (client-side only). */
export function getConsentClient(): ConsentValue | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(^| )${CONSENT_COOKIE_NAME}=([^;]+)`));
  return match ? (decodeURIComponent(match[2]) as ConsentValue) : null;
}

/** Write consent to document.cookie (client-side only). */
export function setConsentClient(value: ConsentValue): void {
  if (typeof document === "undefined") return;
  const expires = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toUTCString();
  document.cookie = `${CONSENT_COOKIE_NAME}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax; Secure`;
}

/** Delete consent cookie (client-side). */
export function deleteConsentClient(): void {
  if (typeof document === "undefined") return;
  document.cookie = `${CONSENT_COOKIE_NAME}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; SameSite=Lax; Secure`;
}