import type { Metadata } from "next";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import PublicationEthicsContent from "@/src/components/publication-ethics/PublicationEthicsContent";

export const metadata: Metadata = {
  title: "Publication Ethics | ER Publications",
  description:
    "Publication ethics and malpractice policy for editors, authors, and reviewers of ER Publications journals.",
};

export default function PublicationEthicsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[40vh] items-center justify-center gap-2 text-sm font-medium text-[#036eb6]">
          <Loader2 className="h-5 w-5 animate-spin" aria-hidden />
          Loading publication ethics...
        </div>
      }
    >
      <PublicationEthicsContent />
    </Suspense>
  );
}
