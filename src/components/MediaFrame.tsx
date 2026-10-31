import Image from "next/image";
import type { Locale } from "@/lib/i18n";
import type { MediaAsset } from "@/lib/product-media";
import { t } from "@/lib/products";
import { cn } from "@/lib/utils";
import MediaPill from "./MediaPill";

/**
 * Image or video frame with an optional source/credit pill. Videos never
 * autoplay; they load metadata only and fall back to their poster frame if
 * the browser cannot decode WebM.
 */
export default function MediaFrame({
  media,
  locale,
  className,
  mediaClassName,
  sizes = "100vw",
  priority = false,
  fill = false,
  controls = true,
  showPill = true,
  pillLabel,
  pillClassName,
  pillTone = "dark",
  pillAlign = "start",
  pillPlacement,
  rounded = true,
  onMediaLoad,
  onMediaError,
}: {
  media: MediaAsset;
  locale: Locale;
  className?: string;
  mediaClassName?: string;
  sizes?: string;
  priority?: boolean;
  fill?: boolean;
  controls?: boolean;
  showPill?: boolean;
  pillLabel?: string;
  pillClassName?: string;
  pillTone?: "dark" | "light";
  pillAlign?: "start" | "end";
  pillPlacement?: "top" | "bottom";
  rounded?: boolean;
  onMediaLoad?: () => void;
  onMediaError?: () => void;
}) {
  const alt = t(media.alt, locale);
  const sourceType = media.src.endsWith(".webm") ? "video/webm" : "video/mp4";
  // Native video controls live along the bottom edge, so keep the credit pill
  // at the top for playable videos unless a caller overrides it.
  const placement = pillPlacement ?? (media.kind === "video" && controls ? "top" : "bottom");

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-espresso",
        rounded && "rounded-[2rem]",
        fill && "absolute inset-0",
        className,
      )}
    >
      {media.kind === "image" ? (
        fill ? (
          <Image
            src={media.src}
            alt={alt}
            fill
            priority={priority}
            sizes={sizes}
            className={cn("object-cover", mediaClassName)}
            onLoad={onMediaLoad}
            onError={onMediaError}
          />
        ) : (
          <Image
            src={media.src}
            alt={alt}
            width={media.width ?? 1200}
            height={media.height ?? 800}
            priority={priority}
            sizes={sizes}
            className={cn("h-full w-full object-cover", mediaClassName)}
            onLoad={onMediaLoad}
            onError={onMediaError}
          />
        )
      ) : (
        <video
          className={cn("h-full w-full object-cover", mediaClassName)}
          poster={media.poster}
          controls={controls}
          playsInline
          preload="metadata"
          aria-label={alt}
          onLoadedData={onMediaLoad}
          onError={onMediaError}
        >
          <source src={media.src} type={sourceType} />
          <p className="p-4 text-sm text-cream">
            {t(
              {
                en: "Your browser cannot play this video. Open the source file for the full clip.",
                fr: "Votre navigateur ne peut pas lire cette vidéo. Ouvrez le fichier source pour la séquence complète.",
              },
              locale,
            )}
          </p>
        </video>
      )}

      {showPill ? (
        <span
          className={cn(
            "absolute z-10",
            placement === "top" ? "top-3 sm:top-4" : "bottom-3 sm:bottom-4",
            pillAlign === "start" ? "start-3 sm:start-4" : "end-3 sm:end-4",
          )}
        >
          <MediaPill
            media={media}
            locale={locale}
            label={pillLabel}
            className={pillClassName}
            tone={pillTone}
            compact={!pillLabel}
          />
        </span>
      ) : null}
    </div>
  );
}
