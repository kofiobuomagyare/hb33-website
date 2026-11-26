// Runtime validation coverage for product media selection.
import { describe, expect, it } from "vitest";
import { products } from "./products";
import { cocoaBeansGalleryMedia, productGalleryMedia } from "./product-media";

describe("product gallery media", () => {
  it("includes every owned Cocoa Beans photo and clip", () => {
    const product = products.find(({ slug }) => slug === "cocoa-beans");
    if (!product) throw new Error("Cocoa Beans product data is missing");

    const gallery = productGalleryMedia(product);

    expect(gallery).toBe(cocoaBeansGalleryMedia);
    expect(gallery).toHaveLength(10);
    expect(gallery.filter(({ kind }) => kind === "image")).toHaveLength(7);
    expect(gallery.filter(({ kind }) => kind === "video")).toHaveLength(3);
    expect(gallery.every(({ src }) => src.startsWith("/media/cocoa-beans/"))).toBe(true);
    expect(gallery.every(({ thumb }) => Boolean(thumb))).toBe(true);

    for (const clip of gallery.filter(({ kind }) => kind === "video")) {
      expect(clip.poster).toMatch(/^\/media\/cocoa-beans\/.+\.webp$/);
      expect(clip.src).toMatch(/^\/media\/cocoa-beans\/.+\.mp4$/);
      expect(clip.alt.en.length).toBeGreaterThan(10);
      expect(clip.alt.fr.length).toBeGreaterThan(10);
    }

    for (const photo of gallery.filter(({ kind }) => kind === "image")) {
      expect(photo.width ?? 0).toBeGreaterThan(0);
      expect(photo.height ?? 0).toBeGreaterThan(photo.width ?? 0);
      expect(photo.alt.en.length).toBeGreaterThan(10);
      expect(photo.alt.fr.length).toBeGreaterThan(10);
    }
  });

  it("keeps products without verified process media to their product image", () => {
    const product = products.find(({ slug }) => slug === "soybeans");
    if (!product) throw new Error("Soybeans product data is missing");

    expect(productGalleryMedia(product)).toEqual([
      expect.objectContaining({
        kind: "image",
        src: product.image,
        alt: product.imageAlt,
      }),
    ]);
  });
});
