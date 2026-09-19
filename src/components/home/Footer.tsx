import { footerColumns, site } from "./homeData";

export function Footer() {
  const [firstColumn, ...otherColumns] = footerColumns;

  return (
    <footer className="mt-auto w-full border-t border-slate-200 bg-slate-900 text-slate-300">
      <div className="mx-auto w-full px-4 py-6 lg:px-8 lg:py-7">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5 lg:gap-8">
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wide text-white">
              {firstColumn.title}
            </h4>
            <ul className="mt-2 space-y-1.5">
              {firstColumn.links.map((link) => (
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

          {otherColumns.map((column) => (
            <div key={column.title}>
              <h4 className="text-xs font-semibold uppercase tracking-wide text-white">
                {column.title}
              </h4>
              <ul className="mt-2 space-y-1.5">
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
            <h4 className="text-xs font-semibold uppercase tracking-wide text-white">Contact</h4>
            <ul className="mt-2 space-y-1.5 text-sm">
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

          <div className="sm:col-span-2 lg:col-span-1">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-400">
              {site.name}
            </p>
            <p className="mt-1 text-sm font-bold text-white">{site.tagline}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <a
                href="/paper-submission"
                className="rounded-md bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-indigo-500"
              >
                Submit paper
              </a>
              <a
                href="/payment"
                className="rounded-md border border-slate-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:border-slate-500"
              >
                Pay now
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800">
        <div className="mx-auto flex w-full flex-col items-center justify-between gap-2 px-4 py-3 text-center text-xs text-slate-500 sm:flex-row lg:px-8 sm:text-left">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <p className="max-w-xl">
            See{" "}
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
