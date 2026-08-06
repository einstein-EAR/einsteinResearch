"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Download,
  ExternalLink,
  FileText,
  Loader2,
} from "lucide-react";
import { useGetIssueById } from "@/src/hooks";

type PdfViewerProps = {
  journalId: string;
  issueId: string;
  pdfId: string;
};

export default function PdfViewer({ journalId, issueId, pdfId }: PdfViewerProps) {
  const { data: issue, isLoading, isError, error } = useGetIssueById(issueId);

  const backHref = `/journals?journalId=${journalId}&issueId=${issueId}`;
  const pdf = issue?.pdfs.find((item) => item._id === pdfId);

  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center gap-2 text-sm font-medium text-[#036eb6]">
        <Loader2 className="h-5 w-5 animate-spin" aria-hidden />
        Loading PDF...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mx-auto w-full max-w-[1440px] px-4 py-10 sm:py-14 lg:px-8">
        <Link
          href={backHref}
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-[#024081] transition hover:text-[#036eb6]"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Back to issue
        </Link>
        <div className="rounded-2xl border border-red-200 bg-red-50 px-6 py-8 text-center text-sm text-red-700">
          {error.message || "Failed to load PDF."}
        </div>
      </div>
    );
  }

  if (!pdf) {
    return (
      <div className="mx-auto w-full max-w-[1440px] px-4 py-10 sm:py-14 lg:px-8">
        <Link
          href={backHref}
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-[#024081] transition hover:text-[#036eb6]"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Back to issue
        </Link>
        <div className="rounded-2xl border border-dashed border-slate-200 bg-white px-6 py-16 text-center shadow-sm">
          <FileText className="mx-auto h-10 w-10 text-[#858c93]" aria-hidden />
          <p className="mt-4 text-sm text-[#858c93]">PDF not found for this issue.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto flex w-full max-w-[1440px] flex-1 flex-col px-4 py-6 sm:py-10 lg:px-8">
      <div className="mb-4 flex flex-col gap-4 sm:mb-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <Link
            href={backHref}
            className="mb-3 inline-flex items-center gap-2 text-sm font-semibold text-[#024081] transition hover:text-[#036eb6]"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Back to issue
          </Link>
          <p className="text-xs font-semibold uppercase tracking-wide text-[#036eb6]">
            {issue?.issueLabel}
          </p>
          <h1 className="mt-1 text-xl font-bold text-[#092151] sm:text-2xl">
            {pdf.title}
          </h1>
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

        <div className="flex shrink-0 flex-wrap gap-2">
          <a
            href={pdf.pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border border-blue-200 bg-white px-4 py-2 text-sm font-semibold text-[#024081] transition hover:bg-blue-50"
          >
            <ExternalLink className="h-4 w-4" aria-hidden />
            Open in new tab
          </a>
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
      </div>

      <div className="min-h-[70vh] flex-1 overflow-hidden rounded-2xl border border-[#ededed] bg-white shadow-sm">
        <iframe
          src={pdf.pdfUrl}
          title={pdf.title}
          className="h-[70vh] w-full sm:h-[75vh]"
        />
      </div>
    </div>
  );
}
