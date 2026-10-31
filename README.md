# HB33 — Bulk Agricultural Commodities Website

Multilingual (EN/FR) B2B e-commerce inquiry site for **HB33**, a West African
supplier of bulk cocoa products, soybeans and cocopeat. Container-based
ordering (minimum 1 shipping container), product catalogue with SEO-friendly
detail pages, and a validated quote workflow that currently opens WhatsApp
with a pre-filled message for the visitor to review and send.

Stack: **Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 ·
React Hook Form + Zod · Lucide icons** — no database required for development.

## Quick start

```bash
npm install
cp .env.example .env.local   # then fill in contact details (see below)
npm run dev                  # http://localhost:3000 (redirects to /en)
```

```bash
npm run build
npm start
npm run lint
npm test
```

## Configuration

Copy `.env.example` to `.env.local`. Key variables:

| Variable | Required | Purpose |
|---|---|---|
| `NEXT_PUBLIC_CONTACT_EMAIL` | yes | Public email shown site-wide + `mailto:` links |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | yes (forms) | International format, no `+`/spaces (e.g. `15551234567`). Forms do not fall back to email when this is missing |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | for Search Console | Verification token from Google's HTML-tag method (the `content` value only) |
| `NEXT_PUBLIC_COMPANY_LOCATION` | no | Base shown in footer (default `West Africa`) |
| `NEXT_PUBLIC_SITE_URL` | yes (prod) | Canonical URL origin for SEO/sitemap (default `https://hb33international.com`) |
| `INQUIRY_TO_EMAIL` | for email alerts | Address receiving inquiry notifications |
| `RESEND_API_KEY` | for email alerts | [Resend](https://resend.com) API key. A sent alert counts as a delivered inquiry |
| `INQUIRY_WEBHOOK_URL` | optional | Generic POST webhook receiving every inquiry JSON |
| `KV_REST_API_URL` + `KV_REST_API_TOKEN` | for Vercel prod | Upstash Redis / Vercel KV REST credentials. Durable inquiry storage on serverless hosts |
| `UPSTASH_REDIS_REST_URL` + `UPSTASH_REDIS_REST_TOKEN` | alternative | Same as above for direct Upstash projects |
| `PHOTON_URL` | optional | Self-hosted [Photon](https://photon.komoot.io/) endpoint for location autocomplete (public instance needs no key) |
| `LOCATION_SEARCH_EMAIL` | optional | Contact address sent in the Photon request User-Agent |

Update business facts in one place: `src/lib/site.ts`. Product content lives in
`src/lib/products.ts` (all 16 content languages, typed).

The website's quote and contact forms currently open WhatsApp directly; the
existing inquiry API and email delivery integrations are retained but are not
used by these forms while WhatsApp-first submissions are active.

## Google Search Console

1. Add the production site in [Google Search Console](https://search.google.com/search-console).
   A **Domain** property verified by DNS covers all protocols and subdomains;
   alternatively, choose a **URL-prefix** property for the exact canonical
   origin configured in `NEXT_PUBLIC_SITE_URL`.
2. For URL-prefix verification, choose **HTML tag** verification and copy the
   token from the tag's `content` attribute (not the whole `<meta>` element)
   into `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`.
3. Set `NEXT_PUBLIC_SITE_URL` to the canonical production origin, redeploy,
   then return to Search Console and select **Verify**. The token is rendered
   as Next.js `google-site-verification` metadata on every localized page.
   DNS verification is also supported directly in Search Console and does not
   require an application token.
4. In Search Console, submit `https://<your-canonical-host>/sitemap.xml` under
   **Sitemaps**, then use **URL inspection** to request indexing of important
   product and landing pages. Keep the submitted host consistent with
   `NEXT_PUBLIC_SITE_URL`.

The site publishes localized canonical/hreflang links, unique product titles
and descriptions, Open Graph/Twitter previews, `Product` and `BreadcrumbList`
JSON-LD, an XML sitemap, and a `robots.txt` that references that sitemap and
disallows the inquiry/location API endpoints. Product structured data does
not invent prices or availability; add real offer data only if the business
publishes confirmed terms on the site.

## Languages & locales

20 locale variants across 16 languages, routed as `/en/...`, `/tw/...`,
`/ha/...` etc. with full hreflang coverage and Accept-Language detection
(exact region first, then base language) in `src/proxy.ts`.

| Locale | Language | Status | Notes |
|---|---|---|---|
| `en`, `en-GH`, `en-NG` | English (+Ghana/Nigeria) | complete | Regional variants share the English pack; dates/numbers format per region |
| `fr`, `fr-CI`, `fr-SN` | French (+Côte d’Ivoire/Sénégal) | complete | Regional variants share the French pack |
| `ak` | Akan | complete | All interface strings translated; UI and product copy translated |
| `tw` | Twi (Asante Twi) | complete | Shares much of the Akan pack; UI and product copy translated |
| `fat` | Fante (Mfantse) | complete | Distinct Fante orthography; UI and product copy translated |
| `ee` | Ewe (Ʋegbe) | complete | All interface strings translated; UI and product copy translated |
| `gaa` | Ga | complete | All interface strings translated; UI and product copy translated |
| `ig` | Igbo | complete | All interface strings translated; UI and product copy translated |
| `yo` | Yorùbá | complete | All interface strings translated; UI and product copy translated |
| `ha` | Hausa | complete | All interface strings translated; UI and product copy translated |
| `de` | German (Deutsch) | complete | All interface strings translated; UI and product copy translated |
| `pt` | Portuguese (Português) | complete | All interface strings translated; UI and product copy translated |
| `sw` | Swahili (Kiswahili) | complete | All interface strings translated; UI and product copy translated |
| `ar` | Arabic (العربية) | complete | All interface strings translated; rendered right-to-left (`dir="rtl"`, logical CSS properties throughout) |
| `ja` | Japanese (日本語) | complete | All interface strings translated; UI and product copy translated |
| `zh-CN` | Chinese Simplified (简体中文) | complete | All interface strings translated; UI and product copy translated |

All 14 non-English/French locale packs now cover the full UI **and** all
long-form product copy. Both were produced with AI assistance and **need
native-speaker proofreading before commercial use** — this applies especially to
the Ghanaian and Nigerian languages (`ak`, `tw`, `fat`, `ee`, `gaa`, `ig`, `yo`,
`ha`), where tone, register and dialect choices matter most. Any missing key
renders in English automatically, so pages never break.

**Adding a language:** append the code to `localeCodes` and a registry entry
(name, group, Intl tag, fallback chain) in `src/lib/i18n.ts`, optionally add
`src/lib/dictionaries/<language>.ts` (a partial patch — translate only what
you can) and register it in `src/lib/dictionaries.ts`. No other changes needed:
routing, sitemap, hreflang, the switcher and language detection pick it up.

## Project structure

```
src/
  app/
    [locale]/            # en + fr routed pages (home, products, product detail,
                        # about, how-it-works, request-quote, contact, privacy, terms)
    api/inquiries/      # POST {kind: quote|contact} — zod validation, MOQ
                        # enforcement, reference number, KV/webhook/email/file delivery
    api/locations/      # worldwide port/city/country/airport autocomplete
    sitemap.xml/route.ts robots.ts
  components/           # Header, Footer, ProductCard, ProductCatalog (search/filter/sort),
                        # QuoteForm (multi-product, RHF+Zod), ContactForm, FaqList, ui
  lib/                  # site, i18n, dictionaries, products, validation, inquiries
  proxy.ts              # locale prefixing + Accept-Language detection (fr)
data/inquiries.jsonl    # created at runtime — server-side inquiry log (git-ignored)
```

## Order inquiry workflow

1. Browse `/products` (search, category filter, sort) → product detail pages.
2. “Request a Quote” deep-links to `/request-quote?product=<slug>` with the
   product preselected; multiple products/line-items supported.
3. Required fields and every line item (minimum **1 container**) are validated
   client-side with RHF/Zod before a submission link is opened.
4. The visitor reviews and sends the pre-filled message in WhatsApp. Product
   links identify the message as an Enquiry; the general form identifies it as
   a Request a Quote. Contact messages are labelled Contact.

## Sitemap

`/sitemap.xml` returns standard XML with `application/xml` to crawlers and
modern HTML to browser requests, without an XSLT dependency. The XML endpoint
is referenced by `/robots.txt`; the same URL list is shown in the browser view.
The existing sitemap entries are generated from configured locales and
product slugs.

## Production notes

- Set all env vars in your host (Vercel / Node). `data/` persistence is
  ephemeral on serverless hosts — set `INQUIRY_WEBHOOK_URL` or a database
  adapter for durable storage (the API already forwards a hook; swap the
  `persistRecord` implementation when ready).
- No `OBED LLC` references remain; branding is centralized in `src/lib/site.ts`
  and the dictionaries — search the repo to verify before launch.
- Images are visually verified Wikimedia Commons files (see `src/lib/products.ts`
  and `src/lib/images.ts`, credited on-page and in the footer). Most are
  CC BY-SA; replace with owned product photography before commercial launch.
- Legal pages (`/privacy`, `/terms`) are starter content flagged for counsel
  review in the copy itself.
