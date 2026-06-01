"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BOTTOM_NAV, type BottomNavIcon } from "@/lib/site";
import { GridIcon, HeartIcon, HomeIcon, InfoIcon, SearchIcon } from "./icons";

const INFO_PATHS = ["/about", "/how-to", "/contact", "/terms", "/privacy"];

function isActive(icon: BottomNavIcon, pathname: string): boolean {
  switch (icon) {
    case "home":
      return pathname === "/";
    case "search":
      return pathname.startsWith("/search");
    case "grid":
      return pathname.startsWith("/kaomoji");
    case "favorites":
      return pathname.startsWith("/favorites");
    case "info":
      return INFO_PATHS.some((p) => pathname.startsWith(p));
  }
}

const ICONS: Record<BottomNavIcon, typeof HomeIcon> = {
  home: HomeIcon,
  search: SearchIcon,
  grid: GridIcon,
  favorites: HeartIcon,
  info: InfoIcon,
};

/** Mobile bottom tab bar. Becomes a no-op on desktop (top nav takes over). */
export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="モバイルナビゲーション"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-hairline bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden"
    >
      <ul className="mx-auto flex max-w-md items-stretch justify-around">
        {BOTTOM_NAV.map((item) => {
          const active = isActive(item.icon, pathname);
          const Icon = ICONS[item.icon];
          return (
            <li key={item.href} className="flex-1">
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`flex flex-col items-center gap-0.5 py-2 text-[11px] font-semibold transition ${
                  active ? "text-primary" : "text-ink-faint hover:text-ink-soft"
                }`}
              >
                <Icon size={22} />
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
