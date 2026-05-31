import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  EMOJI_CATEGORIES,
  EMOJI_CATEGORY_SLUGS,
  getEmojiCategory,
} from "@/lib/emoji-categories";
import { EMOJI } from "@/data/emoji";
import { detailMetadata, getContentByCategory } from "@/lib/content";
import { SITE } from "@/lib/site";
import { Mascot } from "@/components/Mascot";
import { Breadcrumb } from "@/components/Breadcrumb";
import { CategoryKaomojiList } from "@/components/CategoryKaomojiList";
import { RelatedCategories } from "@/components/RelatedCategories";
import { DetailView } from "@/components/DetailView";

type Params = { slug: string };

/** Emoji category pages (/emoji/animal) AND emoji detail pages (/emoji/emoji-animal-01). */
export function generateStaticParams(): Params[] {
  return [
    ...EMOJI_CATEGORY_SLUGS.map((slug) => ({ slug })),
    ...EMOJI.map((e) => ({ slug: e.id })),
  ];
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;

  const cat = getEmojiCategory(slug);
  if (cat) {
    const path = `/emoji/${cat.slug}`;
    return {
      title: cat.metaTitle,
      description: cat.metaDescription,
      alternates: { canonical: path },
      openGraph: {
        type: "website",
        url: path,
        title: `${cat.metaTitle}｜${SITE.name}`,
        description: cat.metaDescription,
      },
    };
  }

  const item = EMOJI.find((e) => e.id === slug);
  if (item) {
    const { title, description, path } = detailMetadata(item);
    return {
      title,
      description,
      alternates: { canonical: path },
      openGraph: { type: "article", url: path, title: `${title}｜${SITE.name}`, description },
    };
  }
  return {};
}

export default async function EmojiSlugPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;

  const cat = getEmojiCategory(slug);
  if (cat) {
    const items = getContentByCategory("emoji", cat.slug);

    const crumbs = [
      { label: "ホーム", href: "/" },
      { label: "絵文字", href: "/emoji" },
      { label: cat.label },
    ];
    const breadcrumbJsonLd = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "ホーム", item: `${SITE.url}/` },
        { "@type": "ListItem", position: 2, name: "絵文字", item: `${SITE.url}/emoji` },
        { "@type": "ListItem", position: 3, name: cat.label, item: `${SITE.url}/emoji/${cat.slug}` },
      ],
    };

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
        <div className="shell py-6 sm:py-8">
          <Breadcrumb items={crumbs} />

          <section
            className="relative isolate mt-5 overflow-hidden rounded-card p-5 sm:p-7"
            style={{ backgroundColor: cat.softVar }}
          >
            <span
              aria-hidden="true"
              className="emoji-glyph pointer-events-none absolute -right-4 -top-6 -z-10 text-[7rem] opacity-20"
            >
              {cat.icon}
            </span>
            <div className="flex items-start justify-between gap-4">
              <div>
                <span
                  className="inline-flex items-center gap-1.5 rounded-full bg-white/80 px-3 py-1 text-xs font-bold"
                  style={{ color: cat.accentVar }}
                >
                  <span className="emoji-glyph text-sm">{cat.icon}</span>
                  {cat.label}
                </span>
                <h1 className="mt-3 text-2xl font-extrabold leading-tight tracking-tight text-ink sm:text-3xl lg:text-4xl">
                  {cat.label}の絵文字一覧
                  <span className="mt-1 block text-base font-bold text-primary sm:text-lg">
                    ｜コピーして使える
                  </span>
                </h1>
              </div>
              <Mascot size={84} className="shrink-0" />
            </div>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink-soft sm:text-base">
              {cat.intro}
            </p>
          </section>

          <div className="mt-8">
            <CategoryKaomojiList
              items={items}
              categorySlug={cat.slug}
              label={cat.label}
              unit="絵文字"
            />
          </div>

          <div className="mt-14">
            <RelatedCategories
              links={cat.related.map((s) => {
                const c = EMOJI_CATEGORIES[s];
                return {
                  href: `/emoji/${s}`,
                  label: c.label,
                  count: getContentByCategory("emoji", s).length,
                  accentVar: c.accentVar,
                  softVar: c.softVar,
                  icon: <span className="emoji-glyph text-base">{c.icon}</span>,
                };
              })}
            />
          </div>
        </div>
      </>
    );
  }

  const item = EMOJI.find((e) => e.id === slug);
  if (item) return <DetailView item={item} />;

  notFound();
}
