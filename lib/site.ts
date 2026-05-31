/**
 * Site-wide configuration: branding, navigation, and footer link maps.
 * Centralized so the header, footer, and bottom nav stay consistent
 * (the charter calls out inconsistent nav order in the mockups as a bug to fix).
 */
import { CATEGORY_LIST } from "./categories";

export const SITE = {
  name: "Kaomoji Palette",
  /** Charter slogan. */
  slogan: "みんなで、もっと使いやすく。",
  tagline: "ワンクリックでコピーできる顔文字・絵文字サイト",
  description:
    "うれしい・かわいい・悲しいなどの顔文字をワンクリックでコピー。スマホでもすぐ使える、無料の顔文字コピペサイトです。",
  /** Used for metadataBase / canonical URLs. Update when the domain is finalized. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://kaomoji-palette.com",
} as const;

export interface NavItem {
  label: string;
  href: string;
}

/** Desktop top navigation (matches the desktop mockup). */
export const TOP_NAV: NavItem[] = [
  { label: "ホーム", href: "/" },
  { label: "カテゴリ", href: "/#categories" },
  { label: "絵文字", href: "/emoji" },
  { label: "人気の顔文字", href: "/#popular" },
  { label: "運営者情報", href: "/about" },
];

/**
 * Mobile bottom tab bar — standardized order everywhere: ホーム・検索・カテゴリ・情報
 * (icon names map to CategoryIcon-independent icons in components/icons.tsx).
 */
export const BOTTOM_NAV: { label: string; href: string; icon: BottomNavIcon }[] =
  [
    { label: "ホーム", href: "/", icon: "home" },
    { label: "検索", href: "/search", icon: "search" },
    { label: "カテゴリ", href: "/#categories", icon: "grid" },
    { label: "情報", href: "/about", icon: "info" },
  ];

export type BottomNavIcon = "home" | "search" | "grid" | "info";

/** Footer link columns (trust + legal), per charter. */
export const FOOTER_LINKS: { heading: string; items: NavItem[] }[] = [
  {
    heading: "サイト",
    items: [
      { label: "ホーム", href: "/" },
      { label: "絵文字一覧", href: "/emoji" },
      { label: "人気の顔文字", href: "/#popular" },
      { label: "顔文字を検索", href: "/search" },
    ],
  },
  {
    heading: "サポート",
    items: [
      { label: "運営者情報", href: "/about" },
      { label: "使い方", href: "/how-to" },
      { label: "お問い合わせ", href: "/contact" },
    ],
  },
  {
    heading: "規約",
    items: [
      { label: "利用規約", href: "/terms" },
      { label: "プライバシーポリシー", href: "/privacy" },
    ],
  },
];

/** 主なカテゴリー link grid for the footer (internal linking for SEO). */
export const FOOTER_CATEGORIES = CATEGORY_LIST.map((c) => ({
  label: c.label,
  href: `/kaomoji/${c.slug}`,
}));
