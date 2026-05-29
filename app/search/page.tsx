import type { Metadata } from "next";
import { ComingSoon } from "@/components/ComingSoon";

export const metadata: Metadata = {
  title: "顔文字を検索",
  description: "気持ちや言葉から顔文字を検索できます。",
  robots: { index: false, follow: true },
};

export default function SearchPage() {
  return (
    <ComingSoon
      title="顔文字を検索"
      description="クライアントサイドの検索結果ページは近日公開予定です。トップページから人気・新着の顔文字をお楽しみください。"
    />
  );
}
