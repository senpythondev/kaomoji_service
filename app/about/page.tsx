import type { Metadata } from "next";
import { ComingSoon } from "@/components/ComingSoon";

export const metadata: Metadata = {
  title: "運営者情報",
  description: "Kaomoji Palette の運営者情報と「運営者より」のごあいさつ。",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <ComingSoon
      title="運営者情報"
      description="運営者プロフィールと「運営者より」のごあいさつページは近日公開予定です。"
    />
  );
}
