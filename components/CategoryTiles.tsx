import Link from "next/link";
import { CATEGORY_LIST } from "@/lib/categories";
import { CategoryIcon } from "./icons";

/**
 * Browse-by-category row. Scrolls horizontally on mobile, wraps on desktop.
 * Each tile links to its SSG category landing page (the SEO workhorse).
 */
export function CategoryTiles() {
  return (
    <div className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {CATEGORY_LIST.map((category) => (
        <Link
          key={category.slug}
          href={`/kaomoji/${category.slug}`}
          className="motion-tap group flex min-w-20 shrink-0 flex-col items-center gap-2 rounded-2xl border border-hairline bg-white px-3 py-3.5 transition hover:border-transparent hover:shadow-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-safe:hover:-translate-y-0.5 sm:min-w-0 sm:flex-1 sm:basis-24"
        >
          <span
            className="grid size-12 place-items-center rounded-full transition motion-safe:group-hover:scale-105"
            style={{ backgroundColor: category.softVar, color: category.accentVar }}
          >
            <CategoryIcon name={category.slug} size={24} />
          </span>
          <span className="whitespace-nowrap text-sm font-semibold text-ink">
            {category.label}
          </span>
        </Link>
      ))}
    </div>
  );
}
