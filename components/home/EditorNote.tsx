import { site } from "./homeData";

export function EditorNote() {
  return (
    <section className="rounded-2xl border border-indigo-100 bg-gradient-to-r from-indigo-50 to-violet-50 p-6 sm:p-8">
      <p className="text-sm font-semibold text-indigo-900">From the editorial office</p>
      <p className="mt-3 text-slate-700 leading-relaxed">
        We review eligible submissions promptly and publish accepted work after processing and
        final formatting. Please use the official ER manuscript template and avoid simultaneous
        submission to multiple journals.
      </p>
      <div className="mt-6 flex flex-wrap gap-6 border-t border-indigo-100/80 pt-6 text-sm">
        <div>
          <p className="font-semibold text-slate-900">Editor-in-Chief</p>
          <p className="text-slate-600">{site.name}</p>
        </div>
        <div>
          <p className="font-semibold text-slate-900">Email</p>
          <a href={`mailto:${site.email}`} className="text-indigo-600 hover:underline">
            {site.email}
          </a>
        </div>
        <div>
          <p className="font-semibold text-slate-900">Phone</p>
          <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="text-indigo-600 hover:underline">
            {site.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
