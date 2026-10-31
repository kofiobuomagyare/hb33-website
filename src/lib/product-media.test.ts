// Runtime validation coverage for product media selection.
import { describe, expect, it } from "vitest";
import { products } from "./products";
import { productGalleryMedia } from "./product-media";

describe("product gallery media", () => {
  it("includes the verified image and process media for cocoa beans", () => {
    const product = products.find(({ slug }) => slug === "cocoa-beans");
    if (!product) throw new Error("Cocoa Beans product data is missing");

    const gallery = productGalleryMedia(product);

    expect(gallery.map(({ kind }) => kind)).toEqual(["image", "image", "video"]);
    expect(gallery[0].src).toBe(product.image);
    expect(gallery[0].alt.en).toBe(product.imageAlt.en);
    expect(gallery[2].src).toContain("Cocoa_Fermentation.webm");
    expect(gallery[2].poster).toBeTruthy();
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
