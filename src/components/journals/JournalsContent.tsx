"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowLeft, BookOpen, Hash, Loader2 } from "lucide-react";
import JournalsList from "@/src/components/journals/JournalsList";
import IssuesList from "@/src/components/journals/IssuesList";
import IssueDetailScreen from "@/src/components/journals/IssueDetailScreen";
import { useGetJournalById, useGetJournals, useIssuesByJournal } from "@/src/hooks";

export default function JournalsContent() {
  const searchParams = useSearchParams();
  const journalId = searchParams.get("journalId");
  const issueId = searchParams.get("issueId");

  const {
    data: journals,
    isLoading: journalsLoading,
    isError: journalsError,
    error: journalsErrorData,
  } = useGetJournals({ enabled: !journalId });

  const {
    data: journal,
    isLoading: journalLoading,
    isError: journalError,
    error: journalErrorData,
  } = useGetJournalById(journalId);

  const {
    data: issues,
    isLoading: issuesLoading,
    isError: issuesError,
    error: issuesErrorData,
  } = useIssuesByJournal(journalId);

  if (journalId && issueId) {
    return (
      <div className="mx-auto w-full max-w-[1440px] px-4 py-10 sm:py-14 lg:px-8">
        <IssueDetailScreen journalId={journalId} issueId={issueId} />
      </div>
    );
  }

  if (journalId) {
    return (
      <div className="mx-auto w-full max-w-[1440px] px-4 py-10 sm:py-14 lg:px-8 ">
        <Link
          href="/journals"
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-[#024081] transition hover:text-[#036eb6]"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Back to journals
        </Link>

        {journalLoading ? (
          <div className="flex items-center justify-center gap-2 py-16 text-sm font-medium text-[#036eb6]">
            <Loader2 className="h-5 w-5 animate-spin" aria-hidden />
            Loading journal...
          </div>
        ) : journalError ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-6 py-8 text-center text-sm text-red-700">
            {journalErrorData.message || "Failed to load journal."}
          </div>
        ) : journal ? (
          <>
            <div className="mb-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="grid gap-0 lg:grid-cols-[220px_1fr]">
                <div className="relative aspect-3/4 bg-[#f4f8fc] lg:aspect-auto lg:min-h-[220px]">
                  {journal.imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={journal.imageUrl}
                      alt={journal.title}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-[#858c93]">
                      <BookOpen className="h-12 w-12" aria-hidden />
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <p className="text-xs font-semibold uppercase tracking-wide text-[#036eb6]">
                    Journal issues
                  </p>
                  <h1 className="mt-2 text-2xl font-bold text-[#092151] sm:text-3xl">
                    {journal.title}
                  </h1>
                  <p className="mt-2 text-sm leading-relaxed text-[#858c93]">
                    {journal.description}
                  </p>
                  <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-[#024081]">
                    <Hash className="h-4 w-4" aria-hidden />
                    {journal.serialNumber}
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-bold text-[#092151]">Issues</h2>
              <p className="mt-1 text-sm text-[#858c93]">
                {issues?.length ?? 0} issue{(issues?.length ?? 0) === 1 ? "" : "s"} for this
                journal
              </p>
            </div>

            {issuesError ? (
              <div className="rounded-2xl border border-red-200 bg-red-50 px-6 py-8 text-center text-sm text-red-700">
                {issuesErrorData.message || "Failed to load issues."}
              </div>
            ) : (
              <IssuesList
                journalId={journalId}
                issues={issues ?? []}
                isLoading={issuesLoading}
              />
            )}
          </>
        ) : null}
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-[1440px] px-4 py-10 sm:py-14 lg:px-8">
      <div className="mb-6 rounded-2xl border border-[#ededed] bg-linear-to-r from-[#024081] to-[#036eb6] px-6 py-5 text-white shadow-md">
        <p className="text-xs font-semibold uppercase tracking-wide text-blue-100">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <span className="mx-2 opacity-70">/</span>
          Our journals
        </p>
        <h1 className="mt-2 text-2xl font-bold sm:text-3xl">Our Journals</h1>
        <p className="mt-2 max-w-2xl text-sm text-blue-100">
          Browse our peer-reviewed journals, open published issues, and download or view PDFs.
        </p>
      </div>

      {journalsError ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-6 py-8 text-center text-sm text-red-700">
          {journalsErrorData.message || "Failed to load journals."}
        </div>
      ) : (
        <JournalsList journals={journals ?? []} isLoading={journalsLoading} />
      )}
    </div>
  );
}
