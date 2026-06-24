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
    <div className={className}>
      <Swiper
        modules={[Autoplay, Pagination]}
        slidesPerView={slidesPerView}
        spaceBetween={spaceBetween}
        breakpoints={breakpoints}
        loop={loop ?? images.length > 1}
        autoplay={
          autoplay
            ? {
                delay: autoplayDelay,
                disableOnInteraction: false,
              }
            : false
        }
        pagination={pagination ? { clickable: true } : false}
        className="hero-swiper"
      >
        {images.map((image, index) => (
          <SwiperSlide key={`${image}-${index}`}>
            <div className="flex h-full items-center justify-center overflow-hidden rounded-xl border border-blue-100 bg-white p-4 shadow-sm transition-all duration-300 hover:shadow-md">
              <div
                className={
                  hasFixedImageSize ? "flex items-center justify-center" : "relative aspect-4/3 w-full"
                }
              >
                {hasFixedImageSize ? (
                  <Image
                    src={image}
                    alt={`${imageAltPrefix} ${index + 1}`}
                    width={imageWidth}
                    height={imageHeight}
                    className={imageClassName}
                    priority={index === 0}
                  />
                ) : (
                  <Image
                    src={image}
                    alt={`${imageAltPrefix} ${index + 1}`}
                    fill
                    className={imageClassName}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority={index === 0}
                  />
                )}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
