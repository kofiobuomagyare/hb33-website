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
`src/lib/products.ts` (all 16 content languages, typed).

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
