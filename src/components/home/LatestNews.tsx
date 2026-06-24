import Link from "next/link";
import { ArrowRight, CalendarDays, Newspaper } from "lucide-react";
import { latestUpdates } from "./homeData";

export function LatestNews() {
  return (
    <section className="w-full bg-[#f4f8fc] px-4 py-10 sm:px-6 md:px-12 md:py-14">
      <div className="mx-auto w-full max-w-[1440px]">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#036eb6]">
              Editorial desk
            </p>
            <h2 className="mt-2 text-2xl font-bold text-[#092151] sm:text-3xl lg:text-4xl">
              Latest{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-[#024081] to-[#036eb6]">
                news &amp; updates
              </span>
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-[#858c93] sm:text-base">
              Stay informed about submissions, indexing, review timelines, and special
              announcements from IJARESM.
            </p>
          </div>
          <Link
            href="/updates"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#036eb6] transition hover:text-[#024081]"
          >
            View all updates
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {latestUpdates.map((item, index) => (
            <article
              key={item.title}
              className="group flex flex-col overflow-hidden rounded-2xl border border-[#ededed] bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="bg-linear-to-r from-[#024081] to-[#036eb6] px-5 py-4">
                <div className="flex items-center gap-2 text-xs font-medium text-blue-100">
                  <CalendarDays className="h-4 w-4 shrink-0" aria-hidden />
                  <time dateTime={item.date}>{item.date}</time>
                </div>
              </div>

              <div className="flex flex-1 flex-col p-5">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-[#036eb6]">
                  <Newspaper className="h-5 w-5" aria-hidden />
                </div>
                <h3 className="text-base font-semibold leading-snug text-[#092151] group-hover:text-[#024081]">
                  {item.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-[#858c93]">
                  {item.excerpt}
                </p>
                <Link
                  href={item.href}
                  className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#036eb6] transition group-hover:gap-2"
                >
                  Read more
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </div>

              {index === 0 ? (
                <div className="border-t border-blue-100 bg-blue-50/50 px-5 py-2">
                  <span className="text-[11px] font-semibold uppercase tracking-wide text-[#036eb6]">
                    Featured
                  </span>
                </div>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
