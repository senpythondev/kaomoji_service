import type { Metadata } from "next";
import { Suspense } from "react";
import { SearchClient } from "@/components/SearchClient";

export const metadata: Metadata = {
  title: "顔文字を検索",
  description: "気持ちや言葉から顔文字を検索できます。",
  // Search is a visitor tool, not an SEO landing page — keep it out of the
  // index so it never competes with the category pages.
  robots: { index: false, follow: true },
};

export default function SearchPage() {
  return (
    <Suspense fallback={<SearchFallback />}>
      <SearchClient />
    </Suspense>
  );
}

function SearchFallback() {
  return (
    <div className="shell py-16 text-center text-sm text-ink-faint">
      読み込み中…
    </div>
  );
}
