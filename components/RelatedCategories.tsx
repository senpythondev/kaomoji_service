import type { ReactNode } from "react";
import Link from "next/link";
import { ChevronRightIcon } from "./icons";

export interface RelatedLink {
  href: string;
  label: string;
  count: number;
  accentVar: string;
  softVar: string;
  icon: ReactNode;
}

/**
 * Sibling-category links for internal linking (helps SEO). Generic over content
 * type — the page supplies the links (with counts + an icon node).
 */
export function RelatedCategories({
  links,
  heading = "関連カテゴリ",
}: {
  links: RelatedLink[];
  heading?: string;
}) {
  return (
    <section aria-labelledby="related-heading">
      <div className="flex items-center gap-2.5">
        <span aria-hidden="true" className="h-6 w-1.5 rounded-full bg-primary" />
        <h2
          id="related-heading"
          className="text-xl font-extrabold text-ink sm:text-2xl"
        >
          {heading}
        </h2>
      </div>
      <ul className="mt-4 grid gap-3 sm:grid-cols-2">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="group flex items-center justify-between gap-3 rounded-2xl border border-hairline bg-white px-4 py-3 transition hover:-translate-y-0.5 hover:border-transparent hover:shadow-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              <span className="flex items-center gap-3">
                <span
                  className="grid size-9 place-items-center rounded-full text-lg"
                  style={{ backgroundColor: link.softVar, color: link.accentVar }}
                >
                  {link.icon}
                </span>
                <span className="font-semibold text-ink">{link.label}</span>
              </span>
              <span className="flex items-center gap-0.5 text-sm text-ink-faint">
                {link.count}件
                <ChevronRightIcon
                  size={16}
                  className="transition group-hover:translate-x-0.5 group-hover:text-primary"
                />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
