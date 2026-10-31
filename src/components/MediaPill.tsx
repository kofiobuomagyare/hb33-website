import { Camera, Film } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { t } from "@/lib/products";
import type { MediaAsset } from "@/lib/product-media";
import { cn } from "@/lib/utils";

/**
 * Small, readable credit badge designed to sit on top of photography or
 * video. It names the subject, the photographer/source and the licence, and
 * links back to the original file — all without competing with the image.
 */
export default function MediaPill({
  media,
  locale,
  label,
  className,
  compact = false,
  tone = "dark",
}: {
  media: MediaAsset;
  locale: Locale;
  /** Override the subject line, e.g. a product name on a catalogue card. */
  label?: string;
  className?: string;
  compact?: boolean;
  tone?: "dark" | "light";
}) {
  const description = label ?? t(media.alt, locale);
  const Icon = media.kind === "video" ? Film : Camera;

  return (
    <span
      className={cn(
        "pointer-events-auto inline-flex max-w-[calc(100%-1.5rem)] items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] leading-none font-semibold shadow-sm backdrop-blur-md sm:max-w-[min(24rem,calc(100%-1.5rem))] sm:gap-2 sm:px-3 sm:py-1.5 sm:text-[11px]",
        tone === "dark"
          ? "border-white/20 bg-espresso/70 text-cream"
          : "border-bark/15 bg-cream/90 text-bark",
        className,
      )}
      title={`${description} — ${media.credit} (${media.license})`}
    >
      <Icon
        className={cn("size-3 shrink-0", tone === "dark" ? "text-sand" : "text-clay-deep")}
        aria-hidden
      />
      {!compact ? (
        <>
          <span
            className={cn(
              "hidden min-w-0 max-w-[13rem] truncate sm:inline",
              tone === "dark" ? "text-cream/90" : "text-bark/85",
            )}
          >
            {description}
          </span>
          <span aria-hidden className={tone === "dark" ? "text-cream/40" : "text-bark/30"}>
            ·
          </span>
        </>
      ) : null}
      <a
        href={media.creditUrl}
        target="_blank"
        rel="noopener noreferrer"
        title={media.credit}
        className={cn(
          "max-w-[10rem] shrink-0 truncate underline decoration-current/40 underline-offset-2 hover:decoration-current sm:max-w-[12rem]",
          tone === "dark" ? "hover:text-white" : "hover:text-cocoa",
        )}
      >
        {media.credit}
      </a>
      <span className={cn("shrink-0", tone === "dark" ? "text-cream/55" : "text-bark/50")}>
        {media.license}
      </span>
    </span>
  );
}
