import {
  latestUpdates,
  sidebarExplore,
  sidebarResources,
  site,
} from "./homeData";

function SidebarCard({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
      <div className="border-b border-slate-100 bg-gradient-to-r from-slate-50 to-indigo-50/50 px-5 py-4">
        <h3 className="text-sm font-bold tracking-tight text-slate-900">{title}</h3>
        {description && <p className="mt-1 text-xs text-slate-500">{description}</p>}
      </div>
      <div className="p-2">{children}</div>
    </section>
  );
}

function LinkRow({ label, href }: { label: string; href: string }) {
  return (
    <a
      href={href}
      className="group flex items-center justify-between rounded-xl px-3 py-2.5 text-sm text-slate-700 transition hover:bg-indigo-50 hover:text-indigo-800"
    >
      <span>{label}</span>
      <span
        className="text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-indigo-500"
        aria-hidden
      >
        →
      </span>
    </a>
  );
}

export function HomeSidebar() {
  return (
    <aside className="flex w-full flex-col gap-5 lg:sticky lg:top-28 lg:self-start">
      <SidebarCard title="Author resources" description="Templates and policies">
        {sidebarResources.map((link) => (
          <LinkRow key={link.label} {...link} />
        ))}
      </SidebarCard>

      <SidebarCard title="Explore" description="Programs and subject coverage">
        {sidebarExplore.map((link) => (
          <LinkRow key={link.label} {...link} />
        ))}
      </SidebarCard>

      <SidebarCard title="Latest updates" description="News from the editorial desk">
        <ul className="space-y-1 p-1">
          {latestUpdates.map((item) => (
            <li key={item.title}>
              <a
                href={item.href}
                className="block rounded-xl px-3 py-3 transition hover:bg-slate-50"
              >
                <time className="text-[11px] font-medium uppercase tracking-wide text-indigo-600">
                  {item.date}
                </time>
                <p className="mt-1 text-sm font-semibold leading-snug text-slate-900">{item.title}</p>
                <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-slate-500">
                  {item.excerpt}
                </p>
              </a>
            </li>
          ))}
        </ul>
      </SidebarCard>

      <div className="rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-700 p-5 text-white shadow-md">
        <p className="text-xs font-semibold uppercase tracking-wider text-indigo-200">
          Need help?
        </p>
        <p className="mt-2 text-sm leading-relaxed text-indigo-50">
          Reach our publication desk for submission status, fees, or formatting questions.
        </p>
        <a
          href={`mailto:${site.email}`}
          className="mt-4 inline-block text-sm font-semibold underline-offset-2 hover:underline"
        >
          {site.email}
        </a>
        <a
          href="/contact"
          className="mt-3 block w-full rounded-lg bg-white/15 py-2.5 text-center text-sm font-semibold backdrop-blur transition hover:bg-white/25"
        >
          Contact desk
        </a>
      </div>
    </aside>
  );
}
