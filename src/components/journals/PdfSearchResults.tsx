"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Download, FileText, Loader2 } from "lucide-react";
import { useSearchIssuePdfs } from "@/src/hooks";

export default function PdfSearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query")?.trim() ?? "";

  const { data, isLoading, isError, error, isFetching } = useSearchIssuePdfs(query);

  const results = data ?? [];
  const hasQuery = Boolean(query);

  return (
    <div className="mx-auto w-full max-w-[1440px] px-4 py-10 sm:py-14 lg:px-8">
      <div className="mb-6 rounded-2xl border border-[#ededed] bg-linear-to-r from-[#024081] to-[#036eb6] px-6 py-5 text-white shadow-md">
        <p className="text-xs font-semibold uppercase tracking-wide text-blue-100">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <span className="mx-2 opacity-70">/</span>
          Search
        </p>
        <h1 className="mt-2 text-2xl font-bold sm:text-3xl">PDF Search</h1>
        <p className="mt-2 max-w-2xl text-sm text-blue-100">
          {hasQuery
            ? `Results for “${query}”.`
            : "Use the header search to find published PDFs by title or author."}
        </p>
      </div>

      {!hasQuery ? (
        <div className="rounded-2xl border border-dashed border-slate-200 bg-white px-6 py-16 text-center shadow-sm">
          <FileText className="mx-auto h-10 w-10 text-[#858c93]" aria-hidden />
          <p className="mt-4 text-sm text-[#858c93]">No search query provided.</p>
        </div>
      ) : isLoading || isFetching ? (
        <div className="flex items-center justify-center gap-2 py-16 text-sm font-medium text-[#036eb6]">
          <Loader2 className="h-5 w-5 animate-spin" aria-hidden />
          Searching PDFs...
        </div>
      ) : isError ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-6 py-8 text-center text-sm text-red-700">
          {error.message || "Failed to search PDFs."}
        </div>
      ) : results.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-200 bg-white px-6 py-16 text-center shadow-sm">
          <FileText className="mx-auto h-10 w-10 text-[#858c93]" aria-hidden />
          <p className="mt-4 text-sm text-[#858c93]">No PDFs found for “{query}”.</p>
        </div>
      ) : (
        <>
          <div className="mb-6">
            <h2 className="text-xl font-bold text-[#092151]">Search results</h2>
            <p className="mt-1 text-sm text-[#858c93]">
              {results.length} PDF{results.length === 1 ? "" : "s"} found
            </p>
          </div>

          <ul className="space-y-3">
            {results.map((pdf) => (
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
                  {(pdf.journalTitle || pdf.issueLabel) && (
                    <p className="mt-2 text-xs text-[#858c93]">
                      {[pdf.journalTitle, pdf.issueLabel].filter(Boolean).join(" · ")}
                    </p>
                  )}
                </div>

                <div className="flex shrink-0 gap-2">
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
        </>
      )}
    </div>
  );
}
