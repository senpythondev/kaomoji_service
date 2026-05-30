import Link from "next/link";
import { CATEGORIES, type CategorySlug } from "@/lib/categories";
import { getKaomojiByCategory } from "@/data/kaomoji";
import { CategoryIcon, ChevronRightIcon } from "./icons";

/**
 * Sibling-category links for internal linking (helps SEO). Counts are real
 * (number of kaomoji currently in each category).
 */
export function RelatedCategories({ slugs }: { slugs: CategorySlug[] }) {
  return (
    <section aria-labelledby="related-heading">
      <div className="flex items-center gap-2.5">
        <span
          aria-hidden="true"
          className="h-6 w-1.5 rounded-full bg-primary"
        />
        <h2
          id="related-heading"
          className="text-xl font-extrabold text-ink sm:text-2xl"
        >
          関連カテゴリ
        </h2>
      </div>
      <ul className="mt-4 grid gap-3 sm:grid-cols-2">
        {slugs.map((slug) => {
          const category = CATEGORIES[slug];
          const count = getKaomojiByCategory(slug).length;
          return (
            <li key={slug}>
              <Link
                href={`/kaomoji/${slug}`}
                className="group flex items-center justify-between gap-3 rounded-2xl border border-hairline bg-white px-4 py-3 transition hover:-translate-y-0.5 hover:border-transparent hover:shadow-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                <span className="flex items-center gap-3">
                  <span
                    className="grid size-9 place-items-center rounded-full"
                    style={{
                      backgroundColor: category.softVar,
                      color: category.accentVar,
                    }}
                  >
                    <CategoryIcon name={slug} size={18} />
                  </span>
                  <span className="font-semibold text-ink">
                    {category.label}
                  </span>
                </span>
                <span className="flex items-center gap-0.5 text-sm text-ink-faint">
                  {count}件
                  <ChevronRightIcon
                    size={16}
                    className="transition group-hover:translate-x-0.5 group-hover:text-primary"
                  />
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
