# CLAUDE.md — Project Charter: Kaomoji Palette

## What this file is
This is the authoritative context for the project. Read it first and refer back to it
throughout. Where this charter and the visual mockups disagree, **this charter wins.**
The Visily mockups in `./designs` are a visual *reference*, not pixel-perfect law —
refine spacing, polish, and minor layout with good judgment during implementation. The
design is intentionally imperfect; handle small adjustments yourself and flag anything
that needs a product decision.

## The product (in one paragraph)
**Kaomoji Palette** is a fast, mobile-first website for finding and one-click-copying
Japanese kaomoji (顔文字) and emoji. It is **Japan-first**, expanding globally later. It
is free to use, and later adds accounts and a paid tier. Kaomoji are pure text, so there
is no copyright or image-hosting concern. Critically, **the pages are the marketing**:
each category page is an SEO landing page for searches like 「顔文字 コピペ」 or
「かわいい顔文字」. Speed and crawlability are therefore not optional.

## Current status
- **Repository:** https://github.com/senpythondev/kaomoji_service.git — commit and push all
  work here (origin/main).
- Design: 5 mobile screens (home, category, search, detail, about), in `./designs`.
- **Design assets are `.webp` image files** exported from Visily's **free tier**. This means:
  - They are 1× resolution — treat them as a visual reference, not pixel-exact specs.
  - Each image carries a **"Made with Visily" watermark** (usually at the bottom). This is
    an export artifact, **not part of the product** — ignore it and never reproduce it.
    Build only the actual page content.
  - No code or Tailwind config could be exported (free tier). This is intended: Claude Code
    writes clean code from these `.webp` mockups plus this charter — do not look for or rely
    on a Visily code export.
- **Known design issues to FIX during the build (do not reproduce them):**
  1. Some kaomoji render as □ tofu boxes (font glyph coverage) — must render correctly.
  2. Footer shows a hardcoded "© 2024" — must be the **current year, computed dynamically.**
  3. Designs are mobile-only — the build must be **responsive** (mobile + desktop).
  4. Bottom-nav order is inconsistent between screens — standardize it everywhere.
- This is **v1**. Build only the v1 scope below. Do **not** build accounts or payments yet.

## Design files (`./designs`)
Mockup `.webp` files mapped to the page each one represents:
- Home (`/`): `visily-home.webp`, `visily-kaomoji-palette-homepage.webp` — two versions; use
  both as reference. If one is wider, treat it as the desktop layout; ask the PM if they conflict.
- Category, かわいい (`/kaomoji/cute`): `visily-category-kawaii.webp`,
  `visily-かわいい顔文字一覧-カテゴリページ.webp` — two versions of the same page; use both.
- Search results (`/search`): `visily-search-results.webp`
- Emoticon detail (`/kaomoji/[id]`): `visily-emoticon-detail.webp`
- About / 運営者情報 (`/about`): `visily-about.webp`

Notes: the category and home pages each have two mockup versions. One filename contains
Japanese characters; if a tool has trouble with that path, rename it to ASCII (e.g.
`visily-category-kawaii-2.webp`). There is no mockup for the legal/utility pages
(how-to, contact, terms, privacy, 404) — build those from this charter's spec.

## Strategy & guardrails (the "why" behind the decisions)
- SEO is the main growth channel → pages MUST be server-rendered/static and crawlable,
  with fast mobile LCP and clean Japanese metadata.
- v1 cost must be near zero → free hosting tier, **no database in v1.**
- Mobile-first, then responsive desktop.
- Keep v1 lean. Prefer simple over clever. Ask the PM before adding heavy dependencies
  or changing the framework.

## SEO scaling strategy (how we win broad discoverability)
Goal: be discoverable across a **wide spectrum** of Japanese search terms. The correct way
to achieve breadth is **many focused pages**, NOT many keywords per page.

**HARD RULE — never keyword-stuff.** Do not list keywords in text, meta tags, hidden
elements, alt text, or repeated phrases. Modern Google penalizes this and it would suppress
the whole site. Every page is written for humans first. One page = one clear search intent.
If asked to "add more keywords," achieve it by adding **pages** or natural synonyms, never by
cramming terms onto a page.

Breadth comes from three layers:
1. **More category pages** — one page per keyword cluster, each cleanly targeting one intent:
   e.g. かわいい顔文字 / 怒る顔文字 / 泣く顔文字 / 動物顔文字 / お祝い顔文字 / ありがとう・お礼 /
   謝罪・ごめん, etc. Add categories to grow coverage; each gets unique title, intro, and theme.
2. **Detail pages `/kaomoji/[id]`** — the long-tail engine and the single biggest lever for
   "as many search terms as possible." One SSG page per kaomoji; hundreds of them can rank for
   very specific queries no category page will. Each: unique title, short unique description,
   usage example, variations, related links.
3. **Vocabulary coverage via data, not stuffing** — use the `tags` and `reading` fields so each
   kaomoji carries the natural ways people search the same idea (顔文字／かおもじ／kaomoji,
   コピペ／コピー, 絵文字／emoji, conversational terms like 会話・チャット・SNS). On-site search
   uses these; page titles/intros use the **one natural variant** a real person would type.

**Per-page SEO requirements (every indexable page):**
- Unique, natural Japanese `<title>` and `<meta description>` — never templated word-swaps.
- Exactly one keyword-relevant H1; sensible heading hierarchy.
- Self-referencing canonical.
- JSON-LD structured data where it fits (BreadcrumbList on category/detail; ItemList optional).
- Strong internal linking (related categories, related kaomoji, breadcrumbs).
- Fast: SSG, no layout shift, no heavy assets — Core Web Vitals are a ranking factor.
- Unique body copy per page (esp. category intros) — near-duplicate pages get discounted.

**Honest expectation (do not over-promise in copy or code):** a new domain ranks slowly.
Target the long tail first (specific, low-competition queries); head terms like 顔文字 come
later, with real usage and links over months. The winning play is hundreds of clean, fast,
genuinely useful pages — not aggressive optimization of a few.

**Sequencing:** core pages first (category template, search), THEN an SEO scaling pass:
detail-page layer → more category clusters → synonym/tag vocabulary → sitemap.xml + robots.txt
→ register Google Search Console + Bing Webmaster Tools.

## Tech stack — v1 (build this)
- **Framework:** Next.js (App Router) + React + **TypeScript**
- **Styling:** Tailwind CSS. No Visily Tailwind/CSS export is available (free tier), so
  derive the palette, spacing, and typography from the `.webp` mockups in `./designs`.
- **Rendering:** Static Site Generation (SSG). Category and detail pages are generated at
  build time from the kaomoji data. This gives the best SEO and speed.
- **Fonts:** Noto Sans JP via `next/font` (self-hosted). Global font stack:
  `'Noto Sans JP','Hiragino Sans','Yu Gothic',system-ui,'Segoe UI Symbol',sans-serif`
- **Search:** client-side over a prebuilt JSON index (the dataset is small). No server call.
- **Data:** kaomoji stored as **UTF-8** JSON/TS files under `/data` (schema below).
- **Feedback box:** ONE serverless Route Handler at `/api/feedback`. Start simple —
  store submissions to a single hosted destination (a free-tier store or email to the
  operator). This is the only backend piece v1 needs.
- **Hosting:** Vercel (free tier, global CDN, native Next.js). Cloudflare Pages is an
  acceptable alternative.
- **Encoding:** UTF-8 everywhere; `<meta charset="utf-8">`.
- **SEO plumbing:** generate `sitemap.xml` and `robots.txt`; register the site in Google
  Search Console and Bing Webmaster Tools after deploy.

## Tech stack — later phases (do NOT build now; listed so v1 stays forward-compatible)
- **v2 (accounts, favorites, custom kaomoji):** Supabase (Postgres + Auth + row-level
  security) — or Auth.js with a managed Postgres (Neon). Auth providers: **Google + LINE
  Login** (LINE matters in Japan).
- **v3 (paid):** Stripe for JPY subscriptions; add **PayPay + konbini** via a Japanese PSP.
  Add a **特定商取引法に基づく表記** page (legally required before charging). Use web
  checkout to avoid app-store fees.

## Data model — kaomoji
Each entry:
- `id`: string
- `text`: string — the kaomoji itself, e.g. `( ´ ▽ ` )ﾉ`
- `categories`: string[] — e.g. `["happy"]`
- `tags`: string[] — freeform Japanese keywords for search
- `reading`: string — かな/ひらがな yomi to power Japanese search
- `popularity`: number
- `createdAt`: ISO date

Category slugs → Japanese labels:
`happy`→うれしい, `cute`→かわいい, `sad`→悲しい, `angry`→怒る, `surprised`→驚き,
`love`→愛・好き, `greeting`→挨拶・お礼, `apology`→謝る. (emoji categories come later)

## Pages / routes — v1 launch set
- `/` — home
- `/kaomoji/[category]` — category landing, **SSG per category** (the SEO workhorse)
- `/search` — client-side results
- `/kaomoji/[id]` — detail (optional; rich themed background OK here; good for long-tail SEO)
- `/about` — 運営者情報 (real operator photo + 運営者より note)
- `/how-to` — 使い方
- `/contact` — お問い合わせ
- `/terms` — 利用規約
- `/privacy` — プライバシーポリシー
- `/404`

**Important:** the footer links to the about/how-to/contact/terms/privacy pages, so all of
them must exist — no dead links at launch.

Deferred (do not build yet): `/signup` `/login` `/mypage` `/favorites` `/custom`
`/pricing` `/checkout` `/tokushoho`.

## Core UX requirements
- One-tap copy on every kaomoji card; show a 「コピーしました」 toast on success.
- Category theming via CSS variables/gradients + subtle SVG motifs — **NOT** a raster image
  per kaomoji (that would wreck mobile speed). e.g. happy = warm yellow, cute = pink +
  hearts, sad = cool blue. A rich full-bleed themed background is allowed **only** on the
  single-emoticon detail page.
- The kaomoji text is always the visual hero and must keep high contrast against its card.
- Header: logo + prominent search. Footer: trust links + legal links + category links
  (internal linking helps SEO).
- Slogan: 「みんなで、もっと使いやすく。」 Mascot: a simple friendly character; appears in the
  hero, empty states, the copy toast, the feedback box, and the about page.
- Feedback section: warm invitation + text box + 送信 button + a link to the 改善履歴
  (improvement log). Do **not** promise "immediate" reflection of suggestions; the log
  shows real past changes instead.

## Quality bar — definition of done for v1
- All v1 routes implemented; no dead links.
- Responsive: correct on phone and desktop. Desktop swaps the bottom tab bar for a top nav
  and uses multi-column card grids (4–5 columns).
- **No mojibake:** every shipped kaomoji renders on iOS, Android, and Windows. Test and
  drop/replace any that don't.
- Lighthouse on mobile: Performance and SEO ≥ 90. Each page has correct Japanese `<title>`
  and `<meta description>`. `sitemap.xml` and `robots.txt` present.
- Copyright year is dynamic.
- Accessible: keyboard-operable copy buttons, alt text, sufficient contrast.
- Clean TypeScript; no console errors.

## How to work
- Refer to this charter. If a change conflicts with it, follow the charter or ask the PM.
- Treat `./designs` as a visual reference — match the style and feel, not every pixel.
  The mockups are watermarked `.webp` exports; the "Made with Visily" mark is not part of
  the design — ignore it and build only the real page content.
- Suggested build order: data + shared layout/components → home → category template →
  search → detail → about → how-to/contact/legal → 404 → SEO plumbing → polish.
- Keep dependencies minimal; ask before adding large ones or changing the stack.
- Work in small, reviewable commits, and push to the GitHub remote
  (origin = https://github.com/senpythondev/kaomoji_service.git, branch `main`). Add a
  Next.js `.gitignore` (node_modules, .next, .env*, build output) so generated files are not
  committed. Use clear commit messages.
