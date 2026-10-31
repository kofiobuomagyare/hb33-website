// Runtime validation coverage for crawler directives.
import { describe, expect, it } from "vitest";
import robots from "./robots";
import { site } from "@/lib/site";

describe("robots configuration", () => {
  it("allows public crawling and references the sitemap", () => {
    const config = robots();

    expect(config.rules).toEqual([
      { userAgent: "*", allow: "/", disallow: ["/api/"] },
    ]);
    expect(config.sitemap).toBe(`${site.url}/sitemap.xml`);
  });
});
