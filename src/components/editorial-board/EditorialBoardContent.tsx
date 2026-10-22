"use client";

import { GraduationCap, Loader2, Mail, Users } from "lucide-react";
import { useEditorialBoard } from "@/src/hooks";
import type { EditorialBoardCategory, EditorialBoardMember } from "@/src/types/editorialBoard";

function sortCategories(categories: EditorialBoardCategory[]) {
  return [...categories].sort(
    (a, b) => a.sortOrder - b.sortOrder || a.title.localeCompare(b.title),
  );
}

function sortMembers(members: EditorialBoardMember[]) {
  return [...members].sort(
    (a, b) => a.sortOrder - b.sortOrder || a.name.localeCompare(b.name),
  );
}

function memberInitials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0]!.slice(0, 2).toUpperCase();
  return `${parts[0]![0]}${parts[parts.length - 1]![0]}`.toUpperCase();
}

function MemberRow({
  member,
  featured,
}: {
  member: EditorialBoardMember;
  featured?: boolean;
}) {
  return (
    <article
      className={
        featured
          ? "relative overflow-hidden rounded-xl border border-[#036eb6]/20 bg-linear-to-br from-[#024081]/[0.06] via-white to-[#036eb6]/[0.04] p-6 shadow-sm sm:p-8"
          : "flex flex-col gap-5 border-b border-slate-100 px-6 py-7 last:border-b-0 sm:flex-row sm:items-start sm:gap-8 md:px-8"
      }
    >
      {featured ? (
        <div
          className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-[#036eb6]/10 blur-2xl"
          aria-hidden
        />
      ) : null}

      <div
        className={
          featured
            ? "relative flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-8"
            : "contents"
        }
      >
        <div
          className={
            featured
              ? "flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-[#024081] to-[#036eb6] text-xl font-bold text-white shadow-md ring-4 ring-[#036eb6]/15"
              : "flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-[#024081] to-[#036eb6] text-base font-bold text-white shadow-sm"
          }
          aria-hidden
        >
          {memberInitials(member.name)}
        </div>

        <div className="min-w-0 flex-1">
          <h3
            className={
              featured
                ? "text-xl font-bold text-[#092151] sm:text-2xl"
                : "text-lg font-bold text-[#092151]"
            }
          >
            {member.name}
          </h3>

          {member.designation ? (
            <p className="mt-1.5 text-sm font-semibold text-[#036eb6]">{member.designation}</p>
          ) : null}

          {member.affiliation ? (
            <p className="mt-3 flex items-start gap-2 text-sm leading-relaxed text-slate-600">
              <GraduationCap
                className="mt-0.5 h-4 w-4 shrink-0 text-[#858c93]"
                aria-hidden
              />
              <span className="whitespace-pre-line">{member.affiliation}</span>
            </p>
          ) : null}

          {member.email ? (
            <p className={featured ? "mt-5" : "mt-4"}>
              <a
                href={`mailto:${member.email}`}
                className="inline-flex items-center gap-2 rounded-lg border border-[#036eb6]/20 bg-[#036eb6]/5 px-3 py-2 text-sm font-medium text-[#024081] transition hover:border-[#036eb6]/40 hover:bg-[#036eb6]/10"
              >
                <Mail className="h-4 w-4 shrink-0" aria-hidden />
                <span>{member.email}</span>
              </a>
            </p>
          ) : null}
        </div>
      </div>
    </article>
  );
}

function CategorySection({ category }: { category: EditorialBoardCategory }) {
  const members = sortMembers(category.members);
  const isFeatured =
    members.length === 1 && /editor-in-chief|chief editor/i.test(category.title);

  if (members.length === 0) {
    return null;
  }

  return (
    <section className="scroll-mt-24" aria-labelledby={`category-${category._id}`}>
      <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
        <header className="flex flex-wrap items-end justify-between gap-3 border-b border-slate-100 bg-linear-to-r from-[#024081]/[0.07] to-transparent px-6 py-5 md:px-8">
          <div>
            <h2
              id={`category-${category._id}`}
              className="text-lg font-bold uppercase tracking-wide text-[#092151] sm:text-xl"
            >
              {category.title}
            </h2>
            <p className="mt-1 text-sm text-[#858c93]">
              {members.length} {members.length === 1 ? "member" : "members"}
            </p>
          </div>
          <span className="hidden h-1 w-12 rounded-full bg-[#036eb6]/40 sm:block" aria-hidden />
        </header>

        {isFeatured ? (
          <div className="p-6 md:p-8">
            <MemberRow member={members[0]!} featured />
          </div>
        ) : (
          <div className="flex flex-col">
            {members.map((member) => (
              <MemberRow key={member._id} member={member} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default function EditorialBoardContent() {
  const { data, isLoading, isError, error, refetch } = useEditorialBoard();

  const categories = data ? sortCategories(data) : [];
  const hasMembers = categories.some((category) => category.members.length > 0);

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-10 sm:py-14 lg:px-8">
      <div className="relative mb-12 overflow-hidden rounded-3xl border border-slate-200/70 bg-white px-6 py-10 text-center shadow-sm sm:px-10">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(3,110,182,0.12),transparent_55%)]"
          aria-hidden
        />
        <div className="relative">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-[#024081] to-[#036eb6] text-white shadow-md">
            <Users className="h-7 w-7" aria-hidden />
          </div>
          <h1 className="text-3xl font-bold text-[#092151] sm:text-4xl">Editorial Board</h1>
          <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-[#858c93]">
            International editorial and reviewer board members who guide peer review, publication
            ethics, and manuscript quality across our journals.
          </p>
        </div>
      </div>

      {isLoading ? (
        <div className="flex min-h-[40vh] items-center justify-center gap-2 text-sm font-medium text-[#036eb6]">
          <Loader2 className="h-5 w-5 animate-spin" aria-hidden />
          Loading editorial board...
        </div>
      ) : null}

      {isError ? (
        <div className="mx-auto max-w-xl space-y-4 text-center">
          <div className="rounded-2xl border border-red-200 bg-red-50 px-6 py-8 text-sm text-red-700">
            {error?.message || "Unable to load the editorial board. Please try again later."}
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

      {!isLoading && !isError && !hasMembers ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center">
          <p className="text-sm text-[#858c93]">
            Editorial board information will appear here once categories and members are published
            from the admin panel.
          </p>
        </div>
      ) : null}

      {!isLoading && !isError && hasMembers ? (
        <div className="space-y-8 sm:space-y-10">
          {categories.map((category) => (
            <CategorySection key={category._id} category={category} />
          ))}
        </div>
      ) : null}
    </div>
  );
}
