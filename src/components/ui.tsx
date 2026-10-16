import Link from "next/link";
import { Container, TriangleAlert } from "lucide-react";
import { cn } from "@/lib/utils";
import Reveal from "./Reveal";

/* Shared editorial building blocks (HB33 warm-commerce theme). */

export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return <p className={cn("eyebrow", className)}>{children}</p>;
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "center",
  dark = false,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  align?: "left" | "center";
  dark?: boolean;
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}>
      <Eyebrow className={dark ? "eyebrow-light" : undefined}>{eyebrow}</Eyebrow>
      <h2
        className={cn(
          "font-display mt-5 text-3xl leading-[1.1] font-semibold text-balance sm:text-[2.6rem]",
          dark ? "text-cream" : "text-bark",
        )}
      >
        {title}
      </h2>
      {lead ? (
        <p className={cn("mt-4 text-base leading-relaxed text-balance", dark ? "text-cream/80" : "text-ink-muted")}>
          {lead}
        </p>
      ) : null}
    </div>
  );
}

export const btnPrimary = "btn-primary";
export const btnSecondary = "btn-outline";
export const btnLight = "btn-light";

export function MoqBadge({ label, className }: { label: string; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-clay/40 bg-cream/90 px-3 py-1.5 text-[11px] font-bold tracking-wide text-clay-deep uppercase shadow-sm",
        className,
      )}
    >
      <Container className="size-3.5" aria-hidden />
      {label}
    </span>
  );
}

export function MoqNotice({ text, className }: { text: string; className?: string }) {
  return (
    <div
      role="note"
      className={cn(
        "flex items-start gap-3 rounded-2xl border border-clay/30 bg-parchment px-5 py-4 text-sm leading-relaxed text-bark",
        className,
      )}
    >
      <TriangleAlert className="mt-0.5 size-5 shrink-0 text-clay-deep" aria-hidden />
      <p>{text}</p>
    </div>
  );
}

export function QuoteCtaBand({
  title,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
}: {
  title: string;
  primaryHref: string;
  primaryLabel: string;
  secondaryHref: string;
  secondaryLabel: string;
}) {
  return (
    <section aria-label={title} className="container-x pb-16 md:pb-24">
      <Reveal variant="scale">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-espresso px-6 py-14 text-center text-cream sm:px-12 md:py-20">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 left-1/2 h-72 w-[36rem] -translate-x-1/2 rounded-full bg-cocoa/60 blur-3xl"
        />
        <p className="eyebrow eyebrow-light relative">
          HB33
        </p>
        <h2 className="font-display relative mx-auto mt-5 max-w-2xl text-3xl leading-[1.08] font-semibold text-balance sm:text-5xl">
          {title}
        </h2>
        <div className="relative mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href={primaryHref} className="btn-light">
            {primaryLabel}
          </Link>
          <Link href={secondaryHref} className="btn-outline-light">
            {secondaryLabel}
          </Link>
        </div>
        </div>
      </Reveal>
    </section>
  );
}
