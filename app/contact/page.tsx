import type { Metadata } from "next";
import Link from "next/link";
import { ContentPage, Section, Placeholder } from "@/components/ContentPage";
import { FeedbackForm } from "@/components/FeedbackForm";

export const metadata: Metadata = {
  title: "お問い合わせ",
  description:
    "Kaomoji Palette へのお問い合わせ・ご意見ご要望はこちら。フォームから登録不要でお送りいただけます。",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <ContentPage
      title="お問い合わせ"
      lead="ご意見・ご要望、不具合のご報告など、お気軽にお寄せください。いただいた声は、今後の改善に役立てさせていただきます。"
    >
      <Section title="フォームから送る">
        <p>
          下のフォームから、登録不要・お名前や連絡先なしでメッセージをお送りいただけます。返信が必要なお問い合わせには、メールでのご連絡（下記）をご利用ください。
        </p>
        <div className="not-prose mt-2">
          {/* Reuses the same intake as the homepage feedback box (/api/feedback). */}
          <FeedbackForm />
        </div>
      </Section>

      <Section title="メールでのお問い合わせ">
        <p>
          返信が必要な場合や、フォームに書ききれない内容は、こちらの連絡先までお送りください。
        </p>
        {/*
          PM TO FILL: replace [CONTACT_METHOD] with the operator's real email
          address or external contact form URL. Keep it as a real, clickable
          mailto:/https: link once supplied.
        */}
        <p>
          連絡先：<Placeholder>[CONTACT_METHOD]</Placeholder>
          （運営者が確認のうえ、順次対応いたします）
        </p>
        <p className="text-ink-faint">
          ※
          いただいた内容によっては、返信までお時間をいただくこと、また返信いたしかねる場合がございます。あらかじめご了承ください。
        </p>
      </Section>

      <Section title="その他">
        <p>
          サイトの使い方については
          <Link href="/how-to" className="font-semibold text-primary hover:underline">
            使い方
          </Link>
          ページを、運営については
          <Link href="/about" className="font-semibold text-primary hover:underline">
            運営者情報
          </Link>
          をご覧ください。
        </p>
      </Section>
    </ContentPage>
  );
}
