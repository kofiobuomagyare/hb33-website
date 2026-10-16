"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import type { Dictionary } from "@/lib/dictionaries/en";
import { analyticsConfigured, site } from "@/lib/site";
import { getConsentClient, setConsentClient, type ConsentValue } from "@/lib/consent-cookie";

declare global {
  interface Window {
    plausible?: (...args: unknown[]) => void;
  }
}

/**
 * Cookie-consent banner + privacy-friendly analytics loader.
 *
 * - Rendered only when analytics is configured (NEXT_PUBLIC_PLAUSIBLE_DOMAIN).
 *   With no analytics configured the site sets no cookies and runs no
 *   trackers, so there is nothing to consent to — see the privacy policy.
 * - Choice ("accepted" / "declined") lives in an HTTP cookie
 *   (`hb33_consent`, 1 year, SameSite=Lax, Secure) so it can be read
 *   server-side for middleware, layouts, or cross-subdomain sharing.
 * - On accept, the Plausible script loads (cookieless by default) and
 *   subsequent client-side route changes send manual pageviews.
 */
export default function ConsentBanner({ dict }: { dict: Dictionary }) {
  const [choice, setChoice] = useState<ConsentValue | null>(null);
  const pathname = usePathname() ?? "/";

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      try {
        setChoice(getConsentClient());
      } catch {
        setChoice("declined");
      }
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!analyticsConfigured || choice !== "accepted") return;
    if (document.querySelector('script[data-hb33-analytics="true"]')) return;
    window.plausible =
      window.plausible ??
      function (...args: unknown[]) {
        ((window.plausible as unknown as { q: unknown[] }).q =
          (window.plausible as unknown as { q: unknown[] }).q ?? []).push(args);
      };
    const script = document.createElement("script");
    script.defer = true;
    script.dataset.hb33Analytics = "true";
    script.dataset.domain = site.plausibleDomain;
    script.src = "https://plausible.io/js/script.js";
    document.head.appendChild(script);
  }, [choice]);

  useEffect(() => {
    if (analyticsConfigured && choice === "accepted" && window.plausible) {
      window.plausible("pageview");
    }
  }, [pathname, choice]);

  function decide(next: ConsentValue) {
    try {
      setConsentClient(next);
    } catch {
      /* storage unavailable — treat as declined */
    }
    setChoice(next);
  }

  if (!analyticsConfigured || choice !== null) return null;

  const c = dict.consent;
  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label={c.title}
      className="fixed inset-x-3 bottom-3 z-[90] mx-auto max-w-2xl rounded-3xl border border-line bg-cream p-5 shadow-2xl sm:inset-x-6 sm:bottom-6"
    >
      <p className="font-display text-lg font-semibold text-bark">{c.title}</p>
      <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{c.text}</p>
      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        <button
          type="button"
          onClick={() => decide("accepted")}
          className="btn-primary min-h-11 flex-1 text-sm"
        >
          {c.accept}
        </button>
        <button
          type="button"
          onClick={() => decide("declined")}
          className="btn-outline min-h-11 flex-1 text-sm"
        >
          {c.decline}
        </button>
      </div>
    </div>
  );
}