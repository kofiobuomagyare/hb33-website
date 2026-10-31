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

export function GET(request: Request) {
  const entries = buildEntries();
  const urls = entries
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
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    `${urls}\n` +
    `</urlset>\n`;

  const headers = {
    "Cache-Control": "public, max-age=3600",
    Vary: "Accept, User-Agent",
  };
  const forceXml = new URL(request.url).searchParams.get("format") === "xml";
  const userAgent = request.headers.get("user-agent")?.toLowerCase() ?? "";
  const isSearchCrawler = /googlebot|google-inspectiontool|bingbot/.test(userAgent);
  if (
    !forceXml &&
    !isSearchCrawler &&
    request.headers.get("accept")?.toLowerCase().includes("text/html")
  ) {
    const rows = entries
      .map(
        (entry) =>
          `<tr><td><a href="${escapeXml(entry.url)}">${escapeXml(entry.url)}</a></td>` +
          `<td>${lastModified}</td><td>${entry.changeFrequency}</td>` +
          `<td>${entry.priority.toFixed(1)}</td></tr>`,
      )
      .join("");

    const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="robots" content="noindex">
    <title>HB33 Sitemap</title>
    <style>
      :root { color-scheme: light; font-family: system-ui, sans-serif; color: #241611; background: #faf4e8; }
      body { margin: 0; padding: 2rem 1rem; }
      main { max-width: 64rem; margin: auto; }
      h1 { font-family: Georgia, serif; }
      p { color: #6b5c4b; line-height: 1.6; }
      .table-wrap { overflow-x: auto; background: white; border: 1px solid #e3d3b4; border-radius: 1rem; }
      table { width: 100%; border-collapse: collapse; font-size: .9rem; }
      th, td { padding: .8rem 1rem; border-bottom: 1px solid #efe4cd; text-align: left; }
      th { background: #1c110a; color: #faf4e8; font-size: .75rem; text-transform: uppercase; }
      a { color: #7e4a1f; overflow-wrap: anywhere; }
      @media (max-width: 640px) { th:nth-child(n+3), td:nth-child(n+3) { display: none; } }
    </style>
  </head>
  <body>
    <main>
      <h1>HB33 Sitemap</h1>
      <p>Indexable pages on this site. Search engines receive this sitemap in standard XML format.</p>
      <p><a href="/sitemap.xml?format=xml" type="application/xml">View the XML sitemap</a> · ${entries.length} URLs</p>
      <div class="table-wrap">
        <table>
          <thead><tr><th>URL</th><th>Last modified</th><th>Change frequency</th><th>Priority</th></tr></thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
    </main>
  </body>
</html>`;

    return new Response(html, {
      headers: { ...headers, "Content-Type": "text/html; charset=utf-8" },
    });
  }

  return new Response(xml, {
    headers: { ...headers, "Content-Type": "application/xml; charset=utf-8" },
  });
}
