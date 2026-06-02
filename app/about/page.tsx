import type { Metadata } from "next";
import Link from "next/link";
import { ContentPage, Section } from "@/components/ContentPage";
import { OperatorAvatar } from "@/components/OperatorAvatar";
import { SITE, OPERATOR } from "@/lib/site";

export const metadata: Metadata = {
  title: "運営者情報",
  description:
    "Kaomoji Palette の運営者情報と「運営者より」のごあいさつ。だれが、どんな想いでこのサイトを運営しているかをご紹介します。",
  alternates: { canonical: "/about" },
};

const OPERATOR_MESSAGE = `はじめまして。運営者の風（かぜ）です。
このサイトは、「どんな形でも、誰かの役に立ちたい」——そんな思いから、ひとりではじめました。
顔文字や絵文字は、ほんの小さなものかもしれません。それでも、うまく言葉にできない気持ちをそっと伝えてくれたり、画面の向こうの誰かをふっと笑顔にしてくれたりする。私はそこに、たしかな力があると信じています。
あなたの毎日のやりとりが、少しでもあたたかく、楽しくなりますように。これからも、使ってくださる方の声に耳をかたむけながら、ひとつずつ大切に育てていきます。`;

export default function AboutPage() {
  return (
    <ContentPage
      title="運営者情報"
      lead={`${SITE.name} は「${SITE.slogan}」を合言葉に、顔文字・絵文字をだれでも気持ちよく使えることを目指して運営しています。`}
    >
      <Section title="運営者プロフィール">
        <div className="not-prose flex flex-col gap-5 sm:flex-row sm:items-center">
          <div className="size-28 shrink-0 overflow-hidden rounded-card shadow-soft">
            <OperatorAvatar size={112} />
          </div>
          <dl className="space-y-2 text-sm sm:text-base">
            <div className="flex gap-2">
              <dt className="w-20 shrink-0 text-ink-faint">運営者</dt>
              <dd className="font-semibold text-ink">{OPERATOR.name}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="w-20 shrink-0 text-ink-faint">サイト名</dt>
              <dd className="font-semibold text-ink">{SITE.name}（顔文字パレット）</dd>
            </div>
            <div className="flex gap-2">
              <dt className="w-20 shrink-0 text-ink-faint">連絡先</dt>
              <dd className="text-ink-soft">
                <a
                  href={`mailto:${OPERATOR.email}`}
                  className="font-semibold text-primary hover:underline"
                >
                  {OPERATOR.email}
                </a>
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
          <p className="whitespace-pre-line text-ink-soft">{OPERATOR_MESSAGE}</p>
          <p className="mt-4 text-right text-sm font-semibold text-ink">
            — {OPERATOR.name}
          </p>
        </div>
      </Section>

      <Section title="このサービスについて">
        <p>
          {SITE.name}
          は、日本語の顔文字（かおもじ）と絵文字を、スマートフォンでもパソコンでもワンクリックでコピーして使える無料サービスです。アカウント登録は不要で、どなたでもすぐにお使いいただけます。
        </p>
        <p>
          <span className="font-semibold text-primary">近日公開予定：</span>
          これからは、あなただけのオリジナル顔文字・絵文字を作って追加できる機能を準備中です。お気に入りを集めるだけでなく、自分好みのパレットに育てていく——そんな新しい楽しみ方ができるよう開発を進めています。どうぞお楽しみに。
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
