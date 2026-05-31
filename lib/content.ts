/**
 * Unified content library. Kaomoji, emoji, and combos are ONE collection,
 * distinguished only by `kind`, sharing the same shape and the same category
 * taxonomy. Home, category pages, search, and detail pages all draw from here,
 * so the three kinds appear together everywhere.
 *
 * Rendering: kaomoji use the bundled KaomojiText subset (.kaomoji-glyph); emoji
 * use the platform color-emoji font (.emoji-glyph); combos contain both and use
 * .combo-glyph (KaomojiText + color-emoji). See app/globals.css.
 */
import { CATEGORIES } from "./categories";
import { SITE } from "./site";
import { KAOMOJI } from "@/data/kaomoji";
import { EMOJI } from "@/data/emoji";
import { COMBOS } from "@/data/combos";

export type ContentKind = "kaomoji" | "emoji" | "combo";

export interface ContentItem {
  id: string;
  /** The glyph(s): a kaomoji, an emoji, or a fused combo. */
  text: string;
  kind: ContentKind;
  categories: string[];
  tags: string[];
  reading: string;
  popularity: number;
  createdAt: string;
}

export interface CategoryMeta {
  slug: string;
  label: string;
  accentVar: string;
  softVar: string;
}

/** Resolve a category's display metadata (one taxonomy shared by all kinds). */
export function getCategoryMeta(slug: string | undefined): CategoryMeta | undefined {
  if (!slug) return undefined;
  const c = CATEGORIES[slug as keyof typeof CATEGORIES];
  return c && { slug: c.slug, label: c.label, accentVar: c.accentVar, softVar: c.softVar };
}

/** Detail-page href — every kind lives under the unified /kaomoji namespace. */
export function detailHref(item: Pick<ContentItem, "id">): string {
  return `/kaomoji/${item.id}`;
}

/** Japanese noun for a kind (used in labels/aria). */
export function unitNoun(kind: ContentKind): string {
  return kind === "emoji" ? "絵文字" : kind === "combo" ? "コンボ" : "顔文字";
}

/** CSS class that renders a kind's glyph correctly. */
export function glyphClass(kind: ContentKind): string {
  return kind === "emoji"
    ? "emoji-glyph"
    : kind === "combo"
      ? "combo-glyph"
      : "kaomoji-glyph";
}

/** The one unified collection. */
export const ALL_ITEMS: ContentItem[] = [...KAOMOJI, ...EMOJI, ...COMBOS];

export function getContentById(id: string): ContentItem | undefined {
  return ALL_ITEMS.find((item) => item.id === id);
}

/** All items in a category (any kind), most popular first. */
export function getContentByCategory(slug: string): ContentItem[] {
  return [...ALL_ITEMS]
    .filter((item) => item.categories.includes(slug))
    .sort((a, b) => b.popularity - a.popularity);
}

/** Most popular items across the whole library. */
export function getPopularItems(limit?: number): ContentItem[] {
  const sorted = [...ALL_ITEMS].sort((a, b) => b.popularity - a.popularity);
  return typeof limit === "number" ? sorted.slice(0, limit) : sorted;
}

/** Newest items across the whole library. */
export function getNewestItems(limit?: number): ContentItem[] {
  const sorted = [...ALL_ITEMS].sort(
    (a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt),
  );
  return typeof limit === "number" ? sorted.slice(0, limit) : sorted;
}

/** Per-item SEO metadata for a detail page (unique via the glyph + reading). */
export function detailMetadata(item: ContentItem): {
  title: string;
  description: string;
  path: string;
} {
  const unit = unitNoun(item.kind);
  const catLabel = getCategoryMeta(item.categories[0])?.label ?? "";
  const tagPart = item.tags.slice(0, 3).join("・");
  return {
    title: `${item.text}（${item.reading}）の${unit}｜コピーして使える`,
    description: `${item.text}（${item.reading}）の${unit}。${catLabel}の${unit}を${SITE.name}でワンクリックでコピーできます。${tagPart ? `関連タグ：${tagPart}。` : ""}`,
    path: detailHref(item),
  };
}
