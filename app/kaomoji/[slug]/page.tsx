import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CATEGORIES, CATEGORY_SLUGS, getCategory } from "@/lib/categories";
import { CATEGORY_CONTENT } from "@/lib/category-content";
import { KAOMOJI, getKaomojiById, getKaomojiByCategory } from "@/data/kaomoji";
import { detailMetadata } from "@/lib/content";
import { SITE } from "@/lib/site";
import { Mascot } from "@/components/Mascot";
import { Breadcrumb } from "@/components/Breadcrumb";
import { CategoryIcon } from "@/components/icons";
import { CategoryKaomojiList } from "@/components/CategoryKaomojiList";
import { RelatedCategories } from "@/components/RelatedCategories";
import { DetailView } from "@/components/DetailView";

type Params = { slug: string };

/**
 * One dynamic segment serving BOTH category landing pages (/kaomoji/cute) and
 * per-kaomoji detail pages (/kaomoji/happy-niko). Next.js forbids two different
 * dynamic params at the same path, so the slug is dispatched here. Category
 * slugs and kaomoji ids never collide.
 */
export function generateStaticParams(): Params[] {
  return [
    ...CATEGORY_SLUGS.map((slug) => ({ slug })),
    ...KAOMOJI.map((k) => ({ slug: k.id })),
  ];
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;

  const cat = getCategory(slug);
  if (cat) {
    const content = CATEGORY_CONTENT[cat.slug];
    const path = `/kaomoji/${cat.slug}`;
    return {
      title: content.metaTitle,
      description: content.metaDescription,
      alternates: { canonical: path },
      openGraph: {
        type: "website",
        url: path,
        title: `${content.metaTitle}｜${SITE.name}`,
        description: content.metaDescription,
      },
    };
  }

  const item = getKaomojiById(slug);
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

export default async function KaomojiSlugPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;

  const cat = getCategory(slug);
  if (cat) {
    const content = CATEGORY_CONTENT[cat.slug];
    const items = getKaomojiByCategory(cat.slug);

    const crumbs = [
      { label: "ホーム", href: "/" },
      { label: "顔文字", href: "/#categories" },
      { label: cat.label },
    ];
    const breadcrumbJsonLd = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "ホーム", item: `${SITE.url}/` },
        { "@type": "ListItem", position: 2, name: "顔文字", item: `${SITE.url}/#categories` },
        { "@type": "ListItem", position: 3, name: cat.label, item: `${SITE.url}/kaomoji/${cat.slug}` },
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
            <CategoryIcon
              name={cat.slug}
              size={150}
              aria-hidden="true"
              className="pointer-events-none absolute -right-6 -top-8 -z-10 opacity-[0.12]"
              style={{ color: cat.accentVar }}
            />
            <div className="flex items-start justify-between gap-4">
              <div>
                <span
                  className="inline-flex items-center gap-1.5 rounded-full bg-white/80 px-3 py-1 text-xs font-bold"
                  style={{ color: cat.accentVar }}
                >
                  <CategoryIcon name={cat.slug} size={14} />
                  {cat.label}
                </span>
                <h1 className="mt-3 text-2xl font-extrabold leading-tight tracking-tight text-ink sm:text-3xl lg:text-4xl">
                  {cat.label}顔文字一覧
                  <span className="mt-1 block text-base font-bold text-primary sm:text-lg">
                    ｜ワンクリックでコピー
                  </span>
                </h1>
              </div>
              <Mascot size={84} className="shrink-0" />
            </div>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink-soft sm:text-base">
              {content.intro}
            </p>
          </section>

          <div className="mt-8">
            <CategoryKaomojiList
              items={items}
              categorySlug={cat.slug}
              label={cat.label}
              unit="顔文字"
            />
          </div>

          <div className="mt-14">
            <RelatedCategories
              links={content.related.map((s) => {
                const c = CATEGORIES[s];
                return {
                  href: `/kaomoji/${s}`,
                  label: c.label,
                  count: getKaomojiByCategory(s).length,
                  accentVar: c.accentVar,
                  softVar: c.softVar,
                  icon: <CategoryIcon name={s} size={18} />,
                };
              })}
            />
          </div>
        </div>
      </>
    );
  }

  const item = getKaomojiById(slug);
  if (item) return <DetailView item={item} />;

  notFound();
}
