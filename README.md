# Kaomoji Palette （顔文字パレット）

A fast, mobile-first, Japan-first website for finding and one-click-copying
Japanese kaomoji (顔文字). Each category page is an SEO landing page, so the site
is statically generated and crawlable. See [`CLAUDE.md`](./CLAUDE.md) for the full
project charter (the authoritative spec).

## Tech stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** (theme tokens live in [`app/globals.css`](./app/globals.css))
- **Noto Sans JP** self-hosted via `next/font`
- **SSG** for category pages; client-side copy with a toast
- Single serverless route handler at `/api/feedback`
- Target hosting: Vercel (free tier)

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

Other scripts:

```bash
npm run build    # production build (also type-checks)
npm run start    # serve the production build
npm run lint     # eslint
```

## Project structure

```
app/                 App Router routes
  layout.tsx         Root layout: fonts, metadata, header/footer/nav shell
  page.tsx           Homepage
  api/feedback/      Feedback intake route handler
  kaomoji/[category] Category landing pages (SSG)
  search, about, how-to, contact, terms, privacy, not-found
components/          Header, Footer, BottomNav, KaomojiCard, Toast, Mascot, …
data/kaomoji.ts      Seed kaomoji dataset (UTF-8) + selectors
lib/                 site config + category metadata
designs/             Visily mockups (visual reference only)
```

## Status

v1, in progress. The homepage and shared shell are built; category, search,
detail, and legal pages are friendly placeholders for now and are filled in over
the following sessions (build order in `CLAUDE.md`). Accounts and payments are
out of scope for v1.
