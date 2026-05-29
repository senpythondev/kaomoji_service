import type { Metadata } from "next";
import { ComingSoon } from "@/components/ComingSoon";

export const metadata: Metadata = {
  title: "お問い合わせ",
  description: "Kaomoji Palette へのお問い合わせ。",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <ComingSoon
      title="お問い合わせ"
      description="お問い合わせフォームは近日公開予定です。ご意見・ご要望はトップページのフォームからお送りいただけます。"
    />
  );
}
