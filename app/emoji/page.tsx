import type { Metadata } from "next";
import Link from "next/link";
import { EMOJI_CATEGORY_LIST } from "@/lib/emoji-categories";
import { getContentByCategory } from "@/lib/content";
import { SITE } from "@/lib/site";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Mascot } from "@/components/Mascot";

export const metadata: Metadata = {
  title: "絵文字一覧｜カテゴリ別にコピーして使える絵文字",
  description:
    "顔・ハート・動物・食べ物など、カテゴリ別に絵文字を集めました。よく使う定番の絵文字をワンクリックでコピーして、LINEやSNSで使えます。",
  alternates: { canonical: "/emoji" },
  openGraph: { type: "website", url: "/emoji" },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "ホーム", item: `${SITE.url}/` },
    { "@type": "ListItem", position: 2, name: "絵文字", item: `${SITE.url}/emoji` },
  ],
};

export default function EmojiHomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <div className="shell py-6 sm:py-8">
        <Breadcrumb items={[{ label: "ホーム", href: "/" }, { label: "絵文字" }]} />

        <section className="mt-5 flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold leading-tight text-ink sm:text-3xl lg:text-4xl">
              絵文字一覧
              <span className="mt-1 block text-base font-bold text-primary sm:text-lg">
                ｜カテゴリから選んでコピー
              </span>
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink-soft sm:text-base">
              顔・ハート・動物・食べ物など、カテゴリ別に定番の絵文字を集めました。
              気になるカテゴリから、お気に入りの絵文字をワンクリックでコピーできます。
            </p>
          </div>
          <Mascot size={84} className="shrink-0" />
        </section>

        <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
          {EMOJI_CATEGORY_LIST.map((category) => {
            const count = getContentByCategory("emoji", category.slug).length;
            return (
              <li key={category.slug}>
                <Link
                  href={`/emoji/${category.slug}`}
                  className="flex h-full items-center gap-3 rounded-card border border-hairline bg-white p-4 transition hover:-translate-y-0.5 hover:border-transparent hover:shadow-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  <span
                    className="grid size-12 shrink-0 place-items-center rounded-full"
                    style={{ backgroundColor: category.softVar }}
                  >
                    <span className="emoji-glyph text-2xl">{category.icon}</span>
                  </span>
                  <span className="min-w-0">
                    <span className="block font-bold text-ink">
                      {category.label}
                    </span>
                    <span className="block text-xs text-ink-faint">
                      {count}件の絵文字
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
