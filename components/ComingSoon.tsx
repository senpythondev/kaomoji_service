import Link from "next/link";
import { Mascot } from "@/components/Mascot";

/**
 * Friendly placeholder for routes that exist (so footer/nav links never 404)
 * but whose full content is built in a later session.
 */
export function ComingSoon({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className="shell flex flex-col items-center py-16 text-center sm:py-24">
      <Mascot size={84} />
      <p className="mt-4 inline-flex rounded-full bg-primary-soft px-3 py-1 text-xs font-bold text-primary">
        準備中
      </p>
      <h1 className="mt-4 text-2xl font-extrabold text-ink sm:text-3xl">
        {title}
      </h1>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-ink-soft">
        {description ??
          "このページは現在準備中です。もうしばらくお待ちください。"}
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
