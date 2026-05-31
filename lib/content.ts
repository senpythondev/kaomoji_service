/**
 * Shared content layer for the two content types: kaomoji (line-art text faces)
 * and emoji (絵文字, platform color glyphs). Both share the SAME shape so they
 * reuse KaomojiCard, copy/toast, search, the category template, and DetailView.
 * The `type` field keeps them distinguishable for routing, theming, and the
 * (kaomoji-only) font-coverage check.
 */
import { CATEGORIES } from "./categories";
import { EMOJI_CATEGORIES } from "./emoji-categories";
import { SITE } from "./site";
import { KAOMOJI } from "@/data/kaomoji";
import { EMOJI } from "@/data/emoji";

export type ContentType = "kaomoji" | "emoji";

export interface ContentItem {
  id: string;
  /** The kaomoji or emoji glyph itself. */
  text: string;
  type: ContentType;
  categories: string[];
  tags: string[];
  reading: string;
  popularity: number;
  createdAt: string;
}

export interface CategoryMeta {
  slug: string;
  label: string;
  /** CSS variable for the accent color. */
  accentVar: string;
  /** CSS variable for the soft card tint. */
  softVar: string;
}

/** Resolve a category's display metadata for either content type. */
export function getCategoryMeta(
  type: ContentType,
  slug: string | undefined,
): CategoryMeta | undefined {
  if (!slug) return undefined;
  if (type === "emoji") {
    const c = EMOJI_CATEGORIES[slug as keyof typeof EMOJI_CATEGORIES];
    return c && { slug: c.slug, label: c.label, accentVar: c.accentVar, softVar: c.softVar };
  }
  const c = CATEGORIES[slug as keyof typeof CATEGORIES];
  return c && { slug: c.slug, label: c.label, accentVar: c.accentVar, softVar: c.softVar };
}

/** The route base path for a content type. */
export function basePath(type: ContentType): "/emoji" | "/kaomoji" {
  return type === "emoji" ? "/emoji" : "/kaomoji";
}

/** Detail-page href for an item. */
export function detailHref(item: Pick<ContentItem, "type" | "id">): string {
  return `${basePath(item.type)}/${item.id}`;
}

/** Japanese unit noun for a content type (used in counts/labels). */
export function unitNoun(type: ContentType): "顔文字" | "絵文字" {
  return type === "emoji" ? "絵文字" : "顔文字";
}

/** All content, both types, flat. */
export const ALL_CONTENT: ContentItem[] = [...KAOMOJI, ...EMOJI];

export function getContentById(id: string): ContentItem | undefined {
  return ALL_CONTENT.find((item) => item.id === id);
}

/** Items in a category of a given type, most popular first. */
export function getContentByCategory(
  type: ContentType,
  slug: string,
): ContentItem[] {
  const pool = type === "emoji" ? EMOJI : KAOMOJI;
  return [...pool]
    .filter((item) => item.categories.includes(slug))
    .sort((a, b) => b.popularity - a.popularity);
}

/** Per-item SEO metadata for a detail page (unique via the glyph + reading). */
export function detailMetadata(item: ContentItem): {
  title: string;
  description: string;
  path: string;
} {
  const unit = unitNoun(item.type);
  const catLabel = getCategoryMeta(item.type, item.categories[0])?.label ?? "";
  const tagPart = item.tags.slice(0, 3).join("・");
  return {
    title: `${item.text}（${item.reading}）の${unit}｜コピーして使える`,
    description: `${item.text}（${item.reading}）の${unit}。${catLabel}の${unit}を${SITE.name}でワンクリックでコピーできます。${tagPart ? `関連タグ：${tagPart}。` : ""}`,
    path: detailHref(item),
  };
}
