import ContactUsForm from "@/src/components/conatcUsForm/contactUsForm";

export default function ContactUs() {
  return (
    <div className="mx-auto w-full max-w-[1440px] px-4 py-12 sm:py-16 lg:px-8">
      <div className="mx-auto mb-8 max-w-2xl text-center">
        <h1 className="text-3xl font-bold text-[#092151] sm:text-4xl">Contact Us</h1>
        <p className="mt-3 text-base leading-relaxed text-[#858c93]">
          Send a message about manuscript submissions, publication support, or any other
          inquiry. Our team will get back to you.
        </p>
      </div>

      <div className="mx-auto flex max-w-3xl justify-center">
        <ContactUsForm />
      </div>
    </div>
  );
}
