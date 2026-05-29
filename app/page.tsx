import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/site";
import { getNewestKaomoji, getPopularKaomoji } from "@/data/kaomoji";
import { Mascot } from "@/components/Mascot";
import { SearchBar } from "@/components/SearchBar";
import { CategoryTiles } from "@/components/CategoryTiles";
import { KaomojiGrid } from "@/components/KaomojiGrid";
import { FeedbackForm } from "@/components/FeedbackForm";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE.name,
  url: SITE.url,
  inLanguage: "ja",
  description: SITE.description,
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE.url}/search?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

export default function HomePage() {
  const popular = getPopularKaomoji(8);
  const newest = getNewestKaomoji(8);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />

      {/* Hero */}
      <section className="bg-gradient-to-b from-primary-soft via-primary-soft/40 to-white">
        <div className="shell grid items-center gap-8 py-10 sm:py-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:py-20">
          <div className="order-2 text-center lg:order-1 lg:text-left">
            <Mascot
              size={72}
              className="mx-auto mb-4 lg:hidden"
              label={`${SITE.name}のマスコット`}
            />
            <p className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-bold text-primary shadow-soft">
              無料・登録不要
            </p>
            <h1 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-ink sm:text-4xl lg:text-5xl">
              みんなで、もっと
              <br className="hidden sm:block" />
              <span className="text-primary">使いやすく。</span>
            </h1>
            <p className="mt-4 text-base text-ink-soft sm:text-lg">
              {SITE.tagline}
            </p>
            <div className="mx-auto mt-6 max-w-xl lg:mx-0">
              <SearchBar />
            </div>
            <p className="mt-3 text-sm text-ink-faint">
              例：「うれしい」「ねこ」「ごめん」など
            </p>
          </div>

          {/* Decorative mascot panel (desktop) */}
          <div className="order-1 hidden justify-center lg:order-2 lg:flex">
            <div className="relative grid h-72 w-full max-w-md place-items-center rounded-[2rem] bg-white shadow-card ring-1 ring-black/[0.03]">
              <Mascot size={150} />
              <span className="kaomoji-glyph absolute left-6 top-8 rounded-2xl bg-[var(--cat-happy-soft)] px-3 py-2 text-lg font-medium text-ink shadow-soft">
                (*^ω^*)
              </span>
              <span className="kaomoji-glyph absolute right-6 top-16 rounded-2xl bg-[var(--cat-love-soft)] px-3 py-2 text-lg font-medium text-ink shadow-soft">
                (´∀`)♡
              </span>
              <span className="kaomoji-glyph absolute bottom-8 right-12 rounded-2xl bg-[var(--cat-cute-soft)] px-3 py-2 text-lg font-medium text-ink shadow-soft">
                (｡･ω･｡)
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section id="categories" className="shell scroll-mt-20 pt-10 sm:pt-14">
        <SectionHeading title="カテゴリから探す" />
        <div className="mt-5">
          <CategoryTiles />
        </div>
      </section>

      {/* Popular */}
      <section id="popular" className="shell scroll-mt-20 pt-12 sm:pt-16">
        <SectionHeading
          title="人気の顔文字"
          accent="var(--cat-happy)"
        />
        <div className="mt-5">
          <KaomojiGrid items={popular} />
        </div>
      </section>

      {/* Newest */}
      <section className="shell pt-12 sm:pt-16">
        <SectionHeading title="新着" accent="var(--cat-sad)" />
        <div className="mt-5">
          <KaomojiGrid items={newest} />
        </div>
      </section>

      {/* Feedback */}
      <section id="feedback" className="shell scroll-mt-20 pt-16 sm:pt-20">
        <div className="mx-auto max-w-2xl text-center">
          <Mascot size={56} className="mx-auto" />
          <h2 className="mt-3 text-2xl font-extrabold text-ink">
            ご意見・ご要望
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-ink-soft sm:text-base">
            いただいた声をもとに、どんどん改善していきます。
            <br className="hidden sm:block" />
            追加してほしい顔文字や、使いにくい点などお気軽にお寄せください。
          </p>
        </div>
        <div className="mx-auto mt-6 max-w-2xl">
          <FeedbackForm />
          <p className="mt-4 text-center">
            <Link
              href="/how-to"
              className="text-sm font-semibold text-primary hover:underline"
            >
              改善履歴をみる →
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}

function SectionHeading({
  title,
  accent,
}: {
  title: string;
  accent?: string;
}) {
  return (
    <div className="flex items-center gap-2.5">
      <span
        aria-hidden="true"
        className="h-6 w-1.5 rounded-full"
        style={{ backgroundColor: accent ?? "var(--color-primary)" }}
      />
      <h2 className="text-xl font-extrabold text-ink sm:text-2xl">{title}</h2>
    </div>
  );
}
