import type { Metadata } from "next";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import { LatestNewsList } from "@/src/components/home/LatestNewsList";

export const metadata: Metadata = {
  title: "Latest News & Updates | ER Publications",
  description: "News, announcements, and editorial updates from ER Publications.",
};

export default function UpdatesPage() {
  return (
    <section className="w-full bg-[#f4f8fc] px-4 py-10 sm:px-6 md:px-12 md:py-14">
      <div className="mx-auto w-full max-w-[1100px]">
        <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#036eb6]">
          Editorial desk
        </p>
        <h1 className="mt-2 text-3xl font-bold text-[#092151] sm:text-4xl">
          Latest news &amp; updates
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-[#858c93] sm:text-base">
          Stay informed about submissions, indexing, review timelines, and special
          announcements.
        </p>
        <div className="mt-8">
          <Suspense
            fallback={
              <div className="flex min-h-[30vh] items-center justify-center gap-2 text-sm font-medium text-[#036eb6]">
                <Loader2 className="h-5 w-5 animate-spin" aria-hidden />
                Loading updates...
              </div>
            }
          >
            <LatestNewsList />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
