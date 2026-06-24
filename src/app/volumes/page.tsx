"use client";

import VolumeIssues from "@/src/components/volume-issues/volume";
import { volumes } from "@/src/apidata/Volumes";
import Link from "next/link";

export default function VolumesScreen() {
    console.log(volumes);
  return (
    <div className="mx-auto w-full max-w-[1440px] px-4 py-10 sm:py-14 lg:px-8">
      <div className="mb-6 rounded-2xl border border-[#ededed] bg-linear-to-r from-[#024081] to-[#036eb6] px-6 py-5 text-white shadow-md">
        <p className="text-xs font-semibold uppercase tracking-wide text-blue-100">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <span className="mx-2 opacity-70">/</span>
          Journal volumes
        </p>
        <h1 className="mt-2 text-2xl font-bold sm:text-3xl">All Volumes</h1>
        <p className="mt-2 max-w-2xl text-sm text-blue-100">
          Browse published volumes and open individual issues for articles and archives.
        </p>
      </div>

      <VolumeIssues volumeData={volumes} pageSizeOptions={[5, 10, 20]} />
    </div>
  );
}
