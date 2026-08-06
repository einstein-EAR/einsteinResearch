"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Download,
  Eye,
  FileText,
  Loader2,
} from "lucide-react";
import { useGetIssueById } from "@/src/hooks";

type IssueDetailScreenProps = {
  journalId: string;
  issueId: string;
};

export default function IssueDetailScreen({ journalId, issueId }: IssueDetailScreenProps) {
  const { data: issue, isLoading, isError, error } = useGetIssueById(issueId);

  return (
    <>
      <Link
        href={`/journals?journalId=${journalId}`}
        className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-[#024081] transition hover:text-[#036eb6]"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden />
        Back to issues
      </Link>

      {isLoading ? (
        <div className="flex items-center justify-center gap-2 py-16 text-sm font-medium text-[#036eb6]">
          <Loader2 className="h-5 w-5 animate-spin" aria-hidden />
          Loading issue...
        </div>
      ) : isError ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-6 py-8 text-center text-sm text-red-700">
          {error.message || "Failed to load issue."}
        </div>
      ) : issue ? (
        <>
          <div className="mb-6 rounded-2xl border border-[#ededed] bg-linear-to-r from-[#024081] to-[#036eb6] px-6 py-5 text-white shadow-md">
            <p className="text-xs font-semibold uppercase tracking-wide text-blue-100">
              Issue PDFs
            </p>
            <h1 className="mt-2 text-2xl font-bold sm:text-3xl">{issue.issueLabel}</h1>
            {issue.title ? <p className="mt-2 text-sm font-medium text-blue-50">{issue.title}</p> : null}
            {issue.description ? (
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-blue-100">
                {issue.description}
              </p>
            ) : null}
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-bold text-[#092151]">Available PDFs</h2>
            <p className="mt-1 text-sm text-[#858c93]">
              {issue.pdfs.length} PDF{issue.pdfs.length === 1 ? "" : "s"} in this issue
            </p>
          </div>

          {issue.pdfs.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-200 bg-white px-6 py-16 text-center shadow-sm">
              <FileText className="mx-auto h-10 w-10 text-[#858c93]" aria-hidden />
              <p className="mt-4 text-sm text-[#858c93]">No PDFs available for this issue yet.</p>
            </div>
          ) : (
            <ul className="space-y-3">
              {issue.pdfs.map((pdf) => (
                <li
                  key={pdf._id}
                  className="flex flex-col gap-3 rounded-2xl border border-[#ededed] bg-white p-5 shadow-sm transition hover:shadow-md sm:flex-row sm:items-center sm:justify-between sm:p-6"
                >
                  <div className="min-w-0 flex-1">
                    <h3 className="text-base font-semibold text-[#092151]">{pdf.title}</h3>
                    {pdf.author ? (
                      <p className="mt-1.5 text-sm text-[#334155]">
                        <span className="font-medium text-[#858c93]">Author:</span> {pdf.author}
                      </p>
                    ) : null}
                    {pdf.doi ? (
                      <p className="mt-1 text-sm text-[#334155]">
                        <span className="font-medium text-[#858c93]">DOI:</span>{" "}
                        {pdf.doi.startsWith("http") ? (
                          <a
                            href={pdf.doi}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="break-all text-[#024081] hover:underline"
                          >
                            {pdf.doi}
                          </a>
                        ) : (
                          <span className="break-all">{pdf.doi}</span>
                        )}
                      </p>
                    ) : null}
                  </div>

                  <div className="flex shrink-0 gap-2">
                    <Link
                      href={`/journals/${journalId}/issues/${issueId}/pdf/${pdf._id}`}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-blue-200 bg-white px-4 py-2 text-sm font-semibold text-[#024081] transition hover:bg-blue-50"
                    >
                      <Eye className="h-4 w-4" aria-hidden />
                      View
                    </Link>
                    <a
                      href={pdf.pdfUrl}
                      download
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-lg bg-linear-to-r from-[#024081] to-[#036eb6] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:shadow-md"
                    >
                      <Download className="h-4 w-4" aria-hidden />
                      Download
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </>
      ) : null}
    </>
  );
}
