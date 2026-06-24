"use client";

import { ChevronLeft, ChevronRight, Download, Eye } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { IssueArticle } from "@/src/apidata/Volumes";

type IssueArticlesProps = {
  articles: IssueArticle[];
  volumeId: number;
  pageSizeOptions?: number[];
};

const DEFAULT_PAGE_SIZE_OPTIONS = [5, 10, 20];

function getPageNumbers(current: number, total: number): (number | "ellipsis")[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages: (number | "ellipsis")[] = [1];

  if (current > 3) pages.push("ellipsis");

  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);

  for (let page = start; page <= end; page += 1) {
    pages.push(page);
  }

  if (current < total - 2) pages.push("ellipsis");

  pages.push(total);
  return pages;
}

function getViewUrl(article: IssueArticle, volumeId: number) {
  return article.viewUrl ?? `/volumes/${volumeId}/papers/${article.id}/view`;
}

function getDownloadUrl(article: IssueArticle, volumeId: number) {
  return article.downloadUrl ?? `/volumes/${volumeId}/papers/${article.id}/download`;
}

export default function IssueArticles({
  articles,
  volumeId,
  pageSizeOptions = DEFAULT_PAGE_SIZE_OPTIONS,
}: IssueArticlesProps) {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(pageSizeOptions[1] ?? 10);

  const totalItems = articles.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const currentPage = Math.min(page, totalPages);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return articles.slice(start, start + pageSize);
  }, [articles, currentPage, pageSize]);

  const startIndex = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endIndex = Math.min(currentPage * pageSize, totalItems);

  const handlePageSizeChange = (value: number) => {
    setPageSize(value);
    setPage(1);
  };

  return (
    <section className="w-full">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-[#092151] sm:text-2xl">Published papers</h2>
        <p className="mt-1 text-sm text-[#858c93]">
          View or download full-text articles from this issue.
        </p>
      </div>

      {paginatedData.length === 0 ? (
        <div className="rounded-2xl border border-[#ededed] bg-white px-6 py-12 text-center text-sm text-[#858c93] shadow-sm">
          No articles published for this issue yet.
        </div>
      ) : (
        <ul className="space-y-4">
          {paginatedData.map((article, index) => (
            <li
              key={article.id}
              className="flex flex-col overflow-hidden rounded-2xl border border-[#ededed] bg-white shadow-sm transition hover:shadow-md"
            >
              <div className="flex flex-col gap-3 p-5 sm:flex-row sm:items-start sm:gap-5 sm:p-6">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#024081] text-sm font-bold text-white">
                  {startIndex + index}
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="text-base font-semibold leading-snug text-[#092151] sm:text-lg">
                    {article.title}
                  </h3>
                  <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-[#858c93]">
                    <span>
                      <span className="font-medium text-slate-600">Author:</span>{" "}
                      {article.author}
                    </span>
                    <span>
                      <span className="font-medium text-slate-600">Country:</span>{" "}
                      {article.country}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 border-t border-slate-100 bg-[#f4f8fc] px-5 py-4 sm:px-6">
                <Link
                  href={getViewUrl(article, volumeId)}
                  className="inline-flex items-center gap-2 rounded-lg border border-blue-200 bg-white px-4 py-2 text-sm font-semibold text-[#024081] transition hover:bg-blue-50"
                >
                  <Eye className="h-4 w-4" aria-hidden />
                  View
                </Link>
                <a
                  href={getDownloadUrl(article, volumeId)}
                  download
                  className="inline-flex items-center gap-2 rounded-lg bg-linear-to-r from-[#024081] to-[#036eb6] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:shadow-md"
                >
                  <Download className="h-4 w-4" aria-hidden />
                  Download
                </a>
              </div>
            </li>
          ))}
        </ul>
      )}

      {totalItems > 0 ? (
        <div className="mt-6 flex flex-col gap-4 rounded-2xl border border-[#ededed] bg-[#fafbfc] px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
          <div className="flex flex-wrap items-center gap-3 text-sm text-[#858c93]">
            <span>
              Showing {startIndex}–{endIndex} of {totalItems}
            </span>
            <label className="flex items-center gap-2">
              <span className="font-medium text-slate-600">Page size</span>
              <select
                value={pageSize}
                onChange={(e) => handlePageSizeChange(Number(e.target.value))}
                className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-700 focus:border-[#036eb6] focus:outline-none focus:ring-2 focus:ring-[#036eb6]/20"
                aria-label="Rows per page"
              >
                {pageSizeOptions.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            <button
              type="button"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
              aria-label="Previous page"
            >
              <ChevronLeft className="h-4 w-4" aria-hidden />
              Prev
            </button>

            {getPageNumbers(currentPage, totalPages).map((pageNumber, index) =>
              pageNumber === "ellipsis" ? (
                <span
                  key={`ellipsis-${index}`}
                  className="px-2 text-sm text-slate-400"
                  aria-hidden
                >
                  …
                </span>
              ) : (
                <button
                  key={pageNumber}
                  type="button"
                  onClick={() => setPage(pageNumber)}
                  aria-current={currentPage === pageNumber ? "page" : undefined}
                  className={`min-w-9 rounded-lg px-3 py-1.5 text-sm font-medium transition ${
                    currentPage === pageNumber
                      ? "bg-[#024081] text-white shadow-sm"
                      : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  {pageNumber}
                </button>
              ),
            )}

            <button
              type="button"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
              aria-label="Next page"
            >
              Next
              <ChevronRight className="h-4 w-4" aria-hidden />
            </button>
          </div>
        </div>
      ) : null}
    </section>
  );
}
