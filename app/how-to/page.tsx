import type { Metadata } from "next";
import { ComingSoon } from "@/components/ComingSoon";

export const metadata: Metadata = {
  title: "使い方",
  description: "Kaomoji Palette の使い方と改善履歴。",
  alternates: { canonical: "/how-to" },
};

export default function HowToPage() {
  return (
    <ComingSoon
      title="使い方・改善履歴"
      description="顔文字のコピー方法の説明と、これまでの改善履歴を載せるページは近日公開予定です。"
    />
  );
}
