import ContactUsForm from "@/src/components/conatcUsForm/contactUsForm";
import { site } from "@/src/components/home/homeData";
import { Mail, MapPin, Phone } from "lucide-react";

export default function ContactUs() {
  return (
    <div className="mx-auto w-full max-w-[1440px] px-4 py-10 sm:py-14 lg:px-8">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold text-[#092151] sm:text-4xl">Contact Us</h1>
        <p className="mx-auto mt-3 max-w-2xl text-base text-[#858c93]">
          Reach out for manuscript submissions, publication support, or general inquiries.
        </p>
      </div>

      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(280px,360px)] lg:items-start">
        <ContactUsForm />

        <aside className="space-y-5">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-[#092151]">Publication desk</h2>
            <p className="mt-2 text-sm leading-relaxed text-[#858c93]">
              Our editorial team assists authors with submissions, formatting, and review
              status updates.
            </p>

            <ul className="mt-6 space-y-4">
              <li className="flex items-start gap-3 text-sm text-slate-700">
                <Mail className="mt-0.5 h-5 w-5 shrink-0 text-[#036eb6]" aria-hidden />
                <a href={`mailto:${site.email}`} className="hover:text-[#024081]">
                  {site.email}
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-slate-700">
                <Phone className="mt-0.5 h-5 w-5 shrink-0 text-[#036eb6]" aria-hidden />
                <a
                  href={`tel:${site.phone.replace(/\s/g, "")}`}
                  className="hover:text-[#024081]"
                >
                  {site.phone}
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-slate-700">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[#036eb6]" aria-hidden />
                <span>India · Online &amp; telephonic support</span>
              </li>
            </ul>
          </div>

          <div className="rounded-2xl bg-linear-to-br from-[#024081] to-[#036eb6] p-6 text-white shadow-md">
            <h3 className="text-base font-semibold">Quick response</h3>
            <p className="mt-2 text-sm leading-relaxed text-blue-100">
              Queries related to paper submission are typically answered within 24 hours on
              working days.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
