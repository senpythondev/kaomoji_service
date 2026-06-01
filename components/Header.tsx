import Link from "next/link";
import { SITE, TOP_NAV } from "@/lib/site";
import { Mascot } from "./Mascot";
import { SearchIcon } from "./icons";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-hairline bg-white/85 backdrop-blur">
      <div className="shell flex h-14 items-center justify-between gap-4 sm:h-16">
        <Link
          href="/"
          aria-label={`${SITE.name} ホーム`}
          className="flex shrink-0 items-center gap-2"
        >
          <Mascot size={32} />
          <span className="text-lg font-extrabold tracking-tight text-ink">
            {SITE.name}
          </span>
        </Link>

        <nav
          aria-label="メインナビゲーション"
          className="hidden items-center gap-7 md:flex"
        >
          {TOP_NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-semibold text-ink-soft transition hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/search"
          aria-label="顔文字を検索"
          className="motion-tap grid size-10 shrink-0 place-items-center rounded-full text-ink-soft transition hover:bg-primary-soft hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          <SearchIcon size={20} />
        </Link>
      </div>
    </header>
  );
}
