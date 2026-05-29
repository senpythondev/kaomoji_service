import Link from "next/link";
import {
  FOOTER_CATEGORIES,
  FOOTER_LINKS,
  SITE,
} from "@/lib/site";
import { Mascot } from "./Mascot";

export function Footer() {
  // Computed at render (build) time so the copyright year is never hardcoded.
  const year = new Date().getFullYear();

  return (
    <footer className="mt-16 border-t border-hairline bg-surface-tint">
      <div className="shell py-10 sm:py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="max-w-xs">
            <div className="flex items-center gap-2">
              <Mascot size={32} />
              <span className="text-lg font-extrabold text-ink">{SITE.name}</span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">
              {SITE.description}
            </p>
          </div>

          {FOOTER_LINKS.map((column) => (
            <nav key={column.heading} aria-label={column.heading}>
              <h2 className="text-sm font-bold text-ink">{column.heading}</h2>
              <ul className="mt-3 space-y-2">
                {column.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-ink-soft transition hover:text-primary"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-10 border-t border-hairline pt-6">
          <h2 className="text-sm font-bold text-ink">主なカテゴリー</h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            {FOOTER_CATEGORIES.map((category) => (
              <li key={category.href}>
                <Link
                  href={category.href}
                  className="inline-block rounded-full border border-hairline bg-white px-3 py-1 text-sm text-ink-soft transition hover:border-transparent hover:bg-primary-soft hover:text-primary"
                >
                  {category.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-10 text-xs text-ink-faint">
          © {year} {SITE.name}
        </p>
      </div>
    </footer>
  );
}
