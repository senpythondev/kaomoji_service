import type { Metadata } from "next";
import { ComingSoon } from "@/components/ComingSoon";

export const metadata: Metadata = {
  title: "利用規約",
  description: "Kaomoji Palette の利用規約。",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <ComingSoon
      title="利用規約"
      description="利用規約のページは近日公開予定です。"
    />
  );
}
