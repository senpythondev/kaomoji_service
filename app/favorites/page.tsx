import type { Metadata } from "next";
import { FavoritesClient } from "@/components/FavoritesClient";

export const metadata: Metadata = {
  title: "お気に入り",
  description: "この端末に保存したお気に入りの顔文字・絵文字の一覧です。",
  // Favorites are per-device and have no stable, crawlable content — keep it out
  // of the index (and out of sitemap.xml). It is a visitor tool, not an SEO page.
  robots: { index: false, follow: false },
};

export default function FavoritesPage() {
  return <FavoritesClient />;
}
