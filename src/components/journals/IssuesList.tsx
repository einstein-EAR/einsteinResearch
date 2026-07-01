"use client";

import { useRouter } from "next/navigation";
import { ChevronRight, Clock, FileText, Loader2 } from "lucide-react";
import { formatToIST } from "@/src/lib/formatDate";
import type { JournalIssue } from "@/src/types/issue";

type IssuesListProps = {
  journalId: string;
  issues: JournalIssue[];
  isLoading?: boolean;
};

export default function IssuesList({ journalId, issues, isLoading }: IssuesListProps) {
  const router = useRouter();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center gap-2 py-16 text-sm font-medium text-[#036eb6]">
        <Loader2 className="h-5 w-5 animate-spin" aria-hidden />
        Loading issues...
      </div>
    );
  }

  if (issues.length === 0) {
    return (
      <div className="rounded-2xl border border-[#ededed] bg-white px-6 py-16 text-center text-sm text-[#858c93] shadow-sm">
        No issues published for this journal yet.
      </div>
    );
  }

  return (
    <ul className="space-y-4">
      {issues.map((issue) => (
        <li key={issue._id}>
          <button
            type="button"
            onClick={() =>
              router.push(`/journals?journalId=${journalId}&issueId=${issue._id}`)
            }
            className="flex w-full overflow-hidden rounded-2xl border border-[#ededed] bg-white p-5 text-left shadow-sm transition hover:border-blue-200 hover:shadow-md sm:p-6 cursor-pointer"
          >
            <div className="flex min-w-0 flex-1 items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <h3 className="text-lg font-semibold text-[#092151]">{issue.issueLabel}</h3>
                {issue.title ? (
                  <p className="mt-1 text-sm text-[#858c93]">{issue.title}</p>
                ) : null}
                <p className="mt-2 inline-flex items-center gap-1.5 text-xs text-[#858c93]">
                  <Clock className="h-3.5 w-3.5 text-[#036eb6]" aria-hidden />
                  Published {formatToIST(issue.created_at)}
                </p>
              </div>

              <div className="flex shrink-0 items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-[#024081]">
                  <FileText className="h-3.5 w-3.5" aria-hidden />
                  {issue.pdfs?.length ?? 0} PDF{issue.pdfs?.length === 1 ? "" : "s"}
                </span>
                <ChevronRight className="h-5 w-5 text-[#858c93]" aria-hidden />
              </div>
            </div>
          </button>
        </li>
      ))}
    </ul>
  );
}
