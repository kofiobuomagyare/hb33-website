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

const lastModified = "2026-10-15";

type Entry = {
  url: string;
  changeFrequency: string;
  priority: number;
};

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function buildEntries(): Entry[] {
  const entries: Entry[] = [];
  for (const locale of locales) {
    for (const route of staticRoutes) {
      entries.push({
        url: `${site.url}/${locale}${route}`,
        changeFrequency: route === "" ? "weekly" : "monthly",
        priority: route === "" ? 1 : route === "/products" ? 0.9 : 0.7,
      });
    }
    for (const slug of productSlugs) {
      entries.push({
        url: `${site.url}/${locale}/products/${slug}`,
        changeFrequency: "monthly",
        priority: 0.8,
      });
    }
  }
  return entries;
}

export function GET() {
  const urls = buildEntries()
    .map(
      (entry) =>
        `  <url>\n` +
        `    <loc>${escapeXml(entry.url)}</loc>\n` +
        `    <lastmod>${lastModified}</lastmod>\n` +
        `    <changefreq>${entry.changeFrequency}</changefreq>\n` +
        `    <priority>${entry.priority.toFixed(1)}</priority>\n` +
        `  </url>`,
    )
    .join("\n");

  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    `${urls}\n` +
    `</urlset>\n`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
