"use client";

import { useApiGet } from "@/src/lib/api";
import type { EditorialBoardCategory } from "@/src/types/editorialBoard";
import type { ApiError } from "@/src/lib/api";
import type { UseQueryOptions, UseQueryResult } from "@tanstack/react-query";

export const EDITORIAL_BOARD_QUERY_KEY = ["editorial-board"] as const;

type UseEditorialBoardOptions = Omit<
  UseQueryOptions<EditorialBoardCategory[], ApiError, EditorialBoardCategory[]>,
  "queryKey" | "queryFn"
>;

export function useEditorialBoard(
  options?: UseEditorialBoardOptions,
): UseQueryResult<EditorialBoardCategory[], ApiError> {
  return useApiGet<EditorialBoardCategory[]>(
    EDITORIAL_BOARD_QUERY_KEY,
    "/editorial-board",
    options,
  );
}
