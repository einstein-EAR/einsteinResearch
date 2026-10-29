import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-1 items-center justify-center px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-lg text-center">
        <p className="text-sm font-semibold tracking-[0.25em] text-[#036eb6]">404</p>
        <h1 className="mt-3 text-3xl font-bold text-[#092151] sm:text-4xl">Page not found</h1>
        <p className="mt-3 text-base leading-relaxed text-[#858c93]">
          The page you are looking for does not exist or may have been moved.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center justify-center rounded-lg bg-linear-to-r from-[#024081] to-[#036eb6] px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:shadow-lg"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
}
