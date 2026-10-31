"use client";

import { useRef, useState, type KeyboardEvent, type TouchEvent } from "react";
import { ChevronLeft, ChevronRight, ImageOff } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/dictionaries/en";
import type { MediaAsset } from "@/lib/product-media";
import { t } from "@/lib/products";
import { cn } from "@/lib/utils";
import MediaFrame from "./MediaFrame";

export default function ProductMediaCarousel({
  media,
  locale,
  dict,
}: {
  media: MediaAsset[];
  locale: Locale;
  dict: Dictionary;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const activeMedia = media[activeIndex];
  const productDetail = dict.productDetail;

  function showMedia(index: number) {
    setActiveIndex((index + media.length) % media.length);
    setLoading(true);
    setFailed(false);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLElement>) {
    if (media.length < 2) return;
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      showMedia(activeIndex - 1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      showMedia(activeIndex + 1);
    }
  }

  function handleTouchStart(event: TouchEvent<HTMLElement>) {
    if ((event.target as HTMLElement).closest("video, button, a")) return;
    touchStartX.current = event.changedTouches[0]?.clientX ?? null;
  }

  function handleTouchEnd(event: TouchEvent<HTMLElement>) {
    const startX = touchStartX.current;
    touchStartX.current = null;
    if (startX === null || media.length < 2) return;
    const distance = event.changedTouches[0].clientX - startX;
    if (Math.abs(distance) < 48) return;
    showMedia(activeIndex + (distance < 0 ? 1 : -1));
  }

  if (!activeMedia) return null;

  return (
    <section
      role="region"
      aria-roledescription="carousel"
      aria-label={productDetail.mediaGalleryTitle}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="container-x py-10 outline-none focus-visible:ring-2 focus-visible:ring-clay-deep focus-visible:ring-offset-4"
    >
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <h2 className="font-display text-2xl font-semibold text-bark">
          {productDetail.mediaGalleryTitle}
        </h2>
        {media.length > 1 ? (
          <p className="text-sm text-ink-muted" aria-live="polite">
            {productDetail.mediaPosition
              .replace("{current}", String(activeIndex + 1))
              .replace("{total}", String(media.length))}
          </p>
        ) : null}
      </div>

      <div className="relative overflow-hidden rounded-[2rem] border border-line bg-espresso">
        {failed ? (
          <div className="flex aspect-[4/3] flex-col items-center justify-center gap-3 px-6 text-center text-cream">
            <ImageOff className="size-8 text-sand" aria-hidden />
            <p>{productDetail.mediaUnavailable}</p>
            <a
              href={activeMedia.src}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm underline underline-offset-4"
            >
              {productDetail.openMediaSource}
            </a>
          </div>
        ) : (
          <>
            <MediaFrame
              key={activeMedia.src}
              media={activeMedia}
              locale={locale}
              className="aspect-[4/3] rounded-none animate-media-enter"
              sizes="(max-width: 768px) 100vw, 1200px"
              priority={activeIndex === 0}
              pillPlacement="top"
              onMediaLoad={() => setLoading(false)}
              onMediaError={() => {
                setLoading(false);
                setFailed(true);
              }}
            />
            {loading ? (
              <div
                className="absolute inset-0 grid place-items-center bg-espresso/75 text-sm text-cream"
                role="status"
              >
                {productDetail.mediaLoading}
              </div>
            ) : null}
          </>
        )}

        {media.length > 1 ? (
          <>
            <button
              type="button"
              onClick={() => showMedia(activeIndex - 1)}
              aria-label={productDetail.previousMedia}
              className="absolute start-3 top-1/2 z-20 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-espresso/75 text-cream shadow-lg backdrop-blur transition hover:bg-espresso focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:start-5"
            >
              <ChevronLeft className="size-5" aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => showMedia(activeIndex + 1)}
              aria-label={productDetail.nextMedia}
              className="absolute end-3 top-1/2 z-20 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-espresso/75 text-cream shadow-lg backdrop-blur transition hover:bg-espresso focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:end-5"
            >
              <ChevronRight className="size-5" aria-hidden />
            </button>
          </>
        ) : null}
      </div>

      {media.length > 1 ? (
        <div className="mt-4 flex items-center justify-center gap-2" role="group" aria-label={productDetail.chooseMedia}>
          {media.map((item, index) => (
            <button
              key={`${item.kind}-${item.src}`}
              type="button"
              onClick={() => showMedia(index)}
              aria-label={`${productDetail.goToMedia} ${index + 1}: ${t(item.alt, locale)}`}
              aria-current={index === activeIndex ? "true" : undefined}
              className={cn(
                "size-3 rounded-full border border-clay-deep transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-clay-deep",
                index === activeIndex ? "bg-clay-deep" : "bg-transparent hover:bg-clay/40",
              )}
            />
          ))}
        </div>
      ) : null}
    </section>
  );
}
