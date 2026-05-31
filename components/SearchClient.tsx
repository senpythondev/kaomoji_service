"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { searchKaomoji } from "@/lib/search";
import { getPopularKaomoji } from "@/data/kaomoji";
import { CATEGORIES, type CategorySlug } from "@/lib/categories";
import { KaomojiGrid } from "./KaomojiGrid";
import { SearchBar } from "./SearchBar";
import { Mascot } from "./Mascot";
import { CategoryIcon } from "./icons";

const SUGGESTED: CategorySlug[] = ["cute", "happy", "greeting", "love"];

export function SearchClient() {
  const params = useSearchParams();
  const rawQuery = params.get("q") ?? "";
  const query = rawQuery.trim();

  const results = useMemo(() => (query ? searchKaomoji(query) : []), [query]);
  const popular = useMemo(() => getPopularKaomoji(12), []);

  return (
    <div className="shell py-6 sm:py-8">
      <div className="mx-auto max-w-2xl">
        <SearchBar key={rawQuery} defaultValue={rawQuery} />
      </div>

      {query === "" ? (
        <section className="mt-8 sm:mt-10">
          <p className="text-sm text-ink-soft">
            キーワードを入力して顔文字を検索できます。まずは人気の顔文字からどうぞ。
          </p>
          <div className="mt-4 flex items-center gap-2.5">
            <span aria-hidden="true" className="h-6 w-1.5 rounded-full bg-primary" />
            <h1 className="text-xl font-extrabold text-ink sm:text-2xl">
              人気の顔文字
            </h1>
          </div>
          <div className="mt-5">
            <KaomojiGrid items={popular} />
          </div>
        </section>
      ) : results.length > 0 ? (
        <section className="mt-8 sm:mt-10">
          <h1 className="text-lg font-bold text-ink sm:text-xl">
            「{query}」の検索結果
            <span className="ml-2 font-semibold text-ink-soft">
              {results.length}件見つかりました
            </span>
          </h1>
          <div className="mt-5">
            <KaomojiGrid items={results} />
          </div>
        </section>
      ) : (
        <section className="mt-8 sm:mt-10">
          <h1 className="text-lg font-bold text-ink sm:text-xl">
            「{query}」の検索結果
            <span className="ml-2 font-semibold text-ink-soft">0件</span>
          </h1>
          <NoResults />
        </section>
      )}
    </div>
  );
}

function NoResults() {
  return (
    <div className="mt-6 flex flex-col items-center rounded-card border border-hairline bg-surface-tint px-6 py-12 text-center">
      <div className="relative">
        <Mascot size={88} className="-rotate-6" />
        <span
          aria-hidden="true"
          className="absolute -right-2 -top-1 text-2xl font-extrabold text-primary"
        >
          ？
        </span>
      </div>
      <p className="mt-4 text-xl font-extrabold text-ink">
        見つかりませんでした
      </p>
      <p className="mt-2 max-w-md text-sm leading-relaxed text-ink-soft">
        別のキーワードで試すか、カテゴリから顔文字を探してみてください。
      </p>

      <ul className="mt-6 flex flex-wrap justify-center gap-2.5">
        {SUGGESTED.map((slug) => {
          const category = CATEGORIES[slug];
          return (
            <li key={slug}>
              <Link
                href={`/kaomoji/${slug}`}
                className="inline-flex items-center gap-1.5 rounded-full border border-hairline bg-white px-3.5 py-2 text-sm font-semibold text-ink transition hover:border-transparent hover:shadow-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                <span
                  className="grid size-5 place-items-center"
                  style={{ color: category.accentVar }}
                >
                  <CategoryIcon name={slug} size={16} />
                </span>
                {category.label}顔文字
              </Link>
            </li>
          );
        })}
      </ul>

      <Link
        href="/#popular"
        className="mt-6 inline-flex items-center gap-1 rounded-full bg-primary px-6 py-3 text-sm font-bold text-white transition hover:bg-primary-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        人気の顔文字をみる →
      </Link>
    </div>
  );
}
