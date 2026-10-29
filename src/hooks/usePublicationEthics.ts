"use client";

import { useApiGet } from "@/src/lib/api";
import type { ApiError } from "@/src/lib/api";
import type { PublicationEthics } from "@/src/types/publicationEthics";
import type { UseQueryOptions, UseQueryResult } from "@tanstack/react-query";

export const PUBLICATION_ETHICS_QUERY_KEY = ["publication-ethics"] as const;

type UsePublicationEthicsOptions = Omit<
  UseQueryOptions<PublicationEthics, ApiError, PublicationEthics>,
  "queryKey" | "queryFn"
>;

export function usePublicationEthics(
  options?: UsePublicationEthicsOptions,
): UseQueryResult<PublicationEthics, ApiError> {
  return useApiGet<PublicationEthics>(
    PUBLICATION_ETHICS_QUERY_KEY,
    "/publication-ethics",
    options,
  );
}
