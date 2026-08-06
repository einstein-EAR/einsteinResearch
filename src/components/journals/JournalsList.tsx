"use client";

import { useRouter } from "next/navigation";
import { ArrowRight, BookOpen, Hash, Loader2 } from "lucide-react";
import type { Journal } from "@/src/types/journal";

type JournalsListProps = {
  journals: Journal[];
  isLoading?: boolean;
  searchQuery?: string;
};

type JournalCardProps = {
  journal: Journal;
};

function JournalCard({ journal }: JournalCardProps) {
  const router = useRouter();

  const openIssues = () => {
    router.push(`/journals?journalId=${journal._id}`);
  };

  return (
    <article className="overflow-hidden rounded-xl border border-[#9ec3e0] bg-[#f7fbff] shadow-sm transition duration-200 hover:border-[#036eb6] hover:shadow-md">
      <div className="flex flex-col gap-0 sm:flex-row">
        <div className="relative mx-auto w-full max-w-[160px] shrink-0 bg-[#e8f1f8] p-3 sm:mx-0 sm:w-[150px] sm:max-w-none sm:self-stretch sm:p-4">
          <div className="relative aspect-3/4 overflow-hidden rounded-md border border-[#d5e4f0] bg-white shadow-sm">
            {journal.imageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={journal.imageUrl}
                alt={journal.title}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-[#858c93]">
                <BookOpen className="h-10 w-10" aria-hidden />
              </div>
            )}
          </div>
        </div>

        <div className="flex min-w-0 flex-1 flex-col px-4 pb-4 pt-1 sm:px-5 sm:py-4">
          <h3 className="text-base font-bold uppercase leading-snug tracking-wide text-[#024081] sm:text-lg">
            {journal.title}
          </h3>

          <div className="mt-2.5 inline-flex w-fit items-center gap-1.5 rounded bg-[#024081] px-2.5 py-1 text-xs font-semibold text-white">
            <Hash className="h-3.5 w-3.5" aria-hidden />
            <span>ISSN / ISBN: {journal.serialNumber}</span>
          </div>

          <p className="mt-3 text-sm leading-relaxed text-[#334155]">
            <span className="font-bold text-[#c41e3a]">About:</span>{" "}
            <span className="line-clamp-3">{journal.description}</span>
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={openIssues}
              className="inline-flex cursor-pointer items-center gap-2 rounded-md bg-[#024081] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#036eb6] pointer-events-auto"
            >
              Browse Issues
              <ArrowRight className="h-4 w-4" aria-hidden />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function JournalsList({
  journals,
  isLoading,
  searchQuery,
}: JournalsListProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center gap-2 py-16 text-sm font-medium text-[#036eb6]">
        <Loader2 className="h-5 w-5 animate-spin" aria-hidden />
        Loading journals...
      </div>
    );
  }

  if (journals.length === 0) {
    return (
      <div className="rounded-2xl border border-[#ededed] bg-white px-6 py-16 text-center text-sm text-[#858c93] shadow-sm">
        {searchQuery
          ? `No journals found for “${searchQuery}”.`
          : "No journals published yet. Please check back soon."}
      </div>
    );
  }

  return (
    <section className="w-full">
      <div className="mb-6 rounded-2xl bg-linear-to-r from-[#024081] to-[#036eb6] px-6 py-4 text-white shadow-md">
        <p className="text-sm font-medium text-blue-100">
          <span className="text-white">{journals.length}</span> journal
          {journals.length === 1 ? "" : "s"}
          {searchQuery ? " matched" : " published"}
        </p>
      </div>

      <div className="flex flex-col gap-5">
        {journals.map((journal) => (
          <JournalCard key={journal._id} journal={journal} />
        ))}
      </div>
    </section>
  );
}
