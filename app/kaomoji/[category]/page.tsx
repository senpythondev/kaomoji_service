import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CATEGORY_SLUGS, getCategory } from "@/lib/categories";
import { ComingSoon } from "@/components/ComingSoon";

type Params = { category: string };

/** SSG: pre-render one page per known category (the SEO workhorse). */
export function generateStaticParams(): Params[] {
  return CATEGORY_SLUGS.map((category) => ({ category }));
}

// Only the eight known categories exist; anything else is a 404.
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { category } = await params;
  const cat = getCategory(category);
  if (!cat) return {};
  return {
    title: `${cat.label}の顔文字一覧`,
    description: `${cat.label}の顔文字（コピペ）一覧。${cat.description}ワンクリックでコピーできます。`,
    alternates: { canonical: `/kaomoji/${cat.slug}` },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { category } = await params;
  const cat = getCategory(category);
  if (!cat) notFound();

  return (
    <ComingSoon
      title={`「${cat.label}」の顔文字`}
      description={`${cat.description}このカテゴリの一覧ページは近日公開予定です。`}
    />
  );
}
