import { Breadcrumb } from "./Breadcrumb";

/**
 * Shared chrome for the static content pages (how-to / about / contact / terms /
 * privacy): breadcrumb, an H1 + lead, and a consistently-styled body. These are
 * real content pages (indexable), not SEO landing pages, so the markup stays
 * simple and readable.
 */
export function ContentPage({
  title,
  lead,
  children,
}: {
  title: string;
  lead?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="shell py-7 sm:py-10">
      <Breadcrumb items={[{ label: "ホーム", href: "/" }, { label: title }]} />
      <header className="mt-4 max-w-2xl">
        <h1 className="text-2xl font-extrabold leading-tight text-ink sm:text-3xl">
          {title}
        </h1>
        {lead && (
          <p className="mt-3 text-sm leading-relaxed text-ink-soft sm:text-base">
            {lead}
          </p>
        )}
      </header>
      <div className="mt-8 max-w-2xl space-y-9">{children}</div>
    </div>
  );
}

/** A titled section within a content page. */
export function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="flex items-center gap-2.5 text-lg font-extrabold text-ink sm:text-xl">
        <span aria-hidden="true" className="h-5 w-1.5 rounded-full bg-primary" />
        {title}
      </h2>
      <div className="mt-3 space-y-3 text-sm leading-relaxed text-ink-soft sm:text-base">
        {children}
      </div>
    </section>
  );
}
