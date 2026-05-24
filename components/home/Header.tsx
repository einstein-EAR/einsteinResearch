"use client";

import { useEffect, useState } from "react";
import { navItems, site } from "./homeData";

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      className={`h-4 w-4 shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden
    >
      <path
        fillRule="evenodd"
        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expandedMobile, setExpandedMobile] = useState<string | null>(null);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header className="w-full">
      <div className="hidden border-b border-indigo-800 bg-gradient-to-r from-indigo-950 via-indigo-900 to-violet-900 text-white sm:block">
        <div className="mx-auto flex w-full flex-wrap items-center justify-between gap-3 px-4 py-2.5 lg:px-8">
          <p className="text-xs text-indigo-200">
            ISSN {site.issn} · Peer-reviewed · UGC-aligned publishing
          </p>
          <div className="flex flex-wrap items-center gap-4 text-xs text-indigo-100">
            <a href={`mailto:${site.email}`} className="transition hover:text-white">
              {site.email}
            </a>
            <span className="hidden text-indigo-400 md:inline" aria-hidden>
              |
            </span>
            <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="transition hover:text-white">
              {site.phone}
            </a>
          </div>
        </div>
      </div>

      <div className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur-md">
        <div className="mx-auto flex w-full items-center justify-between gap-4 px-4 py-3 lg:px-8">
          <a href="/" className="min-w-0 shrink">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-600 sm:text-xs">
              {site.name}
            </p>
            <p className="truncate text-base font-bold text-slate-900 sm:text-lg">{site.tagline}</p>
          </a>

          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href="/payment"
              className="hidden rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700 sm:inline-flex"
            >
              Pay Now
            </a>
            <a
              href="/paper-submission"
              className="hidden rounded-lg border border-indigo-200 bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-700 transition hover:bg-indigo-100 md:inline-flex"
            >
              Submit Paper
            </a>
            <button
              type="button"
              className="inline-flex rounded-lg border border-slate-200 p-2 text-slate-700 transition hover:bg-slate-100 lg:hidden"
              onClick={() => setMobileOpen((v) => !v)}
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>

        <nav
          className="hidden border-t border-slate-100 bg-slate-50/80 lg:block"
          aria-label="Main navigation"
        >
          <div className="mx-auto flex w-full flex-wrap items-center gap-1 px-4 py-2 lg:px-8">
            {navItems.map((item) =>
              item.children ? (
                <div key={item.label} className="group relative">
                  <a
                    href={item.href}
                    className="inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-white hover:text-indigo-700 hover:shadow-sm"
                  >
                    {item.label}
                    <ChevronIcon open={false} />
                  </a>
                  <div className="invisible absolute left-0 top-full z-50 min-w-[220px] rounded-xl border border-slate-200 bg-white py-2 opacity-0 shadow-lg transition group-hover:visible group-hover:opacity-100">
                    {item.children.map((child) => (
                      <a
                        key={child.label}
                        href={child.href}
                        className="block px-4 py-2 text-sm text-slate-600 transition hover:bg-indigo-50 hover:text-indigo-700"
                      >
                        {child.label}
                      </a>
                    ))}
                  </div>
                </div>
              ) : (
                <a
                  key={item.label}
                  href={item.href}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-white hover:text-indigo-700 hover:shadow-sm"
                >
                  {item.label}
                </a>
              ),
            )}
          </div>
        </nav>
      </div>

      {mobileOpen && (
        <>
          <button
            type="button"
            className="fixed inset-0 z-40 bg-slate-900/40 lg:hidden"
            aria-label="Close menu overlay"
            onClick={() => setMobileOpen(false)}
          />
          <nav
            className="fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col overflow-y-auto border-l border-slate-200 bg-white shadow-2xl lg:hidden"
            aria-label="Mobile navigation"
          >
            <div className="flex items-center justify-between border-b border-slate-100 px-4 py-4">
              <span className="text-sm font-semibold text-slate-900">Menu</span>
              <button
                type="button"
                className="rounded-lg p-2 text-slate-600 hover:bg-slate-100"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
              >
                <CloseIcon />
              </button>
            </div>

            <div className="flex flex-col gap-1 p-4">
              {navItems.map((item) =>
                item.children ? (
                  <div key={item.label}>
                    <button
                      type="button"
                      className="flex w-full items-center justify-between rounded-lg px-3 py-3 text-left text-sm font-medium text-slate-800 hover:bg-slate-50"
                      onClick={() =>
                        setExpandedMobile((v) => (v === item.label ? null : item.label))
                      }
                      aria-expanded={expandedMobile === item.label}
                    >
                      {item.label}
                      <ChevronIcon open={expandedMobile === item.label} />
                    </button>
                    {expandedMobile === item.label && (
                      <div className="ml-3 space-y-1 border-l-2 border-indigo-100 pl-3">
                        {item.children.map((child) => (
                          <a
                            key={child.label}
                            href={child.href}
                            className="block rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-indigo-50 hover:text-indigo-700"
                            onClick={() => setMobileOpen(false)}
                          >
                            {child.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <a
                    key={item.label}
                    href={item.href}
                    className="rounded-lg px-3 py-3 text-sm font-medium text-slate-800 hover:bg-slate-50"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </a>
                ),
              )}
            </div>

            <div className="mt-auto space-y-2 border-t border-slate-100 p-4">
              <a
                href="/paper-submission"
                className="block w-full rounded-lg bg-indigo-600 py-3 text-center text-sm font-semibold text-white"
                onClick={() => setMobileOpen(false)}
              >
                Submit Paper
              </a>
              <a
                href="/payment"
                className="block w-full rounded-lg border border-indigo-200 py-3 text-center text-sm font-semibold text-indigo-700"
                onClick={() => setMobileOpen(false)}
              >
                Pay Now
              </a>
            </div>
          </nav>
        </>
      )}
    </header>
  );
}
