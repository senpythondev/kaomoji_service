import type { Metadata } from "next";
import Link from "next/link";
import { ContentPage, Section } from "@/components/ContentPage";
import { SITE, OPERATOR } from "@/lib/site";

export const metadata: Metadata = {
  title: "利用規約",
  description:
    "Kaomoji Palette の利用規約。本サービスの利用条件、免責事項、禁止事項などを定めています。",
  alternates: { canonical: "/terms" },
};

/*
 * DRAFT — written to match what the app ACTUALLY does today (a free, no-account
 * kaomoji/emoji copy site with an anonymous feedback form and device-local
 * favorites). It must be reviewed by a qualified professional before launch, and
 * MUST be revised before any v3 paid features ship — at which point a
 * 特定商取引法に基づく表記 (Act on Specified Commercial Transactions) page also
 * becomes legally required.
 */
export default function TermsPage() {
  return (
    <ContentPage
      title="利用規約"
      lead={`この利用規約（以下「本規約」）は、${SITE.name}（以下「本サービス」）の利用条件を定めるものです。本サービスをご利用になる場合は、本規約に同意したものとみなします。`}
    >
      <Section title="第1条（適用）">
        <p>
          本規約は、本サービスの提供条件および運営者と利用者との間の権利義務関係に適用されます。
        </p>
      </Section>

      <Section title="第2条（サービス内容）">
        <p>
          本サービスは、日本語の顔文字・絵文字を検索し、ワンクリックでコピーできる無料の機能を提供します。アカウント登録は不要で、現時点では料金は発生しません。
        </p>
        <p>
          お気に入り機能は、利用者がお使いの端末（ブラウザのローカルストレージ）内にのみ保存され、運営者のサーバーには送信・保存されません。
        </p>
      </Section>

      <Section title="第3条（顔文字・絵文字の利用）">
        <p>
          本サービスで提供する顔文字・絵文字は、いずれも文字（テキスト）であり、私的・商用を問わず自由にコピーしてご利用いただけます。利用にあたって特別な許諾は必要ありません。
        </p>
      </Section>

      <Section title="第4条（禁止事項）">
        <p>利用者は、本サービスの利用にあたり、次の行為をしてはなりません。</p>
        <ul className="ml-1 list-disc space-y-1.5 pl-5 marker:text-primary">
          <li>法令または公序良俗に違反する行為</li>
          <li>
            本サービスのサーバーやネットワークに過度な負荷をかける行為、または運営を妨害する行為
          </li>
          <li>不正アクセスや、本サービスの脆弱性を悪用する行為</li>
          <li>その他、運営者が不適切と判断する行為</li>
        </ul>
      </Section>

      <Section title="第5条（フィードバックの取り扱い）">
        <p>
          お問い合わせやご意見ご要望のフォームから送信された内容は、本サービスの改善のために利用させていただく場合があります。具体的な取り扱いは
          <Link href="/privacy" className="font-semibold text-primary hover:underline">
            プライバシーポリシー
          </Link>
          をご確認ください。
        </p>
      </Section>

      <Section title="第6条（免責事項）">
        <p>
          運営者は、本サービスの内容の正確性・完全性・有用性等についていかなる保証も行いません。一部の顔文字・絵文字は、利用者の端末・OS・アプリによって表示が異なる場合があります。
        </p>
        <p>
          運営者は、本サービスの利用または利用できなかったことによって利用者に生じた損害について、当方に故意または重過失がある場合を除き、責任を負わないものとします。
        </p>
      </Section>

      <Section title="第7条（サービスの変更・中断・終了）">
        <p>
          運営者は、利用者への事前の通知なく、本サービスの内容を変更し、または提供を中断・終了することができるものとします。
        </p>
      </Section>

      <Section title="第8条（規約の変更）">
        <p>
          運営者は、必要と判断した場合、利用者への事前通知なく本規約を変更できるものとします。変更後の規約は、本ページに掲載した時点から効力を生じます。
        </p>
      </Section>

      <Section title="第9条（準拠法・運営者）">
        <p>本規約の解釈にあたっては、日本法を準拠法とします。</p>
        <p>
          運営者・お問い合わせ先：{OPERATOR.name}（
          <a
            href={`mailto:${OPERATOR.email}`}
            className="font-semibold text-primary hover:underline"
          >
            {OPERATOR.email}
          </a>
          ）（詳しくは
          <Link href="/about" className="font-semibold text-primary hover:underline">
            運営者情報
          </Link>
          をご覧ください）
        </p>
      </Section>

      <p className="text-sm text-ink-faint">制定日：2026年6月2日</p>
    </ContentPage>
  );
}
