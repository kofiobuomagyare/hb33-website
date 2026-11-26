import type { Localized, Product } from "./products";
import { siteImages, siteVideos, type SiteImage, type SiteVideo } from "./images";

/** A single image or video with the metadata needed for an on-image credit pill. */
export interface MediaAsset {
  kind: "image" | "video";
  src: string;
  poster?: string;
  /** Small, already-optimized preview used by the gallery grid and stage backdrop. */
  thumb?: string;
  alt: Localized;
  credit: string;
  /** Omitted for owned HB33 media that has no external source page. */
  creditUrl?: string;
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

const cocoaBeansPath = "/media/cocoa-beans";

/** HB33-owned field photography and footage, optimized in `public/media/cocoa-beans`. */
const cocoaBeansMediaNames = {
  warehouse: {
    src: `${cocoaBeansPath}/cocoa-beans-warehouse.webp`,
    alt: {
      en: "Jute sacks of dried cocoa beans stacked in the HB33 warehouse",
      fr: "Sacs de jute de fèves de cacao séchées empilés dans l’entrepôt HB33",
    },
    width: 960,
    height: 1280,
  },
  podsTree: {
    src: `${cocoaBeansPath}/cocoa-beans-pods-tree.webp`,
    alt: {
      en: "Yellow and green cocoa pods growing on a plantation tree",
      fr: "Cabosses jaunes et vertes sur un cacaoyer de plantation",
    },
    width: 810,
    height: 1080,
  },
  sunDrying: {
    src: `${cocoaBeansPath}/cocoa-beans-sun-drying.webp`,
    alt: {
      en: "Dried cocoa beans spread out to sun-dry on mats",
      fr: "Fèves de cacao séchées étalées sur des nattes au soleil",
    },
    width: 810,
    height: 1080,
  },
  treeYellowPods: {
    src: `${cocoaBeansPath}/cocoa-beans-tree-yellow-pods.webp`,
    alt: {
      en: "A cocoa tree heavy with ripe yellow pods",
      fr: "Un cacaoyer chargé de cabosses jaunes mûres",
    },
    width: 810,
    height: 1080,
  },
  podCloseup: {
    src: `${cocoaBeansPath}/cocoa-beans-pod-closeup.webp`,
    alt: {
      en: "Close-up of a ripe yellow cocoa pod",
      fr: "Gros plan sur une cabosse de cacao jaune mûre",
    },
    width: 810,
    height: 1080,
  },
  trunkPods: {
    src: `${cocoaBeansPath}/cocoa-beans-trunk-pods.webp`,
    alt: {
      en: "Cocoa pods growing along the trunk of a mature tree",
      fr: "Cabosses poussant le long du tronc d’un arbre mature",
    },
    width: 810,
    height: 1080,
  },
  treeCanopy: {
    src: `${cocoaBeansPath}/cocoa-beans-tree-canopy.webp`,
    alt: {
      en: "Mature cocoa tree with pods at different stages of ripeness",
      fr: "Cacaoyer mature avec des cabosses à différents stades de maturité",
    },
    width: 810,
    height: 1080,
  },
} satisfies Record<
  string,
  { src: string; alt: Localized; width: number; height: number }
>;

function cocoaBeansImage(name: keyof typeof cocoaBeansMediaNames): MediaAsset {
  const image = cocoaBeansMediaNames[name];
  return {
    kind: "image",
    src: image.src,
    thumb: image.src.replace(/\.webp$/, "-thumb.webp"),
    alt: image.alt,
    credit: "HB33",
    license: "Original",
    width: image.width,
    height: image.height,
  };
}

function cocoaBeansVideo(
  name: string,
  alt: Localized,
): MediaAsset {
  return {
    kind: "video",
    src: `${cocoaBeansPath}/${name}.mp4`,
    poster: `${cocoaBeansPath}/${name}-poster.webp`,
    thumb: `${cocoaBeansPath}/${name}-poster-thumb.webp`,
    alt,
    credit: "HB33",
    license: "Original",
    width: 480,
    height: 848,
  };
}

/**
 * The owned Cocoa Beans media set. Every clip and photo is used in the
 * gallery; the grid lets visitors jump straight to any of them.
 */
export const cocoaBeansGalleryMedia: MediaAsset[] = [
  cocoaBeansImage("warehouse"),
  cocoaBeansImage("podsTree"),
  cocoaBeansVideo("cocoa-beans-pod-opening", {
    en: "Hands opening a freshly harvested cocoa pod to reveal the beans",
    fr: "Mains ouvrant une cabosse de cacao fraîchement récoltée pour révéler les fèves",
  }),
  cocoaBeansImage("sunDrying"),
  cocoaBeansImage("treeYellowPods"),
  cocoaBeansVideo("cocoa-beans-farm-walk", {
    en: "A walk through a shaded West African cocoa farm",
    fr: "Promenade dans une cacaoyère ombragée d’Afrique de l’Ouest",
  }),
  cocoaBeansImage("podCloseup"),
  cocoaBeansImage("trunkPods"),
  cocoaBeansVideo("cocoa-beans-orchard-floor", {
    en: "Cocoa trees and leaf litter on the orchard floor",
    fr: "Cacaoyers et litière de feuilles sur le sol de la plantation",
  }),
  cocoaBeansImage("treeCanopy"),
];

const soybeansPath = "/media/soybeans";

const soybeansMediaNames = {
  main: {
    src: `${soybeansPath}/soybeans-main.webp`,
    alt: {
      en: "Soya beans",
      fr: "Soja en grains",
    },
    width: 780,
    height: 1040,
  },
  field1: {
    src: `${soybeansPath}/soybeans-1.webp`,
    alt: {
      en: "Soya bean field",
      fr: "Champ de soja",
    },
    width: 744,
    height: 992,
  },
  field2: {
    src: `${soybeansPath}/soybeans-2.webp`,
    alt: {
      en: "Soya bean plants",
      fr: "Plants de soja",
    },
    width: 744,
    height: 992,
  },
  field3: {
    src: `${soybeansPath}/soybeans-3.webp`,
    alt: {
      en: "Soya bean crop",
      fr: "Culture de soja",
    },
    width: 540,
    height: 960,
  },
} satisfies Record<
  string,
  { src: string; alt: Localized; width: number; height: number }
>;

function soybeansImage(name: keyof typeof soybeansMediaNames): MediaAsset {
  const image = soybeansMediaNames[name];
  return {
    kind: "image",
    src: image.src,
    thumb: image.src.replace(/\.webp$/, "-thumb.webp"),
    alt: image.alt,
    credit: "HB33",
    license: "Original",
    width: image.width,
    height: image.height,
  };
}

export const soybeansGalleryMedia: MediaAsset[] = [
  soybeansImage("main"),
  soybeansImage("field1"),
  soybeansImage("field2"),
  soybeansImage("field3"),
];

/** Verified product-specific assets for the product detail gallery. */
export function productGalleryMedia(product: Product): MediaAsset[] {
  if (product.slug === "cocoa-beans") return cocoaBeansGalleryMedia;
  if (product.slug === "soybeans") return soybeansGalleryMedia;
  const media = [productImageMedia(product)];
  const video = productVideoFor(product.slug);
  if (video) media.push(imageToMedia(siteImages.about), video);
  return media;
}
