"use client";

import Link from "next/link";
import { ArrowLeft, CalendarDays, Loader2, Newspaper } from "lucide-react";
import { useLatestNewsById } from "@/src/hooks";
import { formatNewsDate } from "@/src/lib/formatDate";

export function LatestNewsDetail({ newsId }: { newsId: string }) {
  const { data: item, isLoading, isError } = useLatestNewsById(newsId);

  if (isLoading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center gap-2 text-sm font-medium text-[#036eb6]">
        <Loader2 className="h-5 w-5 animate-spin" aria-hidden />
        Loading update...
      </div>
    );
  }

  if (isError || !item) {
    return (
      <div className="rounded-2xl border border-red-200 bg-white px-6 py-12 text-center text-sm text-red-700">
        This news update could not be found.
      </div>
    );
  }

  return (
    <article className="overflow-hidden rounded-2xl border border-[#ededed] bg-white shadow-sm">
      <div className="h-64 bg-[#e8f1f8] sm:h-80">
        {item.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={item.imageUrl} alt={item.title} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full items-center justify-center text-[#036eb6]">
            <Newspaper className="h-12 w-12" aria-hidden />
          </div>
        )}
      </div>
      <div className="p-6 sm:p-8">
        <div className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-[#036eb6]">
          <CalendarDays className="h-4 w-4" aria-hidden />
          <time dateTime={item.publishedAt}>{formatNewsDate(item.publishedAt)}</time>
        </div>
        <h1 className="text-2xl font-bold text-[#092151] sm:text-3xl">{item.title}</h1>
        <p className="mt-4 text-base leading-relaxed text-[#334155]">{item.excerpt}</p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#036eb6]"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Back to all updates
        </Link>
      </div>
    </article>
  );
}
