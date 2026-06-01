import type { Metadata } from "next";
import Link from "next/link";
import { ContentPage, Section } from "@/components/ContentPage";
import { Mascot } from "@/components/Mascot";

export const metadata: Metadata = {
  title: "使い方",
  description:
    "Kaomoji Palette の使い方ガイド。顔文字・絵文字の探し方、ワンタップでのコピー、お気に入りの保存、LINEやX・Discordへの貼り付け方をやさしく説明します。",
  alternates: { canonical: "/how-to" },
};

export default function HowToPage() {
  return (
    <ContentPage
      title="使い方"
      lead="Kaomoji Palette は、顔文字や絵文字をワンタップでコピーできる無料サイトです。登録は不要。はじめての方も、この流れにそって使ってみてください。"
    >
      <div className="flex items-center gap-4 rounded-card bg-surface-tint px-5 py-4">
        <Mascot size={56} label="Kaomoji Palette のマスコット" />
        <p className="text-sm leading-relaxed text-ink-soft">
          むずかしい操作はありません。「さがす → コピー → 貼り付け」の3ステップだけ。
        </p>
      </div>

      <Section title="1. 顔文字・絵文字をさがす">
        <p>
          さがし方は2通りあります。気になる気持ちや言葉から、自由に見つけてください。
        </p>
        <ul className="ml-1 list-disc space-y-1.5 pl-5 marker:text-primary">
          <li>
            画面上部の検索バーに「うれしい」「ねこ」「ごめん」などの言葉を入れて
            <Link href="/search" className="font-semibold text-primary hover:underline">
              検索
            </Link>
            する。読みがな・タグからも探せます。
          </li>
          <li>
            ホームの
            <Link href="/#categories" className="font-semibold text-primary hover:underline">
              カテゴリ
            </Link>
            （うれしい・かわいい・怒る など）から一覧をたどる。
          </li>
        </ul>
      </Section>

      <Section title="2. ワンタップでコピー">
        <p>
          使いたい顔文字のカードをタップ（クリック）するだけで、その場でコピーできます。コピーできると「コピーしました」と表示されます。
        </p>
        <p>
          くわしく見たいときは、カード右上の
          <span className="font-semibold text-ink">→</span>
          から詳細ページを開けます。詳細ページの「コピーする」ボタンからもコピーできます。
        </p>
      </Section>

      <Section title="3. LINE・X・Discord などに貼り付け">
        <p>
          コピーしたら、メッセージの入力欄を長押し（スマホ）または右クリック（パソコン）して「貼り付け」を選びます。キーボードでは
          <span className="font-semibold text-ink"> Ctrl+V </span>
          または
          <span className="font-semibold text-ink"> ⌘+V </span>
          でも貼り付けられます。
        </p>
        <p>
          LINE・X（旧Twitter）・Discord・Instagram・メールなど、文字を入力できる場所ならどこでもそのまま使えます。顔文字も絵文字も、ただの文字なので特別なアプリは必要ありません。
        </p>
      </Section>

      <Section title="4. お気に入りに保存">
        <p>
          よく使うものは、カードや詳細ページの
          <span className="font-semibold text-[var(--cat-love)]"> ♡ </span>
          をタップするとお気に入りに保存できます。保存したものは
          <Link href="/favorites" className="font-semibold text-primary hover:underline">
            お気に入り
          </Link>
          ページにまとまります。
        </p>
        <p className="text-ink-faint">
          ※
          お気に入りはお使いの端末（ブラウザ）の中だけに保存されます。アカウント登録は不要ですが、別の端末やブラウザには引き継がれません。
        </p>
      </Section>

      <Section title="うまく表示・コピーできないとき">
        <ul className="ml-1 list-disc space-y-1.5 pl-5 marker:text-primary">
          <li>
            一部の絵文字は、お使いの端末やアプリによって見え方が変わることがあります。貼り付け先では正しく表示される場合もあります。
          </li>
          <li>
            コピーできないときは、ブラウザを最新版に更新するか、詳細ページの「コピーする」ボタンからお試しください。
          </li>
        </ul>
        <p>
          もっと増やしてほしい顔文字や、使いにくい点があれば、ホームの
          <Link href="/#feedback" className="font-semibold text-primary hover:underline">
            ご意見・ご要望
          </Link>
          フォームからお気軽にお寄せください。みなさんの声をもとに改善していきます。
        </p>
      </Section>
    </ContentPage>
  );
}
