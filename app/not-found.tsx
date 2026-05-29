import Link from "next/link";
import { Mascot } from "@/components/Mascot";

export default function NotFound() {
  return (
    <div className="shell flex flex-col items-center py-20 text-center sm:py-28">
      <Mascot size={88} />
      <p className="mt-5 text-5xl font-extrabold text-primary">404</p>
      <h1 className="mt-2 text-2xl font-extrabold text-ink">
        ページが見つかりません
      </h1>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-ink-soft">
        お探しのページは移動したか、削除された可能性があります。
        <span className="kaomoji-glyph"> (´・ω・`)</span>
      </p>
      <Link
        href="/"
        className="mt-7 inline-flex items-center gap-1 rounded-full bg-primary px-6 py-3 text-sm font-bold text-white transition hover:bg-primary-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        ホームへ戻る
      </Link>
    </div>
  );
}
