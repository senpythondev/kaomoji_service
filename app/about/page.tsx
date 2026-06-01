import type { Metadata } from "next";
import Link from "next/link";
import { ContentPage, Section, Placeholder } from "@/components/ContentPage";
import { Mascot } from "@/components/Mascot";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "運営者情報",
  description:
    "Kaomoji Palette の運営者情報と「運営者より」のごあいさつ。だれが、どんな想いでこのサイトを運営しているかをご紹介します。",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <ContentPage
      title="運営者情報"
      lead={`${SITE.name} は「${SITE.slogan}」を合言葉に、顔文字・絵文字をだれでも気持ちよく使えることを目指して運営しています。`}
    >
      {/*
        PM TO FILL: the placeholders below ([OPERATOR_NAME], [OPERATOR_PHOTO],
        [OPERATOR_MESSAGE], [CONTACT]) are intentionally left blank — do not
        invent personal details. Replace [OPERATOR_PHOTO] with a real photo via
        next/image once supplied.
      */}
      <Section title="運営者プロフィール">
        <div className="not-prose flex flex-col gap-5 sm:flex-row sm:items-center">
          {/* Real-photo slot — swap this placeholder block for the operator's photo. */}
          <div
            className="flex size-28 shrink-0 flex-col items-center justify-center gap-1 rounded-card border border-dashed border-hairline bg-surface-tint text-center text-[11px] font-semibold text-ink-faint"
            aria-label="運営者の写真（後日掲載予定）"
          >
            <Mascot size={40} />
            <Placeholder>[OPERATOR_PHOTO]</Placeholder>
          </div>
          <dl className="space-y-2 text-sm sm:text-base">
            <div className="flex gap-2">
              <dt className="w-20 shrink-0 text-ink-faint">運営者</dt>
              <dd className="font-semibold text-ink">
                <Placeholder>[OPERATOR_NAME]</Placeholder>
              </dd>
            </div>
            <div className="flex gap-2">
              <dt className="w-20 shrink-0 text-ink-faint">サイト名</dt>
              <dd className="font-semibold text-ink">{SITE.name}（顔文字パレット）</dd>
            </div>
            <div className="flex gap-2">
              <dt className="w-20 shrink-0 text-ink-faint">連絡先</dt>
              <dd className="text-ink-soft">
                <Placeholder>[CONTACT]</Placeholder>
                <span className="block text-ink-faint">
                  （
                  <Link href="/contact" className="font-semibold text-primary hover:underline">
                    お問い合わせ
                  </Link>
                  ページもご利用いただけます）
                </span>
              </dd>
            </div>
          </dl>
        </div>
      </Section>

      <Section title="運営者より">
        <div className="rounded-card border border-hairline bg-white px-5 py-5 shadow-soft">
          {/* PM TO FILL: replace with the operator's own message. */}
          <p className="whitespace-pre-line text-ink-soft">
            <Placeholder>[OPERATOR_MESSAGE]</Placeholder>
          </p>
          <p className="mt-4 text-right text-sm font-semibold text-ink">
            — <Placeholder>[OPERATOR_NAME]</Placeholder>
          </p>
        </div>
        <p className="text-ink-faint">
          （このごあいさつ文は運営者ご本人のメッセージに差し替えてください。）
        </p>
      </Section>

      <Section title="このサイトについて">
        <p>
          {SITE.name}
          は、日本語の顔文字（顔文字）と絵文字を、スマートフォンでもパソコンでもワンクリックでコピーして使える無料サービスです。アカウント登録は不要で、どなたでもすぐにお使いいただけます。
        </p>
        <p>
          使い方は
          <Link href="/how-to" className="font-semibold text-primary hover:underline">
            使い方
          </Link>
          ページを、データの取り扱いは
          <Link href="/privacy" className="font-semibold text-primary hover:underline">
            プライバシーポリシー
          </Link>
          をご覧ください。
        </p>
      </Section>
    </ContentPage>
  );
}
