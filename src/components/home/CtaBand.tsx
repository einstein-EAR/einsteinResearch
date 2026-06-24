import { clientLogos } from "./homeData";
import { ReusableContentSlider } from "./ReusableContentSlider";

export function CtaBand() {
  return (
    <section className="w-full bg-white px-4 py-10 sm:px-6 md:px-12">
      <div className="mx-auto w-full max-w-[1440px]">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-[#092151] sm:text-3xl lg:text-4xl">
            Our trusted{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#024081] to-[#036eb6]">
              partners &amp; clients
            </span>
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-[#858c93] sm:text-base">
            Institutions and organizations that trust our publication and research support services.
          </p>
        </div>

        <ReusableContentSlider
          images={clientLogos}
          imageAltPrefix="Client logo"
          autoplay
          autoplayDelay={4000}
          loop
          pagination={false}
          imageWidth={100}
          imageHeight={100}
          imageClassName="h-[100px] w-[100px] object-contain"
          slidesPerView={2}
          spaceBetween={16}
          breakpoints={{
            640: { slidesPerView: 3, spaceBetween: 16 },
            768: { slidesPerView: 4, spaceBetween: 20 },
            1024: { slidesPerView: 5, spaceBetween: 24 },
            1280: { slidesPerView: 6, spaceBetween: 24 },
          }}
        />
      </div>
    </section>
  );
}
