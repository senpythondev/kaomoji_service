"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";

/**
 * Light fade/slide on route change. Keyed by pathname so each navigation
 * remounts and replays the CSS enter animation (~190ms).
 *
 * Crucially, the animation is applied ONLY after the path has CHANGED at least
 * once — the initial load (and any re-render on the same path) renders with no
 * animation class, so the first paint / LCP element is never hidden behind a
 * fade. Uses React's "adjust state during render" pattern to detect navigation
 * without an effect. Under reduced motion the class is inert (see
 * .motion-page-enter in globals.css), so content always shows instantly.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [prevPath, setPrevPath] = useState(pathname);
  const [navigated, setNavigated] = useState(false);

  if (prevPath !== pathname) {
    setPrevPath(pathname);
    setNavigated(true);
  }

  return (
    <div key={pathname} className={navigated ? "motion-page-enter" : undefined}>
      {children}
    </div>
  );
}
