"use client";

import {
  useQuery,
  type QueryKey,
  type UseQueryOptions,
  type UseQueryResult,
} from "@tanstack/react-query";
import { api } from "./client";
import { ApiError, type ApiRequestOptions } from "./types";

type ApiQueryOptions<TData> = Omit<
  UseQueryOptions<TData, ApiError, TData, QueryKey>,
  "queryKey" | "queryFn"
> & {
  params?: ApiRequestOptions["params"];
  headers?: ApiRequestOptions["headers"];
};

export function useApiGet<TData>(
  queryKey: QueryKey,
  endpoint: string,
  options?: ApiQueryOptions<TData>,
): UseQueryResult<TData, ApiError> {
  const { params, headers, ...queryOptions } = options ?? {};

  return useQuery({
    queryKey: [...(Array.isArray(queryKey) ? queryKey : [queryKey]), params],
    queryFn: ({ signal }) => api.get<TData>(endpoint, { params, headers, signal }),
    ...queryOptions,
  });
}
