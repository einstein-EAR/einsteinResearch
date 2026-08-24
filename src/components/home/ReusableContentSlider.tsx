"use client";

import Image from "next/image";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

type ReusableContentSliderProps = {
  images: string[];
  imageAltPrefix?: string;
  autoplay?: boolean;
  autoplayDelay?: number;
  pagination?: boolean;
  loop?: boolean;
  className?: string;
  imageWidth?: number;
  imageHeight?: number;
  imageClassName?: string;
  slidesPerView?: number;
  spaceBetween?: number;
  breakpoints?: Record<number, { slidesPerView: number; spaceBetween?: number }>;
};

export function ReusableContentSlider({
  images,
  imageAltPrefix = "Slide image",
  autoplay = true,
  autoplayDelay = 5000,
  pagination = true,
  loop,
  className = "",
  imageWidth,
  imageHeight,
  imageClassName = "object-cover",
  slidesPerView = 1,
  spaceBetween = 0,
  breakpoints,
}: ReusableContentSliderProps) {
  const hasFixedImageSize = Boolean(imageWidth && imageHeight);

  return (
    <div className={`w-full min-w-0 ${className}`}>
      <Swiper
        modules={[Autoplay, Pagination]}
        slidesPerView={slidesPerView}
        spaceBetween={spaceBetween}
        breakpoints={breakpoints}
        loop={loop ?? images.length > 1}
        watchOverflow
        observer
        observeParents
        autoplay={
          autoplay
            ? {
                delay: autoplayDelay,
                disableOnInteraction: false,
              }
            : false
        }
        pagination={pagination ? { clickable: true } : false}
        className="hero-swiper !w-full"
      >
        {images.map((image, index) => (
          <SwiperSlide key={`${image}-${index}`} className="!h-auto w-full">
            {hasFixedImageSize ? (
              <div className="flex w-full items-center justify-center overflow-hidden rounded-xl bg-white">
                <Image
                  src={image}
                  alt={`${imageAltPrefix} ${index + 1}`}
                  width={imageWidth}
                  height={imageHeight}
                  className={`h-auto max-w-full ${imageClassName}`}
                  priority={index === 0}
                />
              </div>
            ) : (
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-slate-100 sm:aspect-[16/10]">
                <Image
                  src={image}
                  alt={`${imageAltPrefix} ${index + 1}`}
                  fill
                  className={imageClassName}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority={index === 0}
                />
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
