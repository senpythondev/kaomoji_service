"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SearchIcon } from "./icons";

/**
 * Search field. Submitting navigates to the client-side /search results page
 * (charter: search runs client-side over a prebuilt index — wired up next session).
 */
export function SearchBar({
  defaultValue = "",
  autoFocus = false,
  className = "",
}: {
  defaultValue?: string;
  autoFocus?: boolean;
  className?: string;
}) {
  const router = useRouter();
  const [query, setQuery] = useState(defaultValue);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const term = query.trim();
    router.push(term ? `/search?q=${encodeURIComponent(term)}` : "/search");
  }

  return (
    <form
      role="search"
      onSubmit={handleSubmit}
      className={`relative flex w-full items-center ${className}`}
    >
      <SearchIcon
        size={20}
        className="pointer-events-none absolute left-4 text-ink-faint"
      />
      <input
        type="search"
        name="q"
        value={query}
        autoFocus={autoFocus}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="顔文字を検索（例：うれしい）"
        aria-label="顔文字を検索"
        enterKeyHint="search"
        className="h-13 w-full rounded-full border border-hairline bg-white py-3 pl-11 pr-24 text-base text-ink shadow-soft outline-none transition placeholder:text-ink-faint focus:border-primary focus:ring-2 focus:ring-primary/25 sm:pr-28"
      />
      <button
        type="submit"
        className="absolute right-1.5 inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2.5 text-sm font-bold text-white transition hover:bg-primary-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:px-5"
      >
        <SearchIcon size={16} className="sm:hidden" />
        <span className="hidden sm:inline">検索</span>
        <span className="sm:hidden">検索</span>
      </button>
    </form>
  );
}
