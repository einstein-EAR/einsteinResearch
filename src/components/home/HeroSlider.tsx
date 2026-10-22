"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BarChart3, Hash, ShieldCheck, Sparkles } from "lucide-react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import { slides } from "./homeData";

const highlights = [
  { label: "ISSN", value: "2455-6211", icon: Hash },
  { label: "Impact Factor", value: "9.175", icon: BarChart3 },
  { label: "Review", value: "Blind peer-reviewed", icon: ShieldCheck },
];

export function HeroSlider() {
  return (
    <section className="relative w-full overflow-hidden px-4 py-10 sm:px-6 md:px-12 md:py-14 lg:py-20">
      {/* Ambient background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(3,110,182,0.14),transparent)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-[#036eb6]/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-[#024081]/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(3,110,182,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(3,110,182,0.04)_1px,transparent_1px)] bg-size-[3rem_3rem] mask-[radial-gradient(ellipse_70%_60%_at_50%_40%,black,transparent)]"
      />

      <div className="relative mx-auto grid w-full max-w-[1440px] items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 xl:gap-20">
        {/* Content */}
        <div className="order-2 min-w-0 space-y-7 lg:order-1 lg:space-y-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200/80 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#036eb6] shadow-sm backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#036eb6] opacity-40" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#036eb6]" />
            </span>
            UGC-certified · Open access · Monthly journal
          </div>

          <div className="space-y-3">
            <h1 className="text-[1.75rem] font-bold leading-[1.15] tracking-tight text-[#092151] sm:text-4xl lg:text-[2.85rem] xl:text-5xl">
              Welcome to{" "}
              <span className="bg-linear-to-r from-[#024081] via-[#036eb6] to-[#024081] bg-clip-text text-transparent">
                EinsteinG Academic Research
              </span>
            </h1>
            <p className="max-w-xl text-base font-medium leading-relaxed text-[#036eb6]/90 sm:text-lg">
              International Journal of All Research Education and Scientific Methods{" "}
              <span className="font-semibold text-[#024081]">(IJARESM)</span>
            </p>
          </div>

          <p className="max-w-xl text-[15px] leading-relaxed text-[#5c6570] sm:text-base">
            A scholarly online, UGC-certified, open access, peer-reviewed and fully refereed
            multidisciplinary journal promoting research across engineering, science, education,
            management, medical sciences, and humanities — indexed in Google Scholar, SJR, Research
            Gate, Thomson Reuters ResearcherID, and UGC Approved List of Journals.
          </p>

          <div className="grid gap-3 sm:grid-cols-3">
            {highlights.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  className="group rounded-2xl border border-white/60 bg-white/70 p-4 shadow-[0_8px_30px_rgba(2,64,129,0.06)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-100 hover:shadow-[0_12px_40px_rgba(2,64,129,0.1)]"
                >
                  <div className="mb-2 inline-flex rounded-lg bg-linear-to-br from-[#024081]/10 to-[#036eb6]/10 p-2 text-[#036eb6] transition-colors group-hover:from-[#024081]/15 group-hover:to-[#036eb6]/15">
                    <Icon className="h-4 w-4" aria-hidden />
                  </div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-[#036eb6]/80">
                    {item.label}
                  </p>
                  <p className="mt-0.5 text-sm font-bold text-[#092151]">{item.value}</p>
                </div>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <Link
              href="/paper-submission"
              className="group inline-flex items-center gap-2 rounded-full bg-linear-to-r from-[#024081] to-[#036eb6] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#024081]/25 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#024081]/30"
            >
              Submit your paper
              <ArrowRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                aria-hidden
              />
            </Link>
            <Link
              href="/downloads/author-guidelines"
              className="inline-flex items-center justify-center rounded-full border border-blue-200/80 bg-white/80 px-6 py-3.5 text-sm font-semibold text-[#024081] shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-blue-300 hover:bg-white"
            >
              Author guidelines
            </Link>
            <Link
              href="/contactUs"
              className="inline-flex items-center gap-1.5 rounded-full px-4 py-3.5 text-sm font-semibold text-[#036eb6] transition-colors hover:text-[#024081]"
            >
              Contact desk
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>

        {/* Slider */}
        <div className="order-1 w-full min-w-0 lg:order-2">
          <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
            {/* Decorative layers */}
            <div
              aria-hidden
              className="absolute -inset-3 rounded-[2rem] bg-linear-to-br from-[#024081]/20 via-[#036eb6]/10 to-transparent blur-sm sm:-inset-4"
            />
            <div
              aria-hidden
              className="absolute -right-4 -top-4 hidden h-24 w-24 rounded-2xl border border-blue-200/40 bg-white/40 backdrop-blur-md lg:block"
            />
            <div
              aria-hidden
              className="absolute -bottom-5 -left-5 hidden h-20 w-20 rounded-full bg-linear-to-tr from-[#036eb6]/30 to-transparent lg:block"
            />

            <div className="relative overflow-hidden rounded-[1.75rem] border border-white/50 bg-white/40 p-1.5 shadow-[0_20px_60px_-15px_rgba(2,64,129,0.25)] backdrop-blur-sm sm:rounded-[2rem] sm:p-2">
              <Swiper
                modules={[Autoplay, Pagination, EffectFade]}
                effect="fade"
                fadeEffect={{ crossFade: true }}
                slidesPerView={1}
                loop={slides.length > 1}
                watchOverflow
                observer
                observeParents
                autoplay={{
                  delay: 5000,
                  disableOnInteraction: false,
                }}
                pagination={{ clickable: true }}
                className="hero-slider-swiper !w-full overflow-hidden rounded-[1.5rem] sm:rounded-[1.75rem]"
              >
                {slides.map((slide, index) => (
                  <SwiperSlide key={slide.image} className="!h-auto w-full">
                    <div className="relative aspect-[4/3] w-full overflow-hidden sm:aspect-[16/11]">
                      <Image
                        src={slide.image}
                        alt={slide.title}
                        fill
                        className="object-cover transition-transform duration-700 hover:scale-[1.03]"
                        sizes="(max-width: 1024px) 100vw, 45vw"
                        priority={index === 0}
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-[#092151]/85 via-[#024081]/25 to-transparent" />

                      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                        <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-white/90 backdrop-blur-md">
                          <Sparkles className="h-3 w-3" aria-hidden />
                          {slide.subtitle}
                        </div>
                        <h2 className="text-lg font-bold leading-snug text-white sm:text-xl lg:text-2xl">
                          {slide.title}
                        </h2>
                        <p className="mt-2 line-clamp-2 max-w-md text-sm leading-relaxed text-blue-100/90">
                          {slide.description}
                        </p>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
