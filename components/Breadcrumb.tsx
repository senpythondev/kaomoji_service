import Link from "next/link";
import { ChevronRightIcon } from "./icons";

export interface Crumb {
  label: string;
  href?: string;
}

/** Visible breadcrumb trail. Pair with BreadcrumbList JSON-LD on the page. */
export function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="パンくずリスト" className="text-sm">
      <ol className="flex flex-wrap items-center gap-1.5 text-ink-faint">
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={i} className="flex items-center gap-1.5">
              {item.href && !last ? (
                <Link
                  href={item.href}
                  className="transition hover:text-primary"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  aria-current={last ? "page" : undefined}
                  className={last ? "font-semibold text-ink-soft" : undefined}
                >
                  {item.label}
                </span>
              )}
              {!last && (
                <ChevronRightIcon size={14} className="text-ink-faint/60" />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
