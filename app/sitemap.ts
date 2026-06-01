import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { CATEGORY_SLUGS } from "@/lib/categories";
import { ALL_ITEMS, detailHref } from "@/lib/content";

export const dynamic = "force-static";

/**
 * Sitemap covering every indexable, canonical route on the apex domain. Derived
 * from the data so it scales automatically as items are added. Excludes the
 * noindex /search page (and /favorites when it exists) and any /api route.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url.replace(/\/$/, "");

  // Freshness signal for the home/category pages = newest item's date.
  const latest = ALL_ITEMS.reduce(
    (max, item) => (item.createdAt > max ? item.createdAt : max),
    "2025-01-01",
  );

  const staticPaths = ["/about", "/how-to", "/contact", "/terms", "/privacy"];

  return [
    { url: `${base}/`, lastModified: latest, changeFrequency: "weekly", priority: 1 },

    // Category landing pages (the SEO workhorses) — all kinds live under /kaomoji/[slug].
    ...CATEGORY_SLUGS.map((slug) => ({
      url: `${base}/kaomoji/${slug}`,
      lastModified: latest,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),

    // Per-item detail pages: kaomoji, emoji, and combos (canonical /kaomoji/[id]).
    ...ALL_ITEMS.map((item) => ({
      url: `${base}${detailHref(item)}`,
      lastModified: item.createdAt,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),

    // Static utility/legal pages.
    ...staticPaths.map((path) => ({
      url: `${base}${path}`,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    })),
  ];
}
