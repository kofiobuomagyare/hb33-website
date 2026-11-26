"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type TouchEvent,
} from "react";
import {
  ChevronLeft,
  ChevronRight,
  ImageOff,
  Maximize2,
  Play,
  X,
} from "lucide-react";
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
  const [loading, setLoading] = useState(media[0]?.kind !== "video");
  const [failed, setFailed] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const lightboxStageRef = useRef<HTMLDivElement>(null);
  const lightboxRef = useRef<HTMLDivElement>(null);
  const activeMedia = media[activeIndex];
  const productDetail = dict.productDetail;

  const showMedia = useCallback(
    (index: number) => {
      const next = (index + media.length) % media.length;
      if (next === activeIndex) {
        if (!failed) return;
        setFailed(false);
        setLoading(media[next].kind === "image");
        return;
      }
      setActiveIndex(next);
      setLoading(media[next].kind === "image");
      setFailed(false);
    },
    [activeIndex, failed, media],
  );

  const openLightbox = useCallback(() => setLightboxOpen(true), []);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
    if (typeof document !== "undefined" && document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    }
  }, []);

  // Cached images can finish loading before React attaches `onLoad`, which
  // would leave the "Loading media…" overlay up forever. Check the DOM once
  // after each switch and clear the overlay if the image is already complete.
  useEffect(() => {
    if (!loading) return;
    const container = lightboxOpen ? lightboxStageRef.current : stageRef.current;
    const image = container?.querySelector("img");
    if (image?.complete && image.naturalWidth > 0) setLoading(false);
  }, [activeIndex, loading, lightboxOpen]);

  useEffect(() => {
    if (!lightboxOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const container = lightboxRef.current;
    if (
      container &&
      typeof document !== "undefined" &&
      document.fullscreenEnabled &&
      !document.fullscreenElement
    ) {
      container.requestFullscreen().catch(() => {});
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        closeLightbox();
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        showMedia(activeIndex - 1);
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        showMedia(activeIndex + 1);
      }
    }
    function onFullscreenChange() {
      if (!document.fullscreenElement) closeLightbox();
    }

    window.addEventListener("keydown", onKeyDown as unknown as EventListener);
    document.addEventListener("fullscreenchange", onFullscreenChange);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown as unknown as EventListener);
      document.removeEventListener("fullscreenchange", onFullscreenChange);
    };
  }, [lightboxOpen, activeIndex, closeLightbox, showMedia]);

  function handleKeyDown(event: KeyboardEvent<HTMLElement>) {
    if (media.length < 2) return;
    if ((event.target as HTMLElement).closest("video, a")) return;
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      showMedia(activeIndex - 1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      showMedia(activeIndex + 1);
    } else if (event.key === "Home") {
      event.preventDefault();
      showMedia(0);
    } else if (event.key === "End") {
      event.preventDefault();
      showMedia(media.length - 1);
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

  const counterText = productDetail.mediaPosition
    .replace("{current}", String(activeIndex + 1))
    .replace("{total}", String(media.length));

  return (
    <>
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
              {counterText}
            </p>
          ) : null}
        </div>

        <div className="relative overflow-hidden rounded-[2rem] border border-line bg-espresso">
          {activeMedia.thumb ? (
            <Image
              key={`${activeMedia.thumb}-backdrop`}
              src={activeMedia.thumb}
              alt=""
              aria-hidden
              fill
              sizes="240px"
              className="scale-110 object-cover opacity-40 blur-2xl"
            />
          ) : null}

          <div
            ref={stageRef}
            className="relative aspect-[4/5] sm:aspect-[4/3] lg:aspect-[16/10]"
          >
            {failed ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center text-cream">
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
                  fill
                  fit="contain"
                  className="rounded-none bg-transparent animate-media-enter"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 55vw, 480px"
                  preload="none"
                  pillPlacement="top"
                  onMediaLoad={() => setLoading(false)}
                  onMediaError={() => {
                    setLoading(false);
                    setFailed(true);
                  }}
                />
                {loading ? (
                  <div
                    className="absolute inset-0 z-10 grid place-items-center bg-espresso/60 text-sm text-cream"
                    role="status"
                  >
                    {productDetail.mediaLoading}
                  </div>
                ) : null}
              </>
            )}
          </div>

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

          <button
            type="button"
            onClick={openLightbox}
            aria-label={productDetail.viewFullScreen}
            className="absolute end-3 top-3 z-20 inline-flex size-10 items-center justify-center rounded-full border border-white/30 bg-espresso/75 text-cream shadow-lg backdrop-blur transition hover:bg-espresso focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:end-5 sm:top-5"
          >
            <Maximize2 className="size-4" aria-hidden />
          </button>
        </div>

        {media.length > 1 ? (
          <div className="mt-6 sm:mt-8">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 className="font-display text-lg font-semibold text-bark sm:text-xl">
                {productDetail.mediaGridTitle}
              </h3>
              <p className="text-sm text-ink-muted">{productDetail.mediaGridHint}</p>
            </div>
            <div
              className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-4 sm:gap-3 lg:grid-cols-5"
              role="group"
              aria-label={productDetail.chooseMedia}
            >
              {media.map((item, index) => {
                const isActive = index === activeIndex;
                return (
                  <button
                    key={`${item.kind}-${item.src}`}
                    type="button"
                    onClick={() => showMedia(index)}
                    aria-label={`${productDetail.goToMedia} ${index + 1}: ${t(item.alt, locale)}`}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "group relative aspect-square overflow-hidden rounded-xl border bg-espresso transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-clay-deep",
                      isActive
                        ? "border-clay-deep ring-2 ring-clay-deep ring-offset-2 ring-offset-cream"
                        : "border-line hover:border-clay/60",
                    )}
                  >
                    {item.thumb ? (
                      <Image
                        src={item.thumb}
                        alt=""
                        fill
                        sizes="(max-width: 640px) 30vw, (max-width: 1024px) 22vw, 180px"
                        loading="lazy"
                        className={cn(
                          "object-cover transition duration-300",
                          isActive
                            ? "opacity-100"
                            : "opacity-85 group-hover:scale-105 group-hover:opacity-100",
                        )}
                      />
                    ) : null}
                    {item.kind === "video" ? (
                      <span
                        className="absolute inset-0 grid place-items-center bg-espresso/20"
                        aria-hidden
                      >
                        <span className="grid size-8 place-items-center rounded-full border border-white/40 bg-espresso/75 text-cream shadow-sm backdrop-blur-sm transition group-hover:scale-110 sm:size-9">
                          <Play className="size-3.5 translate-x-px fill-current sm:size-4" />
                        </span>
                      </span>
                    ) : null}
                    {isActive ? (
                      <span className="absolute inset-x-0 bottom-0 h-1 bg-clay-deep" aria-hidden />
                    ) : null}
                  </button>
                );
              })}
            </div>
          </div>
        ) : null}
      </section>

      {lightboxOpen ? (
        <div
          ref={lightboxRef}
          role="dialog"
          aria-modal="true"
          aria-label={productDetail.mediaGalleryTitle}
          className="fixed inset-0 z-[100] flex flex-col bg-espresso/95 backdrop-blur-sm"
          onClick={closeLightbox}
        >
          <div
            className="flex items-center justify-between gap-3 px-4 py-3 text-cream sm:px-6"
            onClick={(event) => event.stopPropagation()}
          >
            <p className="text-sm font-medium" aria-live="polite">
              {counterText}
            </p>
            <button
              type="button"
              onClick={closeLightbox}
              aria-label={productDetail.closeFullScreen}
              className="inline-flex size-10 items-center justify-center rounded-full border border-white/30 bg-white/10 text-cream transition hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <X className="size-5" aria-hidden />
            </button>
          </div>

          <div
            ref={lightboxStageRef}
            className="relative flex-1"
            onClick={(event) => event.stopPropagation()}
          >
            {activeMedia.thumb ? (
              <Image
                key={`${activeMedia.thumb}-lightbox-backdrop`}
                src={activeMedia.thumb}
                alt=""
                aria-hidden
                fill
                sizes="240px"
                className="scale-110 object-cover opacity-30 blur-2xl"
              />
            ) : null}

            {failed ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center text-cream">
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
                  fill
                  fit="contain"
                  className="rounded-none bg-transparent animate-media-enter"
                  sizes="100vw"
                  controls
                  preload="auto"
                  priority
                  pillPlacement="top"
                  onMediaLoad={() => setLoading(false)}
                  onMediaError={() => {
                    setLoading(false);
                    setFailed(true);
                  }}
                />
                {loading ? (
                  <div
                    className="absolute inset-0 z-10 grid place-items-center bg-espresso/60 text-sm text-cream"
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
                  className="absolute start-4 top-1/2 z-20 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-espresso/75 text-cream shadow-lg backdrop-blur transition hover:bg-espresso focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  <ChevronLeft className="size-5" aria-hidden />
                </button>
                <button
                  type="button"
                  onClick={() => showMedia(activeIndex + 1)}
                  aria-label={productDetail.nextMedia}
                  className="absolute end-4 top-1/2 z-20 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-espresso/75 text-cream shadow-lg backdrop-blur transition hover:bg-espresso focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  <ChevronRight className="size-5" aria-hidden />
                </button>
              </>
            ) : null}
          </div>

          {media.length > 1 ? (
            <div
              className="flex gap-2 overflow-x-auto px-4 py-3 sm:px-6"
              onClick={(event) => event.stopPropagation()}
              role="group"
              aria-label={productDetail.chooseMedia}
            >
              {media.map((item, index) => {
                const isActive = index === activeIndex;
                return (
                  <button
                    key={`${item.kind}-${item.src}`}
                    type="button"
                    onClick={() => showMedia(index)}
                    aria-label={`${productDetail.goToMedia} ${index + 1}: ${t(item.alt, locale)}`}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "relative size-14 shrink-0 overflow-hidden rounded-lg border bg-espresso transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
                      isActive
                        ? "border-white ring-2 ring-white ring-offset-2 ring-offset-espresso"
                        : "border-white/20 hover:border-white/50",
                    )}
                  >
                    {item.thumb ? (
                      <Image
                        src={item.thumb}
                        alt=""
                        fill
                        sizes="56px"
                        loading="lazy"
                        className="object-cover"
                      />
                    ) : null}
                    {item.kind === "video" ? (
                      <span className="absolute inset-0 grid place-items-center bg-espresso/30" aria-hidden>
                        <Play className="size-3.5 fill-current text-cream" />
                      </span>
                    ) : null}
                  </button>
                );
              })}
            </div>
          ) : null}
        </div>
      ) : null}
    </>
  );
}
