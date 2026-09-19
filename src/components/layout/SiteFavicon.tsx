"use client";

import { useSiteSettings } from "@/src/hooks/useSiteSettings";
import { useEffect } from "react";

export function SiteFavicon() {
  const { data } = useSiteSettings();

  useEffect(() => {
    if (!data?.favIcon) return;

    let link = document.querySelector<HTMLLinkElement>("link[rel='icon']");

    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.head.appendChild(link);
    }

    link.href = data.favIcon;
  }, [data?.favIcon]);

  return null;
}
