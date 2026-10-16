import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n";
import { site } from "@/lib/site";
import { productSlugs } from "@/lib/products";

const staticRoutes = [
  "",
  "/products",
  "/about",
  "/how-it-works",
  "/request-quote",
  "/contact",
  "/privacy",
  "/terms",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];
  for (const locale of locales) {
    for (const route of staticRoutes) {
      entries.push({
        url: `${site.url}/${locale}${route}`,
        lastModified: "2026-10-15",
        changeFrequency: route === "" ? "weekly" : "monthly",
        priority: route === "" ? 1 : route === "/products" ? 0.9 : 0.7,
      });
    }
    for (const slug of productSlugs) {
      entries.push({
        url: `${site.url}/${locale}/products/${slug}`,
        lastModified: "2026-10-15",
        changeFrequency: "monthly",
        priority: 0.8,
      });
    }
  }
  return entries;
}
