import type { Metadata, Viewport } from "next";
import { Noto_Sans_JP } from "next/font/google";
import { preload } from "react-dom";
import "./globals.css";
import { SITE } from "@/lib/site";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BottomNav } from "@/components/BottomNav";
import { ToastProvider } from "@/components/ToastProvider";
import { FavoritesProvider } from "@/components/FavoritesProvider";
import { PageTransition } from "@/components/PageTransition";

/*
 * Noto Sans JP, self-hosted via next/font. Discrete weights + preload:false is
 * the reliable setup for this large CJK font (it has no `japanese` subset).
 * Japanese glyphs and kaomoji symbols resolve through the fallback stack
 * defined on --font-sans in globals.css, so nothing renders as a tofu box.
 */
const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
  preload: false,
  variable: "--font-noto-sans-jp",
  fallback: ["Hiragino Sans", "Yu Gothic", "system-ui", "Segoe UI Symbol", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name}｜顔文字をワンクリックでコピー`,
    template: `%s｜${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  keywords: [
    "顔文字",
    "かおもじ",
    "顔文字 コピペ",
    "かわいい顔文字",
    "kaomoji",
    "絵文字",
    "顔文字 一覧",
  ],
  openGraph: {
    type: "website",
    locale: "ja_JP",
    siteName: SITE.name,
    title: `${SITE.name}｜顔文字をワンクリックでコピー`,
    description: SITE.description,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name}｜顔文字をワンクリックでコピー`,
    description: SITE.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#3d8bf0",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // Preload the self-hosted kaomoji subset (primary face) to avoid FOUT on the
  // glyph-heavy card grids.
  preload("/fonts/kaomoji-subset.woff2", {
    as: "font",
    type: "font/woff2",
    crossOrigin: "anonymous",
  });

  return (
    <html lang="ja" className={`${notoSansJP.variable} h-full`}>
      <body className="flex min-h-dvh flex-col pb-[calc(72px+env(safe-area-inset-bottom))] md:pb-0">
        <ToastProvider>
          <FavoritesProvider>
            <Header />
            <main className="flex-1">
              <PageTransition>{children}</PageTransition>
            </main>
            <Footer />
            <BottomNav />
          </FavoritesProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
