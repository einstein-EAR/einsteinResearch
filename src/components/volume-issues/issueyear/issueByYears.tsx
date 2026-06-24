"use client";

import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

import type { VolumeIssue } from "@/src/apidata/Volumes";

type IssueByYearsProps = {
  issueData: VolumeIssue[];
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

export default function IssueByYears({
  issueData,
  volumeId,
  pageSizeOptions = DEFAULT_PAGE_SIZE_OPTIONS,
}: IssueByYearsProps) {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(pageSizeOptions[1] ?? 10);

  const totalItems = issueData.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const currentPage = Math.min(page, totalPages);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return issueData.slice(start, start + pageSize);
  }, [issueData, currentPage, pageSize]);

  const startIndex = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endIndex = Math.min(currentPage * pageSize, totalItems);

  const handleIssueClick = (issueSlug: string) => {
    router.push(`/volumes/${volumeId}/${issueSlug}`);
  };

  const handlePageSizeChange = (value: number) => {
    setPageSize(value);
    setPage(1);
  };

  return (
    <section className="w-full">
      <div className="overflow-hidden rounded-2xl border border-[#ededed] bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse text-left">
            <thead>
              <tr className="border-b border-[#ededed] bg-[#f4f8fc]">
                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-[#036eb6]">
                  S.No.
                </th>
                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-[#036eb6]">
                  Issue Title
                </th>
                <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wide text-[#036eb6]">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.length === 0 ? (
                <tr>
                  <td colSpan={3} className="px-5 py-12 text-center text-sm text-[#858c93]">
                    No issues available for this volume.
                  </td>
                </tr>
              ) : (
                paginatedData.map((issue, index) => (
                  <tr
                    key={issue.id}
                    className="border-b border-slate-100 transition-colors duration-200 last:border-b-0 hover:bg-blue-50/40"
                  >
                    <td className="px-5 py-4 text-sm font-medium text-slate-600">
                      {startIndex + index}
                    </td>
                    <td className="px-5 py-4">
                      <button
                        type="button"
                        onClick={() => handleIssueClick(issue.slug)}
                        className="cursor-pointer text-left text-sm font-semibold text-[#092151] transition hover:text-[#036eb6]"
                      >
                        {issue.title}
                      </button>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <button
                        type="button"
                        onClick={() => handleIssueClick(issue.slug)}
                        className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-semibold text-[#024081] transition hover:bg-blue-100"
                      >
                        View articles
                        <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col gap-4 border-t border-[#ededed] bg-[#fafbfc] px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
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
      </div>
    </section>
  );
}
