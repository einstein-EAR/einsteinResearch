import { footerColumns, site } from "./homeData";

  export function Footer() {
  return (
    <footer className="mt-auto w-full border-t border-slate-200 bg-slate-900 text-slate-300">
      <div className="mx-auto w-full px-4 py-12 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-400">
              {site.name}
            </p>
            <p className="mt-2 text-lg font-bold text-white">{site.tagline}</p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-400">
              Thomson ResearcherID · UGC-aligned journals · Online & print · Refereed &
              peer-reviewed channels for authors worldwide.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="/paper-submission"
                className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-500"
              >
                Submit paper
              </a>
              <a
                href="/payment"
                className="rounded-lg border border-slate-600 px-4 py-2 text-sm font-semibold text-white transition hover:border-slate-500"
              >
                Pay now
              </a>
            </div>
          </div>

          {footerColumns.map((column) => (
            <div key={column.title}>
              <h4 className="text-sm font-semibold uppercase tracking-wide text-white">
                {column.title}
              </h4>
              <ul className="mt-4 space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-slate-400 transition hover:text-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-white">Contact</h4>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a href={`mailto:${site.email}`} className="text-slate-400 hover:text-white">
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${site.phone.replace(/\s/g, "")}`}
                  className="text-slate-400 hover:text-white"
                >
                  {site.phone}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800">
        <div className="mx-auto flex w-full flex-col items-center justify-between gap-3 px-4 py-5 text-center text-xs text-slate-500 sm:flex-row lg:px-8 sm:text-left">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <p className="max-w-xl">
            Content on this site is published under fair academic use policies. See{" "}
            <a href="/publication-ethics" className="text-indigo-400 hover:text-indigo-300">
              publication ethics
            </a>{" "}
            for details.
          </p>
        </div>
      </div>
    </footer>
  );
}
