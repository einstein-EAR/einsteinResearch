"use client";

import { Loader2, Scale } from "lucide-react";
import { usePublicationEthics } from "@/src/hooks";

function normalizeEthicsHtml(html: string) {
  const cleaned = html
    .replace(/<div>(?:\s|&nbsp;|<br\s*\/?>)*<\/div>/gi, "")
    .replace(/(&nbsp;)+/gi, " ")
    .trim();

  const doc = new DOMParser().parseFromString(cleaned, "text/html");
  doc.body.querySelectorAll("b").forEach((bold) => {
    const parent = bold.parentElement;
    if (!parent) return;

    const heading =
      parent === doc.body ||
      (parent.tagName === "DIV" &&
        (parent.textContent ?? "").trim() === (bold.textContent ?? "").trim());

    if (heading) {
      bold.classList.add("ethics-heading");
    }
  });

  return doc.body.innerHTML;
}

export default function PublicationEthicsContent() {
  const { data, isLoading, isError, error, refetch } = usePublicationEthics();
  const content = data?.content ? normalizeEthicsHtml(data.content) : "";

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-10 sm:py-14 lg:px-8">
      <div className="relative mb-10 overflow-hidden rounded-3xl border border-slate-200/70 bg-white px-6 py-10 text-center shadow-sm sm:px-10">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(3,110,182,0.12),transparent_55%)]"
          aria-hidden
        />
        <div className="relative">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-[#024081] to-[#036eb6] text-white shadow-md">
            <Scale className="h-7 w-7" aria-hidden />
          </div>
          <h1 className="text-3xl font-bold text-[#092151] sm:text-4xl">Publication Ethics</h1>
          <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-[#858c93]">
            Ethical duties expected from editors, authors, and reviewers of ER Publications
            journals.
          </p>
        </div>
      </div>

      {isLoading ? (
        <div className="flex min-h-[40vh] items-center justify-center gap-2 text-sm font-medium text-[#036eb6]">
          <Loader2 className="h-5 w-5 animate-spin" aria-hidden />
          Loading publication ethics...
        </div>
      ) : null}

      {isError ? (
        <div className="mx-auto max-w-xl space-y-4 text-center">
          <div className="rounded-2xl border border-red-200 bg-red-50 px-6 py-8 text-sm text-red-700">
            {error?.message || "Unable to load publication ethics. Please try again later."}
          </div>
          <button
            type="button"
            onClick={() => refetch()}
            className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-[#024081] transition hover:bg-blue-50"
          >
            Try again
          </button>
        </div>
      ) : null}

      {!isLoading && !isError && !content ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center">
          <p className="text-sm text-[#858c93]">
            Publication ethics will appear here once the statement is published from the admin
            panel.
          </p>
        </div>
      ) : null}

      {!isLoading && !isError && content ? (
        <article className="rounded-2xl border border-slate-200/80 bg-white px-6 py-8 shadow-sm sm:px-10 sm:py-10">
          <div
            className="publication-ethics-html"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </article>
      ) : null}
    </div>
  );
}
