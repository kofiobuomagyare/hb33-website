# HB33 — Bulk Agricultural Commodities Website

Multilingual (EN/FR) B2B e-commerce inquiry site for **HB33**, a West African
supplier of bulk cocoa products, soybeans and cocopeat. Container-based
ordering (minimum 1 shipping container), product catalogue with SEO-friendly
detail pages, and a server-validated quote workflow with email + WhatsApp
fallbacks.

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
```

## Configuration

Copy `.env.example` to `.env.local`. Key variables:

| Variable | Required | Purpose |
|---|---|---|
| `NEXT_PUBLIC_CONTACT_EMAIL` | yes | Public email shown site-wide + `mailto:` links |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | recommended | International format, no `+`/spaces (e.g. `15551234567`). Leave empty and the site hides WhatsApp CTAs with an honest explanatory note instead of fake buttons |
| `NEXT_PUBLIC_COMPANY_LOCATION` | no | Base shown in footer (default `West Africa`) |
| `NEXT_PUBLIC_SITE_URL` | yes (prod) | Canonical URL origin for SEO/sitemap (default `https://hb33.com`) |
| `INQUIRY_TO_EMAIL` | for email alerts | Address receiving inquiry notifications |
| `RESEND_API_KEY` | for email alerts | [Resend](https://resend.com) API key. If unset, inquiries are still **stored server-side** and the confirmation screen says so honestly, offering email/WhatsApp resend with the reference number |
| `INQUIRY_WEBHOOK_URL` | optional | Generic POST webhook receiving every inquiry JSON |

Update business facts in one place: `src/lib/site.ts`. Product content lives in
`src/lib/products.ts` (English/French, typed).

## Languages & locales

14 locale variants across 10 languages, routed as `/en/...`, `/tw/...`,
`/ha/...` etc. with full hreflang coverage and Accept-Language detection
(exact region first, then base language) in `src/proxy.ts`.

| Locale | Language | Status | Notes |
|---|---|---|---|
| `en`, `en-GH`, `en-NG` | English (+Ghana/Nigeria) | complete | Regional variants share the English pack; dates/numbers format per region |
| `fr`, `fr-CI`, `fr-SN` | French (+Côte d’Ivoire/Sénégal) | complete | Regional variants share the French pack |
| `ak` | Akan | starter | Core UI translated; long-form falls back to English |
| `tw` | Twi (Asante Twi) | starter | Falls back through Akan, then English |
| `fat` | Fante (Mfantse) | starter | Falls back through Akan, then English |
| `ee` | Ewe (Eʋegbe) | starter | Core UI translated |
| `gaa` | Ga | starter | Core UI translated |
| `ig` | Igbo | starter | Core UI translated |
| `yo` | Yorùbá | starter | Core UI translated |
| `ha` | Hausa | starter | Core UI translated |
| `de` | German (Deutsch) | starter | Core UI translated |
| `pt` | Portuguese (Português) | starter | Core UI translated |
| `sw` | Swahili (Kiswahili) | starter | Core UI translated |
| `ar` | Arabic (العربية) | starter | Core UI translated; rendered right-to-left (`dir="rtl"`, logical CSS properties throughout) |
| `ja` | Japanese (日本語) | starter | Core UI translated |
| `zh-CN` | Chinese Simplified (简体中文) | starter | Core UI translated |

Starter packs need native-speaker review before commercial use — anything not
yet translated renders in English automatically, so pages never break.

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
                        # enforcement, reference number, JSONL storage, email/webhook
    sitemap.ts robots.ts
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
3. Every line item enforces **≥ 1 container** client-side (RHF/Zod) **and**
   server-side (API returns 422 otherwise).
4. On success the API returns a reference (`HB33-XXXXXX`); the UI shows
   confirmation + next steps. If `RESEND_API_KEY` is unset, the UI states
   explicitly that email forwarding is off and offers `mailto:` + WhatsApp
   (prefilled message with reference, products, quantities) fallbacks.

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
