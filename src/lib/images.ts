import type { Localized } from "./products";

export interface SiteImage {
  src: string;
  alt: Localized;
  /** Photographer / source credit (proper name, not translated). */
  credit: string;
  creditUrl: string;
  license: string;
}

export interface SiteVideo {
  src: string;
  /** Preview frame shown before the visitor presses play. */
  poster: string;
  alt: Localized;
  credit: string;
  creditUrl: string;
  license: string;
  note?: Localized;
}

const file = (name: string, width = 1280) =>
  `https://commons.wikimedia.org/wiki/Special:FilePath/${name}?width=${width}`;

/**
 * Site-wide editorial imagery. Every photo is visually verified to match
 * its subject; all are Wikimedia Commons files (CC BY-SA, CC0 or public
 * domain — see `credit`/`license`). Replace with owned HB33 photography
 * before commercial launch.
 */
export const siteImages: Record<"hero" | "logistics" | "about" | "fermentation", SiteImage> = {
  hero: {
    src: file(
      "Cocoa_farmer_David_Kebu_Jnr_holding_the_finished_product,_dried_cocoa_beans_ready_for_export._(10687070725).jpg",
      1920,
    ),
    alt: {
      en: "Cocoa farmer holding dried cocoa beans ready for export",
      fr: "Producteur de cacao tenant des fèves séchées prêtes pour l’export",
    },
    credit: "Irene Scott/AusAID",
    creditUrl:
      "https://commons.wikimedia.org/wiki/File:Cocoa_farmer_David_Kebu_Jnr_holding_the_finished_product,_dried_cocoa_beans_ready_for_export._(10687070725).jpg",
    license: "CC BY 2.0",
  },
  logistics: {
    src: file("Port_Jersey_container_ship_sunset_2018.jpg"),
    alt: {
      en: "Container ship at port at sunset, ready for export",
      fr: "Porte-conteneurs au port au coucher du soleil, prêt pour l’export",
    },
    credit: "Eric Kilby",
    creditUrl:
      "https://commons.wikimedia.org/wiki/File:Port_Jersey_container_ship_sunset_2018.jpg",
    license: "CC BY-SA 2.0",
  },
  about: {
    src: file("Cocoa_beans_drying_Mpenkro_2014_B002a.jpg"),
    alt: {
      en: "Cocoa beans sun-drying on raised trays in West Africa",
      fr: "Fèves de cacao séchant au soleil sur claies en Afrique de l’Ouest",
    },
    credit: "Francesco Veronesi",
    creditUrl:
      "https://commons.wikimedia.org/wiki/File:Cocoa_beans_drying_Mpenkro_2014_B002a.jpg",
    license: "CC BY-SA 2.0",
  },
  fermentation: {
    src: file("Fermentation_of_cacao_seeds.jpg"),
    alt: {
      en: "Cocoa beans fermenting under banana leaves in wooden boxes",
      fr: "Fèves de cacao en fermentation sous des feuilles de bananier dans des caisses en bois",
    },
    credit: "Scot Nelson",
    creditUrl: "https://commons.wikimedia.org/wiki/File:Fermentation_of_cacao_seeds.jpg",
    license: "CC0",
  },
};

/**
 * Short, muted process clips. They never autoplay: visitors choose to play
 * them, and each has a poster frame plus a caption with its source.
 */
export const siteVideos: Record<"fermentation" | "shipping", SiteVideo> = {
  fermentation: {
    src: "https://upload.wikimedia.org/wikipedia/commons/4/46/Cocoa_Fermentation.webm",
    poster: siteImages.fermentation.src,
    alt: {
      en: "Cocoa beans fermenting at origin",
      fr: "Fèves de cacao en fermentation à l’origine",
    },
    credit: "Bhat‘n’ Bhat",
    creditUrl: "https://commons.wikimedia.org/wiki/File:Cocoa_Fermentation.webm",
    license: "CC BY 3.0",
    note: {
      en: "Silent clip · Wikimedia Commons",
      fr: "Séquence muette · Wikimedia Commons",
    },
  },
  shipping: {
    src: "https://upload.wikimedia.org/wikipedia/commons/f/f5/MSC_Paris_-_berthing_at_BCT_Gdynia%2C_Timelapse..webm",
    poster: siteImages.logistics.src,
    alt: {
      en: "Container ship berthing at a terminal",
      fr: "Porte-conteneurs à quai dans un terminal",
    },
    credit: "PaSt Photo",
    creditUrl:
      "https://commons.wikimedia.org/wiki/File:MSC_Paris_-_berthing_at_BCT_Gdynia,_Timelapse..webm",
    license: "CC BY 3.0",
    note: {
      en: "Silent timelapse · Wikimedia Commons",
      fr: "Timelapse muet · Wikimedia Commons",
    },
  },
};

