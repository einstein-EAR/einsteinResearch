"use client";

import {
  Award,
  BadgeCheck,
  BookOpen,
  Clock,
  Eye,
  Headphones,
  Mail,
  TrendingUp,
  Trophy,
  Users,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { editorNote, ijaresmStrengths } from "./homeData";

function getStrengthIcon(title: string): LucideIcon {
  const text = title.toLowerCase();

  if (text.includes("support")) return Headphones;
  if (text.includes("impact factor")) return TrendingUp;
  if (text.includes("peer review") || text.includes("refereed")) return Eye;
  if (text.includes("queries") || text.includes("24 hours")) return Clock;
  if (text.includes("team") || text.includes("editorial")) return Users;
  if (text.includes("certificate")) return Award;
  if (text.includes("journal")) return BookOpen;
  if (text.includes("award")) return Trophy;
  if (text.includes("quality")) return BadgeCheck;

  return BadgeCheck;
}

export function StrengthSec() {
  return (
    <section className="w-full px-4 py-10 sm:px-6 md:px-12 md:py-14">
      <div className="mx-auto w-full max-w-[1440px]">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-[#092151] sm:text-3xl lg:text-4xl">
            Why publish with{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#024081] to-[#036eb6]">
              IJARESM
            </span>
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-[#858c93] sm:text-base">
            Quality-first publishing with transparent support at every stage of your manuscript.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {ijaresmStrengths.map((strength) => {
              const Icon = getStrengthIcon(strength.title);

              return (
                <div
                  key={strength.id}
                  className="flex items-start gap-3 rounded-2xl border border-[#ededed] bg-white p-4 shadow-sm transition-all duration-300 hover:shadow-md"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#024081] text-white">
                    <Icon className="h-5 w-5" aria-hidden />
                  </div>
                  <p className="text-sm leading-relaxed text-slate-700">{strength.title}</p>
                </div>
              );
            })}
          </div>

          <div className="flex flex-col overflow-hidden rounded-3xl border border-[#ededed] bg-white shadow-lg">
            <div className="bg-linear-to-r from-[#024081] to-[#036eb6] px-6 py-5 sm:px-8">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15">
                  <Mail className="h-5 w-5 text-white" aria-hidden />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Note from the Editor</h3>
                  <p className="text-sm text-blue-100">Submission guidelines &amp; ethics</p>
                </div>
              </div>
            </div>

            <div className="space-y-4 p-6 sm:p-8">
              <p className="text-sm leading-relaxed text-[#858c93] sm:text-base">
                {editorNote.body}
              </p>
              <div className="space-y-1 border-t border-slate-100 pt-4">
                {editorNote.signOff.map((line) => (
                  <p
                    key={line}
                    className={`text-sm ${line.startsWith("E-mail") || line.startsWith("Website") || line.startsWith("Phone") ? "font-medium text-[#036eb6]" : "text-slate-600"}`}
                  >
                    {line}
                  </p>
                ))}
              </div>
              <Link
                href="/paper-submission"
                className="inline-flex w-full items-center justify-center rounded-xl bg-linear-to-r from-[#024081] to-[#036eb6] py-3 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:shadow-lg sm:w-auto sm:px-8"
              >
                Submit your manuscript
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
