"use client";

import { useApiGet } from "@/src/lib/api";
import type { IssuePdfSearchResult } from "@/src/types/pdfSearch";
import type { UseQueryOptions, UseQueryResult } from "@tanstack/react-query";
import type { ApiError } from "@/src/lib/api";

export const PDF_SEARCH_QUERY_KEY = ["issues", "pdfs", "search"] as const;

type UseSearchIssuePdfsOptions = Omit<
  UseQueryOptions<IssuePdfSearchResult[], ApiError, IssuePdfSearchResult[]>,
  "queryKey" | "queryFn"
>;

export function useSearchIssuePdfs(
  query: string | null,
  options?: UseSearchIssuePdfsOptions,
) {
  const searchQuery = query?.trim() || undefined;
  const { enabled, ...queryOptions } = options ?? {};

  return useApiGet<IssuePdfSearchResult[]>(
    [...PDF_SEARCH_QUERY_KEY, searchQuery],
    "/issues/pdfs/search",
    {
      params: searchQuery ? { query: searchQuery } : undefined,
      enabled: Boolean(searchQuery) && (enabled ?? true),
      ...queryOptions,
    },
  ) as UseQueryResult<IssuePdfSearchResult[], ApiError>;
}
