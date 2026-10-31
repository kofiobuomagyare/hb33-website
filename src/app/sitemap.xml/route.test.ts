// Runtime validation coverage for sitemap delivery.
import { describe, expect, it } from "vitest";
import { GET } from "./route";
import { site } from "@/lib/site";

describe("sitemap route", () => {
  it("serves crawler-compatible sitemap XML with product URLs", async () => {
    const response = GET(
      new Request(`${site.url}/sitemap.xml?format=xml`, {
        headers: { accept: "text/html" },
      }),
    );
    const xml = await response.text();

    expect(response.headers.get("content-type")).toContain("application/xml");
    expect(xml).toContain('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');
    expect(xml).toContain(`${site.url}/en/products/cocoa-beans`);
    expect(xml).not.toContain("xml-stylesheet");
  });

  it("serves an HTML sitemap view to browsers without an XSLT dependency", async () => {
    const response = GET(
      new Request(`${site.url}/sitemap.xml`, {
        headers: { accept: "text/html" },
      }),
    );
    const html = await response.text();

    expect(response.headers.get("content-type")).toContain("text/html");
    expect(html).toContain("<title>HB33 Sitemap</title>");
    expect(html).toContain(`${site.url}/en/products/cocoa-beans`);
    expect(html).not.toContain("xml-stylesheet");
  });
});
