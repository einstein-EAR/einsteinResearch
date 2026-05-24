import { quickCards } from "./homeData";

export function QuickActions() {
  return (
    <section className="w-full px-4 py-10 lg:px-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900">Start here</h2>
        <p className="mt-1 text-slate-600">Common paths for authors and institutions</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-4">
        {quickCards.map((card) => (
          <article
            key={card.title}
            className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md flex flex-col items-center justify-center"
          >
            <div
              className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${card.accent}`}
              aria-hidden
            />

            <h3 className="text-lg font-semibold text-slate-900">{card.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600 text-center">{card.description}</p>
            <div className="flex items-center justify-center gap-2 mt-4">
              <card.icon className="h-10 w-10 text-indigo-600" />
            </div>
            <a
              href={card.href}
              className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-indigo-600 transition group-hover:gap-2"
            >
              Learn more
              <span aria-hidden>→</span>
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
