"use client";

import { useApiGet } from "@/src/lib/api";
import type { LatestNews } from "@/src/types/latestNews";
import type { UseQueryOptions, UseQueryResult } from "@tanstack/react-query";
import type { ApiError } from "@/src/lib/api";

export const LATEST_NEWS_QUERY_KEY = ["latest-news"] as const;

type UseLatestNewsOptions = Omit<
  UseQueryOptions<LatestNews[], ApiError, LatestNews[]>,
  "queryKey" | "queryFn"
>;

export function useLatestNews(
  options?: UseLatestNewsOptions,
): UseQueryResult<LatestNews[], ApiError> {
  return useApiGet<LatestNews[]>(LATEST_NEWS_QUERY_KEY, "/latest-news", options);
}

type UseLatestNewsByIdOptions = Omit<
  UseQueryOptions<LatestNews, ApiError, LatestNews>,
  "queryKey" | "queryFn"
>;

export function useLatestNewsById(
  newsId: string | null,
  options?: UseLatestNewsByIdOptions,
) {
  const { enabled, ...queryOptions } = options ?? {};

  return useApiGet<LatestNews>(
    [...LATEST_NEWS_QUERY_KEY, newsId],
    `/latest-news/${newsId}`,
    {
      enabled: Boolean(newsId) && (enabled ?? true),
      ...queryOptions,
    },
  ) as UseQueryResult<LatestNews, ApiError>;
}
