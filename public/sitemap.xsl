<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet
  version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:s="http://www.sitemaps.org/schemas/sitemap/0.9"
  exclude-result-prefixes="s"
>
  <xsl:output method="html" encoding="UTF-8" indent="yes" doctype-system="about:legacy-compat" />

  <xsl:template match="/">
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="noindex" />
        <title>HB33 · Sitemap</title>
        <style>
          :root { color-scheme: light; }
          * { box-sizing: border-box; }
          body {
            margin: 0;
            padding: 2.5rem 1rem 3rem;
            background: #faf4e8;
            color: #241611;
            font-family: Inter, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
            -webkit-font-smoothing: antialiased;
          }
          .wrap { max-width: 64rem; margin: 0 auto; }
          .eyebrow {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            font-size: 0.7rem;
            font-weight: 700;
            letter-spacing: 0.2em;
            text-transform: uppercase;
            color: #7e4a1f;
          }
          .eyebrow::before {
            content: "";
            width: 0.4rem;
            height: 0.4rem;
            border-radius: 999px;
            background: #a8622c;
          }
          h1 {
            font-family: Fraunces, Georgia, "Times New Roman", serif;
            font-size: clamp(2rem, 5vw, 3rem);
            font-weight: 600;
            letter-spacing: -0.01em;
            margin: 0.6rem 0 0.5rem;
          }
          .lead { margin: 0 0 1.75rem; max-width: 40rem; line-height: 1.6; color: #6b5c4b; }
          .panel {
            background: #fff;
            border: 1px solid #e3d3b4;
            border-radius: 1.5rem;
            overflow: hidden;
            box-shadow: 0 18px 40px -24px rgba(28, 17, 10, 0.4);
          }
          table { width: 100%; border-collapse: collapse; font-size: 0.875rem; }
          thead { background: #1c110a; color: #faf4e8; }
          th {
            text-align: left;
            font-size: 0.68rem;
            text-transform: uppercase;
            letter-spacing: 0.12em;
            padding: 0.85rem 1.1rem;
            font-weight: 700;
          }
          td { padding: 0.85rem 1.1rem; border-top: 1px solid #efe4cd; vertical-align: top; }
          tbody tr:nth-child(even) { background: #fdf9f0; }
          a { color: #7e4a1f; text-decoration: none; word-break: break-all; }
          a:hover { text-decoration: underline; }
          .muted { color: #6b5c4b; white-space: nowrap; }
          .pill {
            display: inline-block;
            padding: 0.15rem 0.6rem;
            border-radius: 999px;
            background: #f2e7d0;
            color: #7e4a1f;
            font-size: 0.72rem;
            font-weight: 700;
            text-transform: capitalize;
          }
          .count { margin: 0.85rem 0.2rem 0; font-size: 0.8rem; color: #6b5c4b; }
          @media (max-width: 640px) {
            th:nth-child(3), td:nth-child(3),
            th:nth-child(4), td:nth-child(4) { display: none; }
          }
        </style>
      </head>
      <body>
        <div class="wrap">
          <p class="eyebrow">HB33</p>
          <h1>Sitemap</h1>
          <p class="lead">
            Every indexable page on this site, in standard XML sitemap format. Search engines read
            this file directly — this table is just a human-friendly view.
          </p>
          <div class="panel">
            <table>
              <thead>
                <tr>
                  <th scope="col">URL</th>
                  <th scope="col">Last modified</th>
                  <th scope="col">Change frequency</th>
                  <th scope="col">Priority</th>
                </tr>
              </thead>
              <tbody>
                <xsl:for-each select="s:urlset/s:url">
                  <tr>
                    <td><a href="{s:loc}"><xsl:value-of select="s:loc" /></a></td>
                    <td class="muted"><xsl:value-of select="s:lastmod" /></td>
                    <td><span class="pill"><xsl:value-of select="s:changefreq" /></span></td>
                    <td class="muted"><xsl:value-of select="s:priority" /></td>
                  </tr>
                </xsl:for-each>
              </tbody>
            </table>
          </div>
          <p class="count"><xsl:value-of select="count(s:urlset/s:url)" /> URLs</p>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
