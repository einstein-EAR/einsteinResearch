"use client";

import Link from "next/link";
import { ArrowRight, CalendarDays, Loader2, Newspaper } from "lucide-react";
import { useLatestNews } from "@/src/hooks";
import { formatNewsDate } from "@/src/lib/formatDate";

export function LatestNewsList() {
  const { data: newsItems = [], isLoading, isError, refetch } = useLatestNews();

  if (isLoading) {
    return (
      <div className="flex min-h-[30vh] items-center justify-center gap-2 text-sm font-medium text-[#036eb6]">
        <Loader2 className="h-5 w-5 animate-spin" aria-hidden />
        Loading updates...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="space-y-4">
        <div className="rounded-2xl border border-red-200 bg-red-50 px-6 py-10 text-center text-sm text-red-700">
          Unable to load news updates right now.
        </div>
        <div className="text-center">
          <button
            type="button"
            onClick={() => refetch()}
            className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-[#024081] transition hover:bg-blue-50"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  if (newsItems.length === 0) {
    return (
      <div className="rounded-2xl border border-[#ededed] bg-white px-6 py-16 text-center text-sm text-[#858c93] shadow-sm">
        No news updates have been published yet.
      </div>
    );
  }

  return (
    <div className="grid gap-5 md:grid-cols-2">
      {newsItems.map((item) => (
        <article
          key={item._id}
          className="overflow-hidden rounded-2xl border border-[#ededed] bg-white shadow-sm transition hover:shadow-md"
        >
          <div className="h-48 bg-[#e8f1f8]">
            {item.imageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={item.imageUrl} alt={item.title} className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full items-center justify-center text-[#036eb6]">
                <Newspaper className="h-10 w-10" aria-hidden />
              </div>
            )}
          </div>
          <div className="p-5">
            <div className="mb-3 inline-flex items-center gap-2 text-xs font-medium text-[#036eb6]">
              <CalendarDays className="h-4 w-4" aria-hidden />
              <time dateTime={item.publishedAt}>{formatNewsDate(item.publishedAt)}</time>
            </div>
            <h2 className="text-lg font-semibold text-[#092151]">{item.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-[#858c93]">{item.excerpt}</p>
            <Link
              href={`/updates/${item._id}`}
              className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#036eb6]"
            >
              Read more
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}
