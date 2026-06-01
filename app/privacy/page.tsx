import type { Metadata } from "next";
import Link from "next/link";
import { ContentPage, Section, Placeholder } from "@/components/ContentPage";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "プライバシーポリシー",
  description:
    "Kaomoji Palette のプライバシーポリシー。フィードバックの取り扱いや、端末内に保存されるお気に入りなど、データの扱いについて説明します。",
  alternates: { canonical: "/privacy" },
};

/*
 * DRAFT — describes the app's ACTUAL data handling today:
 *   - Anonymous feedback form: message text is sent to /api/feedback and
 *     currently logged server-side (no name/contact field is collected).
 *   - Favorites: stored only in the browser's localStorage (device-local),
 *     never sent to the server.
 *   - No analytics / tracking / advertising SDKs are integrated at this time.
 *   - No accounts, no payments (those are v2/v3).
 * The hosting provider (e.g. Vercel) may process standard access logs (IP,
 * user agent) as part of serving the site. Must be reviewed by a qualified
 * professional before launch, and revised before v3 paid features (which also
 * require a 特定商取引法に基づく表記 page). Confirm placeholders
 * ([OPERATOR/CONTACT], 制定日).
 */
export default function PrivacyPage() {
  return (
    <ContentPage
      title="プライバシーポリシー"
      lead={`${SITE.name}（以下「本サービス」）における、利用者の情報の取り扱いについて説明します。本サービスは、できるだけ個人情報を集めない設計を心がけています。`}
    >
      <Section title="収集する情報">
        <p>本サービスが取り扱う情報は、次のとおりです。</p>
        <ul className="ml-1 list-disc space-y-1.5 pl-5 marker:text-primary">
          <li>
            <span className="font-semibold text-ink">フィードバックの内容：</span>
            お問い合わせ・ご意見ご要望フォームから送信されたメッセージ本文。氏名や連絡先などの入力欄は設けていません（利用者が本文に任意で記載した場合を除きます）。
          </li>
          <li>
            <span className="font-semibold text-ink">アクセスログ：</span>
            本サービスを配信するホスティング事業者が、サービス提供・セキュリティのために、IPアドレスやブラウザの種類などの標準的なアクセス情報を記録する場合があります。
          </li>
        </ul>
      </Section>

      <Section title="端末内に保存される情報（お気に入り）">
        <p>
          お気に入りに保存した顔文字・絵文字は、お使いのブラウザのローカルストレージ（localStorage）に保存され、お使いの端末内にとどまります。これらの情報が運営者のサーバーに送信されることはありません。
        </p>
        <p className="text-ink-faint">
          ※
          ブラウザの設定や履歴の消去によって、保存したお気に入りが削除されることがあります。
        </p>
      </Section>

      <Section title="利用目的">
        <p>収集した情報は、次の目的で利用します。</p>
        <ul className="ml-1 list-disc space-y-1.5 pl-5 marker:text-primary">
          <li>本サービスの維持・運営・改善のため</li>
          <li>いただいたご意見・ご要望への対応、機能改善の検討のため</li>
          <li>不正アクセスの防止など、セキュリティ確保のため</li>
        </ul>
      </Section>

      <Section title="アクセス解析・広告について">
        <p>
          本サービスは、現時点ではアクセス解析ツールや広告配信サービス、トラッキング目的のクッキー（Cookie）を利用していません。今後これらを導入する場合は、本ポリシーを改定したうえでお知らせします。
        </p>
      </Section>

      <Section title="第三者への提供">
        <p>
          運営者は、法令に基づく場合を除き、収集した情報を利用者の同意なく第三者へ提供することはありません。
        </p>
      </Section>

      <Section title="お問い合わせ・改定">
        <p>
          本ポリシーに関するお問い合わせは、
          <Link href="/contact" className="font-semibold text-primary hover:underline">
            お問い合わせ
          </Link>
          ページよりお願いいたします。
        </p>
        <p>
          運営者・お問い合わせ先：<Placeholder>[OPERATOR/CONTACT]</Placeholder>
        </p>
        <p>
          本ポリシーは、必要に応じて改定することがあります。改定後の内容は本ページに掲載した時点から有効となります。
        </p>
      </Section>

      <p className="text-sm text-ink-faint">
        制定日：<Placeholder>[制定日]</Placeholder>
      </p>
    </ContentPage>
  );
}
