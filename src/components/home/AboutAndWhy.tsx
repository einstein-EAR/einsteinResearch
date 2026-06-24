import { site, strengths, whyChooseItems } from "./homeData";

export function AboutAndWhy() {
  return (
    <section className="space-y-6">
      <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <p className="text-xs font-bold uppercase tracking-wider text-indigo-600">About us</p>
        <h3 className="mt-2 text-2xl font-bold text-slate-900">
          Welcome to {site.tagline}
        </h3>
        <div className="mt-5 space-y-4 text-slate-600 leading-relaxed">
          <p>
            {site.name} is a UGC-aligned, peer-reviewed international publisher for research
            journals, academic and technical books, e-books, newsletters, and conference
            proceedings. We help authors move from manuscript to citable publication with clear
            timelines and editorial support.
          </p>
          <p>
            Our catalog spans engineering, education, management, health sciences, arts, and
            humanities. We publish original research, review articles, technical notes, theses, and
            selected conference papers — with indexing pathways through major scholarly databases
            and referred journal lists.
          </p>
          <p>
            Digital publication certificates are provided to all accepted authors. Optional print
            copies and e-book distribution (including Kindle Direct Publishing) are available on
            request.
          </p>
        </div>
        <p className="mt-6 text-sm text-slate-500">
          Submit manuscripts via our{" "}
          <a href="/paper-submission" className="font-semibold text-indigo-600 hover:underline">
            online submission
          </a>{" "}
          portal or email{" "}
          <a href={`mailto:${site.email}`} className="font-semibold text-indigo-600 hover:underline">
            {site.email}
          </a>
          . Articles must be original and not under review elsewhere.
        </p>
      </article>

      <div className="grid gap-6 md:grid-cols-2">
        <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900">Why ER Publications</h3>
          <p className="mt-1 text-sm text-slate-500">What authors and institutions value</p>
          <ul className="mt-5 space-y-3">
            {whyChooseItems.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-slate-700">
                <span className="mt-1.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-[10px] font-bold text-indigo-700">
                  ✓
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </article>

        <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900">Our commitments</h3>
          <p className="mt-1 text-sm text-slate-500">Service standards we uphold</p>
          <ul className="mt-5 space-y-3">
            {strengths.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-slate-700">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-600" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  );
}
