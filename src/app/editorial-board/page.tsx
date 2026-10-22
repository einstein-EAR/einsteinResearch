import type { Metadata } from "next";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import EditorialBoardContent from "@/src/components/editorial-board/EditorialBoardContent";

export const metadata: Metadata = {
  title: "Editorial Board | ER Publications",
  description:
    "Meet the international editorial and reviewer board members guiding peer review and publication standards.",
};

export default function EditorialBoardPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[40vh] items-center justify-center gap-2 text-sm font-medium text-[#036eb6]">
          <Loader2 className="h-5 w-5 animate-spin" aria-hidden />
          Loading editorial board...
        </div>
      }
    >
      <EditorialBoardContent />
    </Suspense>
  );
}
