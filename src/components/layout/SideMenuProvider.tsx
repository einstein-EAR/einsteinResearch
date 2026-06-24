"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { HomeSidebar } from "@/src/components/home/HomeSidebar";

type SideMenuContextValue = {
  isOpen: boolean;
  openMenu: () => void;
  closeMenu: () => void;
};

const SideMenuContext = createContext<SideMenuContextValue | null>(null);

export function useSideMenu() {
  const context = useContext(SideMenuContext);
  if (!context) {
    throw new Error("useSideMenu must be used within SideMenuProvider");
  }
  return context;
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

function SideMenuToggle() {
  const { isOpen, openMenu } = useSideMenu();

  if (isOpen) return null;

  return (
    <button
      type="button"
      className="fixed left-4 top-[20%] z-50 inline-flex rounded-xl border border-slate-200 bg-white p-3 text-slate-700 shadow-lg transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700"
      onClick={openMenu}
      aria-label="Open side menu"
    >
      <MenuIcon />
    </button>
  );
}

function SideMenuPanel({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      <button
        type="button"
        className="fixed inset-0 z-60 bg-slate-900/40"
        aria-label="Close side menu overlay"
        onClick={onClose}
      />
      <aside
        className="fixed inset-y-0 left-0 z-70 flex w-full max-w-[min(100vw,22rem)] flex-col overflow-hidden border-r border-slate-200 bg-white shadow-2xl sm:max-w-sm"
        aria-label="Resources side menu"
        role="dialog"
        aria-modal="true"
      >
        <div className="flex shrink-0 items-center justify-between border-b border-slate-100 px-4 py-4">
          <span className="text-sm font-semibold text-slate-900">Resources &amp; Updates</span>
          <button
            type="button"
            className="rounded-lg p-2 text-slate-600 transition hover:bg-slate-100"
            onClick={onClose}
            aria-label="Close side menu"
          >
            <CloseIcon />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto p-4">
          <HomeSidebar />
        </div>
      </aside>
    </>
  );
}

export function SideMenuProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openMenu = useCallback(() => setIsOpen(true), []);
  const closeMenu = useCallback(() => setIsOpen(false), []);

  return (
    <SideMenuContext.Provider value={{ isOpen, openMenu, closeMenu }}>
      {children}
      <SideMenuToggle />
      <SideMenuPanel isOpen={isOpen} onClose={closeMenu} />
    </SideMenuContext.Provider>
  );
}
