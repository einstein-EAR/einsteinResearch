import { conferenceItems } from "./homeData";

export function Conferences() {
  return (
    <section id="conferences" className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-indigo-600">Events</p>
          <h3 className="mt-1 text-2xl font-bold text-slate-900">Conferences & seminars</h3>
        </div>
        <a
          href="/conferences"
          className="text-sm font-semibold text-indigo-600 hover:text-indigo-800"
        >
          View all events →
        </a>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {conferenceItems.map((item) => (
          <article
            key={item.title}
            className="flex flex-col rounded-xl border border-slate-100 bg-slate-50/80 p-4 transition hover:border-indigo-100 hover:bg-indigo-50/30"
          >
            <h4 className="text-sm font-semibold leading-snug text-slate-900">{item.title}</h4>
            <dl className="mt-auto space-y-2 pt-4 text-xs text-slate-600">
              <div>
                <dt className="font-semibold text-slate-800">Date</dt>
                <dd>{item.date}</dd>
              </div>
              <div>
                <dt className="font-semibold text-slate-800">Venue</dt>
                <dd>{item.venue}</dd>
              </div>
            </dl>
          </article>
        ))}
      </div>
    </section>
  );
}
