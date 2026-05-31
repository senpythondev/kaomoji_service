import Link from "next/link";
import {
  type ContentItem,
  detailHref,
  getCategoryMeta,
  getContentByCategory,
  glyphClass,
  unitNoun,
} from "@/lib/content";
import { SITE } from "@/lib/site";
import { Breadcrumb } from "./Breadcrumb";
import { CopyButton } from "./CopyButton";
import { ChevronRightIcon } from "./icons";

/**
 * Shared detail-page template for any library item (kaomoji / emoji / combo).
 * Themed hero with the copyable glyph, reading/category/tag metadata, related
 * items (internal links, any kind), and a BreadcrumbList JSON-LD.
 */
export function DetailView({ item }: { item: ContentItem }) {
  const unit = unitNoun(item.kind);
  const gClass = glyphClass(item.kind);
  const primaryCategory = item.categories?.[0];
  const meta = getCategoryMeta(primaryCategory);
  const categoryHref = meta ? `/kaomoji/${meta.slug}` : "/#categories";

  // Resilient: a missing/empty category yields no related items rather than a 500.
  const related = getContentByCategory(primaryCategory ?? "")
    .filter((r) => r.id !== item.id)
    .slice(0, 8);

  const crumbs = [
    { label: "ホーム", href: "/" },
    { label: "カテゴリ", href: "/#categories" },
    ...(meta ? [{ label: meta.label, href: categoryHref }] : []),
    { label: item.reading },
  ];

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "ホーム", item: `${SITE.url}/` },
      { "@type": "ListItem", position: 2, name: "カテゴリ", item: `${SITE.url}/#categories` },
      ...(meta
        ? [{ "@type": "ListItem", position: 3, name: meta.label, item: `${SITE.url}${categoryHref}` }]
        : []),
      {
        "@type": "ListItem",
        position: meta ? 4 : 3,
        name: `${item.reading}の${unit}`,
        item: `${SITE.url}${detailHref(item)}`,
      },
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
          className="mt-5 flex flex-col items-center rounded-card px-6 py-10 text-center sm:py-14"
          style={{
            background: meta
              ? `linear-gradient(160deg, ${meta.softVar}, #ffffff)`
              : "var(--color-surface-tint)",
          }}
        >
          {meta && (
            <Link
              href={categoryHref}
              className="inline-flex items-center gap-1.5 rounded-full bg-white/80 px-3 py-1 text-xs font-bold transition hover:opacity-80"
              style={{ color: meta.accentVar }}
            >
              {meta.label}
            </Link>
          )}
          <p
            className={`${gClass} mt-5 ${
              item.kind === "emoji"
                ? "text-7xl sm:text-8xl"
                : item.kind === "combo"
                  ? "text-3xl text-ink sm:text-4xl"
                  : "text-4xl font-medium text-ink sm:text-5xl"
            }`}
          >
            {item.text}
          </p>
          <div className="mt-7">
            <CopyButton text={item.text} />
          </div>
        </section>

        <div className="mt-8 max-w-2xl">
          <h1 className="text-2xl font-extrabold leading-tight text-ink sm:text-3xl">
            <span className={`${gClass} mr-2`}>{item.text}</span>
            「{item.reading}」の{unit}
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-ink-soft sm:text-base">
            「{item.reading}」を表す{meta ? `${meta.label}の` : ""}{unit}です。
            ボタンひとつでコピーして、LINEやSNS、メールですぐに使えます。
          </p>

          <dl className="mt-5 grid gap-3 text-sm sm:grid-cols-2">
            <div className="rounded-2xl border border-hairline bg-white px-4 py-3">
              <dt className="text-ink-faint">読み方</dt>
              <dd className="mt-0.5 font-semibold text-ink">{item.reading}</dd>
            </div>
            {meta && (
              <div className="rounded-2xl border border-hairline bg-white px-4 py-3">
                <dt className="text-ink-faint">カテゴリ</dt>
                <dd className="mt-0.5">
                  <Link href={categoryHref} className="font-semibold text-primary hover:underline">
                    {meta.label}
                  </Link>
                </dd>
              </div>
            )}
          </dl>

          <div className="mt-5">
            <h2 className="text-sm font-bold text-ink">関連タグ</h2>
            <ul className="mt-2 flex flex-wrap gap-2">
              {(item.tags ?? []).map((tag) => (
                <li key={tag}>
                  <Link
                    href={`/search?q=${encodeURIComponent(tag)}`}
                    className="inline-block rounded-full border border-hairline bg-white px-3 py-1 text-sm text-ink-soft transition hover:border-transparent hover:bg-primary-soft hover:text-primary"
                  >
                    #{tag}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {related.length > 0 && (
          <section aria-labelledby="related-items" className="mt-12">
            <div className="flex items-center gap-2.5">
              <span aria-hidden="true" className="h-6 w-1.5 rounded-full bg-primary" />
              <h2 id="related-items" className="text-xl font-extrabold text-ink sm:text-2xl">
                {meta ? `${meta.label}の関連アイテム` : "関連アイテム"}
              </h2>
            </div>
            <ul className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-6">
              {related.map((r) => (
                <li key={r.id}>
                  <Link
                    href={detailHref(r)}
                    className="flex aspect-square flex-col items-center justify-center gap-1 rounded-2xl border border-hairline bg-white p-2 text-center transition hover:-translate-y-0.5 hover:shadow-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  >
                    <span
                      className={`${glyphClass(r.kind)} ${
                        r.kind === "emoji" ? "text-3xl" : "text-sm font-medium text-ink"
                      }`}
                    >
                      {r.text}
                    </span>
                    <span className="line-clamp-1 text-[11px] text-ink-faint">
                      {r.reading}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            {meta && (
              <p className="mt-4">
                <Link
                  href={categoryHref}
                  className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
                >
                  {meta.label}をもっと見る
                  <ChevronRightIcon size={16} />
                </Link>
              </p>
            )}
          </section>
        )}
      </div>
    </>
  );
}
