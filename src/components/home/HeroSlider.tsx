"use client";

import Link from "next/link";
import { slides } from "./homeData";
import { ReusableContentSlider } from "./ReusableContentSlider";

const highlights = [
  { label: "ISSN", value: "2455-6211" },
  { label: "Impact Factor", value: "9.175" },
  { label: "Review", value: "Blind peer-reviewed" },
];

export function HeroSlider() {
  const images = slides.map((slide) => slide.image);

  return (
    <section className="w-full px-4 py-8 sm:px-6 md:px-12 md:py-10">
      <div className="mx-auto grid w-full max-w-[1440px] items-center gap-8 lg:grid-cols-2 lg:gap-12">
        <div className="order-2 space-y-6 lg:order-1">
          <div className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-[#036eb6]">
            UGC-certified · Open access · Monthly journal
          </div>

          <div>
            <h1 className="text-[28px] font-bold leading-tight text-[#092151] sm:text-4xl lg:text-[2.75rem] lg:leading-tight">
              Welcome to{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-[#024081] to-[#036eb6]">
                EinsteinG Academic Research
              </span>
            </h1>
            <p className="mt-2 text-lg font-medium text-[#036eb6]">
              International Journal of All Research Education and Scientific Methods (IJARESM)
            </p>
          </div>

          <p className="max-w-xl text-base leading-relaxed text-[#858c93]">
            A scholarly online, UGC-certified, open access, peer-reviewed and fully refereed
            multidisciplinary journal promoting research across engineering, science, education,
            management, medical sciences, and humanities — indexed in Google Scholar, SJR, Research
            Gate, Thomson Reuters ResearcherID, and UGC Approved List of Journals.
          </p>

          <div className="flex flex-wrap gap-3">
            {highlights.map((item) => (
              <div
                key={item.label}
                className="rounded-xl border border-[#ededed] bg-white px-4 py-3 shadow-sm"
              >
                <p className="text-[11px] font-semibold uppercase tracking-wide text-[#036eb6]">
                  {item.label}
                </p>
                <p className="mt-0.5 text-sm font-bold text-[#092151]">{item.value}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-3 pt-1">
            <Link
              href="/paper-submission"
              className="inline-flex items-center justify-center rounded-xl bg-linear-to-r from-[#024081] to-[#036eb6] px-6 py-3 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
            >
              Submit your paper
            </Link>
            <Link
              href="/downloads/author-guidelines"
              className="inline-flex items-center justify-center rounded-xl border border-blue-200 bg-white px-6 py-3 text-sm font-semibold text-[#024081] transition-all duration-300 hover:bg-blue-50"
            >
              Author guidelines
            </Link>
            <Link
              href="/contactUs"
              className="inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm font-semibold text-[#036eb6] transition hover:text-[#024081]"
            >
              Contact desk →
            </Link>
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <div className="overflow-hidden rounded-3xl border border-blue-100 bg-white p-3 shadow-lg">
            <ReusableContentSlider
              images={images}
              autoplay
              autoplayDelay={5000}
              pagination
              imageAltPrefix="IJARESM highlight"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
