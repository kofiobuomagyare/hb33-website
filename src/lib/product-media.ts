import type { Localized, Product } from "./products";
import { siteImages, siteVideos, type SiteImage, type SiteVideo } from "./images";

/** A single image or video with the metadata needed for an on-image credit pill. */
export interface MediaAsset {
  kind: "image" | "video";
  src: string;
  poster?: string;
  alt: Localized;
  credit: string;
  creditUrl: string;
  license: string;
  note?: Localized;
  width?: number;
  height?: number;
}

export function imageToMedia(image: SiteImage, width = 1600, height = 1067): MediaAsset {
  return {
    kind: "image",
    src: image.src,
    alt: image.alt,
    credit: image.credit,
    creditUrl: image.creditUrl,
    license: image.license,
    width,
    height,
  };
}

export function videoToMedia(video: SiteVideo): MediaAsset {
  return {
    kind: "video",
    src: video.src,
    poster: video.poster,
    alt: video.alt,
    credit: video.credit,
    creditUrl: video.creditUrl,
    license: video.license,
    note: video.note,
  };
}

/** Editorial media used across the marketing pages. */
export const siteMedia = {
  hero: imageToMedia(siteImages.hero, 1920, 1280),
  logistics: videoToMedia(siteVideos.shipping),
  about: imageToMedia(siteImages.about, 1200, 800),
  fermentation: videoToMedia(siteVideos.fermentation),
  productsBanner: imageToMedia(siteImages.fermentation, 1600, 1067),
  howItWorks: imageToMedia(siteImages.logistics, 1200, 800),
} satisfies Record<string, MediaAsset>;

/** Product photography is already stored on each product record. */
export function productImageMedia(product: Product, width = 1200, height = 900): MediaAsset {
  return {
    kind: "image",
    src: product.image,
    alt: product.imageAlt,
    credit: product.credit,
    creditUrl: product.creditUrl,
    license: product.license,
    width,
    height,
  };
}

/**
 * Optional process video for a product. Only add verified, licensed clips;
 * an empty result means the product page simply has no video section.
 */
export function productVideoFor(slug: string): MediaAsset | undefined {
  if (slug === "cocoa-beans") return videoToMedia(siteVideos.fermentation);
  return undefined;
}

/** Verified product-specific assets for the product detail gallery. */
export function productGalleryMedia(product: Product): MediaAsset[] {
  const media = [productImageMedia(product)];
  const video = productVideoFor(product.slug);
  if (video) media.push(imageToMedia(siteImages.about), video);
  return media;
}
