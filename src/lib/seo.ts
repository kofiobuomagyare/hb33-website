import type { Metadata } from "next";
import { site } from "./site";

export const defaultOgImage = {
  url: "https://commons.wikimedia.org/wiki/Special:FilePath/Cocoa_farmer_David_Kebu_Jnr_holding_the_finished_product,_dried_cocoa_beans_ready_for_export._(10687070725).jpg?width=1200",
  width: 1200,
  height: 800,
  alt: "HB33 — bulk cocoa from West Africa",
};

/**
 * Per-page Open Graph + Twitter metadata. Every page passes its own
 * title/description/URL *including* a preview image — page-level
 * openGraph objects replace (not merge with) the layout defaults,
 * so omitting `images` here would silently drop the social preview.
 */
export function socialMetadata(
  path: string,
  title: string,
  description: string,
  image: { url: string; width: number; height: number; alt: string } = defaultOgImage,
): Pick<Metadata, "openGraph" | "twitter"> {
  return {
    openGraph: {
      title,
      description,
      url: `${site.url}${path}`,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image.url],
    },
  };
}
