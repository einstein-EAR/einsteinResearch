"use client";

import { useApiGet } from "@/src/lib/api";
import type { SiteSettings } from "@/src/types/siteSettings";
import type { ApiError } from "@/src/lib/api";
import type { UseQueryOptions, UseQueryResult } from "@tanstack/react-query";

export const SITE_SETTINGS_QUERY_KEY = ["site-settings"] as const;

type UseSiteSettingsOptions = Omit<
  UseQueryOptions<SiteSettings, ApiError, SiteSettings>,
  "queryKey" | "queryFn"
>;

export function useSiteSettings(
  options?: UseSiteSettingsOptions,
): UseQueryResult<SiteSettings, ApiError> {
  return useApiGet<SiteSettings>(SITE_SETTINGS_QUERY_KEY, "/site-settings", {
    staleTime: 5 * 60 * 1000,
    ...options,
  });
}
