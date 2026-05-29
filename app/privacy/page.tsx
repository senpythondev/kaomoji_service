import type { Metadata } from "next";
import { ComingSoon } from "@/components/ComingSoon";

export const metadata: Metadata = {
  title: "プライバシーポリシー",
  description: "Kaomoji Palette のプライバシーポリシー。",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <ComingSoon
      title="プライバシーポリシー"
      description="プライバシーポリシーのページは近日公開予定です。"
    />
  );
}
