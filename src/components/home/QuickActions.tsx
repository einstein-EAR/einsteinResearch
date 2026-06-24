import Image from "next/image";
import Link from "next/link";
import { journalAboutText, quickCards } from "./homeData";

export function QuickActions() {
  return (
    <section className="w-full px-4 py-10 sm:px-6 md:px-12 md:py-14">
      <div className="mx-auto w-full max-w-[1440px] space-y-12">
        <div>
          <div className="mb-8 text-center sm:text-left">
            <h2 className="text-2xl font-bold text-[#092151] sm:text-3xl">
              Start your{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-[#024081] to-[#036eb6]">
                publication journey
              </span>
            </h2>
            <p className="mt-2 text-sm text-[#858c93] sm:text-base">
              Common paths for authors, researchers, and institutions
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {quickCards.map((card) => (
              <article
                key={card.title}
                className="group relative overflow-hidden rounded-2xl border border-[#ededed] bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div
                  className={`absolute inset-x-0 top-0 h-1 bg-linear-to-r ${card.accent}`}
                  aria-hidden
                />
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-[#036eb6]">
                  <card.icon className="h-6 w-6" aria-hidden />
                </div>
                <h3 className="text-lg font-semibold text-[#092151]">{card.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#858c93]">{card.description}</p>
                <Link
                  href={card.href}
                  className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-[#036eb6] transition group-hover:gap-2"
                >
                  Learn more
                  <span aria-hidden>→</span>
                </Link>
              </article>
            ))}
          </div>
        </div>

        <div className="grid items-center gap-8 overflow-hidden rounded-3xl border border-[#ededed] bg-white shadow-md lg:grid-cols-2">
          <div className="p-6 sm:p-8 lg:p-10">
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#036eb6]">
              About the journal
            </p>
            <h3 className="mt-2 text-xl font-bold text-[#092151] sm:text-2xl">
              Multidisciplinary research across every field
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-[#858c93] sm:text-base">
              {journalAboutText}
            </p>
          </div>
          <div className="relative flex min-h-[260px] items-center justify-center bg-[#f4f8fc] p-6 sm:min-h-[320px]">
            <Image
              src="/images/JornalDetails.png"
              alt="IJARESM journal details"
              width={480}
              height={360}
              className="h-auto w-full max-w-md object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
