"use client";

import { useEffect } from "react";

export function HomeScrollEffects() {
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const sections = Array.from(document.querySelectorAll<HTMLElement>(".scroll-reveal"));

    if (reducedMotion) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.16, rootMargin: "0px 0px -48px 0px" },
    );

    for (const section of sections) {
      section.classList.add("scroll-reveal-pending");
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, []);

  return null;
}
