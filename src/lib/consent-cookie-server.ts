import { cookies } from "next/headers";
import { CONSENT_COOKIE_NAME, type ConsentValue } from "./consent-cookie";

/** Read consent cookie server-side (for layouts, API routes, middleware). */
export async function getConsentServer(): Promise<ConsentValue | undefined> {
  const store = await cookies();
  const value = store.get(CONSENT_COOKIE_NAME)?.value;
  if (!value) return undefined;
  return value === "accepted" ? "accepted" : value === "declined" ? "declined" : undefined;
}

/** Check if analytics should run server-side (for SSR pageviews if needed). */
export async function isAnalyticsAllowedServer(): Promise<boolean> {
  const consent = await getConsentServer();
  return consent === "accepted";
}