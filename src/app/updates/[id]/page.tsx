import type { Metadata } from "next";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import { LatestNewsDetail } from "@/src/components/home/LatestNewsDetail";

export const metadata: Metadata = {
  title: "News Update | ER Publications",
  description: "Read the latest announcement from ER Publications.",
};

export default async function UpdateDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <section className="w-full bg-[#f4f8fc] px-4 py-10 sm:px-6 md:px-12 md:py-14">
      <div className="mx-auto w-full max-w-[860px]">
        <Suspense
          fallback={
            <div className="flex min-h-[40vh] items-center justify-center gap-2 text-sm font-medium text-[#036eb6]">
              <Loader2 className="h-5 w-5 animate-spin" aria-hidden />
              Loading update...
            </div>
          }
        >
          <LatestNewsDetail newsId={id} />
        </Suspense>
      </div>
    </section>
  );
}
