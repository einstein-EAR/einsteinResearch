"use client";

import { useEffect, useState } from "react";
import { slides } from "./homeData";

export function HeroSlider() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="w-full border-b border-slate-200 bg-gradient-to-b from-white to-slate-100">
      <div className="mx-auto grid w-full gap-8 px-4 py-10 lg:grid-cols-2 lg:items-center lg:px-8 lg:py-14">
        <div className="order-2 flex flex-col justify-center lg:order-1">
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-indigo-600">
            {slides[activeIndex].subtitle}
          </p>
          <h2 className="mt-3 text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
            {slides[activeIndex].title}
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-600">
            {slides[activeIndex].description}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="/paper-submission"
              className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
            >
              Submit your paper
            </a>
            <a
              href="/downloads/author-guidelines"
              className="rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-indigo-300 hover:text-indigo-700"
            >
              Author guidelines
            </a>
          </div>
          <div className="mt-8 flex gap-2">
            {slides.map((slide, index) => (
              <button
                key={slide.title}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`h-2 rounded-full transition-all ${
                  index === activeIndex ? "w-10 bg-indigo-600" : "w-6 bg-slate-300 hover:bg-slate-400"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="order-1 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg lg:order-2">
          <img
            src={slides[activeIndex].image}
            alt=""
            className="aspect-[4/3] h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
